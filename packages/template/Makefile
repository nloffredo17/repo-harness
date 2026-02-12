.PHONY: dev check repro

dev:
	pnpm dev

check:
	pnpm run lint && pnpm run typecheck && pnpm run test && pnpm run test:e2e

repro:
	node scripts/repro.mjs
