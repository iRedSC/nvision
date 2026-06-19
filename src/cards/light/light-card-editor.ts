import { html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { HaFormSchema, LovelaceCardEditor } from "../../types";
import { fireEvent } from "../../types";
import { NvisionBaseElement } from "../../utils/base-element";
import type { LightCardConfig } from "./light-card-config";
import {
  DEFAULT_GLOW_INTENSITY,
  DEFAULT_GLOW_SIZE,
  LIGHT_CARD_EDITOR_NAME,
} from "./const";

const SCHEMA: HaFormSchema[] = [
  {
    name: "entity",
    required: true,
    selector: { entity: { domain: "light" } },
  },
  { name: "name", selector: { text: {} } },
  { name: "icon", selector: { icon: {} } },
  {
    type: "grid",
    name: "",
    schema: [
      {
        name: "glow_size",
        required: true,
        default: DEFAULT_GLOW_SIZE,
        selector: { number: { min: 20, max: 300, step: 5, unit_of_measurement: "%" } },
      },
      {
        name: "glow_intensity",
        required: true,
        default: DEFAULT_GLOW_INTENSITY,
        selector: { number: { min: 0, max: 1, step: 0.05 } },
      },
    ],
  },
  {
    name: "interactions",
    type: "expandable",
    flatten: true,
    schema: [
      {
        name: "tap_action",
        selector: {
          ui_action: {
            default_action: "toggle",
          },
        },
      },
      {
        name: "hold_action",
        selector: {
          ui_action: {
            default_action: "more-info",
          },
        },
      },
      {
        name: "",
        type: "optional_actions",
        flatten: true,
        schema: [
          {
            name: "double_tap_action",
            selector: {
              ui_action: {
                default_action: "none",
              },
            },
          },
        ],
      },
    ],
  },
];

@customElement(LIGHT_CARD_EDITOR_NAME)
export class NvisionLightCardEditor
  extends NvisionBaseElement
  implements LovelaceCardEditor
{
  @state() private _config?: LightCardConfig;

  public setConfig(config: LightCardConfig): void {
    this._config = {
      tap_action: { action: "toggle" },
      hold_action: { action: "more-info" },
      glow_size: DEFAULT_GLOW_SIZE,
      glow_intensity: DEFAULT_GLOW_INTENSITY,
      ...config,
    };
  }

  private _computeLabel = (schema: HaFormSchema) => {
    if (!this.hass) {
      return undefined;
    }

    if (schema.name === "glow_size") {
      return "Glow size";
    }

    if (schema.name === "glow_intensity") {
      return "Glow intensity";
    }

    if (schema.name === "interactions") {
      return "Interactions";
    }

    if (
      schema.name === "hold_action" ||
      schema.name === "double_tap_action"
    ) {
      return `${this.hass.localize(
        `ui.panel.lovelace.editor.card.generic.${schema.name}`
      )} (${this.hass.localize(
        "ui.panel.lovelace.editor.card.config.optional"
      )})`;
    }

    return this.hass.localize(
      `ui.panel.lovelace.editor.card.generic.${schema.name}`
    );
  };

  protected render() {
    if (!this.hass || !this._config) {
      return nothing;
    }

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SCHEMA}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _valueChanged(ev: CustomEvent): void {
    fireEvent(this, "config-changed", { config: ev.detail.value });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [LIGHT_CARD_EDITOR_NAME]: NvisionLightCardEditor;
  }
}
