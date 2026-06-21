import { html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { HaFormSchema, LovelaceCardEditor } from "../../types";
import { fireEvent } from "../../types";
import { NvisionBaseElement } from "../../utils/base-element";
import {
  computeInteractionLabel,
  interactionEditorSchema,
} from "../../utils/interaction-schema";
import type { EventLogCardConfig } from "./event-log-card-config";
import {
  DEFAULT_EVENT_TYPES,
  DEFAULT_MAX_LINES,
  DEFAULT_TITLE,
  DEFAULT_TONE_RULES,
  EVENT_LOG_CARD_EDITOR_NAME,
  EVENT_TYPE_OPTIONS,
  parseKeywordList,
  type LogTone,
} from "./const";

const BASE_SCHEMA: HaFormSchema[] = [
  { name: "title", selector: { text: {} } },
  {
    name: "entities",
    selector: { entity: { multiple: true } },
  },
  { name: "storage_key", selector: { text: {} } },
  {
    name: "max_lines",
    required: true,
    default: DEFAULT_MAX_LINES,
    selector: { number: { min: 10, max: 500, step: 10 } },
  },
  {
    name: "event_types",
    default: DEFAULT_EVENT_TYPES,
    selector: {
      select: {
        mode: "list",
        multiple: true,
        options: [...EVENT_TYPE_OPTIONS],
      },
    },
  },
  { name: "show_timestamp", selector: { boolean: {} } },
  interactionEditorSchema(),
];

const KEYWORD_SCHEMA: HaFormSchema[] = [
  {
    type: "expandable",
    name: "keywords",
    flatten: true,
    title: "Tone keywords",
    schema: [
      { name: "alert_keywords_text", selector: { text: {} } },
      { name: "inactive_keywords_text", selector: { text: {} } },
      { name: "idle_keywords_text", selector: { text: {} } },
      { name: "active_keywords_text", selector: { text: {} } },
    ],
  },
];

type EditorData = EventLogCardConfig & {
  alert_keywords_text?: string;
  inactive_keywords_text?: string;
  idle_keywords_text?: string;
  active_keywords_text?: string;
};

function keywordsToText(
  keywords: string[] | undefined,
  tone: Exclude<LogTone, "neutral">
): string {
  if (keywords?.length) {
    return keywords.join(", ");
  }

  const defaults = DEFAULT_TONE_RULES.find((rule) => rule.tone === tone)?.keywords;
  return defaults?.join(", ") ?? "";
}

function editorData(config: EventLogCardConfig): EditorData {
  return {
    ...config,
    title: config.title ?? DEFAULT_TITLE,
    max_lines: config.max_lines ?? DEFAULT_MAX_LINES,
    event_types: config.event_types?.length
      ? config.event_types
      : DEFAULT_EVENT_TYPES,
    show_timestamp: config.show_timestamp ?? true,
    entities: config.entities ?? [],
    alert_keywords_text: keywordsToText(config.alert_keywords, "alert"),
    inactive_keywords_text: keywordsToText(config.inactive_keywords, "inactive"),
    idle_keywords_text: keywordsToText(config.idle_keywords, "idle"),
    active_keywords_text: keywordsToText(config.active_keywords, "active"),
  };
}

function configFromEditor(data: EditorData): EventLogCardConfig {
  const {
    alert_keywords_text,
    inactive_keywords_text,
    idle_keywords_text,
    active_keywords_text,
    ...config
  } = data;

  return {
    ...config,
    alert_keywords: parseKeywordList(alert_keywords_text),
    inactive_keywords: parseKeywordList(inactive_keywords_text),
    idle_keywords: parseKeywordList(idle_keywords_text),
    active_keywords: parseKeywordList(active_keywords_text),
    entities: config.entities?.filter(Boolean).length
      ? config.entities.filter(Boolean)
      : undefined,
  };
}

@customElement(EVENT_LOG_CARD_EDITOR_NAME)
export class NvisionEventLogCardEditor
  extends NvisionBaseElement
  implements LovelaceCardEditor
{
  @state() private _config?: EventLogCardConfig;

  public setConfig(config: EventLogCardConfig): void {
    this._config = {
      title: DEFAULT_TITLE,
      max_lines: DEFAULT_MAX_LINES,
      event_types: DEFAULT_EVENT_TYPES,
      show_timestamp: true,
      entities: [],
      ...config,
    };
  }

  private _computeLabel = (schema: HaFormSchema) => {
    if (!this.hass) {
      return undefined;
    }

    switch (schema.name) {
      case "title":
        return "Title";
      case "entities":
        return "Entities";
      case "storage_key":
        return "Storage key";
      case "max_lines":
        return "Maximum lines";
      case "event_types":
        return "Event types";
      case "show_timestamp":
        return "Show timestamps";
      case "keywords":
        return "Tone keywords";
      case "alert_keywords_text":
        return "Alert keywords (red)";
      case "inactive_keywords_text":
        return "Inactive keywords (orange)";
      case "idle_keywords_text":
        return "Idle keywords (yellow)";
      case "active_keywords_text":
        return "Active keywords (green)";
      default:
        return (
          computeInteractionLabel(this.hass, schema) ??
          this.hass.localize(
            `ui.panel.lovelace.editor.card.generic.${schema.name}`
          )
        );
    }
  };

  protected render() {
    if (!this.hass || !this._config) {
      return nothing;
    }

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${editorData(this._config)}
        .schema=${[...BASE_SCHEMA, ...KEYWORD_SCHEMA]}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _valueChanged(ev: CustomEvent): void {
    fireEvent(this, "config-changed", {
      config: configFromEditor(ev.detail.value as EditorData),
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [EVENT_LOG_CARD_EDITOR_NAME]: NvisionEventLogCardEditor;
  }
}
