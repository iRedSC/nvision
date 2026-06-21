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
  DEFAULT_SEVERITY_RULES,
  DEFAULT_TITLE,
  EVENT_LOG_CARD_EDITOR_NAME,
  EVENT_TYPE_OPTIONS,
  parseKeywordList,
} from "./const";

const BASE_SCHEMA: HaFormSchema[] = [
  { name: "title", selector: { text: {} } },
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
    title: "Severity keywords",
    schema: [
      { name: "error_keywords_text", selector: { text: {} } },
      { name: "warning_keywords_text", selector: { text: {} } },
      { name: "success_keywords_text", selector: { text: {} } },
      { name: "debug_keywords_text", selector: { text: {} } },
    ],
  },
];

type EditorData = EventLogCardConfig & {
  error_keywords_text?: string;
  warning_keywords_text?: string;
  success_keywords_text?: string;
  debug_keywords_text?: string;
};

function keywordsToText(keywords: string[] | undefined, severity: string): string {
  if (keywords?.length) {
    return keywords.join(", ");
  }

  const defaults = DEFAULT_SEVERITY_RULES.find(
    (rule) => rule.severity === severity
  )?.keywords;
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
    error_keywords_text: keywordsToText(config.error_keywords, "error"),
    warning_keywords_text: keywordsToText(config.warning_keywords, "warning"),
    success_keywords_text: keywordsToText(config.success_keywords, "success"),
    debug_keywords_text: keywordsToText(config.debug_keywords, "debug"),
  };
}

function configFromEditor(data: EditorData): EventLogCardConfig {
  const {
    error_keywords_text,
    warning_keywords_text,
    success_keywords_text,
    debug_keywords_text,
    ...config
  } = data;

  return {
    ...config,
    error_keywords: parseKeywordList(error_keywords_text),
    warning_keywords: parseKeywordList(warning_keywords_text),
    success_keywords: parseKeywordList(success_keywords_text),
    debug_keywords: parseKeywordList(debug_keywords_text),
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
      case "max_lines":
        return "Maximum lines";
      case "event_types":
        return "Event types";
      case "show_timestamp":
        return "Show timestamps";
      case "keywords":
        return "Severity keywords";
      case "error_keywords_text":
        return "Error keywords";
      case "warning_keywords_text":
        return "Warning keywords";
      case "success_keywords_text":
        return "Success keywords";
      case "debug_keywords_text":
        return "Debug keywords";
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
