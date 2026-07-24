import { site } from "./content";

/** Compose the contact mailto URL exactly like the prototype's form handler. */
export function buildMailto(
  name: string,
  email: string,
  message: string,
  to: string = site.email,
) {
  const subject = encodeURIComponent(
    "Portfolio contact" + (name ? ` — ${name}` : ""),
  );
  const body = encodeURIComponent(
    (message || "") + (email ? `\n\n— ${name} · ${email}` : ""),
  );
  return `mailto:${to}?subject=${subject}&body=${body}`;
}
