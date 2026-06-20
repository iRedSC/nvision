export const REACTOR_CORE_CARD_NAME = "nvision-reactor-core-card";
export const REACTOR_CORE_CARD_EDITOR_NAME = "nvision-reactor-core-card-editor";

export const DEFAULT_MODE = "auto" as const;
export const DEFAULT_INFO_SELECTION = "on_update" as const;
export const DEFAULT_SHOW_INFO = true;
export const DEFAULT_SHOW_INFO_CHANGE = false;
export const INFO_RANDOM_INTERVAL_MS = 10_000;
export const DEFAULT_MAX_PARTICLES = 32;
export const DEFAULT_DOMAINS = [
  "sensor",
  "binary_sensor",
  "switch",
  "light",
  "timer",
];
export const DEFAULT_MIN = 0;
export const DEFAULT_MAX = 100;

export const REACTOR_ENTITY_DOMAINS = [
  "sensor",
  "binary_sensor",
  "switch",
  "light",
  "timer",
] as const;
