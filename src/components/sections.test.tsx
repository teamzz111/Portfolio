import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import en from "../../messages/en.json";
import es from "../../messages/es.json";
import { experience, projects } from "@/lib/content";
import About from "./About";
import Experience from "./Experience";
import SelectedWork from "./SelectedWork";

function withIntl(locale: "en" | "es", ui: React.ReactElement) {
  return render(
    <NextIntlClientProvider locale={locale} messages={locale === "en" ? en : es}>
      {ui}
    </NextIntlClientProvider>,
  );
}

describe("content data", () => {
  it("has 7 experience rows matching the message catalog", () => {
    expect(experience).toHaveLength(7);
    for (const row of experience) {
      expect(Object.keys(en.exp)).toContain(row.id);
    }
  });

  it("has 4 projects matching the message catalog", () => {
    expect(projects).toHaveLength(4);
    for (const project of projects) {
      expect(Object.keys(en.work)).toContain(project.id);
    }
  });
});

describe("About", () => {
  it("renders the stats ledger and statement in English", () => {
    withIntl("en", <About />);
    expect(screen.getByText("07+")).toBeInTheDocument();
    expect(screen.getByText("200+")).toBeInTheDocument();
    expect(screen.getByText("$1M")).toBeInTheDocument();
    expect(screen.getByText("(02) — About")).toBeInTheDocument();
    expect(screen.getByText(en.about.lead)).toBeInTheDocument();
    expect(screen.getByText(/think in systems\./)).toBeInTheDocument();
  });

  it("renders localized statement in Spanish", () => {
    withIntl("es", <About />);
    expect(screen.getByText(es.about.lead)).toBeInTheDocument();
  });
});

describe("Experience", () => {
  it("renders all 7 roles and companies in English", () => {
    withIntl("en", <Experience />);
    for (const key of ["r1", "r2", "r3", "r4", "r5", "r6", "r7"] as const) {
      expect(screen.getAllByText(en.exp[key].role).length).toBeGreaterThan(0);
    }
    for (const company of [
      "Lula — Smarter Property",
      "ByYuto LLC",
      "Nowports",
      "Chamba App",
      "Creci Finance",
      "Chamba LLC",
      "Imaginamos",
    ]) {
      expect(screen.getByText(company)).toBeInTheDocument();
    }
  });

  it("renders localized roles in Spanish", () => {
    withIntl("es", <Experience />);
    expect(screen.getByText("Ingeniero Frontend Senior")).toBeInTheDocument();
    expect(screen.getByText("Ingeniero Fundador")).toBeInTheDocument();
  });
});

describe("SelectedWork", () => {
  it("renders the 4 project titles, taglines and stacks", () => {
    withIntl("en", <SelectedWork />);
    for (const title of ["ByYuto", "Nowports", "Chamba", "Shell Colombia"]) {
      expect(
        screen.getByRole("heading", { name: title }),
      ).toBeInTheDocument();
    }
    expect(screen.getByText(en.work.p1.tagline)).toBeInTheDocument();
    expect(screen.getByText(/Claude API · GPT-4/)).toBeInTheDocument();
  });

  it("renders metrics for Nowports and Chamba", () => {
    withIntl("en", <SelectedWork />);
    expect(screen.getByText(en.work.p2.metric)).toBeInTheDocument();
    expect(screen.getByText(en.work.p3.metric)).toBeInTheDocument();
  });
});
