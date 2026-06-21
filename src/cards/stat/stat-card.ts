import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
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
import { formatStateWithUnit } from "../../utils/entity-state";
import { resolveCallWS } from "../../utils/history-data";
import { parseNumericState } from "../../utils/power-lightning";
import {
  responsiveStateIconStyles,
  responsiveTypeStyles,
} from "../../utils/responsive-type";
import {
  DEFAULT_TREND_PERIOD,
  STAT_CARD_EDITOR_NAME,
  STAT_CARD_NAME,
  trendPeriodLabel,
} from "./const";
import type { StatCardConfig } from "./stat-card-config";
import {
  buildTrendDisplay,
  computeTrendResult,
  formatComparedValue,
  loadPastValue,
  readTrendFromEntity,
  resolveAggregate,
  type TrendColorTone,
  type TrendDirection,
} from "./stat-trend";

registerCustomCard({
  type: STAT_CARD_NAME,
  name: "Nvision Stat",
  description: "Numeric value with a colored trend percentage",
});

const TREND_ICONS: Record<TrendDirection, string> = {
  up: "mdi:arrow-up",
  down: "mdi:arrow-down",
  flat: "mdi:minus",
};

@customElement(STAT_CARD_NAME)
export class NvisionStatCard extends LitElement implements LovelaceCard {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("./stat-card-editor");
    return document.createElement(STAT_CARD_EDITOR_NAME) as LovelaceCardEditor;
  }

  public static getStubConfig(
    hass: HomeAssistant,
    entities: string[],
    entitiesFallback: string[]
  ): StatCardConfig {
    const pool = [...entities, ...entitiesFallback, ...Object.keys(hass.states)];

    for (const entityId of pool) {
      if (parseNumericState(hass.states[entityId]?.state) !== undefined) {
        return {
          type: `custom:${STAT_CARD_NAME}`,
          entity: entityId,
          trend_period: DEFAULT_TREND_PERIOD,
        };
      }
    }

    return {
      type: `custom:${STAT_CARD_NAME}`,
      entity: pool[0] ?? "sensor.temperature",
      trend_period: DEFAULT_TREND_PERIOD,
    };
  }

  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: StatCardConfig;

  @state() private _pastValue?: number;

  private _loadKey?: string;

  private _fetchVersion = 0;

  private _actions = new ActionHandlers(
    () => this,
    () => this.hass,
    () => this._config
  );

  public setConfig(config: StatCardConfig): void {
    this._config = {
      show_icon: true,
      trend_period: DEFAULT_TREND_PERIOD,
      ...moreInfoInteractions(),
      ...config,
    };
  }

  public getCardSize(): number {
    return 1;
  }

  public getGridOptions(): LovelaceGridOptions {
    return { columns: 6, rows: 1 };
  }

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has("_config") || changed.has("hass")) {
      const loadKey = this._computeLoadKey();
      if (loadKey !== this._loadKey) {
        this._loadKey = loadKey;
        void this._loadPastValue();
      }
    }
  }

  private _computeLoadKey(): string | undefined {
    const config = this._config;
    if (!config?.entity || config.trend_entity) {
      return config?.trend_entity ? "external" : undefined;
    }

    return `${config.entity}:${config.trend_period ?? DEFAULT_TREND_PERIOD}`;
  }

  private async _loadPastValue(): Promise<void> {
    const config = this._config;
    const hass = this.hass;

    if (!config?.entity || config.trend_entity) {
      this._pastValue = undefined;
      return;
    }

    if (!hass) {
      return;
    }

    try {
      resolveCallWS(hass);
    } catch {
      this._pastValue = undefined;
      return;
    }

    const fetchVersion = ++this._fetchVersion;
    const periodHours = config.trend_period ?? DEFAULT_TREND_PERIOD;
    const aggregate = resolveAggregate(hass, config.entity);

    try {
      const past = await loadPastValue(
        hass,
        config.entity,
        periodHours,
        aggregate
      );

      if (fetchVersion !== this._fetchVersion) {
        return;
      }

      this._pastValue = past;
    } catch {
      if (fetchVersion !== this._fetchVersion) {
        return;
      }
      this._pastValue = undefined;
    }
  }

  private _trendColor(tone: TrendColorTone): string {
    if (tone === "flat") {
      return "var(--secondary-text-color)";
    }
    if (tone === "positive") {
      return "var(--success-color)";
    }
    return "var(--error-color)";
  }

  protected render() {
    if (!this._config || !this.hass) {
      return nothing;
    }

    const stateObj = this.hass.states[this._config.entity];
    const current = parseNumericState(stateObj?.state);
    const primary =
      this._config.name ||
      stateObj?.attributes.friendly_name ||
      "Stat";

    const valueText = formatStateWithUnit(stateObj);

    const trendResult = this._config.trend_entity
      ? readTrendFromEntity(this.hass, this._config.trend_entity)
      : computeTrendResult(current, this._pastValue);

    const trend = buildTrendDisplay(
      trendResult,
      this._config.invert_colors === true
    );
    const trendColor = this._trendColor(trend.colorTone);
    const showTrend = trend.text !== "—";
    const usingHistoryTrend = !this._config.trend_entity;
    const compareValue =
      usingHistoryTrend && this._pastValue !== undefined
        ? formatComparedValue(this.hass, this._pastValue, stateObj)
        : undefined;
    const comparePeriod = usingHistoryTrend
      ? trendPeriodLabel(this._config.trend_period ?? DEFAULT_TREND_PERIOD)
      : undefined;
    const showCompare = compareValue !== undefined && compareValue !== "—";

    return html`
      <ha-card>
        <div
          class="content"
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
          ${this._config.show_icon !== false && stateObj
            ? html`<ha-state-icon
                .hass=${this.hass}
                .stateObj=${stateObj}
              ></ha-state-icon>`
            : nothing}
          <div class="info">
            <div class="label">${primary}</div>
            <div class="value-row">
              <span class="value">${valueText}</span>
              ${showTrend
                ? html`
                    <span
                      class="trend trend-${trend.direction}"
                      style=${styleMap({ "--trend-color": trendColor })}
                    >
                      <ha-icon icon=${TREND_ICONS[trend.direction]}></ha-icon>
                      ${trend.text}
                    </span>
                  `
                : nothing}
            </div>
            ${showCompare
              ? html`
                  <div class="compare-row">
                    <span class="compare-value">${compareValue}</span>
                    <span class="compare-sep">·</span>
                    <span class="compare-period">${comparePeriod}</span>
                  </div>
                `
              : nothing}
          </div>
        </div>
      </ha-card>
    `;
  }

  static styles = [
    responsiveTypeStyles,
    responsiveStateIconStyles,
    css`
      :host {
        --tile-color: var(--state-inactive-color);
        --nv-stat-value-font-size: var(--ha-font-size-xl);
        --nv-stat-trend-font-size: var(--ha-font-size-l);
        display: block;
        height: 100%;
      }

      ha-card {
        height: 100%;
      }

      .content {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        box-sizing: border-box;
        height: 100%;
        min-height: 64px;
        cursor: pointer;
      }

      ha-state-icon {
        flex: none;
        color: var(--primary-text-color);
      }

      .info {
        min-width: 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .label {
        font-size: var(--nv-label-font-size);
        color: var(--secondary-text-color);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .value-row {
        display: flex;
        align-items: baseline;
        flex-wrap: wrap;
        gap: 6px;
        min-width: 0;
      }

      .value {
        font-size: var(--nv-stat-value-font-size);
        font-weight: var(--ha-font-weight-medium, 500);
        color: var(--primary-text-color);
        line-height: 1.2;
      }

      .trend {
        display: inline-flex;
        align-items: center;
        gap: 2px;
        font-size: var(--nv-stat-trend-font-size);
        font-weight: var(--ha-font-weight-medium, 500);
        color: var(--trend-color);
        background: color-mix(in srgb, var(--trend-color) 12%, transparent);
        border-radius: var(--ha-border-radius-sm, 4px);
        padding: 2px 8px 2px 5px;
        line-height: 1.2;
        white-space: nowrap;
      }

      .trend ha-icon {
        --mdc-icon-size: 18px;
        flex: none;
      }

      .compare-row {
        display: flex;
        align-items: baseline;
        flex-wrap: wrap;
        gap: 4px;
        min-width: 0;
        font-size: var(--ha-font-size-xs, 0.75rem);
        line-height: 1.2;
        color: var(--secondary-text-color);
        opacity: 0.65;
      }

      .compare-value {
        font-weight: var(--ha-font-weight-medium, 500);
      }

      .compare-sep {
        opacity: 0.8;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [STAT_CARD_NAME]: NvisionStatCard;
  }
}
