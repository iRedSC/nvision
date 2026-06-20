import type { HomeAssistant } from "../../types";
import type { ReactorCoreCardConfig } from "./reactor-core-card-config";
import {
  DEFAULT_DOMAINS,
  DEFAULT_MAX,
  DEFAULT_MAX_PARTICLES,
  DEFAULT_MIN,
} from "./const";
import {
  classifyParticleKind,
  readParticleVisualState,
  type ParticleKind,
} from "./reactor-entity-state";

/** Normalized radii for concentric orbital shells (fraction of usable half-axis). */
const SHELL_RADII = [0.42, 0.58, 0.72, 0.84];
const PULSE_LIFE_MS = 1400;

export type { ParticleKind };

export interface ReactorPulse {
  x: number;
  y: number;
  age: number;
  seed: number;
}

export interface ReactorParticle {
  entityId: string;
  kind: ParticleKind;
  seed: number;
  seedY: number;
  x: number;
  y: number;
  phase: number;
  shell: number;
  slot: number;
  slotsOnShell: number;
  orbitTilt: number;
  orbitRyScale: number;
  baseOrbitSpeed: number;
  wobbleSpeed: number;
  vx: number;
  vy: number;
  isOn: boolean;
  lastState?: string;
  numericNorm: number;
  lightColor?: string;
  lightBrightness: number;
  timerUrgency: number;
  unavailable: boolean;
  placed: boolean;
}

const PALETTE_HUES = [185, 198, 215, 248, 278, 312, 42];
const TAU = Math.PI * 2;

/** Steady off-state for toggles — also used as the dim phase of on-state flashes. */
const OFF_ORB_SAT = 38;
const OFF_ORB_LIGHT = 36;
const OFF_ORB_ALPHA = 0.34;
const OFF_ORB_HALO_SCALE = 1.1;
const OFF_ORB_HALO_ALPHA = 0.06;

function hashSeed(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) / 4294967296;
}

function matchesExclude(entityId: string, exclude: string[]): boolean {
  for (const pattern of exclude) {
    if (!pattern) {
      continue;
    }
    if (pattern.includes("*")) {
      const regex = new RegExp(
        `^${pattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*")}$`
      );
      if (regex.test(entityId)) {
        return true;
      }
      continue;
    }
    if (entityId === pattern) {
      return true;
    }
  }
  return false;
}

function shellLayout(
  index: number,
  count: number
): { shell: number; slot: number; slotsOnShell: number } {
  const shellCount = Math.min(
    SHELL_RADII.length,
    Math.max(2, Math.ceil(Math.sqrt(count)))
  );
  const shell = index % shellCount;
  const slotsOnShell = Math.ceil(count / shellCount);
  const slot = Math.floor(index / shellCount) % slotsOnShell;
  return { shell, slot, slotsOnShell };
}

function pulseHue(seed: number, timeMs: number): number {
  const cycle =
    (timeMs * 0.000014 + seed * 0.31) % PALETTE_HUES.length;
  const idx = Math.floor(cycle);
  const next = (idx + 1) % PALETTE_HUES.length;
  const blend = cycle - idx;
  return PALETTE_HUES[idx] + (PALETTE_HUES[next] - PALETTE_HUES[idx]) * blend;
}

function applyVisualState(
  particle: ReactorParticle,
  hass: HomeAssistant,
  min: number,
  max: number
): void {
  const visual = readParticleVisualState(hass, particle.entityId, min, max);
  particle.kind = visual.kind;
  particle.isOn = visual.isOn;
  particle.numericNorm = visual.numericNorm;
  particle.lightColor = visual.lightColor;
  particle.lightBrightness = visual.lightBrightness;
  particle.timerUrgency = visual.timerUrgency;
  particle.unavailable = visual.unavailable;
}

function orbitSpeedMultiplier(particle: ReactorParticle, scale: number): number {
  const radius = orbRadiusForSpeed(particle, scale);
  const ref = scale * 0.014;
  return Math.min(3.4, Math.max(0.5, ref / Math.max(radius, scale * 0.004)));
}

function orbRadiusForSpeed(particle: ReactorParticle, scale: number): number {
  if (particle.kind === "numeric") {
    return numericRadius(scale, particle.numericNorm);
  }
  return defaultOrbRadius(scale, particle.kind);
}

function numericRadius(scale: number, numericNorm: number): number {
  return scale * (0.006 + numericNorm * 0.028);
}

function defaultOrbRadius(scale: number, kind: ParticleKind): number {
  switch (kind) {
    case "toggle":
      return scale * 0.016;
    case "light":
      return scale * 0.011;
    case "timer":
      return scale * 0.013;
    case "numeric":
      return scale * 0.012;
    default:
      return scale * 0.01;
  }
}

export function spawnPulse(particle: ReactorParticle, pulses: ReactorPulse[]): void {
  pulses.push({
    x: particle.x,
    y: particle.y,
    age: 0,
    seed: particle.seed,
  });
}

export function discoverEntityIds(
  hass: HomeAssistant,
  config: ReactorCoreCardConfig
): string[] {
  const mode = config.mode ?? "auto";
  if (mode === "manual" && config.entities?.length) {
    return config.entities.filter((id) => Boolean(hass.states[id]));
  }

  const domains = config.domains?.length ? config.domains : DEFAULT_DOMAINS;
  const maxParticles = config.max_particles ?? DEFAULT_MAX_PARTICLES;
  const exclude = config.exclude ?? [];

  return Object.keys(hass.states)
    .filter((entityId) => {
      const domain = entityId.split(".", 1)[0];
      if (!domains.includes(domain)) {
        return false;
      }
      if (matchesExclude(entityId, exclude)) {
        return false;
      }
      const state = hass.states[entityId]?.state;
      return state !== "unavailable";
    })
    .sort((a, b) => a.localeCompare(b))
    .slice(0, maxParticles);
}

function createParticle(
  hass: HomeAssistant,
  entityId: string,
  min: number,
  max: number,
  index: number,
  count: number
): ReactorParticle {
  const seed = hashSeed(entityId);
  const seedY = hashSeed(`${entityId}:y`);
  const layout = shellLayout(index, count);
  const state = hass.states[entityId]?.state;

  const particle: ReactorParticle = {
    entityId,
    kind: classifyParticleKind(hass, entityId),
    seed,
    seedY,
    x: 0,
    y: 0,
    phase: seed * TAU,
    shell: layout.shell,
    slot: layout.slot,
    slotsOnShell: layout.slotsOnShell,
    orbitTilt: seed * TAU,
    orbitRyScale: 0.62 + seedY * 0.32,
    baseOrbitSpeed: 0.00085 + seed * 0.0011,
    wobbleSpeed: 0.0016 + seedY * 0.0024,
    vx: 0,
    vy: 0,
    isOn: false,
    lastState: state,
    numericNorm: 0.35,
    lightBrightness: 0,
    timerUrgency: 0,
    unavailable: state === "unavailable" || state === "unknown",
    placed: false,
  };

  applyVisualState(particle, hass, min, max);
  return particle;
}

function layoutMetrics(
  width: number,
  height: number
): {
  cx: number;
  cy: number;
  halfW: number;
  halfH: number;
  scale: number;
  clampX: number;
  clampY: number;
} {
  const cx = width / 2;
  const infoReserve = Math.min(height * 0.22, 72);
  const cy = (height - infoReserve) / 2;
  const padX = Math.max(10, width * 0.06);
  const padY = Math.max(10, height * 0.06 + infoReserve * 0.35);
  const halfW = Math.max(1, width / 2 - padX);
  const halfH = Math.max(1, (height - infoReserve) / 2 - padY);
  return {
    cx,
    cy,
    halfW,
    halfH,
    scale: Math.min(width, height),
    clampX: halfW,
    clampY: halfH,
  };
}

export function orbitTarget(
  particle: ReactorParticle,
  width: number,
  height: number,
  timeMs: number
): { x: number; y: number } {
  const { cx, cy, halfW, halfH } = layoutMetrics(width, height);
  const shellRadius = SHELL_RADII[particle.shell % SHELL_RADII.length];
  const slotAngle =
    (particle.slot / Math.max(1, particle.slotsOnShell)) * TAU +
    particle.seed * 0.55;
  const angle = slotAngle + particle.phase;
  const rx = halfW * shellRadius;
  const ry = halfH * shellRadius * particle.orbitRyScale;

  const ox = Math.cos(angle) * rx;
  const oy = Math.sin(angle) * ry;
  const tilt = particle.orbitTilt;
  let x = cx + ox * Math.cos(tilt) - oy * Math.sin(tilt);
  let y = cy + ox * Math.sin(tilt) + oy * Math.cos(tilt);

  const t = timeMs * 0.001;
  const wobble = 0.028 + particle.seed * 0.018;
  x += Math.cos(t * particle.wobbleSpeed + particle.seed * 11) * rx * wobble;
  y += Math.sin(t * particle.wobbleSpeed * 1.23 + particle.seedY * 9) * ry * wobble;

  return { x, y };
}

export function placeParticle(
  particle: ReactorParticle,
  width: number,
  height: number,
  timeMs: number
): void {
  const target = orbitTarget(particle, width, height, timeMs);
  particle.x = target.x;
  particle.y = target.y;
  particle.placed = true;
}

export function syncParticles(
  particles: ReactorParticle[],
  hass: HomeAssistant,
  config: ReactorCoreCardConfig,
  pulses: ReactorPulse[],
  width = 0,
  height = 0,
  timeMs = 0
): { particles: ReactorParticle[]; changedIds: string[] } {
  const min = config.min ?? DEFAULT_MIN;
  const max = config.max ?? DEFAULT_MAX;
  const entityIds = discoverEntityIds(hass, config);
  const byId = new Map(particles.map((particle) => [particle.entityId, particle]));
  const next: ReactorParticle[] = [];
  const changedIds: string[] = [];

  for (let index = 0; index < entityIds.length; index += 1) {
    const entityId = entityIds[index];
    const existing = byId.get(entityId);
    if (existing) {
      const layout = shellLayout(index, entityIds.length);
      const state = hass.states[entityId]?.state ?? "";

      existing.shell = layout.shell;
      existing.slot = layout.slot;
      existing.slotsOnShell = layout.slotsOnShell;

      if (existing.lastState !== undefined && state !== existing.lastState) {
        spawnPulse(existing, pulses);
        changedIds.push(entityId);
      }
      existing.lastState = state;
      applyVisualState(existing, hass, min, max);

      next.push(existing);
      continue;
    }

    const created = createParticle(
      hass,
      entityId,
      min,
      max,
      index,
      entityIds.length
    );
    if (width > 0 && height > 0) {
      placeParticle(created, width, height, timeMs);
    }
    next.push(created);
  }

  return { particles: next, changedIds };
}

function paletteColor(
  particle: ReactorParticle,
  timeMs: number,
  alpha: number
): string {
  const hue = pulseHue(particle.seed, timeMs);

  let sat = 82;
  let light = 58;
  if (particle.unavailable) {
    sat = 18;
    light = 42;
  }

  return `hsla(${hue}, ${sat}%, ${light}%, ${alpha})`;
}

interface OrbLayer {
  x: number;
  y: number;
  radius: number;
  color: string;
}

interface OrbLayers {
  halo?: OrbLayer;
  core: OrbLayer;
}

function drawOrbLayers(ctx: CanvasRenderingContext2D, layers: OrbLayer[]): void {
  for (const layer of layers) {
    ctx.beginPath();
    ctx.arc(layer.x, layer.y, layer.radius, 0, TAU);
    ctx.fillStyle = layer.color;
    ctx.fill();
  }
}

function glowDotLayers(
  x: number,
  y: number,
  radius: number,
  color: string,
  glow: number,
  haloScale = 0.5
): OrbLayers {
  const haloRadius = radius * (1 + glow * haloScale);
  const layers: OrbLayers = {
    core: { x, y, radius, color },
  };

  if (haloRadius > radius * 1.02) {
    layers.halo = {
      x,
      y,
      radius: haloRadius,
      color: color.replace(/[\d.]+\)$/, `${0.07 + glow * 0.1})`),
    };
  }

  return layers;
}

function toggleOrbLayers(
  particle: ReactorParticle,
  scale: number,
  timeMs: number
): OrbLayers {
  const coreRadius = defaultOrbRadius(scale, "toggle");
  const flashSpeed = particle.isOn ? 0.009 : 0.007;
  const pulse = Math.sin(timeMs * flashSpeed + particle.seed * 12);
  const bright = (pulse + 1) / 2;
  const hue = pulseHue(particle.seed, timeMs);
  const coreSat = particle.unavailable
    ? 18
    : particle.isOn
      ? OFF_ORB_SAT + bright * (88 - OFF_ORB_SAT)
      : OFF_ORB_SAT;
  const coreLight = particle.unavailable
    ? 42
    : particle.isOn
      ? OFF_ORB_LIGHT + bright * (58 - OFF_ORB_LIGHT)
      : OFF_ORB_LIGHT;
  const coreAlpha = particle.unavailable
    ? 0.18
    : particle.isOn
      ? OFF_ORB_ALPHA + bright * (0.78 - OFF_ORB_ALPHA)
      : OFF_ORB_ALPHA;
  const coreColor = `hsla(${hue}, ${coreSat}%, ${coreLight}%, ${coreAlpha})`;

  const haloRadius = particle.unavailable
    ? coreRadius * 1.08
    : particle.isOn
      ? coreRadius * (OFF_ORB_HALO_SCALE + bright * 0.4)
      : coreRadius * OFF_ORB_HALO_SCALE;
  const haloColor = `hsla(${hue}, ${coreSat}%, ${Math.max(coreLight - 6, 40)}%, ${
    particle.isOn ? OFF_ORB_HALO_ALPHA + bright * 0.12 : OFF_ORB_HALO_ALPHA
  })`;

  return {
    halo:
      haloRadius > coreRadius * 1.02
        ? {
            x: particle.x,
            y: particle.y,
            radius: haloRadius,
            color: haloColor,
          }
        : undefined,
    core: {
      x: particle.x,
      y: particle.y,
      radius: coreRadius,
      color: coreColor,
    },
  };
}

function lightOrbLayers(
  particle: ReactorParticle,
  scale: number,
  timeMs: number
): OrbLayers {
  const brightness = particle.lightBrightness;
  const coreRadius = defaultOrbRadius(scale, "light");
  const alpha = particle.unavailable
    ? 0.25
    : particle.isOn
      ? 0.55 + brightness * 0.35
      : 0.18;
  const color =
    particle.lightColor ??
    (particle.isOn
      ? "rgb(255, 183, 77)"
      : paletteColor(particle, timeMs, 0.25));
  const coreColor = withAlpha(color, alpha);
  const haloRadius = particle.unavailable
    ? coreRadius * 1.08
    : particle.isOn
      ? coreRadius * (1.35 + brightness * 2.15)
      : coreRadius * 1.08;
  const haloColor = withAlpha(color, particle.isOn ? 0.08 + brightness * 0.16 : 0.05);

  return {
    halo:
      haloRadius > coreRadius * 1.02
        ? {
            x: particle.x,
            y: particle.y,
            radius: haloRadius,
            color: haloColor,
          }
        : undefined,
    core: {
      x: particle.x,
      y: particle.y,
      radius: coreRadius,
      color: coreColor,
    },
  };
}

function timerOrbLayers(
  particle: ReactorParticle,
  scale: number,
  timeMs: number
): OrbLayers {
  const urgency = particle.timerUrgency;
  const coreRadius = defaultOrbRadius(scale, "timer");
  const flashSpeed = 0.005 + urgency * 0.048;
  const pulse = Math.sin(timeMs * flashSpeed + particle.seed * 10);
  const bright = (pulse + 1) / 2;
  const hueShift = bright * pulse * (24 + urgency * 36);
  const baseHue = pulseHue(particle.seed, timeMs);
  const hue = (baseHue + hueShift + 360) % 360;
  const peakLight = 52 + urgency * 6;
  const peakAlpha = 0.38 + urgency * 0.24;
  const coreSat = particle.unavailable
    ? 18
    : OFF_ORB_SAT + bright * (88 - OFF_ORB_SAT);
  const coreLight = particle.unavailable
    ? 42
    : OFF_ORB_LIGHT + bright * (peakLight - OFF_ORB_LIGHT);
  const coreAlpha = particle.unavailable
    ? 0.25
    : OFF_ORB_ALPHA + bright * (peakAlpha - OFF_ORB_ALPHA);
  const coreColor = `hsla(${hue}, ${coreSat}%, ${coreLight}%, ${coreAlpha})`;
  const haloRadius = particle.unavailable
    ? coreRadius * 1.08
    : coreRadius * (OFF_ORB_HALO_SCALE + bright * (0.35 + urgency * 0.45));
  const haloColor = `hsla(${hue}, ${coreSat}%, ${Math.max(coreLight - 4, 40)}%, ${
    OFF_ORB_HALO_ALPHA + bright * (0.08 + urgency * 0.12)
  })`;

  return {
    halo:
      haloRadius > coreRadius * 1.02
        ? {
            x: particle.x,
            y: particle.y,
            radius: haloRadius,
            color: haloColor,
          }
        : undefined,
    core: {
      x: particle.x,
      y: particle.y,
      radius: coreRadius,
      color: coreColor,
    },
  };
}

function defaultOrbLayers(
  particle: ReactorParticle,
  scale: number,
  timeMs: number
): OrbLayers {
  const baseRadius =
    particle.kind === "numeric"
      ? numericRadius(scale, particle.numericNorm)
      : defaultOrbRadius(scale, particle.kind);
  const alpha = particle.unavailable ? 0.28 : 0.78;
  const color = paletteColor(particle, timeMs, alpha);
  return glowDotLayers(
    particle.x,
    particle.y,
    baseRadius,
    color,
    alpha * 0.65
  );
}

function particleOrbLayers(
  particle: ReactorParticle,
  scale: number,
  timeMs: number
): OrbLayers {
  switch (particle.kind) {
    case "toggle":
      return toggleOrbLayers(particle, scale, timeMs);
    case "light":
      return lightOrbLayers(particle, scale, timeMs);
    case "timer":
      return timerOrbLayers(particle, scale, timeMs);
    default:
      return defaultOrbLayers(particle, scale, timeMs);
  }
}

function drawGlowDot(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string,
  glow: number,
  haloScale = 0.5
): void {
  const layers = glowDotLayers(x, y, radius, color, glow, haloScale);
  if (layers.halo) {
    drawOrbLayers(ctx, [layers.halo]);
  }
  drawOrbLayers(ctx, [layers.core]);
}

function withAlpha(color: string, alpha: number): string {
  const rgb = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (rgb) {
    return `rgba(${rgb[1]}, ${rgb[2]}, ${rgb[3]}, ${alpha})`;
  }
  const hsla = color.match(/hsla?\(([^)]+)\)/);
  if (hsla) {
    return color.replace(/[\d.]+\)$/, `${alpha})`);
  }
  return color;
}

function simulateParticles(
  particles: ReactorParticle[],
  width: number,
  height: number,
  delta: number,
  timeMs: number,
  motion: number
): void {
  const { cx, cy, scale, clampX, clampY } = layoutMetrics(width, height);
  const refRadius = scale * 0.012;
  const spring = 0.0032 * motion;
  const repulse = 0.018 * motion;
  const damping = 0.88;

  for (const particle of particles) {
    const particleRadius = orbRadiusForSpeed(particle, scale);

    particle.phase +=
      particle.baseOrbitSpeed *
      orbitSpeedMultiplier(particle, scale) *
      delta;

    const target = orbitTarget(particle, width, height, timeMs);
    particle.vx += (target.x - particle.x) * spring * delta;
    particle.vy += (target.y - particle.y) * spring * delta;

    for (const other of particles) {
      if (other === particle) {
        continue;
      }
      const otherRadius = orbRadiusForSpeed(other, scale);
      const pairDist = (particleRadius + otherRadius) * 2.1;
      const dx = particle.x - other.x;
      const dy = particle.y - other.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 0.5 && dist < pairDist) {
        const overlap = (pairDist - dist) / pairDist;
        const otherInfluence = otherRadius / refRadius;
        const push = overlap ** 1.2 * repulse * otherInfluence * delta;
        particle.vx += (dx / dist) * push;
        particle.vy += (dy / dist) * push;
      }
    }

    const toCenterX = cx - particle.x;
    const toCenterY = cy - particle.y;
    const centerDist = Math.hypot(toCenterX, toCenterY);
    const limit = Math.min(clampX, clampY) * 0.96;
    if (centerDist > limit) {
      particle.vx += (toCenterX / centerDist) * 0.006 * delta * motion;
      particle.vy += (toCenterY / centerDist) * 0.006 * delta * motion;
    }

    particle.vx *= damping;
    particle.vy *= damping;
    particle.x += particle.vx * delta * motion * 16;
    particle.y += particle.vy * delta * motion * 16;
    particle.x = Math.min(cx + clampX, Math.max(cx - clampX, particle.x));
    particle.y = Math.min(cy + clampY, Math.max(cy - clampY, particle.y));
    particle.placed = true;
  }
}

export function updatePulses(
  pulses: ReactorPulse[],
  deltaMs: number
): void {
  for (let i = pulses.length - 1; i >= 0; i -= 1) {
    pulses[i].age += deltaMs;
    if (pulses[i].age >= PULSE_LIFE_MS) {
      pulses.splice(i, 1);
    }
  }
}

export function updateParticles(
  particles: ReactorParticle[],
  hass: HomeAssistant | undefined,
  config: ReactorCoreCardConfig | undefined,
  width: number,
  height: number,
  delta: number,
  timeMs: number,
  reducedMotion: boolean
): void {
  const motion = reducedMotion ? 0.15 : 1;
  const min = config?.min ?? DEFAULT_MIN;
  const max = config?.max ?? DEFAULT_MAX;

  if (hass) {
    for (const particle of particles) {
      if (
        particle.kind === "timer" ||
        particle.kind === "light" ||
        particle.kind === "numeric" ||
        particle.kind === "toggle"
      ) {
        applyVisualState(particle, hass, min, max);
      }
    }
  }

  simulateParticles(particles, width, height, delta, timeMs, motion);
}

export function drawPulses(
  ctx: CanvasRenderingContext2D,
  pulses: ReactorPulse[],
  scale: number,
  timeMs: number
): void {
  for (const pulse of pulses) {
    const t = pulse.age / PULSE_LIFE_MS;
    const radius = scale * (0.03 + t * 0.48);
    const alpha = (1 - t) ** 1.2 * 0.11;
    const hue = pulseHue(pulse.seed, timeMs);

    ctx.beginPath();
    ctx.arc(pulse.x, pulse.y, radius, 0, TAU);
    ctx.strokeStyle = `hsla(${hue}, 86%, 64%, ${alpha})`;
    ctx.lineWidth = 1 + (1 - t) * 1.4;
    ctx.stroke();
  }
}

export interface ReactorConnection {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  seed: number;
}

function drawConnections(
  ctx: CanvasRenderingContext2D,
  connections: ReactorConnection[],
  scale: number,
  timeMs: number
): void {
  for (const connection of connections) {
    const hue = pulseHue(connection.seed, timeMs);
    const color = `hsla(${hue}, 78%, 62%, 0.42)`;

    ctx.beginPath();
    ctx.moveTo(connection.fromX, connection.fromY);
    ctx.lineTo(connection.toX, connection.toY);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(connection.toX, connection.toY, scale * 0.0045, 0, TAU);
    ctx.fillStyle = color.replace(/[\d.]+\)$/, "0.65)");
    ctx.fill();
  }
}

export function drawReactor(
  ctx: CanvasRenderingContext2D,
  particles: ReactorParticle[],
  pulses: ReactorPulse[],
  width: number,
  height: number,
  timeMs: number,
  connections: ReactorConnection[] = []
): void {
  const { cx, cy, scale } = layoutMetrics(width, height);

  ctx.clearRect(0, 0, width, height);

  const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, scale * 0.72);
  bg.addColorStop(0, "hsla(200, 70%, 58%, 0.06)");
  bg.addColorStop(0.35, "hsla(260, 55%, 42%, 0.03)");
  bg.addColorStop(1, "hsla(0, 0%, 0%, 0)");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  drawPulses(ctx, pulses, scale, timeMs);

  const halos: OrbLayer[] = [];
  const cores: OrbLayer[] = [];

  for (const particle of particles) {
    const layers = particleOrbLayers(particle, scale, timeMs);
    if (layers.halo) {
      halos.push(layers.halo);
    }
    cores.push(layers.core);
  }

  drawOrbLayers(ctx, halos);

  if (connections.length) {
    drawConnections(ctx, connections, scale, timeMs);
  }

  drawOrbLayers(ctx, cores);

  const corePulse = 0.55 + Math.sin(timeMs * 0.0018) * 0.12;
  const coreHue =
    PALETTE_HUES[Math.floor((timeMs * 0.000014) % PALETTE_HUES.length)];
  drawGlowDot(
    ctx,
    cx,
    cy,
    scale * 0.012 * corePulse,
    `hsla(${coreHue}, 88%, 68%, 0.65)`,
    0.5,
    0.3
  );
}
