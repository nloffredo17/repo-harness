import { describe, it, expect } from "vitest";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, existsSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import { resolveTemplatePath } from "./index";

describe("resolveTemplatePath", () => {
  it("prefers npm layout (../template) when it exists", () => {
    const root = mkdtempSync(join(tmpdir(), "rh-resolve-"));
    const cliDir = join(root, "cli", "dist");
    const npmTemplate = join(root, "cli", "template");
    mkdirSync(cliDir, { recursive: true });
    mkdirSync(npmTemplate, { recursive: true });
    writeFileSync(join(npmTemplate, "package.json"), "{}");

    const result = resolveTemplatePath(cliDir);
    expect(result).toBe(npmTemplate);
    expect(existsSync(result)).toBe(true);

    rmSync(root, { recursive: true });
  });

  it("falls back to monorepo layout (../../template) when npm layout does not exist", () => {
    const root = mkdtempSync(join(tmpdir(), "rh-resolve-"));
    const cliDir = join(root, "packages", "cli", "dist");
    const monorepoTemplate = join(root, "packages", "template");
    mkdirSync(cliDir, { recursive: true });
    mkdirSync(monorepoTemplate, { recursive: true });
    writeFileSync(join(monorepoTemplate, "package.json"), "{}");

    const result = resolveTemplatePath(cliDir);
    expect(result).toBe(monorepoTemplate);
    expect(existsSync(result)).toBe(true);

    rmSync(root, { recursive: true });
  });
});
