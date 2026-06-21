import { storageKeyFromConfig, type LogEntry } from "./const";
import type { EventLogCardConfig } from "./event-log-card-config";

const STORAGE_PREFIX = "nvision-event-log:";

interface StoredEntry {
  id: number;
  time: string;
  tone: LogEntry["tone"];
  tag: string;
  message: string;
}

export function resolveStorageKey(config: EventLogCardConfig): string {
  return storageKeyFromConfig(config);
}

export function loadStoredEntries(key: string): {
  entries: LogEntry[];
  nextId: number;
} {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    if (!raw) {
      return { entries: [], nextId: 1 };
    }

    const stored = JSON.parse(raw) as StoredEntry[];
    if (!Array.isArray(stored)) {
      return { entries: [], nextId: 1 };
    }

    const entries = stored.map((entry) => ({
      ...entry,
      time: new Date(entry.time),
    }));

    const nextId =
      entries.reduce((max, entry) => Math.max(max, entry.id), 0) + 1;

    return { entries, nextId };
  } catch {
    return { entries: [], nextId: 1 };
  }
}

export function saveStoredEntries(key: string, entries: LogEntry[]): void {
  try {
    const stored: StoredEntry[] = entries.map((entry) => ({
      id: entry.id,
      time: entry.time.toISOString(),
      tone: entry.tone,
      tag: entry.tag,
      message: entry.message,
    }));
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(stored));
  } catch {
    // Ignore quota or privacy errors.
  }
}
