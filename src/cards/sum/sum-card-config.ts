import type { LovelaceCardConfig } from "../../types";
import type { ActionConfig } from "../../utils/lovelace-actions";
import type { SumTheme } from "./const";

export interface SumCardConfig extends LovelaceCardConfig {
  type: `custom:${string}`;
  entities?: string[];
  columns?: number;
  theme?: SumTheme;
  name?: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}
