#!/usr/bin/env node
/**
 * Reproducible bug artifact ("repro pack").
 * Runs Playwright with full trace/screenshot/video, then packs artifacts into repro-<timestamp>.tar.gz.
 */

import { execSync, spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function getGitMeta() {
  try {
    const branch = execSync("git rev-parse --abbrev-ref HEAD", { encoding: "utf-8" }).trim();
    const commit = execSync("git rev-parse HEAD", { encoding: "utf-8" }).trim();
    return { branch, commit };
  } catch {
    return { branch: null, commit: null };
  }
}

function runPlaywright(args = []) {
  const result = spawnSync(
    "pnpm",
    ["exec", "playwright", "test", "--config=playwright.repro.config.ts", ...args],
    { cwd: root, stdio: "inherit", shell: true }
  );
  return result.status;
}

function packArtifacts() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const outName = `repro-${timestamp}.tar.gz`;
  const outPath = path.join(root, outName);

  const meta = getGitMeta();
  const reproJson = {
    timestamp: new Date().toISOString(),
    branch: meta.branch,
    commit: meta.commit,
    node: process.version,
    cwd: process.cwd(),
  };
  const reproPath = path.join(root, "repro.json");
  fs.writeFileSync(reproPath, JSON.stringify(reproJson, null, 2));

  const dirs = ["test-results", "playwright-report"];
  const toPack = [...dirs.filter((d) => fs.existsSync(path.join(root, d))), "repro.json"];

  if (toPack.length === 0) {
    console.error("No artifacts to pack (test-results/ or playwright-report/ missing).");
    process.exit(1);
  }

  try {
    execSync(`tar -czf "${outPath}" ${toPack.map((f) => `"${f}"`).join(" ")}`, {
      cwd: root,
      stdio: "inherit",
    });
  } catch (e) {
    console.error("Failed to create archive. On Windows, zip the following manually:", toPack.join(", "));
    process.exit(1);
  }

  try {
    fs.unlinkSync(reproPath);
  } catch (_) {
    // best-effort cleanup; file may not exist if writeFileSync failed earlier
  }
  console.log("\nRepro pack written to:", outPath);
  return outPath;
}

const args = process.argv.slice(2);
const exitCode = runPlaywright(args);
packArtifacts();
process.exit(exitCode);
