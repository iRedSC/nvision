import { html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { HaFormSchema, LovelaceCardEditor } from "../../types";
import { fireEvent } from "../../types";
import { NvisionBaseElement } from "../../utils/base-element";
import {
  computeInteractionLabel,
  interactionEditorSchema,
} from "../../utils/interaction-schema";
import type { AirQualityCardConfig } from "./air-quality-card-config";
import {
  AIR_QUALITY_CARD_EDITOR_NAME,
  DEFAULT_MAX,
  DEFAULT_MIN,
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
    type: "grid",
    name: "",
    schema: [
      { name: "color_good", selector: { color_rgb: {} } },
      { name: "color_warning", selector: { color_rgb: {} } },
    ],
  },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "color_bad", selector: { color_rgb: {} } },
      { name: "color_mist", selector: { color_rgb: {} } },
    ],
  },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "color_clear", selector: { color_rgb: {} } },
      { name: "color_sky", selector: { color_rgb: {} } },
    ],
  },
  interactionEditorSchema(),
];

@customElement(AIR_QUALITY_CARD_EDITOR_NAME)
export class NvisionAirQualityCardEditor
  extends NvisionBaseElement
  implements LovelaceCardEditor
{
  @state() private _config?: AirQualityCardConfig;

  public setConfig(config: AirQualityCardConfig): void {
    this._config = {
      min: DEFAULT_MIN,
      max: DEFAULT_MAX,
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

    if (schema.name === "color_good") {
      return "Good gauge color";
    }

    if (schema.name === "color_warning") {
      return "Moderate gauge color";
    }

    if (schema.name === "color_bad") {
      return "Poor gauge color";
    }

    if (schema.name === "color_mist") {
      return "Mist color";
    }

    if (schema.name === "color_clear") {
      return "Clear glow color";
    }

    if (schema.name === "color_sky") {
      return "Sky glow color";
    }

    return (
      computeInteractionLabel(this.hass, schema) ??
      this.hass.localize(
        `ui.panel.lovelace.editor.card.generic.${schema.name}`
      )
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
    [AIR_QUALITY_CARD_EDITOR_NAME]: NvisionAirQualityCardEditor;
  }
}
