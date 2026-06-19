import { html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { HaFormSchema, LovelaceCardEditor } from "../../types";
import { fireEvent } from "../../types";
import { NvisionBaseElement } from "../../utils/base-element";
import type { WaveformCardConfig } from "./waveform-card-config";
import {
  DEFAULT_DOT_COUNT,
  DEFAULT_DOT_SIZE,
  DEFAULT_DOT_SPACING,
  DEFAULT_MAX,
  DEFAULT_MIN,
  DEFAULT_OVERLAP_AT,
  DEFAULT_OVERLAP_DOTS,
  DEFAULT_SHAPE,
  DEFAULT_SHAKE_AT,
  DEFAULT_SHAKE_PEAK,
  DEFAULT_WAVE_AMPLITUDE,
  DEFAULT_WAVE_FREQUENCY,
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
    name: "shape",
    required: true,
    default: DEFAULT_SHAPE,
    selector: {
      select: {
        options: [
          { value: "line", label: "Line" },
          { value: "circle", label: "Circle" },
          { value: "grid", label: "Grid" },
        ],
        mode: "dropdown",
      },
    },
  },
  {
    type: "grid",
    name: "",
    schema: [
      {
        name: "dot_count",
        required: true,
        default: DEFAULT_DOT_COUNT,
        selector: { number: { min: 4, max: 64, step: 1 } },
      },
      {
        name: "dot_size",
        required: true,
        default: DEFAULT_DOT_SIZE,
        selector: { number: { min: 0.25, max: 3, step: 0.05 } },
      },
      {
        name: "dot_spacing",
        required: true,
        default: DEFAULT_DOT_SPACING,
        selector: { number: { min: 0.5, max: 2, step: 0.05 } },
      },
    ],
  },
  {
    type: "grid",
    name: "",
    schema: [
      {
        name: "wave_amplitude",
        required: true,
        default: DEFAULT_WAVE_AMPLITUDE,
        selector: { number: { min: 0, max: 3, step: 0.05 } },
      },
      {
        name: "wave_frequency",
        required: true,
        default: DEFAULT_WAVE_FREQUENCY,
        selector: { number: { min: 0.1, max: 3, step: 0.05 } },
      },
    ],
  },
  { name: "overlap_dots", selector: { boolean: {} } },
  {
    type: "grid",
    name: "",
    schema: [
      {
        name: "overlap_at",
        required: true,
        default: DEFAULT_OVERLAP_AT,
        selector: { number: { min: 0, max: 1, step: 0.01 } },
      },
      {
        name: "shake_at",
        required: true,
        default: DEFAULT_SHAKE_AT,
        selector: { number: { min: 0, max: 1, step: 0.01 } },
      },
    ],
  },
  {
    name: "shake_peak",
    required: true,
    default: DEFAULT_SHAKE_PEAK,
    selector: { number: { min: 0, max: 1, step: 0.01 } },
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
      shape: DEFAULT_SHAPE,
      dot_count: DEFAULT_DOT_COUNT,
      dot_size: DEFAULT_DOT_SIZE,
      dot_spacing: DEFAULT_DOT_SPACING,
      overlap_dots: DEFAULT_OVERLAP_DOTS,
      overlap_at: DEFAULT_OVERLAP_AT,
      shake_at: DEFAULT_SHAKE_AT,
      shake_peak: DEFAULT_SHAKE_PEAK,
      wave_amplitude: DEFAULT_WAVE_AMPLITUDE,
      wave_frequency: DEFAULT_WAVE_FREQUENCY,
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

    if (schema.name === "shape") {
      return "Shape";
    }

    if (schema.name === "dot_count") {
      return "Dot count";
    }

    if (schema.name === "dot_size") {
      return "Dot size";
    }

    if (schema.name === "dot_spacing") {
      return "Dot spacing";
    }

    if (schema.name === "wave_amplitude") {
      return "Wave amplitude";
    }

    if (schema.name === "wave_frequency") {
      return "Wave frequency";
    }

    if (schema.name === "overlap_dots") {
      return "Overlap dots";
    }

    if (schema.name === "overlap_at") {
      return "Overlap threshold";
    }

    if (schema.name === "shake_at") {
      return "Shake threshold";
    }

    if (schema.name === "shake_peak") {
      return "Shake intensity";
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
