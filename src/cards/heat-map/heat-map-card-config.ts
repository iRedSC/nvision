import type { LovelaceCardConfig } from "../../types";
import type { ConfigColor } from "../../utils/colors";
import type { AggregateType } from "../../utils/history-data";
import type { ActionConfig } from "../../utils/lovelace-actions";
import type { HeatMapPreset } from "./const";

export type ColorMode = "theme" | "semantic" | "temperature" | "custom" | "primary";

export interface HeatMapCardConfig extends LovelaceCardConfig {
  type: `custom:${string}`;
  entity?: string;
  name?: string;
  preset?: HeatMapPreset;
  /** Auto infers from the entity; explicit values override preset defaults. */
  operation?: AggregateType | "auto";
  color_mode?: ColorMode;
  color_low?: ConfigColor;
  color_high?: ConfigColor;
  show_axis_labels?: boolean;
  show_legend?: boolean;
  show_current?: boolean;
  show_cell_values?: boolean;
  /** When true, low values are mixed heavily toward the card background. */
  dim_low_values?: boolean;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}
