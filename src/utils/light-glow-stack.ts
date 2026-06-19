const STYLE_ID = "nvision-light-glow-stack";

/** Keep ambient glow under neighboring dashboard cards. */
export function ensureLightGlowStacking(cardTag: string): void {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) {
    return;
  }

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    hui-card:has(${cardTag}),
    .card:has(${cardTag}) {
      position: relative;
      z-index: 0;
      overflow: visible;
    }

    hui-card:not(:has(${cardTag})),
    .card:not(:has(${cardTag})) {
      position: relative;
      z-index: 1;
    }

    section:has(${cardTag}) {
      position: relative;
      z-index: 0;
    }

    section:not(:has(${cardTag})) {
      position: relative;
      z-index: 1;
    }

    section .meta {
      position: relative;
      z-index: 2;
    }

    .preview:has(${cardTag}) {
      overflow: visible;
    }
  `;
  document.head.appendChild(style);
}
