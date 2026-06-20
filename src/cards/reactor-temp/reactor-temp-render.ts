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

const ORB_COUNT = 7;

/** Distinct plasma tones from stable coolant through meltdown. */
const PLASMA: Array<[number, number, number]> = [
  [118, 198, 255],
  [72, 152, 238],
  [48, 214, 196],
  [255, 176, 58],
  [255, 96, 36],
  [255, 48, 108],
  [255, 214, 92],
  [255, 248, 228],
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

function orbCriticalColor(
  tempNorm: number,
  orbIndex: number,
  orbCount: number
): [number, number, number] {
  const heat = smoothstep(tempNorm);
  const cold = PLASMA[orbIndex % 3];
  const hotSlot =
    3 +
    ((orbIndex * 2 + Math.floor(heat * 3)) % (PLASMA.length - 3));
  const hot = PLASMA[hotSlot];
  const meltdown = PLASMA[PLASMA.length - 1];

  if (heat < 0.28) {
    return mixRgb(cold, PLASMA[2], heat / 0.28);
  }

  if (heat < 0.58) {
    const local = (heat - 0.28) / 0.3;
    return mixRgb(PLASMA[2], hot, local);
  }

  if (heat < 0.82) {
    const local = (heat - 0.58) / 0.24;
    return mixRgb(hot, PLASMA[5 + (orbIndex % 2)], local);
  }

  const local = (heat - 0.82) / 0.18;
  const critical = mixRgb(PLASMA[5 + (orbIndex % 2)], meltdown, local);
  return mixRgb(critical, hot, (orbIndex / Math.max(1, orbCount - 1)) * 0.22);
}

function drawBlob(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  rgb: [number, number, number],
  alpha: number,
  hotCore = false
): void {
  const coreRgb = hotCore ? mixRgb(rgb, [255, 255, 255], 0.55) : rgb;
  const gradient = ctx.createRadialGradient(
    x,
    y,
    0,
    x,
    y,
    radius
  );

  gradient.addColorStop(0, rgba(coreRgb, alpha * (hotCore ? 0.95 : 0.72)));
  gradient.addColorStop(0.28, rgba(rgb, alpha * 0.46));
  gradient.addColorStop(0.62, rgba(mixRgb(rgb, [0, 0, 0], 0.35), alpha * 0.14));
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
  const intensity = 0.18 + heat * 0.82;
  const baseRadius = base * (0.2 + intensity * 0.22);
  const phase = reducedMotion ? 0 : timeMs * (0.0008 + Math.pow(intensity, 1.65) * 0.0075);
  const churn = Math.pow(intensity, 1.85);
  const pulse = 1 + Math.sin(phase * 5.4) * churn * 0.12;

  ctx.save();
  ctx.globalCompositeOperation = "screen";

  const centerColor = orbCriticalColor(tempNorm, 0, 1);
  drawBlob(
    ctx,
    cx + Math.sin(phase * 1.6) * baseRadius * churn * 0.08,
    cy + Math.cos(phase * 1.35) * baseRadius * churn * 0.08,
    baseRadius * (0.72 + churn * 0.28) * pulse,
    centerColor,
    0.28 + intensity * 0.52,
    heat > 0.55
  );

  for (let index = 0; index < ORB_COUNT; index++) {
    const seed = index * 2.399963;
    const orbitRadius =
      baseRadius * (0.12 + churn * (0.28 + fract(seed) * 0.34));
    const orbitSpeed = 0.65 + index * 0.19 + intensity * 1.45;
    const angle = phase * orbitSpeed + seed * Math.PI * 2;
    const wobbleX =
      Math.cos(angle * 2.6 + phase * 1.8) * baseRadius * churn * 0.22;
    const wobbleY =
      Math.sin(angle * 2.1 + phase * 2.2) * baseRadius * churn * 0.2;
    const x =
      cx +
      Math.cos(angle) * orbitRadius +
      Math.cos(angle * 1.7 + phase * 2.4) * baseRadius * churn * 0.18 +
      wobbleX;
    const y =
      cy +
      Math.sin(angle * 1.11) * orbitRadius +
      Math.sin(angle * 1.4 + phase * 1.9) * baseRadius * churn * 0.16 +
      wobbleY;
    const sizeBias = 0.52 + fract(seed * 1.31) * 0.38;
    const blobRadius =
      baseRadius * sizeBias * (0.78 + intensity * 0.55) * pulse;
    const rgb = orbCriticalColor(tempNorm, index + 1, ORB_COUNT);
    const alpha = 0.18 + intensity * 0.44 + fract(seed) * 0.08;

    drawBlob(ctx, x, y, blobRadius, rgb, alpha, heat > 0.72 && index % 3 === 0);
  }

  if (heat > 0.68) {
    const flash = 0.5 + Math.sin(phase * 8.2 + 1.3) * 0.5;
    drawBlob(
      ctx,
      cx,
      cy,
      baseRadius * (0.34 + flash * 0.16),
      PLASMA[PLASMA.length - 1],
      0.08 + flash * churn * 0.22,
      true
    );
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
