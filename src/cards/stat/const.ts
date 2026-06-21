export const STAT_CARD_NAME = "nvision-stat-card";
export const STAT_CARD_EDITOR_NAME = "nvision-stat-card-editor";

export const DEFAULT_TREND_PERIOD = 24;

export const TREND_PERIOD_OPTIONS = [
  { value: "1", label: "1 hour" },
  { value: "24", label: "24 hours" },
  { value: "168", label: "7 days" },
  { value: "720", label: "30 days" },
] as const;

export const FLAT_TREND_THRESHOLD = 0.5;
