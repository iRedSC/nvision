import { html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { HaFormSchema, LovelaceCardEditor } from "../../types";
import { fireEvent } from "../../types";
import { NvisionBaseElement } from "../../utils/base-element";
import type { WaveformCardConfig } from "./waveform-card-config";
import {
  DEFAULT_LAYOUT,
  DEFAULT_MAX,
  DEFAULT_MIN,
  DEFAULT_MOTION,
  DEFAULT_SHAKE_AT,
  DEFAULT_SIZE,
  DEFAULT_SHAKE_SPEED,
  LAYOUT_OPTIONS,
  MOTION_OPTIONS,
  SIZE_OPTIONS,
  WAVEFORM_CARD_EDITOR_NAME,
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
  {
    type: "grid",
    name: "",
    schema: [
      {
        name: "layout",
        required: true,
        default: DEFAULT_LAYOUT,
        selector: {
          select: {
            options: [...LAYOUT_OPTIONS],
            mode: "dropdown",
          },
        },
      },
      {
        name: "size",
        required: true,
        default: DEFAULT_SIZE,
        selector: {
          select: {
            options: [...SIZE_OPTIONS],
            mode: "dropdown",
          },
        },
      },
    ],
  },
  {
    name: "motion",
    required: true,
    default: DEFAULT_MOTION,
    selector: {
      select: {
        options: [...MOTION_OPTIONS],
        mode: "dropdown",
      },
    },
  },
  {
    type: "grid",
    name: "",
    schema: [
      {
        name: "shake_at",
        required: true,
        default: DEFAULT_SHAKE_AT,
        selector: { number: { min: 0.1, max: 0.95, step: 0.05 } },
      },
      {
        name: "shake_speed",
        required: true,
        default: DEFAULT_SHAKE_SPEED,
        selector: { number: { min: 0.15, max: 1.5, step: 0.05 } },
      },
    ],
  },
];

@customElement(WAVEFORM_CARD_EDITOR_NAME)
export class NvisionWaveformCardEditor
  extends NvisionBaseElement
  implements LovelaceCardEditor
{
  @state() private _config?: WaveformCardConfig;

  public setConfig(config: WaveformCardConfig): void {
    this._config = {
      min: DEFAULT_MIN,
      max: DEFAULT_MAX,
      layout: DEFAULT_LAYOUT,
      size: DEFAULT_SIZE,
      motion: DEFAULT_MOTION,
      shake_at: DEFAULT_SHAKE_AT,
      shake_speed: DEFAULT_SHAKE_SPEED,
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
      return "Waveform color";
    }

    if (schema.name === "layout") {
      return "Layout";
    }

    if (schema.name === "size") {
      return "Size";
    }

    if (schema.name === "motion") {
      return "Motion";
    }

    if (schema.name === "shake_at") {
      return "Shake starts at";
    }

    if (schema.name === "shake_speed") {
      return "Shake speed";
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
    [WAVEFORM_CARD_EDITOR_NAME]: NvisionWaveformCardEditor;
  }
}
