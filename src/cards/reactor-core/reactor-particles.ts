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

function orbitSpeedMultiplier(particle: ReactorParticle): number {
  if (particle.kind === "numeric") {
    return 0.35 + particle.numericNorm * 1.35;
  }
  return 1;
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
  const direction = layout.shell % 2 === 0 ? 1 : -1;

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
    baseOrbitSpeed: direction * (0.00055 + seed * 0.00075),
    wobbleSpeed: 0.0016 + seedY * 0.0024,
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
  const cy = height / 2;
  const padX = Math.max(10, width * 0.06);
  const padY = Math.max(10, height * 0.06);
  const halfW = Math.max(1, width / 2 - padX);
  const halfH = Math.max(1, height / 2 - padY);
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

export function placeParticle(
  particle: ReactorParticle,
  width: number,
  height: number,
  timeMs: number
): void {
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
  const wobble = 0.035 + particle.seed * 0.025;
  x += Math.cos(t * particle.wobbleSpeed + particle.seed * 11) * rx * wobble;
  y += Math.sin(t * particle.wobbleSpeed * 1.23 + particle.seedY * 9) * ry * wobble;

  particle.x = x;
  particle.y = y;
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
): ReactorParticle[] {
  const min = config.min ?? DEFAULT_MIN;
  const max = config.max ?? DEFAULT_MAX;
  const entityIds = discoverEntityIds(hass, config);
  const byId = new Map(particles.map((particle) => [particle.entityId, particle]));
  const next: ReactorParticle[] = [];

  for (let index = 0; index < entityIds.length; index += 1) {
    const entityId = entityIds[index];
    const existing = byId.get(entityId);
    if (existing) {
      const layout = shellLayout(index, entityIds.length);
      const state = hass.states[entityId]?.state ?? "";

      existing.shell = layout.shell;
      existing.slot = layout.slot;
      existing.slotsOnShell = layout.slotsOnShell;

      if (width > 0 && height > 0) {
        placeParticle(existing, width, height, timeMs);
      }

      if (existing.lastState !== undefined && state !== existing.lastState) {
        spawnPulse(existing, pulses);
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

  return next;
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

function drawGlowDot(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string,
  glow: number,
  haloScale = 0.5
): void {
  ctx.beginPath();
  ctx.arc(x, y, radius * (1 + glow * haloScale), 0, TAU);
  ctx.fillStyle = color.replace(/[\d.]+\)$/, `${0.07 + glow * 0.1})`);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, TAU);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawToggleParticle(
  ctx: CanvasRenderingContext2D,
  particle: ReactorParticle,
  scale: number,
  timeMs: number
): void {
  const coreRadius = scale * 0.014;
  const ringRadius = coreRadius * 2.35;
  const flashSpeed = particle.isOn ? 0.013 : 0.007;
  const ringAlpha = particle.isOn
    ? 0.28 + Math.sin(timeMs * flashSpeed + particle.seed * 12) * 0.42
    : 0.06 + Math.sin(timeMs * flashSpeed + particle.seed * 12) * 0.05;
  const coreAlpha = particle.isOn ? 0.92 : 0.32;
  const hue = pulseHue(particle.seed, timeMs);

  ctx.beginPath();
  ctx.arc(particle.x, particle.y, coreRadius, 0, TAU);
  ctx.fillStyle = particle.unavailable
    ? `hsla(${hue}, 18%, 42%, 0.35)`
    : `hsla(${hue}, ${particle.isOn ? 88 : 42}%, ${particle.isOn ? 62 : 38}%, ${coreAlpha})`;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(particle.x, particle.y, ringRadius, 0, TAU);
  ctx.strokeStyle = particle.unavailable
    ? `hsla(${hue}, 12%, 45%, 0.12)`
    : `hsla(${hue}, ${particle.isOn ? 90 : 35}%, ${particle.isOn ? 68 : 40}%, ${ringAlpha})`;
  ctx.lineWidth = 1.4;
  ctx.stroke();
}

function drawLightParticle(
  ctx: CanvasRenderingContext2D,
  particle: ReactorParticle,
  scale: number,
  timeMs: number
): void {
  const brightness = particle.lightBrightness;
  const radius = scale * (0.008 + brightness * 0.024);
  const alpha = particle.unavailable
    ? 0.25
    : particle.isOn
      ? 0.22 + brightness * 0.72
      : 0.18;
  const color =
    particle.lightColor ??
    (particle.isOn
      ? "rgb(255, 183, 77)"
      : paletteColor(particle, timeMs, 0.25));

  drawGlowDot(ctx, particle.x, particle.y, radius, withAlpha(color, alpha), alpha);
}

function drawTimerParticle(
  ctx: CanvasRenderingContext2D,
  particle: ReactorParticle,
  scale: number,
  timeMs: number
): void {
  const urgency = particle.timerUrgency;
  const flashSpeed = 0.005 + urgency * 0.048;
  const pulse = 0.42 + Math.sin(timeMs * flashSpeed + particle.seed * 10) * 0.38;
  const alpha = particle.unavailable
    ? 0.25
    : Math.min(1, (0.28 + urgency * 0.35) * pulse + 0.2);
  const radius = scale * (0.012 + urgency * 0.008);
  const hue = pulseHue(particle.seed, timeMs);

  drawGlowDot(
    ctx,
    particle.x,
    particle.y,
    radius,
    `hsla(${hue}, 86%, ${58 + urgency * 12}%, ${alpha})`,
    alpha
  );

  if (urgency > 0.05) {
    const ringAlpha = alpha * 0.45 * pulse;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, radius * 2.1, 0, TAU);
    ctx.strokeStyle = `hsla(${hue}, 88%, 64%, ${ringAlpha})`;
    ctx.lineWidth = 1.2;
    ctx.stroke();
  }
}

function drawDefaultParticle(
  ctx: CanvasRenderingContext2D,
  particle: ReactorParticle,
  scale: number,
  timeMs: number
): void {
  const baseRadius =
    particle.kind === "numeric"
      ? scale * 0.011 + particle.numericNorm * scale * 0.007
      : scale * 0.013;
  const alpha = particle.unavailable ? 0.28 : 0.78;
  const color = paletteColor(particle, timeMs, alpha);
  drawGlowDot(ctx, particle.x, particle.y, baseRadius, color, alpha);
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

function applyRepulsion(
  particles: ReactorParticle[],
  width: number,
  height: number,
  motion: number
): void {
  const { cx, cy, scale, clampX, clampY } = layoutMetrics(width, height);
  const minDist = scale * 0.11;

  for (const particle of particles) {
    let x = particle.x;
    let y = particle.y;

    for (const other of particles) {
      if (other === particle) {
        continue;
      }
      const dx = x - other.x;
      const dy = y - other.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 0.5 && dist < minDist) {
        const push = ((minDist - dist) / minDist) * scale * 0.018 * motion;
        x += (dx / dist) * push;
        y += (dy / dist) * push;
      }
    }

    particle.x = Math.min(cx + clampX, Math.max(cx - clampX, x));
    particle.y = Math.min(cy + clampY, Math.max(cy - clampY, y));
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
      if (particle.kind === "timer" || particle.kind === "light") {
        applyVisualState(particle, hass, min, max);
      }
    }
  }

  for (const particle of particles) {
    particle.phase +=
      particle.baseOrbitSpeed *
      orbitSpeedMultiplier(particle) *
      delta *
      motion;
    placeParticle(particle, width, height, timeMs);
  }

  applyRepulsion(particles, width, height, motion);
}

export function drawPulses(
  ctx: CanvasRenderingContext2D,
  pulses: ReactorPulse[],
  scale: number,
  timeMs: number
): void {
  for (const pulse of pulses) {
    const t = pulse.age / PULSE_LIFE_MS;
    const radius = scale * (0.022 + t * 0.42);
    const alpha = (1 - t) * 0.52;
    const hue = pulseHue(pulse.seed, timeMs);

    ctx.beginPath();
    ctx.arc(pulse.x, pulse.y, radius, 0, TAU);
    ctx.strokeStyle = `hsla(${hue}, 88%, 64%, ${alpha})`;
    ctx.lineWidth = 1.2 + (1 - t) * 2.2;
    ctx.stroke();
  }
}

export function drawReactor(
  ctx: CanvasRenderingContext2D,
  particles: ReactorParticle[],
  pulses: ReactorPulse[],
  width: number,
  height: number,
  timeMs: number
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

  for (const particle of particles) {
    switch (particle.kind) {
      case "toggle":
        drawToggleParticle(ctx, particle, scale, timeMs);
        break;
      case "light":
        drawLightParticle(ctx, particle, scale, timeMs);
        break;
      case "timer":
        drawTimerParticle(ctx, particle, scale, timeMs);
        break;
      default:
        drawDefaultParticle(ctx, particle, scale, timeMs);
        break;
    }
  }

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
