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
  const intensity = 0.25 + tempNorm * 0.75;
  const baseRadius = base * (0.14 + intensity * 0.12);
  const phase = reducedMotion ? 0 : timeMs * (0.001 + intensity * 0.0035);
  const coreRgb = reactorHeatRgb(tempNorm);
  const hotRgb = mixRgb(coreRgb, [255, 255, 255], 0.35);

  ctx.save();
  ctx.globalCompositeOperation = "screen";

  for (let layer = 0; layer < 5; layer++) {
    const layerPhase = phase * (0.75 + layer * 0.11) + layer * 1.4;
    const wobble = baseRadius * intensity * (0.18 + layer * 0.08);
    const offsetX = Math.cos(layerPhase) * wobble;
    const offsetY = Math.sin(layerPhase * 1.17) * wobble * 0.82;
    const radius = baseRadius * (0.55 + layer * 0.16);
    const rgb = mixRgb(coreRgb, hotRgb, layer / 4);
    const gradient = ctx.createRadialGradient(
      cx + offsetX,
      cy + offsetY,
      0,
      cx,
      cy,
      radius
    );

    gradient.addColorStop(0, rgba(rgb, 0.34 + intensity * 0.42));
    gradient.addColorStop(0.42, rgba(rgb, 0.12 + intensity * 0.16));
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.08, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalCompositeOperation = "source-over";

  const shellCount = 3 + Math.floor(intensity * 4);
  for (let ring = 0; ring < shellCount; ring++) {
    const ringPhase = phase * 1.35 + ring * 0.9;
    const ringRadius =
      baseRadius * (0.95 + ring * 0.14) +
      Math.sin(ringPhase * 2.2) * baseRadius * 0.05 * intensity;
    ctx.strokeStyle = rgba(
      mixRgb(coreRgb, hotRgb, 0.25 + ring / shellCount),
      0.05 + intensity * 0.08
    );
    ctx.lineWidth = 1 + intensity * 1.4;
    ctx.beginPath();
    ctx.arc(
      cx + Math.cos(ringPhase) * baseRadius * 0.04,
      cy + Math.sin(ringPhase * 1.4) * baseRadius * 0.04,
      ringRadius,
      0,
      Math.PI * 2
    );
    ctx.stroke();
  }

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
