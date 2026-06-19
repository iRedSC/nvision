import type { LovelaceCardConfig } from "../../types";

export interface PowerDrawCardConfig extends LovelaceCardConfig {
  type: `custom:${string}`;
  entity?: string;
  name?: string;
  min?: number;
  max?: number;
  effects_min?: number;
  effects_max?: number;
  color?: string | [number, number, number];
  icon?: string;
}
