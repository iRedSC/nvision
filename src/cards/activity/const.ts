export const ACTIVITY_CARD_NAME = "nvision-activity-card";
export const ACTIVITY_CARD_EDITOR_NAME = "nvision-activity-card-editor";
export const DEFAULT_SPEED = 1;

export type ActivityMode =
  | "idle"
  | "on_foot"
  | "walking"
  | "running"
  | "bicycle"
  | "vehicle"
  | "tilting";

const STATE_TO_MODE: Record<string, ActivityMode> = {
  still: "idle",
  unknown: "idle",
  on_foot: "on_foot",
  walking: "walking",
  running: "running",
  on_bicycle: "bicycle",
  in_vehicle: "vehicle",
  automotive: "vehicle",
  tilting: "tilting",
};

export function resolveActivityMode(state: string | undefined): ActivityMode {
  if (!state) {
    return "idle";
  }
  return STATE_TO_MODE[state.toLowerCase().trim()] ?? "idle";
}

export function formatActivityLabel(state: string | undefined): string {
  if (!state || state === "unknown" || state === "unavailable") {
    return "Unknown";
  }
  return state
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
