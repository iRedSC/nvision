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
import type { WaveformCardConfig } from "./waveform-card-config";
import {
  DEFAULT_LAYOUT,
  DEFAULT_MAX,
  DEFAULT_MIN,
  DEFAULT_MOTION,
  DEFAULT_SHAKE_AT,
  DEFAULT_SHAKE_PEAK,
  DEFAULT_SHAKE_SPEED,
  DEFAULT_SIZE,
  WAVEFORM_CARD_EDITOR_NAME,
  WAVEFORM_CARD_NAME,
} from "./const";
import {
  baseDotRadius,
  buildDots,
  computeDotDrawParams,
  computeMotionActivity,
  contentFade,
  edgeFade,
  resolvePresets,
  type ScopeDot,
} from "./presets";

registerCustomCard({
  type: WAVEFORM_CARD_NAME,
  name: "Nvision Waveform",
  description: "Oscilloscope dot patterns driven by a numeric sensor",
});

const INTENSITY_LERP = 0.1;

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
      layout: DEFAULT_LAYOUT,
      size: DEFAULT_SIZE,
      motion: DEFAULT_MOTION,
    };
  }

  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: WaveformCardConfig;

  @query(".stage") private _stage?: HTMLElement;

  @query("canvas") private _canvas?: HTMLCanvasElement;

  private _ctx?: CanvasRenderingContext2D;
  private _frameId = 0;
  private _animating = false;
  private _lastFrame = 0;
  private _phase = 0;
  private _displayIntensity = 0;
  private _targetIntensity = 0;
  private _dots: ScopeDot[] = buildDots(24);
  private _resizeObserver?: ResizeObserver;

  public setConfig(config: WaveformCardConfig): void {
    this._config = {
      min: DEFAULT_MIN,
      max: DEFAULT_MAX,
      layout: DEFAULT_LAYOUT,
      size: DEFAULT_SIZE,
      motion: DEFAULT_MOTION,
      shake_at: DEFAULT_SHAKE_AT,
      shake_peak: DEFAULT_SHAKE_PEAK,
      shake_speed: DEFAULT_SHAKE_SPEED,
      ...config,
    };
    this._syncDots();
  }

  private _presets() {
    return resolvePresets(this._config ?? {});
  }

  private _syncDots(): void {
    const { dotCount } = this._presets();
    if (this._dots.length !== dotCount) {
      this._dots = buildDots(dotCount);
    }
  }

  private _shakeThresholds(): {
    shakeAt: number;
    shakePeak: number;
    shakeSpeed: number;
  } {
    return {
      shakeAt: this._config?.shake_at ?? DEFAULT_SHAKE_AT,
      shakePeak: this._config?.shake_peak ?? DEFAULT_SHAKE_PEAK,
      shakeSpeed: this._config?.shake_speed ?? DEFAULT_SHAKE_SPEED,
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
    this._resizeObserver.observe(this._stage ?? canvas.parentElement ?? this);
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

  private _applyShake(activity: number): void {
    const { shakeAt, shakePeak } = this._shakeThresholds();

    if (activity < shakeAt) {
      this.style.transform = "";
      return;
    }

    const amount = ((activity - shakeAt) / (1 - shakeAt)) * shakePeak;
    const t = this._phase;
    const x =
      Math.sin(t * 14.3) * amount * 2.4 +
      Math.cos(t * 19.7) * amount * 1.2;
    const y =
      Math.cos(t * 16.1) * amount * 1.8 +
      Math.sin(t * 11.2) * amount * 0.9;
    const rot = Math.sin(t * 21.5) * amount * 0.4;

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
    if (alpha <= 0.01) {
      return;
    }

    ctx.save();
    ctx.shadowColor = color;
    ctx.shadowBlur = radius * 2.4;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha * 0.35;
    ctx.fill();
    ctx.restore();

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
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
    const rawIntensity = this._tickIntensity(delta);
    const animIntensity = Math.max(0.12, rawIntensity);
    const { shakeSpeed } = this._shakeThresholds();
    const presets = this._presets();
    const motionActivity = computeMotionActivity(
      presets.motion,
      rawIntensity,
      presets.phaseSpeed,
      shakeSpeed
    );
    const frenzy =
      motionActivity > DEFAULT_SHAKE_AT
        ? 1 + (motionActivity - DEFAULT_SHAKE_AT) * 2.2
        : 1;
    this._phase +=
      delta *
      (0.014 + animIntensity * animIntensity * 0.1) *
      presets.phaseSpeed *
      frenzy *
      shakeSpeed;
    this._applyShake(motionActivity);

    const waveColor = resolveWaveColor(this._config?.color, this);
    const scale = Math.min(width, height);
    const baseRadius = baseDotRadius(scale, presets.dotScale);

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < this._dots.length; i += 1) {
      const params = computeDotDrawParams(
        presets,
        this._dots[i],
        i,
        this._dots.length,
        this._phase,
        Math.max(0.12, rawIntensity),
        width,
        height,
        0
      );

      const fade =
        edgeFade(
          params.x,
          params.y,
          width,
          height,
          scale,
          presets.layout
        ) * contentFade(params.x, params.y, width, height);
      const radius =
        baseRadius * params.radiusMul * (0.82 + animIntensity * 0.28);
      const alpha =
        (0.3 + animIntensity * 0.52) * params.alphaMul * fade;

      this._drawDot(ctx, params.x, params.y, radius, waveColor, alpha);
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
          <canvas aria-hidden="true"></canvas>
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
      overflow: hidden;
    }

    canvas {
      position: absolute;
      inset: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
      display: block;
      pointer-events: none;
    }

    .content {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px;
      box-sizing: border-box;
      width: 100%;
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
  `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [WAVEFORM_CARD_NAME]: NvisionWaveformCard;
  }
}
