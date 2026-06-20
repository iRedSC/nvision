import type { LovelaceCardConfig } from "../../types";
import type { ActionConfig } from "../../utils/lovelace-actions";

export type EntityOverviewMode = "auto" | "manual";

export type EntityOverviewInfoSelection =
  | "on_update"
  | "random_interval"
  | "nearest_cursor";

export interface EntityOverviewCardConfig extends LovelaceCardConfig {
  type: `custom:${string}`;
  mode?: EntityOverviewMode;
  entities?: string[];
  max_particles?: number;
  domains?: string[];
  exclude?: string[];
  min?: number;
  max?: number;
  name?: string;
  info_selection?: EntityOverviewInfoSelection;
  show_info?: boolean;
  show_info_change?: boolean;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}
