import { css, html, LitElement, nothing, svg } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardEditor,
  LovelaceGridOptions,
} from "../../types";
import { registerCustomCard } from "../../utils/custom-cards";
import {
  ActionHandlers,
  moreInfoInteractions,
} from "../../utils/action-handlers";
import { resolveThemeColor } from "../../utils/colors";
import { responsiveTypeStyles } from "../../utils/responsive-type";
import type { AirQualityCardConfig } from "./air-quality-card-config";
import {
  AIR_QUALITY_CARD_EDITOR_NAME,
  AIR_QUALITY_CARD_NAME,
  DEFAULT_MAX,
  DEFAULT_MIN,
} from "./const";

registerCustomCard({
  type: AIR_QUALITY_CARD_NAME,
  name: "Nvision Air Quality",
  description:
    "Gauge with gradient arc, mist when air is poor, crisp glow when clear",
});

const ARC_RADIUS = 40;
const ARC_LENGTH = Math.PI * ARC_RADIUS;
const VALUE_LERP = 0.08;
const CLEAN_THRESHOLD = 0.38;
const DIRTY_THRESHOLD = 0.62;

function effectClarity(badness: number): number {
  if (badness >= CLEAN_THRESHOLD) {
    return 0;
  }

  return (CLEAN_THRESHOLD - badness) / CLEAN_THRESHOLD;
}

function effectHaze(badness: number): number {
  if (badness <= DIRTY_THRESHOLD) {
    return 0;
  }

  return (badness - DIRTY_THRESHOLD) / (1 - DIRTY_THRESHOLD);
}

interface MistBlob {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
}

function resolveAirColors(
  config: AirQualityCardConfig | undefined,
  host: HTMLElement
) {
  return {
    good: resolveThemeColor(
      config?.color_good,
      host,
      "--success-color",
      "#4caf50"
    ),
    warning: resolveThemeColor(
      config?.color_warning,
      host,
      "--warning-color",
      "#ff9800"
    ),
    bad: resolveThemeColor(
      config?.color_bad,
      host,
      "--error-color",
      "#f44336"
    ),
    mist: resolveThemeColor(
      config?.color_mist,
      host,
      "--secondary-text-color",
      "#888888"
    ),
    clear: resolveThemeColor(
      config?.color_clear,
      host,
      "--success-color",
      "#4caf50"
    ),
    sky: resolveThemeColor(
      config?.color_sky,
      host,
      "--info-color",
      "#2196f3"
    ),
  };
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

function getAngle(value: number, min: number, max: number): number {
  return normalizeValue(value, min, max) * 180;
}

function isAirQualityEntity(
  hass: HomeAssistant,
  entityId: string
): boolean {
  const stateObj = hass.states[entityId];
  if (!stateObj) {
    return false;
  }

  const deviceClass = stateObj.attributes?.device_class;
  return (
    deviceClass === "aqi" ||
    deviceClass === "pm25" ||
    deviceClass === "pm10" ||
    /aqi|air_quality|pm2/i.test(entityId)
  );
}

let gradientCounter = 0;

@customElement(AIR_QUALITY_CARD_NAME)
export class NvisionAirQualityCard extends LitElement implements LovelaceCard {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("./air-quality-card-editor");
    return document.createElement(
      AIR_QUALITY_CARD_EDITOR_NAME
    ) as LovelaceCardEditor;
  }

  public static getStubConfig(
    hass: HomeAssistant,
    entities: string[],
    entitiesFallback: string[]
  ): AirQualityCardConfig {
    const entity =
      entities.find((id) => isAirQualityEntity(hass, id)) ||
      entities.find(
        (id) => parseNumericState(hass.states[id]?.state) !== undefined
      ) ||
      entities[0] ||
      entitiesFallback[0] ||
      Object.keys(hass.states)[0];

    return {
      type: `custom:${AIR_QUALITY_CARD_NAME}`,
      entity,
      min: DEFAULT_MIN,
      max: DEFAULT_MAX,
    };
  }

  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: AirQualityCardConfig;

  @state() private _gaugeReady = false;

  @query("canvas") private _canvas?: HTMLCanvasElement;

  @query(".stage") private _stage?: HTMLElement;

  private _gradientId = `aq-gradient-${++gradientCounter}`;
  private _ctx?: CanvasRenderingContext2D;
  private _frameId = 0;
  private _animating = false;
  private _lastFrame = 0;
  private _phase = 0;
  private _displayValue = 0;
  private _targetValue = 0;
  private _mist: MistBlob[] = [];
  private _resizeObserver?: ResizeObserver;

  private _actions = new ActionHandlers(
    () => this,
    () => this.hass,
    () => this._config
  );

  public setConfig(config: AirQualityCardConfig): void {
    this._config = {
      min: DEFAULT_MIN,
      max: DEFAULT_MAX,
      ...moreInfoInteractions(),
      ...config,
    };
  }

  public getCardSize(): number {
    return 4;
  }

  public getGridOptions(): LovelaceGridOptions {
    return { columns: 6, rows: 2 };
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
    super.disconnectedCallback();
  }

  protected firstUpdated(): void {
    requestAnimationFrame(() => {
      this._gaugeReady = true;
    });
  }

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has("hass") || changed.has("_config")) {
      this._syncValue();
      this._applyEffectLevels(this._badness(this._targetValue));
    }

    this._ensureCanvas();
  }

  private _range(): { min: number; max: number } {
    const min = this._config?.min ?? DEFAULT_MIN;
    const max = this._config?.max ?? DEFAULT_MAX;
    return { min, max };
  }

  private _syncValue(): void {
    const entity = this._config?.entity;
    const state = entity ? this.hass?.states[entity]?.state : undefined;
    const value = parseNumericState(state);
    const { min, max } = this._range();

    if (value === undefined) {
      this._targetValue = min;
      return;
    }

    this._targetValue = Math.min(max, Math.max(min, value));
  }

  private _tickValue(delta: number): number {
    const diff = this._targetValue - this._displayValue;
    if (Math.abs(diff) < 0.05) {
      this._displayValue = this._targetValue;
    } else {
      this._displayValue += diff * VALUE_LERP * delta;
    }

    return this._displayValue;
  }

  private _badness(value: number): number {
    const { min, max } = this._range();
    return normalizeValue(value, min, max);
  }

  private _applyEffectLevels(badness: number): void {
    this._stage?.style.setProperty("--haze", String(effectHaze(badness)));
    this._stage?.style.setProperty("--clarity", String(effectClarity(badness)));
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
  }

  private _ensureMist(width: number, height: number, badness: number): void {
    const target = Math.floor(badness * 16);
    while (this._mist.length < target) {
      this._mist.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 18 + Math.random() * 42,
        vx: (Math.random() - 0.5) * 0.22,
        vy: -0.04 - Math.random() * 0.18,
        alpha: 0.04 + Math.random() * 0.1,
      });
    }

    if (this._mist.length > target) {
      this._mist.length = target;
    }
  }

  private _drawMist(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    badness: number,
    delta: number,
    mistColor: string
  ): void {
    if (badness < 0.08) {
      return;
    }

    this._ensureMist(width, height, badness);
    for (const blob of this._mist) {
      blob.x += blob.vx * delta;
      blob.y += blob.vy * delta;

      if (blob.y + blob.radius < 0) {
        blob.y = height + blob.radius;
        blob.x = Math.random() * width;
      }
      if (blob.x < -blob.radius) {
        blob.x = width + blob.radius;
      }
      if (blob.x > width + blob.radius) {
        blob.x = -blob.radius;
      }

      const gradient = ctx.createRadialGradient(
        blob.x,
        blob.y,
        0,
        blob.x,
        blob.y,
        blob.radius
      );
      gradient.addColorStop(0, mistColor);
      gradient.addColorStop(1, "rgba(0,0,0,0)");

      ctx.beginPath();
      ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.globalAlpha = blob.alpha * badness * 1.4;
      ctx.fill();
    }

    ctx.globalAlpha = 1;
  }

  private _drawClearGlow(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    clarity: number,
    clearColor: string,
    skyColor: string
  ): void {
    if (clarity < 0.2) {
      return;
    }

    const cx = width * 0.5;
    const cy = height * 0.36;
    const breathe = 0.94 + Math.sin(this._phase * 0.5) * 0.06;
    const radius = Math.min(width, height) * 0.62 * breathe;
    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    glow.addColorStop(0, clearColor);
    glow.addColorStop(0.55, skyColor);
    glow.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = glow;
    ctx.globalAlpha = clarity * clarity * 0.1;
    ctx.fillRect(0, 0, width, height);

    const sky = ctx.createLinearGradient(0, 0, 0, height * 0.55);
    sky.addColorStop(0, skyColor);
    sky.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = sky;
    ctx.globalAlpha = clarity * 0.06;
    ctx.fillRect(0, 0, width, height);

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

    this._syncValue();
    const value = this._tickValue(delta);
    const badness = this._badness(value);
    const clarity = effectClarity(badness);
    const haze = effectHaze(badness);
    this._phase += delta * 0.025;

    this._applyEffectLevels(badness);

    const colors = resolveAirColors(this._config, this);

    ctx.clearRect(0, 0, width, height);
    this._drawClearGlow(ctx, width, height, clarity, colors.clear, colors.sky);
    this._drawMist(ctx, width, height, haze, delta, colors.mist);
  }

  private _renderGauge(
    value: number,
    valueText: string,
    unit: string,
    successColor: string,
    warningColor: string,
    errorColor: string
  ) {
    const { min, max } = this._range();
    const valueAngle = getAngle(value, min, max);
    const strokeOffset = this._gaugeReady
      ? ARC_LENGTH * (1 - valueAngle / 180)
      : ARC_LENGTH;

    return svg`
      <svg viewBox="-50 -50 100 55" class="gauge">
        <defs>
          <linearGradient
            id=${this._gradientId}
            x1="-40"
            y1="0"
            x2="40"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stop-color=${successColor} />
            <stop offset="50%" stop-color=${warningColor} />
            <stop offset="100%" stop-color=${errorColor} />
          </linearGradient>
        </defs>
        <path class="levels-base" d="M -40 0 A 40 40 0 0 1 40 0" />
        <path
          class="value"
          d="M -40 0 A 40 40 0 0 1 40 0"
          stroke=${`url(#${this._gradientId})`}
          stroke-dasharray=${ARC_LENGTH}
          style=${styleMap({ strokeDashoffset: `${strokeOffset}` })}
        />
        <text
          class="value-text"
          x="0"
          y="-6"
          dominant-baseline="middle"
          text-anchor="middle"
        >
          ${valueText}
        </text>
        ${unit
          ? svg`<text
              class="unit-text"
              x="0"
              y="6"
              dominant-baseline="middle"
              text-anchor="middle"
            >
              ${unit}
            </text>`
          : nothing}
      </svg>
    `;
  }

  protected render() {
    if (!this._config || !this.hass) {
      return nothing;
    }

    const stateObj = this._config.entity
      ? this.hass.states[this._config.entity]
      : undefined;

    const value = parseNumericState(stateObj?.state);
    const gaugeValue = value ?? this._targetValue;

    const primary =
      this._config.name ||
      stateObj?.attributes.friendly_name ||
      "Air Quality";

    const unit = stateObj?.attributes.unit_of_measurement ?? "";
    const valueText =
      value !== undefined ? String(Math.round(value * 10) / 10) : "—";

    const colors = resolveAirColors(this._config, this);

    return html`
      <ha-card
        style=${styleMap({
          "--aq-good-color": colors.good,
          "--aq-warning-color": colors.warning,
          "--aq-bad-color": colors.bad,
          "--aq-mist-color": colors.mist,
          "--aq-clear-color": colors.clear,
          "--aq-sky-color": colors.sky,
        })}
      >
        <div class="stage">
          <canvas aria-hidden="true"></canvas>
          <div class="clear-overlay" aria-hidden="true"></div>
          <div class="haze-overlay" aria-hidden="true"></div>
          <div
            class="body"
            role="button"
            tabindex="0"
            @click=${this._actions.bind().click}
            @dblclick=${this._actions.bind().dblclick}
            @keydown=${this._actions.bind().keydown}
            @pointerdown=${this._actions.bind().pointerdown}
            @pointerup=${this._actions.bind().pointerup}
            @pointerleave=${this._actions.bind().pointerleave}
            @pointercancel=${this._actions.bind().pointercancel}
          >
            <div class="gauge-wrap">
              ${this._renderGauge(
                gaugeValue,
                valueText,
                unit,
                colors.good,
                colors.warning,
                colors.bad
              )}
            </div>
            <p class="title" .title=${primary}>${primary}</p>
          </div>
        </div>
      </ha-card>
    `;
  }

  static styles = [
    responsiveTypeStyles,
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
      min-height: 120px;
    }

    canvas {
      position: absolute;
      inset: 0;
      z-index: 2;
      width: 100%;
      height: 100%;
      display: block;
      pointer-events: none;
    }

    .clear-overlay {
      position: absolute;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      opacity: calc(var(--clarity, 0) * 0.9);
      background:
        radial-gradient(
          ellipse 85% 55% at 50% 38%,
          color-mix(in srgb, var(--aq-clear-color, var(--success-color)) 16%, transparent),
          transparent 72%
        ),
        linear-gradient(
          180deg,
          color-mix(in srgb, var(--aq-sky-color, var(--info-color)) 10%, transparent),
          transparent 50%
        );
      transition: opacity 0.8s ease;
    }

    .haze-overlay {
      position: absolute;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      opacity: calc(var(--haze, 0) * 0.85);
      backdrop-filter: blur(calc(var(--haze, 0) * 5px));
      background: color-mix(
        in srgb,
        var(--aq-mist-color, var(--secondary-text-color)) calc(var(--haze, 0) * 18%),
        transparent
      );
      transition: opacity 0.8s ease;
    }

    .body {
      position: relative;
      z-index: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: var(--ha-space-3, 12px);
      box-sizing: border-box;
      cursor: pointer;
      filter: blur(calc(var(--haze, 0) * 1.6px))
        saturate(calc(1 + var(--clarity, 0) * 0.14))
        contrast(calc(1 + var(--clarity, 0) * 0.05));
      transition: filter 0.8s ease;
    }

    .gauge-wrap {
      position: relative;
      width: 100%;
      max-width: var(--nv-gauge-max-size);
    }

    .gauge {
      width: 100%;
      display: block;
    }

    .levels-base {
      fill: none;
      stroke: var(--primary-background-color);
      stroke-width: 12;
      stroke-linecap: butt;
    }

    .value {
      fill: none;
      stroke-width: 12;
      stroke-linecap: butt;
      transition: stroke-dashoffset 1s ease;
    }

    .value-text {
      font-size: var(--nv-value-font-size);
      font-weight: 500;
      fill: var(--primary-text-color);
    }

    .unit-text {
      font-size: var(--nv-label-font-size);
      fill: var(--secondary-text-color);
    }

    .title {
      width: 100%;
      font-size: var(--nv-title-font-size);
      line-height: var(--ha-line-height-expanded, 1.5);
      margin: 0;
      margin-top: 4px;
      text-align: center;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex: none;
      color: var(--primary-text-color);
    }
  `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [AIR_QUALITY_CARD_NAME]: NvisionAirQualityCard;
  }
}
