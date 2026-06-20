import type { HomeAssistant } from "../../types";
import { isBinaryEntity } from "../../utils/history-data";
import {
  normalizeValue,
  parseNumericState,
} from "../../utils/power-lightning";
import type { ReactorCoreCardConfig } from "./reactor-core-card-config";
import {
  DEFAULT_DOMAINS,
  DEFAULT_MAX,
  DEFAULT_MAX_PARTICLES,
  DEFAULT_MIN,
} from "./const";

export type ParticleKind = "binary" | "numeric" | "other";

/** Normalized radii for concentric orbital shells (fraction of usable half-axis). */
const SHELL_RADII = [0.42, 0.58, 0.72, 0.84];

export interface ReactorParticle {
  entityId: string;
  kind: ParticleKind;
  seed: number;
  seedY: number;
  x: number;
  y: number;
  /** Accumulated orbit phase (radians). */
  phase: number;
  shell: number;
  slot: number;
  slotsOnShell: number;
  /** Ellipse plane rotation (radians). */
  orbitTilt: number;
  /** Vertical squash for tilted ellipses. */
  orbitRyScale: number;
  orbitSpeed: number;
  wobbleSpeed: number;
  trail: { x: number; y: number }[];
  trailCapacity: number;
  binaryOn: boolean;
  flash: number;
  lastState?: string;
  numericNorm: number;
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

export function classifyParticleKind(
  hass: HomeAssistant,
  entityId: string
): ParticleKind {
  if (isBinaryEntity(entityId)) {
    return "binary";
  }

  const state = hass.states[entityId]?.state;
  if (parseNumericState(state) !== undefined) {
    return "numeric";
  }

  return "other";
}

function isBinaryOn(hass: HomeAssistant, entityId: string): boolean {
  const state = hass.states[entityId]?.state;
  if (state === undefined || state === "unavailable" || state === "unknown") {
    return false;
  }
  return (
    state === "on" ||
    state === "true" ||
    state === "open" ||
    state === "home"
  );
}

function numericNormForEntity(
  hass: HomeAssistant,
  entityId: string,
  min: number,
  max: number
): number {
  const value = parseNumericState(hass.states[entityId]?.state);
  if (value === undefined) {
    return 0.35;
  }
  return normalizeValue(value, min, max);
}

function trailCapacityFor(kind: ParticleKind, numericNorm: number): number {
  if (kind === "binary") {
    return 0;
  }
  if (kind === "numeric") {
    return Math.round(4 + numericNorm * 12);
  }
  return 8;
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
  const kind = classifyParticleKind(hass, entityId);
  const numericNorm = numericNormForEntity(hass, entityId, min, max);
  const state = hass.states[entityId]?.state;
  const direction = layout.shell % 2 === 0 ? 1 : -1;

  return {
    entityId,
    kind,
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
    orbitSpeed: direction * (0.00055 + seed * 0.00075),
    wobbleSpeed: 0.0016 + seedY * 0.0024,
    trail: [],
    trailCapacity: trailCapacityFor(kind, numericNorm),
    binaryOn: isBinaryOn(hass, entityId),
    flash: 0,
    lastState: state,
    numericNorm,
    unavailable: state === "unavailable" || state === "unknown",
    placed: false,
  };
}

function layoutMetrics(
  width: number,
  height: number
): { cx: number; cy: number; halfW: number; halfH: number; scale: number } {
  const cx = width / 2;
  const cy = height / 2;
  const padX = Math.max(10, width * 0.06);
  const padY = Math.max(10, height * 0.06);
  return {
    cx,
    cy,
    halfW: Math.max(1, width / 2 - padX),
    halfH: Math.max(1, height / 2 - padY),
    scale: Math.min(width, height),
  };
}

/** Deterministic position on a tilted elliptical shell. */
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
      const kind = classifyParticleKind(hass, entityId);
      const numericNorm = numericNormForEntity(hass, entityId, min, max);
      const binaryOn = isBinaryOn(hass, entityId);
      const state = hass.states[entityId]?.state ?? "";

      existing.shell = layout.shell;
      existing.slot = layout.slot;
      existing.slotsOnShell = layout.slotsOnShell;

      if (
        existing.lastState !== undefined &&
        state !== existing.lastState
      ) {
        existing.flash = 1;
      }
      existing.lastState = state;
      existing.kind = kind;
      existing.numericNorm = numericNorm;
      existing.binaryOn = binaryOn;
      existing.trailCapacity = trailCapacityFor(kind, numericNorm);
      existing.unavailable =
        hass.states[entityId]?.state === "unavailable" ||
        hass.states[entityId]?.state === "unknown";
      if (existing.trail.length > existing.trailCapacity) {
        existing.trail = existing.trail.slice(-existing.trailCapacity);
      }

      if (width > 0 && height > 0) {
        placeParticle(existing, width, height, timeMs);
      }
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

function particleColor(
  particle: ReactorParticle,
  timeMs: number,
  alpha: number
): string {
  const cycle =
    (timeMs * 0.000014 + particle.seed * 0.31) % PALETTE_HUES.length;
  const idx = Math.floor(cycle);
  const next = (idx + 1) % PALETTE_HUES.length;
  const blend = cycle - idx;
  const hue =
    PALETTE_HUES[idx] + (PALETTE_HUES[next] - PALETTE_HUES[idx]) * blend;

  let sat = 82;
  let light = 58;
  if (particle.kind === "binary") {
    sat = particle.binaryOn ? 96 : 58;
    light = particle.binaryOn ? 70 : 38;
  } else if (particle.unavailable) {
    sat = 18;
    light = 42;
  }

  return `hsla(${hue}, ${sat}%, ${light}%, ${alpha})`;
}

function pushTrail(particle: ReactorParticle): void {
  if (particle.trailCapacity <= 0) {
    particle.trail = [];
    return;
  }

  const last = particle.trail[particle.trail.length - 1];
  if (last && Math.hypot(particle.x - last.x, particle.y - last.y) < 2.5) {
    return;
  }

  particle.trail.push({ x: particle.x, y: particle.y });
  if (particle.trail.length > particle.trailCapacity) {
    particle.trail.shift();
  }
}

function drawTrail(
  ctx: CanvasRenderingContext2D,
  particle: ReactorParticle,
  timeMs: number
): void {
  const trail = particle.trail;
  if (trail.length < 2) {
    return;
  }

  for (let i = 1; i < trail.length; i += 1) {
    const t = i / trail.length;
    ctx.beginPath();
    ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
    ctx.lineTo(trail[i].x, trail[i].y);
    ctx.strokeStyle = particleColor(particle, timeMs, 0.06 + t * 0.34);
    ctx.lineWidth = 0.8 + t * 1.6;
    ctx.stroke();
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
  ctx.beginPath();
  ctx.arc(x, y, radius * (1 + glow * haloScale), 0, TAU);
  ctx.fillStyle = color.replace(/[\d.]+\)$/, `${0.07 + glow * 0.1})`);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, TAU);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawShellGuides(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  shellCount: number,
  timeMs: number
): void {
  const { cx, cy, halfW, halfH } = layoutMetrics(width, height);
  const hue = PALETTE_HUES[Math.floor((timeMs * 0.00001) % PALETTE_HUES.length)];

  for (let i = 0; i < shellCount; i += 1) {
    const radius = SHELL_RADII[i % SHELL_RADII.length];
    ctx.beginPath();
    ctx.ellipse(
      cx,
      cy,
      halfW * radius,
      halfH * radius * 0.78,
      0,
      0,
      TAU
    );
    ctx.strokeStyle = `hsla(${hue}, 55%, 55%, 0.07)`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

export function updateParticles(
  particles: ReactorParticle[],
  width: number,
  height: number,
  delta: number,
  timeMs: number,
  reducedMotion: boolean
): void {
  const motion = reducedMotion ? 0.15 : 1;

  for (const particle of particles) {
    particle.phase += particle.orbitSpeed * delta * motion;
    placeParticle(particle, width, height, timeMs);

    if (particle.flash > 0) {
      particle.flash = Math.max(0, particle.flash - delta * 0.0045);
    }

    if (particle.placed) {
      pushTrail(particle);
    }
  }
}

export function drawReactor(
  ctx: CanvasRenderingContext2D,
  particles: ReactorParticle[],
  width: number,
  height: number,
  timeMs: number
): void {
  const { cx, cy, scale } = layoutMetrics(width, height);
  const shellCount = Math.min(
    SHELL_RADII.length,
    Math.max(2, Math.ceil(Math.sqrt(Math.max(1, particles.length))))
  );

  ctx.clearRect(0, 0, width, height);

  drawShellGuides(ctx, width, height, shellCount, timeMs);

  for (const particle of particles) {
    drawTrail(ctx, particle, timeMs);
  }

  for (const particle of particles) {
    const flashBoost = particle.flash;
    const baseRadius =
      (particle.kind === "binary"
        ? scale * 0.022
        : particle.kind === "numeric"
          ? scale * 0.011 + particle.numericNorm * scale * 0.007
          : scale * 0.013) *
      (1 + flashBoost * 0.45);

    let alpha = particle.unavailable ? 0.28 : 0.78;
    if (particle.kind === "binary") {
      const pulse = particle.binaryOn
        ? 0.55 + Math.sin(timeMs * 0.012 + particle.seed * 12) * 0.35
        : 0.35;
      alpha = pulse;
    }
    alpha = Math.min(1, alpha + flashBoost * 0.55);

    const color = particleColor(particle, timeMs, alpha);
    drawGlowDot(ctx, particle.x, particle.y, baseRadius, color, alpha);
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

export function clearParticleTrails(particles: ReactorParticle[]): void {
  for (const particle of particles) {
    particle.trail = [];
  }
}
