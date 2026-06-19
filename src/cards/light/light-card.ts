import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardEditor,
  LovelaceGridOptions,
} from "../../types";
import { fireEvent } from "../../types";
import { registerCustomCard } from "../../utils/custom-cards";
import {
  lightBrightnessFactor,
  lightIconBrightnessFilter,
  lightSupportsBrightness,
  resolveLightColor,
} from "../../utils/light-color";
import { handleLovelaceAction } from "../../utils/lovelace-actions";
import { ensureLightGlowStacking } from "../../utils/light-glow-stack";
import type { LightCardConfig } from "./light-card-config";
import {
  DEFAULT_GLOW_INTENSITY,
  DEFAULT_GLOW_SIZE,
  GLOW_SPREAD_FACTOR,
  LIGHT_CARD_EDITOR_NAME,
  LIGHT_CARD_NAME,
} from "./const";

registerCustomCard({
  type: LIGHT_CARD_NAME,
  name: "Nvision Light",
  description: "Light control with ambient color glow",
});

ensureLightGlowStacking(LIGHT_CARD_NAME);

@customElement(LIGHT_CARD_NAME)
export class NvisionLightCard extends LitElement implements LovelaceCard {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("./light-card-editor");
    return document.createElement(LIGHT_CARD_EDITOR_NAME) as LovelaceCardEditor;
  }

  public static getStubConfig(
    hass: HomeAssistant,
    entities: string[],
    entitiesFallback: string[]
  ): LightCardConfig {
    const entity =
      entities.find((id) => id.startsWith("light.")) ||
      entitiesFallback.find((id) => id.startsWith("light.")) ||
      Object.keys(hass.states).find((id) => id.startsWith("light.")) ||
      entities[0] ||
      entitiesFallback[0] ||
      "";

    return {
      type: `custom:${LIGHT_CARD_NAME}`,
      entity,
      glow_size: DEFAULT_GLOW_SIZE,
      glow_intensity: DEFAULT_GLOW_INTENSITY,
    };
  }

  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: LightCardConfig;

  private _brightnessTimeout?: number;

  private _holdTimer?: number;

  private _holdTriggered = false;

  public setConfig(config: LightCardConfig): void {
    if (!config.entity || config.entity.split(".")[0] !== "light") {
      throw new Error("Specify an entity from within the light domain");
    }

    this._config = {
      tap_action: { action: "toggle" },
      hold_action: { action: "more-info" },
      glow_size: DEFAULT_GLOW_SIZE,
      glow_intensity: DEFAULT_GLOW_INTENSITY,
      ...config,
    };
  }

  public getCardSize(): number {
    return 5;
  }

  public getGridOptions(): LovelaceGridOptions {
    return { columns: 6, rows: 5, min_rows: 3 };
  }

  protected render() {
    if (!this._config || !this.hass) {
      return nothing;
    }

    const stateObj = this._config.entity
      ? this.hass.states[this._config.entity]
      : undefined;

    if (!stateObj) {
      return html`
        <ha-card>
          <div class="warning">Entity not found: ${this._config.entity}</div>
        </ha-card>
      `;
    }

    const brightness = Math.round(
      ((stateObj.attributes.brightness || 0) / 255) * 100
    );
    const isOn = stateObj.state === "on";
    const isUnavailable =
      stateObj.state === "unavailable" || stateObj.state === "unknown";
    const supportsBrightness = lightSupportsBrightness(stateObj);
    const bulbColor = resolveLightColor(stateObj);
    const brightnessFactor = lightBrightnessFactor(stateObj);
    const glowSize = this._config.glow_size ?? DEFAULT_GLOW_SIZE;
    const glowIntensity =
      (this._config.glow_intensity ?? DEFAULT_GLOW_INTENSITY) *
      brightnessFactor;
    const glowSpread = glowSize * GLOW_SPREAD_FACTOR;

    const name =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      this._config.entity;

    const iconStyle = {
      filter: lightIconBrightnessFilter(stateObj),
      color: isOn && stateObj.attributes.rgb_color
        ? `rgb(${stateObj.attributes.rgb_color.join(",")})`
        : "",
    };

    const glowVars = {
      "--bulb-color": bulbColor,
      "--nv-glow-size": `${glowSize}%`,
      "--nv-glow-intensity": String(glowIntensity),
      "--nv-glow-spread": `${glowSpread}px`,
    };

    return html`
      <div
        class=${classMap({ stage: true, "state-on": isOn, "state-off": !isOn })}
        style=${styleMap(glowVars)}
      >
        <div class="glow-backdrop" aria-hidden="true"></div>
        <div class="glow-ambient" aria-hidden="true"></div>

        <ha-card class=${classMap({ "state-on": isOn, "state-off": !isOn })}>
          <ha-icon-button
            class="more-info"
            .path=${"M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"}
            @click=${this._handleMoreInfo}
          ></ha-icon-button>

          <div class="content">
          <div id="controls">
            <div id="slider">
              <round-slider
                min="1"
                max="100"
                .value=${brightness}
                .disabled=${isUnavailable}
                style=${styleMap({
                  visibility: supportsBrightness ? "visible" : "hidden",
                })}
                @value-changing=${this._dragBrightness}
                @value-changed=${this._setBrightness}
              ></round-slider>
              <ha-icon-button
                class=${classMap({
                  "light-button": true,
                  "state-on": isOn,
                  "state-unavailable": isUnavailable,
                })}
                style=${styleMap(iconStyle)}
                @click=${this._handleTap}
                @dblclick=${this._handleDoubleTap}
                @pointerdown=${this._handleHoldStart}
                @pointerup=${this._handleHoldEnd}
                @pointerleave=${this._handleHoldEnd}
                @pointercancel=${this._handleHoldEnd}
              >
                <ha-state-icon
                  .hass=${this.hass}
                  .stateObj=${stateObj}
                  .overrideIcon=${this._config.icon}
                ></ha-state-icon>
              </ha-icon-button>
            </div>
          </div>
          <div id="info">
            ${isUnavailable
              ? html`<div class="state-label">${stateObj.state}</div>`
              : html`
                  <div class="brightness">
                    ${brightness}<span class="unit"> %</span>
                  </div>
                `}
            ${name}
          </div>
        </div>
        </ha-card>
      </div>
    `;
  }

  private _handleMoreInfo(): void {
    if (!this._config?.entity) {
      return;
    }

    fireEvent(this, "hass-more-info", { entityId: this._config.entity });
  }

  private _handleTap(ev: Event): void {
    if (this._holdTriggered) {
      this._holdTriggered = false;
      ev.preventDefault();
      return;
    }

    if (!this.hass || !this._config) {
      return;
    }

    handleLovelaceAction(this, this.hass, this._config, "tap");
  }

  private _handleDoubleTap(ev: Event): void {
    ev.preventDefault();
    if (!this.hass || !this._config) {
      return;
    }

    handleLovelaceAction(this, this.hass, this._config, "double_tap");
  }

  private _handleHoldStart(): void {
    window.clearTimeout(this._holdTimer);
    this._holdTriggered = false;
    this._holdTimer = window.setTimeout(() => {
      this._holdTriggered = true;
      if (this.hass && this._config) {
        handleLovelaceAction(this, this.hass, this._config, "hold");
      }
    }, 500);
  }

  private _handleHoldEnd(): void {
    window.clearTimeout(this._holdTimer);
  }

  private _dragBrightness(e: CustomEvent): void {
    const label = this.shadowRoot?.querySelector(".brightness");
    if (label) {
      label.innerHTML = `${e.detail.value}<span class="unit"> %</span>`;
      label.classList.add("show_brightness");
    }

    window.clearTimeout(this._brightnessTimeout);
    this._brightnessTimeout = window.setTimeout(() => {
      label?.classList.remove("show_brightness");
    }, 500);
  }

  private _setBrightness(e: CustomEvent): void {
    if (!this.hass || !this._config?.entity) {
      return;
    }

    this.hass.callService("light", "turn_on", {
      entity_id: this._config.entity,
      brightness_pct: e.detail.value,
    });
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
      overflow: visible;
      position: relative;
      z-index: 0;
    }

    .stage {
      position: relative;
      height: 100%;
      overflow: visible;
    }

    ha-card {
      height: 100%;
      box-sizing: border-box;
      position: relative;
      z-index: 1;
      overflow: hidden;
      text-align: center;
      --name-font-size: 1.2rem;
      --brightness-font-size: 1.2rem;
      background: var(--card-background-color);
    }

    ha-card.state-on {
      --ha-card-border-width: 0px;
      --ha-card-box-shadow: none;
      border: none;
      box-shadow: none;
    }

    .glow-backdrop {
      position: absolute;
      inset: calc(var(--nv-glow-spread, 48px) * -1);
      z-index: -1;
      pointer-events: none;
      background: radial-gradient(
        ellipse var(--nv-glow-size, 165%) var(--nv-glow-size, 165%) at 50% 42%,
        color-mix(
          in srgb,
          var(--bulb-color) calc(var(--nv-glow-intensity, 0) * 55%),
          transparent
        ),
        color-mix(
          in srgb,
          var(--bulb-color) calc(var(--nv-glow-intensity, 0) * 28%),
          transparent
        )
          45%,
        transparent 100%
      );
      filter: blur(calc(var(--nv-glow-spread, 48px) * 0.9));
      opacity: calc(0.45 + var(--nv-glow-intensity, 0) * 0.55);
      transition:
        opacity 0.45s ease,
        filter 0.45s ease;
    }

    .glow-ambient {
      position: absolute;
      inset: calc(var(--nv-glow-spread, 48px) * -0.5);
      z-index: -1;
      pointer-events: none;
      background: radial-gradient(
        ellipse 110% 95% at 50% 38%,
        color-mix(
          in srgb,
          var(--bulb-color) calc(var(--nv-glow-intensity, 0) * 40%),
          transparent
        ),
        transparent 100%
      );
      filter: blur(calc(var(--nv-glow-spread, 48px) * 0.35));
      transition: opacity 0.45s ease;
    }

    .stage.state-off .glow-backdrop,
    .stage.state-off .glow-ambient {
      opacity: 0;
    }

    .warning {
      padding: 16px;
      color: var(--error-color);
    }

    .more-info {
      position: absolute;
      cursor: pointer;
      top: 0;
      right: 0;
      inset-inline-start: initial;
      inset-inline-end: 0;
      border-radius: var(--ha-border-radius-pill, 9999px);
      color: var(--secondary-text-color);
      z-index: 2;
      direction: var(--direction);
    }

    .content {
      position: relative;
      z-index: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    #controls {
      display: flex;
      justify-content: center;
      padding: 16px;
      position: relative;
    }

    #slider {
      width: 100%;
      max-width: 200px;
      min-width: 100px;
      aspect-ratio: 1;
      position: relative;
      flex: none;
    }

    round-slider {
      --round-slider-path-color: var(--slider-track-color);
      --round-slider-bar-color: var(--primary-color);
      padding-bottom: 10%;
    }

    .light-button {
      color: var(--state-icon-color);
      width: 60%;
      height: auto;
      position: absolute;
      max-width: calc(100% - 40px);
      box-sizing: border-box;
      border-radius: var(--ha-border-radius-pill, 9999px);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      --ha-icon-button-size: 100%;
      --mdc-icon-size: min(72px, 100%);
    }

    .light-button.state-on {
      color: var(--state-light-active-color);
    }

    .light-button.state-unavailable {
      color: var(--state-unavailable-color);
    }

    #info {
      text-align: center;
      margin-top: -56px;
      padding: 16px;
      font-size: var(--name-font-size);
      color: var(--primary-text-color);
    }

    .brightness {
      font-size: var(--brightness-font-size);
      opacity: 0;
      transition: opacity 0.5s ease-in-out;
    }

    .state-label {
      font-size: var(--brightness-font-size);
      color: var(--secondary-text-color);
      text-transform: capitalize;
    }

    .brightness.show_brightness {
      opacity: 1;
    }

    .unit {
      font-size: 0.85em;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [LIGHT_CARD_NAME]: NvisionLightCard;
  }
}
