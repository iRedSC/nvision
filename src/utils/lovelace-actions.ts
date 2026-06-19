import type { HomeAssistant } from "../types";
import { fireEvent } from "../types";

export interface ActionConfig {
  action?: string;
  entity?: string;
  navigation_path?: string;
  url_path?: string;
  service?: string;
  service_data?: Record<string, unknown>;
  target?: Record<string, unknown>;
}

type ActionName = "tap" | "hold" | "double_tap";

const DEFAULT_ACTIONS: Record<ActionName, string> = {
  tap: "toggle",
  hold: "more-info",
  double_tap: "none",
};

const ACTION_KEYS: Record<ActionName, keyof ActionConfig | string> = {
  tap: "tap_action",
  hold: "hold_action",
  double_tap: "double_tap_action",
};

export function handleLovelaceAction(
  node: HTMLElement,
  hass: HomeAssistant,
  config: {
    entity?: string;
    tap_action?: ActionConfig;
    hold_action?: ActionConfig;
    double_tap_action?: ActionConfig;
  },
  actionName: ActionName
): void {
  const key = ACTION_KEYS[actionName];
  const actionConfig = config[key as keyof typeof config] as
    | ActionConfig
    | undefined;
  const action = actionConfig?.action ?? DEFAULT_ACTIONS[actionName];

  if (action === "none") {
    return;
  }

  const entity = actionConfig?.entity ?? config.entity;
  if (!entity) {
    return;
  }

  switch (action) {
    case "toggle":
      hass.callService("homeassistant", "toggle", { entity_id: entity });
      return;
    case "more-info":
      fireEvent(node, "hass-more-info", { entityId: entity });
      return;
    case "navigate":
      if (actionConfig?.navigation_path) {
        fireEvent(node, "hass-navigate", {
          navigation_path: actionConfig.navigation_path,
        });
      }
      return;
    case "url":
      if (actionConfig?.url_path) {
        window.open(actionConfig.url_path);
      }
      return;
    case "call-service":
      if (actionConfig?.service) {
        const [domain, service] = actionConfig.service.split(".", 2);
        hass.callService(
          domain,
          service,
          actionConfig.service_data,
          actionConfig.target
        );
      }
      return;
    default:
      return;
  }
}
