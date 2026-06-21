import {
  defaultAggregate,
  loadHistoryPoints,
  type AggregateType,
} from "../../utils/history-data";
import type { HomeAssistant } from "../../types";
import type { HassEntity } from "home-assistant-js-websocket";
import { parseNumericState } from "../../utils/power-lightning";
import { FLAT_TREND_THRESHOLD } from "./const";

export type TrendDirection = "up" | "down" | "flat";

export interface TrendDisplay {
  direction: TrendDirection;
  colorTone: TrendColorTone;
  text: string;
}

export type TrendColorTone = "positive" | "negative" | "flat";

export interface TrendResult {
  percent?: number;
  absolute?: number;
}

export function computeTrendResult(
  current: number | undefined,
  past: number | undefined
): TrendResult | undefined {
  if (
    current === undefined ||
    past === undefined ||
    !Number.isFinite(current) ||
    !Number.isFinite(past)
  ) {
    return undefined;
  }

  if (past === 0) {
    const delta = current - past;
    if (Math.abs(delta) < 1e-9) {
      return { percent: 0 };
    }
    return { absolute: delta };
  }

  return { percent: ((current - past) / Math.abs(past)) * 100 };
}

export function resolveTrendDirection(
  result: TrendResult | undefined
): TrendDirection {
  if (!result) {
    return "flat";
  }

  const delta =
    result.absolute ??
    (result.percent !== undefined ? result.percent : 0);

  if (Math.abs(delta) < FLAT_TREND_THRESHOLD) {
    return "flat";
  }

  return delta > 0 ? "up" : "down";
}

export function resolveTrendColorTone(
  direction: TrendDirection,
  invertColors: boolean
): TrendColorTone {
  if (direction === "flat") {
    return "flat";
  }

  const positive = direction === "up";
  if (invertColors) {
    return positive ? "negative" : "positive";
  }
  return positive ? "positive" : "negative";
}

export function formatTrendText(result: TrendResult | undefined): string {
  if (!result) {
    return "—";
  }

  if (result.absolute !== undefined) {
    const rounded =
      Math.abs(result.absolute - Math.round(result.absolute)) < 0.05
        ? String(Math.round(result.absolute))
        : result.absolute.toFixed(1);
    const prefix = result.absolute > 0 ? "+" : "";
    return `${prefix}${rounded}`;
  }

  const percent = result.percent ?? 0;
  return `${Math.abs(percent).toFixed(1)}%`;
}

export function readTrendFromEntity(
  hass: HomeAssistant,
  trendEntity: string | undefined
): TrendResult | undefined {
  if (!trendEntity) {
    return undefined;
  }

  const value = parseNumericState(hass.states[trendEntity]?.state);
  if (value === undefined) {
    return undefined;
  }

  return { percent: value };
}

export async function loadPastValue(
  hass: HomeAssistant,
  entityId: string,
  periodHours: number,
  aggregate: AggregateType
): Promise<number | undefined> {
  const points = await loadHistoryPoints(
    hass,
    entityId,
    periodHours,
    aggregate
  );

  if (!points.length) {
    return undefined;
  }

  points.sort((a, b) => a.time - b.time);
  return points[0]?.value;
}

export function resolveAggregate(
  hass: HomeAssistant | undefined,
  entityId: string | undefined
): AggregateType {
  const attributes = entityId
    ? hass?.states[entityId]?.attributes
    : undefined;
  return defaultAggregate(entityId, attributes);
}

export function formatComparedValue(
  hass: HomeAssistant | undefined,
  value: number | undefined,
  stateObj: HassEntity | undefined
): string {
  if (value === undefined || !Number.isFinite(value)) {
    return "—";
  }

  if (hass?.formatEntityStateToParts && stateObj) {
    const parts = hass.formatEntityStateToParts(stateObj, String(value));
    const formatted = parts.map((part) => part.value).join("");
    if (formatted.length > 0) {
      return formatted;
    }
  }

  const unit =
    typeof stateObj?.attributes?.unit_of_measurement === "string"
      ? stateObj.attributes.unit_of_measurement
      : "";

  const rounded =
    Math.abs(value - Math.round(value)) < 0.05
      ? String(Math.round(value))
      : value.toFixed(1);

  if (!unit) {
    return rounded;
  }

  const suffix = unit.startsWith("°") ? unit : ` ${unit}`.trimEnd();
  return `${rounded}${suffix}`;
}

export function buildTrendDisplay(
  result: TrendResult | undefined,
  invertColors: boolean
): TrendDisplay {
  const direction = resolveTrendDirection(result);
  return {
    direction,
    colorTone: resolveTrendColorTone(direction, invertColors),
    text: formatTrendText(result),
  };
}
