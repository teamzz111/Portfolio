"use client";

import { useLocale, useTranslations } from "next-intl";
import { navSections, site } from "@/lib/content";

export default function Nav() {
  const t = useTranslations("nav");
  const locale = useLocale();

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    target: string,
  ) => {
    event.preventDefault();
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="pointer-events-none fixed inset-x-0 top-0 z-20 flex items-center justify-between"
      style={{ padding: "clamp(18px,2.4vw,30px) var(--gutter)" }}
    >
      <div className="al-meta-intro pointer-events-auto flex items-baseline gap-[14px]">
        <span className="font-mono text-fg" style={{ fontSize: 12, letterSpacing: ".34em" }}>
          {site.monogram}
        </span>
        <span className="font-mono text-faint" style={{ fontSize: 10, letterSpacing: ".24em" }}>
          {site.navYear}
        </span>
      </div>

      <div
        className="al-meta-intro pointer-events-auto hidden items-center min-[821px]:flex"
        style={{ gap: "clamp(18px,2.4vw,36px)" }}
      >
        {navSections.map(({ key, target }) => (
          <a
            key={key}
            href={`#${target}`}
            onClick={(event) => handleNavClick(event, target)}
            className={`font-mono uppercase no-underline transition-colors duration-200 ${
              key === "contact"
                ? "text-accent hover:opacity-70"
                : "text-muted hover:text-fg"
            }`}
            style={{ fontSize: 11, letterSpacing: ".16em" }}
          >
            {t(key)}
          </a>
        ))}
      </div>

      <div
        className="al-meta-intro pointer-events-auto flex items-center"
        style={{ gap: "clamp(16px,2vw,30px)" }}
      >
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="bg-accent inline-block rounded-full"
            style={{ width: 6, height: 6, boxShadow: "0 0 10px var(--accent)" }}
          />
          <span
            className="font-mono text-muted uppercase"
            style={{ fontSize: 10.5, letterSpacing: ".18em" }}
          >
            {t("status")}
          </span>
        </div>
        <div
          className="font-mono flex items-center gap-1"
          style={{ fontSize: 11, letterSpacing: ".12em" }}
        >
          <a
            href="/en/"
            hrefLang="en"
            aria-current={locale === "en" ? "true" : undefined}
            className={locale === "en" ? "text-fg" : "text-faint"}
          >
            EN
          </a>
          <span className="text-faint">/</span>
          <a
            href="/es/"
            hrefLang="es"
            aria-current={locale === "es" ? "true" : undefined}
            className={locale === "es" ? "text-fg" : "text-faint"}
          >
            ES
          </a>
        </div>
      </div>
    </nav>
  );
}
