# Reproducible bug artifacts (repro packs)

When a bug or flaky test occurs, you can capture a **repro pack**: a single archive containing Playwright traces, screenshots, videos, the HTML report, and metadata (branch, commit, env).

## How to generate

From the project root:

```bash
harness repro
# or
make repro
# or
node scripts/repro.mjs
```

To run a specific test file:

```bash
harness repro tests/e2e/smoke.spec.ts
```

The script:

1. Runs Playwright with full tracing (`trace: on`, `screenshot: on`, `video: on`) using `playwright.repro.config.ts`.
2. Packs `test-results/`, `playwright-report/`, and `repro.json` (branch, commit, timestamp) into `repro-<timestamp>.tar.gz`.
3. Prints the path to the archive.

## Sharing

Attach the `.tar.gz` file to an issue or PR so others can:

- Extract and open the Playwright HTML report.
- Inspect traces and screenshots for the failing run.
- See exact commit and branch from `repro.json`.

## Requirements

- `tar` must be available (standard on macOS and Linux). On Windows, the script may prompt you to zip the listed directories manually.
