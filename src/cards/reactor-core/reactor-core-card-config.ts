import type { LovelaceCardConfig } from "../../types";
import type { ActionConfig } from "../../utils/lovelace-actions";

export type ReactorCoreMode = "auto" | "manual";

export type ReactorInfoSelection =
  | "on_update"
  | "random_interval"
  | "nearest_cursor";

export interface ReactorCoreCardConfig extends LovelaceCardConfig {
  type: `custom:${string}`;
  mode?: ReactorCoreMode;
  entities?: string[];
  max_particles?: number;
  domains?: string[];
  exclude?: string[];
  min?: number;
  max?: number;
  name?: string;
  info_selection?: ReactorInfoSelection;
  show_info?: boolean;
  show_info_change?: boolean;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}
