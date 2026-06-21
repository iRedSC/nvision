import type { HistoryPoint } from "../../utils/history-data";
import type { GraphStyle } from "./stat-card-config";

export interface GraphDrawOptions {
  style: GraphStyle;
  smoothing: boolean;
  showFill: boolean;
  lineColor: string;
}

interface PlotPoint {
  x: number;
  y: number;
}

const MAX_BARS = 48;
const GRAPH_PADDING = { top: 4, right: 0, bottom: 2, left: 0 };

function sortedPoints(points: HistoryPoint[]): HistoryPoint[] {
  return [...points].sort((a, b) => a.time - b.time);
}

function valueBounds(values: number[]): { min: number; max: number } {
  let min = values[0];
  let max = values[0];

  for (const value of values) {
    min = Math.min(min, value);
    max = Math.max(max, value);
  }

  if (min === max) {
    const pad = Math.abs(min) * 0.1 || 1;
    return { min: min - pad, max: max + pad };
  }

  const span = max - min;
  return { min: min - span * 0.06, max: max + span * 0.06 };
}

function toPlotPoints(
  points: HistoryPoint[],
  width: number,
  height: number
): PlotPoint[] {
  if (!points.length) {
    return [];
  }

  const values = points.map((point) => point.value);
  const { min, max } = valueBounds(values);
  const span = max - min || 1;
  const innerWidth = Math.max(1, width - GRAPH_PADDING.left - GRAPH_PADDING.right);
  const innerHeight = Math.max(1, height - GRAPH_PADDING.top - GRAPH_PADDING.bottom);
  const start = points[0].time;
  const end = points[points.length - 1].time;
  const timeSpan = end - start || 1;

  return points.map((point) => ({
    x:
      GRAPH_PADDING.left +
      ((point.time - start) / timeSpan) * innerWidth,
    y:
      GRAPH_PADDING.top +
      (1 - (point.value - min) / span) * innerHeight,
  }));
}

function bucketForBars(points: HistoryPoint[], maxBars: number): HistoryPoint[] {
  if (points.length <= maxBars) {
    return points;
  }

  const chunkSize = Math.ceil(points.length / maxBars);
  const buckets: HistoryPoint[] = [];

  for (let index = 0; index < points.length; index += chunkSize) {
    const chunk = points.slice(index, index + chunkSize);
    if (!chunk.length) {
      continue;
    }

    const peak = chunk.reduce(
      (best, point) => (point.value > best.value ? point : best),
      chunk[0]
    );
    buckets.push(peak);
  }

  return buckets;
}

function tracePath(ctx: CanvasRenderingContext2D, points: PlotPoint[]): void {
  if (!points.length) {
    return;
  }

  ctx.moveTo(points[0].x, points[0].y);
  for (let index = 1; index < points.length; index++) {
    ctx.lineTo(points[index].x, points[index].y);
  }
}

function traceSmoothPath(ctx: CanvasRenderingContext2D, points: PlotPoint[]): void {
  if (!points.length) {
    return;
  }

  if (points.length < 3) {
    tracePath(ctx, points);
    return;
  }

  ctx.moveTo(points[0].x, points[0].y);
  for (let index = 0; index < points.length - 2; index++) {
    const current = points[index];
    const next = points[index + 1];
    const midX = (current.x + next.x) / 2;
    const midY = (current.y + next.y) / 2;
    ctx.quadraticCurveTo(current.x, current.y, midX, midY);
  }

  const last = points[points.length - 1];
  const prev = points[points.length - 2];
  ctx.quadraticCurveTo(prev.x, prev.y, last.x, last.y);
}

function fillUnderPath(
  ctx: CanvasRenderingContext2D,
  points: PlotPoint[],
  height: number,
  lineColor: string
): void {
  if (points.length < 2) {
    return;
  }

  const gradient = ctx.createLinearGradient(0, GRAPH_PADDING.top, 0, height);
  gradient.addColorStop(0, withAlpha(lineColor, 0.28));
  gradient.addColorStop(1, withAlpha(lineColor, 0));

  ctx.beginPath();
  ctx.moveTo(points[0].x, height);
  ctx.lineTo(points[0].x, points[0].y);
  tracePath(ctx, points.slice(1));
  ctx.lineTo(points[points.length - 1].x, height);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();
}

function withAlpha(color: string, alpha: number): string {
  return `color-mix(in srgb, ${color} ${Math.round(alpha * 100)}%, transparent)`;
}

function drawBars(
  ctx: CanvasRenderingContext2D,
  points: HistoryPoint[],
  width: number,
  height: number,
  lineColor: string
): void {
  const sorted = sortedPoints(points);
  const buckets = bucketForBars(sorted, MAX_BARS);
  const plotPoints = toPlotPoints(buckets, width, height);
  if (!plotPoints.length) {
    return;
  }

  const slotWidth = Math.max(2, (width - GRAPH_PADDING.left) / plotPoints.length);
  const barWidth = Math.max(2, slotWidth * 0.72);
  const baseY = height - GRAPH_PADDING.bottom;

  ctx.fillStyle = withAlpha(lineColor, 0.82);
  for (const point of plotPoints) {
    const x = point.x - barWidth / 2;
    const barHeight = Math.max(1, baseY - point.y);
    ctx.fillRect(x, point.y, barWidth, barHeight);
  }
}

function drawLineOrArea(
  ctx: CanvasRenderingContext2D,
  points: HistoryPoint[],
  width: number,
  height: number,
  options: GraphDrawOptions
): void {
  const plotPoints = toPlotPoints(sortedPoints(points), width, height);
  if (plotPoints.length < 2) {
    if (plotPoints.length === 1) {
      ctx.fillStyle = options.lineColor;
      ctx.beginPath();
      ctx.arc(plotPoints[0].x, plotPoints[0].y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
    return;
  }

  const fill = options.style === "area" || options.showFill;
  if (fill) {
    fillUnderPath(ctx, plotPoints, height, options.lineColor);
  }

  ctx.beginPath();
  if (options.smoothing) {
    traceSmoothPath(ctx, plotPoints);
  } else {
    tracePath(ctx, plotPoints);
  }

  ctx.strokeStyle = options.lineColor;
  ctx.lineWidth = 2;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.stroke();
}

export function drawStatGraph(
  canvas: HTMLCanvasElement,
  points: HistoryPoint[],
  options: GraphDrawOptions
): void {
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(1, Math.floor(rect.width));
  const height = Math.max(1, Math.floor(rect.height));

  if (!width || !height) {
    return;
  }

  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);

  if (!points.length) {
    return;
  }

  if (options.style === "bar") {
    drawBars(ctx, points, width, height, options.lineColor);
    return;
  }

  drawLineOrArea(ctx, points, width, height, options);
}
