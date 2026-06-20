import type { LovelaceCardConfig } from "../../types";
import type { ActionConfig } from "../../utils/lovelace-actions";

export interface PowerGlanceCardConfig extends LovelaceCardConfig {
  type: `custom:${string}`;
  entities?: string[];
  columns?: number;
  min?: number;
  max?: number;
  effects_min?: number;
  effects_max?: number;
  color?: string | [number, number, number];
  icon?: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}
