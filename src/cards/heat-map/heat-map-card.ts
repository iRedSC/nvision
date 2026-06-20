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
  customHeatColor,
  heatMapGradientCss,
  levelGradientColor,
  temperatureGradientColor,
  themeHeatColor,
} from "../../utils/colors";
import { registerCustomCard } from "../../utils/custom-cards";
import { formatStateWithUnit } from "../../utils/entity-state";
import {
  buildHeatMapGrid,
  normalizeLevel,
  PERIOD_HOURS,
  resolveAxes,
  resolveBucketAggregate,
  type HeatMapGrid,
} from "../../utils/heat-map-buckets";
import {
  defaultAggregate,
  formatHistoryError,
  loadHistoryPoints,
  resolveCallWS,
  type AggregateType,
} from "../../utils/history-data";
import { handleLovelaceAction } from "../../utils/lovelace-actions";
import { responsiveTypeStyles } from "../../utils/responsive-type";
import type { ColorMode, HeatMapCardConfig } from "./heat-map-card-config";
import {
  DEFAULT_COLOR_MODE,
  DEFAULT_PRESET,
  HEAT_MAP_CARD_EDITOR_NAME,
  HEAT_MAP_CARD_NAME,
} from "./const";

registerCustomCard({
  type: HEAT_MAP_CARD_NAME,
  name: "Nvision Heat Map",
  description: "Temporal heat map for sensor history and patterns",
});

interface ActivePopover {
  anchorX: number;
  anchorY: number;
  label: string;
  value: string;
  count: number;
}

function yieldToMain(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof requestIdleCallback === "function") {
      requestIdleCallback(() => resolve(), { timeout: 120 });
      return;
    }
    setTimeout(resolve, 0);
  });
}

function resolveColorMode(mode: ColorMode | undefined): ColorMode {
  if (!mode || mode === "primary") {
    return "theme";
  }
  return mode;
}

function resolveHeatColor(
  host: HTMLElement,
  level: number,
  mode: ColorMode,
  config: HeatMapCardConfig
): string {
  const resolved = resolveColorMode(mode);

  if (resolved === "semantic") {
    return levelGradientColor(host, level);
  }
  if (resolved === "temperature") {
    return temperatureGradientColor(host, level);
  }
  if (resolved === "custom") {
    return customHeatColor(host, level, config.color_low, config.color_high);
  }
  return themeHeatColor(host, level);
}

const EMPTY_CELL_COLOR = "rgba(0, 0, 0, 0.05)";

function isTimelineGrid(grid: HeatMapGrid): boolean {
  return grid.yKeys.length === 1 && grid.yKeys[0] === "";
}

function cellBackground(
  host: HTMLElement,
  level: number,
  mode: ColorMode,
  config: HeatMapCardConfig,
  hasValue: boolean
): string {
  if (!hasValue) {
    return EMPTY_CELL_COLOR;
  }

  const color = resolveHeatColor(host, level, mode, config);
  if (config.dim_low_values) {
    const mix = Math.max(level, 0.08) * 85;
    return `color-mix(in srgb, ${color} ${mix}%, var(--card-background-color))`;
  }

  const mix = Math.max(level * 100, 8);
  return `color-mix(in srgb, ${color} ${mix}%, var(--card-background-color))`;
}

function formatCellValue(
  value: number | null,
  aggregate: AggregateType,
  unit: string,
  compact = false
): string {
  if (value === null) {
    return "—";
  }

  const rounded =
    aggregate === "count"
      ? String(Math.round(value))
      : Number.isInteger(value)
        ? String(value)
        : compact
          ? value.toFixed(0)
          : value.toFixed(1);

  if (!unit || aggregate === "count") {
    return rounded;
  }

  return compact ? rounded : `${rounded} ${unit}`;
}

function formatLegendValue(
  value: number,
  aggregate: AggregateType,
  unit: string
): string {
  return formatCellValue(value, aggregate, unit, true);
}

function firstWeekday(_hass: HomeAssistant): number {
  return 1;
}

let axisMeasureContext: CanvasRenderingContext2D | null = null;

function measureAxisLabel(text: string, font: string): number {
  axisMeasureContext ??= document.createElement("canvas").getContext("2d");
  if (!axisMeasureContext) {
    return text.length * 6;
  }
  axisMeasureContext.font = font;
  return axisMeasureContext.measureText(text).width;
}

function computeVisibleXLabels(
  labels: string[],
  slotWidthPx: number,
  font: string,
  gap = 6
): boolean[] {
  if (slotWidthPx <= 0 || !labels.length) {
    return labels.map(() => true);
  }

  const visible = labels.map(() => false);
  let lastRight = -Infinity;

  for (let index = 0; index < labels.length; index++) {
    const text = labels[index];
    if (!text) {
      continue;
    }

    const width = measureAxisLabel(text, font);
    const center = (index + 0.5) * slotWidthPx;
    const left = center - width / 2;

    if (left >= lastRight + gap) {
      visible[index] = true;
      lastRight = center + width / 2;
    }
  }

  return visible;
}

function sameVisibility(a?: boolean[], b?: boolean[]): boolean {
  if (!a || !b || a.length !== b.length) {
    return false;
  }
  return a.every((value, index) => value === b[index]);
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
      color_mode: DEFAULT_COLOR_MODE,
      show_axis_labels: true,
      show_legend: true,
      show_current: true,
      show_cell_values: false,
      dim_low_values: false,
    };
  }

  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: HeatMapCardConfig;

  @state() private _grid?: HeatMapGrid;

  @state() private _loading = false;

  @state() private _error?: string;

  @state() private _popover?: ActivePopover;

  @state() private _xLabelVisible?: boolean[];

  private _fetchVersion = 0;

  private _loadKey?: string;

  private _measureFrame = 0;

  private _resizeObserver?: ResizeObserver;

  private _observedWrap?: Element;

  private _entityAttributes(): Record<string, unknown> | undefined {
    const entity = this._config?.entity;
    if (!entity || !this.hass) {
      return undefined;
    }
    return this.hass.states[entity]?.attributes as Record<string, unknown>;
  }

  private _resolveAggregate(axes: ReturnType<typeof resolveAxes>): AggregateType {
    const entity = this._config?.entity;
    const attributes = this._entityAttributes();
    return resolveBucketAggregate(
      axes.x,
      axes.y,
      defaultAggregate(entity, attributes),
      attributes
    );
  }

  private _computeLoadKey(): string {
    const config = this._config;
    if (!config?.entity) {
      return "";
    }

    const axes = resolveAxes(config.preset);
    const attributes = this._entityAttributes();

    return JSON.stringify({
      entity: config.entity,
      preset: config.preset,
      stateClass: attributes?.state_class,
      aggregate: resolveBucketAggregate(
        axes.x,
        axes.y,
        defaultAggregate(config.entity, attributes),
        attributes
      ),
      axes,
    });
  }

  public setConfig(config: HeatMapCardConfig): void {
    this._config = {
      preset: DEFAULT_PRESET,
      color_mode: DEFAULT_COLOR_MODE,
      show_axis_labels: true,
      show_legend: true,
      show_current: true,
      show_cell_values: false,
      dim_low_values: false,
      tap_action: { action: "more-info" },
      hold_action: { action: "more-info" },
      ...config,
      color_mode: resolveColorMode(config.color_mode),
    };
    this._loadKey = undefined;
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

  connectedCallback(): void {
    super.connectedCallback();
    this._resizeObserver = new ResizeObserver(() =>
      this._scheduleXLabelMeasure()
    );
  }

  disconnectedCallback(): void {
    this._resizeObserver?.disconnect();
    cancelAnimationFrame(this._measureFrame);
    super.disconnectedCallback();
  }

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has("_config") || changed.has("hass")) {
      const loadKey = this._computeLoadKey();
      if (loadKey && this.hass && loadKey !== this._loadKey) {
        this._loadKey = loadKey;
        void this._loadData();
      }
    }

    if (changed.has("_grid")) {
      this._xLabelVisible = undefined;
    }

    if (this._grid && this._config?.show_axis_labels !== false) {
      this._scheduleXLabelMeasure();
    }
  }

  private _scheduleXLabelMeasure(): void {
    cancelAnimationFrame(this._measureFrame);
    this._measureFrame = requestAnimationFrame(() =>
      this._updateXLabelVisibility()
    );
  }

  private _observeGridWrap(wrap: Element): void {
    if (!this._resizeObserver || wrap === this._observedWrap) {
      return;
    }

    if (this._observedWrap) {
      this._resizeObserver.unobserve(this._observedWrap);
    }

    this._observedWrap = wrap;
    this._resizeObserver.observe(wrap);
  }

  private _updateXLabelVisibility(): void {
    const grid = this._grid;
    const root = this.shadowRoot;
    if (!grid || !root || this._config?.show_axis_labels === false) {
      return;
    }

    const wrap = root.querySelector(".grid-wrap");
    const sampleCell =
      root.querySelector(".data-grid .cell") ??
      root.querySelector(".timeline-grid .cell");
    if (!wrap || !sampleCell) {
      return;
    }

    this._observeGridWrap(wrap);

    const cells = root.querySelectorAll(".data-grid .cell, .timeline-grid .cell");
    let slotWidth = sampleCell.getBoundingClientRect().width;
    if (cells.length > 1) {
      const first = cells[0].getBoundingClientRect();
      const second = cells[1].getBoundingClientRect();
      slotWidth = second.left - first.left;
    }

    const axisSample = root.querySelector(".axis.x");
    const font = axisSample
      ? getComputedStyle(axisSample).font
      : "500 10px Roboto, sans-serif";

    const visible = computeVisibleXLabels(grid.xLabels, slotWidth, font);
    if (!sameVisibility(visible, this._xLabelVisible)) {
      this._xLabelVisible = visible;
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

    try {
      resolveCallWS(hass);
    } catch {
      this._error = "History unavailable";
      this._grid = undefined;
      return;
    }

    const fetchVersion = ++this._fetchVersion;
    this._loading = true;
    this._error = undefined;

    try {
      const axes = resolveAxes(config.preset);
      const aggregate = this._resolveAggregate(axes);
      const points = await loadHistoryPoints(
        hass,
        entity,
        PERIOD_HOURS[axes.period],
        aggregate
      );

      if (fetchVersion !== this._fetchVersion) {
        return;
      }

      await yieldToMain();

      if (fetchVersion !== this._fetchVersion) {
        return;
      }

      this._grid = buildHeatMapGrid(
        points,
        axes.x,
        axes.y,
        axes.period,
        aggregate,
        hass.config.time_zone || "UTC",
        firstWeekday(hass)
      );
    } catch (error) {
      if (fetchVersion !== this._fetchVersion) {
        return;
      }
      this._error = formatHistoryError(error);
      this._grid = undefined;
    } finally {
      if (fetchVersion === this._fetchVersion) {
        this._loading = false;
      }
    }
  }

  private _handleHeaderClick(ev: Event): void {
    ev.stopPropagation();
    if (!this.hass || !this._config) {
      return;
    }
    handleLovelaceAction(this, this.hass, this._config, "tap");
  }

  private _showPopover(
    ev: Event,
    cell: HeatMapGrid["cells"][number][number]
  ): void {
    const target = ev.currentTarget as HTMLElement;
    const wrap = target.closest(".grid-wrap") as HTMLElement | null;
    if (!wrap) {
      return;
    }

    const cellRect = target.getBoundingClientRect();
    const wrapRect = wrap.getBoundingClientRect();
    const config = this._config!;
    const stateObj = config.entity
      ? this.hass?.states[config.entity]
      : undefined;
    const unit = String(stateObj?.attributes.unit_of_measurement ?? "");
    const aggregate = this._resolveAggregate(resolveAxes(config.preset));

    this._popover = {
      anchorX: cellRect.left - wrapRect.left + cellRect.width / 2,
      anchorY: cellRect.top - wrapRect.top,
      label: cell.rangeLabel,
      value: formatCellValue(
        cell.value,
        aggregate,
        aggregate === "count" ? "" : unit
      ),
      count: cell.count,
    };
  }

  private _hidePopover(): void {
    this._popover = undefined;
  }

  private _renderLegend(grid: HeatMapGrid) {
    const config = this._config!;
    const mode = resolveColorMode(config.color_mode);
    const stateObj = config.entity
      ? this.hass?.states[config.entity]
      : undefined;
    const unit = String(stateObj?.attributes.unit_of_measurement ?? "");
    const aggregate = this._resolveAggregate(resolveAxes(config.preset));
    const gradient = heatMapGradientCss(
      this,
      mode,
      config.color_low,
      config.color_high
    );
    const mid = (grid.min + grid.max) / 2;

    return html`
      <div class="legend-wrap" aria-hidden="true">
        <div class="legend-labels">
          <span>${formatLegendValue(grid.max, aggregate, unit)}</span>
          <span>${formatLegendValue(mid, aggregate, unit)}</span>
          <span>${formatLegendValue(grid.min, aggregate, unit)}</span>
        </div>
        <div
          class="legend-bar"
          style=${styleMap({ background: gradient })}
        ></div>
      </div>
    `;
  }

  private _renderCell(
    cell: HeatMapGrid["cells"][number][number],
    mode: ColorMode,
    config: HeatMapCardConfig,
    grid: HeatMapGrid,
    aggregate: AggregateType,
    unit: string,
    showValues: boolean
  ) {
    const level = normalizeLevel(cell.value, grid.min, grid.max);
    const hasValue = cell.value !== null;

    return html`
      <div
        class=${classMap({
          cell: true,
          empty: !hasValue,
          "has-value": hasValue,
        })}
        tabindex=${hasValue ? 0 : nothing}
        style=${styleMap({
          background: cellBackground(this, level, mode, config, hasValue),
        })}
        @pointerenter=${(ev: Event) => this._showPopover(ev, cell)}
        @pointerleave=${this._hidePopover}
        @focus=${(ev: Event) => this._showPopover(ev, cell)}
        @blur=${this._hidePopover}
      >
        ${showValues && hasValue
          ? html`<span class="cell-value"
              >${formatCellValue(
                cell.value,
                aggregate,
                aggregate === "count" ? "" : unit,
                true
              )}</span
            >`
          : nothing}
      </div>
    `;
  }

  private _renderTimelineGrid(
    grid: HeatMapGrid,
    config: HeatMapCardConfig,
    mode: ColorMode,
    showLabels: boolean,
    showValues: boolean,
    showLegend: boolean,
    aggregate: AggregateType,
    unit: string,
    xVisible: boolean[]
  ) {
    const row = grid.cells[0] ?? [];

    return html`
      <div class="heatmap-body">
        <div class="grid-column">
          <div class="cells-legend-row">
            <div class="grid-wrap">
              <div class="timeline-grid">
                ${row.map(
                  (cell, x) => html`
                    <div class="timeline-slot">
                      ${showLabels
                        ? html`<div class="axis x timeline-axis">
                            ${xVisible[x] ? grid.xLabels[x] : nothing}
                          </div>`
                        : nothing}
                      ${this._renderCell(
                        cell,
                        mode,
                        config,
                        grid,
                        aggregate,
                        unit,
                        showValues
                      )}
                    </div>
                  `
                )}
              </div>
              ${this._renderPopover()}
            </div>
            ${showLegend ? this._renderLegend(grid) : nothing}
          </div>
        </div>
      </div>
    `;
  }

  private _renderPopover() {
    if (!this._popover) {
      return nothing;
    }

    return html`
      <div
        class="popover"
        role="tooltip"
        style=${styleMap({
          left: `${this._popover.anchorX}px`,
          top: `${this._popover.anchorY}px`,
        })}
      >
        <div class="popover-label">${this._popover.label}</div>
        <div class="popover-value">${this._popover.value}</div>
        <div class="popover-meta">
          ${this._popover.count} sample${this._popover.count === 1 ? "" : "s"}
        </div>
      </div>
    `;
  }

  private _renderGrid(grid: HeatMapGrid) {
    const config = this._config!;
    const mode = resolveColorMode(config.color_mode);
    const showLabels = config.show_axis_labels !== false;
    const showValues = config.show_cell_values === true;
    const showLegend = config.show_legend !== false;
    const stateObj = config.entity ? this.hass?.states[config.entity] : undefined;
    const unit = String(stateObj?.attributes.unit_of_measurement ?? "");
    const aggregate = this._resolveAggregate(resolveAxes(config.preset));
    const colOffset = showLabels ? 2 : 1;
    const xVisible =
      this._xLabelVisible ?? grid.xLabels.map(() => true);

    if (isTimelineGrid(grid)) {
      return this._renderTimelineGrid(
        grid,
        config,
        mode,
        showLabels,
        showValues,
        showLegend,
        aggregate,
        unit,
        xVisible
      );
    }

    const columnTemplate = showLabels
      ? `auto repeat(${grid.xLabels.length}, minmax(0, 1fr))`
      : `repeat(${grid.xLabels.length}, minmax(0, 1fr))`;

    return html`
      <div class="heatmap-body">
        <div class="grid-column">
          <div class="cells-legend-row">
            <div class="grid-stack">
              ${showLabels
                ? html`
                    <div
                      class="x-axis-row"
                      style=${styleMap({
                        gridTemplateColumns: columnTemplate,
                      })}
                    >
                      <div class="corner"></div>
                      ${grid.xLabels.map(
                        (label, x) => html`
                          <div class="axis x">
                            ${xVisible[x] ? label : nothing}
                          </div>
                        `
                      )}
                    </div>
                  `
                : nothing}
              <div class="cells-legend-row">
                <div class="grid-wrap">
                  <div
                    class="data-grid"
                    style=${styleMap({
                      gridTemplateColumns: columnTemplate,
                      gridTemplateRows: `repeat(${grid.yLabels.length}, auto)`,
                    })}
                  >
                    ${grid.cells.flatMap((row, y) => {
                      const rowNum = y + 1;
                      const yLabel = showLabels
                        ? html`
                            <div
                              class="axis y"
                              style=${styleMap({
                                gridColumn: "1",
                                gridRow: String(rowNum),
                              })}
                            >
                              ${grid.yLabels[y]}
                            </div>
                          `
                        : nothing;

                      const cells = row.map((cell, x) => {
                        const level = normalizeLevel(
                          cell.value,
                          grid.min,
                          grid.max
                        );
                        const hasValue = cell.value !== null;
                        return html`
                          <div
                            class=${classMap({
                              cell: true,
                              empty: !hasValue,
                              "has-value": hasValue,
                            })}
                            tabindex=${hasValue ? 0 : nothing}
                            style=${styleMap({
                              gridColumn: String(x + colOffset),
                              gridRow: String(rowNum),
                              background: cellBackground(
                                this,
                                level,
                                mode,
                                config,
                                hasValue
                              ),
                            })}
                            @pointerenter=${(ev: Event) =>
                              this._showPopover(ev, cell)}
                            @pointerleave=${this._hidePopover}
                            @focus=${(ev: Event) =>
                              this._showPopover(ev, cell)}
                            @blur=${this._hidePopover}
                          >
                            ${showValues && hasValue
                              ? html`<span class="cell-value"
                                  >${formatCellValue(
                                    cell.value,
                                    aggregate,
                                    aggregate === "count" ? "" : unit,
                                    true
                                  )}</span
                                >`
                              : nothing}
                          </div>
                        `;
                      });

                      return [yLabel, ...cells];
                    })}
                  </div>
                  ${this._renderPopover()}
                </div>
                ${showLegend ? this._renderLegend(grid) : nothing}
              </div>
            </div>
          </div>
        </div>
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
      <ha-card>
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

    .heatmap-body {
      flex: 1;
      min-height: 0;
      display: flex;
      flex-direction: column;
    }

    .grid-column {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
    }

    .grid-stack {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .cells-legend-row {
      display: flex;
      align-items: stretch;
      gap: 10px;
    }

    .grid-wrap {
      position: relative;
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
    }

    .x-axis-row,
    .data-grid {
      display: grid;
      gap: 2px;
      align-content: start;
    }

    .data-grid {
      align-content: start;
    }

    .timeline-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 2px;
      align-content: flex-start;
    }

    .timeline-slot {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      flex: 0 0 auto;
    }

    .timeline-axis {
      min-height: 12px;
      width: 100%;
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
      aspect-ratio: 1;
      width: 100%;
      min-width: 0;
      padding: 0;
      touch-action: manipulation;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .timeline-grid .cell {
      width: 18px;
      height: 18px;
      flex: 0 0 18px;
    }

    .cell.empty {
      background: rgba(0, 0, 0, 0.05);
    }

    .cell.has-value:hover,
    .cell.has-value:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -1px;
      z-index: 1;
    }

    .cell-value {
      font-size: 9px;
      line-height: 1;
      font-weight: var(--ha-font-weight-medium, 500);
      color: var(--primary-text-color);
      text-shadow: 0 0 3px var(--card-background-color);
      pointer-events: none;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 100%;
      padding: 0 1px;
    }

    .popover {
      position: absolute;
      z-index: 3;
      pointer-events: none;
      transform: translate(-50%, calc(-100% - 8px));
      padding: 6px 8px;
      border-radius: var(--ha-card-border-radius, 10px);
      background: var(--secondary-background-color, var(--card-background-color));
      border: 1px solid var(--divider-color);
      color: var(--primary-text-color);
      font-size: var(--nv-label-font-size);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
      max-width: min(220px, 90vw);
      white-space: nowrap;
    }

    .popover-label {
      color: var(--secondary-text-color);
      margin-bottom: 2px;
    }

    .popover-value {
      font-size: var(--nv-value-font-size);
      font-weight: var(--ha-font-weight-medium, 500);
    }

    .popover-meta {
      margin-top: 2px;
      color: var(--secondary-text-color);
      font-size: 10px;
    }

    .legend-wrap {
      display: flex;
      flex-direction: row;
      align-items: stretch;
      gap: 6px;
      flex-shrink: 0;
      align-self: stretch;
      height: 100%;
    }

    .legend-labels {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 10px;
      color: var(--secondary-text-color);
      text-align: right;
      line-height: 1.2;
      padding: 2px 0;
      height: 100%;
    }

    .legend-bar {
      width: 12px;
      border-radius: 4px;
      height: 100%;
      border: 1px solid var(--divider-color);
    }
  `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [HEAT_MAP_CARD_NAME]: NvisionHeatMapCard;
  }
}
