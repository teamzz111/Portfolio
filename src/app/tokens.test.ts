import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const css = readFileSync(join(__dirname, "globals.css"), "utf8");

describe("design tokens", () => {
  it.each([
    ["--bg: #060507"],
    ["--bg2: #0a0c0e"],
    ["--bg3: #0e1417"],
    ["--fg: #e9eef0"],
    ["--muted: #727f85"],
    ["--faint: #3a4247"],
    ["--accent: #42e6dd"],
    ["--accent-2: #8ff6ef"],
    ["--ease: cubic-bezier(0.16, 1, 0.3, 1)"],
  ])("defines %s", (token) => {
    expect(css).toContain(token);
  });

  it("defines the three font family variables", () => {
    expect(css).toContain("--font-display: var(--font-clash)");
    expect(css).toContain("--font-serif: var(--font-instrument)");
    expect(css).toContain("--font-mono: var(--font-jetbrains)");
  });

  it("keeps reveal elements visible by default (no-JS safety)", () => {
    expect(css).toContain(".al-rev[data-reveal-armed]");
    expect(css).not.toMatch(/\.al-rev\s*\{[^}]*opacity:\s*0/);
  });
});
