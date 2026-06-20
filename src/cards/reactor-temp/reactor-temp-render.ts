import { reactorHeatRgb } from "../../utils/colors";
import type { ReactorDirection } from "./reactor-temp-state";

export interface ReactorTempDrawState {
  width: number;
  height: number;
  timeMs: number;
  tempNorm: number;
  direction: ReactorDirection;
  directionStrength: number;
  ice: number;
  reducedMotion: boolean;
}

const LAYER_COUNT = 5;

/** Coolant blues through critical crimson — no white stops. */
const PLASMA: Array<[number, number, number]> = [
  [118, 198, 255],
  [72, 152, 238],
  [48, 214, 196],
  [255, 140, 42],
  [255, 78, 28],
  [220, 32, 24],
  [168, 18, 34],
];

function fract(value: number): number {
  return value - Math.floor(value);
}

function rgba([r, g, b]: [number, number, number], alpha: number): string {
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function mixRgb(
  a: [number, number, number],
  b: [number, number, number],
  t: number
): [number, number, number] {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

function smoothstep(value: number): number {
  const t = Math.min(1, Math.max(0, value));
  return t * t * (3 - 2 * t);
}

function layerColor(
  tempNorm: number,
  layerIndex: number
): [number, number, number] {
  const heat = smoothstep(tempNorm);
  const cold = PLASMA[layerIndex % 3];
  const hot = PLASMA[3 + (layerIndex % (PLASMA.length - 3))];

  if (heat < 0.32) {
    return mixRgb(cold, PLASMA[2], heat / 0.32);
  }

  if (heat < 0.68) {
    return mixRgb(PLASMA[2], hot, (heat - 0.32) / 0.36);
  }

  const critical = mixRgb(hot, PLASMA[PLASMA.length - 1], (heat - 0.68) / 0.32);
  return mixRgb(critical, PLASMA[5], layerIndex * 0.04);
}

function writheRadius(
  angle: number,
  radius: number,
  phase: number,
  writhe: number
): number {
  const edge =
    1 +
    Math.sin(angle * 3 + phase * 1.1) * 0.055 * writhe +
    Math.sin(angle * 5 - phase * 0.85) * 0.035 * writhe +
    Math.cos(angle * 2 + phase * 0.6) * 0.04 * writhe;
  return radius * edge;
}

function traceWrithingPath(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  phase: number,
  writhe: number
): void {
  const segments = 64;
  ctx.beginPath();

  for (let index = 0; index <= segments; index++) {
    const angle = (index / segments) * Math.PI * 2;
    const dist = writheRadius(angle, radius, phase, writhe);
    const x = cx + Math.cos(angle) * dist;
    const y = cy + Math.sin(angle) * dist;

    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.closePath();
}

function internalLayerCenter(
  cx: number,
  cy: number,
  radius: number,
  phase: number,
  layer: number,
  writhe: number
): { x: number; y: number } {
  const drift = phase * (0.55 + layer * 0.08) + layer * 1.65;
  const spread = radius * writhe * 0.09;
  return {
    x: cx + Math.cos(drift) * spread + Math.sin(drift * 2.2) * spread * 0.45,
    y: cy + Math.sin(drift * 1.08) * spread + Math.cos(drift * 1.7) * spread * 0.4,
  };
}

function drawPlasmaLayer(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  rgb: [number, number, number],
  alpha: number
): void {
  const core = mixRgb(rgb, [255, 96, 36], 0.22);
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);

  gradient.addColorStop(0, rgba(core, alpha * 0.82));
  gradient.addColorStop(0.35, rgba(rgb, alpha * 0.58));
  gradient.addColorStop(0.72, rgba(mixRgb(rgb, [80, 8, 12], 0.35), alpha * 0.22));
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function vignetteColor(
  direction: ReactorDirection,
  tempNorm: number
): [number, number, number] {
  if (direction === "heating") {
    return reactorHeatRgb(0.62);
  }

  if (direction === "cooling") {
    return reactorHeatRgb(0.1);
  }

  if (direction === "off") {
    return reactorHeatRgb(tempNorm * 0.25);
  }

  return reactorHeatRgb(tempNorm * 0.38);
}

function drawVignette(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  rgb: [number, number, number],
  strength: number
): void {
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.hypot(cx, cy) * 1.08;
  const opacity = 0.28 + strength * 0.42;
  const gradient = ctx.createRadialGradient(
    cx,
    cy,
    radius * 0.34,
    cx,
    cy,
    radius
  );

  gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
  gradient.addColorStop(0.58, rgba(rgb, opacity * 0.18));
  gradient.addColorStop(1, rgba(rgb, opacity * 0.72));

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

function drawIceTexture(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  ice: number,
  timeMs: number
): void {
  if (ice <= 0.01) {
    return;
  }

  const cx = width / 2;
  const cy = height / 2;
  const maxRadius = Math.hypot(cx, cy);
  const crystals = Math.floor(24 + ice * 72);
  const drift = timeMs * 0.00004;

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.lineCap = "round";

  for (let index = 0; index < crystals; index++) {
    const seed = index * 19.173 + 0.5;
    const angle = fract(seed) * Math.PI * 2 + drift * (index % 5);
    const distance = maxRadius * (0.52 + fract(seed * 1.7) * 0.46);
    const x = cx + Math.cos(angle) * distance;
    const y = cy + Math.sin(angle) * distance;
    const length = 6 + fract(seed * 2.9) * 18 * ice;
    const branch = length * 0.42;
    const tilt = angle + (fract(seed * 4.1) - 0.5) * 0.8;
    const alpha = 0.08 + ice * 0.22;

    ctx.strokeStyle = `rgba(220, 240, 255, ${alpha})`;
    ctx.lineWidth = 0.8 + ice * 0.8;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(
      x + Math.cos(tilt) * length,
      y + Math.sin(tilt) * length
    );
    ctx.moveTo(
      x + Math.cos(tilt) * length * 0.55,
      y + Math.sin(tilt) * length * 0.55
    );
    ctx.lineTo(
      x + Math.cos(tilt + 0.9) * branch,
      y + Math.sin(tilt + 0.9) * branch
    );
    ctx.moveTo(
      x + Math.cos(tilt) * length * 0.55,
      y + Math.sin(tilt) * length * 0.55
    );
    ctx.lineTo(
      x + Math.cos(tilt - 0.9) * branch,
      y + Math.sin(tilt - 0.9) * branch
    );
    ctx.stroke();
  }

  ctx.restore();
}

function drawCore(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  tempNorm: number,
  timeMs: number,
  reducedMotion: boolean
): void {
  const cx = width / 2;
  const cy = height / 2;
  const base = Math.min(width, height);
  const heat = smoothstep(tempNorm);
  const radius = base * (0.24 + heat * 0.14);
  const writhe = heat * (1 - heat * 0.62) * 0.9;
  const phase = reducedMotion ? 0 : timeMs * (0.00055 + heat * 0.0011);
  const breathe = 1 + Math.sin(phase * 2.4) * writhe * 0.025;

  ctx.save();
  traceWrithingPath(ctx, cx, cy, radius * breathe, phase, writhe);
  ctx.clip();

  for (let layer = 0; layer < LAYER_COUNT; layer++) {
    const center = internalLayerCenter(cx, cy, radius, phase, layer, writhe);
    const layerRadius = radius * (0.92 - layer * 0.06);
    const rgb = layerColor(tempNorm, layer);
    const alpha = 0.14 + heat * 0.1 - layer * 0.012;

    drawPlasmaLayer(ctx, center.x, center.y, layerRadius, rgb, alpha);
  }

  ctx.restore();

  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  traceWrithingPath(ctx, cx, cy, radius * breathe * 1.02, phase, writhe * 0.85);
  ctx.strokeStyle = rgba(layerColor(tempNorm, 0), 0.06 + heat * 0.1);
  ctx.lineWidth = 1.5 + heat * 2;
  ctx.stroke();
  ctx.restore();
}

export function drawReactorTemp(
  ctx: CanvasRenderingContext2D,
  state: ReactorTempDrawState
): void {
  const { width, height } = state;
  if (width <= 0 || height <= 0) {
    return;
  }

  ctx.clearRect(0, 0, width, height);

  const vignetteStrength = Math.max(
    state.directionStrength,
    state.tempNorm * 0.25
  );
  drawVignette(
    ctx,
    width,
    height,
    vignetteColor(state.direction, state.tempNorm),
    vignetteStrength
  );

  if (state.ice > 0.01) {
    drawIceTexture(ctx, width, height, state.ice, state.timeMs);
  }

  drawCore(
    ctx,
    width,
    height,
    state.tempNorm,
    state.timeMs,
    state.reducedMotion
  );
}
