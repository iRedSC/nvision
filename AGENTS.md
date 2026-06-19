Welcome to the project.

# Goal

The goal of nvision is to create stunning, simple, elegant home assistant cards for visualizing sensors and controls.

Every card must fully support the visual editor, and be polished. ALL cards should use the default styling variables to keep it as compatible as possible.

# Deployment

Distribution is **HACS only**. Do not commit build output or local dev artifacts.

| Commit | Do not commit |
|--------|----------------|
| `src/`, `hacs.json`, workflows, `package.json`, `package-lock.json` | `dist/`, `dist-gallery/`, `node_modules/`, `refs/`, `.hass_dev/` |

**Release flow** (CI builds and publishes; HACS installs from GitHub Releases):

```bash
git tag v0.1.0
git push origin v0.1.0
```

- `.github/workflows/release.yml` — tag `v*.*.*` → build → attach `dist/nvision.js` to the release
- `.github/workflows/ci.yml` — PR/push to `main` → build + HACS validation

**Homelab install:** HACS → Frontend → Custom repositories → add repo (category **Dashboard**) → Install → add Lovelace resource (`/hacsfiles/nvision/nvision.js`).

**Before first HACS use:** GitHub repo needs a description, topics (`hacs`, `lovelace`, `home-assistant`), and at least one release tag.

# You (The Agent)

1. Put yourself in a lucid mindset (ask youself if what you're doing is the optimal path before starting)
2. Favor less code over more. Code is a burden, it makes everything harder to upkeep. Prefer ripping out chunks of code and replacing it with less.
