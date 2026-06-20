import { css, html, LitElement, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardEditor,
  LovelaceGridOptions,
} from "../../types";
import { registerCustomCard } from "../../utils/custom-cards";
import {
  ActionHandlers,
  moreInfoInteractions,
} from "../../utils/action-handlers";
import {
  responsiveTypeStyles,
  responsiveStateIconStyles,
  responsiveTileInfoStyles,
} from "../../utils/responsive-type";
import { formatStateWithUnit } from "../../utils/entity-state";
import type { ReactorCoreCardConfig } from "./reactor-core-card-config";
import {
  DEFAULT_MAX,
  DEFAULT_MAX_PARTICLES,
  DEFAULT_MIN,
  DEFAULT_MODE,
  REACTOR_CORE_CARD_EDITOR_NAME,
  REACTOR_CORE_CARD_NAME,
  REACTOR_ENTITY_DOMAINS,
} from "./const";
import {
  drawReactor,
  syncParticles,
  updateParticles,
  updatePulses,
  type ReactorConnection,
  type ReactorParticle,
  type ReactorPulse,
} from "./reactor-particles";

const INFO_SLOT_COUNT = 4;

registerCustomCard({
  type: REACTOR_CORE_CARD_NAME,
  name: "Nvision Reactor Core",
  description: "Orbiting sensor particles with reactor-style pulse effects",
});

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

@customElement(REACTOR_CORE_CARD_NAME)
export class NvisionReactorCoreCard extends LitElement implements LovelaceCard {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("./reactor-core-card-editor");
    return document.createElement(
      REACTOR_CORE_CARD_EDITOR_NAME
    ) as LovelaceCardEditor;
  }

  public static getStubConfig(
    hass: HomeAssistant,
    entities: string[],
    entitiesFallback: string[]
  ): ReactorCoreCardConfig {
    const pool = [...entities, ...entitiesFallback, ...Object.keys(hass.states)];
    const seen = new Set<string>();
    const picked: string[] = [];

    for (const id of pool) {
      if (seen.has(id)) {
        continue;
      }
      seen.add(id);

      const domain = id.split(".", 1)[0];
      if (
        domain === "sensor" ||
        domain === "binary_sensor" ||
        domain === "switch" ||
        domain === "light" ||
        domain === "timer"
      ) {
        picked.push(id);
      }

      if (picked.length >= 8) {
        break;
      }
    }

    return {
      type: `custom:${REACTOR_CORE_CARD_NAME}`,
      mode: DEFAULT_MODE,
      entities: picked.length ? picked : undefined,
      max_particles: DEFAULT_MAX_PARTICLES,
      min: DEFAULT_MIN,
      max: DEFAULT_MAX,
    };
  }

  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: ReactorCoreCardConfig;

  @state() private _slotIds: string[] = Array(INFO_SLOT_COUNT).fill("");

  @query(".stage") private _stage?: HTMLElement;

  @query("canvas") private _canvas?: HTMLCanvasElement;

  private _ctx?: CanvasRenderingContext2D;
  private _frameId = 0;
  private _animating = false;
  private _lastFrame = 0;
  private _particles: ReactorParticle[] = [];
  private _pulses: ReactorPulse[] = [];
  private _entityKey = "";
  private _resizeObserver?: ResizeObserver;
  private _slotAge = Array(INFO_SLOT_COUNT).fill(0);

  private _actions = new ActionHandlers(
    () => this,
    () => this.hass,
    () => this._config
  );

  public setConfig(config: ReactorCoreCardConfig): void {
    this._config = {
      mode: DEFAULT_MODE,
      max_particles: DEFAULT_MAX_PARTICLES,
      min: DEFAULT_MIN,
      max: DEFAULT_MAX,
      ...moreInfoInteractions(),
      ...config,
    };
    this._entityKey = "";
    this._pulses = [];
    this._resetSlots();
  }

  public getCardSize(): number {
    return 2;
  }

  public getGridOptions(): LovelaceGridOptions {
    return { columns: 6, rows: 2 };
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._lastFrame = 0;
    this._startAnimation();
  }

  disconnectedCallback(): void {
    this._stopAnimation();
    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;
    super.disconnectedCallback();
  }

  protected updated(changed: Map<string, unknown>): void {
    if ((changed.has("hass") || changed.has("_config")) && this.hass && this._config) {
      this._syncParticles();
    }

    this._ensureCanvas();
  }

  private _canvasSize(): { width: number; height: number } {
    const canvas = this._canvas;
    if (!canvas) {
      return { width: 0, height: 0 };
    }
    return { width: canvas.clientWidth, height: canvas.clientHeight };
  }

  private _syncParticles(timeMs = performance.now()): void {
    if (!this.hass || !this._config) {
      return;
    }

    const { width, height } = this._canvasSize();
    const entityIds = discoverIds(this.hass, this._config);
    const key = entityIds.join("|");
    const configKey = [
      this._config.mode,
      this._config.max_particles,
      (this._config.domains ?? []).join(","),
      (this._config.exclude ?? []).join(","),
      this._config.min,
      this._config.max,
      (this._config.entities ?? []).join(","),
    ].join(";");

    if (key + configKey !== this._entityKey) {
      this._pulses = [];
      this._entityKey = key + configKey;
      this._resetSlots();
    }

    const { particles, changedIds } = syncParticles(
      this._particles,
      this.hass,
      this._config,
      this._pulses,
      width,
      height,
      timeMs
    );
    this._particles = particles;

    for (const entityId of changedIds) {
      this._assignToOldestSlot(entityId);
    }
  }

  private _resetSlots(): void {
    this._slotIds = Array(INFO_SLOT_COUNT).fill("");
    this._slotAge = Array(INFO_SLOT_COUNT).fill(0);
  }

  private _assignToOldestSlot(entityId: string): void {
    const slots = [...this._slotIds];
    const ages = [...this._slotAge];

    for (let index = 0; index < INFO_SLOT_COUNT; index += 1) {
      if (slots[index] === entityId) {
        slots[index] = "";
      }
    }

    let oldestIndex = 0;
    for (let index = 1; index < INFO_SLOT_COUNT; index += 1) {
      if (ages[index] < ages[oldestIndex]) {
        oldestIndex = index;
      }
    }

    slots[oldestIndex] = entityId;
    ages[oldestIndex] = performance.now();
    this._slotIds = slots;
    this._slotAge = ages;
  }

  private _infoAnchors(): { x: number; y: number }[] {
    const stage = this._stage;
    if (!stage) {
      return [];
    }

    const stageRect = stage.getBoundingClientRect();
    const slots = this.shadowRoot?.querySelectorAll(".info-slot") ?? [];

    return Array.from(slots).map((slot) => {
      const rect = slot.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - stageRect.left,
        y: rect.top + 2 - stageRect.top,
      };
    });
  }

  private _buildConnections(): ReactorConnection[] {
    const anchors = this._infoAnchors();
    const connections: ReactorConnection[] = [];

    for (let index = 0; index < INFO_SLOT_COUNT; index += 1) {
      const entityId = this._slotIds[index];
      if (!entityId) {
        continue;
      }

      const particle = this._particles.find(
        (entry) => entry.entityId === entityId
      );
      const anchor = anchors[index];
      if (!particle?.placed || !anchor) {
        continue;
      }

      connections.push({
        fromX: particle.x,
        fromY: particle.y,
        toX: anchor.x,
        toY: anchor.y,
        seed: particle.seed,
      });
    }

    return connections;
  }

  private _ensureCanvas(): void {
    const canvas = this._canvas;
    if (!canvas) {
      return;
    }

    if (!this._ctx) {
      this._ctx = canvas.getContext("2d") ?? undefined;
      if (!this._ctx) {
        return;
      }

      this._resizeObserver = new ResizeObserver(() => {
        this._resizeCanvas();
        this._syncParticles();
      });
      this._resizeObserver.observe(this._stage ?? canvas.parentElement ?? this);
    }

    this._resizeCanvas();
    this._syncParticles();

    if (!this._animating) {
      this._lastFrame = 0;
      this._startAnimation();
    }
  }

  private _startAnimation(): void {
    if (this._animating || !this._ctx) {
      return;
    }

    this._animating = true;

    const tick = (now: number) => {
      if (!this.isConnected || !this._ctx) {
        this._animating = false;
        return;
      }

      const delta = this._lastFrame
        ? Math.min((now - this._lastFrame) / 16.67, 3)
        : 1;
      const deltaMs = this._lastFrame ? now - this._lastFrame : 16.67;
      this._lastFrame = now;
      this._draw(delta, deltaMs, now);
      this._frameId = requestAnimationFrame(tick);
    };

    this._frameId = requestAnimationFrame(tick);
  }

  private _stopAnimation(): void {
    cancelAnimationFrame(this._frameId);
    this._animating = false;
  }

  private _resizeCanvas(): void {
    const canvas = this._canvas;
    if (!canvas) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    this._ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  private _draw(delta: number, deltaMs: number, timeMs: number): void {
    const canvas = this._canvas;
    const ctx = this._ctx;
    if (!canvas || !ctx || !this.hass || !this._config) {
      return;
    }

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (width <= 0 || height <= 0) {
      return;
    }

    if (!this._particles.length) {
      this._syncParticles(timeMs);
    }

    const reducedMotion = prefersReducedMotion();
    updateParticles(
      this._particles,
      this.hass,
      this._config,
      width,
      height,
      delta,
      timeMs,
      reducedMotion
    );
    updatePulses(this._pulses, deltaMs);
    drawReactor(
      ctx,
      this._particles,
      this._pulses,
      width,
      height,
      timeMs,
      this._buildConnections()
    );
  }

  protected render() {
    if (!this._config || !this.hass) {
      return nothing;
    }

    const title = this._config.name || "Reactor Core";

    return html`
      <ha-card aria-label=${title}>
        <div class="stage">
          <canvas aria-hidden="true"></canvas>
          <div
            class="overlay"
            role="button"
            tabindex="0"
            @click=${this._actions.bind().click}
            @dblclick=${this._actions.bind().dblclick}
            @keydown=${this._actions.bind().keydown}
            @pointerdown=${this._actions.bind().pointerdown}
            @pointerup=${this._actions.bind().pointerup}
            @pointerleave=${this._actions.bind().pointerleave}
            @pointercancel=${this._actions.bind().pointercancel}
          >
            <div class="info-bar">
              ${this._slotIds.map((entityId, index) => {
                const stateObj = entityId
                  ? this.hass.states[entityId]
                  : undefined;

                return html`
                  <div
                    class="info-slot"
                    data-slot=${index}
                    @click=${(event: Event) => event.stopPropagation()}
                  >
                    ${stateObj
                      ? html`
                          <ha-state-icon
                            .hass=${this.hass}
                            .stateObj=${stateObj}
                          ></ha-state-icon>
                          <ha-tile-info
                            .primary=${stateObj.attributes.friendly_name ??
                            entityId}
                            .secondary=${formatStateWithUnit(stateObj)}
                          ></ha-tile-info>
                        `
                      : html`<span class="info-empty">—</span>`}
                  </div>
                `;
              })}
            </div>
          </div>
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
        display: block;
        height: 100%;
      }

      ha-card {
        height: 100%;
        overflow: hidden;
        background: var(--card-background-color);
      }

      .stage {
        position: relative;
        width: 100%;
        height: 100%;
        min-height: 160px;
        overflow: hidden;
      }

      canvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: block;
        pointer-events: none;
      }

      .overlay {
        position: absolute;
        inset: 0;
        z-index: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 8px 6px;
        box-sizing: border-box;
        cursor: pointer;
      }

      .info-bar {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 6px;
        width: 100%;
      }

      .info-slot {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2px;
        min-width: 0;
        min-height: 52px;
        padding: 6px 4px;
        text-align: center;
      }

      .info-slot ha-state-icon {
        --mdc-icon-size: 18px;
        opacity: 0.92;
      }

      .info-slot ha-tile-info {
        width: 100%;
        --ha-tile-info-primary-font-size: var(--nv-label-font-size, 0.72rem);
        --ha-tile-info-secondary-font-size: var(--nv-subtitle-font-size, 0.66rem);
      }

      .info-empty {
        font-size: var(--nv-subtitle-font-size, 0.78rem);
        color: var(--secondary-text-color);
        opacity: 0.55;
      }
    `,
  ];
}

function discoverIds(
  hass: HomeAssistant,
  config: ReactorCoreCardConfig
): string[] {
  const mode = config.mode ?? DEFAULT_MODE;
  if (mode === "manual" && config.entities?.length) {
    return config.entities.filter((id) => Boolean(hass.states[id]));
  }

  const domains = config.domains?.length ? config.domains : [...REACTOR_ENTITY_DOMAINS];
  const max = config.max_particles ?? DEFAULT_MAX_PARTICLES;

  return Object.keys(hass.states)
    .filter((id) => domains.includes(id.split(".", 1)[0]))
    .sort((a, b) => a.localeCompare(b))
    .slice(0, max);
}

declare global {
  interface HTMLElementTagNameMap {
    [REACTOR_CORE_CARD_NAME]: NvisionReactorCoreCard;
  }
}
