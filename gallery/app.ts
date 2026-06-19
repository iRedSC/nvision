import type { HassEntity } from "home-assistant-js-websocket";
import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { buildGalleryCards, type GalleryCard } from "./cards.js";
import { createMockHass, entityIds, type MockHass } from "./mock-hass.js";

@customElement("nvision-gallery")
export class NvisionGallery extends LitElement {
  @state() private _hass?: MockHass;

  @state() private _cards: GalleryCard[] = [];

  connectedCallback(): void {
    super.connectedCallback();
    this._hass = createMockHass(this);
    this._cards = buildGalleryCards(this._hass);
    this.addEventListener("hass-updated", this._onHassUpdated);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener("hass-updated", this._onHassUpdated);
  }

  private _onHassUpdated = (ev: Event): void => {
    this._hass = (ev as CustomEvent<MockHass>).detail;
  };

  protected render() {
    if (!this._hass) {
      return nothing;
    }

    return html`
      <aside>
        <nvision-entity-panel .hass=${this._hass}></nvision-entity-panel>
      </aside>
      <main>
        <header>
          <h1>nvision</h1>
          <p>${this._cards.length} card${this._cards.length === 1 ? "" : "s"}</p>
        </header>

        ${this._cards.map(
          (card) => html`
            <section>
              <div class="meta">
                <h2>${card.name}</h2>
                <p>${card.description}</p>
                <code>${card.config.type}</code>
              </div>
              <div class="preview">
                <hui-card
                  .hass=${this._hass}
                  .config=${card.config}
                  preview
                ></hui-card>
              </div>
            </section>
          `
        )}
      </main>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      min-height: 100vh;
      background: var(--primary-background-color);
      color: var(--primary-text-color);
    }

    main {
      flex: 1;
      padding: 24px;
      box-sizing: border-box;
    }

    header h1 {
      margin: 0;
      font-size: 1.75rem;
      font-weight: 500;
    }

    header p {
      margin: 4px 0 24px;
      color: var(--secondary-text-color);
    }

    section {
      display: grid;
      grid-template-columns: minmax(200px, 280px) minmax(280px, 420px);
      gap: 24px;
      align-items: start;
      margin-bottom: 32px;
      padding-bottom: 32px;
      border-bottom: 1px solid var(--divider-color);
    }

    section:last-child {
      border-bottom: none;
    }

    .meta h2 {
      margin: 0 0 8px;
      font-size: 1.125rem;
      font-weight: 500;
    }

    .meta p {
      margin: 0 0 12px;
      color: var(--secondary-text-color);
      font-size: 0.875rem;
    }

    .meta code {
      font-size: 0.75rem;
      color: var(--secondary-text-color);
    }

    .preview hui-card {
      display: block;
      width: 100%;
    }

    @media (max-width: 900px) {
      :host {
        flex-direction: column;
      }

      section {
        grid-template-columns: 1fr;
      }
    }
  `;
}

@customElement("nvision-entity-panel")
export class NvisionEntityPanel extends LitElement {
  @property({ attribute: false }) public hass?: MockHass;

  @state() private _selected = "";

  @state() private _state = "";

  @state() private _friendlyName = "";

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has("hass") && this.hass && !this._selected) {
      const ids = entityIds(this.hass);
      if (ids.length) {
        this._select(ids[0]);
      }
    }
  }

  protected render() {
    if (!this.hass) {
      return nothing;
    }

    const ids = entityIds(this.hass);

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
      border-right: 1px solid var(--divider-color);
      min-width: 280px;
      max-width: 320px;
      box-sizing: border-box;
    }

    header h2 {
      margin: 0 0 4px;
      font-size: var(--ha-font-size-l, 1.25rem);
      font-weight: 500;
    }

    header p {
      margin: 0;
      font-size: var(--ha-font-size-s, 0.875rem);
      color: var(--secondary-text-color);
    }

    label {
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-size: var(--ha-font-size-s, 0.875rem);
    }

    select,
    input,
    button {
      font: inherit;
      padding: 8px;
      border-radius: var(--ha-border-radius-sm, 4px);
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: inherit;
    }

    button {
      cursor: pointer;
      background: var(--primary-color);
      border-color: transparent;
      color: var(--text-primary-color, #fff);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "nvision-gallery": NvisionGallery;
    "nvision-entity-panel": NvisionEntityPanel;
  }
}

document.body.appendChild(document.createElement("nvision-gallery"));
