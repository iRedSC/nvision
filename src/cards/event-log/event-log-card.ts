import { css, html, LitElement, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import type { HassEvent } from "home-assistant-js-websocket";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardEditor,
  LovelaceGridOptions,
} from "../../types";
import { registerCustomCard } from "../../utils/custom-cards";
import {
  ActionHandlers,
  moreInfoInteractions,
} from "../../utils/action-handlers";
import { resolveConfigColor } from "../../utils/colors";
import type { EventLogCardConfig } from "./event-log-card-config";
import {
  buildSeverityRules,
  DEFAULT_EVENT_TYPES,
  DEFAULT_MAX_LINES,
  DEFAULT_TITLE,
  EVENT_LOG_CARD_EDITOR_NAME,
  EVENT_LOG_CARD_NAME,
  formatTime,
  resolveSeverity,
  severityCssVariable,
  type LogSeverity,
} from "./const";
import { formatEvent } from "./format-event";

registerCustomCard({
  type: EVENT_LOG_CARD_NAME,
  name: "Nvision Event Log",
  description: "Terminal-style live event log with keyword severity coloring",
});

interface LogEntry {
  id: number;
  time: Date;
  severity: LogSeverity;
  tag: string;
  message: string;
}

type HassConnection = {
  subscribeEvents?: (
    callback: (event: HassEvent) => void,
    eventType?: string
  ) => Promise<() => void>;
};

const PREVIEW_ENTRIES: LogEntry[] = [
  {
    id: 1,
    time: new Date(),
    severity: "success",
    tag: "sys",
    message: "Home Assistant started",
  },
  {
    id: 2,
    time: new Date(),
    severity: "info",
    tag: "state",
    message: "Living room → on",
  },
  {
    id: 3,
    time: new Date(),
    severity: "warning",
    message: "Garage door sensor timeout",
    tag: "state",
  },
  {
    id: 4,
    time: new Date(),
    severity: "error",
    tag: "auto",
    message: '"Night routine" failed: device unavailable',
  },
];

function resolveConnection(hass: HomeAssistant): HassConnection | undefined {
  return (
    hass as HomeAssistant & {
      connection?: HassConnection;
    }
  ).connection;
}

@customElement(EVENT_LOG_CARD_NAME)
export class NvisionEventLogCard extends LitElement implements LovelaceCard {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("./event-log-card-editor");
    return document.createElement(
      EVENT_LOG_CARD_EDITOR_NAME
    ) as LovelaceCardEditor;
  }

  public static getStubConfig(): EventLogCardConfig {
    return {
      type: `custom:${EVENT_LOG_CARD_NAME}`,
      title: DEFAULT_TITLE,
    };
  }

  @property({ attribute: false }) public hass?: HomeAssistant;

  @property({ type: Boolean }) public preview = false;

  @state() private _config?: EventLogCardConfig;

  @state() private _entries: LogEntry[] = [];

  @state() private _connected = false;

  @query(".terminal-body") private _body?: HTMLElement;

  private _nextId = 1;

  private _unsubs: Array<() => void> = [];

  private _actions = new ActionHandlers(
    () => this,
    () => this.hass,
    () => this._config
  );

  public setConfig(config: EventLogCardConfig): void {
    const eventTypes = config.event_types?.length
      ? config.event_types
      : DEFAULT_EVENT_TYPES;

    this._config = {
      title: DEFAULT_TITLE,
      max_lines: DEFAULT_MAX_LINES,
      show_timestamp: true,
      event_types: eventTypes,
      ...moreInfoInteractions(),
      ...config,
      event_types: eventTypes,
    };

    void this._syncSubscription();
  }

  public getCardSize(): number {
    return 4;
  }

  public getGridOptions(): LovelaceGridOptions {
    return { columns: 6, rows: 4, min_rows: 2 };
  }

  connectedCallback(): void {
    super.connectedCallback();
    void this._syncSubscription();
  }

  disconnectedCallback(): void {
    this._teardownSubscription();
    super.disconnectedCallback();
  }

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has("hass")) {
      void this._syncSubscription();
    }

    if (changed.has("_entries")) {
      this._scrollToBottom();
    }
  }

  private _scrollToBottom(): void {
    requestAnimationFrame(() => {
      const body = this._body;
      if (body) {
        body.scrollTop = body.scrollHeight;
      }
    });
  }

  private _severityRules() {
    return buildSeverityRules(this._config ?? {});
  }

  private _maxLines(): number {
    return this._config?.max_lines ?? DEFAULT_MAX_LINES;
  }

  private _eventTypes(): string[] {
    return this._config?.event_types?.length
      ? this._config.event_types
      : DEFAULT_EVENT_TYPES;
  }

  private async _syncSubscription(): Promise<void> {
    this._teardownSubscription();

    if (this.preview || !this.hass) {
      this._connected = false;
      return;
    }

    const connection = resolveConnection(this.hass);
    if (!connection?.subscribeEvents) {
      this._connected = false;
      return;
    }

    const types = this._eventTypes();

    try {
      for (const eventType of types) {
        const unsub = await connection.subscribeEvents(
          (event) => this._onEvent(event),
          eventType
        );
        this._unsubs.push(unsub);
      }
      this._connected = true;
    } catch {
      this._connected = false;
    }
  }

  private _teardownSubscription(): void {
    for (const unsub of this._unsubs) {
      unsub();
    }
    this._unsubs = [];
    this._connected = false;
  }

  private _onEvent(event: HassEvent): void {
    const formatted = formatEvent(this.hass, event);
    if (!formatted) {
      return;
    }

    const severity = resolveSeverity(formatted.message, this._severityRules());
    const time = event.time_fired ? new Date(event.time_fired) : new Date();
    const maxLines = this._maxLines();

    this._entries = [
      ...this._entries,
      {
        id: this._nextId++,
        time,
        severity,
        tag: formatted.tag,
        message: formatted.message,
      },
    ].slice(-maxLines);
  }

  private _lineColor(severity: LogSeverity): string {
    const rules = this._severityRules();
    const custom = rules.find((rule) => rule.severity === severity)?.color;
    if (custom) {
      return resolveConfigColor(custom, "");
    }
    return `var(${severityCssVariable(severity)})`;
  }

  private _renderLine(entry: LogEntry) {
    const showTimestamp = this._config?.show_timestamp !== false;

    return html`
      <div class="line ${entry.severity}" style="color: ${this._lineColor(entry.severity)}">
        ${showTimestamp
          ? html`<span class="time">${formatTime(entry.time)}</span>`
          : nothing}
        <span class="tag">${entry.tag}</span>
        <span class="msg">${entry.message}</span>
      </div>
    `;
  }

  protected render() {
    if (!this._config) {
      return nothing;
    }

    const title = this._config.title || DEFAULT_TITLE;
    const entries =
      this.preview || (!this._entries.length && !this._connected)
        ? PREVIEW_ENTRIES
        : this._entries;

    return html`
      <ha-card class="terminal">
        <div
          class="shell"
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          @click=${this._actions.bind().click}
          @dblclick=${this._actions.bind().dblclick}
          @keydown=${this._actions.bind().keydown}
          @pointerdown=${this._actions.bind().pointerdown}
          @pointerup=${this._actions.bind().pointerup}
          @pointerleave=${this._actions.bind().pointerleave}
          @pointercancel=${this._actions.bind().pointercancel}
        >
          <div class="terminal-header">
            <span class="prompt">&gt;</span>
            <span class="title">${title}</span>
            <span class="status ${this._connected ? "online" : "offline"}"></span>
          </div>
          <div class="terminal-body">
            ${entries.length
              ? entries.map((entry) => this._renderLine(entry))
              : html`<div class="line info empty">Waiting for events…</div>`}
            <div class="cursor" aria-hidden="true"></div>
          </div>
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
      --terminal-bg: var(--card-background-color);
      --terminal-border: var(--divider-color, rgba(127, 127, 127, 0.28));
      --terminal-accent: var(--primary-color);
    }

    ha-card {
      height: 100%;
      overflow: hidden;
      background: var(--terminal-bg);
      border: 1px solid var(--terminal-border);
    }

    .shell {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 120px;
      font-family: var(
        --code-font-family,
        ui-monospace,
        "Cascadia Code",
        "SF Mono",
        Consolas,
        monospace
      );
      font-size: 0.78rem;
      line-height: 1.45;
    }

    .terminal-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-bottom: 1px solid var(--terminal-border);
      color: var(--secondary-text-color);
      flex-shrink: 0;
    }

    .prompt {
      color: var(--terminal-accent);
      font-weight: 700;
    }

    .title {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--primary-text-color);
      font-weight: 500;
    }

    .status {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--disabled-text-color, #888);
      flex-shrink: 0;
    }

    .status.online {
      background: var(--success-color);
      box-shadow: 0 0 6px color-mix(in srgb, var(--success-color) 60%, transparent);
    }

    .terminal-body {
      flex: 1;
      overflow: auto;
      padding: 8px 12px 10px;
      min-height: 0;
    }

    .line {
      display: flex;
      gap: 8px;
      align-items: baseline;
      padding: 1px 0;
      word-break: break-word;
    }

    .line.empty {
      color: var(--secondary-text-color);
      font-style: italic;
    }

    .time {
      flex-shrink: 0;
      color: var(--secondary-text-color);
      opacity: 0.85;
    }

    .tag {
      flex-shrink: 0;
      min-width: 3.2em;
      text-transform: lowercase;
      color: var(--terminal-accent);
      opacity: 0.9;
    }

    .msg {
      flex: 1;
      min-width: 0;
    }

    .cursor {
      display: inline-block;
      width: 0.55em;
      height: 1em;
      margin-top: 2px;
      background: var(--terminal-accent);
      opacity: 0.75;
      animation: blink 1.1s step-end infinite;
    }

    @keyframes blink {
      0%,
      100% {
        opacity: 0.75;
      }
      50% {
        opacity: 0;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .cursor {
        animation: none;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [EVENT_LOG_CARD_NAME]: NvisionEventLogCard;
  }
}
