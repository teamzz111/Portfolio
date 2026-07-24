"use client";

import {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { ScrollTrigger } from "@/lib/gsap";
import { motionState, tickMotion } from "@/lib/motion-state";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Owns THE single requestAnimationFrame loop of the app:
 * lenis.raf(time) → motion lerps + frame callbacks → R3F advance (if mounted).
 * Never driven by gsap.ticker, so it can't sleep and freeze the scene.
 */
export default function LenisProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useLayoutEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let instance: Lenis | null = null;
    if (!reduced) {
      instance = new Lenis({ lerp: 0.09, smoothWheel: true });
      instance.on("scroll", ScrollTrigger.update);
      setLenis(instance);
    }

    let rafId = requestAnimationFrame(function loop(time) {
      rafId = requestAnimationFrame(loop);
      instance?.raf(time);
      tickMotion(time);
      motionState.advance?.(time);
    });

    const onMove = (event: MouseEvent) => {
      motionState.mouse.tx = (event.clientX / window.innerWidth - 0.5) * 2;
      motionState.mouse.ty = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);

    // Masked-name heights depend on the loaded fonts.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      instance?.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
