# Repo Harness Starter Kit

An opinionated Next.js + TypeScript template and CLI that boots new repos with an **agent-ready engineering harness**: one-command local dev (devcontainer + docker-compose), standardized checks (`harness check` / `make check`), CI pipelines (lint/typecheck/unit/e2e), enforced architecture (layer boundaries + parse-at-boundary validation), and reproducible bug artifacts (repro packs with Playwright trace + screenshots).

Inspired by [OpenAI Harness Engineering](https://openai.com/index/harness-engineering/).

## Quick start

**Bootstrap a new app (from anywhere, no clone required):**

```bash
npx repo-harness init my-app
# or
npm create repo-harness my-app
```

Then:

```bash
cd my-app
harness dev
```

**Optional:** `--use-npm`, `--use-yarn`, or `--use-bun` to choose package manager (default: pnpm). Use `--no-install` to skip installing dependencies.

**From this repo (development):**

```bash
cd packages/cli && pnpm build
node packages/cli/dist/index.js init my-app
cd my-app
pnpm install   # if you used --no-install
harness dev
```

**Run the template in the monorepo:**

```bash
pnpm install
make dev      # or: cd packages/template && pnpm dev
make check    # lint + typecheck + unit + e2e
```

## Repo structure

- **`packages/template/`** — Next.js 15 app with layered domains, Zod at API boundaries, Vitest + Playwright, ESLint boundaries, Makefile + `harness` script, and repro pack script.
- **`packages/cli/`** — `repo-harness init <name>` copies the template and applies the project name. Publish to npm for remote bootstrap via `npx repo-harness init`.
- **`packages/create-repo-harness/`** — Thin wrapper for `npm create repo-harness`, delegates to `repo-harness init`.
- **`.devcontainer/`** — Dev container config for the monorepo.
- **`docker-compose.yml`** — Run the app in Docker with hot reload.

## What you get from the template

| Feature | Description |
|--------|-------------|
| **One-command dev** | `harness dev` or `make dev`; optional devcontainer and docker-compose. |
| **Standardized checks** | `harness check` runs lint → typecheck → unit → e2e in order. |
| **CI** | GitHub Actions workflow runs the same checks and uploads Playwright artifacts on failure. |
| **Layer boundaries** | `eslint-plugin-boundaries` enforces types → config → repo → service → runtime → ui. |
| **Parse at boundary** | Documented pattern + example API route using Zod. |
| **Repro packs** | `harness repro` produces `repro-<timestamp>.tar.gz` with trace, screenshots, and metadata. |
| **Agent docs** | Short `AGENTS.md` plus `docs/` (ARCHITECTURE, boundaries, repro-packs). |

## Requirements

- Node 20+, pnpm 9+

## License

MIT
