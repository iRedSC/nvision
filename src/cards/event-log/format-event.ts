import type { HassEvent } from "home-assistant-js-websocket";
import type { HomeAssistant } from "../../types";

export interface FormattedEvent {
  tag: string;
  message: string;
}

function entityLabel(
  hass: HomeAssistant | undefined,
  entityId: string,
  stateObj?: { attributes?: { friendly_name?: string } } | null
): string {
  return (
    stateObj?.attributes?.friendly_name ||
    hass?.states[entityId]?.attributes?.friendly_name ||
    entityId
  );
}

function formatStateValue(
  state: string | undefined,
  unit?: string
): string {
  if (!state) {
    return "—";
  }
  return unit ? `${state} ${unit}` : state;
}

function formatStateChanged(
  hass: HomeAssistant | undefined,
  data: HassEvent["data"]
): FormattedEvent | undefined {
  const entityId = data.entity_id as string | undefined;
  const oldState = data.old_state as
    | { state?: string; attributes?: { friendly_name?: string; unit_of_measurement?: string } }
    | null
    | undefined;
  const newState = data.new_state as
    | { state?: string; attributes?: { friendly_name?: string; unit_of_measurement?: string } }
    | null
    | undefined;

  if (!entityId) {
    return undefined;
  }

  if (oldState?.state === newState?.state) {
    return undefined;
  }

  const name = entityLabel(hass, entityId, newState ?? oldState);
  const unit = newState?.attributes?.unit_of_measurement;

  if (!oldState && newState) {
    return {
      tag: "state",
      message: `${name} appeared → ${formatStateValue(newState.state, unit)}`,
    };
  }

  if (oldState && !newState) {
    return {
      tag: "state",
      message: `${name} removed`,
    };
  }

  return {
    tag: "state",
    message: `${name} → ${formatStateValue(newState?.state, unit)}`,
  };
}

function formatAutomationTriggered(data: HassEvent["data"]): FormattedEvent {
  const name =
    (data.name as string | undefined) ||
    (data.entity_id as string | undefined) ||
    "Automation";
  return {
    tag: "auto",
    message: `"${name}" triggered`,
  };
}

function formatCallService(data: HassEvent["data"]): FormattedEvent {
  const domain = data.domain as string | undefined;
  const service = data.service as string | undefined;
  const serviceId = domain && service ? `${domain}.${service}` : "service";
  const entityId = data.entity_id as string | undefined;
  const target = entityId ? ` → ${entityId}` : "";
  return {
    tag: "svc",
    message: `${serviceId}${target}`,
  };
}

function formatTimerFinished(data: HassEvent["data"]): FormattedEvent {
  const entityId = (data.entity_id as string | undefined) || "timer";
  return {
    tag: "timer",
    message: `${entityId} finished`,
  };
}

function formatPersistentNotification(data: HassEvent["data"]): FormattedEvent {
  const title = (data.title as string | undefined) || "Notification";
  const message = (data.message as string | undefined) || "";
  return {
    tag: "note",
    message: message ? `${title}: ${message}` : title,
  };
}

function formatLogbookEntry(data: HassEvent["data"]): FormattedEvent {
  const name = (data.name as string | undefined) || "Logbook";
  const message = (data.message as string | undefined) || "";
  return {
    tag: "log",
    message: message ? `${name}: ${message}` : name,
  };
}

export function formatEvent(
  hass: HomeAssistant | undefined,
  event: HassEvent
): FormattedEvent | undefined {
  switch (event.event_type) {
    case "state_changed":
      return formatStateChanged(hass, event.data);
    case "automation_triggered":
      return formatAutomationTriggered(event.data);
    case "call_service":
      return formatCallService(event.data);
    case "homeassistant_start":
      return { tag: "sys", message: "Home Assistant started" };
    case "timer_finished":
      return formatTimerFinished(event.data);
    case "script_started":
      return {
        tag: "script",
        message: `${(event.data.entity_id as string | undefined) || "Script"} started`,
      };
    case "persistent_notification":
      return formatPersistentNotification(event.data);
    case "logbook_entry":
      return formatLogbookEntry(event.data);
    default:
      return {
        tag: event.event_type.replace(/_/g, " ").slice(0, 12),
        message: JSON.stringify(event.data),
      };
  }
}
