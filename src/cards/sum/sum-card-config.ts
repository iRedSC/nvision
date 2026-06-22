import type { LovelaceCardConfig } from "../../types";
import type { ActionConfig } from "../../utils/lovelace-actions";
import type { SumTheme } from "./const";

export interface SumEntityConfig {
  entity: string;
  name?: string;
  icon?: string;
  image?: string;
  show_icon?: boolean;
  show_name?: boolean;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}

export type SumEntityEntry = string | SumEntityConfig;

export interface SumCardConfig extends LovelaceCardConfig {
  type: `custom:${string}`;
  entities?: SumEntityEntry[];
  columns?: number;
  theme?: SumTheme;
  name?: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}

export interface ResolvedSumEntity {
  entityId: string;
  name?: string;
  icon?: string;
  image?: string;
  showIcon: boolean;
  showName: boolean;
}

export function entityIdsFromEntries(
  entries: SumEntityEntry[] | undefined
): string[] {
  return resolveSumEntities(entries).map((entry) => entry.entityId);
}

export function resolveSumEntities(
  entries: SumEntityEntry[] | undefined
): ResolvedSumEntity[] {
  if (!entries?.length) {
    return [];
  }

  const resolved: ResolvedSumEntity[] = [];

  for (const entry of entries) {
    if (typeof entry === "string") {
      resolved.push({
        entityId: entry,
        showIcon: true,
        showName: true,
      });
      continue;
    }

    if (!entry.entity) {
      continue;
    }

    resolved.push({
      entityId: entry.entity,
      name: entry.name,
      icon: entry.icon,
      image: entry.image,
      showIcon: entry.show_icon !== false,
      showName: entry.show_name !== false,
    });
  }

  return resolved;
}
