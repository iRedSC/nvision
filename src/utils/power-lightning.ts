export const DEFAULT_POWER_MIN = 0;
export const DEFAULT_POWER_MAX = 3000;
export const DEFAULT_EFFECTS_MIN = 0;
export const DEFAULT_EFFECTS_MAX = 1;
export const INTENSITY_LERP = 0.12;
export const PLUG_ICON = "mdi:power-plug";
export const IDLE_INTENSITY = 0.18;

export type LightningColor = string | [number, number, number];

/** Baseline draw plus scaled power draw; zero power draws nothing. */
export function effectiveIntensity(intensity: number): number {
  const t = Math.min(1, Math.max(0, intensity));
  if (t <= 0) {
    return 0;
  }
  return IDLE_INTENSITY + t * (1 - IDLE_INTENSITY);
}

export function resolveLightningColor(
  configColor: LightningColor | undefined,
  host: HTMLElement
): string {
  if (configColor) {
    if (Array.isArray(configColor) && configColor.length >= 3) {
      return `rgb(${configColor[0]}, ${configColor[1]}, ${configColor[2]})`;
    }

    if (typeof configColor === "string") {
      const parts = configColor.split(",").map((part) => Number(part.trim()));
      if (parts.length >= 3 && parts.every((part) => Number.isFinite(part))) {
        return `rgb(${parts[0]}, ${parts[1]}, ${parts[2]})`;
      }
      return configColor;
    }
  }

  return (
    readCssColor(host, "--warning-color", "") ||
    readCssColor(host, "--state-active-color", "") ||
    readCssColor(host, "--primary-color", "#ffb300")
  );
}

/** Zigzag displacement scales with power — low draw stays nearly straight. */
export function wiggleAmplitude(intensity: number, distance: number): number {
  const t = effectiveIntensity(intensity);
  return Math.max(1.5, distance * (0.008 + t * t * 0.26));
}

export interface PowerEffectsConfig {
  min?: number;
  max?: number;
  effects_min?: number;
  effects_max?: number;
}

export function effectIntensity(
  value: number | undefined,
  config: PowerEffectsConfig
): number {
  if (value === undefined) {
    return applyEffectRange(
      0,
      config.effects_min ?? DEFAULT_EFFECTS_MIN,
      config.effects_max ?? DEFAULT_EFFECTS_MAX
    );
  }

  const min = config.min ?? DEFAULT_POWER_MIN;
  const max = config.max ?? DEFAULT_POWER_MAX;
  const normalized = normalizeValue(value, min, max);
  return applyEffectRange(
    normalized,
    config.effects_min ?? DEFAULT_EFFECTS_MIN,
    config.effects_max ?? DEFAULT_EFFECTS_MAX
  );
}

/** Icon tint and glow strength 0–1 — ramps early and saturates before max draw. */
export function powerTint(intensity: number): number {
  const t = Math.min(1, Math.max(0, intensity));
  return Math.min(1, Math.pow(t, 0.5) / 0.75);
}

export interface Point {
  x: number;
  y: number;
}

export interface LightningArc {
  from: Point;
  to: Point;
  intensity: number;
  color?: string;
  /** Multiplier for stroke opacity (overflow arcs use a softer glow). */
  alphaScale?: number;
}

export function isOverMax(
  value: number | undefined,
  min: number,
  max: number
): boolean {
  return value !== undefined && max > min && value > max;
}

/** 0 when within range; 1 when one full span above max (capped at 2). */
export function overMaxRatio(
  value: number,
  min: number,
  max: number
): number {
  if (max <= min || value <= max) {
    return 0;
  }

  return Math.min(2, (value - max) / (max - min));
}

export function peakOverMaxRatio(
  values: (number | undefined)[],
  config: PowerEffectsConfig
): number {
  const min = config.min ?? DEFAULT_POWER_MIN;
  const max = config.max ?? DEFAULT_POWER_MAX;

  return values.reduce(
    (peak, value) =>
      Math.max(peak, value !== undefined ? overMaxRatio(value, min, max) : 0),
    0
  );
}

export function resolveOverMaxColor(host: HTMLElement): string {
  return readCssColor(host, "--error-color", "#f44336");
}

/** Furthest distance from a point along a ray before leaving the canvas. */
function rayMaxRadius(
  origin: Point,
  width: number,
  height: number,
  angle: number
): number {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  let maxR = Infinity;

  if (cos > 0.001) {
    maxR = Math.min(maxR, (width - origin.x) / cos);
  } else if (cos < -0.001) {
    maxR = Math.min(maxR, -origin.x / cos);
  }

  if (sin > 0.001) {
    maxR = Math.min(maxR, (height - origin.y) / sin);
  } else if (sin < -0.001) {
    maxR = Math.min(maxR, -origin.y / sin);
  }

  return Number.isFinite(maxR) ? Math.max(0, maxR) : 0;
}

/** Wild bolts from an origin — severity scales count, reach, and flicker. */
export function appendChaoticArcs(
  arcs: LightningArc[],
  origin: Point,
  width: number,
  height: number,
  severity: number,
  phase: number,
  color?: string
): void {
  if (severity <= 0 || width <= 0 || height <= 0) {
    return;
  }

  const t = Math.min(1, severity / 2);
  const count = Math.min(6, Math.max(1, Math.round(0.35 + t * 3.5)));

  const lengthMin = 0.14;
  const lengthMax = 1;
  const lengthT = lengthMin + t * (lengthMax - lengthMin);
  const flickerRate = 1.2 + t * 1.4;
  const alphaScale = 0.48 + t * 0.28;
  const intensity = Math.min(1, 0.22 + t * 0.58);

  for (let i = 0; i < count; i += 1) {
    const angle =
      seededRandom(Math.floor(phase * flickerRate) + i * 17.3) * Math.PI * 2;
    const maxR = rayMaxRadius(origin, width, height, angle);
    if (maxR < 6) {
      continue;
    }

    const radius =
      maxR *
      lengthT *
      (0.5 + seededRandom(phase + i * 3.7) * 0.5);
    arcs.push({
      from: origin,
      to: {
        x: origin.x + Math.cos(angle) * radius,
        y: origin.y + Math.sin(angle) * radius,
      },
      intensity,
      alphaScale,
      color,
    });
  }
}

export function readCssColor(
  host: HTMLElement,
  variable: string,
  fallback: string
): string {
  const value = getComputedStyle(host).getPropertyValue(variable).trim();
  return value || fallback;
}

export function parseNumericState(state: string | undefined): number | undefined {
  if (state === undefined || state === "unavailable" || state === "unknown") {
    return undefined;
  }

  const value = Number(state);
  return Number.isFinite(value) ? value : undefined;
}

export function normalizeValue(value: number, min: number, max: number): number {
  if (max <= min) {
    return 0;
  }

  return Math.min(1, Math.max(0, (value - min) / (max - min)));
}

/** Map normalized power into a configurable effect output range. */
export function applyEffectRange(
  intensity: number,
  effectMin = DEFAULT_EFFECTS_MIN,
  effectMax = DEFAULT_EFFECTS_MAX
): number {
  const lo = Math.min(effectMin, effectMax);
  const hi = Math.max(effectMin, effectMax);
  const t = Math.min(1, Math.max(0, intensity));
  return lo + t * (hi - lo);
}

export function anchorCenter(
  element: Element | undefined,
  canvas: HTMLCanvasElement,
  anchor: "center" | "top" | "right" | "bottom" | "left" = "center"
): Point | undefined {
  if (!element) {
    return undefined;
  }

  const canvasRect = canvas.getBoundingClientRect();
  const rect = element.getBoundingClientRect();

  if (rect.width <= 0 || rect.height <= 0) {
    return undefined;
  }

  let x = rect.left + rect.width / 2 - canvasRect.left;
  let y = rect.top + rect.height / 2 - canvasRect.top;

  if (anchor === "top") {
    y = rect.top - canvasRect.top;
  } else if (anchor === "bottom") {
    y = rect.bottom - canvasRect.top;
  } else if (anchor === "left") {
    x = rect.left - canvasRect.left;
  } else if (anchor === "right") {
    x = rect.right - canvasRect.left;
  }

  return { x, y };
}

function seededRandom(seed: number): number {
  const value = Math.sin(seed * 127.1 + seed * 311.7) * 43758.5453;
  return value - Math.floor(value);
}

/** A jagged polyline: straight segments, random turns, fixed start/end. */
function zigzagPath(
  from: Point,
  to: Point,
  segmentCount: number,
  displacement: number,
  seed: number
): Point[] {
  const points: Point[] = [from];
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy) || 1;
  const perpX = -dy / length;
  const perpY = dx / length;
  const dirX = dx / length;
  const dirY = dy / length;

  for (let i = 1; i < segmentCount; i += 1) {
    const t = i / segmentCount;
    const envelope = Math.sin(t * Math.PI);
    const side = seededRandom(seed + i * 5.17) * 2 - 1;
    const along = seededRandom(seed + i * 9.43) * 2 - 1;
    const offset = displacement * envelope;

    points.push({
      x:
        from.x +
        dx * t +
        perpX * offset * side +
        dirX * offset * 0.2 * along,
      y:
        from.y +
        dy * t +
        perpY * offset * side +
        dirY * offset * 0.2 * along,
    });
  }

  points.push(to);
  return points;
}

function strokePolyline(
  ctx: CanvasRenderingContext2D,
  points: Point[],
  color: string,
  alpha: number,
  width: number
): void {
  if (points.length < 2) {
    return;
  }

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = width * 3;
  ctx.globalAlpha = alpha;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i += 1) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();
  ctx.restore();
}

function drawSingleBolt(
  ctx: CanvasRenderingContext2D,
  from: Point,
  to: Point,
  intensity: number,
  seed: number,
  color: string,
  alphaScale = 1
): void {
  const cappedIntensity = Math.min(1, intensity);
  const drawIntensity = effectiveIntensity(cappedIntensity);
  const distance = Math.hypot(to.x - from.x, to.y - from.y);
  if (distance < 4) {
    return;
  }

  const segments = Math.min(14, Math.max(5, Math.round(distance / 14)));
  const displacement = wiggleAmplitude(cappedIntensity, distance);
  const points = zigzagPath(from, to, segments, displacement, seed);
  const alpha = (0.5 + drawIntensity * 0.42) * alphaScale;
  const width = 1 + drawIntensity * 1.6;
  strokePolyline(ctx, points, color, alpha, width);
}

export function drawLightningArc(
  ctx: CanvasRenderingContext2D,
  from: Point,
  to: Point,
  intensity: number,
  phase: number,
  color: string,
  alphaScale = 1
): void {
  if (intensity <= 0) {
    return;
  }

  const distance = Math.hypot(to.x - from.x, to.y - from.y);
  if (distance < 4) {
    return;
  }

  drawSingleBolt(
    ctx,
    from,
    to,
    intensity,
    Math.floor(phase * 3),
    color,
    alphaScale
  );
}

export class PowerLightningRenderer {
  private _canvas?: HTMLCanvasElement;
  private _ctx?: CanvasRenderingContext2D;
  private _host: HTMLElement;
  private _getArcs: (phase: number) => LightningArc[];
  private _getColor: () => string;
  private _onFrame?: (delta: number) => void;
  private _frameId = 0;
  private _animating = false;
  private _lastFrame = 0;
  private _phase = 0;
  private _resizeObserver?: ResizeObserver;

  constructor(
    host: HTMLElement,
    getArcs: (phase: number) => LightningArc[],
    getColor: () => string,
    onFrame?: (delta: number) => void
  ) {
    this._host = host;
    this._getArcs = getArcs;
    this._getColor = getColor;
    this._onFrame = onFrame;
  }

  attach(canvas: HTMLCanvasElement): void {
    if (this._canvas !== canvas) {
      this.detach();
      this._canvas = canvas;
      this._ctx = canvas.getContext("2d") ?? undefined;
    }

    if (!this._ctx || !this._canvas) {
      return;
    }

    if (!this._resizeObserver) {
      this._resizeObserver = new ResizeObserver(() => this._resizeCanvas());
      this._resizeObserver.observe(canvas.parentElement ?? this._host);
      this._resizeCanvas();
    }

    if (!this._animating) {
      this._lastFrame = 0;
      this._startAnimation();
    }
  }

  detach(): void {
    cancelAnimationFrame(this._frameId);
    this._animating = false;
    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;
    this._canvas = undefined;
    this._ctx = undefined;
  }

  private _resizeCanvas(): void {
    const canvas = this._canvas;
    const ctx = this._ctx;
    if (!canvas || !ctx) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  private _startAnimation(): void {
    if (this._animating) {
      return;
    }

    this._animating = true;

    const tick = (now: number) => {
      if (!this._animating || !this._ctx || !this._canvas?.isConnected) {
        this._animating = false;
        return;
      }

      const delta = this._lastFrame
        ? Math.min((now - this._lastFrame) / 16.67, 3)
        : 1;
      this._lastFrame = now;
      this._onFrame?.(delta);
      this._draw(delta);
      this._frameId = requestAnimationFrame(tick);
    };

    this._frameId = requestAnimationFrame(tick);
  }

  private _draw(delta: number): void {
    const canvas = this._canvas;
    const ctx = this._ctx;
    if (!canvas || !ctx) {
      return;
    }

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (width <= 0 || height <= 0) {
      return;
    }

    const arcs = this._getArcs(this._phase);
    const maxIntensity = arcs.reduce(
      (peak, arc) => Math.max(peak, Math.min(1, arc.intensity)),
      0
    );

    this._phase += delta * (0.32 + maxIntensity * 0.38);
    ctx.clearRect(0, 0, width, height);

    const color = this._getColor();
    for (const arc of arcs) {
      drawLightningArc(
        ctx,
        arc.from,
        arc.to,
        arc.intensity,
        this._phase,
        arc.color ?? color,
        arc.alphaScale ?? 1
      );
    }
  }
}
