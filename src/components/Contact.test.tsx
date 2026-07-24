import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import en from "../../messages/en.json";
import es from "../../messages/es.json";
import Contact from "./Contact";
import ContactForm from "./ContactForm";

function withIntl(locale: "en" | "es", ui: React.ReactElement) {
  return render(
    <NextIntlClientProvider locale={locale} messages={locale === "en" ? en : es}>
      {ui}
    </NextIntlClientProvider>,
  );
}

describe("Contact", () => {
  it("renders headline, email link, and social cards", () => {
    withIntl("en", <Contact />);
    expect(screen.getByText(en.contact.title)).toBeInTheDocument();
    const email = screen.getByRole("link", { name: "contacto@andreslargo.com" });
    expect(email).toHaveAttribute("href", "mailto:contacto@andreslargo.com");
    expect(screen.getByRole("link", { name: /\/in\/andreslargo/ })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/andreslargo/",
    );
    expect(screen.getByRole("link", { name: /@teamzz111/ })).toHaveAttribute(
      "href",
      "https://github.com/teamzz111",
    );
    expect(screen.getByText("© 2026 Andrés Largo · Bogotá D.C.")).toBeInTheDocument();
    expect(screen.getByText(en.contact.footerTag)).toBeInTheDocument();
  });

  it("renders Spanish headline and footer", () => {
    withIntl("es", <Contact />);
    expect(screen.getByText(es.contact.title)).toBeInTheDocument();
    expect(screen.getByText(es.contact.footerTag)).toBeInTheDocument();
  });
});

describe("ContactForm", () => {
  it("composes a mailto URL from the fields and shows confirmation", () => {
    const navigate = vi.fn();
    withIntl("en", <ContactForm navigate={navigate} />);

    fireEvent.change(screen.getByPlaceholderText(en.form.namePh), {
      target: { value: "Jane" },
    });
    fireEvent.change(screen.getByPlaceholderText(en.form.emailPh), {
      target: { value: "jane@x.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(en.form.msgPh), {
      target: { value: "Hello" },
    });
    fireEvent.click(screen.getByRole("button", { name: en.form.send }));

    expect(navigate).toHaveBeenCalledTimes(1);
    const url = navigate.mock.calls[0][0] as string;
    expect(url).toContain("mailto:contacto@andreslargo.com");
    expect(url).toContain(encodeURIComponent("Portfolio contact — Jane"));
    expect(url).toContain(encodeURIComponent("Hello\n\n— Jane · jane@x.com"));
    expect(screen.getByRole("status")).toHaveTextContent(en.form.sent);
  });

  it("uses localized labels in Spanish", () => {
    withIntl("es", <ContactForm navigate={vi.fn()} />);
    expect(screen.getByText("O déjame un mensaje")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Enviar mensaje" }),
    ).toBeInTheDocument();
  });
});
