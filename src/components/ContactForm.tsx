"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { buildMailto } from "@/lib/mailto";

export default function ContactForm({
  navigate = (url: string) => {
    window.location.href = url;
  },
}: Readonly<{ navigate?: (url: string) => void }>) {
  const t = useTranslations("form");
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    navigate(buildMailto(name, email, message));
    setSent(true);
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 10.5,
    letterSpacing: ".16em",
  };

  return (
    <form noValidate onSubmit={handleSubmit} style={{ marginTop: "clamp(72px,10vw,130px)" }}>
      <div
        className="font-mono text-muted uppercase"
        style={{ fontSize: 10.5, letterSpacing: ".2em", marginBottom: "clamp(28px,4vw,44px)" }}
      >
        {t("title")}
      </div>

      <div className="flex flex-wrap" style={{ gap: "clamp(24px,4vw,56px)" }}>
        <label
          className="flex flex-col"
          style={{ flex: "1 1 260px", minWidth: 240, gap: 12 }}
        >
          <span className="font-mono text-faint uppercase" style={labelStyle}>
            {t("name")}
          </span>
          <input
            className="al-field"
            name="name"
            type="text"
            placeholder={t("namePh")}
          />
        </label>
        <label
          className="flex flex-col"
          style={{ flex: "1 1 260px", minWidth: 240, gap: 12 }}
        >
          <span className="font-mono text-faint uppercase" style={labelStyle}>
            {t("email")}
          </span>
          <input
            className="al-field"
            name="email"
            type="email"
            placeholder={t("emailPh")}
          />
        </label>
      </div>

      <label
        className="flex flex-col"
        style={{ marginTop: "clamp(28px,4vw,44px)", gap: 12 }}
      >
        <span className="font-mono text-faint uppercase" style={labelStyle}>
          {t("msg")}
        </span>
        <textarea
          className="al-field"
          name="message"
          rows={3}
          placeholder={t("msgPh")}
          style={{ resize: "vertical" }}
        />
      </label>

      <div
        className="flex flex-wrap items-center"
        style={{ marginTop: "clamp(36px,5vw,56px)", gap: 24 }}
      >
        <button
          type="submit"
          className="font-mono border-accent text-accent hover:bg-accent cursor-pointer border bg-transparent uppercase transition-colors duration-200 hover:text-[#04100f]"
          style={{ fontSize: 12, letterSpacing: ".16em", padding: "16px 34px" }}
        >
          {t("send")}
        </button>
        <span
          role="status"
          className="font-mono text-accent"
          style={{
            fontSize: 11,
            letterSpacing: ".1em",
            opacity: sent ? 1 : 0,
            transition: "opacity .3s ease",
          }}
        >
          {sent ? t("sent") : ""}
        </span>
      </div>
    </form>
  );
}
