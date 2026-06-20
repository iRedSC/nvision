import { css, html, LitElement, nothing, type PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardEditor,
  LovelaceGridOptions,
} from "../../types";
import { registerCustomCard } from "../../utils/custom-cards";
import {
  ActionHandlers,
  moreInfoInteractions,
} from "../../utils/action-handlers";
import {
  responsiveTypeStyles,
  responsiveStateIconStyles,
  responsiveTileInfoStyles,
} from "../../utils/responsive-type";
import { formatStateWithUnit } from "../../utils/entity-state";
import type { ReactorCoreCardConfig } from "./reactor-core-card-config";
import {
  DEFAULT_INFO_SELECTION,
  DEFAULT_MAX,
  DEFAULT_MAX_PARTICLES,
  DEFAULT_MIN,
  DEFAULT_MODE,
  DEFAULT_SHOW_INFO,
  DEFAULT_SHOW_INFO_CHANGE,
  INFO_RANDOM_INTERVAL_MS,
  NEAREST_CURSOR_MOVE_THRESHOLD,
  NEAREST_CURSOR_SWAP_MARGIN,
  REACTOR_CORE_CARD_EDITOR_NAME,
  REACTOR_CORE_CARD_NAME,
  REACTOR_ENTITY_DOMAINS,
} from "./const";
import {
  drawReactor,
  syncParticles,
  updateParticles,
  updatePulses,
  type ReactorConnection,
  type ReactorParticle,
  type ReactorPulse,
} from "./reactor-particles";

const INFO_SLOT_COUNT = 4;

registerCustomCard({
  type: REACTOR_CORE_CARD_NAME,
  name: "Nvision Reactor Core",
  description: "Orbiting sensor particles with reactor-style pulse effects",
});

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

@customElement(REACTOR_CORE_CARD_NAME)
export class NvisionReactorCoreCard extends LitElement implements LovelaceCard {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("./reactor-core-card-editor");
    return document.createElement(
      REACTOR_CORE_CARD_EDITOR_NAME
    ) as LovelaceCardEditor;
  }

  public static getStubConfig(
    hass: HomeAssistant,
    entities: string[],
    entitiesFallback: string[]
  ): ReactorCoreCardConfig {
    const pool = [...entities, ...entitiesFallback, ...Object.keys(hass.states)];
    const seen = new Set<string>();
    const picked: string[] = [];

    for (const id of pool) {
      if (seen.has(id)) {
        continue;
      }
      seen.add(id);

      const domain = id.split(".", 1)[0];
      if (
        domain === "sensor" ||
        domain === "binary_sensor" ||
        domain === "switch" ||
        domain === "light" ||
        domain === "timer"
      ) {
        picked.push(id);
      }

      if (picked.length >= 8) {
        break;
      }
    }

    return {
      type: `custom:${REACTOR_CORE_CARD_NAME}`,
      mode: DEFAULT_MODE,
      entities: picked.length ? picked : undefined,
      max_particles: DEFAULT_MAX_PARTICLES,
      min: DEFAULT_MIN,
      max: DEFAULT_MAX,
    };
  }

  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: ReactorCoreCardConfig;

  @state() private _slotIds: string[] = Array(INFO_SLOT_COUNT).fill("");

  private _infoChangeFrom: Record<string, string> = {};

  @query(".stage") private _stage?: HTMLElement;

  @query("canvas") private _canvas?: HTMLCanvasElement;

  private _ctx?: CanvasRenderingContext2D;
  private _frameId = 0;
  private _animating = false;
  private _lastFrame = 0;
  private _particles: ReactorParticle[] = [];
  private _pulses: ReactorPulse[] = [];
  private _entityKey = "";
  private _resizeObserver?: ResizeObserver;
  private _slotAge = Array(INFO_SLOT_COUNT).fill(0);
  private _pointerX?: number;
  private _pointerY?: number;
  private _lastNearestPick?: { x: number; y: number };
  private _lastRandomPickMs = 0;

  private _actions = new ActionHandlers(
    () => this,
    () => this.hass,
    () => this._config
  );

  public setConfig(config: ReactorCoreCardConfig): void {
    this._config = {
      mode: DEFAULT_MODE,
      max_particles: DEFAULT_MAX_PARTICLES,
      min: DEFAULT_MIN,
      max: DEFAULT_MAX,
      info_selection: DEFAULT_INFO_SELECTION,
      show_info: DEFAULT_SHOW_INFO,
      show_info_change: DEFAULT_SHOW_INFO_CHANGE,
      ...moreInfoInteractions(),
      ...config,
    };
    this._entityKey = "";
    this._pulses = [];
    this._lastRandomPickMs = 0;
    this._lastNearestPick = undefined;
    this._infoChangeFrom = {};
  }

  public getCardSize(): number {
    return 2;
  }

  public getGridOptions(): LovelaceGridOptions {
    return { columns: 6, rows: 2 };
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._lastFrame = 0;
    this._startAnimation();
  }

  disconnectedCallback(): void {
    this._stopAnimation();
    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;
    super.disconnectedCallback();
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has("_config") || changed.has("_slotIds")) {
      return true;
    }

    if (!changed.has("hass")) {
      return true;
    }

    const oldHass = changed.get("hass") as HomeAssistant | undefined;
    if (!oldHass || !this.hass) {
      return true;
    }

    for (const entityId of this._slotIds) {
      if (!entityId) {
        continue;
      }
      if (oldHass.states[entityId] !== this.hass.states[entityId]) {
        return true;
      }
    }

    return false;
  }

  protected willUpdate(changed: PropertyValues): void {
    if ((changed.has("hass") || changed.has("_config")) && this.hass && this._config) {
      this._syncParticles(performance.now(), true);
    }
  }

  protected updated(changed: Map<string, unknown>): void {
    this._ensureCanvas();
  }

  private _canvasSize(): { width: number; height: number } {
    const canvas = this._canvas;
    if (!canvas) {
      return { width: 0, height: 0 };
    }
    return { width: canvas.clientWidth, height: canvas.clientHeight };
  }

  private _syncParticles(
    timeMs = performance.now(),
    applyInfo = true
  ): void {
    if (!this.hass || !this._config) {
      return;
    }

    const { width, height } = this._canvasSize();
    const entityIds = discoverIds(this.hass, this._config);
    const key = entityIds.join("|");
    const configKey = [
      this._config.mode,
      this._config.max_particles,
      (this._config.domains ?? []).join(","),
      (this._config.exclude ?? []).join(","),
      this._config.min,
      this._config.max,
      (this._config.entities ?? []).join(","),
    ].join(";");

    if (key + configKey !== this._entityKey) {
      this._pulses = [];
      this._entityKey = key + configKey;
    }

    const previousFormatted = new Map<string, string>();
    if (this._showInfoChange()) {
      for (const particle of this._particles) {
        if (particle.lastState === undefined) {
          continue;
        }
        previousFormatted.set(
          particle.entityId,
          this._formatEntityState(particle.entityId, particle.lastState)
        );
      }
    }

    const { particles, changedIds } = syncParticles(
      this._particles,
      this.hass,
      this._config,
      this._pulses,
      width,
      height,
      timeMs
    );
    this._particles = particles;

    if (!applyInfo && !changedIds.length) {
      return;
    }

    const selection =
      this._config.info_selection ?? DEFAULT_INFO_SELECTION;

    if (selection === "on_update") {
      for (const entityId of changedIds) {
        this._assignToOldestSlot(entityId);
      }
    } else if (selection === "random_interval" && this._lastRandomPickMs === 0) {
      this._pickRandomSlots(timeMs);
    }

    if (this._showInfoChange() && changedIds.length) {
      for (const entityId of changedIds) {
        const previous = previousFormatted.get(entityId);
        if (previous) {
          this._infoChangeFrom[entityId] = previous;
        }
      }
    }

    this._pruneInfoChangeFrom();
  }

  private _infoSelection(): ReactorCoreCardConfig["info_selection"] {
    return this._config?.info_selection ?? DEFAULT_INFO_SELECTION;
  }

  private _showInfo(): boolean {
    return this._config?.show_info ?? DEFAULT_SHOW_INFO;
  }

  private _showInfoChange(): boolean {
    return this._config?.show_info_change ?? DEFAULT_SHOW_INFO_CHANGE;
  }

  private _formatEntityState(entityId: string, state: string): string {
    const stateObj = this.hass?.states[entityId];
    if (!stateObj) {
      return state;
    }

    return formatStateWithUnit({ ...stateObj, state });
  }

  private _slotSecondary(entityId: string): string {
    const stateObj = this.hass?.states[entityId];
    const current = formatStateWithUnit(stateObj);

    if (!this._showInfoChange()) {
      return current;
    }

    const previous = this._infoChangeFrom[entityId];
    if (!previous || previous === current) {
      return current;
    }

    return `${previous} → ${current}`;
  }

  private _pruneInfoChangeFrom(): void {
    const visible = new Set(this._slotIds.filter(Boolean));
    const next: Record<string, string> = {};

    for (const [entityId, value] of Object.entries(this._infoChangeFrom)) {
      if (visible.has(entityId)) {
        next[entityId] = value;
      }
    }

    if (Object.keys(next).length !== Object.keys(this._infoChangeFrom).length) {
      this._infoChangeFrom = next;
    }
  }

  private _setSlotIds(entityIds: string[]): void {
    const slots = entityIds.slice(0, INFO_SLOT_COUNT);
    while (slots.length < INFO_SLOT_COUNT) {
      slots.push("");
    }

    if (slots.join("|") === this._slotIds.join("|")) {
      return;
    }

    const currentIds = this._slotIds.filter(Boolean).sort().join("|");
    const nextIds = slots.filter(Boolean).sort().join("|");
    if (currentIds === nextIds) {
      return;
    }

    this._slotIds = slots;
    this._pruneInfoChangeFrom();
  }

  private _assignToOldestSlot(entityId: string): void {
    const existingIndex = this._slotIds.indexOf(entityId);
    if (existingIndex >= 0) {
      const ages = [...this._slotAge];
      ages[existingIndex] = performance.now();
      this._slotAge = ages;
      return;
    }

    const slots = [...this._slotIds];
    const ages = [...this._slotAge];

    let oldestIndex = 0;
    for (let index = 1; index < INFO_SLOT_COUNT; index += 1) {
      if (ages[index] < ages[oldestIndex]) {
        oldestIndex = index;
      }
    }

    if (slots[oldestIndex] === entityId) {
      ages[oldestIndex] = performance.now();
      this._slotAge = ages;
      return;
    }

    slots[oldestIndex] = entityId;
    ages[oldestIndex] = performance.now();
    this._slotIds = slots;
    this._slotAge = ages;
    this._pruneInfoChangeFrom();
  }

  private _pickRandomSlots(timeMs = performance.now()): void {
    const ids = this._particles
      .filter((particle) => particle.placed)
      .map((particle) => particle.entityId);

    if (!ids.length) {
      return;
    }

    const shuffled = [...ids];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[swapIndex]] = [
        shuffled[swapIndex],
        shuffled[index],
      ];
    }

    this._setSlotIds(shuffled);
    this._slotAge = Array(INFO_SLOT_COUNT).fill(timeMs);
    this._lastRandomPickMs = timeMs;
  }

  private _pickNearestSlots(
    targetX: number,
    targetY: number,
    force = false
  ): void {
    const ranked = this._particles
      .filter((particle) => particle.placed)
      .map((particle) => ({
        entityId: particle.entityId,
        distance: Math.hypot(particle.x - targetX, particle.y - targetY),
      }))
      .sort((left, right) => left.distance - right.distance);

    if (!ranked.length) {
      return;
    }

    const current = this._slotIds.filter(Boolean);

    if (!current.length || force) {
      this._setSlotIds(ranked.slice(0, INFO_SLOT_COUNT).map((entry) => entry.entityId));
      this._lastNearestPick = { x: targetX, y: targetY };
      return;
    }

    if (!force && this._lastNearestPick) {
      const moved = Math.hypot(
        targetX - this._lastNearestPick.x,
        targetY - this._lastNearestPick.y
      );
      if (moved < NEAREST_CURSOR_MOVE_THRESHOLD) {
        return;
      }
    }

    const byId = new Map(
      ranked.map((entry) => [entry.entityId, entry.distance])
    );
    const selected = new Set(current);
    const next = [...current];

    for (const candidate of ranked) {
      if (selected.has(candidate.entityId)) {
        continue;
      }

      if (next.length < INFO_SLOT_COUNT) {
        next.push(candidate.entityId);
        selected.add(candidate.entityId);
        continue;
      }

      let furthestIndex = 0;
      let furthestDistance = byId.get(next[0]!) ?? Infinity;
      for (let index = 1; index < next.length; index += 1) {
        const distance = byId.get(next[index]!) ?? Infinity;
        if (distance > furthestDistance) {
          furthestDistance = distance;
          furthestIndex = index;
        }
      }

      if (candidate.distance + NEAREST_CURSOR_SWAP_MARGIN < furthestDistance) {
        selected.delete(next[furthestIndex]!);
        next[furthestIndex] = candidate.entityId;
        selected.add(candidate.entityId);
      }
    }

    this._setSlotIds(next);
    this._lastNearestPick = { x: targetX, y: targetY };
  }

  private _refreshInfoSlots(
    width: number,
    height: number,
    timeMs: number
  ): void {
    const selection = this._infoSelection();

    if (selection === "random_interval") {
      if (
        this._lastRandomPickMs === 0 ||
        timeMs - this._lastRandomPickMs >= INFO_RANDOM_INTERVAL_MS
      ) {
        this._pickRandomSlots(timeMs);
      }
      return;
    }

    if (
      selection === "nearest_cursor" &&
      !this._slotIds.some(Boolean) &&
      this._particles.some((particle) => particle.placed)
    ) {
      this._pickNearestSlots(
        this._pointerX ?? width / 2,
        this._pointerY ?? height / 2,
        true
      );
    }
  }

  private _trackPointer(event: PointerEvent): void {
    const stage = this._stage;
    if (!stage) {
      return;
    }

    const rect = stage.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    this._pointerX = x;
    this._pointerY = y;

    if (this._infoSelection() === "nearest_cursor") {
      this._pickNearestSlots(x, y);
    }
  }

  private _infoAnchors(): { x: number; y: number }[] {
    const stage = this._stage;
    if (!stage) {
      return [];
    }

    const stageRect = stage.getBoundingClientRect();
    const slots = this.shadowRoot?.querySelectorAll(".info-slot") ?? [];

    return Array.from(slots).map((slot) => {
      const rect = slot.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - stageRect.left,
        y: rect.top + 2 - stageRect.top,
      };
    });
  }

  private _buildConnections(): ReactorConnection[] {
    if (!this._showInfo()) {
      return [];
    }

    const anchors = this._infoAnchors();
    const connections: ReactorConnection[] = [];

    for (let index = 0; index < INFO_SLOT_COUNT; index += 1) {
      const entityId = this._slotIds[index];
      if (!entityId) {
        continue;
      }

      const particle = this._particles.find(
        (entry) => entry.entityId === entityId
      );
      const anchor = anchors[index];
      if (!particle?.placed || !anchor) {
        continue;
      }

      connections.push({
        fromX: particle.x,
        fromY: particle.y,
        toX: anchor.x,
        toY: anchor.y,
        seed: particle.seed,
      });
    }

    return connections;
  }

  private _ensureCanvas(): void {
    const canvas = this._canvas;
    if (!canvas) {
      return;
    }

    if (!this._ctx) {
      this._ctx = canvas.getContext("2d") ?? undefined;
      if (!this._ctx) {
        return;
      }

      this._resizeObserver = new ResizeObserver(() => {
        this._resizeCanvas();
      });
      this._resizeObserver.observe(this._stage ?? canvas.parentElement ?? this);
    }

    this._resizeCanvas();

    if (!this._animating) {
      this._lastFrame = 0;
      this._startAnimation();
    }
  }

  private _startAnimation(): void {
    if (this._animating || !this._ctx) {
      return;
    }

    this._animating = true;

    const tick = (now: number) => {
      if (!this.isConnected || !this._ctx) {
        this._animating = false;
        return;
      }

      const delta = this._lastFrame
        ? Math.min((now - this._lastFrame) / 16.67, 3)
        : 1;
      const deltaMs = this._lastFrame ? now - this._lastFrame : 16.67;
      this._lastFrame = now;
      this._draw(delta, deltaMs, now);
      this._frameId = requestAnimationFrame(tick);
    };

    this._frameId = requestAnimationFrame(tick);
  }

  private _stopAnimation(): void {
    cancelAnimationFrame(this._frameId);
    this._animating = false;
  }

  private _resizeCanvas(): void {
    const canvas = this._canvas;
    if (!canvas) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    this._ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  private _draw(delta: number, deltaMs: number, timeMs: number): void {
    const canvas = this._canvas;
    const ctx = this._ctx;
    if (!canvas || !ctx || !this.hass || !this._config) {
      return;
    }

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (width <= 0 || height <= 0) {
      return;
    }

    this._syncParticles(timeMs, false);

    const reducedMotion = prefersReducedMotion();
    updateParticles(
      this._particles,
      this.hass,
      this._config,
      width,
      height,
      delta,
      timeMs,
      reducedMotion
    );
    updatePulses(this._pulses, deltaMs);
    this._refreshInfoSlots(width, height, timeMs);
    drawReactor(
      ctx,
      this._particles,
      this._pulses,
      width,
      height,
      timeMs,
      this._buildConnections()
    );
  }

  protected render() {
    if (!this._config || !this.hass) {
      return nothing;
    }

    const title = this._config.name || "Reactor Core";
    const showInfo = this._showInfo();

    return html`
      <ha-card aria-label=${title}>
        <div class="stage">
          <canvas aria-hidden="true"></canvas>
          <div
            class="overlay"
            role="button"
            tabindex="0"
            @click=${this._actions.bind().click}
            @dblclick=${this._actions.bind().dblclick}
            @keydown=${this._actions.bind().keydown}
            @pointerdown=${(event: PointerEvent) => {
              this._trackPointer(event);
              this._actions.bind().pointerdown(event);
            }}
            @pointermove=${this._trackPointer}
            @pointerup=${this._actions.bind().pointerup}
            @pointerleave=${this._actions.bind().pointerleave}
            @pointercancel=${this._actions.bind().pointercancel}
          >
            ${showInfo
              ? html`
                  <div class="info-bar">
                    ${repeat(
                      this._slotIds,
                      (entityId, index) => entityId || `empty-${index}`,
                      (entityId, index) => {
                        const stateObj = entityId
                          ? this.hass!.states[entityId]
                          : undefined;

                        return html`
                          <div
                            class="info-slot"
                            data-slot=${index}
                            @click=${(event: Event) => event.stopPropagation()}
                          >
                            ${stateObj
                              ? html`
                                  <ha-state-icon
                                    .hass=${this.hass}
                                    .stateObj=${stateObj}
                                  ></ha-state-icon>
                                  <ha-tile-info
                                    .primary=${stateObj.attributes
                                      .friendly_name ?? entityId}
                                    .secondary=${this._slotSecondary(entityId)}
                                  ></ha-tile-info>
                                `
                              : html`<span class="info-empty">—</span>`}
                          </div>
                        `;
                      }
                    )}
                  </div>
                `
              : nothing}
          </div>
        </div>
      </ha-card>
    `;
  }

  static styles = [
    responsiveTypeStyles,
    responsiveTileInfoStyles,
    responsiveStateIconStyles,
    css`
      :host {
        display: block;
        height: 100%;
      }

      ha-card {
        height: 100%;
        overflow: hidden;
        background: var(--card-background-color);
      }

      .stage {
        position: relative;
        width: 100%;
        height: 100%;
        min-height: 160px;
        overflow: hidden;
      }

      canvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: block;
        pointer-events: none;
      }

      .overlay {
        position: absolute;
        inset: 0;
        z-index: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 8px 6px;
        box-sizing: border-box;
        cursor: pointer;
      }

      .info-bar {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 6px;
        width: 100%;
      }

      .info-slot {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2px;
        min-width: 0;
        min-height: 52px;
        padding: 6px 4px;
        text-align: center;
        contain: layout style;
      }

      .info-slot ha-state-icon {
        --mdc-icon-size: 18px;
        opacity: 0.92;
        transition: none;
      }

      .info-slot ha-tile-info {
        width: 100%;
        --ha-tile-info-primary-font-size: var(--nv-label-font-size, 0.72rem);
        --ha-tile-info-secondary-font-size: var(--nv-subtitle-font-size, 0.66rem);
        min-height: 2.2em;
      }

      .info-empty {
        font-size: var(--nv-subtitle-font-size, 0.78rem);
        color: var(--secondary-text-color);
        opacity: 0.55;
      }
    `,
  ];
}

function discoverIds(
  hass: HomeAssistant,
  config: ReactorCoreCardConfig
): string[] {
  const mode = config.mode ?? DEFAULT_MODE;
  if (mode === "manual" && config.entities?.length) {
    return config.entities.filter((id) => Boolean(hass.states[id]));
  }

  const domains = config.domains?.length ? config.domains : [...REACTOR_ENTITY_DOMAINS];
  const max = config.max_particles ?? DEFAULT_MAX_PARTICLES;

  return Object.keys(hass.states)
    .filter((id) => domains.includes(id.split(".", 1)[0]))
    .sort((a, b) => a.localeCompare(b))
    .slice(0, max);
}

declare global {
  interface HTMLElementTagNameMap {
    [REACTOR_CORE_CARD_NAME]: NvisionReactorCoreCard;
  }
}
