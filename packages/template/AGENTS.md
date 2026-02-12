# Agent guide (table of contents)

This repo is set up for agent-friendly development: one-command dev, standardized checks, enforced architecture, and reproducible bug artifacts.

## Quick start

- **Run the app:** `harness dev` or `make dev` or `pnpm dev`
- **Run all checks:** `harness check` or `make check` (lint → typecheck → unit tests → e2e)
- **Capture a repro pack:** `harness repro` or `make repro` (Playwright trace + screenshots → `repro-<timestamp>.tar.gz`)

## Where to look

| Topic | Location |
|-------|----------|
| Architecture (layers, boundaries, parse-at-boundary) | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| Import rules and layer enforcement | [docs/boundaries.md](docs/boundaries.md) |
| Reproducible bug artifacts | [docs/repro-packs.md](docs/repro-packs.md) |

## Structure

- **`src/domains/<name>/`** — Domain slices: `types` → `config` → `repo` → `service` → `runtime` → `ui`. Do not skip layers; UI and API use `runtime` only.
- **`src/shared/providers/`** — Cross-cutting concerns (auth, telemetry).
- **`src/app/`** — Next.js App Router routes and layout. API routes must validate all inputs (e.g. with Zod) at the boundary.
- **`tests/e2e/`** — Playwright E2E tests.

## Checks

- **Lint:** ESLint + `eslint-plugin-boundaries` (layer rules). Run `pnpm lint`.
- **Typecheck:** `pnpm typecheck` (strict TypeScript).
- **Unit:** Vitest in `src/**/*.test.ts`. Run `pnpm test`.
- **E2E:** Playwright in `tests/e2e/`. Run `pnpm test:e2e`. Use `harness repro` to capture failures.

## Conventions

1. **Parse, don’t validate:** All external input (API body, query, forms) must be parsed/validated at the boundary (e.g. Zod) and rejected with clear errors.
2. **Respect layer boundaries:** See [docs/boundaries.md](docs/boundaries.md). Violations fail lint.
3. **Repro packs:** For bugs or flaky tests, run `harness repro` and attach the generated `.tar.gz` to issues/PRs.
