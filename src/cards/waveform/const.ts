import type {
  WaveformLayout,
  WaveformMotion,
  WaveformShape,
} from "./waveform-card-config";

export const WAVEFORM_CARD_NAME = "nvision-waveform-card";
export const WAVEFORM_CARD_EDITOR_NAME = "nvision-waveform-card-editor";

export const DEFAULT_MIN = 0;
export const DEFAULT_MAX = 100;
export const DEFAULT_SHAKE_AT = 0.6;
export const DEFAULT_SHAKE_PEAK = 0.28;
export const DEFAULT_SHAKE_SPEED = 0.45;

export const DEFAULT_LAYOUT: WaveformLayout = "line";
export const DEFAULT_SIZE = "balanced" as const;
export const DEFAULT_MOTION = "surge" as const;

/** @deprecated Legacy motion values mapped to new presets */
export const LEGACY_MOTION_MAP: Record<string, WaveformMotion> = {
  wave: "surge",
  echo: "spawn",
  pulse: "surge",
  stream: "jet",
  spectrum: "surge",
  cascade: "spawn",
};

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
  { value: "dense", label: "Dense" },
  { value: "packed", label: "Packed" },
] as const;

export const MOTION_OPTIONS = [
  { value: "surge", label: "Surge" },
  { value: "spawn", label: "Spawn" },
  { value: "jet", label: "Jet stream" },
] as const;
