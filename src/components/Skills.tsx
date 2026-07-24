"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import SkillsList from "./SkillsList";
import SkillsConstellation from "./SkillsConstellation";

export default function Skills() {
  const t = useTranslations("skills");
  // List is the SSR/no-JS default; the constellation swaps in after mount
  // on wide viewports without reduced motion (prototype: width >= 760).
  const [constellation, setConstellation] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setConstellation(window.innerWidth >= 760 && !reduced);
  }, []);

  return (
    <section
      id="skills"
      className="bg-bg relative z-10"
      style={{ padding: "clamp(60px,10vh,120px) var(--gutter) clamp(120px,18vh,200px)" }}
    >
      <div className="al-container">
        <SectionHeader
          kicker={t("kicker")}
          title={t("title")}
          titleEm={t("titleEm")}
        />
        <Reveal style={{ marginTop: "clamp(40px,6vw,80px)" }}>
          {constellation ? <SkillsConstellation /> : <SkillsList />}
        </Reveal>
      </div>
    </section>
  );
}
