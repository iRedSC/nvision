import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardEditor,
  LovelaceGridOptions,
} from "../../types";
import {
  levelGradientColor,
  temperatureGradientColor,
} from "../../utils/colors";
import { registerCustomCard } from "../../utils/custom-cards";
import { formatStateWithUnit } from "../../utils/entity-state";
import {
  buildHeatMapGrid,
  normalizeLevel,
  PERIOD_HOURS,
  resolveAxes,
  type HeatMapGrid,
} from "../../utils/heat-map-buckets";
import {
  defaultAggregate,
  loadHistoryPoints,
} from "../../utils/history-data";
import { handleLovelaceAction } from "../../utils/lovelace-actions";
import { responsiveTypeStyles } from "../../utils/responsive-type";
import type { ColorMode, HeatMapCardConfig } from "./heat-map-card-config";
import {
  DEFAULT_COLOR_MODE,
  DEFAULT_PERIOD,
  DEFAULT_PRESET,
  HEAT_MAP_CARD_EDITOR_NAME,
  HEAT_MAP_CARD_NAME,
} from "./const";

registerCustomCard({
  type: HEAT_MAP_CARD_NAME,
  name: "Nvision Heat Map",
  description: "Temporal heat map for sensor history and patterns",
});

interface ActiveTooltip {
  y: number;
  x: number;
  label: string;
  value: string;
  count: number;
}

function resolveHeatColor(
  host: HTMLElement,
  level: number,
  mode: ColorMode
): string {
  if (mode === "semantic") {
    return levelGradientColor(host, level);
  }
  if (mode === "temperature") {
    return temperatureGradientColor(host, level);
  }
  return "var(--primary-color)";
}

function formatCellValue(
  value: number | null,
  aggregate: HeatMapCardConfig["aggregate"],
  unit: string
): string {
  if (value === null) {
    return "—";
  }
  const rounded =
    aggregate === "count"
      ? String(Math.round(value))
      : Number.isInteger(value)
        ? String(value)
        : value.toFixed(1);
  return unit ? `${rounded} ${unit}` : rounded;
}

function firstWeekday(_hass: HomeAssistant): number {
  return 1;
}

@customElement(HEAT_MAP_CARD_NAME)
export class NvisionHeatMapCard extends LitElement implements LovelaceCard {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("./heat-map-card-editor");
    return document.createElement(
      HEAT_MAP_CARD_EDITOR_NAME
    ) as LovelaceCardEditor;
  }

  public static getStubConfig(
    hass: HomeAssistant,
    entities: string[],
    entitiesFallback: string[]
  ): HeatMapCardConfig {
    const entity =
      entities.find((id) => {
        const state = hass.states[id];
        return (
          id.startsWith("sensor.") ||
          id.startsWith("binary_sensor.") ||
          Number.isFinite(Number(state?.state))
        );
      }) ||
      entities[0] ||
      entitiesFallback[0] ||
      Object.keys(hass.states)[0];

    return {
      type: `custom:${HEAT_MAP_CARD_NAME}`,
      entity,
      preset: DEFAULT_PRESET,
      period: DEFAULT_PERIOD,
      aggregate: defaultAggregate(entity),
      color_mode: DEFAULT_COLOR_MODE,
      show_axis_labels: true,
      show_legend: true,
      show_current: true,
    };
  }

  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: HeatMapCardConfig;

  @state() private _grid?: HeatMapGrid;

  @state() private _loading = false;

  @state() private _error?: string;

  @state() private _tooltip?: ActiveTooltip;

  private _fetchVersion = 0;

  public setConfig(config: HeatMapCardConfig): void {
    this._config = {
      preset: DEFAULT_PRESET,
      period: DEFAULT_PERIOD,
      color_mode: DEFAULT_COLOR_MODE,
      show_axis_labels: true,
      show_legend: true,
      show_current: true,
      tap_action: { action: "more-info" },
      hold_action: { action: "more-info" },
      ...config,
      aggregate: config.aggregate ?? defaultAggregate(config.entity),
    };
  }

  public getCardSize(): number {
    const rows = this._grid?.yLabels.length ?? 4;
    return Math.max(3, Math.min(8, Math.ceil(rows * 0.75) + 2));
  }

  public getGridOptions(): LovelaceGridOptions {
    const rows = this._grid?.yLabels.length ?? 4;
    return {
      columns: 6,
      rows: Math.max(3, Math.min(8, Math.ceil(rows * 0.75) + 2)),
      min_rows: 3,
    };
  }

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has("_config") || changed.has("hass")) {
      void this._loadData();
    }
  }

  private async _loadData(): Promise<void> {
    const config = this._config;
    const hass = this.hass;
    const entity = config?.entity;

    if (!config || !hass || !entity) {
      this._grid = undefined;
      this._error = undefined;
      return;
    }

    if (!hass.callWS) {
      this._error = "History unavailable";
      this._grid = undefined;
      return;
    }

    const fetchVersion = ++this._fetchVersion;
    this._loading = true;
    this._error = undefined;

    try {
      const axes = resolveAxes(
        config.preset,
        config.x_axis,
        config.y_axis,
        config.period
      );
      const aggregate = config.aggregate ?? defaultAggregate(entity);
      const points = await loadHistoryPoints(
        hass,
        entity,
        PERIOD_HOURS[axes.period],
        aggregate
      );

      if (fetchVersion !== this._fetchVersion) {
        return;
      }

      this._grid = buildHeatMapGrid(
        points,
        axes.x,
        axes.y,
        axes.period,
        aggregate,
        hass.config.time_zone,
        firstWeekday(hass),
        config.min,
        config.max
      );
    } catch {
      if (fetchVersion !== this._fetchVersion) {
        return;
      }
      this._error = "Could not load history";
      this._grid = undefined;
    } finally {
      if (fetchVersion === this._fetchVersion) {
        this._loading = false;
      }
    }
  }

  private _handleCardAction(action: "tap" | "hold"): void {
    if (!this.hass || !this._config) {
      return;
    }
    handleLovelaceAction(this, this.hass, this._config, action);
  }

  private _handleHeaderClick(ev: Event): void {
    ev.stopPropagation();
    this._handleCardAction("tap");
  }

  private _handleCardClick(): void {
    this._tooltip = undefined;
    this._handleCardAction("tap");
  }

  private _handleCellClick(
    ev: Event,
    y: number,
    x: number,
    cell: HeatMapGrid["cells"][number][number]
  ): void {
    ev.stopPropagation();
    const config = this._config;
    const stateObj = config?.entity ? this.hass?.states[config.entity] : undefined;
    const unit = String(stateObj?.attributes.unit_of_measurement ?? "");
    const value = formatCellValue(
      cell.value,
      config?.aggregate,
      config?.aggregate === "count" ? "" : unit
    );

    if (this._tooltip?.x === x && this._tooltip?.y === y) {
      this._tooltip = undefined;
      return;
    }

    this._tooltip = {
      x,
      y,
      label: cell.rangeLabel,
      value,
      count: cell.count,
    };
  }

  private _renderLegend(mode: ColorMode) {
    const stops = [0, 0.5, 1];
    return html`
      <div class="legend" aria-hidden="true">
        ${stops.map((stop) => {
          const color = resolveHeatColor(this, stop, mode);
          return html`
            <span
              class="legend-stop"
              style=${styleMap({
                background: `color-mix(in srgb, ${color} 85%, var(--card-background-color))`,
              })}
            ></span>
          `;
        })}
      </div>
    `;
  }

  private _renderGrid(grid: HeatMapGrid) {
    const config = this._config!;
    const mode = config.color_mode ?? DEFAULT_COLOR_MODE;
    const showLabels = config.show_axis_labels !== false;
    const stateObj = config.entity ? this.hass?.states[config.entity] : undefined;
    const unit = String(stateObj?.attributes.unit_of_measurement ?? "");
    const colOffset = showLabels ? 2 : 1;
    const rowOffset = showLabels ? 2 : 1;

    return html`
      <div class="grid-wrap">
        <div
          class="grid"
          style=${styleMap({
            gridTemplateColumns: showLabels
              ? `auto repeat(${grid.xLabels.length}, minmax(0, 1fr))`
              : `repeat(${grid.xLabels.length}, minmax(0, 1fr))`,
            gridTemplateRows: showLabels
              ? `auto repeat(${grid.yLabels.length}, minmax(12px, 1fr))`
              : `repeat(${grid.yLabels.length}, minmax(12px, 1fr))`,
          })}
        >
          ${showLabels ? html`<div class="corner"></div>` : nothing}
          ${showLabels
            ? grid.xLabels.map(
                (label, x) => html`
                  <div
                    class="axis x"
                    style=${styleMap({
                      gridColumn: String(x + 2),
                      gridRow: "1",
                    })}
                  >
                    ${label}
                  </div>
                `
              )
            : nothing}
          ${grid.cells.flatMap((row, y) => {
            const yLabel = showLabels
              ? html`
                  <div
                    class="axis y"
                    style=${styleMap({
                      gridColumn: "1",
                      gridRow: String(y + rowOffset),
                    })}
                  >
                    ${grid.yLabels[y]}
                  </div>
                `
              : nothing;

            const cells = row.map((cell, x) => {
              const level = normalizeLevel(cell.value, grid.min, grid.max);
              const color = resolveHeatColor(this, level, mode);
              const active =
                this._tooltip?.x === x && this._tooltip?.y === y;
              return html`
                <button
                  type="button"
                  class=${classMap({
                    cell: true,
                    active,
                    empty: cell.value === null,
                  })}
                  style=${styleMap({
                    gridColumn: String(x + colOffset),
                    gridRow: String(y + rowOffset),
                    background:
                      cell.value === null
                        ? "var(--state-inactive-color, var(--divider-color))"
                        : `color-mix(in srgb, ${color} calc(${Math.max(
                            level,
                            0.08
                          )} * 85%), var(--card-background-color))`,
                  })}
                  title=${formatCellValue(
                    cell.value,
                    config.aggregate,
                    config.aggregate === "count" ? "" : unit
                  )}
                  @click=${(ev: Event) => this._handleCellClick(ev, y, x, cell)}
                ></button>
              `;
            });

            return [yLabel, ...cells];
          })}
        </div>
        ${this._tooltip
          ? html`
              <div class="tooltip" role="status">
                <div class="tooltip-label">${this._tooltip.label}</div>
                <div class="tooltip-value">${this._tooltip.value}</div>
                <div class="tooltip-meta">
                  ${this._tooltip.count} sample${this._tooltip.count === 1 ? "" : "s"}
                </div>
              </div>
            `
          : nothing}
      </div>
    `;
  }

  protected render() {
    if (!this._config || !this.hass) {
      return nothing;
    }

    const stateObj = this._config.entity
      ? this.hass.states[this._config.entity]
      : undefined;
    const primary =
      this._config.name ||
      stateObj?.attributes.friendly_name ||
      this._config.entity ||
      "Heat Map";
    const secondary =
      this._config.show_current !== false
        ? formatStateWithUnit(stateObj)
        : "";

    return html`
      <ha-card @click=${this._handleCardClick}>
        <div class="stage">
          <div class="header" @click=${this._handleHeaderClick}>
            ${stateObj
              ? html`<ha-state-icon
                  .hass=${this.hass}
                  .stateObj=${stateObj}
                ></ha-state-icon>`
              : nothing}
            <ha-tile-info
              .primary=${primary}
              .secondary=${secondary}
            ></ha-tile-info>
          </div>

          ${this._loading
            ? html`<div class="status">Loading…</div>`
            : this._error
              ? html`<div class="status error">${this._error}</div>`
              : this._grid
                ? this._renderGrid(this._grid)
                : html`<div class="status">No data</div>`}

          ${this._config.show_legend !== false && this._grid
            ? this._renderLegend(this._config.color_mode ?? DEFAULT_COLOR_MODE)
            : nothing}
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
      cursor: pointer;
    }

    .stage {
      display: flex;
      flex-direction: column;
      gap: 8px;
      height: 100%;
      min-height: 120px;
      padding: var(--ha-space-3, 12px);
      box-sizing: border-box;
    }

    .header {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
      cursor: pointer;
    }

    ha-state-icon {
      flex: none;
      color: var(--primary-text-color);
      --mdc-icon-size: var(--nv-icon-size);
    }

    ha-tile-info {
      min-width: 0;
      flex: 1;
      --ha-tile-info-primary-font-size: var(--nv-title-font-size);
      --ha-tile-info-primary-font-weight: var(--ha-font-weight-medium, 500);
      --ha-tile-info-secondary-font-size: var(--nv-label-font-size);
      --ha-tile-info-secondary-color: var(--secondary-text-color);
    }

    .status {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--secondary-text-color);
      font-size: var(--nv-label-font-size);
    }

    .status.error {
      color: var(--error-color);
    }

    .grid-wrap {
      position: relative;
      flex: 1;
      min-height: 0;
      display: flex;
      flex-direction: column;
    }

    .grid {
      flex: 1;
      min-height: 0;
      display: grid;
      gap: 2px;
    }

    .corner {
      min-width: 0;
    }

    .axis {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      color: var(--secondary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0 2px;
    }

    .axis.y {
      justify-content: flex-end;
      padding-right: 4px;
    }

    .cell {
      border: none;
      border-radius: 3px;
      min-height: 12px;
      padding: 0;
      cursor: pointer;
      background: var(--state-inactive-color, var(--divider-color));
      opacity: 0.95;
    }

    .cell.empty {
      opacity: 0.35;
    }

    .cell.active {
      outline: 2px solid var(--primary-color);
      outline-offset: -1px;
    }

    .tooltip {
      margin-top: 8px;
      padding: 8px 10px;
      border-radius: var(--ha-card-border-radius, 12px);
      background: var(--secondary-background-color, var(--card-background-color));
      border: 1px solid var(--divider-color);
      color: var(--primary-text-color);
      font-size: var(--nv-label-font-size);
    }

    .tooltip-label {
      color: var(--secondary-text-color);
      margin-bottom: 2px;
    }

    .tooltip-value {
      font-size: var(--nv-value-font-size);
      font-weight: var(--ha-font-weight-medium, 500);
    }

    .tooltip-meta {
      margin-top: 2px;
      color: var(--secondary-text-color);
    }

    .legend {
      display: flex;
      gap: 4px;
      justify-content: flex-end;
    }

    .legend-stop {
      width: 28px;
      height: 6px;
      border-radius: 999px;
    }
  `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [HEAT_MAP_CARD_NAME]: NvisionHeatMapCard;
  }
}
