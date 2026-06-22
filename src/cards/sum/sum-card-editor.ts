import { css, html, nothing } from "lit";
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
import { normalizeEditorEntities } from "./sum-card-config";

const ENTITIES_SCHEMA: HaFormSchema[] = [
  {
    name: "entities",
    selector: { entities: { domain: ["sensor"] } },
  },
];

const SETTINGS_SCHEMA: HaFormSchema[] = [
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

let entitiesEditorLoad: Promise<void> | undefined;

async function ensureEntitiesEditorLoaded(): Promise<void> {
  if (entitiesEditorLoad) {
    return entitiesEditorLoad;
  }

  entitiesEditorLoad = (async () => {
    const entitiesCard = customElements.get("hui-entities-card") as
      | { getConfigElement?: () => Promise<unknown> }
      | undefined;

    if (entitiesCard?.getConfigElement) {
      await entitiesCard.getConfigElement();
      return;
    }

    const loadHelpers = (
      window as Window & {
        loadCardHelpers?: () => Promise<{
          createCardElement: (
            config: Record<string, unknown>
          ) => Promise<unknown>;
        }>;
      }
    ).loadCardHelpers;

    if (loadHelpers) {
      const helpers = await loadHelpers();
      await helpers.createCardElement({ type: "entities", entities: [] });
    }
  })();

  return entitiesEditorLoad;
}

@customElement(SUM_CARD_EDITOR_NAME)
export class NvisionSumCardEditor
  extends NvisionBaseElement
  implements LovelaceCardEditor
{
  @state() private _config?: SumCardConfig;

  @state() private _entitiesEditorReady = false;

  connectedCallback(): void {
    super.connectedCallback();
    void ensureEntitiesEditorLoaded().then(() => {
      this._entitiesEditorReady = true;
    });
  }

  public setConfig(config: SumCardConfig): void {
    this._config = {
      columns: DEFAULT_COLUMNS,
      theme: DEFAULT_THEME,
      ...config,
      entities: normalizeEditorEntities(config.entities),
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

    if (!this._entitiesEditorReady) {
      return html`<div class="loading">Loading editor…</div>`;
    }

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${{ entities: this._config.entities }}
        .schema=${ENTITIES_SCHEMA}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._entitiesChanged}
      ></ha-form>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SETTINGS_SCHEMA}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._settingsChanged}
      ></ha-form>
    `;
  }

  private _entitiesChanged(ev: CustomEvent): void {
    fireEvent(this, "config-changed", {
      config: {
        ...this._config,
        entities: normalizeEditorEntities(ev.detail.value.entities),
      },
    });
  }

  private _settingsChanged(ev: CustomEvent): void {
    fireEvent(this, "config-changed", {
      config: {
        ...this._config,
        ...ev.detail.value,
        entities: this._config?.entities ?? [],
      },
    });
  }

  static styles = css`
    :host {
      display: block;
    }

    .loading {
      padding: 16px;
      color: var(--secondary-text-color);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [SUM_CARD_EDITOR_NAME]: NvisionSumCardEditor;
  }
}
