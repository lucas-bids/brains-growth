"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_URL = "https://wa.me/5500000000000";
const TITLE = "Oi! 👋 Eu sou o Lucas, líder da Brains Growth.";
const SUBTITLE = "Vamos conversar sobre o crescimento do seu negócio";
const CTA_LABEL = "Fale com o Lucas";

const primaryButtonBase =
  "inline-flex items-center justify-center rounded-xl px-5 h-11 text-sm font-semibold outline-none transition focus-visible:ring-2 bg-accent text-accent-foreground ring-offset-0 hover:brightness-95 focus-visible:ring-accent/40";

export function FloatingCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const textStackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const pill = pillRef.current;
    const textStack = textStackRef.current;
    const landingZone = document.getElementById("cta-landing-zone");

    if (!container || !pill || !textStack || !landingZone) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      const isMobile = () => window.innerWidth < 768;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: landingZone,
          start: "top bottom-=20",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        container,
        {
          maxWidth: "min(calc(100vw - 2rem), 72rem)",
          xPercent: -50,
          duration: 1,
        },
        0
      )
        .to(
          pill,
          {
            paddingLeft: 32,
            paddingRight: 32,
            paddingTop: 20,
            paddingBottom: 20,
            duration: 1,
          },
          0
        )
        .to(
          container,
          {
            y: -120,
            duration: 1,
          },
          0
        );

      // On mobile only: reveal text stack when expanded (opacity/width driven by scroll)
      if (isMobile()) {
        tl.to(
          textStack,
          {
            opacity: 1,
            width: 280,
            duration: 0.6,
          },
          0.3
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Fale com o Lucas"
      className="fixed bottom-6 left-1/2 z-50 mx-auto w-full max-w-md -translate-x-1/2 px-4 md:max-w-xl"
    >
      <div
        ref={pillRef}
        className="flex items-center justify-between gap-4 rounded-full border border-border bg-surface/50 px-4 py-3 backdrop-blur-md md:px-5 md:py-4"
      >
        {/* Left: Avatar + Text (hidden on mobile in floating state) */}
        <div className="flex min-w-0 flex-1 items-center gap-3 md:gap-4">
          {/* Placeholder avatar */}
          <div
            className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-surface-2 md:h-14 md:w-14"
            aria-hidden
          >
            <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-text-muted">
              L
            </div>
          </div>

          {/* Text stack: hidden on mobile (floating), revealed in expanded state via GSAP */}
          <div
            ref={textStackRef}
            className="min-w-0 opacity-0 w-0 overflow-hidden md:opacity-100 md:w-auto md:overflow-visible"
          >
            <p className="truncate text-sm font-medium text-text md:text-base">
              {TITLE}
            </p>
            <p className="truncate text-xs text-text-muted md:text-sm">
              {SUBTITLE}
            </p>
          </div>
        </div>

        {/* Right: CTA button */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`shrink-0 ${primaryButtonBase}`}
        >
          {CTA_LABEL}
        </a>
      </div>
    </div>
  );
}
