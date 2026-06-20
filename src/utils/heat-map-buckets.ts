import type { HistoryPoint, AggregateType } from "./history-data";

export type AxisField =
  | "hour"
  | "weekday"
  | "day"
  | "week"
  | "month"
  | "time"
  | "none";

export type PeriodPreset =
  | "24h"
  | "48h"
  | "7d"
  | "14d"
  | "30d"
  | "90d"
  | "365d";

export type HeatMapPreset =
  | "week_hourly"
  | "two_weeks"
  | "daily_rhythm"
  | "month_days"
  | "month_calendar"
  | "quarter"
  | "timeline_24h"
  | "timeline_48h"
  | "year_overview"
  | "timeline"
  | "custom";

export const PERIOD_HOURS: Record<PeriodPreset, number> = {
  "24h": 24,
  "48h": 48,
  "7d": 168,
  "14d": 336,
  "30d": 720,
  "90d": 2160,
  "365d": 8760,
};

export const PRESET_AXES: Record<
  Exclude<HeatMapPreset, "custom" | "timeline">,
  { x: AxisField; y: AxisField; period: PeriodPreset }
> = {
  week_hourly: { x: "hour", y: "day", period: "7d" },
  two_weeks: { x: "hour", y: "day", period: "14d" },
  daily_rhythm: { x: "hour", y: "weekday", period: "30d" },
  month_days: { x: "weekday", y: "week", period: "30d" },
  month_calendar: { x: "weekday", y: "week", period: "90d" },
  quarter: { x: "week", y: "month", period: "90d" },
  timeline_24h: { x: "time", y: "none", period: "24h" },
  timeline_48h: { x: "time", y: "none", period: "48h" },
  year_overview: { x: "week", y: "month", period: "365d" },
};

const LEGACY_PRESET_MAP: Partial<Record<HeatMapPreset, keyof typeof PRESET_AXES>> =
  {
    timeline: "timeline_24h",
    custom: "week_hourly",
  };

export interface HeatMapCellMeta {
  value: number | null;
  count: number;
  rangeLabel: string;
}

export interface HeatMapGrid {
  xLabels: string[];
  yLabels: string[];
  xKeys: string[];
  yKeys: string[];
  cells: HeatMapCellMeta[][];
  min: number;
  max: number;
}

interface ZonedParts {
  year: number;
  month: number;
  day: number;
  hour: number;
  weekday: number;
  dateKey: string;
  weekKey: string;
  monthKey: string;
}

interface PeriodWindow {
  startMs: number;
  endMs: number;
  hours: number;
}

const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const zonedFormatterCache = new Map<string, Intl.DateTimeFormat>();
const utcGuessFormatterCache = new Map<string, Intl.DateTimeFormat>();

function getZonedFormatter(timeZone: string): Intl.DateTimeFormat {
  let formatter = zonedFormatterCache.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      hour12: false,
      weekday: "short",
    });
    zonedFormatterCache.set(timeZone, formatter);
  }
  return formatter;
}

function getUtcGuessFormatter(timeZone: string): Intl.DateTimeFormat {
  let formatter = utcGuessFormatterCache.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    utcGuessFormatterCache.set(timeZone, formatter);
  }
  return formatter;
}

function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

function getZonedPartsBasic(
  timeMs: number,
  timeZone: string
): Omit<ZonedParts, "weekKey"> {
  const parts = Object.fromEntries(
    getZonedFormatter(timeZone)
      .formatToParts(new Date(timeMs))
      .map((part) => [part.type, part.value])
  );
  const weekday =
    WEEKDAY_SHORT.indexOf(String(parts.weekday)) >= 0
      ? WEEKDAY_SHORT.indexOf(String(parts.weekday))
      : 0;
  const year = Number(parts.year);
  const month = Number(parts.month);
  const day = Number(parts.day);
  const hour = Number(parts.hour) % 24;
  const dateKey = `${year}-${pad2(month)}-${pad2(day)}`;

  return {
    year,
    month,
    day,
    hour,
    weekday,
    dateKey,
    monthKey: `${year}-${pad2(month)}`,
  };
}

function getWeekKey(
  timeMs: number,
  timeZone: string,
  firstWeekday: number
): string {
  const weekStart = startOfWeekMs(timeMs, timeZone, firstWeekday);
  const parts = getZonedPartsBasic(weekStart, timeZone);
  return `${parts.year}-${pad2(parts.month)}-${pad2(parts.day)}`;
}

function getZonedParts(
  timeMs: number,
  timeZone: string,
  firstWeekday = 0
): ZonedParts {
  const basic = getZonedPartsBasic(timeMs, timeZone);
  return {
    ...basic,
    weekKey: getWeekKey(timeMs, timeZone, firstWeekday),
  };
}

function startOfWeekMs(timeMs: number, timeZone: string, firstWeekday: number): number {
  const parts = getZonedPartsBasic(timeMs, timeZone);
  const dayOffset = (parts.weekday - firstWeekday + 7) % 7;
  const dayStart = zonedTimeToUtcMs(
    parts.year,
    parts.month,
    parts.day,
    0,
    0,
    timeZone
  );
  return dayStart - dayOffset * 24 * 60 * 60 * 1000;
}

function zonedTimeToUtcMs(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  timeZone: string
): number {
  const guess = Date.UTC(year, month - 1, day, hour, minute, 0);
  const parts = Object.fromEntries(
    getUtcGuessFormatter(timeZone)
      .formatToParts(new Date(guess))
      .map((part) => [part.type, part.value])
  );
  const actual = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    0
  );
  return guess - (actual - guess);
}

function periodWindow(hours: number, endMs = Date.now()): PeriodWindow {
  return {
    hours,
    endMs,
    startMs: endMs - hours * 60 * 60 * 1000,
  };
}

function enumerateDays(
  window: PeriodWindow,
  timeZone: string
): { key: string; label: string }[] {
  const days: { key: string; label: string }[] = [];
  const startParts = getZonedPartsBasic(window.startMs, timeZone);
  let cursor = zonedTimeToUtcMs(
    startParts.year,
    startParts.month,
    startParts.day,
    0,
    0,
    timeZone
  );

  while (cursor <= window.endMs) {
    const parts = getZonedPartsBasic(cursor, timeZone);
    days.push({
      key: parts.dateKey,
      label: `${parts.month}/${parts.day}`,
    });
    cursor += 24 * 60 * 60 * 1000;
  }

  return days.slice(-Math.ceil(window.hours / 24));
}

function enumerateWeeks(
  window: PeriodWindow,
  timeZone: string,
  firstWeekday: number
): { key: string; label: string }[] {
  const weeks: { key: string; label: string }[] = [];
  let cursor = startOfWeekMs(window.startMs, timeZone, firstWeekday);

  while (cursor <= window.endMs) {
    const parts = getZonedPartsBasic(cursor, timeZone);
    weeks.push({
      key: parts.dateKey,
      label: `${parts.month}/${parts.day}`,
    });
    cursor += 7 * 24 * 60 * 60 * 1000;
  }

  return weeks;
}

function enumerateMonths(
  window: PeriodWindow,
  timeZone: string
): { key: string; label: string }[] {
  const months: { key: string; label: string }[] = [];
  const startParts = getZonedPartsBasic(window.startMs, timeZone);
  let year = startParts.year;
  let month = startParts.month;

  while (true) {
    const key = `${year}-${pad2(month)}`;
    months.push({ key, label: `${year}-${pad2(month)}` });
    month += 1;
    if (month > 12) {
      month = 1;
      year += 1;
    }
    const cursor = zonedTimeToUtcMs(year, month, 1, 0, 0, timeZone);
    if (cursor > window.endMs) {
      break;
    }
  }

  return months;
}

function timeBucketMs(hours: number): number {
  if (hours <= 24) {
    return 60 * 60 * 1000;
  }
  if (hours <= 48) {
    return 60 * 60 * 1000;
  }
  if (hours <= 14 * 24) {
    return 60 * 60 * 1000;
  }
  return 24 * 60 * 60 * 1000;
}

function enumerateTimeBuckets(
  window: PeriodWindow,
  bucketMs: number
): { key: string; label: string; start: number; end: number }[] {
  const buckets: { key: string; label: string; start: number; end: number }[] = [];
  let cursor =
    Math.floor(window.startMs / bucketMs) * bucketMs;

  while (cursor < window.endMs) {
    const end = cursor + bucketMs;
    const date = new Date(cursor);
    buckets.push({
      key: String(cursor),
      start: cursor,
      end,
      label: date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
    });
    cursor = end;
  }

  return buckets;
}

function axisKey(
  field: AxisField,
  timeMs: number,
  timeZone: string,
  bucketMs: number,
  firstWeekday: number
): string | undefined {
  if (field === "none") {
    return "";
  }

  const parts = getZonedParts(timeMs, timeZone, firstWeekday);

  switch (field) {
    case "hour":
      return String(parts.hour);
    case "weekday":
      return String(parts.weekday);
    case "day":
      return parts.dateKey;
    case "week":
      return parts.weekKey;
    case "month":
      return parts.monthKey;
    case "time":
      return String(Math.floor(timeMs / bucketMs) * bucketMs);
    default:
      return undefined;
  }
}

interface BucketSample {
  time: number;
  value: number;
}

function aggregateSamples(
  samples: BucketSample[],
  aggregate: AggregateType
): number | null {
  if (!samples.length) {
    return null;
  }

  switch (aggregate) {
    case "sum":
    case "count":
      return samples.reduce((sum, sample) => sum + sample.value, 0);
    case "max":
      return Math.max(...samples.map((sample) => sample.value));
    case "min":
      return Math.min(...samples.map((sample) => sample.value));
    case "last": {
      let latest = samples[0];
      for (const sample of samples) {
        if (sample.time >= latest.time) {
          latest = sample;
        }
      }
      return latest.value;
    }
    case "mean":
    default:
      return (
        samples.reduce((sum, sample) => sum + sample.value, 0) / samples.length
      );
  }
}

const CALENDAR_AXIS_FIELDS: AxisField[] = ["day", "week", "month"];

/** Calendar buckets use max — peak before a daily reset is the period total. */
export function resolveBucketAggregate(
  xField: AxisField,
  yField: AxisField,
  aggregate: AggregateType,
  _attributes?: Record<string, unknown>
): AggregateType {
  if (aggregate === "count") {
    return "count";
  }

  const calendarView =
    CALENDAR_AXIS_FIELDS.includes(xField) ||
    CALENDAR_AXIS_FIELDS.includes(yField);

  if (calendarView) {
    return "max";
  }

  return aggregate;
}

function formatHourLabel(hour: number): string {
  const date = new Date(Date.UTC(2024, 0, 1, hour, 0, 0));
  return date.toLocaleTimeString([], { hour: "numeric" });
}

function buildAxis(
  field: AxisField,
  window: PeriodWindow,
  timeZone: string,
  firstWeekday: number,
  bucketMs: number
): { keys: string[]; labels: string[]; bucketRanges: Map<string, string> } {
  const bucketRanges = new Map<string, string>();

  if (field === "none") {
    return { keys: [""], labels: [""], bucketRanges };
  }

  if (field === "hour") {
    return {
      keys: Array.from({ length: 24 }, (_, hour) => String(hour)),
      labels: Array.from({ length: 24 }, (_, hour) => formatHourLabel(hour)),
      bucketRanges,
    };
  }

  if (field === "weekday") {
    const order = Array.from({ length: 7 }, (_, index) => (firstWeekday + index) % 7);
    return {
      keys: order.map(String),
      labels: order.map((day) => WEEKDAY_SHORT[day]),
      bucketRanges,
    };
  }

  if (field === "day") {
    const days = enumerateDays(window, timeZone);
    return {
      keys: days.map((day) => day.key),
      labels: days.map((day) => day.label),
      bucketRanges,
    };
  }

  if (field === "week") {
    const weeks = enumerateWeeks(window, timeZone, firstWeekday);
    return {
      keys: weeks.map((week) => week.key),
      labels: weeks.map((week) => week.label),
      bucketRanges,
    };
  }

  if (field === "month") {
    const months = enumerateMonths(window, timeZone);
    return {
      keys: months.map((month) => month.key),
      labels: months.map((month) => month.label),
      bucketRanges,
    };
  }

  const buckets = enumerateTimeBuckets(window, bucketMs);
  for (const bucket of buckets) {
    bucketRanges.set(
      bucket.key,
      `${new Date(bucket.start).toLocaleString()} – ${new Date(bucket.end).toLocaleString()}`
    );
  }
  return {
    keys: buckets.map((bucket) => bucket.key),
    labels: buckets.map((bucket) => bucket.label),
    bucketRanges,
  };
}

function cellRangeLabel(
  xField: AxisField,
  yField: AxisField,
  xKey: string,
  yKey: string,
  xLabel: string,
  yLabel: string,
  bucketRanges: Map<string, string>
): string {
  if (xField === "time") {
    return bucketRanges.get(xKey) ?? xLabel;
  }
  if (yField === "none") {
    return xLabel;
  }
  if (xField === "hour" && yField === "day") {
    return `${yLabel} ${xLabel}`;
  }
  if (xField === "hour" && yField === "weekday") {
    return `${yLabel} ${xLabel}`;
  }
  if (xField === "weekday" && yField === "week") {
    return `${yLabel} ${xLabel}`;
  }
  return `${yLabel} · ${xLabel}`;
}

export function resolveAxes(
  preset: HeatMapPreset | undefined
): { x: AxisField; y: AxisField; period: PeriodPreset } {
  const key =
    (preset && LEGACY_PRESET_MAP[preset]) ||
    (preset && preset in PRESET_AXES ? preset : undefined) ||
    "week_hourly";

  return PRESET_AXES[key as keyof typeof PRESET_AXES];
}

export function buildHeatMapGrid(
  points: HistoryPoint[],
  xField: AxisField,
  yField: AxisField,
  period: PeriodPreset,
  aggregate: AggregateType,
  timeZone: string,
  firstWeekday = 0,
  minOverride?: number,
  maxOverride?: number
): HeatMapGrid {
  const window = periodWindow(PERIOD_HOURS[period]);
  const bucketMs = timeBucketMs(window.hours);
  const xAxis = buildAxis(xField, window, timeZone, firstWeekday, bucketMs);
  const yAxis = buildAxis(yField, window, timeZone, firstWeekday, bucketMs);
  const xKeySet = new Set(xAxis.keys);
  const yKeySet = new Set(yAxis.keys);
  const bucketMap = new Map<string, BucketSample[]>();

  for (const point of points) {
    if (point.time < window.startMs || point.time > window.endMs) {
      continue;
    }

    const xKey = axisKey(xField, point.time, timeZone, bucketMs, firstWeekday);
    const yKey = axisKey(yField, point.time, timeZone, bucketMs, firstWeekday);
    if (xKey === undefined || yKey === undefined) {
      continue;
    }
    if (!xKeySet.has(xKey) || !yKeySet.has(yKey)) {
      continue;
    }

    const key = `${yKey}|${xKey}`;
    const bucket = bucketMap.get(key) ?? [];
    bucket.push({ time: point.time, value: point.value });
    bucketMap.set(key, bucket);
  }

  const values: number[] = [];
  const cells: HeatMapCellMeta[][] = yAxis.keys.map((yKey, yIndex) =>
    xAxis.keys.map((xKey, xIndex) => {
      const bucket = bucketMap.get(`${yKey}|${xKey}`) ?? [];
      const value = aggregateSamples(bucket, aggregate);
      if (value !== null) {
        values.push(value);
      }
      return {
        value,
        count: bucket.length,
        rangeLabel: cellRangeLabel(
          xField,
          yField,
          xKey,
          yKey,
          xAxis.labels[xIndex],
          yAxis.labels[yIndex],
          xAxis.bucketRanges
        ),
      };
    })
  );

  let min = minOverride;
  let max = maxOverride;

  if (min === undefined || max === undefined) {
    const dataMin = values.length ? Math.min(...values) : 0;
    const dataMax = values.length ? Math.max(...values) : 1;
    min = min ?? dataMin;
    max = max ?? (dataMax === dataMin ? dataMin + 1 : dataMax);
  }

  if (max <= min) {
    max = min + 1;
  }

  return {
    xLabels: xAxis.labels,
    yLabels: yAxis.labels,
    xKeys: xAxis.keys,
    yKeys: yAxis.keys,
    cells,
    min,
    max,
  };
}

export function normalizeLevel(
  value: number | null,
  min: number,
  max: number
): number {
  if (value === null) {
    return 0;
  }
  return Math.min(1, Math.max(0, (value - min) / (max - min)));
}
