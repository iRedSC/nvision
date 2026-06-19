import { html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { HaFormSchema, LovelaceCardEditor } from "../../types";
import { fireEvent } from "../../types";
import { NvisionBaseElement } from "../../utils/base-element";
import type { LiquidCardConfig } from "./liquid-card-config";
import {
  DEFAULT_LIQUID_STYLE,
  DEFAULT_MAX,
  DEFAULT_MIN,
  LIQUID_CARD_EDITOR_NAME,
} from "./const";

const SCHEMA: HaFormSchema[] = [
  { name: "entity", selector: { entity: {} } },
  { name: "name", selector: { text: {} } },
  {
    type: "grid",
    name: "",
    schema: [
      {
        name: "min",
        required: true,
        default: DEFAULT_MIN,
        selector: { number: { step: "any" } },
      },
      {
        name: "max",
        required: true,
        default: DEFAULT_MAX,
        selector: { number: { step: "any" } },
      },
    ],
  },
  {
    name: "liquid_style",
    required: true,
    default: DEFAULT_LIQUID_STYLE,
    selector: {
      select: {
        options: [
          { value: "none", label: "None" },
          { value: "bubbles", label: "Bubbles" },
          { value: "electricity", label: "Electricity" },
        ],
        mode: "dropdown",
      },
    },
  },
  { name: "level_color", selector: { boolean: {} } },
  { name: "level_color_invert", selector: { boolean: {} } },
  { name: "color", selector: { color_rgb: {} } },
];

@customElement(LIQUID_CARD_EDITOR_NAME)
export class NvisionLiquidCardEditor
  extends NvisionBaseElement
  implements LovelaceCardEditor
{
  @state() private _config?: LiquidCardConfig;

  public setConfig(config: LiquidCardConfig): void {
    this._config = {
      min: DEFAULT_MIN,
      max: DEFAULT_MAX,
      liquid_style: DEFAULT_LIQUID_STYLE,
      ...config,
    };
  }

  private _computeLabel = (schema: HaFormSchema) => {
    if (!this.hass) {
      return undefined;
    }

    if (schema.name === "name") {
      return this.hass.localize(
        "ui.panel.lovelace.editor.card.generic.name"
      );
    }

    if (schema.name === "entity") {
      return this.hass.localize(
        "ui.panel.lovelace.editor.card.generic.entity"
      );
    }

    if (schema.name === "min") {
      return "Minimum value";
    }

    if (schema.name === "max") {
      return "Maximum value";
    }

    if (schema.name === "color") {
      return "Liquid color";
    }

    if (schema.name === "level_color") {
      return "Level-based color";
    }

    if (schema.name === "level_color_invert") {
      return "Invert level colors";
    }

    if (schema.name === "liquid_style") {
      return "Liquid style";
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
    [LIQUID_CARD_EDITOR_NAME]: NvisionLiquidCardEditor;
  }
}
