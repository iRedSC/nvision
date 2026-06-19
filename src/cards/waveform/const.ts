import type {
  WaveformLayout,
  WaveformShape,
} from "./waveform-card-config";

export const WAVEFORM_CARD_NAME = "nvision-waveform-card";
export const WAVEFORM_CARD_EDITOR_NAME = "nvision-waveform-card-editor";

export const DEFAULT_MIN = 0;
export const DEFAULT_MAX = 100;
export const DEFAULT_SHAKE_AT = 0.72;
export const DEFAULT_SHAKE_PEAK = 0.78;

export const DEFAULT_LAYOUT: WaveformLayout = "line";
export const DEFAULT_SIZE = "balanced" as const;
export const DEFAULT_MOTION = "wave" as const;

/** @deprecated Legacy shape values mapped to layout presets */
export const LEGACY_SHAPE_TO_LAYOUT: Record<WaveformShape, WaveformLayout> = {
  line: "line",
  circle: "ring",
  grid: "field",
};

export const LAYOUT_OPTIONS = [
  { value: "line", label: "Line" },
  { value: "ring", label: "Ring" },
  { value: "field", label: "Field" },
] as const;

export const SIZE_OPTIONS = [
  { value: "compact", label: "Compact" },
  { value: "balanced", label: "Balanced" },
  { value: "expansive", label: "Expansive" },
] as const;

export const MOTION_OPTIONS = [
  { value: "wave", label: "Wave" },
  { value: "echo", label: "Echo" },
  { value: "pulse", label: "Pulse" },
  { value: "stream", label: "Stream" },
  { value: "spectrum", label: "Spectrum" },
  { value: "cascade", label: "Cascade" },
] as const;
