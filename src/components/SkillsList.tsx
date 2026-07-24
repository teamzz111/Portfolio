"use client";

import { useTranslations } from "next-intl";
import { skillCategories } from "@/lib/skills-data";

/** Structured-list fallback: default render, narrow screens, reduced motion. */
export default function SkillsList() {
  const t = useTranslations("skills");

  return (
    <div className="flex flex-col">
      {skillCategories.map((cat, index) => (
        <div
          key={cat.k}
          style={{
            padding: "22px 0",
            borderTop: "1px solid rgba(255,255,255,.09)",
            borderBottom:
              index === skillCategories.length - 1
                ? "1px solid rgba(255,255,255,.09)"
                : undefined,
          }}
        >
          <div
            className="font-display text-fg"
            style={{
              fontWeight: 300,
              fontSize: "clamp(1.3rem,3vw,1.9rem)",
              letterSpacing: "-.01em",
            }}
          >
            {t(cat.key)}
          </div>
          <div
            className="font-mono text-accent"
            style={{ marginTop: 10, fontSize: 12, letterSpacing: ".06em", lineHeight: 1.7 }}
          >
            {cat.skills.join("  ·  ")}
          </div>
        </div>
      ))}
    </div>
  );
}
