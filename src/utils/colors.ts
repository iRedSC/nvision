export type ConfigColor = string | [number, number, number];

export function readCssColor(
  host: HTMLElement,
  variable: string,
  fallback: string
): string {
  const value = getComputedStyle(host).getPropertyValue(variable).trim();
  return value || fallback;
}

export function resolveConfigColor(
  configColor: ConfigColor | undefined,
  fallback: string
): string {
  if (!configColor) {
    return fallback;
  }

  if (Array.isArray(configColor) && configColor.length >= 3) {
    return `rgb(${configColor[0]}, ${configColor[1]}, ${configColor[2]})`;
  }

  if (typeof configColor === "string") {
    const parts = configColor.split(",").map((part) => Number(part.trim()));
    if (parts.length >= 3 && parts.every((part) => Number.isFinite(part))) {
      return `rgb(${parts[0]}, ${parts[1]}, ${parts[2]})`;
    }
    return configColor;
  }

  return fallback;
}

export function resolveThemeColor(
  configColor: ConfigColor | undefined,
  host: HTMLElement,
  cssVariable: string,
  hardFallback: string
): string {
  return resolveConfigColor(
    configColor,
    readCssColor(host, cssVariable, hardFallback)
  );
}

export interface LiquidPalette {
  surface: string;
  mid: string;
  deep: string;
  glow: string;
}

let parseCanvas: HTMLCanvasElement | undefined;

function parseCssColor(color: string): [number, number, number] {
  parseCanvas ??= document.createElement("canvas");
  parseCanvas.width = 1;
  parseCanvas.height = 1;
  const ctx = parseCanvas.getContext("2d");
  if (!ctx) {
    return [41, 182, 246];
  }

  ctx.fillStyle = "#000000";
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return [r, g, b];
}

function toRgb([r, g, b]: [number, number, number]): string {
  return `rgb(${r}, ${g}, ${b})`;
}

function mixRgb(
  a: [number, number, number],
  b: [number, number, number],
  t: number
): [number, number, number] {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

function shadeRgb(
  rgb: [number, number, number],
  amount: number
): [number, number, number] {
  if (amount >= 0) {
    return mixRgb(rgb, [255, 255, 255], amount);
  }

  return mixRgb(rgb, [0, 0, 0], -amount);
}

export function deriveLiquidPalette(
  baseColor: string,
  cardBg: string
): LiquidPalette {
  const base = parseCssColor(baseColor);
  const bg = parseCssColor(cardBg);

  return {
    surface: toRgb(shadeRgb(base, 0.3)),
    mid: toRgb(base),
    deep: toRgb(shadeRgb(base, -0.38)),
    glow: toRgb(mixRgb(base, bg, 0.72)),
  };
}

/** Green → yellow → red by normalized level (0–1). */
export function levelGradientColor(host: HTMLElement, level: number): string {
  const green = parseCssColor(
    readCssColor(host, "--success-color", "#4caf50")
  );
  const yellow = parseCssColor(
    readCssColor(host, "--warning-color", "#ff9800")
  );
  const red = parseCssColor(readCssColor(host, "--error-color", "#f44336"));
  const t = Math.min(1, Math.max(0, level));

  if (t <= 0.5) {
    return toRgb(mixRgb(green, yellow, t * 2));
  }

  return toRgb(mixRgb(yellow, red, (t - 0.5) * 2));
}

/** Cool → warm gradient for temperature-style heat maps. */
export function temperatureGradientColor(
  host: HTMLElement,
  level: number
): string {
  const cool = parseCssColor(readCssColor(host, "--info-color", "#2196f3"));
  const warm = parseCssColor(
    readCssColor(host, "--warning-color", "#ff9800")
  );
  const hot = parseCssColor(readCssColor(host, "--error-color", "#f44336"));
  const t = Math.min(1, Math.max(0, level));

  if (t <= 0.5) {
    return toRgb(mixRgb(cool, warm, t * 2));
  }

  return toRgb(mixRgb(warm, hot, (t - 0.5) * 2));
}

/** Card background → primary accent. Default heat map palette. */
export function themeHeatColor(host: HTMLElement, level: number): string {
  const primary = parseCssColor(
    readCssColor(host, "--primary-color", "#03a9f4")
  );
  const cardBg = parseCssColor(
    readCssColor(host, "--card-background-color", "#1c1c1c")
  );
  const t = Math.min(1, Math.max(0, level));
  const floor = mixRgb(cardBg, primary, 0.18);
  return toRgb(mixRgb(floor, primary, 0.35 + t * 0.65));
}

export function customHeatColor(
  host: HTMLElement,
  level: number,
  colorLow: ConfigColor | undefined,
  colorHigh: ConfigColor | undefined
): string {
  const low = parseCssColor(
    resolveConfigColor(colorLow, readCssColor(host, "--info-color", "#2196f3"))
  );
  const high = parseCssColor(
    resolveConfigColor(colorHigh, readCssColor(host, "--error-color", "#f44336"))
  );
  const t = Math.min(1, Math.max(0, level));
  return toRgb(mixRgb(low, high, t));
}

export function heatMapGradientCss(
  host: HTMLElement,
  mode: "theme" | "semantic" | "temperature" | "custom" | "primary",
  colorLow?: ConfigColor,
  colorHigh?: ConfigColor,
  steps = 12
): string {
  const resolve = (level: number) => {
    if (mode === "primary") {
      return themeHeatColor(host, level);
    }
    if (mode === "semantic") {
      return levelGradientColor(host, level);
    }
    if (mode === "temperature") {
      return temperatureGradientColor(host, level);
    }
    if (mode === "custom") {
      return customHeatColor(host, level, colorLow, colorHigh);
    }
    return themeHeatColor(host, level);
  };

  const stops = Array.from({ length: steps }, (_, index) => {
    const level = index / (steps - 1);
    const pct = (level * 100).toFixed(1);
    return `${resolve(level)} ${pct}%`;
  });

  return `linear-gradient(to bottom, ${stops.join(", ")})`;
}
