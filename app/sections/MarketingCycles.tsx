"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "../components/ui/Card";
import { SectionHeading } from "../components/ui/SectionHeading";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function MarketingCycles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Body text animation
      gsap.from(bodyRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: bodyRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Visual elements animation
      gsap.from(visualRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: visualRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // Cards stagger animation
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.from(cards, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      // Continuous rotation animation for cycle visual
      const cycleElements = visualRef.current?.querySelectorAll(".cycle-item");
      if (cycleElements) {
        cycleElements.forEach((el, index) => {
          gsap.to(el, {
            rotation: 360,
            duration: 20 + index * 5,
            repeat: -1,
            ease: "none",
            transformOrigin: "center center",
          });
        });
      }

      // Floating labels animation
      const floatingLabels = visualRef.current?.querySelectorAll(
        ".floating-label"
      );
      if (floatingLabels) {
        floatingLabels.forEach((label, index) => {
          gsap.to(label, {
            opacity: 1,
            y: -10,
            duration: 1,
            delay: 1 + index * 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: visualRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative mx-auto max-w-6xl px-6 py-16 md:py-24"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left column: Text content */}
        <div className="lg:col-span-6">
          <SectionHeading
            title="Mais velocidade, menos retrabalho. Marketing que funciona em ciclos."
          />

          <div ref={bodyRef} className="mt-8 space-y-6">
            <p className="text-body text-text-secondary leading-relaxed">
              Em vez de depender de ações isoladas, criamos fluxos contínuos de
              marketing apoiados por automação de IA e tecnologia. Isso reduz
              atrasos, elimina tarefas manuais e garante que cada campanha siga
              um processo claro — do planejamento à mensuração.
            </p>
            <p className="text-body text-text-secondary leading-relaxed">
              O resultado é mais agilidade na execução, ajustes mais rápidos e
              consistência nos resultados ao longo do tempo. Você deixa de
              "testar ideias" e passa a operar um sistema que evolui com dados
              reais.
            </p>
          </div>

          {/* Feature cards */}
          <div ref={cardsRef} className="mt-12 grid gap-4 sm:grid-cols-2">
            <Card>
              <div className="p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20">
                  <svg
                    className="h-5 w-5 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="font-display text-h3 text-text">
                  Automação de IA
                </h3>
                <p className="mt-2 text-small text-text-muted">
                  Reduz atrasos e elimina tarefas manuais
                </p>
              </div>
            </Card>

            <Card>
              <div className="p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent-2/20">
                  <svg
                    className="h-5 w-5 text-accent-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="font-display text-h3 text-text">
                  Evolução com dados
                </h3>
                <p className="mt-2 text-small text-text-muted">
                  Sistema que evolui com dados reais
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Right column: Visual representation */}
        <div ref={visualRef} className="lg:col-span-6">
          <div className="relative flex h-full min-h-[400px] items-center justify-center">
            {/* Cycle visualization */}
            <div className="relative h-80 w-80 md:h-96 md:w-96">
              {/* Outer cycle ring */}
              <div className="absolute inset-0 rounded-full border-2 border-border">
                <div className="cycle-item absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 rounded-full bg-accent shadow-lg shadow-accent/50" />
              </div>

              {/* Middle cycle ring */}
              <div className="cycle-item absolute inset-8 rounded-full border-2 border-accent-2/30">
                <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-accent-2 shadow-lg shadow-accent-2/50" />
              </div>

              {/* Inner cycle ring */}
              <div className="cycle-item absolute inset-16 rounded-full border-2 border-accent/20">
                <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-accent shadow-lg shadow-accent/50" />
              </div>

              {/* Connecting lines (subtle) */}
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 400 400"
              >
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--ds-accent)" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="var(--ds-accent-2)" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                <line
                  x1="200"
                  y1="0"
                  x2="200"
                  y2="200"
                  stroke="url(#lineGradient)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <line
                  x1="200"
                  y1="200"
                  x2="200"
                  y2="400"
                  stroke="url(#lineGradient)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              </svg>

              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Card>
                  <div className="p-6 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/20">
                      <svg
                        className="h-8 w-8 text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    </div>
                    <h3 className="font-display text-h3 text-text">
                      Ciclos contínuos
                    </h3>
                    <p className="mt-2 text-small text-text-muted">
                      Do planejamento à mensuração
                    </p>
                  </div>
                </Card>
              </div>

              {/* Floating elements */}
              <div className="floating-label absolute -right-4 top-1/4 rounded-xl border border-border bg-surface-2 p-3 opacity-0 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <p className="text-xs font-semibold text-text-secondary">
                    Planejamento
                  </p>
                </div>
              </div>
              <div className="floating-label absolute -left-4 bottom-1/4 rounded-xl border border-border bg-surface-2 p-3 opacity-0 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent-2" />
                  <p className="text-xs font-semibold text-text-secondary">
                    Mensuração
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
