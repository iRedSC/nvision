import type { HassEntities } from "home-assistant-js-websocket";
import demoStates from "../refs/home-assistant-frontend/gallery/src/data/demo_states.js";
import type { HomeAssistant } from "../src/types";

export type MockHass = HomeAssistant & {
  updateStates(states: HassEntities): void;
};

const EXTRA_STATES: HassEntities = {
  "sensor.phone_detected_activity": {
    entity_id: "sensor.phone_detected_activity",
    state: "walking",
    attributes: {
      friendly_name: "Phone Activity",
      options: [
        "in_vehicle",
        "on_bicycle",
        "on_foot",
        "still",
        "unknown",
        "tilting",
        "walking",
        "running",
      ],
    },
    last_changed: new Date().toISOString(),
    last_updated: new Date().toISOString(),
    context: { id: "activity", parent_id: null, user_id: null },
  },
};

export function createMockHass(host: HTMLElement): MockHass {
  const hass = {
    connected: true,
    language: "en",
    states: {
      ...(structuredClone(demoStates) as HassEntities),
      ...EXTRA_STATES,
    },
    config: {
      latitude: 52.3731339,
      longitude: 4.8903147,
      elevation: 0,
      unit_system: {
        length: "km",
        mass: "kg",
        temperature: "°C",
        volume: "L",
      },
      time_zone: "Europe/Amsterdam",
      currency: "EUR",
      country: "NL",
    },
    services: {},
    themes: {
      default_theme: "default",
      darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
      theme: "default",
      themes: {},
    },
    localize: (key: string) => key.split(".").pop() ?? key,
    callService: async (
      domain: string,
      service: string,
      data?: Record<string, unknown>
    ) => {
      const entityId = data?.entity_id;
      if (!entityId) return;

      const ids = Array.isArray(entityId) ? entityId : [entityId];
      const updates: HassEntities = {};

      for (const id of ids) {
        const current = hass.states[id];
        if (!current) continue;

        if (service === "toggle") {
          updates[id] = {
            ...current,
            state: current.state === "on" ? "off" : "on",
          };
        } else if (domain === "light" && service === "turn_on") {
          updates[id] = { ...current, state: "on" };
        } else if (domain === "light" && service === "turn_off") {
          updates[id] = { ...current, state: "off" };
        } else if (domain === "input_number" && service === "set_value") {
          updates[id] = {
            ...current,
            state: String(data?.value ?? current.state),
          };
        }
      }

      if (Object.keys(updates).length) {
        hass.updateStates(updates);
      }
    },
    updateStates(states: HassEntities) {
      hass.states = { ...hass.states, ...states };
      publish();
    },
  } as MockHass;

  const publish = () => {
    const snapshot = { ...hass, states: { ...hass.states } };
    const windowWithCards = window as Window & {
      customCards?: { type: string }[];
    };
    const cardTags =
      windowWithCards.customCards?.map((card) => card.type).join(", ") ?? "";
    const selector = cardTags ? `hui-card, ${cardTags}` : "hui-card";

    host.querySelectorAll(selector).forEach((el) => {
      (el as HTMLElement & { hass?: MockHass }).hass = snapshot;
    });

    host.dispatchEvent(
      new CustomEvent("hass-updated", { detail: snapshot, bubbles: true })
    );
  };

  publish();
  return hass;
}

export function entityIds(hass: MockHass): string[] {
  return Object.keys(hass.states).sort();
}
