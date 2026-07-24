"use client";

import { useTranslations } from "next-intl";
import Reveal from "./Reveal";
import { Kicker } from "./SectionHeader";
import ContactForm from "./ContactForm";
import { site } from "@/lib/content";

function LinkCard({
  label,
  handle,
  url,
}: Readonly<{ label: string; handle: string; url: string }>) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="al-card flex items-baseline justify-between no-underline"
      style={{
        flex: "1 1 260px",
        minWidth: 230,
        gap: 20,
        padding: "clamp(20px,2.4vw,30px) 0",
        borderTop: "1px solid rgba(255,255,255,.12)",
      }}
    >
      <span className="flex flex-col" style={{ gap: 8 }}>
        <span
          className="font-mono text-muted uppercase"
          style={{ fontSize: 10.5, letterSpacing: ".2em" }}
        >
          {label}
        </span>
        <span
          className="font-display text-fg"
          style={{ fontWeight: 300, fontSize: "clamp(1.2rem,2vw,1.7rem)" }}
        >
          {handle}
        </span>
      </span>
      <span aria-hidden className="font-mono text-accent" style={{ fontSize: "1.1rem" }}>
        ↗
      </span>
    </a>
  );
}

export default function Contact() {
  const t = useTranslations("contact");

  return (
    <section
      id="contact"
      className="relative z-10 overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 90% at 78% 8%, rgba(66,230,221,.09) 0%, rgba(66,230,221,0) 46%), var(--bg)",
        padding: "clamp(80px,14vh,180px) var(--gutter) clamp(48px,7vh,80px)",
      }}
    >
      <div className="al-container">
        <div style={{ marginBottom: "clamp(40px,6vw,72px)" }}>
          <Kicker>{t("kicker")}</Kicker>
        </div>

        <Reveal
          as="h2"
          className="font-display text-fg m-0"
          style={{
            maxWidth: "16ch",
            fontWeight: 200,
            fontSize: "clamp(2.6rem,8vw,7rem)",
            lineHeight: 0.96,
            letterSpacing: "-.03em",
            textWrap: "balance",
          }}
        >
          {t("title")}
          <span className="font-serif text-accent italic" style={{ fontWeight: 400 }}>
            {t("titleEm")}
          </span>
        </Reveal>

        <Reveal
          as="p"
          className="font-display"
          style={{
            margin: "clamp(24px,3vw,40px) 0 0",
            maxWidth: "34em",
            fontWeight: 300,
            fontSize: "clamp(1rem,1.4vw,1.35rem)",
            lineHeight: 1.5,
            color: "#9aa3a7",
          }}
        >
          {t("sub")}
        </Reveal>

        <Reveal>
          <a
            href={`mailto:${site.email}`}
            className="font-display text-fg hover:text-accent inline-block no-underline transition-colors duration-200"
            style={{
              margin: "clamp(40px,6vw,72px) 0 clamp(48px,7vw,88px)",
              fontWeight: 300,
              fontSize: "clamp(1.5rem,5vw,3.4rem)",
              letterSpacing: "-.02em",
              borderBottom: "1px solid rgba(255,255,255,.16)",
              paddingBottom: ".12em",
              wordBreak: "break-word",
            }}
          >
            {site.email}
          </a>
        </Reveal>

        <Reveal className="flex flex-wrap" style={{ gap: "clamp(16px,2vw,28px)" }}>
          <LinkCard label="LinkedIn" handle={site.linkedin.label} url={site.linkedin.url} />
          <LinkCard label="GitHub" handle={site.github.label} url={site.github.url} />
        </Reveal>

        <Reveal>
          <ContactForm />
        </Reveal>

        <footer
          className="font-mono text-faint flex flex-wrap items-center justify-between uppercase"
          style={{
            marginTop: "clamp(64px,10vw,140px)",
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,.1)",
            gap: 16,
            fontSize: 10.5,
            letterSpacing: ".16em",
          }}
        >
          <span>{site.copyright}</span>
          <span>{t("footerTag")}</span>
        </footer>
      </div>
    </section>
  );
}
