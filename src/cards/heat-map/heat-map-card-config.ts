import type { LovelaceCardConfig } from "../../types";
import type { ActionConfig } from "../../utils/lovelace-actions";
import type {
  AggregateType,
  AxisField,
  HeatMapPreset,
  PeriodPreset,
} from "./const";

export type ColorMode = "primary" | "semantic" | "temperature";

export interface HeatMapCardConfig extends LovelaceCardConfig {
  type: `custom:${string}`;
  entity?: string;
  name?: string;
  preset?: HeatMapPreset;
  period?: PeriodPreset;
  x_axis?: AxisField;
  y_axis?: AxisField;
  aggregate?: AggregateType;
  min?: number;
  max?: number;
  color_mode?: ColorMode;
  show_axis_labels?: boolean;
  show_legend?: boolean;
  show_current?: boolean;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
}
