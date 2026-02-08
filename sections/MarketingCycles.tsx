"use client";

import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Zap, BarChart3, ScanEye, Target, Layers, Share2 } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Pill } from "@/components/ui/Pill";
import { MarketingBlock } from "./MarketingBlock";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function MarketingCycles() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const visualContainerRef = useRef<HTMLDivElement>(null);

  const blockRefs = useRef<Array<HTMLDivElement | null>>([]);
  // INNER "tilt layer"
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  // OUTER stack wrapper (translate/scale/rotateZ)
  const outerCardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const setBlockRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      blockRefs.current[index] = el;
    },
    []
  );

  const setCardRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      cardRefs.current[index] = el;
    },
    []
  );

  const setOuterCardRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      outerCardRefs.current[index] = el;
    },
    []
  );

  const leftColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const container = visualContainerRef.current;
    const leftCol = leftColRef.current;
    const blocks = blockRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!sectionEl || !container || !leftCol || blocks.length === 0) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionEl,
        start: "top top",
        end: () => {
          // how long the left column can scroll past the pinned visual
          const scrollDistance = leftCol.scrollHeight - container.offsetHeight + 30;
          return "+=" + Math.max(0, scrollDistance);
        },
        pin: container,
        pinSpacing: true,
        invalidateOnRefresh: true,
      });

      blocks.forEach((block, index) => {
        ScrollTrigger.create({
          trigger: block,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveCardIndex(index),
          onEnterBack: () => setActiveCardIndex(index),
        });
      });
    }, sectionEl);

    return () => ctx.revert();
  }, []);

  // Base stack offsets (your original values) - memoized to avoid exhaustive-deps warning
  const stackOffsets = useMemo(
    () => [
      { x: 0, y: 0, scale: 1, rotation: 0 },
      { x: -14, y: -10, scale: 0.98, rotation: -6 },
      { x: -26, y: -20, scale: 0.96, rotation: 8 },
    ],
    []
  );

  /*
    On every card change:
    1) Reset tilt layer (as before)
    2) Add a small eased "rotation nudge" to ALL outer cards (immersive)
       - It's subtle
       - It does not replace your base rotation; it briefly offsets it
       - It eases back to the base rotation automatically
  */
  useEffect(() => {
    // 1) Reset tilt layer
    cardRefs.current.forEach((tiltLayer) => {
      if (!tiltLayer) return;

      gsap.to(tiltLayer, {
        rotationX: 0,
        rotationY: 0,
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        overwrite: true,
      });
    });

    // 2) Rotation nudge for ALL cards (outer wrapper)
    const outers = outerCardRefs.current.filter(Boolean) as HTMLDivElement[];

    outers.forEach((outer, index) => {
      const base = stackOffsets[index] ?? stackOffsets[0];

      // Deterministic but varied nudge per layer (top gets the smallest)
      const layerFactor = index + 1; // 1,2,3...
      const dir = activeCardIndex % 2 === 0 ? 1 : -1;
      const nudgeDeg = dir * (1.2 / layerFactor); // subtle

      // Kill any in-flight nudge on this element
      gsap.killTweensOf(outer);

      // Nudge away, then settle back to base rotation (both eased)
      gsap.to(outer, {
        duration: 0.28,
        ease: "sine.out",
        onUpdate: () => {
          // no-op (keeps tween alive even if style updates elsewhere)
        },
        // GSAP will write inline transform; we immediately restore base in the next tween
        // to keep your intended stack layout.
        rotation: base.rotation + nudgeDeg,
      });

      gsap.to(outer, {
        duration: 0.55,
        ease: "expo.out",
        rotation: base.rotation,
        delay: 0.02,
      });
    });
  }, [activeCardIndex, stackOffsets]);

  const cards = [
    { src: "/images/sequence/timer.png", alt: "Visão geral do ciclo de marketing." },
    {
      src: "/images/sequence/chess-queen.png",
      alt: "Insights práticos para decisões de marketing.",
    },
    { src: "/images/sequence/satelite.png", alt: "Coordenação multicanal do marketing." },
  ];

  const orderedCards = cards.map((_, index) => cards[(activeCardIndex + index) % cards.length]);

  return (
    <section ref={sectionRef} className="relative mx-auto max-w-6xl px-6 pt-24 md:pt-48">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* LEFT */}
        <div ref={leftColRef} className="lg:col-span-7 space-y-12 md:space-y-36">
          {/* Block 1 */}
          <div ref={setBlockRef(0)}>
            <div className="lg:hidden">
              <div className="relative mb-10 mx-auto aspect-[4/5] w-full max-w-md">
                <div className="absolute inset-0 rounded-xl border border-border/40">
                  <div className="relative flex h-full w-full items-center justify-center rounded-xl">
                    <div className="absolute inset-0 rounded-xl bg-surface/40 backdrop-blur-md" />
                    <div className="relative w-full h-full p-12">
                      <Image
                        src={cards[0].src}
                        alt={cards[0].alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-contain relative block p-16 max-h-full"
                        draggable={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Pill tone="accent" pulse>
              Agilidade e eficiência
            </Pill>
            <SectionHeading title="Mais velocidade, menos retrabalho. Marketing que funciona em ciclos." />
            <div className="mt-8 space-y-6">
              <p className="text-body text-text-secondary leading-relaxed">
                Em vez de depender de ações isoladas, criamos fluxos contínuos de marketing apoiados
                por automação de IA e tecnologia. Isso reduz atrasos, elimina tarefas manuais e
                garante que cada campanha siga um processo claro — do planejamento à mensuração.
              </p>
              <p className="text-body text-text-secondary leading-relaxed">
                O resultado é mais agilidade na execução, ajustes mais rápidos e consistência nos
                resultados ao longo do tempo. Você deixa de &quot;testar ideias&quot; e passa a operar um
                sistema que evolui com dados reais.
              </p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              <Card>
                <div className="p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20">
                    <Zap className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-display text-h3 text-text">Automação de IA</h3>
                  <p className="mt-2 text-small text-text-muted">
                    Reduz atrasos e elimina tarefas manuais
                  </p>
                </div>
              </Card>
              <Card>
                <div className="p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent-2/20">
                    <BarChart3 className="h-5 w-5 text-accent-2" />
                  </div>
                  <h3 className="font-display text-h3 text-text">Evolução com dados</h3>
                  <p className="mt-2 text-small text-text-muted">
                    Sistema que evolui com dados reais
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* Block 2 */}
          <div ref={setBlockRef(1)}>
            <div className="lg:hidden">
              <div className="relative mx-auto mb-10 aspect-[4/5] w-full max-w-sm">
                <div className="absolute inset-0 rounded-xl border border-border/40">
                  <div className="relative flex h-full w-full items-center justify-center rounded-xl">
                    <div className="absolute inset-0 rounded-xl bg-surface/40 backdrop-blur-md" />
                    <div className="relative w-full h-full p-12">
                      <Image
                        src={cards[1].src}
                        alt={cards[1].alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-contain relative block p-16 max-h-full"
                        draggable={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Pill tone="accent" pulse>
              Equipe experiente
            </Pill>
            <MarketingBlock title="Decisões melhores, baseadas em experiência prática.">
              <p>
                Seu marketing é acompanhado por profissionais com vivência real em marketing, dados
                e desenvolvimento. Isso significa menos ruído na comunicação, análises mais precisas
                e recomendações que levam em conta limitações técnicas, orçamento e contexto de
                negócio.
              </p>
              <p>
                Não é apenas sobre o que fazer, mas sobre o que faz sentido fazer agora — e o que
                deve esperar.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                  <div className="p-5">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20">
                      <ScanEye className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="font-display text-h3 text-text">Visão técnica + marketing</h3>
                    <p className="mt-2 text-small text-text-muted">
                      Decisões considerando stack, dados e execução real.
                    </p>
                  </div>
                </Card>
                <Card>
                  <div className="p-5">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent-2/20">
                      <Target className="h-5 w-5 text-accent-2" />
                    </div>
                    <h3 className="font-display text-h3 text-text">Prioridade correta</h3>
                    <p className="mt-2 text-small text-text-muted">
                      Foco no que gera impacto agora.
                    </p>
                  </div>
                </Card>
              </div>
            </MarketingBlock>
          </div>

          {/* Block 3 */}
          <div ref={setBlockRef(2)}>
            <div className="lg:hidden">
              <div className="relative mx-auto mb-10 aspect-[4/5] w-full max-w-sm">
                <div className="absolute inset-0 rounded-xl border border-border/40">
                  <div className="relative flex h-full w-full items-center justify-center rounded-xl">
                    <div className="absolute inset-0 rounded-xl bg-surface/40 backdrop-blur-md" />
                    <div className="relative w-full h-full p-12">
                      <Image
                        src={cards[2].src}
                        alt={cards[2].alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-contain relative block p-16 max-h-full"
                        draggable={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Pill tone="accent" pulse>
              Apareça no momento e lugar certo
            </Pill>
            <MarketingBlock title="Sua marca visível nos canais certos, de forma coordenada.">
              <p>
                Planejamos e acompanhamos sua presença nos principais pontos de contato: anúncios em
                Meta e Google, conteúdo orgânico, SEO e novos formatos orientados por IA (como LEO).
                Tudo funciona de forma integrada, evitando esforços duplicados ou mensagens
                desconectadas.
              </p>
              <p>
                Cada canal tem um papel claro dentro da estratégia, contribuindo para geração de
                demanda e conversão — não apenas &quot;marcando presença&quot;.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                  <div className="p-5">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20">
                      <Layers className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="font-display text-h3 text-text">Estratégia integrada</h3>
                    <p className="mt-2 text-small text-text-muted">
                      Mensagens coerentes em todos os canais.
                    </p>
                  </div>
                </Card>
                <Card>
                  <div className="p-5">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent-2/20">
                      <Share2 className="h-5 w-5 text-accent-2" />
                    </div>
                    <h3 className="font-display text-h3 text-text">Papel claro por canal</h3>
                    <p className="mt-2 text-small text-text-muted">
                      Aquisição, nutrição e conversão bem definidas.
                    </p>
                  </div>
                </Card>
              </div>
            </MarketingBlock>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hidden lg:block lg:col-span-5">
          <div ref={visualContainerRef} className="relative p-6 pb-0 md:p-12 lg:p-12">
            <div className="relative aspect-[4/5] w-full max-w-md">
              {orderedCards.map((card, index) => {
                const offset = stackOffsets[index] ?? stackOffsets[0];

                return (
                  <div
                    key={card.src}
                    ref={setOuterCardRef(index)}
                    className="absolute inset-0 rounded-xl border border-border transition-transform duration-500 ease-out"
                    style={{
                      transform: `translate(${offset.x}px, ${offset.y}px) scale(${offset.scale}) rotate(${offset.rotation}deg)`,
                      zIndex: cards.length - index,
                      willChange: "transform",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div
                      ref={setCardRef(index)}
                      className="relative flex h-full w-full items-center justify-center rounded-xl"
                      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
                    >
                      <div className="absolute inset-0 rounded-xl bg-surface/40 backdrop-blur-sm" />
                      <div className="relative w-full h-full p-16">
                        <Image
                          src={card.src}
                          alt={card.alt}
                          fill
                          sizes="(max-width: 1024px) 0px, 400px"
                          className="object-contain relative block p-16 max-h-full"
                          draggable={false}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
