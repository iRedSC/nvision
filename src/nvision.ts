import { version } from "../package.json";

import "./cards/blank/blank-card";
import "./cards/activity/activity-card";
import "./cards/liquid/liquid-card";
import "./cards/waveform/waveform-card";
import "./cards/air-quality/air-quality-card";
import "./cards/circle-gauge/circle-gauge-card";
import "./cards/power-draw/power-draw-card";
import "./cards/power-glance/power-glance-card";
import "./cards/light/light-card";
import "./cards/heat-map/heat-map-card";
import "./cards/entity-overview/entity-overview-card";
import "./cards/reactor-temp/reactor-temp-card";
import "./cards/stat/stat-card";
import "./cards/event-log/event-log-card";

console.info(
  `%c nvision ${version} `,
  "color: var(--primary-color, #03a9f4); font-weight: 700;"
);
