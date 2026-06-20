import { html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { HaFormSchema, LovelaceCardEditor } from "../../types";
import { fireEvent } from "../../types";
import { NvisionBaseElement } from "../../utils/base-element";
import {
  computeInteractionLabel,
  interactionEditorSchema,
} from "../../utils/interaction-schema";
import type { CircleGaugeCardConfig } from "./circle-gauge-card-config";
import {
  CIRCLE_GAUGE_CARD_EDITOR_NAME,
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
  { name: "color", selector: { color_rgb: {} } },
  { name: "track_color", selector: { color_rgb: {} } },
  { name: "reverse", selector: { boolean: {} } },
  interactionEditorSchema("toggle"),
];

@customElement(CIRCLE_GAUGE_CARD_EDITOR_NAME)
export class NvisionCircleGaugeCardEditor
  extends NvisionBaseElement
  implements LovelaceCardEditor
{
  @state() private _config?: CircleGaugeCardConfig;

  public setConfig(config: CircleGaugeCardConfig): void {
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

    if (schema.name === "color") {
      return "Gauge color";
    }

    if (schema.name === "track_color") {
      return "Track color";
    }

    if (schema.name === "reverse") {
      return "Reverse";
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
    [CIRCLE_GAUGE_CARD_EDITOR_NAME]: NvisionCircleGaugeCardEditor;
  }
}
