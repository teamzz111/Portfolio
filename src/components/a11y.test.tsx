import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import en from "../../messages/en.json";
import Atmosphere from "./Atmosphere";
import Experience from "./Experience";
import SkipLink from "./SkipLink";

describe("accessibility", () => {
  it("skip link targets the main content", () => {
    render(
      <NextIntlClientProvider locale="en" messages={en}>
        <SkipLink />
      </NextIntlClientProvider>,
    );
    const link = screen.getByRole("link", { name: en.nav.skip });
    expect(link).toHaveAttribute("href", "#main");
    expect(link).toHaveClass("al-skip");
  });

  it("atmosphere layers are hidden from assistive tech", () => {
    const { container } = render(<Atmosphere />);
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });

  it("ghost years are decorative", () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={en}>
        <Experience />
      </NextIntlClientProvider>,
    );
    const ghosts = Array.from(
      container.querySelectorAll('[aria-hidden="true"]'),
    ).filter((el) => el.textContent === "2025" || el.textContent === "↗");
    expect(ghosts.length).toBeGreaterThanOrEqual(2);
  });
});
