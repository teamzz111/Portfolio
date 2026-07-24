"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { MOTION_MULT, motionState } from "@/lib/motion-state";
import { site } from "@/lib/content";

const NAME_SIZE = "clamp(3.4rem,15vw,14rem)";
const MASK_PAD = "clamp(14px,2.6vw,46px)";
const MASK_MARGIN = "clamp(-46px,-2.6vw,-14px)";

export default function Hero() {
  const t = useTranslations("hero");
  const overlayRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  // Scroll-linked tweens (scrub only — the render loop is the provider's rAF).
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      ScrollTrigger.create({
        trigger: trackRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          motionState.progress = self.progress;
        },
      });
      gsap.to(overlayRef.current, {
        yPercent: -14,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: trackRef.current,
          start: "top top",
          end: "55% top",
          scrub: true,
        },
      });
    });
  });

  // Mouse parallax on the name group, applied in the shared rAF loop.
  useEffect(() => {
    const el = nameRef.current;
    if (!el) return;
    const apply = () => {
      el.style.transform = `translate(${(motionState.mouse.x * 14 * MOTION_MULT).toFixed(2)}px,${(motionState.mouse.y * 8 * MOTION_MULT).toFixed(2)}px)`;
    };
    motionState.onFrame.add(apply);
    return () => {
      motionState.onFrame.delete(apply);
    };
  }, []);

  return (
    <>
      {/* Fixed stage overlay — fades/recedes on scroll */}
      <div
        id="hero-overlay"
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-10 will-change-transform"
      >
        {/* location, top-right */}
        <div
          className="al-meta-intro absolute text-right"
          style={{ top: "clamp(78px,10vh,120px)", right: "var(--gutter)" }}
        >
          <div className="font-mono text-fg" style={{ fontSize: 11, letterSpacing: ".16em" }}>
            {site.location}
          </div>
          <div
            className="font-mono text-faint"
            style={{ fontSize: 10, letterSpacing: ".16em", marginTop: 5 }}
          >
            {site.coords}
          </div>
        </div>

        {/* headline block, vertically centered left */}
        <div
          className="absolute"
          style={{
            left: "var(--gutter)",
            top: "50%",
            transform: "translateY(-46%)",
            maxWidth: "min(1120px,92vw)",
          }}
        >
          <div
            className="al-eyebrow font-mono text-muted flex flex-wrap items-baseline gap-[.5em] uppercase"
            style={{
              fontSize: "clamp(.7rem,1vw,.86rem)",
              letterSpacing: ".2em",
              marginBottom: "clamp(14px,2vw,26px)",
            }}
          >
            <span>{t("eyebrow")}</span>
            <span
              className="font-serif text-accent italic normal-case"
              style={{
                letterSpacing: 0,
                fontSize: "clamp(1.7rem,4.2vw,3.4rem)",
                lineHeight: 0.7,
              }}
            >
              {t("beyond")}
            </span>
          </div>

          <h1
            id="hero-name"
            ref={nameRef}
            className="font-display m-0"
            style={{ lineHeight: 0.8, letterSpacing: "-.03em" }}
          >
            <span
              className="block overflow-hidden"
              style={{ paddingBottom: MASK_PAD, marginBottom: MASK_MARGIN }}
            >
              <span
                className="al-line text-fg block"
                style={{ fontWeight: 200, fontSize: NAME_SIZE }}
              >
                Andrés
              </span>
            </span>
            <span
              className="al-name-line2 block overflow-hidden"
              style={{ paddingBottom: MASK_PAD, marginBottom: MASK_MARGIN }}
            >
              <span
                className="al-line text-fg block"
                style={{
                  fontWeight: 500,
                  fontSize: NAME_SIZE,
                  textIndent: "clamp(30px,7vw,120px)",
                }}
              >
                Largo<span className="text-accent">.</span>
              </span>
            </span>
          </h1>

          <div
            className="al-role font-mono text-muted flex items-center gap-[.5em]"
            style={{
              marginTop: "clamp(18px,2.6vw,34px)",
              fontSize: "clamp(.72rem,1vw,.9rem)",
              letterSpacing: ".06em",
            }}
          >
            <span>{t("role")}</span>
            <span
              aria-hidden
              className="al-caret bg-accent inline-block"
              style={{ width: ".5em", height: "1.05em", transform: "translateY(.14em)" }}
            />
          </div>
        </div>

        {/* index marker, bottom-left */}
        <div
          className="al-meta-intro font-mono text-faint absolute"
          style={{
            left: "var(--gutter)",
            bottom: "clamp(30px,5vh,54px)",
            fontSize: 10.5,
            letterSpacing: ".24em",
          }}
        >
          {t("idx")}
        </div>

        {/* scroll cue, bottom-right */}
        <div
          className="al-meta-intro absolute flex items-center gap-[14px]"
          style={{ right: "var(--gutter)", bottom: "clamp(30px,5vh,54px)" }}
        >
          <span
            className="font-mono text-muted uppercase"
            style={{ fontSize: 10.5, letterSpacing: ".2em" }}
          >
            {t("cue")}
          </span>
          <span
            aria-hidden
            className="al-cue-line bg-accent block"
            style={{ width: 1, height: 38 }}
          />
        </div>
      </div>

      {/* Scroll track — generates the fly-through scroll distance */}
      <div
        id="hero-track"
        ref={trackRef}
        className="relative z-[1]"
        style={{ height: "170vh" }}
      />
    </>
  );
}
