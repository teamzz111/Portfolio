import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import en from "../../messages/en.json";
import es from "../../messages/es.json";
import Hero from "./Hero";

function renderHero(locale: "en" | "es") {
  const messages = locale === "en" ? en : es;
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Hero />
    </NextIntlClientProvider>,
  );
}

describe("Hero", () => {
  it("renders the masked name headline", () => {
    renderHero("en");
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Andrés");
    expect(heading).toHaveTextContent("Largo.");
  });

  it("renders eyebrow, role, index and cue in English", () => {
    renderHero("en");
    expect(screen.getByText("FullStack developer in search of")).toBeInTheDocument();
    expect(screen.getByText("beyond")).toBeInTheDocument();
    expect(
      screen.getByText("Sr. Software Engineer · FullStack · AI Workflows · Cloud & Mobile"),
    ).toBeInTheDocument();
    expect(screen.getByText("(01) — SYSTEM")).toBeInTheDocument();
    expect(screen.getByText("Scroll to enter the system")).toBeInTheDocument();
  });

  it("renders localized copy in Spanish", () => {
    renderHero("es");
    expect(screen.getByText("más allá")).toBeInTheDocument();
    expect(screen.getByText("(01) — SISTEMA")).toBeInTheDocument();
    expect(screen.getByText("Desplázate para entrar al sistema")).toBeInTheDocument();
  });

  it("renders the location block", () => {
    renderHero("en");
    expect(screen.getByText("Bogotá D.C., Colombia")).toBeInTheDocument();
    expect(screen.getByText("04°42′N · 74°04′W")).toBeInTheDocument();
  });
});
