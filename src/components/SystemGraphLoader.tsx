"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const SystemGraph = dynamic(() => import("./SystemGraph"), { ssr: false });

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ?? canvas.getContext("webgl"),
    );
  } catch {
    return false;
  }
}

/**
 * Gates the 3D scene: skipped entirely under prefers-reduced-motion or
 * without WebGL — the CSS gradient + grain + vignette already read as a
 * cinematic poster.
 */
export default function SystemGraphLoader() {
  const [mobile, setMobile] = useState<boolean | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!supportsWebGL()) return;
    setMobile(Math.min(window.innerWidth, window.innerHeight) < 760);
  }, []);

  if (mobile === null) return null;
  return <SystemGraph mobile={mobile} />;
}
