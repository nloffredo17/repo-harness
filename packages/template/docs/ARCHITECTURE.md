# Architecture

## Layered domain model

The app is organized by **domains**. Each domain is a vertical slice under `src/domains/<name>/` with the following layers:

1. **types** — Shared types and interfaces. No dependencies on other app layers.
2. **config** — Configuration and defaults. May use types.
3. **repo** — Data access. May use types and config.
4. **service** — Business logic. May use types, config, repo.
5. **runtime** — Facade exposed to UI and API. May use all of the above.
6. **ui** — React components. May use types, runtime, and shared.

Cross-cutting concerns (auth, telemetry, feature flags) live in `src/shared/providers/` and are consumed through explicit interfaces.

## Dependency direction

Code in a layer may only import from layers that appear **earlier** in the list above (or from `shared` where allowed). This is enforced by ESLint via `eslint-plugin-boundaries`. See [boundaries.md](./boundaries.md) for details.

## API and forms: parse at the boundary

All external inputs (API request bodies, search params, form submissions) must be **parsed and validated** at the boundary. Use Zod (or similar) and fail fast with clear errors.

Example:

```ts
// app/api/example/route.ts
import { z } from "zod";

const BodySchema = z.object({ id: z.string().min(1) });

export async function POST(request: Request) {
  const parsed = BodySchema.safeParse(await request.json());
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { id } = parsed.data;
  // ...
}
```

Do not trust `request.json()` or URL params without validation.
