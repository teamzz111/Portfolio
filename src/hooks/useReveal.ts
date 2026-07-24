"use client";

import { useLayoutEffect, useRef } from "react";

/**
 * Enter-reveal per the handoff's motion architecture: IntersectionObserver +
 * CSS transitions, with a geometry-scan fallback and a 2.6s safety timeout so
 * content is never left invisible. The hidden state is only armed here (in a
 * pre-paint effect), so without JS everything stays visible.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      el.classList.add("al-in");
      return;
    }

    el.setAttribute("data-reveal-armed", "");

    let done = false;
    let cleanup = () => {};
    const show = () => {
      if (done) return;
      done = true;
      el.classList.add("al-in");
      cleanup();
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) show();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    const scan = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) show();
    };

    const safety = setTimeout(show, 2600);

    cleanup = () => {
      io.disconnect();
      window.removeEventListener("scroll", scan);
      window.removeEventListener("resize", scan);
      clearTimeout(safety);
    };

    io.observe(el);
    window.addEventListener("scroll", scan, { passive: true });
    window.addEventListener("resize", scan);
    scan();

    return cleanup;
  }, []);

  return ref;
}
