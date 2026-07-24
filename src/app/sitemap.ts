import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n/locales";
import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    ...Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}/`])),
    "x-default": `${siteUrl}/${defaultLocale}/`,
  };

  return locales.map((locale) => ({
    url: `${siteUrl}/${locale}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === defaultLocale ? 1 : 0.9,
    alternates: { languages },
  }));
}
