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
import type { ReactorTempCardConfig } from "./reactor-temp-card-config";
import {
  DEFAULT_MAX,
  DEFAULT_MIN,
  DEFAULT_STEP,
  DRAG_PIXELS_PER_STEP,
  REACTOR_TEMP_CARD_EDITOR_NAME,
  REACTOR_TEMP_CARD_NAME,
  TEMP_LERP,
} from "./const";
import { drawReactorTemp } from "./reactor-temp-render";
import {
  clampTarget,
  formatStatus,
  formatTempValue,
  normalizeTemp,
  readConfigStep,
  readReactorTemp,
  setReactorTarget,
} from "./reactor-temp-state";

registerCustomCard({
  type: REACTOR_TEMP_CARD_NAME,
  name: "Nvision Reactor Temp",
  description: "Reactor-style temperature sensor and setpoint control",
});

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function pickStubEntity(
  hass: HomeAssistant,
  entities: string[],
  entitiesFallback: string[]
): string | undefined {
  const pool = [...entities, ...entitiesFallback, ...Object.keys(hass.states)];

  for (const entityId of pool) {
    const stateObj = hass.states[entityId];
    if (!stateObj) {
      continue;
    }

    const domain = entityId.split(".", 1)[0];
    if (domain === "climate") {
      return entityId;
    }

    if (
      domain === "sensor" &&
      (stateObj.attributes.device_class === "temperature" ||
        stateObj.attributes.unit_of_measurement === "°C" ||
        stateObj.attributes.unit_of_measurement === "°F")
    ) {
      return entityId;
    }
  }

  return pool[0];
}

@customElement(REACTOR_TEMP_CARD_NAME)
export class NvisionReactorTempCard extends LitElement implements LovelaceCard {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("./reactor-temp-card-editor");
    return document.createElement(
      REACTOR_TEMP_CARD_EDITOR_NAME
    ) as LovelaceCardEditor;
  }

  public static getStubConfig(
    hass: HomeAssistant,
    entities: string[],
    entitiesFallback: string[]
  ): ReactorTempCardConfig {
    const entity = pickStubEntity(hass, entities, entitiesFallback);

    return {
      type: `custom:${REACTOR_TEMP_CARD_NAME}`,
      entity: entity ?? "sensor.temperature",
      min: DEFAULT_MIN,
      max: DEFAULT_MAX,
      step: DEFAULT_STEP,
    };
  }

  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: ReactorTempCardConfig;

  @state() private _displayNorm = 0.35;

  @state() private _previewTarget?: number;

  @query(".stage") private _stage?: HTMLElement;

  @query("canvas") private _canvas?: HTMLCanvasElement;

  private _ctx?: CanvasRenderingContext2D;
  private _frameId = 0;
  private _animating = false;
  private _lastFrame = 0;
  private _targetNorm = 0.35;
  private _resizeObserver?: ResizeObserver;
  private _dragPointerId?: number;
  private _dragOriginX = 0;
  private _dragBaseTarget?: number;
  private _dragCommittedTarget?: number;
  private _dragMoved = false;

  private _actions = new ActionHandlers(
    () => this,
    () => this.hass,
    () => this._config
  );

  public setConfig(config: ReactorTempCardConfig): void {
    if (!config.entity) {
      throw new Error("Entity must be specified");
    }

    this._config = {
      min: DEFAULT_MIN,
      max: DEFAULT_MAX,
      step: DEFAULT_STEP,
      ...moreInfoInteractions(),
      ...config,
    };
    this._previewTarget = undefined;
    this._syncTargetNorm();
  }

  public getCardSize(): number {
    return 2;
  }

  public getGridOptions(): LovelaceGridOptions {
    return { columns: 6, rows: 2 };
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (this._ctx) {
      this._lastFrame = 0;
      this._startAnimation();
    }
  }

  disconnectedCallback(): void {
    this._stopAnimation();
    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;
    super.disconnectedCallback();
  }

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has("hass") || changed.has("_config")) {
      this._syncTargetNorm();
    }

    this._ensureCanvas();
  }

  private _range(): { min: number; max: number } {
    return {
      min: this._config?.min ?? DEFAULT_MIN,
      max: this._config?.max ?? DEFAULT_MAX,
    };
  }

  private _reading() {
    if (!this.hass || !this._config) {
      return undefined;
    }

    return readReactorTemp(this.hass, this._config, this._previewTarget);
  }

  private _syncTargetNorm(): void {
    const reading = this._reading();
    const { min, max } = this._range();
    this._targetNorm = normalizeTemp(reading?.current, min, max);
  }

  private _ensureCanvas(): void {
    const canvas = this._canvas;
    if (!canvas || this._ctx) {
      return;
    }

    this._ctx = canvas.getContext("2d") ?? undefined;
    if (!this._ctx) {
      return;
    }

    this._resizeObserver = new ResizeObserver(() => this._resizeCanvas());
    this._resizeObserver.observe(this._stage ?? canvas.parentElement ?? this);
    this._resizeCanvas();
    this._lastFrame = 0;
    this._startAnimation();
  }

  private _startAnimation(): void {
    if (this._animating) {
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

  private _tickNorm(delta: number): number {
    const diff = this._targetNorm - this._displayNorm;
    if (Math.abs(diff) < 0.001) {
      this._displayNorm = this._targetNorm;
    } else {
      this._displayNorm += diff * TEMP_LERP * delta;
    }

    return this._displayNorm;
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

    const reading = this._reading();
    const tempNorm = this._tickNorm(delta);
    const ice = tempNorm < 0.18 ? (0.18 - tempNorm) / 0.18 : 0;

    drawReactorTemp(ctx, {
      width,
      height,
      timeMs,
      tempNorm,
      direction: reading?.direction ?? "unknown",
      directionStrength: reading?.directionStrength ?? 0,
      ice,
      reducedMotion: prefersReducedMotion(),
    });
  }

  private _handlePointerDown(event: PointerEvent): void {
    const reading = this._reading();
    if (!reading?.canControl || reading.target === undefined) {
      return;
    }

    const stage = event.currentTarget as HTMLElement;
    stage.setPointerCapture(event.pointerId);
    this._dragPointerId = event.pointerId;
    this._dragOriginX = event.clientX;
    this._dragBaseTarget = reading.target;
    this._dragCommittedTarget = reading.target;
    this._previewTarget = reading.target;
    this._dragMoved = false;
    event.preventDefault();
  }

  private _handlePointerMove(event: PointerEvent): void {
    if (
      this._dragPointerId !== event.pointerId ||
      !this.hass ||
      !this._config ||
      this._dragBaseTarget === undefined
    ) {
      return;
    }

    const reading = this._reading();
    if (!reading?.controlEntityId) {
      return;
    }

    const { min, max } = this._range();
    const step = readConfigStep(this.hass, this._config);
    const deltaSteps = Math.round(
      (event.clientX - this._dragOriginX) / DRAG_PIXELS_PER_STEP
    );
    if (deltaSteps !== 0) {
      this._dragMoved = true;
    }
    const nextTarget = clampTarget(
      this._dragBaseTarget + deltaSteps * step,
      min,
      max,
      step
    );

    if (nextTarget === this._previewTarget) {
      return;
    }

    this._previewTarget = nextTarget;

    if (nextTarget !== this._dragCommittedTarget) {
      this._dragCommittedTarget = nextTarget;
      void setReactorTarget(this.hass, reading.controlEntityId, nextTarget);
    }
  }

  private _handlePointerEnd(event: PointerEvent): void {
    if (this._dragPointerId !== event.pointerId) {
      return;
    }

    const stage = event.currentTarget as HTMLElement;
    if (stage.hasPointerCapture(event.pointerId)) {
      stage.releasePointerCapture(event.pointerId);
    }

    this._dragPointerId = undefined;
    this._dragBaseTarget = undefined;
    this._dragCommittedTarget = undefined;
    this._previewTarget = undefined;
    window.setTimeout(() => {
      this._dragMoved = false;
    }, 0);
    this._syncTargetNorm();
  }

  protected render() {
    if (!this._config || !this.hass) {
      return nothing;
    }

    const reading = this._reading();
    const title = reading?.displayName ?? "Reactor Temp";
    const currentText = formatTempValue(reading?.current, reading?.unit ?? "°");
    const targetText =
      reading?.target !== undefined
        ? formatTempValue(reading.target, reading?.unit ?? "°")
        : "—";
    const status = formatStatus(reading?.direction ?? "unknown");
    const canControl = Boolean(reading?.canControl && reading?.target !== undefined);
    const tempLine =
      reading?.target !== undefined
        ? html`${currentText} → ${targetText}`
        : html`${currentText}`;

    return html`
      <ha-card aria-label=${title}>
        <div
          class=${canControl ? "stage controllable" : "stage"}
          role="button"
          tabindex="0"
          @click=${(event: Event) => {
            if (this._dragMoved) {
              event.preventDefault();
              return;
            }
            this._actions.bind().click(event);
          }}
          @dblclick=${this._actions.bind().dblclick}
          @keydown=${this._actions.bind().keydown}
          @pointerdown=${(event: PointerEvent) => {
            if (canControl) {
              this._handlePointerDown(event);
              return;
            }
            this._actions.bind().pointerdown(event);
          }}
          @pointermove=${this._handlePointerMove}
          @pointerup=${(event: PointerEvent) => {
            this._handlePointerEnd(event);
            this._actions.bind().pointerup(event);
          }}
          @pointerleave=${(event: PointerEvent) => {
            this._handlePointerEnd(event);
            this._actions.bind().pointerleave(event);
          }}
          @pointercancel=${(event: PointerEvent) => {
            this._handlePointerEnd(event);
            this._actions.bind().pointercancel(event);
          }}
        >
          <canvas aria-hidden="true"></canvas>
          <div class="hud">
            <div class="hud-row status">status: ${status}</div>
            <div class="hud-row temps">${tempLine}</div>
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
        touch-action: none;
      }

      .stage.controllable {
        cursor: ew-resize;
      }

      canvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: block;
        pointer-events: none;
      }

      .hud {
        position: absolute;
        inset: 0;
        z-index: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 10px 12px;
        box-sizing: border-box;
        pointer-events: none;
        font-family: var(
          --code-font-family,
          ui-monospace,
          SFMono-Regular,
          Menlo,
          Monaco,
          Consolas,
          monospace
        );
        letter-spacing: 0.04em;
        text-transform: lowercase;
      }

      .hud-row {
        color: var(--primary-text-color);
        text-shadow: 0 1px 8px rgba(0, 0, 0, 0.45);
        font-size: var(--nv-label-font-size, 0.78rem);
        opacity: 0.92;
      }

      .temps {
        align-self: flex-end;
        font-size: var(--nv-value-font-size, 0.92rem);
        font-weight: 500;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [REACTOR_TEMP_CARD_NAME]: NvisionReactorTempCard;
  }
}
