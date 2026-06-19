import { css, html, LitElement, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardEditor,
  LovelaceGridOptions,
} from "../../types";
import { registerCustomCard } from "../../utils/custom-cards";
import { resolveThemeColor } from "../../utils/colors";
import { formatStateWithUnit } from "../../utils/entity-state";
import {
  responsiveStateIconStyles,
  responsiveTileInfoStyles,
  responsiveTypeStyles,
} from "../../utils/responsive-type";
import type { WaveformCardConfig, WaveformShape } from "./waveform-card-config";
import {
  DEFAULT_DOT_COUNT,
  DEFAULT_DOT_SIZE,
  DEFAULT_DOT_SPACING,
  DEFAULT_MAX,
  DEFAULT_MIN,
  DEFAULT_OVERLAP_AT,
  DEFAULT_OVERLAP_DOTS,
  DEFAULT_SHAPE,
  DEFAULT_SHAKE_AT,
  DEFAULT_SHAKE_PEAK,
  DEFAULT_WAVE_AMPLITUDE,
  DEFAULT_WAVE_FREQUENCY,
  WAVEFORM_CARD_EDITOR_NAME,
  WAVEFORM_CARD_NAME,
} from "./const";

registerCustomCard({
  type: WAVEFORM_CARD_NAME,
  name: "Nvision Waveform",
  description: "Oscilloscope dot patterns driven by a numeric sensor",
});

const INTENSITY_LERP = 0.1;

interface ScopeDot {
  phase: number;
  freq: number;
}

interface LineLayout {
  left: number;
  right: number;
  y: number;
}

function resolveWaveColor(
  configColor: WaveformCardConfig["color"],
  host: HTMLElement
): string {
  return resolveThemeColor(configColor, host, "--primary-color", "#03a9f4");
}

function parseNumericState(state: string | undefined): number | undefined {
  if (state === undefined || state === "unavailable" || state === "unknown") {
    return undefined;
  }

  const value = Number(state);
  return Number.isFinite(value) ? value : undefined;
}

function normalizeValue(value: number, min: number, max: number): number {
  if (max <= min) {
    return 0;
  }

  return Math.min(1, Math.max(0, (value - min) / (max - min)));
}

function smoothstep(value: number): number {
  return value * value * (3 - 2 * value);
}

function buildDots(count: number): ScopeDot[] {
  return Array.from({ length: count }, (_, index) => ({
    phase: (index / count) * Math.PI * 2,
    freq: 0.85 + (index % 7) * 0.11,
  }));
}

function lineLayout(
  width: number,
  height: number,
  intensity: number
): LineLayout {
  const scale = Math.min(width, height);
  const pad = scale * 0.08;
  const spread = smoothstep(intensity);

  const left = pad;
  const right = width - pad;
  const quietY = height * 0.72;
  const loudY = height * 0.48;
  const y = quietY + (loudY - quietY) * spread;

  return { left, right, y };
}

type MotionVariant = 0 | 1;

function applyIntensityMotion(
  dot: ScopeDot,
  index: number,
  phase: number,
  intensity: number,
  scale: number,
  overlapAt: number,
  x: number,
  y: number,
  waveAmplitude: number,
  waveFrequency: number,
  motionVariant: MotionVariant = 0
): { x: number; y: number } {
  const localPhase = (phase + motionVariant * 1.85) * waveFrequency;
  const localIndex = index + motionVariant * 0.47;
  const sway = scale * (0.018 + intensity * 0.11) * waveAmplitude;
  y += Math.sin(localPhase * 1.05 + localIndex * 0.72) * sway;

  if (intensity > 0.04) {
    const disturb = intensity * intensity;
    y +=
      Math.sin(localPhase * (2.2 + dot.freq) + localIndex * 1.15) *
        scale *
        disturb *
        0.09 *
        waveAmplitude +
      Math.cos(localPhase * (4.4 + dot.freq * 0.6) + dot.phase + motionVariant) *
        scale *
        disturb *
        0.06 *
        waveAmplitude;

    if (intensity >= overlapAt) {
      x +=
        Math.sin(localPhase * (3.1 + dot.freq) + localIndex * 0.85) *
          scale *
          disturb *
          0.07 *
          waveAmplitude +
        Math.cos(localPhase * (5.6 + localIndex * 0.35) + dot.phase + motionVariant) *
          scale *
          disturb *
          0.05 *
          waveAmplitude;
    }
  }

  if (intensity > 0.45) {
    const chaos = (intensity - 0.45) * (intensity - 0.45);
    y += Math.sin(localPhase * 8.2 + localIndex * 2.1) * scale * chaos * 0.12 * waveAmplitude;
    x +=
      Math.cos(localPhase * 7.4 + localIndex * 1.7 + dot.phase + motionVariant) *
      scale *
      chaos *
      0.1 *
      waveAmplitude;
  }

  if (motionVariant) {
    const spread = scale * 0.012 * waveAmplitude;
    x += Math.cos(dot.phase * 1.7 + localPhase * 0.4) * spread;
    y += Math.sin(dot.phase * 2.3 + localPhase * 0.35) * spread;
  }

  return { x, y };
}

function clampPosition(
  x: number,
  y: number,
  width: number,
  height: number,
  scale: number
): { x: number; y: number } {
  return {
    x: Math.max(scale * 0.04, Math.min(width - scale * 0.04, x)),
    y: Math.max(scale * 0.08, Math.min(height - scale * 0.08, y)),
  };
}

function dotPositionLine(
  dot: ScopeDot,
  index: number,
  count: number,
  phase: number,
  intensity: number,
  layout: LineLayout,
  width: number,
  height: number,
  spacing: number,
  overlapAt: number,
  waveAmplitude: number,
  waveFrequency: number,
  motionVariant: MotionVariant = 0
): { x: number; y: number } {
  const scale = Math.min(width, height);
  const t = count <= 1 ? 0.5 : index / (count - 1);
  const span = (layout.right - layout.left) * Math.min(spacing, 1.75);
  const start = (layout.left + layout.right - span) / 2;

  let { x, y } = applyIntensityMotion(
    dot,
    index,
    phase,
    intensity,
    scale,
    overlapAt,
    start + t * span,
    layout.y,
    waveAmplitude,
    waveFrequency,
    motionVariant
  );

  return clampPosition(x, y, width, height, scale);
}

function dotPositionCircle(
  dot: ScopeDot,
  index: number,
  count: number,
  phase: number,
  intensity: number,
  width: number,
  height: number,
  spacing: number,
  overlapAt: number,
  waveAmplitude: number,
  waveFrequency: number,
  motionVariant: MotionVariant = 0
): { x: number; y: number } {
  const scale = Math.min(width, height);
  const cx = width / 2;
  const cy = height / 2;
  const pad = scale * 0.14;
  const baseRadius = (Math.min(width, height) / 2 - pad) * spacing;
  const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
  const localPhase = (phase + motionVariant * 1.85) * waveFrequency;
  const localIndex = index + motionVariant * 0.47;

  let radius = baseRadius;
  let angleOffset = 0;

  if (intensity > 0.04) {
    const disturb = intensity * intensity;
    radius +=
      Math.sin(localPhase * (2.2 + dot.freq) + localIndex * 1.15) *
      scale *
      disturb *
      0.06 *
      waveAmplitude;
    angleOffset +=
      Math.sin(localPhase * (3.1 + dot.freq) + localIndex * 0.85) * disturb * 0.15 * waveAmplitude;

    if (intensity >= overlapAt) {
      radius +=
        Math.cos(localPhase * (5.6 + localIndex * 0.35) + dot.phase + motionVariant) *
        scale *
        disturb *
        0.05 *
        waveAmplitude;
      angleOffset +=
        Math.cos(localPhase * (4.4 + dot.freq * 0.6) + dot.phase + motionVariant) *
        disturb *
        0.12 *
        waveAmplitude;
    }
  }

  if (intensity > 0.45) {
    const chaos = (intensity - 0.45) * (intensity - 0.45);
    radius += Math.sin(localPhase * 8.2 + localIndex * 2.1) * scale * chaos * 0.1 * waveAmplitude;
    angleOffset +=
      Math.cos(localPhase * 7.4 + localIndex * 1.7 + motionVariant) * chaos * 0.2 * waveAmplitude;
  }

  const a = angle + angleOffset;
  let x = cx + Math.cos(a) * radius;
  let y = cy + Math.sin(a) * radius;

  ({ x, y } = applyIntensityMotion(
    dot,
    index,
    phase,
    intensity * 0.35,
    scale,
    overlapAt,
    x,
    y,
    waveAmplitude,
    waveFrequency,
    motionVariant
  ));

  return clampPosition(x, y, width, height, scale);
}

function dotPositionGrid(
  dot: ScopeDot,
  index: number,
  count: number,
  phase: number,
  intensity: number,
  width: number,
  height: number,
  spacing: number,
  overlapAt: number,
  waveAmplitude: number,
  waveFrequency: number,
  motionVariant: MotionVariant = 0
): { x: number; y: number } {
  const scale = Math.min(width, height);
  const cols = Math.ceil(Math.sqrt(count));
  const rows = Math.ceil(count / cols);
  const col = index % cols;
  const row = Math.floor(index / cols);

  const padX = scale * 0.08;
  const padY = scale * 0.08;
  const gap = scale * 0.035 * spacing;
  const cellW = (width - 2 * padX - gap * (cols - 1)) / cols;
  const cellH = (height - 2 * padY - gap * (rows - 1)) / rows;

  let { x, y } = applyIntensityMotion(
    dot,
    index,
    phase,
    intensity,
    scale,
    overlapAt,
    padX + col * (cellW + gap) + cellW / 2,
    padY + row * (cellH + gap) + cellH / 2,
    waveAmplitude,
    waveFrequency,
    motionVariant
  );

  return clampPosition(x, y, width, height, scale);
}

function dotPosition(
  shape: WaveformShape,
  dot: ScopeDot,
  index: number,
  count: number,
  phase: number,
  intensity: number,
  layout: LineLayout,
  width: number,
  height: number,
  spacing: number,
  overlapAt: number,
  waveAmplitude: number,
  waveFrequency: number,
  motionVariant: MotionVariant = 0
): { x: number; y: number } {
  switch (shape) {
    case "circle":
      return dotPositionCircle(
        dot,
        index,
        count,
        phase,
        intensity,
        width,
        height,
        spacing,
        overlapAt,
        waveAmplitude,
        waveFrequency,
        motionVariant
      );
    case "grid":
      return dotPositionGrid(
        dot,
        index,
        count,
        phase,
        intensity,
        width,
        height,
        spacing,
        overlapAt,
        waveAmplitude,
        waveFrequency,
        motionVariant
      );
    default:
      return dotPositionLine(
        dot,
        index,
        count,
        phase,
        intensity,
        layout,
        width,
        height,
        spacing,
        overlapAt,
        waveAmplitude,
        waveFrequency,
        motionVariant
      );
  }
}

@customElement(WAVEFORM_CARD_NAME)
export class NvisionWaveformCard extends LitElement implements LovelaceCard {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("./waveform-card-editor");
    return document.createElement(
      WAVEFORM_CARD_EDITOR_NAME
    ) as LovelaceCardEditor;
  }

  public static getStubConfig(
    hass: HomeAssistant,
    entities: string[],
    entitiesFallback: string[]
  ): WaveformCardConfig {
    const entity =
      entities.find(
        (id) => parseNumericState(hass.states[id]?.state) !== undefined
      ) ||
      entities[0] ||
      entitiesFallback[0] ||
      Object.keys(hass.states)[0];

    return {
      type: `custom:${WAVEFORM_CARD_NAME}`,
      entity,
      min: DEFAULT_MIN,
      max: DEFAULT_MAX,
      shape: DEFAULT_SHAPE,
      dot_count: DEFAULT_DOT_COUNT,
      dot_size: DEFAULT_DOT_SIZE,
      dot_spacing: DEFAULT_DOT_SPACING,
      overlap_dots: DEFAULT_OVERLAP_DOTS,
      overlap_at: DEFAULT_OVERLAP_AT,
      shake_at: DEFAULT_SHAKE_AT,
      shake_peak: DEFAULT_SHAKE_PEAK,
      wave_amplitude: DEFAULT_WAVE_AMPLITUDE,
      wave_frequency: DEFAULT_WAVE_FREQUENCY,
    };
  }

  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: WaveformCardConfig;

  @query("canvas") private _canvas?: HTMLCanvasElement;

  private _ctx?: CanvasRenderingContext2D;
  private _frameId = 0;
  private _animating = false;
  private _lastFrame = 0;
  private _phase = 0;
  private _displayIntensity = 0;
  private _targetIntensity = 0;
  private _dots: ScopeDot[] = buildDots(DEFAULT_DOT_COUNT);
  private _resizeObserver?: ResizeObserver;

  public setConfig(config: WaveformCardConfig): void {
    this._config = {
      min: DEFAULT_MIN,
      max: DEFAULT_MAX,
      shape: DEFAULT_SHAPE,
      dot_count: DEFAULT_DOT_COUNT,
      dot_size: DEFAULT_DOT_SIZE,
      dot_spacing: DEFAULT_DOT_SPACING,
      overlap_dots: DEFAULT_OVERLAP_DOTS,
      overlap_at: DEFAULT_OVERLAP_AT,
      shake_at: DEFAULT_SHAKE_AT,
      shake_peak: DEFAULT_SHAKE_PEAK,
      wave_amplitude: DEFAULT_WAVE_AMPLITUDE,
      wave_frequency: DEFAULT_WAVE_FREQUENCY,
      ...config,
    };
    this._syncDots();
  }

  private _waveOptions(): { amplitude: number; frequency: number } {
    return {
      amplitude: this._config?.wave_amplitude ?? DEFAULT_WAVE_AMPLITUDE,
      frequency: this._config?.wave_frequency ?? DEFAULT_WAVE_FREQUENCY,
    };
  }

  private _layoutOptions(): {
    shape: WaveformShape;
    dotCount: number;
    dotSize: number;
    dotSpacing: number;
  } {
    return {
      shape: this._config?.shape ?? DEFAULT_SHAPE,
      dotCount: Math.min(
        64,
        Math.max(4, Math.round(this._config?.dot_count ?? DEFAULT_DOT_COUNT))
      ),
      dotSize: this._config?.dot_size ?? DEFAULT_DOT_SIZE,
      dotSpacing: this._config?.dot_spacing ?? DEFAULT_DOT_SPACING,
    };
  }

  private _syncDots(): void {
    const { dotCount } = this._layoutOptions();
    if (this._dots.length !== dotCount) {
      this._dots = buildDots(dotCount);
    }
  }

  private _effectThresholds(): {
    overlapAt: number;
    shakeAt: number;
    shakePeak: number;
  } {
    return {
      overlapAt: this._config?.overlap_at ?? DEFAULT_OVERLAP_AT,
      shakeAt: this._config?.shake_at ?? DEFAULT_SHAKE_AT,
      shakePeak: this._config?.shake_peak ?? DEFAULT_SHAKE_PEAK,
    };
  }

  public getCardSize(): number {
    return 1;
  }

  public getGridOptions(): LovelaceGridOptions {
    return { columns: 6, rows: 1 };
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (this._ctx) {
      this._lastFrame = 0;
      this._startAnimation();
    }
  }

  disconnectedCallback(): void {
    this._stopAnimation();
    this._resizeObserver?.disconnect();
    this.style.transform = "";
    super.disconnectedCallback();
  }

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has("hass") || changed.has("_config")) {
      this._syncIntensity();
    }

    if (changed.has("_config")) {
      this._syncDots();
    }

    this._ensureCanvas();
  }

  private _range(): { min: number; max: number } {
    const min = this._config?.min ?? DEFAULT_MIN;
    const max = this._config?.max ?? DEFAULT_MAX;
    return { min, max };
  }

  private _syncIntensity(): void {
    const entity = this._config?.entity;
    const state = entity ? this.hass?.states[entity]?.state : undefined;
    const value = parseNumericState(state);
    const { min, max } = this._range();

    if (value === undefined) {
      this._targetIntensity = 0;
      return;
    }

    this._targetIntensity = normalizeValue(value, min, max);
  }

  private _ensureCanvas(): void {
    const canvas = this._canvas;
    if (!canvas || this._ctx) {
      return;
    }

    this._ctx = canvas.getContext("2d") ?? undefined;
    if (!this._ctx) {
      return;
    }

    this._resizeObserver = new ResizeObserver(() => this._resizeCanvas());
    this._resizeObserver.observe(canvas.parentElement ?? this);
    this._resizeCanvas();
    this._lastFrame = 0;
    this._startAnimation();
  }

  private _startAnimation(): void {
    if (this._animating) {
      return;
    }

    this._animating = true;

    const tick = (now: number) => {
      if (!this.isConnected || !this._ctx) {
        this._animating = false;
        return;
      }

      const delta = this._lastFrame
        ? Math.min((now - this._lastFrame) / 16.67, 3)
        : 1;
      this._lastFrame = now;

      this._draw(delta);
      this._frameId = requestAnimationFrame(tick);
    };

    this._frameId = requestAnimationFrame(tick);
  }

  private _stopAnimation(): void {
    cancelAnimationFrame(this._frameId);
    this._animating = false;
  }

  private _resizeCanvas(): void {
    const canvas = this._canvas;
    if (!canvas) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    this._ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    this._syncDots();
  }

  private _tickIntensity(delta: number): number {
    const diff = this._targetIntensity - this._displayIntensity;
    if (Math.abs(diff) < 0.001) {
      this._displayIntensity = this._targetIntensity;
    } else {
      this._displayIntensity += diff * INTENSITY_LERP * delta;
    }

    return this._displayIntensity;
  }

  private _applyShake(intensity: number): void {
    const { shakeAt, shakePeak } = this._effectThresholds();

    if (intensity < shakeAt) {
      this.style.transform = "";
      return;
    }

    const amount =
      ((intensity - shakeAt) / (1 - shakeAt)) * shakePeak;
    const x =
      Math.sin(this._phase * 14.3) * amount * 2.4 +
      Math.cos(this._phase * 19.7) * amount * 1.2;
    const y =
      Math.cos(this._phase * 16.1) * amount * 1.8 +
      Math.sin(this._phase * 11.2) * amount * 0.9;
    const rot = Math.sin(this._phase * 21.5) * amount * 0.4;

    this.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
  }

  private _drawDot(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    color: string,
    alpha: number
  ): void {
    ctx.beginPath();
    ctx.arc(x, y, radius * 2.2, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha * 0.12;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.globalAlpha = alpha;
    ctx.fill();

    ctx.globalAlpha = 1;
  }

  private _draw(delta: number): void {
    const canvas = this._canvas;
    const ctx = this._ctx;
    if (!canvas || !ctx) {
      return;
    }

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (width <= 0 || height <= 0) {
      return;
    }

    this._syncIntensity();
    const intensity = this._tickIntensity(delta);
    const { amplitude, frequency } = this._waveOptions();
    this._phase += delta * (0.045 + intensity * 0.12) * frequency;
    this._applyShake(intensity);

    const waveColor = resolveWaveColor(this._config?.color, this);
    const { overlapAt } = this._effectThresholds();
    const { shape, dotSize, dotSpacing } = this._layoutOptions();
    const scale = Math.min(width, height);
    const baseRadius =
      Math.max(1.05, scale * 0.0115) * Math.max(0.25, dotSize);
    const layout = lineLayout(width, height, intensity);

    ctx.clearRect(0, 0, width, height);

    const overlapDots = this._config?.overlap_dots ?? DEFAULT_OVERLAP_DOTS;
    const variantCount = overlapDots ? 2 : 1;

    for (let i = 0; i < this._dots.length; i += 1) {
      for (let variant = 0; variant < variantCount; variant += 1) {
        const motionVariant = variant as MotionVariant;
        const { x, y } = dotPosition(
          shape,
          this._dots[i],
          i,
          this._dots.length,
          this._phase,
          intensity,
          layout,
          width,
          height,
          dotSpacing,
          overlapAt,
          amplitude,
          frequency,
          motionVariant
        );

        const radius =
          baseRadius * (0.85 + intensity * 0.35) * (motionVariant ? 0.92 : 1);
        const alpha = (0.32 + intensity * 0.5) * (motionVariant ? 0.78 : 1);

        this._drawDot(ctx, x, y, radius, waveColor, alpha);
      }
    }
  }

  protected render() {
    if (!this._config || !this.hass) {
      return nothing;
    }

    const stateObj = this._config.entity
      ? this.hass.states[this._config.entity]
      : undefined;

    const name =
      this._config.name ||
      stateObj?.attributes.friendly_name ||
      "Waveform";

    const value = formatStateWithUnit(stateObj);

    return html`
      <ha-card>
        <div class="stage">
          <div class="content">
            ${stateObj
              ? html`<ha-state-icon
                  .hass=${this.hass}
                  .stateObj=${stateObj}
                ></ha-state-icon>`
              : nothing}
            <ha-tile-info
              .primary=${value}
              .secondary=${name}
            ></ha-tile-info>
          </div>
          <canvas aria-hidden="true"></canvas>
        </div>
      </ha-card>
    `;
  }

  static styles = [
    responsiveTypeStyles,
    responsiveTileInfoStyles,
    responsiveStateIconStyles,
    css`
    :host {
      --tile-color: var(--state-inactive-color);
      display: block;
      height: 100%;
    }

    ha-card {
      height: 100%;
      overflow: hidden;
    }

    .stage {
      position: relative;
      height: 100%;
      min-height: 56px;
    }

    .content {
      position: relative;
      z-index: 0;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px;
      box-sizing: border-box;
      height: 100%;
      min-height: 56px;
    }

    ha-state-icon {
      flex: none;
      color: var(--primary-text-color);
    }

    ha-tile-info {
      min-width: 0;
      flex: 1;
    }

    canvas {
      position: absolute;
      inset: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      display: block;
      pointer-events: none;
    }
  `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [WAVEFORM_CARD_NAME]: NvisionWaveformCard;
  }
}
