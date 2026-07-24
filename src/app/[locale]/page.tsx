import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function Home({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("hero");

  return (
    <main className="al-gutter" style={{ paddingBlock: "10vh" }}>
      <p className="font-mono text-muted uppercase" style={{ letterSpacing: "0.2em" }}>
        {t("eyebrow")}{" "}
        <span className="font-serif italic text-accent normal-case" style={{ fontSize: "2em", letterSpacing: 0 }}>
          {t("beyond")}
        </span>
      </p>
      <h1
        className="font-display text-fg"
        style={{ fontWeight: 200, fontSize: "clamp(3.4rem,15vw,14rem)", lineHeight: 0.8 }}
      >
        Andrés
        <span style={{ fontWeight: 500, display: "block" }}>
          Largo<span className="text-accent">.</span>
        </span>
      </h1>
      <p className="font-mono text-muted" style={{ letterSpacing: "0.06em" }}>
        {t("role")}
      </p>
    </main>
  );
}
