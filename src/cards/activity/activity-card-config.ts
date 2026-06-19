import type { LovelaceCardConfig } from "../../types";
import type { ConfigColor } from "../../utils/colors";

export interface ActivityCardConfig extends LovelaceCardConfig {
  type: `custom:${string}`;
  entity?: string;
  name?: string;
  color?: ConfigColor;
  speed?: number;
}
