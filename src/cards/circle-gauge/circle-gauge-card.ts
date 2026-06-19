import { css, html, LitElement, nothing, svg } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import type { HassEntity } from "home-assistant-js-websocket";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardEditor,
  LovelaceGridOptions,
} from "../../types";
import { registerCustomCard } from "../../utils/custom-cards";
import { resolveThemeColor } from "../../utils/colors";
import { responsiveTypeStyles } from "../../utils/responsive-type";
import type { CircleGaugeCardConfig } from "./circle-gauge-card-config";
import {
  CIRCLE_GAUGE_CARD_EDITOR_NAME,
  CIRCLE_GAUGE_CARD_NAME,
  DEFAULT_MAX,
  DEFAULT_MIN,
} from "./const";

registerCustomCard({
  type: CIRCLE_GAUGE_CARD_NAME,
  name: "Nvision Circle Gauge",
  description: "Full-circle gauge with the value centered, ideal for timers",
});

const RADIUS = 40;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function resolveGaugeColor(
  configColor: CircleGaugeCardConfig["color"],
  host: HTMLElement
): string {
  return resolveThemeColor(configColor, host, "--primary-color", "#03a9f4");
}

function resolveTrackColor(
  configColor: CircleGaugeCardConfig["track_color"],
  host: HTMLElement
): string {
  return resolveThemeColor(
    configColor,
    host,
    "--primary-background-color",
    "#e0e0e0"
  );
}

function parseNumericState(state: string | undefined): number | undefined {
  if (state === undefined || state === "unavailable" || state === "unknown") {
    return undefined;
  }

  const value = Number(state);
  return Number.isFinite(value) ? value : undefined;
}

function durationToSeconds(duration: string): number {
  const parts = duration.split(":").map(Number);
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  return Number(duration) || 0;
}

function formatSecondsCompact(
  seconds: number,
  locale?: { language: string }
): string {
  const total = Math.max(0, Math.floor(seconds));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const secs = total % 60;

  const duration: Record<string, number> = {};
  if (hours) {
    duration.hours = hours;
  }
  if (minutes) {
    duration.minutes = minutes;
  }
  if (secs || (!hours && !minutes)) {
    duration.seconds = secs;
  }

  if (
    locale?.language &&
    typeof Intl !== "undefined" &&
    "DurationFormat" in Intl
  ) {
    return new Intl.DurationFormat(locale.language, {
      style: "narrow",
      hoursDisplay: hours ? "always" : "auto",
    }).format(duration);
  }

  const parts: string[] = [];
  if (hours) {
    parts.push(`${hours}h`);
  }
  if (minutes) {
    parts.push(`${minutes}m`);
  }
  if (secs || parts.length === 0) {
    parts.push(`${secs}s`);
  }
  return parts.join(" ");
}

function timerRemainingSeconds(stateObj: HassEntity): number | undefined {
  const remaining = stateObj.attributes.remaining;
  if (typeof remaining !== "string") {
    return undefined;
  }

  let seconds = durationToSeconds(remaining);

  if (stateObj.state === "active" && stateObj.attributes.finishes_at) {
    const finishes = new Date(String(stateObj.attributes.finishes_at)).getTime();
    seconds = Math.max((finishes - Date.now()) / 1000, 0);
  }

  return seconds;
}

function timerDurationSeconds(stateObj: HassEntity): number {
  const duration = stateObj.attributes.duration;
  if (typeof duration === "string") {
    return durationToSeconds(duration);
  }
  return 0;
}

function formatTimerText(
  stateObj: HassEntity,
  remaining: number | undefined,
  locale?: { language: string }
): string {
  if (stateObj.state === "idle" && remaining === undefined) {
    return "Idle";
  }

  if (remaining === undefined) {
    return "—";
  }

  if (stateObj.state === "idle" && remaining === 0) {
    return "Idle";
  }

  return formatSecondsCompact(remaining, locale);
}

function normalizeValue(value: number, min: number, max: number): number {
  if (max <= min) {
    return 0;
  }

  return Math.min(1, Math.max(0, (value - min) / (max - min)));
}

function isTimerEntity(entityId: string | undefined): boolean {
  return entityId?.startsWith("timer.") ?? false;
}

function isNumericEntity(
  hass: HomeAssistant,
  entityId: string
): boolean {
  const stateObj = hass.states[entityId];
  if (!stateObj) {
    return false;
  }

  if (isTimerEntity(entityId)) {
    return true;
  }

  return parseNumericState(stateObj.state) !== undefined;
}

@customElement(CIRCLE_GAUGE_CARD_NAME)
export class NvisionCircleGaugeCard extends LitElement implements LovelaceCard {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("./circle-gauge-card-editor");
    return document.createElement(
      CIRCLE_GAUGE_CARD_EDITOR_NAME
    ) as LovelaceCardEditor;
  }

  public static getStubConfig(
    hass: HomeAssistant,
    entities: string[],
    entitiesFallback: string[]
  ): CircleGaugeCardConfig {
    const entity =
      entities.find((id) => id.startsWith("timer.")) ||
      entities.find((id) => isNumericEntity(hass, id)) ||
      entities[0] ||
      entitiesFallback[0] ||
      Object.keys(hass.states)[0];

    const stateObj = hass.states[entity];
    const max = stateObj && isTimerEntity(entity)
      ? timerDurationSeconds(stateObj) || DEFAULT_MAX
      : DEFAULT_MAX;

    return {
      type: `custom:${CIRCLE_GAUGE_CARD_NAME}`,
      entity,
      min: DEFAULT_MIN,
      max,
    };
  }

  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: CircleGaugeCardConfig;

  @state() private _gaugeReady = false;

  @state() private _tick = 0;

  private _timerInterval?: number;

  private _rescaleOnConnect = false;

  public setConfig(config: CircleGaugeCardConfig): void {
    this._config = {
      min: DEFAULT_MIN,
      max: DEFAULT_MAX,
      ...config,
    };
  }

  public getCardSize(): number {
    return 4;
  }

  public getGridOptions(): LovelaceGridOptions {
    return { columns: 6, rows: 3 };
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._syncTimerInterval();
    if (this._rescaleOnConnect) {
      requestAnimationFrame(() => {
        this._rescaleTextSvg();
        this._rescaleOnConnect = false;
      });
    }
  }

  disconnectedCallback(): void {
    this._clearTimerInterval();
    super.disconnectedCallback();
  }

  protected firstUpdated(): void {
    requestAnimationFrame(() => {
      this._gaugeReady = true;
      this._rescaleTextSvg();
    });
  }

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has("hass") || changed.has("_config")) {
      this._syncTimerInterval();
    }

    if (
      changed.has("hass") ||
      changed.has("_config") ||
      changed.has("_tick") ||
      changed.has("_gaugeReady")
    ) {
      requestAnimationFrame(() => this._rescaleTextSvg());
    }
  }

  private _range(): { min: number; max: number } {
    const min = this._config?.min ?? DEFAULT_MIN;
    const max = this._config?.max ?? DEFAULT_MAX;
    return { min, max };
  }

  private _clearTimerInterval(): void {
    if (this._timerInterval !== undefined) {
      clearInterval(this._timerInterval);
      this._timerInterval = undefined;
    }
  }

  private _syncTimerInterval(): void {
    this._clearTimerInterval();

    const entity = this._config?.entity;
    const stateObj = entity ? this.hass?.states[entity] : undefined;

    if (stateObj && isTimerEntity(entity) && stateObj.state === "active") {
      this._timerInterval = window.setInterval(() => {
        this._tick += 1;
      }, 1000);
    }
  }

  private _reading(): {
    value: number;
    valueText: string;
    unit: string;
  } {
    void this._tick;

    const entity = this._config?.entity;
    const stateObj = entity ? this.hass?.states[entity] : undefined;
    const { min, max } = this._range();

    if (!stateObj) {
      return { value: min, valueText: "—", unit: "" };
    }

    if (isTimerEntity(entity)) {
      const duration = timerDurationSeconds(stateObj);
      const remaining = timerRemainingSeconds(stateObj);
      const timerMax = max > min ? max : duration || max;
      const value = remaining ?? (stateObj.state === "idle" ? timerMax : min);

      return {
        value,
        valueText: formatTimerText(
          stateObj,
          remaining ?? duration,
          this.hass?.locale
        ),
        unit: "",
      };
    }

    const parsed = parseNumericState(stateObj.state);
    const value = parsed ?? min;

    if (this.hass?.formatEntityStateToParts) {
      const parts = this.hass.formatEntityStateToParts(stateObj);
      return {
        value,
        valueText:
          parts.find((part) => part.type === "value")?.value ??
          (parsed !== undefined ? String(parsed) : "—"),
        unit: parts.find((part) => part.type === "unit")?.value ?? "",
      };
    }

    const unit = String(stateObj.attributes.unit_of_measurement ?? "");

    return {
      value,
      valueText: parsed !== undefined ? String(parsed) : "—",
      unit,
    };
  }

  private _rescaleTextSvg(): void {
    if (!this.isConnected) {
      this._rescaleOnConnect = true;
      return;
    }

    const svgRoot = this.shadowRoot?.querySelector(".text");
    const group = svgRoot?.querySelector(".text-group");
    if (!svgRoot || !group) {
      return;
    }

    const box = group.getBBox();
    if (box.width === 0 && box.height === 0) {
      return;
    }

    svgRoot.setAttribute(
      "viewBox",
      `${box.x} ${box.y} ${box.width} ${box.height}`
    );
  }

  private _renderGauge(
    value: number,
    valueText: string,
    unit: string,
    gaugeColor: string,
    trackColor: string
  ) {
    const { min, max } = this._range();
    const entity = this._config?.entity;
    const stateObj = entity ? this.hass?.states[entity] : undefined;
    const timerMax =
      stateObj && isTimerEntity(entity)
        ? timerDurationSeconds(stateObj)
        : max;
    const gaugeMax =
      isTimerEntity(entity) && timerMax > min ? timerMax : max;
    const fraction = normalizeValue(value, min, gaugeMax);
    const displayFraction = this._config?.reverse ? 1 - fraction : fraction;
    const strokeOffset = this._gaugeReady
      ? CIRCUMFERENCE * (1 - displayFraction)
      : this._config?.reverse
        ? 0
        : CIRCUMFERENCE;

    return svg`
      <svg viewBox="-50 -50 100 100" class="gauge">
        <circle class="track" cx="0" cy="0" r=${RADIUS} stroke=${trackColor} />
        <circle
          class="value"
          cx="0"
          cy="0"
          r=${RADIUS}
          stroke=${gaugeColor}
          stroke-dasharray=${CIRCUMFERENCE}
          style=${styleMap({ strokeDashoffset: `${strokeOffset}` })}
          transform="rotate(-90)"
        />
      </svg>
      <svg class="text">
        <g class="text-group">
          <text
            class="value-text"
            x="0"
            y=${unit ? -4 : 0}
            dominant-baseline="middle"
            text-anchor="middle"
          >
            ${valueText}
          </text>
          ${unit
            ? svg`<text
                class="unit-text"
                x="0"
                y="12"
                dominant-baseline="middle"
                text-anchor="middle"
              >
                ${unit}
              </text>`
            : nothing}
        </g>
      </svg>
    `;
  }

  protected render() {
    if (!this._config || !this.hass) {
      return nothing;
    }

    const entity = this._config.entity;
    const stateObj = entity ? this.hass.states[entity] : undefined;
    const { value, valueText, unit } = this._reading();
    const gaugeColor = resolveGaugeColor(this._config.color, this);
    const trackColor = resolveTrackColor(this._config.track_color, this);

    const primary =
      this._config.name ||
      stateObj?.attributes.friendly_name ||
      "Circle Gauge";

    return html`
      <ha-card>
        <div class="body">
          <div class="gauge-wrap">
            ${this._renderGauge(value, valueText, unit, gaugeColor, trackColor)}
          </div>
          <p class="title">${primary}</p>
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

    .body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: var(--ha-space-3, 12px);
      box-sizing: border-box;
    }

    .gauge-wrap {
      position: relative;
      width: 100%;
      max-width: var(--nv-gauge-max-size);
      aspect-ratio: 1;
    }

    .gauge {
      width: 100%;
      height: 100%;
      display: block;
    }

    .text {
      position: absolute;
      max-height: 45%;
      max-width: 55%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
    }

    .track {
      fill: none;
      stroke-width: 10;
    }

    .value {
      fill: none;
      stroke-width: 10;
      stroke-linecap: round;
      transition: stroke-dashoffset 1s ease;
    }

    .value-text {
      font-size: 16px;
      font-weight: 500;
      fill: var(--primary-text-color);
    }

    .unit-text {
      font-size: 11px;
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
    [CIRCLE_GAUGE_CARD_NAME]: NvisionCircleGaugeCard;
  }
}
