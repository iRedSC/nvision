import { html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { HaFormSchema, LovelaceCardEditor } from "../../types";
import { fireEvent } from "../../types";
import { NvisionBaseElement } from "../../utils/base-element";
import { defaultAggregate } from "../../utils/history-data";
import type { HeatMapCardConfig } from "./heat-map-card-config";
import {
  AGGREGATE_OPTIONS,
  AXIS_OPTIONS,
  COLOR_MODE_OPTIONS,
  DEFAULT_COLOR_MODE,
  DEFAULT_PERIOD,
  DEFAULT_PRESET,
  HEAT_MAP_CARD_EDITOR_NAME,
  PERIOD_OPTIONS,
  PRESET_OPTIONS,
} from "./const";

const SCHEMA: HaFormSchema[] = [
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
    name: "period",
    required: true,
    default: DEFAULT_PERIOD,
    selector: {
      select: {
        options: [...PERIOD_OPTIONS],
        mode: "dropdown",
      },
    },
  },
  {
    type: "grid",
    name: "",
    schema: [
      {
        name: "x_axis",
        selector: {
          select: {
            options: [...AXIS_OPTIONS],
            mode: "dropdown",
          },
        },
      },
      {
        name: "y_axis",
        selector: {
          select: {
            options: [...AXIS_OPTIONS],
            mode: "dropdown",
          },
        },
      },
    ],
  },
  {
    name: "aggregate",
    selector: {
      select: {
        options: [...AGGREGATE_OPTIONS],
        mode: "dropdown",
      },
    },
  },
  {
    type: "grid",
    name: "",
    schema: [
      {
        name: "min",
        selector: { number: { step: "any" } },
      },
      {
        name: "max",
        selector: { number: { step: "any" } },
      },
    ],
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
      { name: "show_current", selector: { boolean: {} } },
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
      period: DEFAULT_PERIOD,
      color_mode: DEFAULT_COLOR_MODE,
      show_axis_labels: true,
      show_legend: true,
      show_current: true,
      ...config,
      aggregate: config.aggregate ?? defaultAggregate(config.entity),
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

    if (schema.name === "preset") {
      return "Preset";
    }

    if (schema.name === "period") {
      return "Period";
    }

    if (schema.name === "x_axis") {
      return "X axis";
    }

    if (schema.name === "y_axis") {
      return "Y axis";
    }

    if (schema.name === "aggregate") {
      return "Aggregate";
    }

    if (schema.name === "min") {
      return "Minimum (optional)";
    }

    if (schema.name === "max") {
      return "Maximum (optional)";
    }

    if (schema.name === "color_mode") {
      return "Color mode";
    }

    if (schema.name === "show_axis_labels") {
      return "Axis labels";
    }

    if (schema.name === "show_legend") {
      return "Legend";
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
        .schema=${SCHEMA}
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
        aggregate: config.aggregate ?? defaultAggregate(config.entity),
      },
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [HEAT_MAP_CARD_EDITOR_NAME]: NvisionHeatMapCardEditor;
  }
}
