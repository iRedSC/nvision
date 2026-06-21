import { css, html, LitElement, nothing } from "lit";
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
import { readCssColor, resolveThemeColor } from "../../utils/colors";
import { formatStateWithUnit } from "../../utils/entity-state";
import {
  loadHistoryPoints,
  resolveCallWS,
  type HistoryPoint,
} from "../../utils/history-data";
import { parseNumericState } from "../../utils/power-lightning";
import {
  responsiveStateIconStyles,
  responsiveTypeStyles,
} from "../../utils/responsive-type";
import {
  DEFAULT_GRAPH_HEIGHT,
  DEFAULT_GRAPH_STYLE,
  DEFAULT_TREND_PERIOD,
  STAT_CARD_EDITOR_NAME,
  STAT_CARD_NAME,
  trendPeriodLabel,
} from "./const";
import type { GraphStyle, StatCardConfig } from "./stat-card-config";
import { drawStatGraph } from "./stat-graph";
import {
  buildTrendDisplay,
  computeTrendResult,
  formatComparedValue,
  readTrendFromEntity,
  resolveAggregate,
  type TrendColorTone,
  type TrendDirection,
} from "./stat-trend";

registerCustomCard({
  type: STAT_CARD_NAME,
  name: "Nvision Stat",
  description: "Sensor-style value, trend, and history graph",
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
          graph: DEFAULT_GRAPH_STYLE,
          graph_height: DEFAULT_GRAPH_HEIGHT,
        };
      }
    }

    return {
      type: `custom:${STAT_CARD_NAME}`,
      entity: pool[0] ?? "sensor.temperature",
      trend_period: DEFAULT_TREND_PERIOD,
      graph: DEFAULT_GRAPH_STYLE,
      graph_height: DEFAULT_GRAPH_HEIGHT,
    };
  }

  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: StatCardConfig;

  @state() private _historyPoints: HistoryPoint[] = [];

  @query("canvas") private _canvas?: HTMLCanvasElement;

  private _loadKey?: string;

  private _fetchVersion = 0;

  private _resizeObserver?: ResizeObserver;

  private _observedWrap?: Element;

  private _drawFrame = 0;

  private _actions = new ActionHandlers(
    () => this,
    () => this.hass,
    () => this._config
  );

  public setConfig(config: StatCardConfig): void {
    this._config = {
      show_icon: true,
      trend_period: DEFAULT_TREND_PERIOD,
      graph: DEFAULT_GRAPH_STYLE,
      graph_height: DEFAULT_GRAPH_HEIGHT,
      smoothing: true,
      ...moreInfoInteractions(),
      ...config,
    };
  }

  public getCardSize(): number {
    const graph = this._config?.graph ?? DEFAULT_GRAPH_STYLE;
    return graph === "none" ? 1 : 2;
  }

  public getGridOptions(): LovelaceGridOptions {
    const graph = this._config?.graph ?? DEFAULT_GRAPH_STYLE;
    if (graph === "none") {
      return { columns: 6, rows: 1 };
    }

    return {
      columns: 6,
      rows: 2,
      min_rows: 2,
    };
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._resizeObserver = new ResizeObserver(() => this._scheduleDraw());
  }

  disconnectedCallback(): void {
    this._resizeObserver?.disconnect();
    cancelAnimationFrame(this._drawFrame);
    super.disconnectedCallback();
  }

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has("_config") || changed.has("hass")) {
      const loadKey = this._computeLoadKey();
      if (loadKey !== this._loadKey) {
        this._loadKey = loadKey;
        void this._loadHistory();
      }
    }

    if (
      changed.has("_historyPoints") ||
      changed.has("_config") ||
      changed.has("hass")
    ) {
      this._observeGraphWrap();
      this._scheduleDraw();
    }
  }

  private _observeGraphWrap(): void {
    const wrap = this.shadowRoot?.querySelector(".graph-wrap");
    if (!wrap || !this._resizeObserver || wrap === this._observedWrap) {
      return;
    }

    if (this._observedWrap) {
      this._resizeObserver.unobserve(this._observedWrap);
    }

    this._observedWrap = wrap;
    this._resizeObserver.observe(wrap);
  }

  private _computeLoadKey(): string | undefined {
    const config = this._config;
    if (!config?.entity) {
      return undefined;
    }

    const graphPeriod =
      config.graph_period ?? config.trend_period ?? DEFAULT_TREND_PERIOD;
    const trendPeriod = config.trend_period ?? DEFAULT_TREND_PERIOD;

    return `${config.entity}:${graphPeriod}:${trendPeriod}:${config.graph ?? DEFAULT_GRAPH_STYLE}`;
  }

  private _resolveGraphPeriod(): number {
    return (
      this._config?.graph_period ??
      this._config?.trend_period ??
      DEFAULT_TREND_PERIOD
    );
  }

  private _resolveTrendPeriod(): number {
    return this._config?.trend_period ?? DEFAULT_TREND_PERIOD;
  }

  private _pastValueForTrend(): number | undefined {
    if (!this._historyPoints.length) {
      return undefined;
    }

    const trendPeriodHours = this._resolveTrendPeriod();
    const graphPeriodHours = this._resolveGraphPeriod();
    const sorted = [...this._historyPoints].sort((a, b) => a.time - b.time);

    if (trendPeriodHours <= graphPeriodHours) {
      return sorted[0]?.value;
    }

    const cutoff = Date.now() - trendPeriodHours * 60 * 60 * 1000;
    return sorted.find((point) => point.time >= cutoff)?.value ?? sorted[0]?.value;
  }

  private async _loadHistory(): Promise<void> {
    const config = this._config;
    const hass = this.hass;

    if (!config?.entity) {
      this._historyPoints = [];
      return;
    }

    if (!hass) {
      return;
    }

    try {
      resolveCallWS(hass);
    } catch {
      this._historyPoints = [];
      return;
    }

    const fetchVersion = ++this._fetchVersion;
    const periodHours = Math.max(
      this._resolveGraphPeriod(),
      this._resolveTrendPeriod()
    );
    const aggregate = resolveAggregate(hass, config.entity);

    try {
      const points = await loadHistoryPoints(
        hass,
        config.entity,
        periodHours,
        aggregate
      );

      if (fetchVersion !== this._fetchVersion) {
        return;
      }

      this._historyPoints = points;
    } catch {
      if (fetchVersion !== this._fetchVersion) {
        return;
      }
      this._historyPoints = [];
    }
  }

  private _scheduleDraw(): void {
    cancelAnimationFrame(this._drawFrame);
    this._drawFrame = requestAnimationFrame(() => this._drawGraph());
  }

  private _graphStyle(): GraphStyle {
    return this._config?.graph ?? DEFAULT_GRAPH_STYLE;
  }

  private _graphHeight(): number {
    return this._config?.graph_height ?? DEFAULT_GRAPH_HEIGHT;
  }

  private _showFill(): boolean {
    const style = this._graphStyle();
    if (style === "area") {
      return true;
    }
    if (style === "line") {
      return this._config?.show_fill === true;
    }
    return false;
  }

  private _drawGraph(): void {
    const canvas = this._canvas;
    const config = this._config;
    if (!canvas || !config || this._graphStyle() === "none") {
      return;
    }

    const graphPeriodMs = this._resolveGraphPeriod() * 60 * 60 * 1000;
    const cutoff = Date.now() - graphPeriodMs;
    const points = this._historyPoints.filter((point) => point.time >= cutoff);

    drawStatGraph(canvas, points, {
      style: this._graphStyle(),
      smoothing: config.smoothing !== false,
      showFill: this._showFill(),
      lineColor: resolveThemeColor(
        config.line_color,
        this,
        "--primary-color",
        readCssColor(this, "--primary-color", "#03a9f4")
      ),
    });
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
    const pastValue = this._config.trend_entity
      ? undefined
      : this._pastValueForTrend();

    const trendResult = this._config.trend_entity
      ? readTrendFromEntity(this.hass, this._config.trend_entity)
      : computeTrendResult(current, pastValue);

    const trend = buildTrendDisplay(
      trendResult,
      this._config.invert_colors === true
    );
    const trendColor = this._trendColor(trend.colorTone);
    const showTrend = trend.text !== "—";
    const usingHistoryTrend = !this._config.trend_entity;
    const compareValue =
      usingHistoryTrend && pastValue !== undefined
        ? formatComparedValue(this.hass, pastValue, stateObj)
        : undefined;
    const comparePeriod = usingHistoryTrend
      ? trendPeriodLabel(this._resolveTrendPeriod())
      : undefined;
    const showCompare = compareValue !== undefined && compareValue !== "—";
    const showGraph = this._graphStyle() !== "none";
    const graphHeight = this._graphHeight();

    return html`
      <ha-card>
        <div
          class="stage"
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
          <div class="header">
            <div class="identity">
              ${this._config.show_icon !== false && stateObj
                ? html`<ha-state-icon
                    .hass=${this.hass}
                    .stateObj=${stateObj}
                  ></ha-state-icon>`
                : nothing}
              <div class="identity-text">
                <div class="label">${primary}</div>
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
            <div class="metrics">
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
            </div>
          </div>
          ${showGraph
            ? html`
                <div
                  class="graph-wrap"
                  style=${styleMap({ height: `${graphHeight}px` })}
                >
                  <canvas aria-hidden="true"></canvas>
                </div>
              `
            : nothing}
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
        --nv-stat-scale: 1.2;
        --nv-stat-value-font-size: calc(
          var(--nv-value-font-size) * var(--nv-stat-scale)
        );
        --nv-stat-trend-font-size: calc(
          var(--nv-label-font-size) * var(--nv-stat-scale)
        );
        display: block;
        height: 100%;
      }

      ha-card {
        height: 100%;
      }

      .stage {
        display: flex;
        flex-direction: column;
        height: 100%;
        min-height: 72px;
        cursor: pointer;
      }

      .header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
        padding: 10px 12px 8px;
        box-sizing: border-box;
      }

      .identity {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        min-width: 0;
        flex: 1;
      }

      ha-state-icon {
        flex: none;
        color: var(--primary-text-color);
        margin-top: 1px;
      }

      .identity-text {
        min-width: 0;
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

      .metrics {
        flex: none;
        text-align: right;
      }

      .value-row {
        display: flex;
        align-items: baseline;
        justify-content: flex-end;
        flex-wrap: wrap;
        gap: 6px;
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
        --mdc-icon-size: 1em;
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

      .graph-wrap {
        flex: 1 1 auto;
        min-height: 40px;
        width: 100%;
        padding: 0 4px 6px;
        box-sizing: border-box;
      }

      canvas {
        display: block;
        width: 100%;
        height: 100%;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [STAT_CARD_NAME]: NvisionStatCard;
  }
}
