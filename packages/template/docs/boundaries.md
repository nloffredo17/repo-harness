# Layer boundaries and import rules

This project enforces a **layered domain architecture**. Each domain under `src/domains/<name>/` is split into layers; imports may only go "forward" in the dependency order.

## Layer order

```
types → config → repo → service → runtime → ui
```

| Layer    | Path pattern            | Allowed to import from        |
|----------|--------------------------|-------------------------------|
| types    | `src/domains/*/types*`   | (none from app)                |
| config   | `src/domains/*/config*`  | types                         |
| repo     | `src/domains/*/repo*`    | types, config                 |
| service  | `src/domains/*/service*`  | types, config, repo           |
| runtime  | `src/domains/*/runtime*`  | types, config, repo, service  |
| ui       | `src/domains/*/ui*`, `src/app*` | types, runtime, shared |

Cross-cutting code (auth, telemetry, etc.) lives in `src/shared/providers/` and is injected via explicit interfaces.

## Enforcement

- **ESLint**: `eslint-plugin-boundaries` is configured in `.eslintrc.json`. Run `pnpm lint` to catch boundary violations.
- **Convention**: UI and API routes must not import from repo or service directly; use the runtime layer.

## Examples

**Allowed:** `src/domains/example/ui/ExampleCard.tsx` imports from `../types` and `../runtime`.

**Disallowed:** A component under `src/app/` importing from `@/domains/example/repo` (must use runtime or a higher layer).
