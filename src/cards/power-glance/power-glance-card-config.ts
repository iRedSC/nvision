import type { LovelaceCardConfig } from "../../types";

export interface PowerGlanceCardConfig extends LovelaceCardConfig {
  type: `custom:${string}`;
  entities?: string[];
  columns?: number;
  min?: number;
  max?: number;
  effects_min?: number;
  effects_max?: number;
  color?: string | [number, number, number];
  icon?: string;
}
