"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Card } from "../components/ui/Card";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Pill } from "../components/ui/Pill";
import { MarketingBlock } from "./MarketingBlock";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function MarketingCycles() {
  // Section wrapper (ScrollTrigger trigger)
  const sectionRef = useRef<HTMLDivElement>(null);

  // Right visual (this is what we pin + also what receives pointer events)
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoOuterRef = useRef<HTMLDivElement>(null);
  const videoInnerRef = useRef<HTMLVideoElement>(null);

  // Left column (used only if you later want measurements; not required for pinning)
  const leftColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const container = videoContainerRef.current;
    const outer = videoOuterRef.current;
    const inner = videoInnerRef.current;

    if (!sectionEl || !container || !outer || !inner) return;

    // Disable 3D tilt on coarse pointers (touch)
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;

    const ctx = gsap.context(() => {
      // Pin the RIGHT visual for the full duration of this section
      ScrollTrigger.create({
        trigger: sectionEl,
        start: "top top+=96",
        end: "bottom bottom-=96",
        pin: container,
        pinSpacing: true,
        invalidateOnRefresh: true,
      });

      if (isCoarse) return;

      // Perspective belongs to the pinned container
      gsap.set(container, { perspective: 700 });

      const outerRX = gsap.quickTo(outer, "rotationX", {
        ease: "power3",
        duration: 0.4,
      });
      const outerRY = gsap.quickTo(outer, "rotationY", {
        ease: "power3",
        duration: 0.4,
      });
      const innerX = gsap.quickTo(inner, "x", { ease: "power3", duration: 0.4 });
      const innerY = gsap.quickTo(inner, "y", { ease: "power3", duration: 0.4 });

      const handlePointerMove = (e: PointerEvent) => {
        const xNorm = e.clientX / window.innerWidth;
        const yNorm = e.clientY / window.innerHeight;

        outerRX(gsap.utils.interpolate(25, -25, yNorm));
        outerRY(gsap.utils.interpolate(-25, 25, xNorm));

        innerX(gsap.utils.interpolate(-25, 25, xNorm));
        innerY(gsap.utils.interpolate(-25, 25, yNorm));
      };

      const handlePointerLeave = () => {
        outerRX(0);
        outerRY(0);
        innerX(0);
        innerY(0);
      };

      // Extra bleed for tilt (prevents edges showing)
      gsap.set(inner, { scale: 1.12, transformOrigin: "center center" });

      container.addEventListener("pointermove", handlePointerMove);
      container.addEventListener("pointerleave", handlePointerLeave);

      return () => {
        container.removeEventListener("pointermove", handlePointerMove);
        container.removeEventListener("pointerleave", handlePointerLeave);
      };
    }, sectionEl);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* LEFT: all content in one column */}
        <div ref={leftColRef} className="lg:col-span-6 space-y-32">
          {/* Block 1 */}
          <div>
            <Pill tone="accent" pulse>
              Avaliação inicial gratuita
            </Pill>

            <SectionHeading title="Mais velocidade, menos retrabalho. Marketing que funciona em ciclos." />

            <div className="mt-8 space-y-6">
              <p className="text-body text-text-secondary leading-relaxed">
                Em vez de depender de ações isoladas, criamos fluxos contínuos de marketing apoiados
                por automação de IA e tecnologia. Isso reduz atrasos, elimina tarefas manuais e garante
                que cada campanha siga um processo claro — do planejamento à mensuração.
              </p>
              <p className="text-body text-text-secondary leading-relaxed">
                O resultado é mais agilidade na execução, ajustes mais rápidos e consistência nos
                resultados ao longo do tempo. Você deixa de "testar ideias" e passa a operar um sistema
                que evolui com dados reais.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              <Card>
                <div className="p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20">
                    <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-display text-h3 text-text">Automação de IA</h3>
                  <p className="mt-2 text-small text-text-muted">Reduz atrasos e elimina tarefas manuais</p>
                </div>
              </Card>

              <Card>
                <div className="p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent-2/20">
                    <svg className="h-5 w-5 text-accent-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-display text-h3 text-text">Evolução com dados</h3>
                  <p className="mt-2 text-small text-text-muted">Sistema que evolui com dados reais</p>
                </div>
              </Card>
            </div>
          </div>

          {/* Block 2 */}
          <MarketingBlock title="Decisões melhores, baseadas em experiência prática.">
            <p>
              Seu marketing é acompanhado por profissionais com vivência real em marketing, dados e desenvolvimento.
              Isso significa menos ruído na comunicação, análises mais precisas e recomendações que levam em conta
              limitações técnicas, orçamento e contexto de negócio.
            </p>
            <p>
              Não é apenas sobre o que fazer, mas sobre o que faz sentido fazer agora — e o que deve esperar.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <div className="p-5">
                  <h3 className="font-display text-h3 text-text">Visão técnica + marketing</h3>
                  <p className="mt-2 text-small text-text-muted">Decisões considerando stack, dados e execução real.</p>
                </div>
              </Card>
              <Card>
                <div className="p-5">
                  <h3 className="font-display text-h3 text-text">Prioridade correta</h3>
                  <p className="mt-2 text-small text-text-muted">Foco no que gera impacto agora.</p>
                </div>
              </Card>
            </div>
          </MarketingBlock>

          {/* Block 3 */}
          <MarketingBlock title="Sua marca visível nos canais certos, de forma coordenada.">
            <p>
              Planejamos e acompanhamos sua presença nos principais pontos de contato: anúncios em Meta e Google,
              conteúdo orgânico, SEO e novos formatos orientados por IA (como LEO). Tudo funciona de forma integrada,
              evitando esforços duplicados ou mensagens desconectadas.
            </p>
            <p>
              Cada canal tem um papel claro dentro da estratégia, contribuindo para geração de demanda e conversão —
              não apenas “marcando presença”.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <div className="p-5">
                  <h3 className="font-display text-h3 text-text">Estratégia integrada</h3>
                  <p className="mt-2 text-small text-text-muted">Mensagens coerentes em todos os canais.</p>
                </div>
              </Card>
              <Card>
                <div className="p-5">
                  <h3 className="font-display text-h3 text-text">Papel claro por canal</h3>
                  <p className="mt-2 text-small text-text-muted">Aquisição, nutrição e conversão bem definidas.</p>
                </div>
              </Card>
            </div>
          </MarketingBlock>
        </div>

        {/* RIGHT: pinned visual (this is the element ScrollTrigger pins) */}
        <div className="lg:col-span-6">
          <div
            ref={videoContainerRef}
            className="top-0 flex items-center justify-center lg:sticky"
          >
            <div
              ref={videoOuterRef}
              className="aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-border"
            >
              <video
                ref={videoInnerRef}
                src="/images/video-beneficios-01.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
