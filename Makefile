.PHONY: dev check

dev:
	cd packages/template && pnpm dev

check:
	cd packages/template && pnpm run lint && pnpm run typecheck && pnpm run test && pnpm run test:e2e
