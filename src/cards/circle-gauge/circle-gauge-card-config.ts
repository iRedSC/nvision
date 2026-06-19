import type { LovelaceCardConfig } from "../../types";
import type { ConfigColor } from "../../utils/colors";

export interface CircleGaugeCardConfig extends LovelaceCardConfig {
  type: `custom:${string}`;
  entity?: string;
  name?: string;
  min?: number;
  max?: number;
  color?: ConfigColor;
  track_color?: ConfigColor;
  reverse?: boolean;
}
