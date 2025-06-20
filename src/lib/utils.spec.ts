import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn utility", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    expect(cn("foo", { bar: true, baz: false })).toBe("foo bar");
  });

  it("merges tailwind classes", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });
});
