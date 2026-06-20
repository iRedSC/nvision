import { html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { HaFormSchema, LovelaceCardEditor } from "../../types";
import { fireEvent } from "../../types";
import { NvisionBaseElement } from "../../utils/base-element";
import {
  computeInteractionLabel,
  interactionEditorSchema,
} from "../../utils/interaction-schema";
import type { ActivityCardConfig } from "./activity-card-config";
import { ACTIVITY_CARD_EDITOR_NAME, DEFAULT_SPEED } from "./const";

const SCHEMA: HaFormSchema[] = [
  { name: "entity", selector: { entity: {} } },
  { name: "name", selector: { text: {} } },
  { name: "color", selector: { color_rgb: {} } },
  {
    name: "speed",
    required: true,
    default: DEFAULT_SPEED,
    selector: { number: { min: 0.25, max: 3, step: 0.05 } },
  },
  interactionEditorSchema(),
];

@customElement(ACTIVITY_CARD_EDITOR_NAME)
export class NvisionActivityCardEditor
  extends NvisionBaseElement
  implements LovelaceCardEditor
{
  @state() private _config?: ActivityCardConfig;

  public setConfig(config: ActivityCardConfig): void {
    this._config = {
      speed: DEFAULT_SPEED,
      ...config,
    };
  }

  private _computeLabel = (schema: HaFormSchema) => {
    if (!this.hass) {
      return undefined;
    }

    if (schema.name === "color") {
      return "Figure color";
    }

    if (schema.name === "speed") {
      return "Animation speed";
    }

    if (schema.name === "name") {
      return this.hass.localize("ui.panel.lovelace.editor.card.generic.name");
    }

    if (schema.name === "entity") {
      return this.hass.localize("ui.panel.lovelace.editor.card.generic.entity");
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
    [ACTIVITY_CARD_EDITOR_NAME]: NvisionActivityCardEditor;
  }
}
