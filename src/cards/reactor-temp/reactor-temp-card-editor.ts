import { html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { HaFormSchema, LovelaceCardEditor } from "../../types";
import { fireEvent } from "../../types";
import { NvisionBaseElement } from "../../utils/base-element";
import {
  computeInteractionLabel,
  interactionEditorSchema,
} from "../../utils/interaction-schema";
import type { ReactorTempCardConfig } from "./reactor-temp-card-config";
import {
  DEFAULT_MAX,
  DEFAULT_MIN,
  DEFAULT_STEP,
  REACTOR_TEMP_CARD_EDITOR_NAME,
} from "./const";

const SCHEMA: HaFormSchema[] = [
  {
    name: "entity",
    selector: {
      entity: {
        domain: ["climate", "sensor", "number", "input_number"],
      },
    },
  },
  {
    name: "target_entity",
    selector: {
      entity: {
        domain: ["climate", "number", "input_number"],
      },
    },
  },
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
      {
        name: "step",
        required: true,
        default: DEFAULT_STEP,
        selector: { number: { min: 0.1, step: 0.1 } },
      },
    ],
  },
  interactionEditorSchema(),
];

@customElement(REACTOR_TEMP_CARD_EDITOR_NAME)
export class NvisionReactorTempCardEditor
  extends NvisionBaseElement
  implements LovelaceCardEditor
{
  @state() private _config?: ReactorTempCardConfig;

  public setConfig(config: ReactorTempCardConfig): void {
    this._config = {
      min: DEFAULT_MIN,
      max: DEFAULT_MAX,
      step: DEFAULT_STEP,
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
      return "Current temperature entity";
    }

    if (schema.name === "target_entity") {
      return "Setpoint entity (optional)";
    }

    if (schema.name === "min") {
      return "Visual range minimum";
    }

    if (schema.name === "max") {
      return "Visual range maximum";
    }

    if (schema.name === "step") {
      return "Setpoint step";
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
    [REACTOR_TEMP_CARD_EDITOR_NAME]: NvisionReactorTempCardEditor;
  }
}
