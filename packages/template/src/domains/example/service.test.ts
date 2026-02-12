import { describe, it, expect } from "vitest";
import { findExample } from "./service";

describe("example service", () => {
  it("finds default example by id", () => {
    const item = findExample("0");
    expect(item).toEqual({ id: "0", name: "Example" });
  });

  it("returns null for unknown id", () => {
    expect(findExample("unknown")).toBeNull();
  });
});
