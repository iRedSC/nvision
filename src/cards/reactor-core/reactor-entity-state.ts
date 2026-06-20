import type { HassEntity } from "home-assistant-js-websocket";
import type { HomeAssistant } from "../../types";
import { isBinaryEntity } from "../../utils/history-data";
import {
  lightBrightnessFactor,
  resolveLightRgb,
} from "../../utils/light-color";
import {
  normalizeValue,
  parseNumericState,
} from "../../utils/power-lightning";

export type ParticleKind = "toggle" | "light" | "numeric" | "timer" | "other";

export interface ParticleVisualState {
  kind: ParticleKind;
  isOn: boolean;
  numericNorm: number;
  lightColor?: string;
  lightBrightness: number;
  timerUrgency: number;
  unavailable: boolean;
}

function durationToSeconds(duration: string): number {
  const parts = duration.split(":").map(Number);
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  return Number(duration) || 0;
}

function timerRemainingSeconds(stateObj: HassEntity): number | undefined {
  const remaining = stateObj.attributes.remaining;
  if (typeof remaining !== "string") {
    return undefined;
  }

  let seconds = durationToSeconds(remaining);

  if (stateObj.state === "active" && stateObj.attributes.finishes_at) {
    const finishes = new Date(String(stateObj.attributes.finishes_at)).getTime();
    seconds = Math.max((finishes - Date.now()) / 1000, 0);
  }

  return seconds;
}

function timerDurationSeconds(stateObj: HassEntity): number {
  const duration = stateObj.attributes.duration;
  if (typeof duration === "string") {
    return durationToSeconds(duration);
  }
  return 0;
}

function isEntityOn(state: string | undefined): boolean {
  if (state === undefined || state === "unavailable" || state === "unknown") {
    return false;
  }
  return (
    state === "on" ||
    state === "true" ||
    state === "open" ||
    state === "home" ||
    state === "active"
  );
}

export function classifyParticleKind(
  hass: HomeAssistant,
  entityId: string
): ParticleKind {
  const domain = entityId.split(".", 1)[0];

  if (domain === "light") {
    return "light";
  }
  if (domain === "timer") {
    return "timer";
  }
  if (domain === "switch" || isBinaryEntity(entityId)) {
    return "toggle";
  }

  const state = hass.states[entityId]?.state;
  if (parseNumericState(state) !== undefined) {
    return "numeric";
  }

  return "other";
}

function numericNormForEntity(
  hass: HomeAssistant,
  entityId: string,
  min: number,
  max: number
): number {
  const value = parseNumericState(hass.states[entityId]?.state);
  if (value === undefined) {
    return 0.35;
  }
  return normalizeValue(value, min, max);
}

function timerUrgencyForEntity(hass: HomeAssistant, entityId: string): number {
  const stateObj = hass.states[entityId];
  if (!stateObj || stateObj.state !== "active") {
    return 0;
  }

  const remaining = timerRemainingSeconds(stateObj);
  const duration = timerDurationSeconds(stateObj);
  if (remaining === undefined || duration <= 0) {
    return 0.55;
  }

  return 1 - Math.min(1, Math.max(0, remaining / duration));
}

function lightVisualForEntity(
  hass: HomeAssistant,
  entityId: string
): { lightColor?: string; lightBrightness: number } {
  const stateObj = hass.states[entityId];
  if (!stateObj || stateObj.state !== "on") {
    return { lightBrightness: 0 };
  }

  const rgb = resolveLightRgb(stateObj);
  return {
    lightColor: rgb ? `rgb(${rgb.join(", ")})` : undefined,
    lightBrightness: lightBrightnessFactor(stateObj),
  };
}

export function readParticleVisualState(
  hass: HomeAssistant,
  entityId: string,
  min: number,
  max: number
): ParticleVisualState {
  const stateObj = hass.states[entityId];
  const state = stateObj?.state;
  const kind = classifyParticleKind(hass, entityId);
  const light = kind === "light" ? lightVisualForEntity(hass, entityId) : {};

  return {
    kind,
    isOn: isEntityOn(state),
    numericNorm: numericNormForEntity(hass, entityId, min, max),
    lightColor: light.lightColor,
    lightBrightness: light.lightBrightness ?? 0,
    timerUrgency:
      kind === "timer" ? timerUrgencyForEntity(hass, entityId) : 0,
    unavailable: state === "unavailable" || state === "unknown",
  };
}
