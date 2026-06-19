import { css } from "lit";

/** Scales card text and icons with the card's grid cell size. */
export const responsiveTypeStyles = css`
  :host {
    container-type: size;
    --nv-value-font-size: clamp(1.125rem, 16cqmin, 3rem);
    --nv-label-font-size: clamp(0.6875rem, 7.5cqmin, 1.125rem);
    --nv-title-font-size: clamp(0.8125rem, 9cqmin, 1.375rem);
    --nv-subtitle-font-size: clamp(0.6875rem, 7cqmin, 1rem);
    --nv-icon-size: clamp(24px, 20cqmin, 48px);
    --nv-gauge-max-size: min(100%, 72cqmin);
  }
`;

export const responsiveTileInfoStyles = css`
  ha-tile-info {
    --ha-tile-info-primary-font-size: var(--nv-value-font-size);
    --ha-tile-info-primary-font-weight: var(--ha-font-weight-medium, 500);
    --ha-tile-info-secondary-font-size: var(--nv-label-font-size);
    --ha-tile-info-secondary-color: var(--secondary-text-color);
  }
`;

export const responsiveStateIconStyles = css`
  ha-state-icon {
    --mdc-icon-size: var(--nv-icon-size);
  }
`;
