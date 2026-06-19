import { css, html, LitElement, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardEditor,
  LovelaceGridOptions,
} from "../../types";
import { registerCustomCard } from "../../utils/custom-cards";
import { formatStateWithUnit } from "../../utils/entity-state";
import {
  responsiveStateIconStyles,
  responsiveTileInfoStyles,
  responsiveTypeStyles,
} from "../../utils/responsive-type";
import {
  anchorCenter,
  DEFAULT_EFFECTS_MAX,
  DEFAULT_EFFECTS_MIN,
  DEFAULT_POWER_MAX,
  DEFAULT_POWER_MIN,
  effectIntensity,
  powerTint,
  INTENSITY_LERP,
  parseNumericState,
  PLUG_ICON,
  PowerLightningRenderer,
  resolveLightningColor,
  type LightningArc,
} from "../../utils/power-lightning";
import type { PowerDrawCardConfig } from "./power-draw-card-config";
import {
  POWER_DRAW_CARD_EDITOR_NAME,
  POWER_DRAW_CARD_NAME,
} from "./const";

registerCustomCard({
  type: POWER_DRAW_CARD_NAME,
  name: "Nvision Power Draw",
  description: "Power consumption with animated lightning from a plug",
});

@customElement(POWER_DRAW_CARD_NAME)
export class NvisionPowerDrawCard extends LitElement implements LovelaceCard {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("./power-draw-card-editor");
    return document.createElement(
      POWER_DRAW_CARD_EDITOR_NAME
    ) as LovelaceCardEditor;
  }

  public static getStubConfig(
    hass: HomeAssistant,
    entities: string[],
    entitiesFallback: string[]
  ): PowerDrawCardConfig {
    const entity =
      entities.find((id) => {
        const state = hass.states[id];
        return (
          state?.attributes.device_class === "power" ||
          id.includes("power") ||
          parseNumericState(state?.state) !== undefined
        );
      }) ||
      entities[0] ||
      entitiesFallback[0] ||
      Object.keys(hass.states)[0];

    return {
      type: `custom:${POWER_DRAW_CARD_NAME}`,
      entity,
      min: DEFAULT_POWER_MIN,
      max: DEFAULT_POWER_MAX,
    };
  }

  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: PowerDrawCardConfig;

  private _displayIntensity = 0;

  @query("canvas") private _canvas?: HTMLCanvasElement;

  @query(".plug") private _plug?: HTMLElement;

  @query(".entity-icon") private _entityIcon?: HTMLElement;

  private _renderer?: PowerLightningRenderer;

  public setConfig(config: PowerDrawCardConfig): void {
    this._config = {
      min: DEFAULT_POWER_MIN,
      max: DEFAULT_POWER_MAX,
      effects_min: DEFAULT_EFFECTS_MIN,
      effects_max: DEFAULT_EFFECTS_MAX,
      ...config,
    };
  }

  public getCardSize(): number {
    return 1;
  }

  public getGridOptions(): LovelaceGridOptions {
    return { columns: 6, rows: 1 };
  }

  disconnectedCallback(): void {
    this._renderer?.detach();
    super.disconnectedCallback();
  }

  protected firstUpdated(): void {
    this._syncLightningTheme();
    requestAnimationFrame(() => this._ensureRenderer());
  }

  protected updated(): void {
    this._syncLightningTheme();
    requestAnimationFrame(() => this._ensureRenderer());
  }

  private _lightningColor(): string {
    return resolveLightningColor(this._config?.color, this);
  }

  private _syncLightningTheme(): void {
    this.style.setProperty("--lightning-color", this._lightningColor());
    this.style.setProperty(
      "--lightning-glow",
      String(powerTint(this._displayIntensity))
    );
  }

  private _targetIntensity(): number {
    const entity = this._config?.entity;
    const state = entity ? this.hass?.states[entity]?.state : undefined;
    const value = parseNumericState(state);
    return effectIntensity(value, this._config ?? {});
  }

  private _tickIntensity(delta: number): number {
    const target = this._targetIntensity();
    const diff = target - this._displayIntensity;

    if (Math.abs(diff) < 0.001) {
      this._displayIntensity = target;
    } else {
      this._displayIntensity += diff * INTENSITY_LERP * delta;
    }

    this._syncLightningTheme();
    return this._displayIntensity;
  }

  private _ensureRenderer(): void {
    const canvas = this._canvas;
    if (!canvas) {
      return;
    }

    if (!this._renderer) {
      this._renderer = new PowerLightningRenderer(
        this,
        () => this._buildArcs(),
        () => this._lightningColor(),
        (delta) => {
          this._tickIntensity(delta);
        }
      );
    }

    this._renderer.attach(canvas);
  }

  private _buildArcs(): LightningArc[] {
    const canvas = this._canvas;
    if (!canvas) {
      return [];
    }

    const plug = anchorCenter(this._plug, canvas, "center");
    const entity = anchorCenter(this._entityIcon, canvas, "center");

    if (!plug || !entity) {
      return [];
    }

    return [{ from: plug, to: entity, intensity: this._displayIntensity }];
  }

  protected render() {
    if (!this._config || !this.hass) {
      return nothing;
    }

    const stateObj = this._config.entity
      ? this.hass.states[this._config.entity]
      : undefined;

    const name =
      this._config.name ||
      stateObj?.attributes.friendly_name ||
      "Power Draw";

    const value = formatStateWithUnit(stateObj);

    return html`
      <ha-card>
        <div class="stage">
          <div class="content">
            ${stateObj
              ? html`<ha-state-icon
                  class="entity-icon glow-icon"
                  .hass=${this.hass}
                  .stateObj=${stateObj}
                ></ha-state-icon>`
              : nothing}
            <ha-tile-info
              .primary=${value}
              .secondary=${name}
            ></ha-tile-info>
          </div>
          <div class="plug glow-icon" aria-hidden="true">
            <ha-icon .icon=${this._config.icon ?? PLUG_ICON}></ha-icon>
          </div>
          <canvas aria-hidden="true"></canvas>
        </div>
      </ha-card>
    `;
  }

  static styles = [
    responsiveTypeStyles,
    responsiveTileInfoStyles,
    responsiveStateIconStyles,
    css`
    :host {
      --tile-color: var(--state-inactive-color);
      --lightning-color: var(--warning-color, #ffb300);
      --lightning-glow: 0;
      display: block;
      height: 100%;
    }

    ha-card {
      height: 100%;
      overflow: hidden;
    }

    .stage {
      position: relative;
      height: 100%;
      min-height: 56px;
    }

    .content {
      position: relative;
      z-index: 3;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 46px 10px 10px;
      box-sizing: border-box;
      height: 100%;
      min-height: 56px;
    }

    ha-state-icon {
      flex: none;
      color: var(--primary-text-color);
    }

    ha-state-icon.glow-icon {
      --state-icon-color: color-mix(
        in srgb,
        var(--lightning-color) calc(var(--lightning-glow) * 100%),
        var(--primary-text-color)
      );
      color: var(--state-icon-color);
    }

    .glow-icon {
      color: color-mix(
        in srgb,
        var(--lightning-color) calc(var(--lightning-glow) * 100%),
        var(--primary-text-color)
      );
      filter: drop-shadow(
          0 0 calc(var(--lightning-glow) * 14px) var(--lightning-color)
        )
        drop-shadow(
          0 0 calc(var(--lightning-glow) * 5px) var(--lightning-color)
        );
    }

    .plug {
      position: absolute;
      right: 0;
      top: 50%;
      z-index: 3;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: translateY(-50%) rotate(-90deg);
    }

    ha-tile-info {
      min-width: 0;
      flex: 1;
    }

    .plug ha-icon {
      --mdc-icon-size: var(--nv-icon-size);
      opacity: 0.92;
    }

    canvas {
      position: absolute;
      inset: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      display: block;
      pointer-events: none;
    }
  `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [POWER_DRAW_CARD_NAME]: NvisionPowerDrawCard;
  }
}
