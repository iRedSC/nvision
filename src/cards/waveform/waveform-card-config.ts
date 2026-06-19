import type { LovelaceCardConfig } from "../../types";
import type { ConfigColor } from "../../utils/colors";

export type WaveformShape = "line" | "circle" | "grid";

export interface WaveformCardConfig extends LovelaceCardConfig {
  type: `custom:${string}`;
  entity?: string;
  name?: string;
  min?: number;
  max?: number;
  color?: ConfigColor;
  shape?: WaveformShape;
  dot_count?: number;
  dot_size?: number;
  dot_spacing?: number;
  overlap_dots?: boolean;
  overlap_at?: number;
  shake_at?: number;
  shake_peak?: number;
  wave_amplitude?: number;
  wave_frequency?: number;
}
