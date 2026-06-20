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

export type CallWS = <T = unknown>(
  message: Record<string, unknown>
) => Promise<T>;

export function formatHistoryError(
  error: unknown,
  fallback = "Could not load history"
): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message: unknown }).message === "string"
  ) {
    return (error as { message: string }).message;
  }

  return fallback;
}

export function resolveCallWS(hass: HomeAssistant): CallWS {
  if (hass.callWS) {
    return hass.callWS.bind(hass);
  }

  const connection = (
    hass as HomeAssistant & {
      connection?: { sendMessagePromise: CallWS };
    }
  ).connection;

  if (connection?.sendMessagePromise) {
    return connection.sendMessagePromise.bind(connection);
  }

  throw new Error("WebSocket API unavailable");
}

function requireCallWS(hass: HomeAssistant) {
  return resolveCallWS(hass);
}

export function isBinaryEntity(entityId: string | undefined): boolean {
  if (!entityId) {
    return false;
  }
  const domain = entityId.split(".", 1)[0];
  return domain === "binary_sensor" || domain === "input_boolean";
}

export function isCounterLikeEntity(
  attributes: Record<string, unknown> | undefined
): boolean {
  const stateClass = attributes?.state_class;
  return stateClass === "total_increasing" || stateClass === "total";
}

export function defaultAggregate(
  entityId: string | undefined,
  attributes?: Record<string, unknown>
): AggregateType {
  if (isBinaryEntity(entityId)) {
    return "count";
  }
  if (isCounterLikeEntity(attributes)) {
    return "last";
  }
  return "mean";
}

/** Statistics summarize whole periods; end-of-period values need raw history. */
export function prefersRawHistory(aggregate: AggregateType): boolean {
  return aggregate === "last" || aggregate === "max";
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

function toEpochMs(timestamp: number): number {
  return timestamp < 1e11 ? timestamp * 1000 : timestamp;
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
    points.push({ time: toEpochMs(value.start), value: numeric });
  }

  return points;
}

const MAX_RAW_HISTORY_POINTS = 8000;

function downsamplePoints(
  points: HistoryPoint[],
  maxPoints: number
): HistoryPoint[] {
  if (points.length <= maxPoints) {
    return points;
  }

  const step = Math.ceil(points.length / maxPoints);
  const sampled: HistoryPoint[] = [];
  for (let index = 0; index < points.length; index += step) {
    sampled.push(points[index]);
  }
  return sampled;
}

function normalizeHistoryResponse(
  response: Record<string, EntityHistoryState[]> | EntityHistoryState[][],
  entityId: string
): EntityHistoryState[] {
  if (Array.isArray(response)) {
    return response[0] ?? [];
  }
  return response[entityId] ?? [];
}

export async function fetchHistoryPoints(
  hass: HomeAssistant,
  entityId: string,
  start: Date,
  end: Date,
  binary: boolean
): Promise<HistoryPoint[]> {
  const callWS = requireCallWS(hass);
  const response = await callWS<
    Record<string, EntityHistoryState[]> | EntityHistoryState[][]
  >({
    type: "history/history_during_period",
    start_time: start.toISOString(),
    end_time: end.toISOString(),
    entity_ids: [entityId],
    minimal_response: true,
    no_attributes: true,
    significant_changes_only: true,
  });

  return downsamplePoints(
    historyToPoints(normalizeHistoryResponse(response, entityId), binary),
    MAX_RAW_HISTORY_POINTS
  );
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

  if (periodHours >= 24 && !prefersRawHistory(aggregate)) {
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

  if (periodHours >= 24 && aggregate === "max") {
    try {
      const period = periodHours > 24 * 14 ? "day" : "hour";
      const stats = await fetchStatisticsPoints(
        hass,
        entityId,
        start,
        end,
        "max",
        period
      );
      if (stats.length > 0) {
        return stats;
      }
    } catch {
      // Fall back to raw history below.
    }
  }

  return fetchHistoryPoints(hass, entityId, start, end, false);
}
