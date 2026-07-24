"use client";

import { useTranslations } from "next-intl";

export default function SkipLink() {
  const t = useTranslations("nav");
  return (
    <a className="al-skip" href="#main">
      {t("skip")}
    </a>
  );
}
