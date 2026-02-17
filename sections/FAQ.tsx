 "use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FAQ_ITEMS = [
  {
    question: "O que acontece na avaliação inicial gratuita?",
    answer:
      "Fazemos um diagnóstico rápido do seu marketing atual, alinhamos objetivos e identificamos os gargalos principais. Você sai com um caminho claro do que priorizar agora.",
  },
  {
    question: "Em quanto tempo vejo resultados?",
    answer:
      "Depende do ponto de partida e do canal. Em geral, os primeiros ganhos aparecem após as primeiras otimizações e ajustes de campanha, enquanto resultados consistentes vêm com o ciclo contínuo de melhoria.",
  },
  {
    question: "Preciso ter time interno para começar?",
    answer:
      "Não necessariamente. A consultoria se adapta ao seu estágio. Se você tiver time, organizamos prioridades e execução. Se não tiver, orientamos o que terceirizar e como medir.",
  },
  {
    question: "Quais canais vocês trabalham?",
    answer:
      "Planejamos presença em Meta e Google, conteúdo orgânico, SEO e novos formatos orientados por IA. O foco é coordenar canais para reduzir esforço duplicado e gerar demanda.",
  },
  {
    question: "Qual a diferença entre mentoria, consultoria mensal e growth?",
    answer:
      "A mentoria entrega diagnóstico e plano de ação. A consultoria mensal acompanha indicadores e otimiza campanhas de forma recorrente. O growth é o nível mais completo, com planejamento e execução contínua.",
  },
  {
    question: "Vocês trabalham com metas e métricas?",
    answer:
      "Sim. Acompanhamos indicadores como leads, custo por lead e conversão. A ideia é sair do achismo e operar com dados reais e evolução constante.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);
  const prevIndexRef = useRef<number | null>(null);

  useEffect(() => {
    contentRefs.current.forEach((el, index) => {
      if (!el) return;
      if (openIndex === index) {
        gsap.set(el, { height: "auto", opacity: 1 });
      } else {
        gsap.set(el, { height: 0, opacity: 0 });
      }
    });
  }, []);

  useEffect(() => {
    const prevIndex = prevIndexRef.current;
    const nextIndex = openIndex;

    if (prevIndex !== null && prevIndex !== nextIndex) {
      const prevEl = contentRefs.current[prevIndex];
      if (prevEl) {
        gsap.to(prevEl, {
          height: 0,
          opacity: 0,
          duration: 0.25,
          ease: "power2.out",
        });
      }
    }

    if (nextIndex !== null) {
      const nextEl = contentRefs.current[nextIndex];
      if (nextEl) {
        gsap.fromTo(
          nextEl,
          { height: 0, opacity: 0 },
          {
            height: "auto",
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          }
        );
      }
    }

    prevIndexRef.current = nextIndex;
  }, [openIndex]);

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 pt-24 md:pt-48">
      <div className="mx-auto max-w-xl text-center">
        <SectionHeading
          title="Perguntas frequentes"
          description="Respostas rápidas para dúvidas comuns antes de começar."
          align="center"
          spacing="default"
        />
      </div>

      <div className="mt-10 space-y-4">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={item.question} className="rounded-2xl border border-border bg-surface">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
                aria-expanded={isOpen}
                onClick={() =>
                  setOpenIndex((current) => (current === index ? null : index))
                }
              >
                <span className="font-display text-h3 text-text">{item.question}</span>
                <span
                  className={`text-text-muted transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>
              <div
                ref={(el) => {
                  contentRefs.current[index] = el;
                }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 text-body text-text-secondary leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
