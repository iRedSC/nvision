import type { HomeAssistant } from "../types";
import {
  handleLovelaceAction,
  type ActionConfig,
} from "./lovelace-actions";

export interface EntityInteractionConfig {
  entity?: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}

export function moreInfoInteractions(): Pick<
  EntityInteractionConfig,
  "tap_action" | "hold_action"
> {
  return {
    tap_action: { action: "more-info" },
    hold_action: { action: "more-info" },
  };
}

export function toggleInteractions(): Pick<
  EntityInteractionConfig,
  "tap_action" | "hold_action"
> {
  return {
    tap_action: { action: "toggle" },
    hold_action: { action: "more-info" },
  };
}

export class ActionHandlers {
  private _holdTimer?: number;

  private _holdTriggered = false;

  constructor(
    private readonly getHost: () => HTMLElement,
    private readonly getHass: () => HomeAssistant | undefined,
    private readonly getConfig: () => EntityInteractionConfig | undefined
  ) {}

  bind(entity?: string) {
    return {
      click: (ev: Event) => this.onTap(ev, entity),
      dblclick: (ev: Event) => this.onDoubleTap(ev, entity),
      keydown: (ev: KeyboardEvent) => this.onKeydown(ev, entity),
      pointerdown: () => this.onHoldStart(entity),
      pointerup: this.onHoldEnd,
      pointerleave: this.onHoldEnd,
      pointercancel: this.onHoldEnd,
    };
  }

  onKeydown = (ev: KeyboardEvent, entity?: string): void => {
    if (ev.key !== "Enter" && ev.key !== " ") {
      return;
    }

    ev.preventDefault();
    this._dispatch("tap", entity);
  };

  onTap = (ev: Event, entity?: string): void => {
    if (this._holdTriggered) {
      this._holdTriggered = false;
      ev.preventDefault();
      return;
    }

    this._dispatch("tap", entity);
  };

  onDoubleTap = (ev: Event, entity?: string): void => {
    ev.preventDefault();
    this._dispatch("double_tap", entity);
  };

  onHoldStart = (entity?: string): void => {
    window.clearTimeout(this._holdTimer);
    this._holdTriggered = false;
    this._holdTimer = window.setTimeout(() => {
      this._holdTriggered = true;
      this._dispatch("hold", entity);
    }, 500);
  };

  onHoldEnd = (): void => {
    window.clearTimeout(this._holdTimer);
  };

  private _dispatch(
    actionName: "tap" | "hold" | "double_tap",
    entity?: string
  ): void {
    const hass = this.getHass();
    const config = this.getConfig();
    if (!hass || !config) {
      return;
    }

    handleLovelaceAction(
      this.getHost(),
      hass,
      entity ? { ...config, entity } : config,
      actionName
    );
  }
}
