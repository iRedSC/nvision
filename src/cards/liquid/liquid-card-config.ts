import type { LovelaceCardConfig } from "../../types";
import type { ConfigColor } from "../../utils/colors";
import type { ActionConfig } from "../../utils/lovelace-actions";

export type LiquidStyle = "none" | "bubbles" | "electricity";

export interface LiquidCardConfig extends LovelaceCardConfig {
  type: `custom:${string}`;
  entity?: string;
  name?: string;
  min?: number;
  max?: number;
  color?: ConfigColor;
  liquid_style?: LiquidStyle;
  level_color?: boolean;
  level_color_invert?: boolean;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}
