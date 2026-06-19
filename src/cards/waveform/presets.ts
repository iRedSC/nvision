import type {
  WaveformCardConfig,
  WaveformLayout,
  WaveformMotion,
  WaveformSize,
} from "./waveform-card-config";
import {
  DEFAULT_LAYOUT,
  DEFAULT_MOTION,
  DEFAULT_SIZE,
  LEGACY_SHAPE_TO_LAYOUT,
} from "./const";

export interface ScopeDot {
  phase: number;
  seed: number;
}

export interface ResolvedPresets {
  layout: WaveformLayout;
  size: WaveformSize;
  motion: WaveformMotion;
  dotCount: number;
  dotScale: number;
  span: number;
  phaseSpeed: number;
  dualLayer: boolean;
}

export interface DotDrawParams {
  x: number;
  y: number;
  radiusMul: number;
  alphaMul: number;
}

interface MotionInput {
  layout: WaveformLayout;
  dot: ScopeDot;
  index: number;
  count: number;
  phase: number;
  intensity: number;
  scale: number;
  baseX: number;
  baseY: number;
  width: number;
  height: number;
  variant: 0 | 1;
}

const SIZE_PRESETS: Record<
  WaveformSize,
  { dotScale: number; span: number; phaseSpeed: number }
> = {
  compact: { dotScale: 0.88, span: 0.94, phaseSpeed: 0.92 },
  balanced: { dotScale: 1, span: 0.98, phaseSpeed: 1 },
  expansive: { dotScale: 1.08, span: 1, phaseSpeed: 1.08 },
};

const LAYOUT_DOT_COUNTS: Record<WaveformLayout, Record<WaveformSize, number>> =
  {
    line: { compact: 16, balanced: 24, expansive: 32 },
    ring: { compact: 18, balanced: 24, expansive: 32 },
    field: { compact: 16, balanced: 25, expansive: 36 },
  };

function smoothstep(value: number): number {
  return value * value * (3 - 2 * value);
}

function motionAmplitude(intensity: number, height: number): number {
  const t = Math.max(0.08, intensity);
  const spread = smoothstep(t);
  const surge = Math.max(0, t - 0.5) ** 2;
  const lowBias = (1 - spread) * 0.16;
  return height * (0.28 + lowBias + spread * 0.22 + surge * 0.26);
}

function motionFrequency(intensity: number): number {
  const spread = smoothstep(Math.max(0.08, intensity));
  return 0.42 + spread * 0.68;
}

function waveIndex(input: MotionInput): number {
  if (input.layout === "ring") {
    return (input.index / input.count) * Math.PI * 2;
  }
  return input.index * 0.38;
}

function horizontalJitter(input: MotionInput): number {
  const { phase, intensity, dot, variant } = input;
  if (intensity <= 0.28) {
    return 0;
  }

  const spread = smoothstep(intensity);
  const localPhase = (phase + variant * 1.2) * (1 + intensity * 0.15);
  const localIndex = input.index + variant * 0.47;
  const amp = input.width * spread * (0.04 + Math.max(0, intensity - 0.55) * 0.22);

  return (
    Math.sin(localPhase * (3.1 + dot.seed * 2.4) + localIndex * 0.85) * amp +
    Math.cos(localPhase * (5.6 + localIndex * 0.35) + dot.phase) *
      amp *
      spread *
      0.65
  );
}

function applyChaos(input: MotionInput, x: number, y: number): { x: number; y: number } {
  const { dot, index, phase, intensity, variant } = input;
  if (intensity <= 0.38) {
    return { x, y };
  }

  const localPhase = (phase + variant * 1.4) * (1 + intensity * 0.18);
  const localIndex = index + variant * 0.47;
  const disturb = intensity * intensity;
  let ox = horizontalJitter(input);
  let oy =
    Math.sin(localPhase * (2.2 + dot.seed * 2) + localIndex * 1.15) *
    input.height *
    disturb *
    0.14;

  if (intensity > 0.45) {
    const chaos = (intensity - 0.45) ** 2;
    oy += Math.sin(localPhase * 8.2 + localIndex * 2.1) * input.height * chaos * 0.2;
    ox +=
      Math.cos(localPhase * 7.4 + localIndex * 1.7 + dot.phase + variant) *
      input.height *
      chaos *
      0.16;
  }

  if (input.layout === "ring") {
    const cx = input.width / 2;
    const cy = input.height / 2;
    const dx = x - cx;
    const dy = y - cy;
    const angle = Math.atan2(dy, dx);
    const tangential = { x: -Math.sin(angle), y: Math.cos(angle) };
    const radial = { x: Math.cos(angle), y: Math.sin(angle) };
    return {
      x: x + tangential.x * ox + radial.x * oy,
      y: y + tangential.y * ox + radial.y * oy,
    };
  }

  return { x: x + ox, y: y + oy };
}

function adaptMotionToLayout(input: MotionInput, result: DotDrawParams): DotDrawParams {
  let { x, y } = result;
  const { layout, baseX, baseY, width, height } = input;

  if (layout === "ring") {
    const cx = width / 2;
    const cy = height / 2;
    const dx = x - baseX;
    const dy = y - baseY;
    const angle = Math.atan2(baseY - cy, baseX - cx);
    const tangential = { x: -Math.sin(angle), y: Math.cos(angle) };
    const radial = { x: Math.cos(angle), y: Math.sin(angle) };
    x = baseX + tangential.x * dy + radial.x * dx;
    y = baseY + tangential.y * dy + radial.y * dx;
  }

  ({ x, y } = applyChaos(input, x, y));
  return { ...result, x, y };
}

function resolveLayout(config: WaveformCardConfig): WaveformLayout {
  if (config.layout) {
    return config.layout;
  }

  if (config.shape) {
    return LEGACY_SHAPE_TO_LAYOUT[config.shape] ?? DEFAULT_LAYOUT;
  }

  return DEFAULT_LAYOUT;
}

function resolveSize(config: WaveformCardConfig): WaveformSize {
  if (config.size) {
    return config.size;
  }

  const count = config.dot_count;
  if (count !== undefined) {
    if (count <= 18) {
      return "compact";
    }
    if (count >= 30) {
      return "expansive";
    }
  }

  return DEFAULT_SIZE;
}

function resolveMotion(config: WaveformCardConfig): WaveformMotion {
  if (config.motion) {
    return config.motion;
  }

  if (config.overlap_dots) {
    return "echo";
  }

  return DEFAULT_MOTION;
}

export function resolvePresets(config: WaveformCardConfig): ResolvedPresets {
  const layout = resolveLayout(config);
  const size = resolveSize(config);
  const motion = resolveMotion(config);
  const sizePreset = SIZE_PRESETS[size];

  return {
    layout,
    size,
    motion,
    dotCount: LAYOUT_DOT_COUNTS[layout][size],
    dotScale: sizePreset.dotScale,
    span: sizePreset.span,
    phaseSpeed: sizePreset.phaseSpeed,
    dualLayer: motion === "echo",
  };
}

export function buildDots(count: number): ScopeDot[] {
  return Array.from({ length: count }, (_, index) => ({
    phase: (index / count) * Math.PI * 2,
    seed: (index * 0.618033988749895) % 1,
  }));
}

function lineBaseY(height: number): number {
  return height * 0.5;
}

function basePosition(
  layout: WaveformLayout,
  index: number,
  count: number,
  width: number,
  height: number,
  span: number,
  _intensity: number
): { x: number; y: number } {
  const scale = Math.min(width, height);
  const bleed = scale * 0.04;

  switch (layout) {
    case "ring": {
      const cx = width / 2;
      const cy = height / 2;
      const pad = scale * 0.06;
      const radius = (Math.min(width, height) / 2 - pad) * (0.92 + span * 0.06);
      const angle = ((index + 0.5) / count) * Math.PI * 2 - Math.PI / 2;
      return {
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
      };
    }
    case "field": {
      const cols = Math.ceil(Math.sqrt(count));
      const rows = Math.ceil(count / cols);
      const col = index % cols;
      const row = Math.floor(index / cols);
      const padX = scale * 0.04;
      const padY = scale * 0.04;
      const gap = scale * 0.028 * span;
      const cellW = (width - 2 * padX - gap * (cols - 1)) / cols;
      const cellH = (height - 2 * padY - gap * (rows - 1)) / rows;
      return {
        x: padX + col * (cellW + gap) + cellW / 2,
        y: padY + row * (cellH + gap) + cellH / 2,
      };
    }
    default: {
      const t = count <= 1 ? 0.5 : index / (count - 1);
      const innerLeft = bleed;
      const innerRight = width - bleed;
      const lineSpan = (innerRight - innerLeft) * span;
      const start = (innerLeft + innerRight - lineSpan) / 2;
      return {
        x: start + t * lineSpan,
        y: lineBaseY(height),
      };
    }
  }
}

function waveMotion(input: MotionInput): DotDrawParams {
  const { phase, intensity, height, baseX, baseY, variant } = input;
  const amp = motionAmplitude(intensity, height);
  const spread = smoothstep(intensity);
  const localPhase = phase + variant * 1.85;
  const index = waveIndex(input);
  const freq = motionFrequency(intensity);
  const wave =
    Math.sin(localPhase * freq - index) * amp +
    Math.sin(localPhase * freq * 0.5 - index * 0.5) * amp * spread * 0.55;

  return {
    x: baseX,
    y: baseY + wave,
    radiusMul: 0.88 + spread * 0.32,
    alphaMul: 0.72 + spread * 0.3,
  };
}

function pulseMotion(input: MotionInput): DotDrawParams {
  const { dot, index, phase, intensity, baseX, baseY, variant } = input;
  const spread = smoothstep(intensity);
  const group = Math.floor(index / 4);
  const breathe = Math.sin(phase * 0.75 + group * 1.15 + variant * 0.6);
  const bob =
    Math.sin(phase + dot.seed * 6.28) * input.height * 0.04 * (0.5 + spread * 0.65);

  return {
    x: baseX,
    y: baseY + bob,
    radiusMul: 0.72 + (0.28 + spread * 0.45) * (0.5 + breathe * 0.5),
    alphaMul: 0.55 + (0.25 + spread * 0.35) * (0.5 + breathe * 0.5),
  };
}

function streamMotion(input: MotionInput): DotDrawParams {
  const { phase, intensity, height, baseX, baseY, variant } = input;
  const spread = smoothstep(intensity);
  const amp = motionAmplitude(intensity, height);
  const localPhase = phase + variant * 1.2;
  const index = waveIndex(input);
  const freq = motionFrequency(intensity);
  const drift =
    Math.sin(localPhase * freq * 0.58 + index * 0.35) * amp * (0.75 + spread * 0.85);
  const ripple = Math.sin(localPhase * freq - index) * amp * 0.65;

  return {
    x: baseX + drift,
    y: baseY + ripple,
    radiusMul: 0.86 + spread * 0.26,
    alphaMul: 0.68 + spread * 0.3,
  };
}

function spectrumMotion(input: MotionInput): DotDrawParams {
  const { dot, index, phase, intensity, height, baseX, baseY } = input;
  const spread = smoothstep(intensity);
  const amp = height * (0.14 + spread * 0.34);
  const bar =
    (Math.sin(phase * 0.9 + dot.seed * 8.4) * 0.55 +
      Math.sin(phase * 1.7 + index * 0.42 + dot.phase) * 0.45 +
      1) *
    0.5;
  const heightOffset = bar * amp * (0.35 + spread * 1.05);

  return {
    x: baseX,
    y: baseY - heightOffset,
    radiusMul: 0.78 + bar * spread * 0.35,
    alphaMul: 0.58 + bar * spread * 0.38,
  };
}

function echoMotion(input: MotionInput): DotDrawParams {
  const result = waveMotion(input);
  if (input.variant) {
    return {
      ...result,
      radiusMul: result.radiusMul * 0.9,
      alphaMul: result.alphaMul * 0.62,
    };
  }
  return result;
}

function cascadeMotion(input: MotionInput): DotDrawParams {
  const { index, count, phase, intensity, baseX, baseY, variant } = input;
  const spread = smoothstep(intensity);
  const amp = motionAmplitude(intensity, input.height);
  const t = count <= 1 ? 1 : index / (count - 1);
  const localPhase = phase + variant * 1.4;
  const waveIdx = waveIndex(input);
  const freq = motionFrequency(intensity);
  const ripple = Math.sin(localPhase * freq * 1.1 - waveIdx * 1.5) * amp;
  const build = 0.45 + t * (0.55 + spread * 0.4);

  return {
    x: baseX,
    y: baseY + ripple * build,
    radiusMul: 0.82 + spread * 0.28 * build,
    alphaMul: 0.64 + spread * 0.34 * build,
  };
}

const MOTION_ENGINES: Record<
  WaveformMotion,
  (input: MotionInput) => DotDrawParams
> = {
  wave: waveMotion,
  pulse: pulseMotion,
  stream: streamMotion,
  spectrum: spectrumMotion,
  echo: echoMotion,
  cascade: cascadeMotion,
};

export function computeDotDrawParams(
  presets: ResolvedPresets,
  dot: ScopeDot,
  index: number,
  count: number,
  phase: number,
  intensity: number,
  width: number,
  height: number,
  variant: 0 | 1
): DotDrawParams {
  const scale = Math.min(width, height);
  const base = basePosition(
    presets.layout,
    index,
    count,
    width,
    height,
    presets.span,
    intensity
  );
  const motion = MOTION_ENGINES[presets.motion];

  const result = motion({
    dot,
    index,
    count,
    phase,
    intensity,
    scale,
    baseX: base.x,
    baseY: base.y,
    width,
    height,
    variant,
    layout: presets.layout,
  });

  return adaptMotionToLayout(
    {
      dot,
      index,
      count,
      phase,
      intensity,
      scale,
      baseX: base.x,
      baseY: base.y,
      width,
      height,
      variant,
      layout: presets.layout,
    },
    result
  );
}

export function contentFade(
  x: number,
  y: number,
  width: number,
  height: number
): number {
  const fadeStart = width * 0.04;
  const fadeEnd = width * 0.58;
  let horizontal = 1;

  if (x < fadeEnd) {
    horizontal =
      x <= fadeStart
        ? 0.06
        : 0.06 + 0.94 * smoothstep((x - fadeStart) / (fadeEnd - fadeStart));
  }

  const centerY = height * 0.5;
  const band = height * 0.42;
  const distY = Math.abs(y - centerY);
  let vertical = 1;

  if (x < fadeEnd && distY < band) {
    vertical = 0.08 + 0.92 * smoothstep(distY / band);
  }

  return horizontal * vertical;
}

export function edgeFade(
  x: number,
  y: number,
  width: number,
  height: number,
  scale: number,
  layout: WaveformLayout
): number {
  if (layout === "ring") {
    return 1;
  }

  const marginX = Math.max(4, scale * 0.06);
  const marginY = Math.max(3, scale * 0.04);
  const left = Math.min(1, Math.max(0, x / marginX));
  const right = Math.min(1, Math.max(0, (width - x) / marginX));
  const top = Math.min(1, Math.max(0, y / marginY));
  const bottom = Math.min(1, Math.max(0, (height - y) / marginY));

  if (layout === "line") {
    return Math.min(left, right);
  }

  return Math.min(left, right, top, bottom);
}

export function baseDotRadius(scale: number, dotScale: number): number {
  return Math.max(1.1, scale * 0.0115) * dotScale;
}
