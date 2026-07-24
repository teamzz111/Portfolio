/**
 * Absolute origin used for canonical URLs, hreflang, Open Graph, sitemap
 * and robots. Override with NEXT_PUBLIC_SITE_URL (no trailing slash needed)
 * when deploying to a different domain (e.g. the default Amplify domain).
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://andreslargo.com"
).replace(/\/+$/, "");
