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
  DEFAULT_COLUMNS,
  DEFAULT_THEME,
  SUM_CARD_EDITOR_NAME,
  SUM_THEME_OPTIONS,
} from "./const";
import type { SumCardConfig } from "./sum-card-config";

const SCHEMA: HaFormSchema[] = [
  {
    name: "entities",
    selector: { entities: { domain: "sensor" } },
  },
  {
    name: "columns",
    default: DEFAULT_COLUMNS,
    selector: { number: { min: 1, max: 6, mode: "box" } },
  },
  {
    name: "theme",
    default: DEFAULT_THEME,
    selector: {
      select: {
        options: [...SUM_THEME_OPTIONS],
        mode: "dropdown",
      },
    },
  },
  { name: "name", selector: { text: {} } },
  interactionEditorSchema(),
];

@customElement(SUM_CARD_EDITOR_NAME)
export class NvisionSumCardEditor
  extends NvisionBaseElement
  implements LovelaceCardEditor
{
  @state() private _config?: SumCardConfig;

  public setConfig(config: SumCardConfig): void {
    this._config = {
      entities: [],
      columns: DEFAULT_COLUMNS,
      theme: DEFAULT_THEME,
      ...config,
    };
  }

  private _computeLabel = (schema: HaFormSchema) => {
    if (!this.hass) {
      return undefined;
    }

    if (schema.name === "entities") {
      return this.hass.localize(
        "ui.panel.lovelace.editor.card.generic.entities"
      );
    }

    if (schema.name === "columns") {
      return this.hass.localize(
        "ui.panel.lovelace.editor.card.generic.columns"
      );
    }

    if (schema.name === "theme") {
      return "Theme";
    }

    if (schema.name === "name") {
      return this.hass.localize(
        "ui.panel.lovelace.editor.card.generic.name"
      );
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
    [SUM_CARD_EDITOR_NAME]: NvisionSumCardEditor;
  }
}
