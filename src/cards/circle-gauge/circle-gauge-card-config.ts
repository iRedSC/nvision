import type { LovelaceCardConfig } from "../../types";
import type { ConfigColor } from "../../utils/colors";
import type { ActionConfig } from "../../utils/lovelace-actions";

export interface CircleGaugeCardConfig extends LovelaceCardConfig {
  type: `custom:${string}`;
  entity?: string;
  name?: string;
  min?: number;
  max?: number;
  color?: ConfigColor;
  track_color?: ConfigColor;
  reverse?: boolean;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}
