import type { LovelaceCardConfig } from "../../types";
import type { ActionConfig } from "../../utils/lovelace-actions";

export interface LightCardConfig extends LovelaceCardConfig {
  type: `custom:${string}`;
  entity: string;
  name?: string;
  icon?: string;
  glow_size?: number;
  glow_intensity?: number;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}
