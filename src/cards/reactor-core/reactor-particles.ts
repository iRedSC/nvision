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
  orbitRadius: number;
  orbitSpeed: number;
  epicycleRadius: number;
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

function createParticle(
  hass: HomeAssistant,
  entityId: string,
  min: number,
  max: number,
  scale: number
): ReactorParticle {
  const seed = hashSeed(entityId);
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
    orbitRadius: scale * (0.12 + seed * 0.28),
    orbitSpeed: 0.0009 + seed * 0.0016,
    epicycleRadius: scale * (0.018 + seed * 0.045),
    epicycleSpeed: 0.0014 + seed * 0.0022,
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
  config: ReactorCoreCardConfig,
  scale: number
): ReactorParticle[] {
  const min = config.min ?? DEFAULT_MIN;
  const max = config.max ?? DEFAULT_MAX;
  const entityIds = discoverEntityIds(hass, config);
  const byId = new Map(particles.map((particle) => [particle.entityId, particle]));
  const next: ReactorParticle[] = [];

  for (const entityId of entityIds) {
    const existing = byId.get(entityId);
    if (existing) {
      const kind = classifyParticleKind(hass, entityId);
      const numericNorm = numericNormForEntity(hass, entityId, min, max);
      const binaryOn = isBinaryOn(hass, entityId);
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

    next.push(createParticle(hass, entityId, min, max, scale));
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
  glow: number
): void {
  ctx.beginPath();
  ctx.arc(x, y, radius * (1 + glow * 0.8), 0, Math.PI * 2);
  ctx.fillStyle = color.replace(/[\d.]+\)$/, `${0.12 + glow * 0.18})`);
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
  const motion = reducedMotion ? 0.12 : 1;
  const t = timeMs * 0.001;

  for (const particle of particles) {
    particle.angle += particle.orbitSpeed * delta * motion;

    const orbitX =
      cx + Math.cos(particle.angle + particle.seed * 6.28) * particle.orbitRadius;
    const orbitY =
      cy +
      Math.sin(particle.angle * 0.83 + particle.seed * 4.17) *
        particle.orbitRadius *
        0.88;

    const epX =
      Math.cos(t * particle.epicycleSpeed + particle.seed * 9.1) *
      particle.epicycleRadius;
    const epY =
      Math.sin(t * particle.epicycleSpeed * 1.27 + particle.seed * 5.3) *
      particle.epicycleRadius;

    let x = orbitX + epX;
    let y = orbitY + epY;

    for (const other of particles) {
      if (other === particle) {
        continue;
      }
      const dx = x - other.x;
      const dy = y - other.y;
      const dist = Math.hypot(dx, dy);
      const minDist = scale * 0.07;
      if (dist > 0.5 && dist < minDist) {
        const push = ((minDist - dist) / minDist) * scale * 0.012 * motion;
        x += (dx / dist) * push;
        y += (dy / dist) * push;
      }
    }

    const toCenterX = cx - x;
    const toCenterY = cy - y;
    const centerDist = Math.hypot(toCenterX, toCenterY);
    const limit = scale * 0.44;
    if (centerDist > limit) {
      const pull = (centerDist - limit) * 0.035 * motion;
      x += (toCenterX / centerDist) * pull;
      y += (toCenterY / centerDist) * pull;
    }

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

  const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, scale * 0.55);
  bg.addColorStop(0, "hsla(200, 70%, 58%, 0.12)");
  bg.addColorStop(0.45, "hsla(260, 55%, 42%, 0.06)");
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
    scale * 0.022 * corePulse,
    `hsla(${coreHue}, 88%, 68%, 0.85)`,
    0.9
  );
}
