import type { HassEvent } from "home-assistant-js-websocket";

function asEntityIds(value: unknown): string[] {
  if (typeof value === "string") {
    return [value];
  }

  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

function entityIdsFromCallService(data: HassEvent["data"]): string[] {
  const ids = [...asEntityIds(data.entity_id)];

  const serviceData = data.service_data as Record<string, unknown> | undefined;
  if (serviceData) {
    ids.push(...asEntityIds(serviceData.entity_id));
  }

  return ids;
}

export function eventEntityIds(event: HassEvent): string[] {
  const data = event.data;

  switch (event.event_type) {
    case "state_changed":
    case "automation_triggered":
    case "timer_finished":
    case "script_started":
      return asEntityIds(data.entity_id);
    case "call_service":
      return entityIdsFromCallService(data);
    case "logbook_entry":
      return asEntityIds(data.entity_id);
    default:
      return asEntityIds(data.entity_id);
  }
}

export function eventMatchesEntities(
  event: HassEvent,
  entities: string[] | undefined
): boolean {
  if (!entities?.length) {
    return true;
  }

  const tracked = new Set(entities);
  return eventEntityIds(event).some((entityId) => tracked.has(entityId));
}

export function entryMatchesEntities(
  message: string,
  entities: string[] | undefined,
  hass?: { states: Record<string, { attributes?: { friendly_name?: string } }> }
): boolean {
  if (!entities?.length) {
    return true;
  }

  const haystack = message.toLowerCase();

  for (const entityId of entities) {
    if (haystack.includes(entityId.toLowerCase())) {
      return true;
    }

    const friendlyName = hass?.states[entityId]?.attributes?.friendly_name;
    if (friendlyName && haystack.includes(friendlyName.toLowerCase())) {
      return true;
    }
  }

  return false;
}
