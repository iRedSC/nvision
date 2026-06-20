import { html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { HaFormSchema, LovelaceCardEditor } from "../../types";
import { fireEvent } from "../../types";
import { NvisionBaseElement } from "../../utils/base-element";
import {
  computeInteractionLabel,
  interactionEditorSchema,
} from "../../utils/interaction-schema";
import type { ReactorCoreCardConfig } from "./reactor-core-card-config";
import {
  DEFAULT_INFO_SELECTION,
  DEFAULT_MAX,
  DEFAULT_MAX_PARTICLES,
  DEFAULT_MIN,
  DEFAULT_MODE,
  DEFAULT_SHOW_INFO,
  DEFAULT_SHOW_INFO_CHANGE,
  REACTOR_CORE_CARD_EDITOR_NAME,
  REACTOR_ENTITY_DOMAINS,
} from "./const";

const BASE_SCHEMA: HaFormSchema[] = [
  { name: "name", selector: { text: {} } },
  {
    name: "mode",
    required: true,
    default: DEFAULT_MODE,
    selector: {
      select: {
        options: [
          { value: "auto", label: "Auto-discover entities" },
          { value: "manual", label: "Manual entity list" },
        ],
      },
    },
  },
  {
    name: "max_particles",
    default: DEFAULT_MAX_PARTICLES,
    selector: { number: { min: 4, max: 64, mode: "box" } },
  },
  {
    name: "info_selection",
    required: true,
    default: DEFAULT_INFO_SELECTION,
    selector: {
      select: {
        options: [
          { value: "on_update", label: "On update" },
          { value: "random_interval", label: "Random every 10s" },
          { value: "nearest_cursor", label: "Nearest 4 to cursor/tap" },
        ],
      },
    },
  },
  {
    name: "show_info",
    default: DEFAULT_SHOW_INFO,
    selector: { boolean: {} },
  },
  {
    name: "show_info_change",
    default: DEFAULT_SHOW_INFO_CHANGE,
    selector: { boolean: {} },
  },
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
  interactionEditorSchema(),
];

const MANUAL_SCHEMA: HaFormSchema[] = [
  {
    name: "entities",
    selector: {
      entity: { multiple: true, domain: [...REACTOR_ENTITY_DOMAINS] },
    },
  },
];

@customElement(REACTOR_CORE_CARD_EDITOR_NAME)
export class NvisionReactorCoreCardEditor
  extends NvisionBaseElement
  implements LovelaceCardEditor
{
  @state() private _config?: ReactorCoreCardConfig;

  public setConfig(config: ReactorCoreCardConfig): void {
    this._config = {
      mode: DEFAULT_MODE,
      max_particles: DEFAULT_MAX_PARTICLES,
      min: DEFAULT_MIN,
      max: DEFAULT_MAX,
      entities: [],
      ...config,
    };
  }

  private _schema(): HaFormSchema[] {
    if (this._config?.mode === "manual") {
      return [...BASE_SCHEMA.slice(0, 3), ...MANUAL_SCHEMA, ...BASE_SCHEMA.slice(3)];
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

    if (schema.name === "mode") {
      return "Entity source";
    }

    if (schema.name === "entities") {
      return this.hass.localize(
        "ui.panel.lovelace.editor.card.generic.entities"
      );
    }

    if (schema.name === "max_particles") {
      return "Maximum particles";
    }

    if (schema.name === "info_selection") {
      return "Info card selection";
    }

    if (schema.name === "show_info") {
      return "Show info cards";
    }

    if (schema.name === "show_info_change") {
      return "Show value change (10W → 50W)";
    }

    if (schema.name === "min") {
      return "Numeric orbit min";
    }

    if (schema.name === "max") {
      return "Numeric orbit max";
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
        .schema=${this._schema()}
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
    [REACTOR_CORE_CARD_EDITOR_NAME]: NvisionReactorCoreCardEditor;
  }
}
