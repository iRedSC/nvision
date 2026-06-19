import type { PropertyValues, TemplateResult } from "lit";
import { css, html, LitElement, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators";
import type { HassEntity } from "home-assistant-js-websocket";
import { mockFrontend } from "../../../../demo/src/stubs/frontend";
import { mockIcons } from "../../../../demo/src/stubs/icons";
import { mockSensor } from "../../../../demo/src/stubs/sensor";
import demoStates from "../../data/demo_states.js";
import { provideHass } from "../../../../src/fake_data/provide_hass";
import type { MockHomeAssistant } from "../../../../src/fake_data/provide_hass";
import "../../../../src/panels/lovelace/cards/hui-card";
import type { LovelaceCardConfig } from "../../../../src/data/lovelace/config/card";
import type { HomeAssistant } from "../../../../src/types";
import "../../nvision-dev/nvision";

interface RegisteredCard {
  type: string;
  name: string;
  description: string;
}

interface GalleryCard {
  name: string;
  description: string;
  config: LovelaceCardConfig;
}

@customElement("nvision-entity-panel")
class NvisionEntityPanel extends LitElement {
  @property({ attribute: false }) public hass?: MockHomeAssistant;

  @state() private _selected = "";

  @state() private _state = "";

  @state() private _friendlyName = "";

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has("hass") && this.hass && !this._selected) {
      const ids = Object.keys(this.hass.states).sort();
      if (ids.length) {
        this._select(ids[0]);
      }
    }
  }

  protected render() {
    if (!this.hass) {
      return nothing;
    }

    const ids = Object.keys(this.hass.states).sort();

    return html`
      <header>
        <h2>Entities</h2>
        <p>Edit mock entity state. Cards update live.</p>
      </header>

      <label>
        Entity
        <select @change=${this._onEntityChange}>
          ${ids.map(
            (id) => html`
              <option value=${id} ?selected=${id === this._selected}>
                ${id}
              </option>
            `
          )}
        </select>
      </label>

      <label>
        State
        <input .value=${this._state} @input=${this._onStateInput} />
      </label>

      <label>
        Friendly name
        <input .value=${this._friendlyName} @input=${this._onNameInput} />
      </label>

      <button type="button" @click=${this._apply}>Apply</button>
    `;
  }

  private _onEntityChange(ev: Event): void {
    this._select((ev.target as HTMLSelectElement).value);
  }

  private _select(entityId: string): void {
    if (!this.hass) return;

    this._selected = entityId;
    const stateObj = this.hass.states[entityId];
    this._state = stateObj?.state ?? "";
    this._friendlyName =
      (stateObj?.attributes.friendly_name as string | undefined) ?? "";
  }

  private _onStateInput(ev: Event): void {
    this._state = (ev.target as HTMLInputElement).value;
  }

  private _onNameInput(ev: Event): void {
    this._friendlyName = (ev.target as HTMLInputElement).value;
  }

  private _apply(): void {
    if (!this.hass || !this._selected) return;

    const current = this.hass.states[this._selected];
    if (!current) return;

    const next: HassEntity = {
      ...current,
      state: this._state,
      attributes: {
        ...current.attributes,
        friendly_name: this._friendlyName || undefined,
      },
    };

    this.hass.updateStates({ [this._selected]: next });
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 16px;
      background: var(--card-background-color);
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-lg);
      box-sizing: border-box;
    }

    header h2 {
      margin: 0 0 4px;
      font-size: var(--ha-font-size-l);
      font-weight: 500;
    }

    header p {
      margin: 0;
      font-size: var(--ha-font-size-s);
      color: var(--secondary-text-color);
    }

    label {
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-size: var(--ha-font-size-s);
    }

    select,
    input,
    button {
      font: inherit;
      padding: 8px;
      border-radius: var(--ha-border-radius-sm);
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: inherit;
    }

    button {
      cursor: pointer;
      background: var(--primary-color);
      border-color: transparent;
      color: var(--text-primary-color);
    }
  `;
}

@customElement("demo-nvision-cards")
class DemoNvisionCards extends LitElement {
  @query("#demos") private _demoRoot!: HTMLElement;

  @state() private _hass?: MockHomeAssistant;

  @state() private _cards: GalleryCard[] = [];

  protected render(): TemplateResult {
    return html`
      <div id="demos" class="layout">
        <nvision-entity-panel .hass=${this._hass}></nvision-entity-panel>
        <div class="cards">
          ${this._cards.map(
            (card) => html`
              <section>
                <div class="meta">
                  <h2>${card.name}</h2>
                  <p>${card.description}</p>
                  <code>${card.config.type}</code>
                </div>
                <hui-card
                  .hass=${this._hass}
                  .config=${card.config}
                  preview
                ></hui-card>
              </section>
            `
          )}
        </div>
      </div>
    `;
  }

  protected firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);

    const hass = provideHass(this._demoRoot);
    mockFrontend(hass);
    mockIcons(hass);
    mockSensor(hass);
    hass.updateTranslations(null, "en");
    hass.updateTranslations("lovelace", "en");
    hass.updateStates(demoStates);
    patchCallService(hass);

    this._hass = hass;
    this._cards = buildGalleryCards(hass);
  }

  static styles = css`
    .layout {
      display: grid;
      grid-template-columns: minmax(260px, 320px) 1fr;
      gap: 24px;
      align-items: start;
    }

    .cards {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    section {
      display: grid;
      grid-template-columns: minmax(200px, 260px) minmax(280px, 420px);
      gap: 24px;
      align-items: start;
      padding-bottom: 32px;
      border-bottom: 1px solid var(--divider-color);
    }

    section:last-child {
      border-bottom: none;
    }

    .meta h2 {
      margin: 0 0 8px;
      font-size: var(--ha-font-size-l);
      font-weight: 500;
    }

    .meta p {
      margin: 0 0 12px;
      color: var(--secondary-text-color);
      font-size: var(--ha-font-size-s);
    }

    .meta code {
      font-size: var(--ha-font-size-xs);
      color: var(--secondary-text-color);
    }

    hui-card {
      display: block;
      width: 100%;
    }

    @media (max-width: 900px) {
      .layout,
      section {
        grid-template-columns: 1fr;
      }
    }
  `;
}

function getRegisteredCards(): RegisteredCard[] {
  const windowWithCards = window as Window & {
    customCards?: RegisteredCard[];
  };
  return windowWithCards.customCards ?? [];
}

function buildGalleryCards(hass: HomeAssistant): GalleryCard[] {
  const entityIds = Object.keys(hass.states);
  const fallback = entityIds;

  return getRegisteredCards().map((card) => {
    const element = customElements.get(card.type) as {
      getStubConfig?: (
        hass: HomeAssistant,
        entities: string[],
        entitiesFallback: string[]
      ) => LovelaceCardConfig;
    } | null;

    const config = element?.getStubConfig
      ? element.getStubConfig(hass, entityIds, fallback)
      : {
          type: `custom:${card.type}`,
          entity: entityIds[0],
        };

    return {
      name: card.name,
      description: card.description,
      config,
    };
  });
}

function patchCallService(hass: MockHomeAssistant): void {
  const original = hass.callService.bind(hass);

  hass.callService = async (domain, service, data) => {
    const entityId = data?.entity_id;
    if (!entityId) {
      return original(domain, service, data);
    }

    const ids = Array.isArray(entityId) ? entityId : [entityId];
    const updates: Record<string, HassEntity> = {};

    for (const id of ids) {
      const current = hass.states[id];
      if (!current) continue;

      if (service === "toggle") {
        updates[id] = {
          ...current,
          state: current.state === "on" ? "off" : "on",
        };
        continue;
      }

      if (domain === "light" && service === "turn_on") {
        updates[id] = { ...current, state: "on" };
        continue;
      }

      if (domain === "light" && service === "turn_off") {
        updates[id] = { ...current, state: "off" };
        continue;
      }

      if (domain === "input_number" && service === "set_value") {
        updates[id] = {
          ...current,
          state: String(data?.value ?? current.state),
        };
      }
    }

    if (Object.keys(updates).length) {
      hass.updateStates(updates);
      return;
    }

    return original(domain, service, data);
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-nvision-cards": DemoNvisionCards;
    "nvision-entity-panel": NvisionEntityPanel;
  }
}
