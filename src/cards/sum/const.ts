export const SUM_CARD_NAME = "nvision-sum-card";
export const SUM_CARD_EDITOR_NAME = "nvision-sum-card-editor";

export const DEFAULT_COLUMNS = 3;
export const DEFAULT_THEME = "none";

export type SumTheme = "none" | "monetary" | "energy" | "liquid";

export const SUM_THEME_OPTIONS: { value: SumTheme; label: string }[] = [
  { value: "none", label: "None" },
  { value: "monetary", label: "Monetary" },
  { value: "energy", label: "Energy" },
  { value: "liquid", label: "Liquid" },
];

export const SUM_THEME_ICONS: Record<SumTheme, string | undefined> = {
  none: undefined,
  monetary: "mdi:cash",
  energy: "mdi:flash",
  liquid: "mdi:water",
};
