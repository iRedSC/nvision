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
    LEGACY_MOTION_MAP,
    LEGACY_SHAPE_TO_LAYOUT,
} from "./const";

export interface ScopeDot {
    phase: number;
    seed: number;
    /** Primary-axis travel direction for spawn motion */
    sign: number;
}

export interface ResolvedPresets {
    layout: WaveformLayout;
    size: WaveformSize;
    motion: WaveformMotion;
    dotCount: number;
    dotScale: number;
    span: number;
    phaseSpeed: number;
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
    chaosAt: number;
    scale: number;
    baseX: number;
    baseY: number;
    width: number;
    height: number;
    variant: 0 | 1;
}

interface AxisVectors {
    primary: { x: number; y: number };
    perp: { x: number; y: number };
}

function fract(value: number): number {
    return value - Math.floor(value);
}

const SIZE_PRESETS: Record<
    WaveformSize,
    { dotScale: number; span: number; phaseSpeed: number }
> = {
    compact: { dotScale: 0.88, span: 0.94, phaseSpeed: 0.92 },
    balanced: { dotScale: 1, span: 0.98, phaseSpeed: 1 },
    expansive: { dotScale: 1.08, span: 1, phaseSpeed: 1.08 },
    dense: { dotScale: 0.94, span: 1, phaseSpeed: 1.1 },
    packed: { dotScale: 0.86, span: 1, phaseSpeed: 1.14 },
};

const LAYOUT_DOT_COUNTS: Record<
    WaveformLayout,
    Record<WaveformSize, number>
> = {
    line: { compact: 16, balanced: 24, expansive: 32, dense: 40, packed: 48 },
    ring: { compact: 18, balanced: 24, expansive: 32, dense: 40, packed: 48 },
    field: {
        compact: 16,
        balanced: 25,
        expansive: 36,
        dense: 49,
        packed: 64,
    },
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

function motionAxes(input: MotionInput): AxisVectors {
    if (input.layout === "ring") {
        const cx = input.width / 2;
        const cy = input.height / 2;
        const angle = Math.atan2(input.baseY - cy, input.baseX - cx);
        return {
            primary: { x: -Math.sin(angle), y: Math.cos(angle) },
            perp: { x: Math.cos(angle), y: Math.sin(angle) },
        };
    }

    return {
        primary: { x: 0, y: 1 },
        perp: { x: 1, y: 0 },
    };
}

function applyChaos(
    input: MotionInput,
    x: number,
    y: number,
    chaosAt: number,
): { x: number; y: number } {
    const { dot, index, phase, intensity, variant, height } = input;
    if (intensity < chaosAt) {
        return { x, y };
    }

    const axes = motionAxes(input);
    const localPhase = (phase + variant * 1.4) * (1 + intensity * 0.18);
    const localIndex = index + variant * 0.47;
    const chaosRange = Math.max(0.001, 1 - chaosAt);
    const disturb = ((intensity - chaosAt) / chaosRange) ** 2;

    let perp =
        Math.sin(localPhase * (3.1 + dot.seed * 2.4) + localIndex * 0.85) *
        height *
        disturb *
        0.12;

    if (intensity > chaosAt + chaosRange * 0.15) {
        const chaos = disturb ** 1.5;
        perp +=
            Math.cos(
                localPhase * 7.4 + localIndex * 1.7 + dot.phase + variant,
            ) *
            height *
            chaos *
            0.18;
        perp +=
            Math.sin(localPhase * 8.2 + localIndex * 2.1) *
            height *
            chaos *
            0.1;
    }

    return {
        x: x + axes.perp.x * perp,
        y: y + axes.perp.y * perp,
    };
}

function withChaos(input: MotionInput, params: DotDrawParams): DotDrawParams {
    const { x, y } = applyChaos(input, params.x, params.y, input.chaosAt);
    return { ...params, x, y };
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
        if (count >= 48) {
            return "packed";
        }
        if (count >= 40) {
            return "dense";
        }
        if (count >= 30) {
            return "expansive";
        }
    }

    return DEFAULT_SIZE;
}

function resolveMotion(config: WaveformCardConfig): WaveformMotion {
    if (config.motion) {
        return LEGACY_MOTION_MAP[config.motion] ?? config.motion;
    }

    if (config.overlap_dots) {
        return "spawn";
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
    };
}

export function buildDots(count: number): ScopeDot[] {
    return Array.from({ length: count }, (_, index) => {
        const seed = (index * 0.618033988749895) % 1;
        return {
            phase: (index / count) * Math.PI * 2,
            seed,
            sign: seed > 0.5 ? 1 : -1,
        };
    });
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
    _intensity: number,
): { x: number; y: number } {
    const scale = Math.min(width, height);
    const bleed = scale * 0.04;

    switch (layout) {
        case "ring": {
            const cx = width / 2;
            const cy = height / 2;
            const pad = scale * 0.06;
            const radius =
                (Math.min(width, height) / 2 - pad) * (0.92 + span * 0.06);
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

function spawnMotion(input: MotionInput): DotDrawParams {
    const { dot, phase, intensity, height, width, baseX, baseY, layout } =
        input;
    const spread = smoothstep(intensity);
    const speed = 0.05 + spread * spread * 1.15;
    const period = 3.6 - spread * 1.4;
    const life = fract(
        phase * speed * (0.06 + spread * 0.22) + dot.seed * period,
    );
    const fade = Math.sin(life * Math.PI);
    const travel =
        motionAmplitude(intensity, height) * life * (0.85 + spread * 0.45);
    const direction = dot.sign;

    if (layout === "ring") {
        const cx = width / 2;
        const cy = height / 2;
        const angle = Math.atan2(baseY - cy, baseX - cx);
        const pad = Math.min(width, height) * 0.06;
        const orbitRadius = Math.hypot(baseX - cx, baseY - cy);
        const flySpan = orbitRadius * (0.18 + spread * 0.55);
        const radius = Math.max(pad, orbitRadius + direction * life * flySpan);
        return withChaos(input, {
            x: cx + Math.cos(angle) * radius,
            y: cy + Math.sin(angle) * radius,
            radiusMul:
                0.44 + fade * (0.56 + spread * 0.58 + spread * spread * 0.42),
            alphaMul: fade * (0.32 + spread * 0.58),
        });
    }

    const axes = motionAxes(input);
    const drift = travel * direction * (0.45 + dot.seed * 0.35);
    return withChaos(input, {
        x: baseX + axes.primary.x * drift,
        y: baseY + axes.primary.y * drift,
        radiusMul:
            0.44 + fade * (0.56 + spread * 0.58 + spread * spread * 0.42),
        alphaMul: fade * (0.32 + spread * 0.58),
    });
}

function jetMotion(input: MotionInput): DotDrawParams {
    const {
        dot,
        index,
        count,
        phase,
        intensity,
        height,
        width,
        baseX,
        baseY,
        layout,
    } = input;
    const spread = smoothstep(intensity);
    const baseSpeed = 0.16 + spread * 0.78;
    const dotSpeed = baseSpeed * (0.4 + dot.seed * 1.35);
    const primaryAmp =
        motionAmplitude(intensity, height) * (0.035 + spread * 0.1);
    const primaryWave =
        Math.sin(phase * (1.6 + dot.seed * 0.8) + dot.seed * 9.4) * primaryAmp;
    const speedNorm = dotSpeed / (baseSpeed * 1.75);
    const radiusMul =
        0.52 + speedNorm * 0.36 + spread * 0.38 + spread * spread * 0.48;

    if (layout === "ring") {
        const cx = width / 2;
        const cy = height / 2;
        const pad = Math.min(width, height) * 0.06;
        const orbitRadius = Math.min(width, height) / 2 - pad;
        const angle =
            (index / count) * Math.PI * 2 - Math.PI / 2 + dot.seed * 0.35;
        const radialSpeed = 0.05 + spread * spread * 0.24;
        const life = fract(phase * radialSpeed * dotSpeed + dot.seed * 2.6);
        const flySpan = orbitRadius * (0.2 + spread * 0.75);
        const radius = orbitRadius + life * flySpan;
        const fade = 1 - life;
        return withChaos(input, {
            x: cx + Math.cos(angle) * radius,
            y: cy + Math.sin(angle) * radius,
            radiusMul: radiusMul * (0.88 + (1 - life) * 0.22),
            alphaMul: (0.38 + speedNorm * 0.18 + spread * 0.32) * fade,
        });
    }

    const bleed = width * 0.12;
    const lane = baseY + primaryWave;
    const x =
        fract(phase * dotSpeed * 0.32 + dot.seed * 2.1 + index * 0.04) *
            (width + bleed * 2) -
        bleed;

    return withChaos(input, {
        x,
        y: lane,
        radiusMul,
        alphaMul: 0.42 + speedNorm * 0.2 + spread * 0.4,
    });
}

function surgeMotion(input: MotionInput): DotDrawParams {
    const { index, count, phase, intensity, height, baseX, baseY, layout } =
        input;
    const spread = smoothstep(intensity);
    const amp = motionAmplitude(intensity, height);
    const freq = motionFrequency(intensity);
    const fromTop = index % 2 === 0;
    const columnPhase =
        phase * freq - (index / Math.max(1, count - 1)) * Math.PI * 1.6;
    const pulse = Math.sin(columnPhase) * 0.5 + 0.5;
    const travel = amp * (0.25 + pulse * (0.55 + spread * 0.65));
    const inset = height * 0.06;
    const radiusMul =
        0.5 + pulse * (0.34 + spread * 0.52 + spread * spread * 0.45);

    if (layout === "ring") {
        const cx = input.width / 2;
        const cy = input.height / 2;
        const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
        const radial = fromTop ? -1 : 1;
        const baseRadius = Math.hypot(baseX - cx, baseY - cy);
        const r = baseRadius + radial * travel * 0.85;
        return withChaos(input, {
            x: cx + Math.cos(angle) * r,
            y: cy + Math.sin(angle) * r,
            radiusMul,
            alphaMul: 0.4 + pulse * (0.28 + spread * 0.48),
        });
    }

    const y = fromTop ? inset + travel : height - inset - travel;

    return withChaos(input, {
        x: baseX,
        y,
        radiusMul,
        alphaMul: 0.38 + pulse * (0.3 + spread * 0.5),
    });
}

const MOTION_ENGINES: Record<
    WaveformMotion,
    (input: MotionInput) => DotDrawParams
> = {
    spawn: spawnMotion,
    jet: jetMotion,
    surge: surgeMotion,
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
    variant: 0 | 1,
    chaosAt: number,
): DotDrawParams {
    const scale = Math.min(width, height);
    const base = basePosition(
        presets.layout,
        index,
        count,
        width,
        height,
        presets.span,
        intensity,
    );
    const motionInput: MotionInput = {
        dot,
        index,
        count,
        phase,
        intensity,
        chaosAt,
        scale,
        baseX: base.x,
        baseY: base.y,
        width,
        height,
        variant,
        layout: presets.layout,
    };

    return MOTION_ENGINES[presets.motion](motionInput);
}

export function contentFade(
    x: number,
    y: number,
    width: number,
    height: number,
): number {
    const fadeStart = width * 0.04;
    const fadeEnd = width * 0.58;
    let horizontal = 1;

    if (x < fadeEnd) {
        horizontal =
            x <= fadeStart
                ? 0.06
                : 0.06 +
                  0.94 * smoothstep((x - fadeStart) / (fadeEnd - fadeStart));
    } //

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
    layout: WaveformLayout,
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
