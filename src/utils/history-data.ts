import type { HomeAssistant } from "../types";

export interface HistoryPoint {
  time: number;
  value: number;
}

export interface EntityHistoryState {
  s: string;
  a?: Record<string, unknown>;
  lc?: number;
  lu: number;
}

interface StatisticValue {
  start: number;
  end: number;
  change?: number | null;
  max?: number | null;
  mean?: number | null;
  min?: number | null;
  sum?: number | null;
  state?: number | null;
}

type StatisticsResponse = Record<string, StatisticValue[]>;

export type AggregateType = "mean" | "sum" | "max" | "min" | "count" | "last";

function requireCallWS(hass: HomeAssistant) {
  if (!hass.callWS) {
    throw new Error("WebSocket API unavailable");
  }
  return hass.callWS.bind(hass);
}

export function isBinaryEntity(entityId: string | undefined): boolean {
  if (!entityId) {
    return false;
  }
  const domain = entityId.split(".", 1)[0];
  return domain === "binary_sensor" || domain === "input_boolean";
}

export function defaultAggregate(entityId: string | undefined): AggregateType {
  return isBinaryEntity(entityId) ? "count" : "mean";
}

function historyToPoints(
  states: EntityHistoryState[],
  binary: boolean
): HistoryPoint[] {
  const points: HistoryPoint[] = [];
  let prevOn = false;

  for (const state of states) {
    const time = (state.lu ?? state.lc ?? 0) * 1000;
    if (binary) {
      const on = state.s === "on";
      if (on && !prevOn) {
        points.push({ time, value: 1 });
      }
      prevOn = on;
      continue;
    }

    const value = Number(state.s);
    if (Number.isFinite(value)) {
      points.push({ time, value });
    }
  }

  return points;
}

function statisticField(
  value: StatisticValue,
  aggregate: AggregateType
): number | undefined {
  switch (aggregate) {
    case "mean":
      return value.mean ?? value.state ?? undefined;
    case "sum":
      return value.sum ?? value.change ?? undefined;
    case "max":
      return value.max ?? undefined;
    case "min":
      return value.min ?? undefined;
    case "last":
      return value.state ?? value.mean ?? undefined;
    case "count":
      return value.change ?? undefined;
    default:
      return value.mean ?? value.state ?? undefined;
  }
}

function statisticsToPoints(
  values: StatisticValue[],
  aggregate: AggregateType
): HistoryPoint[] {
  const points: HistoryPoint[] = [];

  for (const value of values) {
    const numeric = statisticField(value, aggregate);
    if (numeric === undefined || numeric === null || !Number.isFinite(numeric)) {
      continue;
    }
    points.push({ time: value.start, value: numeric });
  }

  return points;
}

export async function fetchHistoryPoints(
  hass: HomeAssistant,
  entityId: string,
  start: Date,
  end: Date,
  binary: boolean
): Promise<HistoryPoint[]> {
  const callWS = requireCallWS(hass);
  const response = await callWS<Record<string, EntityHistoryState[]>>({
    type: "history/history_during_period",
    start_time: start.toISOString(),
    end_time: end.toISOString(),
    entity_ids: [entityId],
    minimal_response: true,
    no_attributes: true,
  });

  return historyToPoints(response[entityId] ?? [], binary);
}

export async function fetchStatisticsPoints(
  hass: HomeAssistant,
  entityId: string,
  start: Date,
  end: Date,
  aggregate: AggregateType,
  period: "hour" | "day"
): Promise<HistoryPoint[]> {
  const callWS = requireCallWS(hass);
  const types =
    aggregate === "sum"
      ? ["sum", "change"]
      : aggregate === "max"
        ? ["max"]
        : aggregate === "min"
          ? ["min"]
          : ["mean", "state"];

  const response = await callWS<StatisticsResponse>({
    type: "recorder/statistics_during_period",
    start_time: start.toISOString(),
    end_time: end.toISOString(),
    statistic_ids: [entityId],
    period,
    types,
  });

  return statisticsToPoints(response[entityId] ?? [], aggregate);
}

export async function loadHistoryPoints(
  hass: HomeAssistant,
  entityId: string,
  periodHours: number,
  aggregate: AggregateType
): Promise<HistoryPoint[]> {
  const end = new Date();
  const start = new Date(end.getTime() - periodHours * 60 * 60 * 1000);
  const binary = isBinaryEntity(entityId);

  if (binary || aggregate === "count") {
    return fetchHistoryPoints(hass, entityId, start, end, true);
  }

  if (periodHours > 48) {
    try {
      const period = periodHours > 24 * 14 ? "day" : "hour";
      const stats = await fetchStatisticsPoints(
        hass,
        entityId,
        start,
        end,
        aggregate,
        period
      );
      if (stats.length > 0) {
        return stats;
      }
    } catch {
      // Fall back to raw history within recorder retention.
    }
  }

  return fetchHistoryPoints(hass, entityId, start, end, false);
}
