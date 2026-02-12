#!/usr/bin/env node

import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { createRequire } from "module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const cliPath = join(dirname(require.resolve("repo-harness/package.json")), "dist", "index.js");

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("Usage: npm create repo-harness <project-name>");
  console.error("Example: npm create repo-harness my-app");
  process.exit(1);
}
const result = spawnSync(process.execPath, [cliPath, "init", ...args], {
  stdio: "inherit",
});

process.exitCode = result.status ?? 1;
