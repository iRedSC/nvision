import type { LovelaceCardConfig } from "../../types";
import type { ConfigColor } from "../../utils/colors";

export type WaveformLayout = "line" | "ring" | "field";
export type WaveformSize = "compact" | "balanced" | "expansive";
export type WaveformMotion =
  | "wave"
  | "pulse"
  | "stream"
  | "spectrum"
  | "echo"
  | "cascade";

/** @deprecated Use layout preset instead */
export type WaveformShape = "line" | "circle" | "grid";

export interface WaveformCardConfig extends LovelaceCardConfig {
  type: `custom:${string}`;
  entity?: string;
  name?: string;
  min?: number;
  max?: number;
  color?: ConfigColor;
  layout?: WaveformLayout;
  size?: WaveformSize;
  motion?: WaveformMotion;
  shake_at?: number;
  shake_peak?: number;

  /** @deprecated Use layout, size, and motion presets */
  shape?: WaveformShape;
  /** @deprecated */
  dot_count?: number;
  /** @deprecated */
  dot_size?: number;
  /** @deprecated */
  dot_spacing?: number;
  /** @deprecated Use motion: echo */
  overlap_dots?: boolean;
  /** @deprecated */
  overlap_at?: number;
  /** @deprecated */
  wave_amplitude?: number;
  /** @deprecated */
  wave_frequency?: number;
}
