import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import en from "../../messages/en.json";
import es from "../../messages/es.json";
import Nav from "./Nav";

function renderNav(locale: "en" | "es") {
  const messages = locale === "en" ? en : es;
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Nav />
    </NextIntlClientProvider>,
  );
}

describe("Nav", () => {
  it("renders monogram, year and availability status", () => {
    renderNav("en");
    expect(screen.getByText("A—L")).toBeInTheDocument();
    expect(screen.getByText("©2026")).toBeInTheDocument();
    expect(screen.getByText("Available for work")).toBeInTheDocument();
  });

  it("renders section links in English", () => {
    renderNav("en");
    for (const label of ["About", "Work", "Skills", "Contact"]) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }
  });

  it("renders section links in Spanish", () => {
    renderNav("es");
    for (const label of ["Sobre", "Proyectos", "Stack", "Contacto"]) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }
  });

  it("locale toggle links to both language roots and marks the active one", () => {
    renderNav("en");
    const enLink = screen.getByRole("link", { name: "EN" });
    const esLink = screen.getByRole("link", { name: "ES" });
    expect(enLink).toHaveAttribute("href", "/en/");
    expect(esLink).toHaveAttribute("href", "/es/");
    expect(enLink).toHaveAttribute("aria-current", "true");
    expect(esLink).not.toHaveAttribute("aria-current");
  });
});
