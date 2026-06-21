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
  DEFAULT_GRAPH_HEIGHT,
  DEFAULT_GRAPH_STYLE,
  DEFAULT_TREND_PERIOD,
  GRAPH_STYLE_OPTIONS,
  STAT_CARD_EDITOR_NAME,
  TREND_PERIOD_OPTIONS,
} from "./const";
import type { StatCardConfig } from "./stat-card-config";

const SCHEMA: HaFormSchema[] = [
  { name: "entity", selector: { entity: {} } },
  { name: "name", selector: { text: {} } },
  { name: "show_icon", default: true, selector: { boolean: {} } },
  {
    name: "graph",
    default: DEFAULT_GRAPH_STYLE,
    selector: {
      select: {
        options: [...GRAPH_STYLE_OPTIONS],
        mode: "dropdown",
      },
    },
  },
  {
    name: "graph_period",
    default: String(DEFAULT_TREND_PERIOD),
    selector: {
      select: {
        options: [...TREND_PERIOD_OPTIONS],
        mode: "dropdown",
      },
    },
  },
  {
    name: "graph_height",
    default: DEFAULT_GRAPH_HEIGHT,
    selector: { number: { min: 40, max: 240, step: 4, unit_of_measurement: "px" } },
  },
  { name: "smoothing", default: true, selector: { boolean: {} } },
  { name: "show_fill", selector: { boolean: {} } },
  { name: "line_color", selector: { color_rgb: {} } },
  { name: "trend_entity", selector: { entity: {} } },
  {
    name: "trend_period",
    default: String(DEFAULT_TREND_PERIOD),
    selector: {
      select: {
        options: [...TREND_PERIOD_OPTIONS],
        mode: "dropdown",
      },
    },
  },
  { name: "invert_colors", selector: { boolean: {} } },
  interactionEditorSchema(),
];

@customElement(STAT_CARD_EDITOR_NAME)
export class NvisionStatCardEditor
  extends NvisionBaseElement
  implements LovelaceCardEditor
{
  @state() private _config?: StatCardConfig;

  public setConfig(config: StatCardConfig): void {
    this._config = config;
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

    if (schema.name === "show_icon") {
      return "Show icon";
    }

    if (schema.name === "graph") {
      return "Graph style";
    }

    if (schema.name === "graph_period") {
      return "Graph period";
    }

    if (schema.name === "graph_height") {
      return "Graph height";
    }

    if (schema.name === "smoothing") {
      return "Smooth line";
    }

    if (schema.name === "show_fill") {
      return "Fill under line";
    }

    if (schema.name === "line_color") {
      return "Line color";
    }

    if (schema.name === "trend_entity") {
      return "Trend entity (optional)";
    }

    if (schema.name === "trend_period") {
      return "Trend period";
    }

    if (schema.name === "invert_colors") {
      return "Invert trend colors";
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
        .data=${{
          ...this._config,
          graph: this._config.graph ?? DEFAULT_GRAPH_STYLE,
          graph_period: String(
            this._config.graph_period ??
              this._config.trend_period ??
              DEFAULT_TREND_PERIOD
          ),
          trend_period: String(
            this._config.trend_period ?? DEFAULT_TREND_PERIOD
          ),
        }}
        .schema=${SCHEMA}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _valueChanged(ev: CustomEvent): void {
    const value = { ...ev.detail.value };
    if (value.graph_period !== undefined) {
      value.graph_period = Number(value.graph_period);
    }
    if (value.trend_period !== undefined) {
      value.trend_period = Number(value.trend_period);
    }
    fireEvent(this, "config-changed", { config: value });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [STAT_CARD_EDITOR_NAME]: NvisionStatCardEditor;
  }
}
