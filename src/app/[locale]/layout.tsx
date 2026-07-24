import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { fontVariables } from "@/fonts";
import { locales, defaultLocale } from "@/i18n/locales";
import { siteUrl } from "@/lib/seo";
import { site } from "@/lib/content";
import LenisProvider from "@/providers/LenisProvider";
import SkipLink from "@/components/SkipLink";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t("title");
  const description = t("description");
  const ogLocale = locale === "es" ? "es_CO" : "en_US";

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    authors: [{ name: "Andrés Largo", url: siteUrl }],
    creator: "Andrés Largo",
    alternates: {
      canonical: `/${locale}/`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}/`])),
        "x-default": `/${defaultLocale}/`,
      },
    },
    openGraph: {
      type: "website",
      url: `/${locale}/`,
      siteName: "Andrés Largo",
      title,
      description,
      locale: ogLocale,
      alternateLocale: locale === "es" ? "en_US" : "es_CO",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "meta" });
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Andrés Largo",
        jobTitle: t("jobTitle"),
        description: t("description"),
        url: `${siteUrl}/${locale}/`,
        email: `mailto:${site.email}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bogotá D.C.",
          addressCountry: "CO",
        },
        sameAs: [site.linkedin.url, site.github.url],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "Andrés Largo",
        url: `${siteUrl}/${locale}/`,
        inLanguage: locale,
        author: { "@id": `${siteUrl}/#person` },
      },
    ],
  };

  return (
    <html lang={locale} className={fontVariables}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider>
          <SkipLink />
          <LenisProvider>{children}</LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
