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
