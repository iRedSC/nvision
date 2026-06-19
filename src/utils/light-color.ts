import type { HassEntity } from "home-assistant-js-websocket";

const SUPPORT_BRIGHTNESS = 1;

export function lightSupportsBrightness(stateObj: HassEntity): boolean {
  const features = stateObj.attributes.supported_features as number | undefined;
  if (typeof features === "number" && features & SUPPORT_BRIGHTNESS) {
    return true;
  }

  const modes = stateObj.attributes.supported_color_modes as
    | string[]
    | undefined;
  return Boolean(modes?.some((mode) => mode !== "onoff"));
}

export function lightBrightnessFactor(stateObj: HassEntity): number {
  if (stateObj.state !== "on") {
    return 0;
  }

  const brightness = stateObj.attributes.brightness as number | undefined;
  if (typeof brightness !== "number") {
    return 1;
  }

  return Math.max(0, Math.min(1, brightness / 255));
}

export function lightIconBrightnessFilter(stateObj: HassEntity): string {
  const brightness = stateObj.attributes.brightness as number | undefined;
  if (!brightness || stateObj.state !== "on") {
    return "";
  }

  return `brightness(${(brightness + 245) / 5}%)`;
}

function kelvinToRgb(kelvin: number): [number, number, number] {
  const temp = Math.max(1000, Math.min(40000, kelvin)) / 100;
  let red: number;
  let green: number;
  let blue: number;

  if (temp <= 66) {
    red = 255;
    green = Math.min(255, Math.max(0, 99.4708025861 * Math.log(temp) - 161.1195681661));
    blue =
      temp <= 19
        ? 0
        : Math.min(255, Math.max(0, 138.5177312231 * Math.log(temp - 10) - 305.0447927307));
  } else {
    red = Math.min(255, Math.max(0, 329.698727446 * (temp - 60) ** -0.1332047592));
    green = Math.min(255, Math.max(0, 288.1221695283 * (temp - 60) ** -0.0755148492));
    blue = 255;
  }

  return [Math.round(red), Math.round(green), Math.round(blue)];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const saturation = s / 100;
  const lightness = l / 100;
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const huePrime = h / 60;
  const x = chroma * (1 - Math.abs((huePrime % 2) - 1));
  let r1 = 0;
  let g1 = 0;
  let b1 = 0;

  if (huePrime >= 0 && huePrime < 1) {
    r1 = chroma;
    g1 = x;
  } else if (huePrime < 2) {
    r1 = x;
    g1 = chroma;
  } else if (huePrime < 3) {
    g1 = chroma;
    b1 = x;
  } else if (huePrime < 4) {
    g1 = x;
    b1 = chroma;
  } else if (huePrime < 5) {
    r1 = x;
    b1 = chroma;
  } else {
    r1 = chroma;
    b1 = x;
  }

  const match = lightness - chroma / 2;
  return [
    Math.round((r1 + match) * 255),
    Math.round((g1 + match) * 255),
    Math.round((b1 + match) * 255),
  ];
}

export function resolveLightRgb(stateObj: HassEntity): [number, number, number] | undefined {
  if (stateObj.state !== "on") {
    return undefined;
  }

  const rgb = stateObj.attributes.rgb_color as [number, number, number] | undefined;
  if (rgb) {
    return rgb;
  }

  const kelvin = stateObj.attributes.color_temp_kelvin as number | undefined;
  if (typeof kelvin === "number") {
    return kelvinToRgb(kelvin);
  }

  const mired = stateObj.attributes.color_temp as number | undefined;
  if (typeof mired === "number" && mired > 0) {
    return kelvinToRgb(Math.round(1_000_000 / mired));
  }

  const hs = stateObj.attributes.hs_color as [number, number] | undefined;
  if (hs) {
    return hslToRgb(hs[0], hs[1], 50);
  }

  return undefined;
}

export function resolveLightColor(stateObj: HassEntity): string {
  const rgb = resolveLightRgb(stateObj);
  if (rgb) {
    return `rgb(${rgb.join(", ")})`;
  }

  if (stateObj.state === "on") {
    return "var(--state-light-active-color, var(--state-active-color, #ffb74d))";
  }

  return "transparent";
}
