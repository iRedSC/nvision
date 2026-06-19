import type { HassEntity } from "home-assistant-js-websocket";

export function formatStateWithUnit(
  stateObj: HassEntity | undefined | null
): string {
  if (!stateObj) {
    return "—";
  }

  const { state } = stateObj;
  if (state === "unavailable" || state === "unknown") {
    return "—";
  }

  const unit = stateObj.attributes?.unit_of_measurement;
  if (typeof unit === "string" && unit.length > 0) {
    const trimmed = state.trim();
    if (trimmed.endsWith(unit)) {
      return trimmed;
    }
    return `${trimmed} ${unit}`.trim();
  }

  return state;
}
