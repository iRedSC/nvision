import type { LovelaceCardConfig } from "../../types";
import type { ConfigColor } from "../../utils/colors";
import type { ActionConfig } from "../../utils/lovelace-actions";

export interface AirQualityCardConfig extends LovelaceCardConfig {
  type: `custom:${string}`;
  entity?: string;
  name?: string;
  min?: number;
  max?: number;
  color_good?: ConfigColor;
  color_warning?: ConfigColor;
  color_bad?: ConfigColor;
  color_mist?: ConfigColor;
  color_clear?: ConfigColor;
  color_sky?: ConfigColor;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}
