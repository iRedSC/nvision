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
  compact: { dotScale: 0.88, span: 0.86, phaseSpeed: 0.92 },
  balanced: { dotScale: 1, span: 0.94, phaseSpeed: 1 },
  expansive: { dotScale: 1.08, span: 1, phaseSpeed: 1.08 },
};

const LAYOUT_DOT_COUNTS: Record<WaveformLayout, Record<WaveformSize, number>> =
  {
    line: { compact: 16, balanced: 24, expansive: 32 },
    ring: { compact: 16, balanced: 20, expansive: 28 },
    field: { compact: 16, balanced: 25, expansive: 36 },
  };

function smoothstep(value: number): number {
  return value * value * (3 - 2 * value);
}

function motionAmplitude(intensity: number, scale: number): number {
  const spread = smoothstep(intensity);
  return scale * (0.014 + spread * 0.1);
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

function lineBaseY(height: number, intensity: number): number {
  const spread = smoothstep(intensity);
  const quietY = height * 0.58;
  const loudY = height * 0.38;
  return quietY + (loudY - quietY) * spread;
}

function basePosition(
  layout: WaveformLayout,
  index: number,
  count: number,
  width: number,
  height: number,
  span: number,
  intensity: number
): { x: number; y: number } {
  const scale = Math.min(width, height);
  const bleed = scale * 0.1;

  switch (layout) {
    case "ring": {
      const cx = width / 2;
      const cy = height / 2;
      const pad = scale * 0.16;
      const radius = (Math.min(width, height) / 2 - pad) * (0.82 + span * 0.12);
      const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
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
      const padX = scale * 0.1;
      const padY = scale * 0.12;
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
        y: lineBaseY(height, intensity),
      };
    }
  }
}

function waveMotion(input: MotionInput): DotDrawParams {
  const { index, phase, intensity, scale, baseX, baseY, variant } = input;
  const amp = motionAmplitude(intensity, scale);
  const spread = smoothstep(intensity);
  const localPhase = phase + variant * 1.85;
  const wave =
    Math.sin(localPhase * 1.05 - index * 0.38) * amp +
    Math.sin(localPhase * 0.52 - index * 0.19) * amp * spread * 0.35;

  return {
    x: baseX,
    y: baseY + wave,
    radiusMul: 0.88 + spread * 0.28,
    alphaMul: 0.72 + spread * 0.28,
  };
}

function pulseMotion(input: MotionInput): DotDrawParams {
  const { dot, index, phase, intensity, scale, baseX, baseY, variant } = input;
  const spread = smoothstep(intensity);
  const group = Math.floor(index / 4);
  const breathe = Math.sin(phase * 0.75 + group * 1.15 + variant * 0.6);
  const bob = Math.sin(phase + dot.seed * 6.28) * scale * 0.006 * (0.35 + spread);

  return {
    x: baseX,
    y: baseY + bob,
    radiusMul: 0.72 + (0.28 + spread * 0.45) * (0.5 + breathe * 0.5),
    alphaMul: 0.55 + (0.25 + spread * 0.35) * (0.5 + breathe * 0.5),
  };
}

function streamMotion(input: MotionInput): DotDrawParams {
  const { index, phase, intensity, scale, baseX, baseY, variant } = input;
  const spread = smoothstep(intensity);
  const amp = motionAmplitude(intensity, scale);
  const localPhase = phase + variant * 1.2;
  const drift =
    Math.sin(localPhase * 0.62 + index * 0.14) * amp * (0.55 + spread * 0.65);
  const ripple = Math.sin(localPhase * 1.1 - index * 0.31) * amp * 0.45;

  return {
    x: baseX + drift,
    y: baseY + ripple,
    radiusMul: 0.86 + spread * 0.22,
    alphaMul: 0.68 + spread * 0.26,
  };
}

function spectrumMotion(input: MotionInput): DotDrawParams {
  const { dot, index, phase, intensity, scale, baseX, baseY } = input;
  const spread = smoothstep(intensity);
  const amp = scale * (0.02 + spread * 0.14);
  const bar =
    (Math.sin(phase * 0.9 + dot.seed * 8.4) * 0.55 +
      Math.sin(phase * 1.7 + index * 0.42 + dot.phase) * 0.45 +
      1) *
    0.5;
  const heightOffset = bar * amp * (0.25 + spread * 0.95);

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
  const { index, count, phase, intensity, scale, baseX, baseY, variant } =
    input;
  const spread = smoothstep(intensity);
  const amp = motionAmplitude(intensity, scale);
  const t = count <= 1 ? 1 : index / (count - 1);
  const localPhase = phase + variant * 1.4;
  const ripple = Math.sin(localPhase * 1.15 - index * 0.58) * amp;
  const build = 0.45 + t * (0.55 + spread * 0.35);

  return {
    x: baseX,
    y: baseY + ripple * build,
    radiusMul: 0.82 + spread * 0.24 * build,
    alphaMul: 0.64 + spread * 0.3 * build,
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

  return motion({
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
  });
}

export function edgeFade(
  x: number,
  y: number,
  width: number,
  height: number,
  scale: number
): number {
  const margin = Math.max(4, scale * 0.07);
  const left = Math.min(1, Math.max(0, x / margin));
  const right = Math.min(1, Math.max(0, (width - x) / margin));
  const top = Math.min(1, Math.max(0, y / margin));
  const bottom = Math.min(1, Math.max(0, (height - y) / margin));
  return Math.min(left, right, top, bottom);
}

export function baseDotRadius(scale: number, dotScale: number): number {
  return Math.max(1.1, scale * 0.0115) * dotScale;
}
