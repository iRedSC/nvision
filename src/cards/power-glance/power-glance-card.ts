import { css, html, LitElement, nothing } from "lit";
import { customElement, property, query, queryAll, state } from "lit/decorators.js";
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
import type { PowerGlanceCardConfig } from "./power-glance-card-config";
import {
  POWER_GLANCE_CARD_EDITOR_NAME,
  POWER_GLANCE_CARD_NAME,
} from "./const";

registerCustomCard({
  type: POWER_GLANCE_CARD_NAME,
  name: "Nvision Power Glance",
  description: "Multiple power sensors with lightning from a bottom plug",
});

@customElement(POWER_GLANCE_CARD_NAME)
export class NvisionPowerGlanceCard extends LitElement implements LovelaceCard {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("./power-glance-card-editor");
    return document.createElement(
      POWER_GLANCE_CARD_EDITOR_NAME
    ) as LovelaceCardEditor;
  }

  public static getStubConfig(
    hass: HomeAssistant,
    entities: string[],
    entitiesFallback: string[]
  ): PowerGlanceCardConfig {
    const pool = [...entities, ...entitiesFallback, ...Object.keys(hass.states)];
    const seen = new Set<string>();
    const picked: string[] = [];

    for (const id of pool) {
      if (seen.has(id)) {
        continue;
      }
      seen.add(id);

      const state = hass.states[id];
      if (
        state?.attributes.device_class === "power" ||
        id.includes("power") ||
        parseNumericState(state?.state) !== undefined
      ) {
        picked.push(id);
      }

      if (picked.length >= 4) {
        break;
      }
    }

    return {
      type: `custom:${POWER_GLANCE_CARD_NAME}`,
      entities: picked.length ? picked : pool.slice(0, 3),
      columns: 3,
      min: DEFAULT_POWER_MIN,
      max: DEFAULT_POWER_MAX,
    };
  }

  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: PowerGlanceCardConfig;

  @query("canvas") private _canvas?: HTMLCanvasElement;

  @query(".plug") private _plug?: HTMLElement;

  @queryAll(".entity-icon") private _entityIcons?: NodeListOf<HTMLElement>;

  private _renderer?: PowerLightningRenderer;

  private _displayIntensities = new Map<string, number>();

  public setConfig(config: PowerGlanceCardConfig): void {
    this._config = {
      entities: [],
      columns: 3,
      min: DEFAULT_POWER_MIN,
      max: DEFAULT_POWER_MAX,
      effects_min: DEFAULT_EFFECTS_MIN,
      effects_max: DEFAULT_EFFECTS_MAX,
      ...config,
    };

    this._syncGridColumns();
  }

  private _syncGridColumns(): void {
    const configured = this._config?.columns ?? 3;
    const count = this._config?.entities?.length ?? 0;
    const columns = count > 0 ? Math.min(configured, count) : configured;
    this.style.setProperty("--columns", String(columns));
  }

  public getCardSize(): number {
    const entities = this._config?.entities?.length ?? 1;
    const columns = this._config?.columns ?? 3;
    return Math.max(1, Math.ceil(entities / columns));
  }

  public getGridOptions(): LovelaceGridOptions {
    return { columns: 6, rows: this.getCardSize() };
  }

  connectedCallback(): void {
    super.connectedCallback();
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
    this._syncGridColumns();
    this._syncLightningTheme();
    requestAnimationFrame(() => this._ensureRenderer());
  }

  private _lightningColor(): string {
    return resolveLightningColor(this._config?.color, this);
  }

  private _syncLightningTheme(): void {
    this.style.setProperty("--lightning-color", this._lightningColor());

    const entityIds = this._entityIds();
    const icons = this._entityIcons ? Array.from(this._entityIcons) : [];
    let peakTint = powerTint(0);

    entityIds.forEach((entityId, index) => {
      const intensity = this._displayIntensities.get(entityId) ?? 0;
      const tint = powerTint(intensity);
      peakTint = Math.max(peakTint, tint);
      icons[index]?.style.setProperty("--lightning-glow", String(tint));
    });

    this._plug?.style.setProperty("--lightning-glow", String(peakTint));
  }

  private _entityIds(): string[] {
    return this._config?.entities ?? [];
  }

  private _targetIntensity(entityId: string): number {
    const state = this.hass?.states[entityId]?.state;
    const value = parseNumericState(state);
    return effectIntensity(value, this._config ?? {});
  }

  private _tickIntensities(delta: number): void {
    for (const entityId of this._entityIds()) {
      const target = this._targetIntensity(entityId);
      const current = this._displayIntensities.get(entityId) ?? 0;
      const diff = target - current;

      if (Math.abs(diff) < 0.001) {
        this._displayIntensities.set(entityId, target);
      } else {
        this._displayIntensities.set(
          entityId,
          current + diff * INTENSITY_LERP * delta
        );
      }
    }

    this._syncLightningTheme();
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
        (delta) => this._tickIntensities(delta)
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
    if (!plug) {
      return [];
    }

    const icons = this._entityIcons ? Array.from(this._entityIcons) : [];
    const entityIds = this._entityIds();
    const arcs: LightningArc[] = [];

    entityIds.forEach((entityId, index) => {
      const icon = icons[index];
      const target = anchorCenter(icon, canvas, "center");
      const intensity = this._displayIntensities.get(entityId) ?? 0;

      if (!target) {
        return;
      }

      arcs.push({ from: plug, to: target, intensity });
    });

    return arcs;
  }

  protected render() {
    if (!this._config || !this.hass) {
      return nothing;
    }

    const entities = this._entityIds();

    return html`
      <ha-card>
        <div class="stage">
          <div class="entities">
            ${entities.map((entityId) => {
              const stateObj = this.hass!.states[entityId];
              const value = formatStateWithUnit(stateObj);

              return html`
                <div class="entity">
                  ${stateObj
                    ? html`<ha-state-icon
                        class="entity-icon glow-icon"
                        .hass=${this.hass}
                        .stateObj=${stateObj}
                      ></ha-state-icon>`
                    : nothing}
                  <ha-tile-info
                    .primary=${stateObj?.attributes.friendly_name ?? entityId}
                    .secondary=${value}
                  ></ha-tile-info>
                </div>
              `;
            })}
          </div>
          <div class="plug-wrap" aria-hidden="true">
            <div class="plug glow-icon">
              <ha-icon .icon=${this._config.icon ?? PLUG_ICON}></ha-icon>
            </div>
          </div>
          <canvas aria-hidden="true"></canvas>
        </div>
      </ha-card>
    `;
  }

  static styles = [
    responsiveTypeStyles,
    responsiveStateIconStyles,
    css`
    :host {
      --tile-color: var(--state-inactive-color);
      --columns: 3;
      --lightning-color: var(--warning-color, #ffb300);
      --lightning-glow: 0;
      --nv-value-font-size: clamp(0.875rem, 11cqmin, 2rem);
      --nv-label-font-size: clamp(0.625rem, 6cqmin, 0.9375rem);
      display: block;
      height: 100%;
    }

    ha-card {
      height: 100%;
      overflow: hidden;
    }

    .stage {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 72px;
    }

    .entities {
      position: relative;
      z-index: 3;
      display: grid;
      grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
      justify-content: space-evenly;
      gap: 8px 10px;
      padding: 10px 10px 30px;
      box-sizing: border-box;
      flex: 1;
      width: 100%;
    }

    .entity {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
    }

    ha-state-icon {
      flex: none;
      color: var(--primary-text-color);
    }

    ha-state-icon.glow-icon {
      --state-icon-color: color-mix(
        in srgb,
        var(--lightning-color) calc(var(--lightning-glow, 0) * 100%),
        var(--primary-text-color)
      );
      color: var(--state-icon-color);
    }

    .glow-icon {
      color: color-mix(
        in srgb,
        var(--lightning-color) calc(var(--lightning-glow, 0) * 100%),
        var(--primary-text-color)
      );
      filter: drop-shadow(
          0 0 calc(var(--lightning-glow, 0) * 14px) var(--lightning-color)
        )
        drop-shadow(
          0 0 calc(var(--lightning-glow, 0) * 5px) var(--lightning-color)
        );
    }

    ha-tile-info {
      min-width: 0;
      flex: 1;
      --ha-tile-info-primary-font-size: var(--nv-label-font-size);
      --ha-tile-info-primary-font-weight: var(--ha-font-weight-medium, 500);
      --ha-tile-info-secondary-font-size: var(--nv-value-font-size);
      --ha-tile-info-secondary-font-weight: var(--ha-font-weight-medium, 500);
      --ha-tile-info-secondary-color: var(--primary-text-color);
    }

    .plug-wrap {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 3;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      pointer-events: none;
    }

    .plug {
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }

    .plug ha-icon {
      --mdc-icon-size: var(--nv-icon-size);
      opacity: 0.92;
      display: block;
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
    [POWER_GLANCE_CARD_NAME]: NvisionPowerGlanceCard;
  }
}
