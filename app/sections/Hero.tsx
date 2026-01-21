"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { HeroCarousel } from "../components/HeroCarousel";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

      tl.from(titleRef.current, {
        y: 40,
        opacity: 0,
        delay: 0.2,
      })
      .from(subtitleRef.current, {
        y: 20,
        opacity: 0,
      }, "-=0.7");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col items-center pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-6 text-center">
        {/* Headline */}
        <h1
          ref={titleRef}
          className="font-display text-h1 md:text-display text-text max-w-4xl mx-auto leading-[1.05] tracking-tight"
        >
          Crescimento maior e previsível para o seu negócio com marketing orientado a dados.
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-8 text-body text-text-secondary max-w-2xl mx-auto leading-relaxed"
        >
          Transformamos marketing em um sistema claro e mensurável, usando dados, 
          automação e acompanhamento contínuo para gerar mais clientes e faturamento 
          — sem apostas, sem achismos.
        </p>
      </div>

      {/* Carousel */}
      <div className="mt-16 w-full">
        <HeroCarousel />
      </div>
    </section>
  );
}
