import { css } from "lit";

/** Typography and icon sizes aligned with Home Assistant tile cards. */
export const responsiveTypeStyles = css`
  :host {
    --nv-value-font-size: var(--ha-font-size-l);
    --nv-label-font-size: var(--ha-font-size-s);
    --nv-title-font-size: var(--ha-font-size-m);
    --nv-subtitle-font-size: var(--ha-font-size-s);
    --nv-icon-size: 24px;
    --nv-gauge-max-size: min(100%, 160px);
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
