import type { LovelaceCardConfig } from "../../types";
import type { ActionConfig } from "../../utils/lovelace-actions";

export interface StatCardConfig extends LovelaceCardConfig {
  type: `custom:${string}`;
  entity: string;
  name?: string;
  trend_entity?: string;
  trend_period?: number;
  invert_colors?: boolean;
  show_icon?: boolean;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}
