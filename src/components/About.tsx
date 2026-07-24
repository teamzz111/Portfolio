"use client";

import { useTranslations } from "next-intl";
import Reveal from "./Reveal";
import { Kicker } from "./SectionHeader";
import { aboutStats } from "@/lib/content";

export default function About() {
  const t = useTranslations("about");

  return (
    <section
      id="about"
      className="relative z-10"
      style={{
        background:
          "linear-gradient(180deg, rgba(6,5,7,0) 0%, rgba(6,5,7,.72) 12%, var(--bg) 26%, var(--bg) 100%)",
        padding: "clamp(130px,22vh,240px) var(--gutter) clamp(120px,18vh,200px)",
      }}
    >
      <div
        className="al-container flex flex-wrap items-start"
        style={{ gap: "clamp(44px,6vw,110px)" }}
      >
        {/* left rail: kicker + stats ledger */}
        <div
          className="flex flex-col"
          style={{ flex: "1 1 240px", minWidth: 220, gap: "clamp(38px,5vw,64px)" }}
        >
          <Kicker>{t("kicker")}</Kicker>

          <div className="flex flex-col">
            {aboutStats.map((stat, index) => (
              <Reveal
                key={stat.labelKey}
                style={{
                  padding: "18px 0",
                  borderTop: "1px solid var(--hairline)",
                  borderBottom:
                    index === aboutStats.length - 1
                      ? "1px solid var(--hairline)"
                      : undefined,
                }}
              >
                <div
                  className={`font-display ${stat.accent ? "text-accent" : "text-fg"}`}
                  style={{
                    fontWeight: 300,
                    fontSize: "clamp(1.9rem,3vw,2.7rem)",
                    lineHeight: 1,
                    letterSpacing: "-.02em",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="font-mono text-muted uppercase"
                  style={{ marginTop: 8, fontSize: 10.5, letterSpacing: ".14em" }}
                >
                  {t(stat.labelKey)}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal
            className="font-mono text-faint uppercase"
            style={{ fontSize: 11, letterSpacing: ".16em" }}
          >
            {t("role")}
          </Reveal>
        </div>

        {/* main statement */}
        <div style={{ flex: "2.5 1 460px", minWidth: 300 }}>
          <Reveal
            as="p"
            className="font-display text-fg m-0"
            style={{
              fontWeight: 300,
              fontSize: "clamp(1.9rem,4.4vw,4rem)",
              lineHeight: 1.06,
              letterSpacing: "-.02em",
              textWrap: "balance",
            }}
          >
            {t("lead")}
          </Reveal>
          <Reveal
            as="p"
            className="font-display"
            style={{
              margin: "clamp(28px,4vw,52px) 0 0",
              maxWidth: "30em",
              fontWeight: 300,
              fontSize: "clamp(1.05rem,1.7vw,1.6rem)",
              lineHeight: 1.42,
              color: "var(--dim-2)",
            }}
          >
            {t("body")}
            <span
              className="font-serif text-accent italic"
              style={{ fontSize: "1.18em", lineHeight: 1 }}
            >
              {t("bodyEm")}
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
