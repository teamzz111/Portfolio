"use client";

import { useTranslations } from "next-intl";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { projects } from "@/lib/content";

export default function SelectedWork() {
  const t = useTranslations("work");

  return (
    <section
      id="work"
      className="bg-bg relative z-10"
      style={{ padding: "clamp(60px,10vh,120px) var(--gutter) clamp(120px,18vh,200px)" }}
    >
      <div className="al-container">
        <SectionHeader
          kicker={t("kicker")}
          title={t("title")}
          titleEm={t("titleEm")}
          marginBottom="clamp(56px,8vw,110px)"
        />

        <div className="flex flex-col" style={{ gap: "clamp(80px,12vh,180px)" }}>
          {projects.map((project) => (
            <Reveal
              as="article"
              key={project.id}
              className="flex flex-wrap items-center"
              style={{ gap: "clamp(32px,5vw,84px)" }}
            >
              <figure
                className="m-0"
                style={{
                  flex: "1.15 1 440px",
                  minWidth: 300,
                  order: project.imageFirst ? 1 : 2,
                }}
              >
                <div
                  className="al-figure bg-bg2 relative overflow-hidden"
                  style={{
                    aspectRatio: "16/10",
                    border: "1px solid rgba(255,255,255,.1)",
                  }}
                >
                  {/* Screenshot slot — replace with next/image when client provides assets */}
                  <div
                    className="font-mono text-faint absolute inset-0 flex items-center justify-center"
                    style={{ fontSize: 11, letterSpacing: ".14em" }}
                  >
                    {project.placeholder}
                  </div>
                  <span
                    aria-hidden
                    className="font-mono pointer-events-none absolute"
                    style={{
                      top: 14,
                      left: 16,
                      fontSize: 10,
                      letterSpacing: ".24em",
                      color: "#fff",
                      mixBlendMode: "difference",
                    }}
                  >
                    {project.index}
                  </span>
                </div>
              </figure>

              <div
                style={{
                  flex: "1 1 340px",
                  minWidth: 290,
                  order: project.imageFirst ? 2 : 1,
                }}
              >
                <div
                  className="font-mono text-accent uppercase"
                  style={{ fontSize: 10.5, letterSpacing: ".2em", marginBottom: 18 }}
                >
                  {t(`${project.id}.tag`)}
                </div>
                <h3
                  className="font-display text-fg m-0"
                  style={{
                    fontWeight: 300,
                    fontSize: "clamp(2.2rem,4.4vw,3.6rem)",
                    lineHeight: 0.98,
                    letterSpacing: "-.02em",
                  }}
                >
                  {project.title}
                </h3>
                <p
                  className="font-serif italic"
                  style={{
                    margin: "16px 0 0",
                    fontSize: "clamp(1.2rem,1.9vw,1.7rem)",
                    lineHeight: 1.2,
                    color: "var(--dim-3)",
                  }}
                >
                  {t(`${project.id}.tagline`)}
                </p>
                <p
                  className="font-display"
                  style={{
                    margin: "22px 0 0",
                    maxWidth: "34em",
                    fontWeight: 300,
                    fontSize: "clamp(.95rem,1.15vw,1.12rem)",
                    lineHeight: 1.5,
                    color: "var(--dim-1)",
                  }}
                >
                  {t(`${project.id}.desc`)}
                </p>

                {project.metric && (
                  <div className="flex items-baseline" style={{ marginTop: 28, gap: 16 }}>
                    <span
                      className="font-display text-accent"
                      style={{
                        fontWeight: 300,
                        fontSize: "clamp(2.6rem,5vw,4.2rem)",
                        lineHeight: 1,
                        letterSpacing: "-.03em",
                      }}
                    >
                      {project.metric}
                    </span>
                    <span
                      className="font-mono text-muted uppercase"
                      style={{ fontSize: 10.5, letterSpacing: ".14em", maxWidth: "12em" }}
                    >
                      {t(`${project.id}.metric`)}
                    </span>
                  </div>
                )}

                <div
                  className="font-mono text-faint"
                  style={{
                    marginTop: project.metric ? 22 : 26,
                    paddingTop: 16,
                    borderTop: "1px solid rgba(255,255,255,.09)",
                    fontSize: 11,
                    letterSpacing: ".08em",
                  }}
                >
                  {project.stack}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
