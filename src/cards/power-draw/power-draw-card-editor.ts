import { html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { HaFormSchema, LovelaceCardEditor } from "../../types";
import { fireEvent } from "../../types";
import { NvisionBaseElement } from "../../utils/base-element";
import {
  computeInteractionLabel,
  interactionEditorSchema,
} from "../../utils/interaction-schema";
import {
  DEFAULT_EFFECTS_MAX,
  DEFAULT_EFFECTS_MIN,
  DEFAULT_POWER_MAX,
  DEFAULT_POWER_MIN,
} from "../../utils/power-lightning";
import type { PowerDrawCardConfig } from "./power-draw-card-config";
import { POWER_DRAW_CARD_EDITOR_NAME } from "./const";

const SCHEMA: HaFormSchema[] = [
  {
    name: "entity",
    selector: { entity: { domain: "sensor" } },
  },
  { name: "name", selector: { text: {} } },
  {
    type: "grid",
    name: "",
    schema: [
      {
        name: "min",
        required: true,
        default: DEFAULT_POWER_MIN,
        selector: { number: { step: "any" } },
      },
      {
        name: "max",
        required: true,
        default: DEFAULT_POWER_MAX,
        selector: { number: { step: "any" } },
      },
    ],
  },
  {
    type: "grid",
    name: "",
    schema: [
      {
        name: "effects_min",
        required: true,
        default: DEFAULT_EFFECTS_MIN,
        selector: { number: { min: 0, max: 1, step: 0.05 } },
      },
      {
        name: "effects_max",
        required: true,
        default: DEFAULT_EFFECTS_MAX,
        selector: { number: { min: 0, max: 1, step: 0.05 } },
      },
    ],
  },
  { name: "color", selector: { color_rgb: {} } },
  { name: "icon", selector: { icon: {} } },
  interactionEditorSchema(),
];

@customElement(POWER_DRAW_CARD_EDITOR_NAME)
export class NvisionPowerDrawCardEditor
  extends NvisionBaseElement
  implements LovelaceCardEditor
{
  @state() private _config?: PowerDrawCardConfig;

  public setConfig(config: PowerDrawCardConfig): void {
    this._config = {
      min: DEFAULT_POWER_MIN,
      max: DEFAULT_POWER_MAX,
      effects_min: DEFAULT_EFFECTS_MIN,
      effects_max: DEFAULT_EFFECTS_MAX,
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
      return "Minimum watts";
    }

    if (schema.name === "max") {
      return "Maximum watts";
    }

    if (schema.name === "effects_min") {
      return "Minimum effect";
    }

    if (schema.name === "effects_max") {
      return "Maximum effect";
    }

    if (schema.name === "color") {
      return "Lightning color";
    }

    if (schema.name === "icon") {
      return "Source icon";
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
    [POWER_DRAW_CARD_EDITOR_NAME]: NvisionPowerDrawCardEditor;
  }
}
