import type { ConfigColor } from "../../utils/colors";

export const EVENT_LOG_CARD_NAME = "nvision-event-log-card";
export const EVENT_LOG_CARD_EDITOR_NAME = "nvision-event-log-card-editor";

export const DEFAULT_MAX_LINES = 100;
export const DEFAULT_TITLE = "Event Log";

export const DEFAULT_EVENT_TYPES = [
  "state_changed",
  "automation_triggered",
  "call_service",
  "homeassistant_start",
  "timer_finished",
];

export const EVENT_TYPE_OPTIONS = [
  { value: "state_changed", label: "State changed" },
  { value: "automation_triggered", label: "Automation triggered" },
  { value: "call_service", label: "Service call" },
  { value: "homeassistant_start", label: "Home Assistant start" },
  { value: "timer_finished", label: "Timer finished" },
  { value: "script_started", label: "Script started" },
  { value: "persistent_notification", label: "Persistent notification" },
  { value: "logbook_entry", label: "Logbook entry" },
];

export type LogTone = "alert" | "inactive" | "idle" | "active" | "neutral";

export interface LogEntry {
  id: number;
  time: Date;
  tone: LogTone;
  tag: string;
  message: string;
}

export interface ToneRule {
  tone: LogTone;
  keywords: string[];
  color?: ConfigColor;
}

/** First matching rule wins — ordered most specific / highest priority first. */
export const DEFAULT_TONE_RULES: ToneRule[] = [
  {
    tone: "alert",
    keywords: [
      "error",
      "err",
      "failed",
      "failure",
      "fail",
      "fatal",
      "critical",
      "crit",
      "exception",
      "warning",
      "warn",
      "alert",
      "alarm",
      "alarms",
      "emergency",
      "danger",
      "dangerous",
      "denied",
      "forbidden",
      "unauthorized",
      "fault",
      "faulty",
      "panic",
      "breach",
      "overflow",
      "overheat",
      "overheated",
      "overloaded",
      "overload",
      "crash",
      "crashed",
      "corrupt",
      "corrupted",
      "invalid",
      "illegal",
      "rejected",
      "refused",
      "timeout",
      "timed out",
      "expired",
      "undervoltage",
      "overvoltage",
      "leak",
      "leaking",
      "smoke",
      "fire",
      "flood",
      "tamper",
      "tampered",
      "intrusion",
      "intruder",
      "problem",
      "issue",
      "broken",
      "malfunction",
      "malfunctioning",
      "unsafe",
      "hazard",
      "severe",
      "extreme",
    ],
  },
  {
    tone: "inactive",
    keywords: [
      "off",
      "disabled",
      "disable",
      "deactivated",
      "deactivate",
      "inactive",
      "closed",
      "close",
      "shut",
      "stopped",
      "stop",
      "halted",
      "halt",
      "locked",
      "lock",
      "disconnected",
      "disconnect",
      "unplugged",
      "removed",
      "remove",
      "deleted",
      "delete",
      "cleared",
      "clear",
      "cancelled",
      "canceled",
      "cancel",
      "aborted",
      "abort",
      "terminated",
      "terminate",
      "blocked",
      "block",
      "suppressed",
      "suppress",
      "muted",
      "mute",
      "silenced",
      "silence",
      "dismissed",
      "dismiss",
      "rejected",
      "declined",
      "decline",
      "not detected",
      "no motion",
      "not present",
      "not home",
      "empty",
      "vacant",
      "unoccupied",
      "unarmed",
      "disarmed",
      "disarm",
      "idle off",
      "power off",
      "turned off",
      "switched off",
      "shut down",
      "shutdown",
      "standby",
      "sleeping",
      "asleep",
      "night mode",
      "eco mode",
      "away mode",
      "guest mode off",
      "manual off",
      "auto off",
    ],
  },
  {
    tone: "idle",
    keywords: [
      "idle",
      "stale",
      "unknown",
      "unavailable",
      "pending",
      "waiting",
      "wait",
      "buffering",
      "buffer",
      "paused",
      "pause",
      "uncertain",
      "undefined",
      "unchanged",
      "no change",
      "missing",
      "not available",
      "not ready",
      "not set",
      "unset",
      "n/a",
      "na",
      "none",
      "null",
      "dormant",
      "quiet",
      "silent",
      "still",
      "static",
      "uncharged",
      "not charging",
      "not running",
      "not playing",
      "not connected",
      "searching",
      "scanning",
      "syncing",
      "updating",
      "loading",
      "initializing",
      "init",
      "starting",
      "reconnecting",
      "retrying",
      "retry",
      "delayed",
      "delay",
      "scheduled",
      "schedule",
      "queued",
      "queue",
      "hold",
      "held",
      "maintenance",
      "calibrating",
      "calibration",
      "learning",
      "pairing",
      "discovering",
      "discovery",
      "unknown state",
      "no data",
      "no signal",
      "weak signal",
      "intermittent",
    ],
  },
  {
    tone: "active",
    keywords: [
      "active",
      "on",
      "enabled",
      "enable",
      "activated",
      "activate",
      "open",
      "opened",
      "opening",
      "running",
      "run",
      "playing",
      "play",
      "home",
      "unlocked",
      "unlock",
      "unlocking",
      "connected",
      "connect",
      "online",
      "started",
      "start",
      "armed",
      "arm",
      "arming",
      "charging",
      "charge",
      "detected",
      "detection",
      "motion",
      "moving",
      "occupied",
      "occupancy",
      "present",
      "available",
      "ready",
      "success",
      "successful",
      "succeeded",
      "ok",
      "complete",
      "completed",
      "finished",
      "done",
      "triggered",
      "trigger",
      "fired",
      "executed",
      "execute",
      "applied",
      "apply",
      "confirmed",
      "confirm",
      "accepted",
      "accept",
      "approved",
      "approve",
      "passed",
      "pass",
      "healthy",
      "health",
      "normal",
      "nominal",
      "stable",
      "secure",
      "secured",
      "locked home",
      "at home",
      "arrived",
      "arrive",
      "entered",
      "enter",
      "opened door",
      "door open",
      "window open",
      "light on",
      "turned on",
      "switched on",
      "power on",
      "powered",
      "lit",
      "bright",
      "heating",
      "heat",
      "cooling",
      "cool",
      "cleaning",
      "clean",
      "vacuuming",
      "mowing",
      "watering",
      "irrigating",
      "recording",
      "streaming",
      "broadcasting",
      "listening",
      "speaking",
      "ringing",
      "calling",
      "unlocked door",
      "garage open",
      "gate open",
      "bluetooth connected",
      "wifi connected",
      "network connected",
      "paired",
      "pair",
      "linked",
      "link",
      "bound",
      "registered",
      "register",
      "included",
      "joined",
      "synced",
      "updated",
      "up to date",
    ],
  },
];

const TONE_CSS: Record<Exclude<LogTone, "neutral">, string> = {
  alert: "--error-color",
  inactive: "--tone-inactive-color",
  idle: "--warning-color",
  active: "--success-color",
};

export function toneCssVariable(tone: LogTone): string | undefined {
  if (tone === "neutral") {
    return undefined;
  }
  return TONE_CSS[tone];
}

export function parseKeywordList(value: string | undefined): string[] | undefined {
  if (!value?.trim()) {
    return undefined;
  }

  return value
    .split(",")
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean);
}

export function buildToneRules(config: {
  alert_keywords?: string[];
  inactive_keywords?: string[];
  idle_keywords?: string[];
  active_keywords?: string[];
  tone_rules?: ToneRule[];
}): ToneRule[] {
  const rules = config.tone_rules?.length
    ? [...config.tone_rules]
    : DEFAULT_TONE_RULES.map((rule) => ({ ...rule, keywords: [...rule.keywords] }));

  const overrides: Partial<Record<Exclude<LogTone, "neutral">, string[]>> = {
    alert: config.alert_keywords,
    inactive: config.inactive_keywords,
    idle: config.idle_keywords,
    active: config.active_keywords,
  };

  for (const rule of rules) {
    if (rule.tone === "neutral") {
      continue;
    }
    const custom = overrides[rule.tone];
    if (custom?.length) {
      rule.keywords = custom.map((keyword) => keyword.toLowerCase());
    }
  }

  return rules;
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function keywordMatches(haystack: string, keyword: string): boolean {
  if (keyword.length <= 4) {
    return new RegExp(`\\b${escapeRegex(keyword)}\\b`, "i").test(haystack);
  }
  return haystack.includes(keyword);
}

export function resolveTone(message: string, rules: ToneRule[]): LogTone {
  const haystack = message.toLowerCase();

  for (const rule of rules) {
    if (rule.keywords.some((keyword) => keywordMatches(haystack, keyword))) {
      return rule.tone;
    }
  }

  return "neutral";
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export function storageKeyFromConfig(config: {
  storage_key?: string;
  title?: string;
  entities?: string[];
}): string {
  if (config.storage_key?.trim()) {
    return config.storage_key.trim();
  }

  const parts: string[] = [];

  if (config.entities?.length) {
    parts.push(
      config.entities
        .slice()
        .sort()
        .join(",")
        .toLowerCase()
        .replace(/[^a-z0-9.,_-]+/g, "-")
    );
  }

  const titleSlug = (config.title || DEFAULT_TITLE)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  if (titleSlug) {
    parts.unshift(titleSlug);
  }

  return parts.join("__") || "default";
}
