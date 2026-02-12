import { describe, it, expect } from "vitest";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import { replacePlaceholders } from "./index";

describe("replacePlaceholders", () => {
  it("replaces {{PROJECT_NAME}} in supported file types", () => {
    const root = mkdtempSync(join(tmpdir(), "rh-replace-"));
    writeFileSync(join(root, "package.json"), '{"name":"{{PROJECT_NAME}}"}');
    writeFileSync(join(root, "README.md"), "# {{PROJECT_NAME}}\n\nWelcome.");
    mkdirSync(join(root, "src"), { recursive: true });
    writeFileSync(join(root, "src", "config.ts"), "const name = '{{PROJECT_NAME}}';");

    replacePlaceholders(root, "my-app");

    expect(readFileSync(join(root, "package.json"), "utf-8")).toBe('{"name":"my-app"}');
    expect(readFileSync(join(root, "README.md"), "utf-8")).toBe("# my-app\n\nWelcome.");
    expect(readFileSync(join(root, "src", "config.ts"), "utf-8")).toBe("const name = 'my-app';");

    rmSync(root, { recursive: true });
  });

  it("replaces all occurrences in a file", () => {
    const root = mkdtempSync(join(tmpdir(), "rh-replace-"));
    writeFileSync(join(root, "file.json"), '{"name":"{{PROJECT_NAME}}","id":"{{PROJECT_NAME}}-v1"}');

    replacePlaceholders(root, "foo");

    expect(readFileSync(join(root, "file.json"), "utf-8")).toBe('{"name":"foo","id":"foo-v1"}');

    rmSync(root, { recursive: true });
  });

  it("skips node_modules and .git", () => {
    const root = mkdtempSync(join(tmpdir(), "rh-replace-"));
    writeFileSync(join(root, "a.json"), '{"name":"{{PROJECT_NAME}}"}');
    mkdirSync(join(root, "node_modules", "pkg"), { recursive: true });
    writeFileSync(join(root, "node_modules", "pkg", "package.json"), '{"name":"{{PROJECT_NAME}}"}');

    replacePlaceholders(root, "my-app");

    expect(readFileSync(join(root, "a.json"), "utf-8")).toBe('{"name":"my-app"}');
    expect(readFileSync(join(root, "node_modules", "pkg", "package.json"), "utf-8")).toBe(
      '{"name":"{{PROJECT_NAME}}"}',
    );

    rmSync(root, { recursive: true });
  });
});
