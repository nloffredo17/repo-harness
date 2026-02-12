import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdtempSync, rmSync, existsSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import { validateProjectName } from "./index";

describe("validateProjectName", () => {
  let originalCwd: string;

  beforeEach(() => {
    originalCwd = process.cwd();
  });

  afterEach(() => {
    process.chdir(originalCwd);
  });

  it("accepts valid project names", () => {
    const tmp = mkdtempSync(join(tmpdir(), "rh-validate-"));
    process.chdir(tmp);
    expect(() => validateProjectName("my-app")).not.toThrow();
    expect(() => validateProjectName("my_app")).not.toThrow();
    expect(() => validateProjectName("myApp123")).not.toThrow();
    rmSync(tmp, { recursive: true });
  });

  it("rejects empty or whitespace-only names", () => {
    expect(() => validateProjectName("")).toThrow("cannot be empty");
    expect(() => validateProjectName("   ")).toThrow("cannot be empty");
  });

  it("rejects path separators and traversal", () => {
    expect(() => validateProjectName("foo/bar")).toThrow("path separators");
    expect(() => validateProjectName("foo\\bar")).toThrow("path separators");
    expect(() => validateProjectName("..")).toThrow("path separators");
    expect(() => validateProjectName("../evil")).toThrow("path separators");
  });

  it("rejects invalid characters", () => {
    expect(() => validateProjectName(".hidden")).toThrow("valid directory");
    expect(() => validateProjectName("_private")).toThrow("valid directory");
    expect(() => validateProjectName("foo:bar")).toThrow("valid directory");
    expect(() => validateProjectName("foo<bar")).toThrow("valid directory");
  });
});
