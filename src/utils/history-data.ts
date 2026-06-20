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

export function isHistoryStatsEntity(
  attributes: Record<string, unknown> | undefined
): boolean {
  return (
    typeof attributes?.start === "string" &&
    typeof attributes?.end === "string" &&
    attributes?.value !== undefined
  );
}

export function isDailyTallyEntity(
  entityId: string | undefined,
  attributes: Record<string, unknown> | undefined
): boolean {
  if (isHistoryStatsEntity(attributes)) {
    return true;
  }
  if (attributes?.last_reset) {
    return true;
  }
  if (entityId && /_today$/i.test(entityId)) {
    return true;
  }
  return false;
}

export function defaultAggregate(
  entityId: string | undefined,
  attributes?: Record<string, unknown>
): AggregateType {
  if (isBinaryEntity(entityId)) {
    return "count";
  }
  if (isDailyTallyEntity(entityId, attributes)) {
    return "max";
  }
  if (isCounterLikeEntity(attributes)) {
    return "last";
  }
  return "mean";
}

/** Raw history is required to resolve true end-of-bucket values. */
export function prefersRawHistory(aggregate: AggregateType): boolean {
  return aggregate === "last";
}

function needsPeakPreservation(aggregate: AggregateType): boolean {
  return aggregate === "max" || aggregate === "last";
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

function dateKeyInZone(timeMs: number, timeZone: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(timeMs));
}

/** One point per local day: highest reading before the next daily reset. */
export function collapseToDailyMax(
  points: HistoryPoint[],
  timeZone: string
): HistoryPoint[] {
  const byDay = new Map<string, HistoryPoint>();

  for (const point of points) {
    const key = dateKeyInZone(point.time, timeZone);
    const existing = byDay.get(key);
    if (
      !existing ||
      point.value > existing.value ||
      (point.value === existing.value && point.time > existing.time)
    ) {
      byDay.set(key, point);
    }
  }

  return Array.from(byDay.values()).sort((a, b) => a.time - b.time);
}

function statsLookUsable(
  points: HistoryPoint[],
  aggregate: AggregateType
): boolean {
  if (!points.length) {
    return false;
  }
  if (aggregate !== "max" && aggregate !== "sum") {
    return true;
  }
  return points.some((point) => point.value > 0);
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
      return value.max ?? value.sum ?? undefined;
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
  maxPoints: number,
  preservePeaks = false
): HistoryPoint[] {
  if (points.length <= maxPoints) {
    return points;
  }

  const chunkSize = Math.ceil(points.length / maxPoints);
  const sampled: HistoryPoint[] = [];

  for (let index = 0; index < points.length; index += chunkSize) {
    const chunk = points.slice(index, index + chunkSize);
    if (!chunk.length) {
      continue;
    }

    if (preservePeaks) {
      sampled.push(
        chunk.reduce((best, point) => {
          if (point.value > best.value) {
            return point;
          }
          if (point.value === best.value && point.time > best.time) {
            return point;
          }
          return best;
        }, chunk[0])
      );
      continue;
    }

    sampled.push(chunk[0]);
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
  binary: boolean,
  aggregate: AggregateType = "mean"
): Promise<HistoryPoint[]> {
  const callWS = requireCallWS(hass);
  const fullHistory = needsPeakPreservation(aggregate);
  const response = await callWS<
    Record<string, EntityHistoryState[]> | EntityHistoryState[][]
  >({
    type: "history/history_during_period",
    start_time: start.toISOString(),
    end_time: end.toISOString(),
    entity_ids: [entityId],
    minimal_response: true,
    no_attributes: true,
    significant_changes_only: !fullHistory,
  });

  return downsamplePoints(
    historyToPoints(normalizeHistoryResponse(response, entityId), binary),
    MAX_RAW_HISTORY_POINTS,
    fullHistory
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
        ? ["max", "sum"]
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
    return fetchHistoryPoints(hass, entityId, start, end, true, aggregate);
  }

  if (periodHours >= 24 && (aggregate === "max" || aggregate === "sum")) {
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
      if (statsLookUsable(stats, aggregate)) {
        return stats;
      }
    } catch {
      // Fall back to raw history below.
    }
  }

  if (periodHours >= 24 && aggregate === "mean") {
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

  return fetchHistoryPoints(hass, entityId, start, end, false, aggregate);
}
