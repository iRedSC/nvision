import type { LovelaceCardConfig } from "../../types";

export interface BlankCardConfig extends LovelaceCardConfig {
  type: `custom:${string}`;
  entity?: string;
  name?: string;
}
