# repo-harness

Bootstrap agent-ready Next.js repos with an engineering harness: devcontainer, standardized checks, CI, layer boundaries, and repro packs.

## Usage

```bash
npx repo-harness init my-app
```

Or with options:

```bash
npx repo-harness init my-app --use-npm     # use npm instead of pnpm
npx repo-harness init my-app --use-yarn    # use yarn
npx repo-harness init my-app --use-bun     # use bun
npx repo-harness init my-app --no-install  # skip dependency install
npx repo-harness init my-app --no-devcontainer  # skip .devcontainer (for monorepos)
```

Then:

```bash
cd my-app
harness dev    # start dev server
harness check  # lint + typecheck + unit + e2e
harness repro  # capture Playwright trace + screenshots for bug reports
```

## Development

```bash
pnpm build
node dist/index.js init my-app
```
