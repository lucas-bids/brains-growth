"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
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
      const getRootFontSize = () => {
        const value = parseFloat(
          getComputedStyle(document.documentElement).fontSize
        );
        return Number.isFinite(value) ? value : 16;
      };
      const getCollapsedWidth = () => container.getBoundingClientRect().width;
      const getExpandedWidth = () => {
        const rem = getRootFontSize();
        const desired = Math.min(window.innerWidth - rem * 2, rem * 72);
        return Math.max(desired, getCollapsedWidth());
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: landingZone,
          start: "top bottom",
          end: "bottom bottom-=100",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        container,
        {
          width: getCollapsedWidth,
          maxWidth: getCollapsedWidth,
        },
        {
          width: getExpandedWidth,
          maxWidth: getExpandedWidth,
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
            paddingTop: 32,
            paddingBottom: 32,
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
      className="fixed bottom-6 left-1/2 z-50 mx-auto w-full max-w-2xl -translate-x-1/2 px-4 md:max-w-2xl"
    >
      <div
        ref={pillRef}
        className="flex items-center justify-between gap-4 rounded-full border border-border bg-surface/50 px-4 py-3 backdrop-blur-md md:px-5 md:py-4"
      >
        {/* Left: Avatar + Text (hidden on mobile in floating state) */}
        <div className="flex min-w-0 flex-1 items-center gap-3 md:gap-4">
{/* Avatar */}
<div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-surface-2 md:h-14 md:w-14">
            <Image
              src="/images/perfil-lucas.jpeg"
              alt="Lucas"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 48px, 56px"
              priority
            />
          </div>

          {/* Text stack: hidden on mobile (floating), revealed in expanded state via GSAP */}
          <div
            ref={textStackRef}
            className="min-w-0 opacity-100 w-auto overflow-visible md:opacity-100 md:w-auto md:overflow-visible"
          >
            <p className="whitespace-normal text-sm font-medium text-text md:truncate md:text-base">
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
          aria-label="Fale com o Lucas no WhatsApp"
        >
          <span className="md:hidden" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12.05 2.01a9.94 9.94 0 0 0-8.54 14.92L2 22l5.23-1.37A9.93 9.93 0 1 0 12.05 2.01Zm0 1.8a8.1 8.1 0 0 1 6.93 12.31l-.36.6.82 3.03-3.08-.81-.57.34a8.1 8.1 0 1 1-3.73-15.47Zm4.36 10.74c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1-.37-1.9-1.18-.7-.62-1.17-1.4-1.3-1.63-.14-.24-.01-.36.1-.48.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.68 2.56 4.06 3.6.56.24 1 .38 1.34.48.56.18 1.08.16 1.48.1.46-.06 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
            </svg>
          </span>
          <span className="hidden md:inline">{CTA_LABEL}</span>
        </a>
      </div>
    </div>
  );
}
