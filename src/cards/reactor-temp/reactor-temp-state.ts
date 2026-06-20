import type { HassEntity } from "home-assistant-js-websocket";
import type { HomeAssistant } from "../../types";
import { parseNumericState } from "../../utils/power-lightning";
import type { ReactorTempCardConfig } from "./reactor-temp-card-config";
import { DEFAULT_MAX, DEFAULT_MIN, DEFAULT_STEP } from "./const";

export type ReactorDirection = "heating" | "cooling" | "idle" | "off" | "unknown";

export interface ReactorTempReading {
  current?: number;
  target?: number;
  previewTarget?: number;
  unit: string;
  direction: ReactorDirection;
  directionStrength: number;
  canControl: boolean;
  controlEntityId?: string;
  displayName: string;
}

function entityDomain(entityId: string): string {
  return entityId.split(".", 1)[0];
}

function readUnit(...stateObjs: Array<HassEntity | undefined>): string {
  for (const stateObj of stateObjs) {
    const unit = stateObj?.attributes?.unit_of_measurement;
    if (typeof unit === "string" && unit.length > 0) {
      return unit;
    }
  }
  return "°";
}

function readStep(
  stateObj: HassEntity | undefined,
  configStep: number | undefined
): number {
  const attrStep = stateObj?.attributes?.step;
  if (typeof attrStep === "number" && Number.isFinite(attrStep) && attrStep > 0) {
    return attrStep;
  }
  return configStep ?? DEFAULT_STEP;
}

function normalizeDirection(value: string | undefined): ReactorDirection | undefined {
  if (!value) {
    return undefined;
  }

  const normalized = value.toLowerCase();
  if (normalized === "heating") {
    return "heating";
  }
  if (normalized === "cooling") {
    return "cooling";
  }
  if (normalized === "idle") {
    return "idle";
  }
  if (normalized === "off") {
    return "off";
  }

  return undefined;
}

function deriveDirection(
  current: number | undefined,
  target: number | undefined,
  step: number
): ReactorDirection {
  if (current === undefined || target === undefined) {
    return "unknown";
  }

  const diff = target - current;
  if (Math.abs(diff) <= Math.max(step * 0.5, 0.25)) {
    return "idle";
  }

  return diff > 0 ? "heating" : "cooling";
}

function directionStrength(
  current: number | undefined,
  target: number | undefined,
  min: number,
  max: number
): number {
  if (current === undefined || target === undefined || max <= min) {
    return 0;
  }

  return Math.min(1, Math.abs(target - current) / (max - min));
}

function isControllableEntity(entityId: string | undefined): boolean {
  if (!entityId) {
    return false;
  }

  const domain = entityDomain(entityId);
  return domain === "climate" || domain === "number" || domain === "input_number";
}

function readClimate(
  stateObj: HassEntity,
  min: number,
  max: number,
  step: number
): Pick<
  ReactorTempReading,
  "current" | "target" | "direction" | "directionStrength" | "canControl" | "controlEntityId"
> {
  const current = parseNumericState(String(stateObj.attributes.current_temperature ?? ""));
  const target = parseNumericState(String(stateObj.attributes.temperature ?? ""));
  const direction =
    normalizeDirection(String(stateObj.attributes.hvac_action ?? "")) ??
    deriveDirection(current, target, step);

  return {
    current,
    target,
    direction,
    directionStrength: directionStrength(current, target, min, max),
    canControl: true,
    controlEntityId: stateObj.entity_id,
  };
}

function readTargetEntity(
  stateObj: HassEntity,
  min: number,
  max: number,
  step: number,
  current?: number
): Pick<
  ReactorTempReading,
  "target" | "direction" | "directionStrength" | "canControl" | "controlEntityId"
> {
  const target = parseNumericState(stateObj.state);
  const direction = deriveDirection(current, target, step);

  return {
    target,
    direction,
    directionStrength: directionStrength(current, target, min, max),
    canControl: isControllableEntity(stateObj.entity_id),
    controlEntityId: stateObj.entity_id,
  };
}

export function readReactorTemp(
  hass: HomeAssistant,
  config: ReactorTempCardConfig,
  previewTarget?: number
): ReactorTempReading {
  const entityId = config.entity;
  const stateObj = hass.states[entityId];
  const targetStateObj = config.target_entity
    ? hass.states[config.target_entity]
    : undefined;
  const min = config.min ?? DEFAULT_MIN;
  const max = config.max ?? DEFAULT_MAX;
  const step = readStep(targetStateObj ?? stateObj, config.step);
  const displayName =
    config.name ||
    stateObj?.attributes.friendly_name ||
    entityId ||
    "Reactor";

  if (!stateObj) {
    return {
      unit: readUnit(targetStateObj),
      direction: "unknown",
      directionStrength: 0,
      canControl: isControllableEntity(config.target_entity),
      controlEntityId: config.target_entity,
      displayName,
    };
  }

  const domain = entityDomain(entityId);
  let reading: ReactorTempReading;

  if (domain === "climate") {
    const climate = readClimate(stateObj, min, max, step);
    reading = {
      unit: readUnit(stateObj, targetStateObj),
      displayName,
      ...climate,
    };
  } else if (domain === "sensor" || domain === "number" || domain === "input_number") {
    const current =
      domain === "sensor"
        ? parseNumericState(stateObj.state)
        : undefined;
    const targetFromPrimary =
      domain !== "sensor" ? parseNumericState(stateObj.state) : undefined;

    reading = {
      current,
      target: targetFromPrimary,
      unit: readUnit(stateObj, targetStateObj),
      direction: "unknown",
      directionStrength: 0,
      canControl: isControllableEntity(domain !== "sensor" ? entityId : config.target_entity),
      controlEntityId:
        domain !== "sensor" ? entityId : config.target_entity,
      displayName,
    };

    if (targetStateObj) {
      const targetReading = readTargetEntity(
        targetStateObj,
        min,
        max,
        step,
        reading.current
      );
      reading = { ...reading, ...targetReading };
    } else if (targetFromPrimary !== undefined) {
      reading.direction = deriveDirection(reading.current, targetFromPrimary, step);
      reading.directionStrength = directionStrength(
        reading.current,
        targetFromPrimary,
        min,
        max
      );
    }
  } else {
    reading = {
      current: parseNumericState(stateObj.state),
      unit: readUnit(stateObj, targetStateObj),
      direction: "unknown",
      directionStrength: 0,
      canControl: isControllableEntity(config.target_entity),
      controlEntityId: config.target_entity,
      displayName,
    };

    if (targetStateObj) {
      reading = {
        ...reading,
        ...readTargetEntity(targetStateObj, min, max, step, reading.current),
      };
    }
  }

  if (previewTarget !== undefined) {
    reading.previewTarget = previewTarget;
    reading.target = previewTarget;
    reading.direction = deriveDirection(reading.current, previewTarget, step);
    reading.directionStrength = directionStrength(
      reading.current,
      previewTarget,
      min,
      max
    );
  }

  return reading;
}

export function normalizeTemp(
  value: number | undefined,
  min: number,
  max: number
): number {
  if (value === undefined || max <= min) {
    return 0.35;
  }

  return Math.min(1, Math.max(0, (value - min) / (max - min)));
}

export function formatTempValue(
  value: number | undefined,
  unit: string
): string {
  if (value === undefined || !Number.isFinite(value)) {
    return "—";
  }

  const rounded = Math.abs(value - Math.round(value)) < 0.05
    ? String(Math.round(value))
    : value.toFixed(1);
  const suffix = unit.startsWith("°") ? unit : ` ${unit}`.trimEnd();
  return `${rounded}${suffix}`;
}

export function formatStatus(direction: ReactorDirection): string {
  if (direction === "unknown") {
    return "monitoring";
  }

  return direction;
}

export async function setReactorTarget(
  hass: HomeAssistant,
  entityId: string,
  value: number
): Promise<void> {
  const domain = entityDomain(entityId);

  if (domain === "climate") {
    await hass.callService("climate", "set_temperature", {
      entity_id: entityId,
      temperature: value,
    });
    return;
  }

  if (domain === "number") {
    await hass.callService("number", "set_value", {
      entity_id: entityId,
      value,
    });
    return;
  }

  if (domain === "input_number") {
    await hass.callService("input_number", "set_value", {
      entity_id: entityId,
      value,
    });
  }
}

export function clampTarget(
  value: number,
  min: number,
  max: number,
  step: number
): number {
  const clamped = Math.min(max, Math.max(min, value));
  if (step <= 0) {
    return clamped;
  }

  const steps = Math.round((clamped - min) / step);
  return Math.min(max, Math.max(min, min + steps * step));
}

export function readConfigStep(
  hass: HomeAssistant,
  config: ReactorTempCardConfig
): number {
  const stateObj =
    (config.target_entity ? hass.states[config.target_entity] : undefined) ??
    hass.states[config.entity];
  return readStep(stateObj, config.step);
}
