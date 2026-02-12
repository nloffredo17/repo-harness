# {{PROJECT_NAME}}

Next.js app bootstrapped with [Repo Harness Starter Kit](https://github.com/nloffredo17/repo-harness): agent-ready dev, standardized checks, layer boundaries, and repro packs.

## Commands

- **`harness dev`** or **`make dev`** — Start dev server
- **`harness check`** or **`make check`** — Lint, typecheck, unit tests, e2e
- **`harness repro`** or **`make repro`** — Capture repro pack (Playwright trace + screenshots)

## Setup

```bash
pnpm install
harness dev
```

## Docs

- [AGENTS.md](./AGENTS.md) — Table of contents for agents and contributors
- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) — Layered domains and parse-at-boundary
- [docs/boundaries.md](./docs/boundaries.md) — Import rules
- [docs/repro-packs.md](./docs/repro-packs.md) — Reproducible bug artifacts
