"use client";

import { useTranslations } from "next-intl";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { experience } from "@/lib/content";

export default function Experience() {
  const t = useTranslations("exp");

  return (
    <section
      id="experience"
      className="bg-bg relative z-10"
      style={{ padding: "clamp(60px,10vh,140px) var(--gutter) clamp(120px,18vh,200px)" }}
    >
      <div className="al-container">
        <SectionHeader
          kicker={t("kicker")}
          title={t("title")}
          titleEm={t("titleEm")}
          marginBottom="clamp(48px,7vw,96px)"
        />

        <div>
          {experience.map((row, index) => (
            <Reveal
              as="article"
              key={row.id}
              className="al-exp relative flex flex-wrap items-baseline overflow-hidden"
              style={{
                gap: "clamp(18px,3vw,54px)",
                padding: "clamp(28px,3.6vw,46px) clamp(6px,1.4vw,22px)",
                borderBottom:
                  index === experience.length - 1
                    ? "1px solid rgba(255,255,255,.09)"
                    : undefined,
              }}
            >
              <span
                aria-hidden
                className="font-display pointer-events-none absolute right-0"
                style={{
                  top: "-.24em",
                  fontWeight: 500,
                  fontSize: "clamp(4rem,10vw,10.5rem)",
                  lineHeight: 1,
                  letterSpacing: "-.03em",
                  color: row.cyanGhost
                    ? "rgba(66,230,221,.05)"
                    : "rgba(233,238,240,.035)",
                }}
              >
                {row.ghostYear}
              </span>

              <span
                className="font-mono text-faint"
                style={{ flex: "0 0 auto", width: 38, fontSize: ".82rem", letterSpacing: ".1em" }}
              >
                {row.index}
              </span>

              <div className="relative z-[1]" style={{ flex: "1.5 1 300px", minWidth: 270 }}>
                <h3
                  className="font-display text-fg m-0"
                  style={{
                    fontWeight: 400,
                    fontSize: "clamp(1.5rem,3vw,2.35rem)",
                    lineHeight: 1.02,
                    letterSpacing: "-.01em",
                  }}
                >
                  {t(`${row.id}.role`)}
                </h3>
                <div className="flex flex-wrap items-baseline" style={{ marginTop: 12, gap: 14 }}>
                  <span
                    className="font-serif text-accent italic"
                    style={{ fontSize: "clamp(1.15rem,1.7vw,1.55rem)" }}
                  >
                    {row.company}
                  </span>
                  <span
                    className="font-mono text-muted uppercase"
                    style={{ fontSize: 10.5, letterSpacing: ".14em" }}
                  >
                    {row.meta ?? t(`${row.id}.meta`)}
                  </span>
                </div>
              </div>

              <p
                className="font-display relative z-[1] m-0"
                style={{
                  flex: "1 1 240px",
                  minWidth: 240,
                  maxWidth: "40em",
                  fontWeight: 300,
                  fontSize: "clamp(.95rem,1.15vw,1.12rem)",
                  lineHeight: 1.5,
                  color: "var(--dim-1)",
                }}
              >
                {t(`${row.id}.desc`)}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
