# nvision

Home Assistant dashboard cards — neutral, theme-aware, visual-editor-first.

## Setup

```bash
npm install
npm run fetch-refs   # clones HA frontend (sparse) + Mushroom into refs/ (gitignored)
npm run build
```

## Local development

Terminal 1 — build and serve the bundle:

```bash
npm start
```

Terminal 2 — Home Assistant with dev config (requires Docker):

```bash
docker run --rm -p8123:8123 -v ./.hass_dev:/config homeassistant/home-assistant:stable
```

Add the card resource in HA if not already loaded via `extra_module_url`:

```
http://localhost:4000/nvision.js
```

## References (local only, not committed)

Run `npm run fetch-refs` to populate `refs/`:

| Path | Contents |
|------|----------|
| `refs/home-assistant-frontend/` | Sparse checkout: Lovelace cards, common helpers, editors, types |
| `refs/lovelace-mushroom/` | Full Mushroom repo — card architecture, build tooling, editor patterns |

Use these when implementing new cards. Copy patterns from `src/cards/blank/` rather than importing reference code into the build.

## Adding a card

1. Copy `src/cards/blank/` to `src/cards/your-card/`
2. Rename constants, config type, and custom element tag
3. Register the import in `src/nvision.ts`
4. Implement render using HA built-in elements (`ha-card`, `ha-tile-info`, `ha-state-icon`, …) and CSS variables (`--primary-text-color`, `--ha-card-border-radius`, `--state-inactive-color`, …)

## Blank card

Type: `custom:nvision-blank-card`

Minimal neutral card with entity picker and optional name in the visual editor. Uses HA-native web components and theme variables only — no custom color palette or Mushroom styling.
