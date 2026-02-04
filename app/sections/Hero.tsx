"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { HeroCarousel } from "../components/HeroCarousel";
import { Pill } from "../components/ui/Pill";
import { Button } from "../components/ui/Button";

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
      className="relative flex flex-col items-center pt-4 md:pt-24 md:pt-32 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-6 text-center">
        <Pill tone="accent" pulse>Avaliação inicial gratuita</Pill>
        {/* Headline */}
        <h1
          ref={titleRef}
          className="font-display text-4xl md:text-6xl text-text max-w-4xl mx-auto tracking-tight"
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
        <Button variant="primary" className="h-10 px-4 mt-8">
          Agende uma conversa sem custo
        </Button>
      </div>

      {/* Carousel */}
      <div className="w-full">
        <HeroCarousel />
      </div>
    </section>
  );
}
