import type { ConfigColor } from "../../utils/colors";

export const EVENT_LOG_CARD_NAME = "nvision-event-log-card";
export const EVENT_LOG_CARD_EDITOR_NAME = "nvision-event-log-card-editor";

export const DEFAULT_MAX_LINES = 100;
export const DEFAULT_TITLE = "Event Log";

export const DEFAULT_EVENT_TYPES = [
  "state_changed",
  "automation_triggered",
  "call_service",
  "homeassistant_start",
  "timer_finished",
];

export const EVENT_TYPE_OPTIONS = [
  { value: "state_changed", label: "State changed" },
  { value: "automation_triggered", label: "Automation triggered" },
  { value: "call_service", label: "Service call" },
  { value: "homeassistant_start", label: "Home Assistant start" },
  { value: "timer_finished", label: "Timer finished" },
  { value: "script_started", label: "Script started" },
  { value: "persistent_notification", label: "Persistent notification" },
  { value: "logbook_entry", label: "Logbook entry" },
];

export type LogSeverity = "error" | "warning" | "success" | "info" | "debug";

export interface SeverityRule {
  severity: LogSeverity;
  keywords: string[];
  color?: ConfigColor;
}

export const DEFAULT_SEVERITY_RULES: SeverityRule[] = [
  {
    severity: "error",
    keywords: [
      "error",
      "err",
      "failed",
      "failure",
      "fatal",
      "critical",
      "exception",
      "offline",
      "unavailable",
      "denied",
    ],
  },
  {
    severity: "warning",
    keywords: ["warn", "warning", "caution", "timeout", "retry", "deprecated"],
  },
  {
    severity: "success",
    keywords: [
      "success",
      "ok",
      "online",
      "connected",
      "started",
      "complete",
      "finished",
      "ready",
    ],
  },
  {
    severity: "debug",
    keywords: ["debug", "trace", "verbose"],
  },
];

const SEVERITY_CSS: Record<LogSeverity, string> = {
  error: "--error-color",
  warning: "--warning-color",
  success: "--success-color",
  info: "--primary-text-color",
  debug: "--secondary-text-color",
};

export function severityCssVariable(severity: LogSeverity): string {
  return SEVERITY_CSS[severity];
}

export function parseKeywordList(value: string | undefined): string[] | undefined {
  if (!value?.trim()) {
    return undefined;
  }

  return value
    .split(",")
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean);
}

export function buildSeverityRules(config: {
  error_keywords?: string[];
  warning_keywords?: string[];
  success_keywords?: string[];
  debug_keywords?: string[];
  severity_rules?: SeverityRule[];
}): SeverityRule[] {
  const rules = config.severity_rules?.length
    ? [...config.severity_rules]
    : DEFAULT_SEVERITY_RULES.map((rule) => ({ ...rule, keywords: [...rule.keywords] }));

  const overrides: Partial<Record<LogSeverity, string[]>> = {
    error: config.error_keywords,
    warning: config.warning_keywords,
    success: config.success_keywords,
    debug: config.debug_keywords,
  };

  for (const rule of rules) {
    const custom = overrides[rule.severity];
    if (custom?.length) {
      rule.keywords = custom.map((keyword) => keyword.toLowerCase());
    }
  }

  return rules;
}

export function resolveSeverity(
  message: string,
  rules: SeverityRule[]
): LogSeverity {
  const haystack = message.toLowerCase();

  for (const rule of rules) {
    if (rule.keywords.some((keyword) => haystack.includes(keyword))) {
      return rule.severity;
    }
  }

  return "info";
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}
