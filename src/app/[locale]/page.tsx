import { setRequestLocale } from "next-intl/server";
import Atmosphere from "@/components/Atmosphere";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import SystemGraphLoader from "@/components/SystemGraphLoader";

export default async function Home({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Atmosphere>
        <SystemGraphLoader />
      </Atmosphere>
      <Nav />
      <main>
        <Hero />
      </main>
    </>
  );
}
