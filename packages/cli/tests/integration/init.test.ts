import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { mkdtempSync, readFileSync, existsSync, rmSync } from "fs";
import { join, dirname } from "path";
import { tmpdir } from "os";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cliRoot = join(__dirname, "..", "..");
const cliPath = join(cliRoot, "dist", "index.js");
const projectName = "test-app-integration";

describe("init integration", () => {
  let tmpRoot: string;

  beforeAll(() => {
    if (!existsSync(cliPath)) {
      throw new Error(
        `CLI not built at ${cliPath}. Run "pnpm build" in packages/cli first.`,
      );
    }
    tmpRoot = mkdtempSync(join(tmpdir(), "repo-harness-init-"));
  });

  afterAll(() => {
    if (tmpRoot && existsSync(tmpRoot)) {
      rmSync(tmpRoot, { recursive: true, force: true });
    }
  });

  it("creates project and harness check passes (lint + typecheck + unit + e2e)", () => {
    execSync(`node "${cliPath}" init ${projectName}`, {
      cwd: tmpRoot,
      stdio: "pipe",
      shell: true,
    });

    const projectDir = join(tmpRoot, projectName);
    expect(existsSync(projectDir)).toBe(true);
    expect(existsSync(join(projectDir, "package.json"))).toBe(true);
    expect(existsSync(join(projectDir, "src"))).toBe(true);
    expect(existsSync(join(projectDir, "harness"))).toBe(true);

    const pkg = JSON.parse(readFileSync(join(projectDir, "package.json"), "utf-8"));
    expect(pkg.name).toBe(projectName);

    execSync("pnpm exec playwright install --with-deps chromium", {
      cwd: projectDir,
      stdio: "pipe",
      shell: true,
    });

    execSync("./harness check", {
      cwd: projectDir,
      stdio: "inherit",
      shell: true,
    });
  });
});
