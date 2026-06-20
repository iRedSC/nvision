export const HEAT_MAP_CARD_NAME = "nvision-heat-map-card";
export const HEAT_MAP_CARD_EDITOR_NAME = "nvision-heat-map-card-editor";

export const DEFAULT_PRESET = "week_hourly";
export const DEFAULT_PERIOD = "7d";
export const DEFAULT_COLOR_MODE = "primary";

export {
  PRESET_AXES,
  PERIOD_HOURS,
} from "../../utils/heat-map-buckets";

export type {
  AxisField,
  PeriodPreset,
  HeatMapPreset,
} from "../../utils/heat-map-buckets";

export type { AggregateType } from "../../utils/history-data";

export const PRESET_OPTIONS = [
  { value: "week_hourly", label: "Week hourly" },
  { value: "daily_rhythm", label: "Daily rhythm" },
  { value: "month_calendar", label: "Month calendar" },
  { value: "timeline", label: "Timeline" },
  { value: "custom", label: "Custom" },
] as const;

export const PERIOD_OPTIONS = [
  { value: "24h", label: "24 hours" },
  { value: "48h", label: "48 hours" },
  { value: "7d", label: "7 days" },
  { value: "14d", label: "14 days" },
  { value: "30d", label: "30 days" },
  { value: "90d", label: "90 days" },
  { value: "365d", label: "365 days" },
] as const;

export const AXIS_OPTIONS = [
  { value: "hour", label: "Hour of day" },
  { value: "weekday", label: "Day of week" },
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "time", label: "Time" },
  { value: "none", label: "None" },
] as const;

export const AGGREGATE_OPTIONS = [
  { value: "mean", label: "Mean" },
  { value: "sum", label: "Sum" },
  { value: "max", label: "Maximum" },
  { value: "min", label: "Minimum" },
  { value: "count", label: "Count" },
  { value: "last", label: "Last" },
] as const;

export const COLOR_MODE_OPTIONS = [
  { value: "primary", label: "Primary" },
  { value: "semantic", label: "Semantic" },
  { value: "temperature", label: "Temperature" },
] as const;
