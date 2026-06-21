import type { LovelaceCardConfig } from "../../types";
import type { ActionConfig } from "../../utils/lovelace-actions";
import type { ToneRule } from "./const";

export interface EventLogCardConfig extends LovelaceCardConfig {
  type: `custom:${string}`;
  title?: string;
  storage_key?: string;
  max_lines?: number;
  event_types?: string[];
  show_timestamp?: boolean;
  alert_keywords?: string[];
  inactive_keywords?: string[];
  idle_keywords?: string[];
  active_keywords?: string[];
  tone_rules?: ToneRule[];
  entities?: string[];
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}
