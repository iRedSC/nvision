import type { LovelaceCardConfig } from "../../types";
import type { ActionConfig } from "../../utils/lovelace-actions";

export interface ReactorTempCardConfig extends LovelaceCardConfig {
  type: `custom:${string}`;
  entity: string;
  target_entity?: string;
  min?: number;
  max?: number;
  step?: number;
  name?: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}
