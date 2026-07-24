export const site = {
  monogram: "A—L",
  navYear: "©2026",
  location: "Bogotá D.C., Colombia",
  coords: "04°42′N · 74°04′W",
  copyright: "© 2026 Andrés Largo · Bogotá D.C.",
  email: "contacto@andreslargo.com",
  linkedin: {
    label: "/in/andreslargo",
    url: "https://www.linkedin.com/in/andreslargo/",
  },
  github: {
    label: "@teamzz111",
    url: "https://github.com/teamzz111",
  },
} as const;

export const navSections = [
  { key: "about", target: "about" },
  { key: "work", target: "work" },
  { key: "skills", target: "skills" },
  { key: "contact", target: "contact" },
] as const;

export const aboutStats = [
  { value: "07+", labelKey: "s1lab", accent: false },
  { value: "200+", labelKey: "s2lab", accent: false },
  { value: "$1M", labelKey: "s3lab", accent: true },
] as const;

/**
 * Trajectory rows. `meta: null` means the meta line is localized
 * (messages exp.rN.meta); otherwise it is identical in both languages.
 */
export const experience = [
  {
    id: "r1",
    index: "01",
    company: "Lula — Smarter Property",
    ghostYear: "2025",
    meta: null,
    cyanGhost: false,
  },
  {
    id: "r2",
    index: "02",
    company: "ByYuto LLC",
    ghostYear: "2024",
    meta: "2024 — 2025 · Fort Lauderdale",
    cyanGhost: false,
  },
  {
    id: "r3",
    index: "03",
    company: "Nowports",
    ghostYear: "2022",
    meta: "2022 — 2023 · Bogotá",
    cyanGhost: false,
  },
  {
    id: "r4",
    index: "04",
    company: "Chamba App",
    ghostYear: "2021",
    meta: "2021 — 2022",
    cyanGhost: false,
  },
  {
    id: "r5",
    index: "05",
    company: "Creci Finance",
    ghostYear: "2021",
    meta: "2021 — 2022",
    cyanGhost: false,
  },
  {
    id: "r6",
    index: "06",
    company: "Chamba LLC",
    ghostYear: "2019",
    meta: null,
    cyanGhost: true,
  },
  {
    id: "r7",
    index: "07",
    company: "Imaginamos",
    ghostYear: "↗",
    meta: "React Native · Shell Colombia",
    cyanGhost: false,
  },
] as const;

export const projects = [
  {
    id: "p1",
    index: "/ 01",
    title: "ByYuto",
    stack: "Next.js · Nest.js · React Native · AWS · MongoDB · Claude API · GPT-4",
    metric: null,
    imageFirst: true,
    placeholder: "ByYuto app screens",
  },
  {
    id: "p2",
    index: "/ 02",
    title: "Nowports",
    stack: "React · Node · Nest · AWS · Prisma · PostgreSQL",
    metric: "200+",
    imageFirst: false,
    placeholder: "Nowports design-system shots",
  },
  {
    id: "p3",
    index: "/ 03",
    title: "Chamba",
    stack: "React · React Native · NestJS · .NET Core",
    metric: "$1M",
    imageFirst: true,
    placeholder: "Chamba MVP shots",
  },
  {
    id: "p4",
    index: "/ 04",
    title: "Shell Colombia",
    stack: "React Native · Expo · App Store · Google Play",
    metric: null,
    imageFirst: false,
    placeholder: "Shell Colombia app shots",
  },
] as const;
