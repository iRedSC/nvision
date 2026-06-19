import type { LovelaceCardConfig } from "../../types";
import type { ConfigColor } from "../../utils/colors";

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
}
