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

const ORB_COUNT = 6;

/** Coolant blues through unstable critical plasma. */
const PLASMA: Array<[number, number, number]> = [
  [118, 198, 255],
  [72, 152, 238],
  [48, 214, 196],
  [255, 148, 44],
  [255, 82, 26],
  [220, 30, 22],
  [168, 16, 36],
  [255, 52, 96],
  [255, 118, 32],
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

function criticalLevel(tempNorm: number): number {
  return smoothstep(Math.max(0, (tempNorm - 0.52) / 0.48));
}

function orbColor(
  tempNorm: number,
  orbIndex: number,
  phase: number
): [number, number, number] {
  const heat = smoothstep(tempNorm);
  const critical = criticalLevel(tempNorm);
  const cold = PLASMA[orbIndex % 3];

  if (heat < 0.34) {
    return mixRgb(cold, PLASMA[2], heat / 0.34);
  }

  if (heat < 0.58) {
    const warm = PLASMA[3 + (orbIndex % 2)];
    return mixRgb(PLASMA[2], warm, (heat - 0.34) / 0.24);
  }

  const hotPalette = [
    PLASMA[4],
    PLASMA[5],
    PLASMA[6],
    PLASMA[7],
    PLASMA[8],
    PLASMA[4],
  ];
  const base = hotPalette[orbIndex % hotPalette.length];
  const partner = hotPalette[(orbIndex + 2 + Math.floor(heat * 3)) % hotPalette.length];
  const flicker = Math.sin(phase * 3.4 + orbIndex * 1.65) * 0.5 + 0.5;
  const surge = Math.sin(phase * 5.8 + orbIndex * 0.85) * 0.5 + 0.5;
  let rgb = mixRgb(base, partner, flicker * 0.55 + heat * 0.25);

  if (critical > 0.08) {
    const unstable = hotPalette[(orbIndex + Math.floor(surge * 3)) % hotPalette.length];
    rgb = mixRgb(rgb, unstable, critical * (0.35 + surge * 0.3));
    rgb = mixRgb(
      rgb,
      PLASMA[7],
      critical * Math.max(0, Math.sin(phase * 7.2 + orbIndex)) * 0.28
    );
  }

  return rgb;
}

function ringColor(
  tempNorm: number,
  phase: number
): [number, number, number] {
  const heat = smoothstep(tempNorm);
  const critical = criticalLevel(tempNorm);

  if (heat < 0.4) {
    return mixRgb(PLASMA[1], PLASMA[2], heat / 0.4);
  }

  if (critical < 0.12) {
    return mixRgb(PLASMA[3], PLASMA[4], (heat - 0.4) / 0.25);
  }

  const pulse = Math.sin(phase * 4.6) * 0.5 + 0.5;
  const spike = Math.sin(phase * 8.4 + 1.2) * 0.5 + 0.5;
  const a = mixRgb(PLASMA[4], PLASMA[8], pulse);
  const b = mixRgb(PLASMA[5], PLASMA[7], spike);
  return mixRgb(a, b, critical * 0.65 + heat * 0.2);
}

function writheRadius(
  angle: number,
  radius: number,
  phase: number,
  writhe: number
): number {
  const edge =
    1 +
    Math.sin(angle * 3 + phase * 1.15) * 0.06 * writhe +
    Math.sin(angle * 5 - phase * 0.9) * 0.038 * writhe +
    Math.cos(angle * 2 + phase * 0.65) * 0.045 * writhe;
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
  const segments = 72;

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

function heatGlowColor(
  tempNorm: number,
  phase: number
): [number, number, number] {
  const heat = smoothstep(tempNorm);

  if (heat < 0.35) {
    return mixRgb(PLASMA[0], PLASMA[2], heat / 0.35);
  }

  if (heat < 0.55) {
    return mixRgb(PLASMA[2], PLASMA[4], (heat - 0.35) / 0.2);
  }

  return ringColor(tempNorm, phase);
}

function drawAmbientHeatGlow(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  tempNorm: number,
  phase: number,
  breathe: number
): void {
  const heat = smoothstep(tempNorm);
  const critical = criticalLevel(tempNorm);
  const intensity = 0.1 + heat * 0.48 + critical * 0.82;
  const rgb = heatGlowColor(tempNorm, phase);
  const pulse = 1 + Math.sin(phase * 3.8) * critical * 0.08;
  const coreRadius = radius * breathe * pulse;

  ctx.save();
  ctx.globalCompositeOperation = "lighter";

  const layers: Array<{ scale: number; alpha: number }> = [
    { scale: 3.05, alpha: 0.034 * intensity },
    { scale: 2.15, alpha: 0.062 * intensity },
    { scale: 1.48, alpha: 0.098 * intensity },
    { scale: 1.06, alpha: 0.13 * intensity },
  ];

  for (const layer of layers) {
    const spread = coreRadius * layer.scale;
    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, spread);

    gradient.addColorStop(0, rgba(rgb, layer.alpha * 1.12));
    gradient.addColorStop(0.34, rgba(rgb, layer.alpha * 0.52));
    gradient.addColorStop(0.68, rgba(mixRgb(rgb, [40, 0, 0], 0.25), layer.alpha * 0.15));
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(cx, cy, spread, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function orbSizeScale(
  heat: number,
  seed: number
): number {
  const variation = fract(seed * 1.27) * 0.16;
  return 0.52 + variation + heat * 0.045;
}

function drawPlasmaBlob(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  rgb: [number, number, number],
  alpha: number
): void {
  const core = mixRgb(rgb, [255, 92, 38], 0.18);
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);

  gradient.addColorStop(0, rgba(core, alpha * 0.82));
  gradient.addColorStop(0.34, rgba(rgb, alpha * 0.54));
  gradient.addColorStop(0.68, rgba(mixRgb(rgb, [70, 8, 14], 0.4), alpha * 0.2));
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawReactorRing(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  phase: number,
  writhe: number,
  tempNorm: number,
  critical: number,
  scale = 1
): void {
  const rgb = ringColor(tempNorm, phase);
  const wobble = 1 + Math.sin(phase * 3.1) * critical * 0.035;
  const glowStrength = smoothstep(tempNorm) * 0.35 + critical * 0.75;

  ctx.save();
  traceWrithingPath(ctx, cx, cy, radius * scale * wobble, phase, writhe);

  if (glowStrength > 0.08) {
    ctx.fillStyle = rgba(rgb, 0.015 + glowStrength * 0.045);
    ctx.fill();
  }

  ctx.shadowColor = rgba(rgb, 0.55 + critical * 0.35);
  ctx.shadowBlur = 6 + glowStrength * 28;
  ctx.strokeStyle = rgba(rgb, 0.12 + critical * 0.26 + smoothstep(tempNorm) * 0.1);
  ctx.lineWidth = 1.2 + critical * 2.4;
  ctx.stroke();
  ctx.shadowBlur = 0;

  if (critical > 0.35) {
    traceWrithingPath(
      ctx,
      cx,
      cy,
      radius * scale * wobble * 0.96,
      phase * 1.18,
      writhe * 1.08
    );
    ctx.shadowColor = rgba(mixRgb(rgb, PLASMA[7], 0.45), 0.45);
    ctx.shadowBlur = 4 + critical * 16;
    ctx.strokeStyle = rgba(
      mixRgb(rgb, PLASMA[7], 0.45),
      0.06 + critical * 0.14
    );
    ctx.lineWidth = 0.8 + critical * 1.2;
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  ctx.restore();
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
  const critical = criticalLevel(tempNorm);
  const baseRadius = base * (0.22 + heat * 0.12);
  const phase = reducedMotion
    ? 0
    : timeMs * (0.00055 + heat * 0.001 + critical * 0.0028);
  const ringWrithe = 0.1 + heat * 0.18 + critical * critical * 0.82;
  const orbSpread = 0.06 + (1 - heat) * 0.18;
  const churn = baseRadius * (0.035 + critical * 0.055);
  const breathe = 1 + Math.sin(phase * 2.3) * (0.018 + critical * 0.035);
  const clipWrithe = ringWrithe * (0.55 + (1 - critical) * 0.25);
  const heatRadiance = heat * 0.42 + critical * 0.68;

  drawAmbientHeatGlow(
    ctx,
    cx,
    cy,
    baseRadius,
    tempNorm,
    phase,
    breathe
  );

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  traceWrithingPath(
    ctx,
    cx,
    cy,
    baseRadius * breathe * 1.08,
    phase,
    clipWrithe
  );
  ctx.clip();

  drawPlasmaBlob(
    ctx,
    cx + Math.sin(phase * 1.4) * churn * 0.35,
    cy + Math.cos(phase * 1.2) * churn * 0.35,
    baseRadius * (0.64 + heat * 0.05),
    orbColor(tempNorm, 0, phase),
    0.15 + heat * 0.14
  );

  for (let index = 0; index < ORB_COUNT; index++) {
    const seed = index * 2.399963;
    const orbitRadius =
      baseRadius * orbSpread * (0.42 + fract(seed) * 0.58);
    const orbitSpeed = 0.5 + index * 0.11 + critical * 0.75;
    const angle = phase * orbitSpeed + seed * Math.PI * 2;
    const x =
      cx +
      Math.cos(angle) * orbitRadius +
      Math.cos(angle * 2.3 + phase * 1.5) * churn;
    const y =
      cy +
      Math.sin(angle * 1.07) * orbitRadius +
      Math.sin(angle * 1.85 + phase * 1.1) * churn;
    const blobRadius = baseRadius * orbSizeScale(heat, seed);
    const alpha = 0.11 + heat * 0.1 + fract(seed) * 0.04;
    const orbRgb = orbColor(tempNorm, index + 1, phase);

    drawPlasmaBlob(ctx, x, y, blobRadius, orbRgb, alpha);
  }

  ctx.restore();

  if (heatRadiance > 0.2) {
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    traceWrithingPath(
      ctx,
      cx,
      cy,
      baseRadius * breathe * 1.02,
      phase,
      ringWrithe * 0.75
    );
    ctx.fillStyle = rgba(
      heatGlowColor(tempNorm, phase),
      0.02 + heatRadiance * 0.045
    );
    ctx.fill();
    ctx.restore();
  }

  drawReactorRing(
    ctx,
    cx,
    cy,
    baseRadius * breathe,
    phase,
    ringWrithe,
    tempNorm,
    critical
  );

  if (critical > 0.2) {
    drawReactorRing(
      ctx,
      cx,
      cy,
      baseRadius * breathe * 1.05,
      phase * 1.22,
      ringWrithe * 1.12,
      tempNorm,
      critical,
      1
    );
  }
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
