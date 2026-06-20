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
import { responsiveTypeStyles } from "../../utils/responsive-type";
import type { ReactorCoreCardConfig } from "./reactor-core-card-config";
import {
  DEFAULT_MAX,
  DEFAULT_MAX_PARTICLES,
  DEFAULT_MIN,
  DEFAULT_MODE,
  REACTOR_CORE_CARD_EDITOR_NAME,
  REACTOR_CORE_CARD_NAME,
} from "./const";
import {
  clearParticleTrails,
  drawReactor,
  syncParticles,
  updateParticles,
  type ReactorParticle,
} from "./reactor-particles";

registerCustomCard({
  type: REACTOR_CORE_CARD_NAME,
  name: "Nvision Reactor Core",
  description: "Orbiting sensor particles with reactor-style glow trails",
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
      if (domain === "sensor" || domain === "binary_sensor") {
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

  @query(".stage") private _stage?: HTMLElement;

  @query("canvas") private _canvas?: HTMLCanvasElement;

  private _ctx?: CanvasRenderingContext2D;
  private _frameId = 0;
  private _animating = false;
  private _lastFrame = 0;
  private _particles: ReactorParticle[] = [];
  private _entityKey = "";
  private _resizeObserver?: ResizeObserver;

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
    clearParticleTrails(this._particles);
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
      width,
      height,
    ].join(";");

    if (key + configKey !== this._entityKey) {
      clearParticleTrails(this._particles);
      this._entityKey = key + configKey;
    }

    this._particles = syncParticles(
      this._particles,
      this.hass,
      this._config,
      width,
      height,
      timeMs
    );
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
        clearParticleTrails(this._particles);
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
      this._lastFrame = now;
      this._draw(delta, now);
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

  private _draw(delta: number, timeMs: number): void {
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
      width,
      height,
      delta,
      timeMs,
      reducedMotion
    );
    drawReactor(ctx, this._particles, width, height, timeMs);
  }

  protected render() {
    if (!this._config || !this.hass) {
      return nothing;
    }

    const title = this._config.name || "Reactor Core";
    const count =
      this._particles.length ||
      discoverIds(this.hass, this._config).length;

    return html`
      <ha-card>
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
            <span class="title">${title}</span>
            <span class="count">${count} sensors</span>
          </div>
        </div>
      </ha-card>
    `;
  }

  static styles = [
    responsiveTypeStyles,
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
        padding: 10px 12px;
        box-sizing: border-box;
        cursor: pointer;
        background: linear-gradient(
          to top,
          rgba(0, 0, 0, 0.28),
          rgba(0, 0, 0, 0)
        );
      }

      .title {
        font-size: var(--nv-label-font-size, 0.95rem);
        font-weight: 500;
        color: var(--primary-text-color);
        text-shadow: 0 1px 8px rgba(0, 0, 0, 0.45);
      }

      .count {
        margin-top: 2px;
        font-size: var(--nv-subtitle-font-size, 0.78rem);
        color: var(--secondary-text-color);
        text-shadow: 0 1px 6px rgba(0, 0, 0, 0.4);
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

  const domains = config.domains?.length
    ? config.domains
    : ["sensor", "binary_sensor"];
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
