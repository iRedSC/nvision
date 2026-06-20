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

export interface ReactorParticle {
  entityId: string;
  kind: ParticleKind;
  seed: number;
  x: number;
  y: number;
  angle: number;
  /** Fraction of usable half-axis (width/height), spread across inner–outer shells */
  orbitRxFactor: number;
  orbitRyFactor: number;
  orbitSpeed: number;
  epicycleRxFactor: number;
  epicycleRyFactor: number;
  epicycleSpeed: number;
  trail: { x: number; y: number }[];
  trailCapacity: number;
  binaryOn: boolean;
  flash: number;
  numericNorm: number;
  unavailable: boolean;
}

const PALETTE_HUES = [185, 198, 215, 248, 278, 312, 42];

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
  return state === "on" || state === "true" || state === "open" || state === "home";
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
    return Math.round(5 + numericNorm * 16);
  }
  return 10;
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

function orbitFactors(
  seed: number,
  seedY: number,
  band: number
): { rx: number; ry: number; epRx: number; epRy: number } {
  const shell = 0.34 + band * 0.58;
  const jitter = (seed - 0.5) * 0.14;
  const rx = Math.min(0.94, Math.max(0.28, shell + jitter));
  const ry = Math.min(0.94, Math.max(0.28, shell + (seedY - 0.5) * 0.14));
  return {
    rx,
    ry,
    epRx: 0.06 + seed * 0.1,
    epRy: 0.06 + seedY * 0.08,
  };
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
  const band = count > 1 ? index / (count - 1) : 0.5;
  const orbit = orbitFactors(seed, seedY, band);
  const kind = classifyParticleKind(hass, entityId);
  const numericNorm = numericNormForEntity(hass, entityId, min, max);
  const state = hass.states[entityId]?.state;

  return {
    entityId,
    kind,
    seed,
    x: 0,
    y: 0,
    angle: seed * Math.PI * 2,
    orbitRxFactor: orbit.rx,
    orbitRyFactor: orbit.ry,
    orbitSpeed: 0.0007 + seed * 0.0012,
    epicycleRxFactor: orbit.epRx,
    epicycleRyFactor: orbit.epRy,
    epicycleSpeed: 0.0011 + seed * 0.0018,
    trail: [],
    trailCapacity: trailCapacityFor(kind, numericNorm),
    binaryOn: isBinaryOn(hass, entityId),
    flash: 0,
    numericNorm,
    unavailable: state === "unavailable" || state === "unknown",
  };
}

export function syncParticles(
  particles: ReactorParticle[],
  hass: HomeAssistant,
  config: ReactorCoreCardConfig
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
      const kind = classifyParticleKind(hass, entityId);
      const numericNorm = numericNormForEntity(hass, entityId, min, max);
      const binaryOn = isBinaryOn(hass, entityId);
      const band = entityIds.length > 1 ? index / (entityIds.length - 1) : 0.5;
      const orbit = orbitFactors(
        existing.seed,
        hashSeed(`${entityId}:y`),
        band
      );
      existing.orbitRxFactor = orbit.rx;
      existing.orbitRyFactor = orbit.ry;
      existing.epicycleRxFactor = orbit.epRx;
      existing.epicycleRyFactor = orbit.epRy;
      if (binaryOn !== existing.binaryOn) {
        existing.flash = 1;
      }
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
      next.push(existing);
      continue;
    }

    next.push(createParticle(hass, entityId, min, max, index, entityIds.length));
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
    ctx.strokeStyle = particleColor(particle, timeMs, 0.08 + t * 0.42);
    ctx.lineWidth = 1 + t * 2.2;
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
  haloScale = 0.45
): void {
  ctx.beginPath();
  ctx.arc(x, y, radius * (1 + glow * haloScale), 0, Math.PI * 2);
  ctx.fillStyle = color.replace(/[\d.]+\)$/, `${0.08 + glow * 0.12})`);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

export function updateParticles(
  particles: ReactorParticle[],
  width: number,
  height: number,
  delta: number,
  timeMs: number,
  reducedMotion: boolean
): void {
  const cx = width / 2;
  const cy = height / 2;
  const scale = Math.min(width, height);
  const halfW = width * 0.5;
  const halfH = height * 0.5;
  const padX = Math.max(8, width * 0.04);
  const padY = Math.max(8, height * 0.04);
  const motion = reducedMotion ? 0.12 : 1;
  const t = timeMs * 0.001;

  for (const particle of particles) {
    particle.angle += particle.orbitSpeed * delta * motion;

    const rx = (halfW - padX) * particle.orbitRxFactor;
    const ry = (halfH - padY) * particle.orbitRyFactor;
    const epRx = (halfW - padX) * particle.epicycleRxFactor;
    const epRy = (halfH - padY) * particle.epicycleRyFactor;

    const orbitX =
      cx + Math.cos(particle.angle + particle.seed * 6.28) * rx;
    const orbitY =
      cy +
      Math.sin(particle.angle * 0.83 + particle.seed * 4.17) * ry;

    const epX =
      Math.cos(t * particle.epicycleSpeed + particle.seed * 9.1) * epRx;
    const epY =
      Math.sin(t * particle.epicycleSpeed * 1.27 + particle.seed * 5.3) * epRy;

    let x = orbitX + epX;
    let y = orbitY + epY;

    for (const other of particles) {
      if (other === particle) {
        continue;
      }
      const dx = x - other.x;
      const dy = y - other.y;
      const dist = Math.hypot(dx, dy);
      const minDist = scale * 0.11;
      if (dist > 0.5 && dist < minDist) {
        const push = ((minDist - dist) / minDist) * scale * 0.018 * motion;
        x += (dx / dist) * push;
        y += (dy / dist) * push;
      }
    }

    const clampX = halfW - padX;
    const clampY = halfH - padY;
    x = Math.min(cx + clampX, Math.max(cx - clampX, x));
    y = Math.min(cy + clampY, Math.max(cy - clampY, y));

    particle.x = x;
    particle.y = y;

    if (particle.flash > 0) {
      particle.flash = Math.max(0, particle.flash - delta * 0.0045);
    }

    pushTrail(particle);
  }
}

export function drawReactor(
  ctx: CanvasRenderingContext2D,
  particles: ReactorParticle[],
  width: number,
  height: number,
  timeMs: number
): void {
  const cx = width / 2;
  const cy = height / 2;
  const scale = Math.min(width, height);

  ctx.clearRect(0, 0, width, height);

  const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, scale * 0.72);
  bg.addColorStop(0, "hsla(200, 70%, 58%, 0.06)");
  bg.addColorStop(0.35, "hsla(260, 55%, 42%, 0.03)");
  bg.addColorStop(1, "hsla(0, 0%, 0%, 0)");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  for (const particle of particles) {
    drawTrail(ctx, particle, timeMs);
  }

  for (const particle of particles) {
    const baseRadius =
      particle.kind === "binary"
        ? scale * 0.028
        : particle.kind === "numeric"
          ? scale * 0.014 + particle.numericNorm * scale * 0.008
          : scale * 0.016;

    let alpha = particle.unavailable ? 0.28 : 0.72;
    if (particle.kind === "binary") {
      const pulse = particle.binaryOn
        ? 0.55 + Math.sin(timeMs * 0.012 + particle.seed * 12) * 0.35
        : 0.35;
      alpha = Math.min(1, pulse + particle.flash * 0.45);
    }

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
    scale * 0.014 * corePulse,
    `hsla(${coreHue}, 88%, 68%, 0.7)`,
    0.55,
    0.35
  );
}
