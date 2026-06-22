import type { HassEntity } from "home-assistant-js-websocket";
import type { HomeAssistant } from "../../types";
import { formatComparedValue } from "../stat/stat-trend";
import type { SumTheme } from "./const";

function themeAttributes(
  theme: SumTheme,
  entity?: HassEntity
): HassEntity["attributes"] {
  const attrs = { ...(entity?.attributes ?? {}) };

  if (theme === "monetary") {
    if (!attrs.unit_of_measurement) {
      attrs.device_class = "monetary";
    }
    return attrs;
  }

  if (theme === "energy" && !attrs.unit_of_measurement) {
    attrs.unit_of_measurement = "kWh";
    attrs.device_class = "energy";
    return attrs;
  }

  if (theme === "liquid" && !attrs.unit_of_measurement) {
    attrs.unit_of_measurement = "L";
    return attrs;
  }

  return attrs;
}

function referenceState(
  theme: SumTheme,
  entity?: HassEntity
): HassEntity | undefined {
  if (theme === "none") {
    return entity;
  }

  if (entity) {
    return {
      ...entity,
      attributes: themeAttributes(theme, entity),
    };
  }

  return {
    entity_id: "sensor.nvision_sum",
    state: "0",
    attributes: themeAttributes(theme),
    last_changed: "",
    last_updated: "",
    context: { id: "", parent_id: null, user_id: null },
  };
}

export function formatSumTotal(
  hass: HomeAssistant | undefined,
  sum: number | undefined,
  theme: SumTheme,
  referenceEntity?: HassEntity
): string {
  if (sum === undefined || !Number.isFinite(sum)) {
    return "—";
  }

  return formatComparedValue(
    hass,
    sum,
    referenceState(theme, referenceEntity)
  );
}
