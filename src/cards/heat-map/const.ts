export const HEAT_MAP_CARD_NAME = "nvision-heat-map-card";
export const HEAT_MAP_CARD_EDITOR_NAME = "nvision-heat-map-card-editor";

export const DEFAULT_PRESET = "week_hourly";
export const DEFAULT_COLOR_MODE = "theme";

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
  { value: "week_hourly", label: "Week — hour × day" },
  { value: "two_weeks", label: "Two weeks — hour × day" },
  { value: "daily_rhythm", label: "Daily rhythm — hour × weekday" },
  { value: "month_days", label: "Month — day × week" },
  { value: "month_calendar", label: "Quarter calendar — weekday × week" },
  { value: "quarter", label: "Quarter — week × month" },
  { value: "timeline_24h", label: "Timeline — 24 hours" },
  { value: "timeline_48h", label: "Timeline — 48 hours" },
  { value: "year_overview", label: "Year — week × month" },
] as const;

export const COLOR_MODE_OPTIONS = [
  { value: "theme", label: "Theme" },
  { value: "semantic", label: "Semantic" },
  { value: "temperature", label: "Temperature" },
  { value: "custom", label: "Custom" },
] as const;
