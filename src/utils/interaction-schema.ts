import type { HaFormSchema, HomeAssistant } from "../types";

export function interactionEditorSchema(
  defaultTap: "more-info" | "toggle" = "more-info"
): HaFormSchema {
  return {
    name: "interactions",
    type: "expandable",
    flatten: true,
    schema: [
      {
        name: "tap_action",
        selector: {
          ui_action: {
            default_action: defaultTap,
          },
        },
      },
      {
        name: "hold_action",
        selector: {
          ui_action: {
            default_action: "more-info",
          },
        },
      },
      {
        name: "",
        type: "optional_actions",
        flatten: true,
        schema: [
          {
            name: "double_tap_action",
            selector: {
              ui_action: {
                default_action: "none",
              },
            },
          },
        ],
      },
    ],
  };
}

export function computeInteractionLabel(
  hass: HomeAssistant,
  schema: HaFormSchema
): string | undefined {
  if (schema.name === "interactions") {
    return "Interactions";
  }

  if (
    schema.name === "hold_action" ||
    schema.name === "double_tap_action"
  ) {
    return `${hass.localize(
      `ui.panel.lovelace.editor.card.generic.${schema.name}`
    )} (${hass.localize(
      "ui.panel.lovelace.editor.card.config.optional"
    )})`;
  }

  return undefined;
}
