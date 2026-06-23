import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HassEntity } from "home-assistant-js-websocket";
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
import { parseNumericState } from "../../utils/power-lightning";
import {
  responsiveStateIconStyles,
  responsiveTypeStyles,
} from "../../utils/responsive-type";
import {
  DEFAULT_COLUMNS,
  DEFAULT_THEME,
  SUM_CARD_EDITOR_NAME,
  SUM_CARD_NAME,
  SUM_THEME_ICONS,
  type SumTheme,
} from "./const";
import type { ResolvedSumEntity, SumCardConfig } from "./sum-card-config";
import { resolveSumEntities } from "./sum-card-config";
import { formatEntityValue, formatSumTotal } from "./sum-format";

registerCustomCard({
  type: SUM_CARD_NAME,
  name: "Nvision Sum",
  description: "Numeric entities with a summed total",
});

function matchesTheme(entityId: string, stateObj: HassEntity | undefined): boolean {
  const deviceClass = stateObj?.attributes?.device_class;
  const unit = stateObj?.attributes?.unit_of_measurement;

  return (
    deviceClass === "monetary" ||
    deviceClass === "energy" ||
    deviceClass === "volume" ||
    deviceClass === "water" ||
    idIncludes(entityId, "cost", "price", "money", "eur", "usd") ||
    idIncludes(entityId, "energy", "kwh", "wh", "power") ||
    idIncludes(entityId, "water", "liquid", "volume", "liter", "litre") ||
    typeof unit === "string"
  );
}

function idIncludes(entityId: string, ...needles: string[]): boolean {
  const lower = entityId.toLowerCase();
  return needles.some((needle) => lower.includes(needle));
}

function pickStubEntities(
  hass: HomeAssistant,
  pool: string[]
): string[] {
  const seen = new Set<string>();
  const picked: string[] = [];

  for (const id of pool) {
    if (seen.has(id)) {
      continue;
    }
    seen.add(id);

    const stateObj = hass.states[id];
    if (parseNumericState(stateObj?.state) === undefined) {
      continue;
    }

    if (matchesTheme(id, stateObj)) {
      picked.push(id);
    }

    if (picked.length >= 4) {
      break;
    }
  }

  if (picked.length >= 2) {
    return picked;
  }

  for (const id of pool) {
    if (seen.has(id)) {
      continue;
    }
    seen.add(id);

    if (parseNumericState(hass.states[id]?.state) !== undefined) {
      picked.push(id);
    }

    if (picked.length >= 3) {
      break;
    }
  }

  return picked;
}

@customElement(SUM_CARD_NAME)
export class NvisionSumCard extends LitElement implements LovelaceCard {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("./sum-card-editor");
    return document.createElement(SUM_CARD_EDITOR_NAME) as LovelaceCardEditor;
  }

  public static getStubConfig(
    hass: HomeAssistant,
    entities: string[],
    entitiesFallback: string[]
  ): SumCardConfig {
    const pool = [...entities, ...entitiesFallback, ...Object.keys(hass.states)];
    const picked = pickStubEntities(hass, pool);

    return {
      type: `custom:${SUM_CARD_NAME}`,
      entities: picked.length ? picked : pool.slice(0, 3),
      columns: DEFAULT_COLUMNS,
      theme: DEFAULT_THEME,
    };
  }

  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: SumCardConfig;

  private _actions = new ActionHandlers(
    () => this,
    () => this.hass,
    () => this._config
  );

  public setConfig(config: SumCardConfig): void {
    this._config = {
      entities: [],
      columns: DEFAULT_COLUMNS,
      theme: DEFAULT_THEME,
      ...moreInfoInteractions(),
      ...config,
    };

    this._syncLayout();
  }

  private _entities(): ResolvedSumEntity[] {
    return resolveSumEntities(this._config?.entities);
  }

  private _theme(): SumTheme {
    return this._config?.theme ?? DEFAULT_THEME;
  }

  private _sumState(): {
    sum: number | undefined;
    reference?: HassEntity;
  } {
    const entities = this._entities();
    let sum = 0;
    let hasNumeric = false;
    let reference: HassEntity | undefined;

    for (const entry of entities) {
      const stateObj = this.hass?.states[entry.entityId];
      const value = parseNumericState(stateObj?.state);

      if (value === undefined) {
        continue;
      }

      sum += value;
      hasNumeric = true;

      if (!reference) {
        reference = stateObj;
      }
    }

    return {
      sum: hasNumeric ? sum : undefined,
      reference,
    };
  }

  private _syncLayout(): void {
    const configured = this._config?.columns ?? DEFAULT_COLUMNS;
    const count = this._entities().length;
    const columns = count > 0 ? Math.min(configured, count) : configured;
    this.style.setProperty("--columns", String(columns));
    this.dataset.theme = this._theme();
  }

  public getCardSize(): number {
    const entities = this._entities().length || 1;
    const columns = this._config?.columns ?? DEFAULT_COLUMNS;
    return 1 + Math.max(1, Math.ceil(entities / columns));
  }

  public getGridOptions(): LovelaceGridOptions {
    return { columns: 6, rows: this.getCardSize() };
  }

  protected updated(): void {
    this._syncLayout();
  }

  protected render() {
    if (!this._config || !this.hass) {
      return nothing;
    }

    const entities = this._entities();
    const theme = this._theme();
    const { sum, reference } = this._sumState();
    const totalLabel = this._config.name || "Total";
    const totalValue = formatSumTotal(this.hass, sum, theme, reference);
    const themeIcon = SUM_THEME_ICONS[theme];

    return html`
      <ha-card>
        <div
          class="total"
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
          <div class="total-inner">
            <div class="total-label-row">
              ${themeIcon
                ? html`<ha-icon class="total-icon" .icon=${themeIcon}></ha-icon>`
                : nothing}
              <span class="total-label">${totalLabel}</span>
            </div>
            <span class="total-value">${totalValue}</span>
          </div>
        </div>
        <div class="entities">
          ${entities.map((entry) => {
            const stateObj = this.hass!.states[entry.entityId];
            const value = formatEntityValue(this.hass, stateObj, theme);
            const primary = entry.showName
              ? entry.name ||
                stateObj?.attributes.friendly_name ||
                entry.entityId
              : "";

            return html`
              <div
                class="entity"
                role="button"
                tabindex="0"
                @click=${this._actions.bind(entry.entityId).click}
                @dblclick=${this._actions.bind(entry.entityId).dblclick}
                @keydown=${this._actions.bind(entry.entityId).keydown}
                @pointerdown=${this._actions.bind(entry.entityId).pointerdown}
                @pointerup=${this._actions.bind(entry.entityId).pointerup}
                @pointerleave=${this._actions.bind(entry.entityId).pointerleave}
                @pointercancel=${this._actions.bind(entry.entityId).pointercancel}
              >
                ${entry.showIcon
                  ? entry.image
                    ? html`<img
                        class="entity-image"
                        src=${entry.image}
                        alt=""
                      />`
                    : entry.icon
                      ? html`<ha-icon
                          class="entity-icon"
                          .icon=${entry.icon}
                        ></ha-icon>`
                      : stateObj
                        ? html`<ha-state-icon
                            .hass=${this.hass}
                            .stateObj=${stateObj}
                          ></ha-state-icon>`
                        : nothing
                  : nothing}
                <ha-tile-info
                  .primary=${primary}
                  .secondary=${value}
                ></ha-tile-info>
              </div>
            `;
          })}
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
        --columns: 3;
        --sum-accent: var(--primary-color);
        display: block;
        height: 100%;
      }

      :host([data-theme="monetary"]) {
        --sum-accent: var(
          --state-monetary-color,
          var(--success-color, var(--primary-color))
        );
      }

      :host([data-theme="energy"]) {
        --sum-accent: var(--warning-color, var(--amber-color, #ffb300));
      }

      :host([data-theme="liquid"]) {
        --sum-accent: var(--info-color, var(--light-blue-color, #03a9f4));
      }

      ha-card {
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      .total {
        display: flex;
        justify-content: center;
        padding: 12px 12px 10px;
        border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        cursor: pointer;
        min-height: 56px;
        box-sizing: border-box;
      }

      .total-inner {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        text-align: center;
      }

      .total-label-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }

      .total-icon {
        flex: none;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--sum-accent);
        --mdc-icon-size: var(--nv-icon-size);
      }

      .total-label {
        font-size: var(--nv-label-font-size);
        font-weight: var(--ha-font-weight-medium, 500);
        color: var(--primary-text-color);
        line-height: 1.2;
      }

      .total-value {
        font-size: calc(var(--nv-value-font-size) * 1.15);
        font-weight: var(--ha-font-weight-bold, 700);
        color: var(--sum-accent);
        line-height: 1.2;
      }

      .entities {
        display: grid;
        grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
        gap: 8px 10px;
        padding: 10px;
        box-sizing: border-box;
        flex: 1;
      }

      .entity {
        display: flex;
        align-items: center;
        gap: 8px;
        min-width: 0;
        cursor: pointer;
      }

      ha-state-icon,
      ha-icon.entity-icon,
      .entity-image {
        flex: none;
        color: var(--primary-text-color);
      }

      ha-icon.entity-icon {
        --mdc-icon-size: var(--nv-icon-size);
      }

      .entity-image {
        width: var(--nv-icon-size, 24px);
        height: var(--nv-icon-size, 24px);
        object-fit: cover;
        border-radius: 50%;
      }

      ha-tile-info {
        min-width: 0;
        flex: 1;
        --ha-tile-info-primary-font-size: var(--nv-label-font-size);
        --ha-tile-info-primary-font-weight: var(--ha-font-weight-medium, 500);
        --ha-tile-info-secondary-font-size: var(--nv-value-font-size);
        --ha-tile-info-secondary-font-weight: var(--ha-font-weight-medium, 500);
        --ha-tile-info-secondary-color: var(--primary-text-color);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [SUM_CARD_NAME]: NvisionSumCard;
  }
}
