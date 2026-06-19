import type {
  HassConfig,
  HassEntities,
  HassServices,
} from "home-assistant-js-websocket";

export interface ValuePart {
  type: "value" | "literal" | "unit";
  value: string;
}

export interface HomeAssistant {
  config: HassConfig;
  states: HassEntities;
  services: HassServices;
  localize: (key: string, ...args: unknown[]) => string;
  callService: (
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
    target?: Record<string, unknown>
  ) => Promise<void>;
  user?: { name: string };
  themes: unknown;
  locale?: { language: string };
  formatEntityStateToParts?: (
    stateObj: import("home-assistant-js-websocket").HassEntity,
    state?: string
  ) => ValuePart[];
}

export interface LovelaceCardConfig {
  type: string;
  [key: string]: unknown;
}

export interface LovelaceGridOptions {
  columns?: number | "full";
  rows?: number | "auto";
  max_columns?: number;
  min_columns?: number;
  min_rows?: number;
  max_rows?: number;
}

export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  preview?: boolean;
  getCardSize(): number | Promise<number>;
  getGridOptions?(): LovelaceGridOptions;
  setConfig(config: LovelaceCardConfig): void;
}

export interface LovelaceCardEditor extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: LovelaceCardConfig): void;
}

export interface HaFormSchema {
  name: string;
  type?: string;
  required?: boolean;
  selector?: Record<string, unknown>;
  context?: Record<string, string>;
  schema?: readonly HaFormSchema[];
}

export interface LovelaceConfigForm {
  schema: HaFormSchema[];
  computeLabel?: (
    schema: HaFormSchema,
    localize: HomeAssistant["localize"]
  ) => string | undefined;
}

export function fireEvent(
  node: HTMLElement,
  type: string,
  detail?: Record<string, unknown>
): void {
  node.dispatchEvent(
    new CustomEvent(type, { detail, bubbles: true, composed: true })
  );
}
