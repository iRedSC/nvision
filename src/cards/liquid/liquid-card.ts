import { css, html, LitElement, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardEditor,
  LovelaceGridOptions,
} from "../../types";
import { registerCustomCard } from "../../utils/custom-cards";
import { deriveLiquidPalette, levelGradientColor, readCssColor, resolveThemeColor } from "../../utils/colors";
import { formatStateWithUnit } from "../../utils/entity-state";
import {
  drawLightningArc,
  type Point,
} from "../../utils/power-lightning";
import {
  responsiveStateIconStyles,
  responsiveTileInfoStyles,
  responsiveTypeStyles,
} from "../../utils/responsive-type";
import type { LiquidCardConfig, LiquidStyle } from "./liquid-card-config";
import {
  DEFAULT_LIQUID_STYLE,
  DEFAULT_MAX,
  DEFAULT_MIN,
  LIQUID_CARD_EDITOR_NAME,
  LIQUID_CARD_NAME,
} from "./const";

registerCustomCard({
  type: LIQUID_CARD_NAME,
  name: "Nvision Liquid",
  description: "Animated liquid background with sensor state in the foreground",
});

interface Bubble {
  x: number;
  y: number;
  radius: number;
  speed: number;
  wobble: number;
  wobbleSpeed: number;
  popProgress: number;
}

interface GravityVector {
  x: number;
  y: number;
}

const DEFAULT_FILL = 0.62;
const MIN_FILL = 0;
const MAX_FILL = 0.92;
const FILL_SPEED = 0.026;
const DRAIN_SPEED = 0.036;
const WAVE_1 = { amplitude: 4, frequency: 0.022, speed: 2.4 };
const WAVE_2 = { amplitude: 2.5, frequency: 0.034, speed: 1.7 };
const WAVE_3 = { amplitude: 1.5, frequency: 0.015, speed: 3.1 };
const IDLE_AMP = 0.3;
const PEAK_AMP = 2.2;
const AGITATION_DECAY = 0.016;
const SCROLL_BOOST = 0.34;
const WHEEL_BOOST = 0.0018;
const MOUSE_BOOST = 0.004;
const MOUSE_RAMP = 0.055;
const MOUSE_TARGET_DECAY = 0.02;
const GRAVITY_LERP = 0.1;
const TILT_AMOUNT = 0.42;

function gravityFromOrientation(beta: number, gamma: number): GravityVector {
  const gammaRad = (gamma * Math.PI) / 180;
  const betaRad = (beta * Math.PI) / 180;
  const x = Math.sin(gammaRad);
  const y = Math.sin(betaRad);
  const len = Math.hypot(x, y);

  if (len < 0.05) {
    return { x: 0, y: 1 };
  }

  return { x: x / len, y: y / len };
}

function lerpGravity(current: GravityVector, target: GravityVector): GravityVector {
  return {
    x: current.x + (target.x - current.x) * GRAVITY_LERP,
    y: current.y + (target.y - current.y) * GRAVITY_LERP,
  };
}

function liquidBoltOrigin(width: number, height: number): Point {
  return { x: width / 2, y: height };
}

function liquidEdgeTarget(
  width: number,
  height: number,
  fill: number,
  phase: number,
  ampScale: number,
  gravity: GravityVector,
  seed: number
): Point {
  const rand = (offset: number) => {
    const value = Math.sin((seed + offset) * 127.1 + (seed + offset) * 311.7) * 43758.5453;
    return value - Math.floor(value);
  };
  const side = Math.floor(rand(0) * 3);
  const depthT = 0.08 + rand(1) * 0.82;

  if (side === 0) {
    const surface = surfaceY(0, width, height, fill, phase, ampScale, gravity);
    return { x: 0, y: surface + (height - surface) * depthT };
  }

  if (side === 1) {
    const surface = surfaceY(width, width, height, fill, phase, ampScale, gravity);
    return { x: width, y: surface + (height - surface) * depthT };
  }

  const x = rand(3) * width;
  return {
    x,
    y: surfaceY(x, width, height, fill, phase, ampScale, gravity),
  };
}

function normalizeValue(value: number, min: number, max: number): number {
  if (max <= min) {
    return 0;
  }

  return Math.min(1, Math.max(0, (value - min) / (max - min)));
}

function parseFillLevel(
  state: string | undefined,
  min: number,
  max: number
): number {
  if (state === undefined || state === "unavailable" || state === "unknown") {
    return DEFAULT_FILL;
  }

  const value = Number(state);
  if (!Number.isFinite(value)) {
    return DEFAULT_FILL;
  }

  return Math.min(MAX_FILL, Math.max(MIN_FILL, normalizeValue(value, min, max)));
}

function surfaceY(
  x: number,
  width: number,
  height: number,
  fill: number,
  phase: number,
  ampScale: number,
  gravity: GravityVector
): number {
  const base = height * (1 - fill) + Math.sin(phase * 0.65) * 1.2 * ampScale;
  const tilt = (x - width / 2) * gravity.x * height * TILT_AMOUNT * 0.08;
  const wave1 =
    Math.sin(x * WAVE_1.frequency + phase * WAVE_1.speed) *
    WAVE_1.amplitude *
    ampScale;
  const wave2 =
    Math.sin(x * WAVE_2.frequency + phase * WAVE_2.speed + 1.2) *
    WAVE_2.amplitude *
    ampScale;
  const wave3 =
    Math.sin(x * WAVE_3.frequency - phase * WAVE_3.speed + 2.4) *
    WAVE_3.amplitude *
    ampScale;
  return base + tilt + wave1 + wave2 + wave3;
}

@customElement(LIQUID_CARD_NAME)
export class NvisionLiquidCard extends LitElement implements LovelaceCard {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("./liquid-card-editor");
    return document.createElement(LIQUID_CARD_EDITOR_NAME) as LovelaceCardEditor;
  }

  public static getStubConfig(
    hass: HomeAssistant,
    entities: string[],
    entitiesFallback: string[]
  ): LiquidCardConfig {
    const entity =
      entities.find((id) => hass.states[id]?.attributes?.unit_of_measurement === "%") ||
      entities[0] ||
      entitiesFallback[0] ||
      Object.keys(hass.states)[0];
    return {
      type: `custom:${LIQUID_CARD_NAME}`,
      entity,
      min: DEFAULT_MIN,
      max: DEFAULT_MAX,
    };
  }

  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: LiquidCardConfig;

  @query("canvas") private _canvas?: HTMLCanvasElement;

  private _ctx?: CanvasRenderingContext2D;
  private _frameId = 0;
  private _phase = 0;
  private _lastFrame = 0;
  private _animating = false;
  private _bubbles: Bubble[] = [];
  private _lightningPhase = 0;
  private _gravity: GravityVector = { x: 0, y: 1 };
  private _orientationBeta = 90;
  private _orientationGamma = 0;
  private _resizeObserver?: ResizeObserver;
  private _spawnTimer = 0;
  private _agitation = 0;
  private _mouseAgitation = 0;
  private _mouseAgitationTarget = 0;
  private _scrollElements: HTMLElement[] = [];
  private _lastTouchY = 0;
  private _lastMouseX = 0;
  private _lastMouseY = 0;
  private _mouseOver = false;
  private _displayFill = 0;
  private _targetFill = 0;
  private _trackedEntity?: string;
  private _trackedState?: string;

  private _onWheel = (ev: WheelEvent): void => {
    this._boostAgitation(Math.min(0.45, Math.abs(ev.deltaY) * WHEEL_BOOST));
  };

  private _onScroll = (): void => {
    this._boostAgitation(SCROLL_BOOST);
  };

  private _onTouchMove = (ev: TouchEvent): void => {
    if (!ev.touches.length) {
      return;
    }

    const y = ev.touches[0].clientY;
    if (this._lastTouchY) {
      this._boostAgitation(Math.min(0.3, Math.abs(y - this._lastTouchY) / 100));
    }
    this._lastTouchY = y;
  };

  private _onTouchEnd = (): void => {
    this._lastTouchY = 0;
  };

  private _onPointerMove = (ev: PointerEvent): void => {
    const rect = this.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) {
      return;
    }

    const x = ev.clientX;
    const y = ev.clientY;
    const inside =
      x >= rect.left &&
      x <= rect.right &&
      y >= rect.top &&
      y <= rect.bottom;

    if (!inside) {
      this._mouseOver = false;
      return;
    }

    if (this._mouseOver) {
      const dist = Math.hypot(x - this._lastMouseX, y - this._lastMouseY);
      this._mouseAgitationTarget = Math.min(
        1,
        this._mouseAgitationTarget + Math.min(0.2, dist * MOUSE_BOOST)
      );
    }

    this._lastMouseX = x;
    this._lastMouseY = y;
    this._mouseOver = true;
  };

  private _onDeviceOrientation = (ev: DeviceOrientationEvent): void => {
    if (ev.beta != null) {
      this._orientationBeta = ev.beta;
    }
    if (ev.gamma != null) {
      this._orientationGamma = ev.gamma;
    }
  };

  private _boostAgitation(amount: number): void {
    this._agitation = Math.min(1, this._agitation + amount);
  }

  private _ampScale(delta: number): number {
    this._agitation = Math.max(0, this._agitation - delta * AGITATION_DECAY);
    this._mouseAgitation +=
      (this._mouseAgitationTarget - this._mouseAgitation) * MOUSE_RAMP * delta;
    this._mouseAgitationTarget = Math.max(
      0,
      this._mouseAgitationTarget - delta * MOUSE_TARGET_DECAY
    );

    const combined = Math.min(1, this._agitation + this._mouseAgitation);
    return IDLE_AMP + combined * (PEAK_AMP - IDLE_AMP);
  }

  private _bindScroll(): void {
    window.addEventListener("wheel", this._onWheel, { passive: true });
    window.addEventListener("touchmove", this._onTouchMove, { passive: true });
    window.addEventListener("touchend", this._onTouchEnd, { passive: true });
    window.addEventListener("pointermove", this._onPointerMove, {
      passive: true,
    });
    window.addEventListener("deviceorientation", this._onDeviceOrientation, {
      passive: true,
    });
    this._bindScrollParents();
  }

  private _unbindScroll(): void {
    window.removeEventListener("wheel", this._onWheel);
    window.removeEventListener("touchmove", this._onTouchMove);
    window.removeEventListener("touchend", this._onTouchEnd);
    window.removeEventListener("pointermove", this._onPointerMove);
    window.removeEventListener("deviceorientation", this._onDeviceOrientation);
    for (const el of this._scrollElements) {
      el.removeEventListener("scroll", this._onScroll);
    }
    this._scrollElements = [];
  }

  private _bindScrollParents(): void {
    for (const el of this._scrollElements) {
      el.removeEventListener("scroll", this._onScroll);
    }
    this._scrollElements = [];

    let el: HTMLElement | null = this;
    while (el) {
      if (el === document.documentElement || el === document.body) {
        el = el.parentElement;
        continue;
      }

      const { overflowY, overflow } = getComputedStyle(el);
      if (/(auto|scroll)/.test(overflowY) || /(auto|scroll)/.test(overflow)) {
        el.addEventListener("scroll", this._onScroll, { passive: true });
        this._scrollElements.push(el);
      }
      el = el.parentElement;
    }
  }

  public setConfig(config: LiquidCardConfig): void {
    this._config = {
      min: DEFAULT_MIN,
      max: DEFAULT_MAX,
      liquid_style: DEFAULT_LIQUID_STYLE,
      ...config,
    };
  }

  private _liquidStyle(): LiquidStyle {
    return this._config?.liquid_style ?? DEFAULT_LIQUID_STYLE;
  }

  private _tickGravity(): GravityVector {
    const target = gravityFromOrientation(
      this._orientationBeta,
      this._orientationGamma
    );
    this._gravity = lerpGravity(this._gravity, target);
    return this._gravity;
  }

  private _range(): { min: number; max: number } {
    const min = this._config?.min ?? DEFAULT_MIN;
    const max = this._config?.max ?? DEFAULT_MAX;
    return { min, max };
  }

  public getCardSize(): number {
    return 2;
  }

  public getGridOptions(): LovelaceGridOptions {
    return { columns: 6, rows: 2 };
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._bindScroll();
    if (this._ctx) {
      this._lastFrame = 0;
      this._startAnimation();
    }
  }

  disconnectedCallback(): void {
    this._stopAnimation();
    this._unbindScroll();
    this._resizeObserver?.disconnect();
    super.disconnectedCallback();
  }

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has("_config")) {
      const entity = this._config?.entity;
      if (entity !== this._trackedEntity) {
        this._trackedEntity = entity;
        this._trackedState = undefined;
        this._displayFill = 0;
        this._bubbles = [];
        this._lightningPhase = 0;
        this._spawnTimer = 0;
      }
    }

    if (changed.has("hass")) {
      const entity = this._config?.entity;
      const state = entity ? this.hass?.states[entity]?.state : undefined;
      if (state !== this._trackedState) {
        this._trackedState = state;
        const { min, max } = this._range();
        this._targetFill = parseFillLevel(state, min, max);
      }
    }

    this._ensureCanvas();
    this._bindScrollParents();
  }

  private _syncFillTarget(): void {
    const entity = this._config?.entity;
    const state = entity ? this.hass?.states[entity]?.state : undefined;
    const { min, max } = this._range();
    const target = parseFillLevel(state, min, max);

    if (this._trackedState === undefined) {
      this._displayFill = 0;
      this._targetFill = target;
      this._trackedState = state;
      this._trackedEntity = entity;
      return;
    }

    if (state !== this._trackedState) {
      this._trackedState = state;
      this._targetFill = target;
    }
  }

  private _tickFill(delta: number): number {
    const diff = this._targetFill - this._displayFill;
    if (Math.abs(diff) < 0.002) {
      this._displayFill = this._targetFill;
      return this._displayFill;
    }

    const speed = diff > 0 ? FILL_SPEED : DRAIN_SPEED;
    const step = Math.sign(diff) * Math.min(Math.abs(diff), speed * delta);
    this._displayFill = Math.min(
      MAX_FILL,
      Math.max(MIN_FILL, this._displayFill + step)
    );

    this._boostAgitation(Math.min(0.05, Math.abs(step) * 1.8));
    return this._displayFill;
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
    this._resizeObserver.observe(canvas.parentElement ?? this);
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
      this._phase += delta * 0.045;

      this._draw(delta);
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
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    this._ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  private _drawLiquidPath(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    fill: number,
    phase: number,
    ampScale: number,
    gravity: GravityVector
  ): void {
    ctx.beginPath();
    ctx.moveTo(0, height);
    for (let x = 0; x <= width; x += 2) {
      ctx.lineTo(
        x,
        surfaceY(x, width, height, fill, phase, ampScale, gravity)
      );
    }
    ctx.lineTo(width, height);
    ctx.closePath();
  }
  private _spawnBubble(width: number, height: number): void {
    if (this._bubbles.length >= 14) {
      return;
    }

    const spawnX = 12 + Math.random() * (width - 24);
    const spawnY = height + Math.random() * 20;

    this._bubbles.push({
      x: spawnX,
      y: spawnY,
      radius: 2 + Math.random() * 4,
      speed: 0.6 + Math.random() * 0.8,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.04 + Math.random() * 0.04,
      popProgress: 0,
    });
  }

  private _draw(delta: number): void {
    const canvas = this._canvas;
    const ctx = this._ctx;
    if (!canvas || !ctx) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (width <= 0 || height <= 0) return;

    this._syncFillTarget();
    const fill = this._tickFill(delta);
    const ampScale = this._ampScale(delta);
    const gravity = this._tickGravity();
    const style = this._liquidStyle();

    const colorLevel = fill / MAX_FILL;
    const liquidColor = this._config?.level_color
      ? levelGradientColor(
          this,
          this._config.level_color_invert ? 1 - colorLevel : colorLevel
        )
      : resolveThemeColor(
          this._config?.color,
          this,
          "--info-color",
          "#29b6f6"
        );
    const cardBg = readCssColor(this, "--card-background-color", "#1c1c1c");
    const palette = deriveLiquidPalette(liquidColor, cardBg);

    ctx.clearRect(0, 0, width, height);

    const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
    bgGradient.addColorStop(0, cardBg);
    bgGradient.addColorStop(0.55, cardBg);
    bgGradient.addColorStop(1, palette.glow);
    ctx.fillStyle = bgGradient;
    ctx.globalAlpha = 0.14;
    ctx.fillRect(0, 0, width, height);
    ctx.globalAlpha = 1;

    this._drawLiquidPath(
      ctx,
      width,
      height,
      fill,
      this._phase,
      ampScale,
      gravity
    );

    const liquidTop = height * (1 - fill);
    const liquidGradient = ctx.createLinearGradient(0, liquidTop, 0, height);
    liquidGradient.addColorStop(0, palette.surface);
    liquidGradient.addColorStop(0.35, palette.mid);
    liquidGradient.addColorStop(1, palette.deep);
    ctx.fillStyle = liquidGradient;
    ctx.globalAlpha = 0.5;
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.beginPath();
    for (let x = 0; x <= width; x += 2) {
      const y = surfaceY(
        x,
        width,
        height,
        fill,
        this._phase,
        ampScale,
        gravity
      );
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = palette.surface;
    ctx.globalAlpha = 0.35;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.globalAlpha = 1;

    if (style === "bubbles") {
      this._spawnTimer += delta;
      if (this._spawnTimer > 28 && fill > 0.04) {
        this._spawnTimer = 0;
        this._spawnBubble(width, height);
      }

      this._bubbles = this._bubbles.filter((bubble) => {
        if (bubble.popProgress > 0) {
          bubble.popProgress += delta * 0.06;
          return bubble.popProgress < 1;
        }

        bubble.wobble += bubble.wobbleSpeed * delta;
        bubble.x -= gravity.x * bubble.speed * delta;
        bubble.y -= gravity.y * bubble.speed * delta;
        bubble.x += Math.sin(bubble.wobble) * 0.15;

        const surface = surfaceY(
          bubble.x,
          width,
          height,
          fill,
          this._phase,
          ampScale,
          gravity
        );
        if (bubble.y - bubble.radius <= surface) {
          bubble.popProgress = 0.01;
        }

        return true;
      });

      for (const bubble of this._bubbles) {
        if (bubble.popProgress > 0) {
          const t = bubble.popProgress;
          const popRadius = bubble.radius * (1 + t * 2.2);
          ctx.beginPath();
          ctx.arc(bubble.x, bubble.y, popRadius, 0, Math.PI * 2);
          ctx.strokeStyle = palette.mid;
          ctx.globalAlpha = 0.5 * (1 - t);
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.globalAlpha = 1;
          continue;
        }

        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.strokeStyle = palette.mid;
        ctx.globalAlpha = 0.55;
        ctx.lineWidth = 1.1;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    } else {
      this._bubbles = [];
    }

    if (style === "electricity" && fill > 0.04) {
      this._lightningPhase += delta * (0.1 + fill * 0.2);
      const origin = liquidBoltOrigin(width, height);
      const arcCount = Math.min(3, 1 + Math.floor(fill * 2));
      const targetSeed = Math.floor(this._lightningPhase * 0.65);
      const intensity = fill * 0.6;

      for (let i = 0; i < arcCount; i += 1) {
        const to = liquidEdgeTarget(
          width,
          height,
          fill,
          this._phase,
          ampScale,
          gravity,
          targetSeed + i * 17
        );
        drawLightningArc(
          ctx,
          origin,
          to,
          intensity,
          this._lightningPhase + i * 0.85,
          palette.mid
        );
      }
    } else if (style !== "electricity") {
      this._lightningPhase = 0;
    }
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
      "Nvision";

    const value = formatStateWithUnit(stateObj);

    return html`
      <ha-card>
        <div class="stage">
          <canvas aria-hidden="true"></canvas>
          <div class="content">
            ${stateObj
              ? html`<ha-state-icon
                  .hass=${this.hass}
                  .stateObj=${stateObj}
                ></ha-state-icon>`
              : nothing}
            <ha-tile-info
              .primary=${value}
              .secondary=${name}
            ></ha-tile-info>
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
      --tile-color: var(--state-inactive-color);
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
      min-height: 96px;
    }

    canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      display: block;
      pointer-events: none;
    }

    .content {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      box-sizing: border-box;
      height: 100%;
      min-height: 96px;
    }

    ha-state-icon {
      flex: none;
      color: var(--primary-text-color);
      filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.25));
    }

    ha-tile-info {
      min-width: 0;
      flex: 1;
    }
  `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [LIQUID_CARD_NAME]: NvisionLiquidCard;
  }
}
