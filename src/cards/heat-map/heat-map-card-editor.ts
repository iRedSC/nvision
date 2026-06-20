import { html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { HaFormSchema, LovelaceCardEditor } from "../../types";
import { fireEvent } from "../../types";
import { NvisionBaseElement } from "../../utils/base-element";
import type { HeatMapCardConfig } from "./heat-map-card-config";
import {
  COLOR_MODE_OPTIONS,
  DEFAULT_COLOR_MODE,
  DEFAULT_PRESET,
  HEAT_MAP_CARD_EDITOR_NAME,
  PRESET_OPTIONS,
} from "./const";

const BASE_SCHEMA: HaFormSchema[] = [
  { name: "entity", selector: { entity: {} } },
  { name: "name", selector: { text: {} } },
  {
    name: "preset",
    required: true,
    default: DEFAULT_PRESET,
    selector: {
      select: {
        options: [...PRESET_OPTIONS],
        mode: "dropdown",
      },
    },
  },
  {
    name: "color_mode",
    required: true,
    default: DEFAULT_COLOR_MODE,
    selector: {
      select: {
        options: [...COLOR_MODE_OPTIONS],
        mode: "dropdown",
      },
    },
  },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "show_axis_labels", selector: { boolean: {} } },
      { name: "show_legend", selector: { boolean: {} } },
      { name: "show_cell_values", selector: { boolean: {} } },
      { name: "show_current", selector: { boolean: {} } },
      { name: "dim_low_values", selector: { boolean: {} } },
    ],
  },
];

const CUSTOM_COLOR_SCHEMA: HaFormSchema[] = [
  {
    type: "grid",
    name: "",
    schema: [
      { name: "color_low", selector: { color_rgb: {} } },
      { name: "color_high", selector: { color_rgb: {} } },
    ],
  },
];

@customElement(HEAT_MAP_CARD_EDITOR_NAME)
export class NvisionHeatMapCardEditor
  extends NvisionBaseElement
  implements LovelaceCardEditor
{
  @state() private _config?: HeatMapCardConfig;

  public setConfig(config: HeatMapCardConfig): void {
    this._config = {
      preset: DEFAULT_PRESET,
      color_mode: DEFAULT_COLOR_MODE,
      show_axis_labels: true,
      show_legend: true,
      show_current: true,
      show_cell_values: false,
      dim_low_values: false,
      ...config,
      color_mode:
        config.color_mode === "primary" ? "theme" : config.color_mode,
    };
  }

  private _schema(): HaFormSchema[] {
    if (this._config?.color_mode === "custom") {
      return [...BASE_SCHEMA, ...CUSTOM_COLOR_SCHEMA];
    }
    return BASE_SCHEMA;
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

    if (schema.name === "preset") {
      return "View";
    }

    if (schema.name === "color_mode") {
      return "Color mode";
    }

    if (schema.name === "color_low") {
      return "Low color";
    }

    if (schema.name === "color_high") {
      return "High color";
    }

    if (schema.name === "show_axis_labels") {
      return "Axis labels";
    }

    if (schema.name === "show_legend") {
      return "Scale";
    }

    if (schema.name === "show_cell_values") {
      return "Values in cells";
    }

    if (schema.name === "dim_low_values") {
      return "Dim low values";
    }

    if (schema.name === "show_current") {
      return "Current value";
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
        .schema=${this._schema()}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _valueChanged(ev: CustomEvent): void {
    const config = ev.detail.value as HeatMapCardConfig;
    fireEvent(this, "config-changed", {
      config: {
        ...config,
        color_mode:
          config.color_mode === "primary" ? "theme" : config.color_mode,
      },
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [HEAT_MAP_CARD_EDITOR_NAME]: NvisionHeatMapCardEditor;
  }
}
