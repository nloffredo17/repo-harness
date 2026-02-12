# Repo Harness napkin

- **CHANGELOG**: Root CHANGELOG.md follows Keep a Changelog format. Update on each release.
- **CI audit**: `pnpm audit --audit-level=high` runs after install; fails CI on high/critical vulnerabilities.
- **Harness execute bit**: Template harness has mode 100755 in git. CLI sets `chmodSync(harnessPath, 0o755)` after copy so `./harness dev` works even if extraction strips it. CI verifies `test -x packages/template/harness`.
- **CLI project name validation**: `validateProjectName()` rejects empty, path traversal (`/`, `\`, `..`), and invalid chars (leading `.`/`_`, `<>:"|?*`). Throws for testability; init action catches and exits.
- **eslint-plugin-boundaries**: v5.4.0 is used; v4.3.0 does not exist. Template uses ESLint 8 so that `next lint` and `eslint-config-next` (next/core-web-vitals) work; ESLint 9 with flat config would require a different Next/ESLint setup.
- **Tailwind v4 + PostCSS**: Template uses `@tailwindcss/postcss` (not `tailwindcss` directly); globals.css uses `@import "tailwindcss"`. CLI `program.parse()` runs only when file is main module (`resolve(import.meta.url) === resolve(cwd, argv[1])`) so unit tests can import from index.
- **Template package.json**: Uses placeholder `{{PROJECT_NAME}}`; CLI replaces it on init.
- **CLI**: Built output must have exactly one shebang (tsup banner); source file should not duplicate it or the runner sees "Invalid or unexpected token" on line 2.
- **Repro script**: Uses `tar -czf` (Unix). On Windows the script may prompt to zip manually.
- **CLI template path**: `resolveTemplatePath(__dirname)` tries npm layout (`../template` from dist/) first, then monorepo (`../../template`). Prebuild copies `packages/template` into `packages/cli/template` before publish so the published package includes the template.
