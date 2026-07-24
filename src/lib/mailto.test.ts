import { describe, expect, it } from "vitest";
import { buildMailto } from "./mailto";

describe("buildMailto", () => {
  it("targets the portfolio address", () => {
    expect(buildMailto("", "", "")).toMatch(/^mailto:contacto@andreslargo\.com\?/);
  });

  it("appends the sender name to the subject when present", () => {
    const url = buildMailto("Jane Doe", "", "");
    expect(url).toContain(`subject=${encodeURIComponent("Portfolio contact — Jane Doe")}`);
    expect(buildMailto("", "", "")).toContain(
      `subject=${encodeURIComponent("Portfolio contact")}`,
    );
  });

  it("adds a signature line only when an email is provided", () => {
    const withEmail = buildMailto("Jane", "jane@x.com", "Hello there");
    expect(withEmail).toContain(
      `body=${encodeURIComponent("Hello there\n\n— Jane · jane@x.com")}`,
    );
    const withoutEmail = buildMailto("Jane", "", "Hello there");
    const body = withoutEmail.split("body=")[1];
    expect(body).toBe(encodeURIComponent("Hello there"));
  });

  it("URL-encodes unsafe characters", () => {
    const url = buildMailto("A&B", "a@b.co", "50% + más");
    expect(url).not.toMatch(/body=[^&]*[ %&]50%(?!25)/);
    expect(url).toContain(encodeURIComponent("50% + más"));
  });
});
