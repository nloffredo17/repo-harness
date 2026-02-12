#!/usr/bin/env node

import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { createRequire } from "module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const cliPath = join(dirname(require.resolve("repo-harness/package.json")), "dist", "index.js");

const args = process.argv.slice(2);
const result = spawnSync(process.execPath, [cliPath, "init", ...args], {
  stdio: "inherit",
  shell: true,
});

process.exitCode = result.status ?? 1;
