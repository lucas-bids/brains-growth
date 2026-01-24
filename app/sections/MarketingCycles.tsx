"use client";

import { useRef } from "react";
import { Card } from "../components/ui/Card";
import { SectionHeading } from "../components/ui/SectionHeading";

export function MarketingCycles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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
        <div className="lg:col-span-6 flex items-center justify-center">
          <div className="aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-border">
            <video
              src="/images/video-beneficios.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
