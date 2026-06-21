import type { LovelaceCardConfig } from "../../types";
import type { ActionConfig } from "../../utils/lovelace-actions";
import type { SeverityRule } from "./const";

export interface EventLogCardConfig extends LovelaceCardConfig {
  type: `custom:${string}`;
  title?: string;
  max_lines?: number;
  event_types?: string[];
  show_timestamp?: boolean;
  error_keywords?: string[];
  warning_keywords?: string[];
  success_keywords?: string[];
  debug_keywords?: string[];
  severity_rules?: SeverityRule[];
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}
