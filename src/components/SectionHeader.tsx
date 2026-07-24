"use client";

import Reveal from "./Reveal";

export function Kicker({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Reveal className="flex items-center gap-[14px]">
      <span aria-hidden className="bg-accent block" style={{ width: 26, height: 1 }} />
      <span
        className="font-mono text-muted uppercase"
        style={{ fontSize: 11, letterSpacing: ".24em" }}
      >
        {children}
      </span>
    </Reveal>
  );
}

export default function SectionHeader({
  kicker,
  title,
  titleEm,
  marginBottom,
}: Readonly<{
  kicker: string;
  title: string;
  titleEm: string;
  marginBottom?: string;
}>) {
  return (
    <div
      className="flex flex-wrap items-end justify-between"
      style={{ gap: 24, marginBottom }}
    >
      <Kicker>{kicker}</Kicker>
      <Reveal
        as="h2"
        className="font-display text-fg m-0 text-right"
        style={{
          fontWeight: 300,
          fontSize: "clamp(2rem,4.6vw,4rem)",
          lineHeight: 1,
          letterSpacing: "-.02em",
        }}
      >
        {title}
        <span className="font-serif text-accent italic" style={{ fontSize: "1.1em" }}>
          {titleEm}
        </span>
      </Reveal>
    </div>
  );
}
