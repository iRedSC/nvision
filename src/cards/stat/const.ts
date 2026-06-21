export const STAT_CARD_NAME = "nvision-stat-card";
export const STAT_CARD_EDITOR_NAME = "nvision-stat-card-editor";

export const DEFAULT_TREND_PERIOD = 24;

export const TREND_PERIOD_OPTIONS = [
  { value: "1", label: "1 hour" },
  { value: "24", label: "24 hours" },
  { value: "168", label: "7 days" },
  { value: "720", label: "30 days" },
] as const;

export const TREND_PERIOD_LABELS: Record<number, string> = {
  1: "1 hour",
  24: "24 hours",
  168: "7 days",
  720: "30 days",
};

export function trendPeriodLabel(hours: number): string {
  return TREND_PERIOD_LABELS[hours] ?? `${hours} hours`;
}

export const FLAT_TREND_THRESHOLD = 0.5;
