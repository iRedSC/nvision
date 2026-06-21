import type { LovelaceCardConfig } from "../../types";
import type { ConfigColor } from "../../utils/colors";
import type { ActionConfig } from "../../utils/lovelace-actions";

export type GraphStyle = "line" | "area" | "bar" | "none";

export interface StatCardConfig extends LovelaceCardConfig {
  type: `custom:${string}`;
  entity: string;
  name?: string;
  trend_entity?: string;
  trend_period?: number;
  graph?: GraphStyle;
  graph_period?: number;
  graph_height?: number;
  smoothing?: boolean;
  show_fill?: boolean;
  line_color?: ConfigColor;
  invert_colors?: boolean;
  show_icon?: boolean;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}
