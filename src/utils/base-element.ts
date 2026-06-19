import { LitElement } from "lit";
import { property } from "lit/decorators.js";
import type { HomeAssistant } from "../types";

export class NvisionBaseElement extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
}
