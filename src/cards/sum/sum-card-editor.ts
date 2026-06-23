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
import type { SumCardConfig, SumEntityConfig } from "./sum-card-config";
import { resolveSumEntities } from "./sum-card-config";

const SCHEMA: HaFormSchema[] = [
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

const ENTITY_PANEL_SCHEMA: HaFormSchema[] = [
  { name: "name", selector: { text: {} } },
  {
    name: "icon",
    selector: { icon: {} },
    context: { icon_entity: "entity" },
  },
];

let editorComponentsLoad: Promise<void> | undefined;

async function loadBuiltInEditor(
  type: string,
  config: Record<string, unknown>
): Promise<void> {
  const loadHelpers = (
    window as Window & {
      loadCardHelpers?: () => Promise<{
        createCardElement: (
          cardConfig: Record<string, unknown>
        ) => Promise<{ constructor: { getConfigElement?: () => Promise<unknown> } }>;
      }>;
    }
  ).loadCardHelpers;

  if (!loadHelpers) {
    return;
  }

  const helpers = await loadHelpers();
  const card = await helpers.createCardElement({ type, ...config });
  await card.constructor.getConfigElement?.();
}

async function ensureEditorComponentsLoaded(): Promise<void> {
  if (
    customElements.get("ha-entity-picker") &&
    (customElements.get("ha-icon-picker") ||
      customElements.get("ha-selector-icon"))
  ) {
    return;
  }

  if (!editorComponentsLoad) {
    editorComponentsLoad = (async () => {
      if (!customElements.get("ha-entity-picker")) {
        const glanceCard = customElements.get("hui-glance-card") as
          | { getConfigElement?: () => Promise<unknown> }
          | undefined;

        if (glanceCard?.getConfigElement) {
          await glanceCard.getConfigElement();
        } else {
          await loadBuiltInEditor("glance", { entities: [] });
        }
      }

      if (
        !customElements.get("ha-icon-picker") &&
        !customElements.get("ha-selector-icon")
      ) {
        await loadBuiltInEditor("light", { entity: "light.example" });
      }
    })();
  }

  await editorComponentsLoad;
}

@customElement(SUM_CARD_EDITOR_NAME)
export class NvisionSumCardEditor
  extends NvisionBaseElement
  implements LovelaceCardEditor
{
  @state() private _config?: SumCardConfig;

  @state() private _componentsReady =
    customElements.get("ha-entity-picker") &&
    (customElements.get("ha-icon-picker") ||
      customElements.get("ha-selector-icon"))
      ? true
      : false;

  @state() private _expandedIndex?: number;

  public setConfig(config: SumCardConfig): void {
    this._config = {
      entities: [],
      columns: DEFAULT_COLUMNS,
      theme: DEFAULT_THEME,
      ...config,
    };
  }

  connectedCallback(): void {
    super.connectedCallback();
    void ensureEditorComponentsLoaded()
      .then(() => {
        this._componentsReady = true;
      })
      .catch(() => {
        this._componentsReady = false;
      });
  }

  private _entityPanelLabel = (schema: HaFormSchema) => {
    if (!this.hass) {
      return undefined;
    }

    if (schema.name === "name") {
      return this.hass.localize(
        "ui.panel.lovelace.editor.card.generic.name"
      );
    }

    if (schema.name === "icon") {
      return this.hass.localize(
        "ui.panel.lovelace.editor.card.generic.icon"
      );
    }

    return undefined;
  };

  private _computeLabel = (schema: HaFormSchema) => {
    if (!this.hass) {
      return undefined;
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
      ${this._renderEntitiesEditor()}
      <ha-form
        .hass=${this.hass}
        .data=${this._settingsData()}
        .schema=${SCHEMA}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._settingsChanged}
      ></ha-form>
    `;
  }

  private _settingsData(): Omit<SumCardConfig, "entities"> {
    const { entities: _entities, ...settings } = this._config ?? {
      type: "",
    };
    return settings as Omit<SumCardConfig, "entities">;
  }

  private _renderEntitiesEditor() {
    const entries = this._config?.entities ?? [];
    const resolved = resolveSumEntities(entries);

    return html`
      <div class="entities-editor">
        <div class="section-title">Entities</div>
        ${resolved.length
          ? html`
              <div class="entity-list">
                ${resolved.map((entry, index) => {
                  const expanded = this._expandedIndex === index;
                  const displayName =
                    entry.name ??
                    this.hass?.states[entry.entityId]?.attributes
                      .friendly_name ??
                    entry.entityId;

                  return html`
                    <div class="entity-row ${expanded ? "expanded" : ""}">
                      <button
                        type="button"
                        class="entity-summary"
                        aria-expanded=${expanded}
                        @click=${() => this._toggleRow(index)}
                      >
                        ${entry.icon
                          ? html`<ha-icon
                              class="entity-preview"
                              .icon=${entry.icon}
                            ></ha-icon>`
                          : html`<ha-state-icon
                              class="entity-preview"
                              .hass=${this.hass}
                              .stateObj=${this.hass?.states[entry.entityId]}
                            ></ha-state-icon>`}
                        <span class="entity-name">${displayName}</span>
                        <ha-icon
                          class="chevron"
                          .icon=${expanded
                            ? "mdi:chevron-up"
                            : "mdi:chevron-down"}
                        ></ha-icon>
                      </button>
                      ${expanded
                        ? html`
                            <div class="entity-panel">
                              <ha-form
                                class="entity-panel-form"
                                .hass=${this.hass}
                                .data=${{
                                  entity: entry.entityId,
                                  name: entry.name ?? "",
                                  icon: entry.icon ?? "",
                                }}
                                .schema=${ENTITY_PANEL_SCHEMA}
                                .computeLabel=${this._entityPanelLabel}
                                @value-changed=${(ev: CustomEvent) =>
                                  this._entityPanelChanged(index, ev)}
                              ></ha-form>
                              <button
                                type="button"
                                class="remove"
                                @click=${() => this._removeEntity(index)}
                              >
                                Remove entity
                              </button>
                            </div>
                          `
                        : nothing}
                    </div>
                  `;
                })}
              </div>
            `
          : html`<div class="empty">No entities selected</div>`}
        ${this._componentsReady
          ? html`
              <ha-entity-picker
                .hass=${this.hass}
                .includeDomains=${["sensor"]}
                .label=${"Add entity"}
                .value=${""}
                allow-custom-entity
                @value-changed=${this._addEntity}
              ></ha-entity-picker>
            `
          : html`
              <ha-form
                .hass=${this.hass}
                .data=${{ entity: "" }}
                .schema=${[
                  { name: "entity", selector: { entity: { domain: "sensor" } } },
                ]}
                @value-changed=${this._addEntityFromForm}
              ></ha-form>
            `}
      </div>
    `;
  }

  private _addEntity(ev: CustomEvent): void {
    const entityId = ev.detail.value;
    if (typeof entityId !== "string" || !entityId) {
      return;
    }

    const entities = [...(this._config?.entities ?? [])];
    if (resolveSumEntities(entities).some((entry) => entry.entityId === entityId)) {
      return;
    }

    this._expandedIndex = entities.length;
    this._emitConfig({ entities: [...entities, entityId] });
  }

  private _toggleRow(index: number): void {
    this._expandedIndex = this._expandedIndex === index ? undefined : index;
  }

  private _addEntityFromForm(ev: CustomEvent): void {
    this._addEntity(new CustomEvent("value-changed", {
      detail: { value: ev.detail.value.entity },
    }));
  }

  private _removeEntity(index: number): void {
    const entities = [...(this._config?.entities ?? [])];
    entities.splice(index, 1);

    if (this._expandedIndex === index) {
      this._expandedIndex = undefined;
    } else if (
      this._expandedIndex !== undefined &&
      this._expandedIndex > index
    ) {
      this._expandedIndex -= 1;
    }

    this._emitConfig({ entities });
  }

  private _entityPanelChanged(index: number, ev: CustomEvent): void {
    const { name, icon } = ev.detail.value as {
      name?: string;
      icon?: string;
    };

    this._applyEntityOverrides(index, name, icon);
  }

  private _applyEntityOverrides(
    index: number,
    name?: string,
    icon?: string
  ): void {
    const entities = [...(this._config?.entities ?? [])];
    const current = entities[index];
    const entityId =
      typeof current === "string" ? current : current?.entity;

    if (!entityId) {
      return;
    }

    const next: SumEntityConfig =
      typeof current === "string" ? { entity: entityId } : { ...current };

    const trimmedName = name?.trim() ?? "";
    const trimmedIcon = icon?.trim() ?? "";

    if (trimmedName) {
      next.name = trimmedName;
    } else {
      delete next.name;
    }

    if (trimmedIcon) {
      next.icon = trimmedIcon;
    } else {
      delete next.icon;
    }

    if (!next.name && !next.icon && !next.image) {
      entities[index] = entityId;
    } else {
      entities[index] = next;
    }

    this._emitConfig({ entities });
  }

  private _settingsChanged(ev: CustomEvent): void {
    this._emitConfig(ev.detail.value);
  }

  private _emitConfig(changes: Partial<SumCardConfig>): void {
    fireEvent(this, "config-changed", {
      config: {
        ...this._config,
        ...changes,
      },
    });
  }

  static styles = css`
    :host {
      display: block;
    }

    .entities-editor {
      display: block;
      margin-bottom: 16px;
    }

    .section-title {
      color: var(--secondary-text-color);
      font-size: 12px;
      font-weight: var(--ha-font-weight-medium, 500);
      margin: 0 0 8px;
    }

    .entity-list {
      display: grid;
      gap: 6px;
      margin-bottom: 12px;
    }

    .entity-row {
      border: 1px solid var(--divider-color);
      border-radius: 6px;
      box-sizing: border-box;
      overflow: hidden;
    }

    .entity-row.expanded {
      border-color: color-mix(
        in srgb,
        var(--primary-color) 35%,
        var(--divider-color)
      );
    }

    .entity-summary {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      min-height: 44px;
      padding: 0 12px;
      border: 0;
      background: transparent;
      color: var(--primary-text-color);
      cursor: pointer;
      font: inherit;
      text-align: left;
      box-sizing: border-box;
    }

    .entity-summary:hover {
      background: color-mix(
        in srgb,
        var(--primary-color) 8%,
        transparent
      );
    }

    .entity-preview {
      flex: none;
      color: var(--primary-text-color);
      --mdc-icon-size: 20px;
    }

    .entity-name {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .chevron {
      flex: none;
      color: var(--secondary-text-color);
      --mdc-icon-size: 20px;
    }

    .entity-panel {
      display: grid;
      gap: 8px;
      padding: 0 0 12px;
      border-top: 1px solid var(--divider-color);
    }

    .entity-panel-form {
      display: block;
      padding: 0 12px;
    }

    .remove {
      justify-self: start;
      border: 0;
      background: transparent;
      color: var(--error-color, #f44336);
      padding: 0 12px;
      cursor: pointer;
      font: inherit;
      font-size: 13px;
    }

    .remove:hover {
      text-decoration: underline;
    }

    .empty {
      color: var(--secondary-text-color);
      margin-bottom: 12px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [SUM_CARD_EDITOR_NAME]: NvisionSumCardEditor;
  }
}
