import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
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
import {
  responsiveStateIconStyles,
  responsiveTypeStyles,
} from "../../utils/responsive-type";
import type { BlankCardConfig } from "./blank-card-config";
import { BLANK_CARD_EDITOR_NAME, BLANK_CARD_NAME } from "./const";

registerCustomCard({
  type: BLANK_CARD_NAME,
  name: "Nvision Blank",
  description: "Neutral starting point for nvision cards",
});

@customElement(BLANK_CARD_NAME)
export class NvisionBlankCard extends LitElement implements LovelaceCard {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("./blank-card-editor");
    return document.createElement(BLANK_CARD_EDITOR_NAME) as LovelaceCardEditor;
  }

  public static getStubConfig(
    hass: HomeAssistant,
    entities: string[],
    entitiesFallback: string[]
  ): BlankCardConfig {
    const entity =
      entities[0] || entitiesFallback[0] || Object.keys(hass.states)[0];
    return {
      type: `custom:${BLANK_CARD_NAME}`,
      entity,
    };
  }

  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: BlankCardConfig;

  private _actions = new ActionHandlers(
    () => this,
    () => this.hass,
    () => this._config
  );

  public setConfig(config: BlankCardConfig): void {
    this._config = {
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
      "Nvision";

    const secondary = formatStateWithUnit(stateObj);

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
      </ha-card>
    `;
  }

  static styles = [
    responsiveTypeStyles,
    responsiveStateIconStyles,
    css`
    :host {
      --tile-color: var(--state-inactive-color);
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
      min-height: 56px;
      cursor: pointer;
    }

    ha-state-icon {
      flex: none;
      color: var(--primary-text-color);
    }

    ha-tile-info {
      min-width: 0;
      flex: 1;
      --ha-tile-info-primary-font-size: var(--nv-label-font-size);
      --ha-tile-info-secondary-font-size: var(--nv-value-font-size);
      --ha-tile-info-secondary-font-weight: var(--ha-font-weight-medium, 500);
    }
  `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [BLANK_CARD_NAME]: NvisionBlankCard;
  }
}
