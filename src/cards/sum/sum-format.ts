import type { HassEntity } from "home-assistant-js-websocket";
import type { HomeAssistant } from "../../types";
import { formatStateWithUnit } from "../../utils/entity-state";
import { parseNumericState } from "../../utils/power-lightning";
import { formatComparedValue } from "../stat/stat-trend";
import type { SumTheme } from "./const";

function monetaryAttributes(
  entity?: HassEntity
): HassEntity["attributes"] {
  const attrs = { ...(entity?.attributes ?? {}) };
  delete attrs.unit_of_measurement;
  attrs.device_class = "monetary";
  return attrs;
}

function themeAttributes(
  theme: SumTheme,
  entity?: HassEntity
): HassEntity["attributes"] {
  if (theme === "monetary") {
    return monetaryAttributes(entity);
  }

  const attrs = { ...(entity?.attributes ?? {}) };

  if (theme === "energy" && !attrs.unit_of_measurement) {
    attrs.unit_of_measurement = "kWh";
    attrs.device_class = "energy";
  }

  if (theme === "liquid" && !attrs.unit_of_measurement) {
    attrs.unit_of_measurement = "L";
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

function formatPartsWithoutUnit(
  hass: HomeAssistant | undefined,
  stateObj: HassEntity,
  value: number
): string | undefined {
  if (!hass?.formatEntityStateToParts) {
    return undefined;
  }

  const parts = hass.formatEntityStateToParts(stateObj, String(value));
  const formatted = parts
    .filter((part) => part.type !== "unit")
    .map((part) => part.value)
    .join("")
    .trim();

  return formatted.length > 0 ? formatted : undefined;
}

function localeCurrency(
  hass: HomeAssistant | undefined,
  value: number
): string {
  const language = hass?.locale?.language ?? "en";
  const currency =
    (hass?.config as { currency?: string } | undefined)?.currency ?? "USD";

  return new Intl.NumberFormat(language, {
    style: "currency",
    currency,
  }).format(value);
}

export function formatCurrencyValue(
  hass: HomeAssistant | undefined,
  value: number | undefined,
  referenceEntity?: HassEntity
): string {
  if (value === undefined || !Number.isFinite(value)) {
    return "—";
  }

  const stateObj = referenceState("monetary", referenceEntity);
  if (stateObj) {
    const formatted = formatPartsWithoutUnit(hass, stateObj, value);
    if (formatted) {
      return formatted;
    }
  }

  return localeCurrency(hass, value);
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

  if (theme === "monetary") {
    return formatCurrencyValue(hass, sum, referenceEntity);
  }

  return formatComparedValue(
    hass,
    sum,
    referenceState(theme, referenceEntity)
  );
}

export function formatEntityValue(
  hass: HomeAssistant | undefined,
  stateObj: HassEntity | undefined,
  theme: SumTheme
): string {
  if (!stateObj) {
    return "—";
  }

  if (theme === "monetary") {
    return formatCurrencyValue(
      hass,
      parseNumericState(stateObj.state),
      stateObj
    );
  }

  return formatStateWithUnit(stateObj);
}
