"use client";

import { Check } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Pill } from "../components/ui/Pill";
import { Button } from "../components/ui/Button";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Divider } from "../components/ui/Divider";

type PillTone = "neutral" | "accent" | "accent2";

const PRICING_CARDS: {
  pill: string;
  pillTone: PillTone;
  title: string;
  price: string;
  priceAbove: React.ReactNode;
  subtitle: string;
  features: string[];
  cta: string;
}[] = [
  {
    pill: "Serviço básico",
    pillTone: "neutral",
    title: "Mentoria",
    price: "R$ 750",
    priceAbove: (
      <>
        <span className="line-through text-text-muted">R$ 1.500</span>{" "}
        <span className="text-text font-medium">promo 50% off</span>
      </>
    ),
    subtitle: "Para pequenos empresários e negócios",
    features: [
      "Diagnóstico + plano de ação (30 dias)",
      "1 reunião de 60–90 min",
      "Entrega em PDF/Doc",
      "1 call de acompanhamento (30 min, 7 dias depois)",
    ],
    cta: "Agendar diagnóstico",
  },
  {
    pill: "Recorrência",
    pillTone: "accent",
    title: "Consultoria Mensal",
    price: "R$ 3.500/mês",
    priceAbove: "a partir de",
    subtitle: "Para empresas que já faturam e querem previsibilidade de marketing",
    features: [
      "2 reuniões/mês (60 min)",
      "Acompanhamento de indicadores (leads, custo por lead, conversão)",
      "Planejamento de campanhas e conteúdo",
      'Revisão de anúncios e criação de 1 landing page (sem você virar "agência full")',
      "Revisão das demais landing pages",
    ],
    cta: "Falar sobre consultoria",
  },
  {
    pill: "Premium",
    pillTone: "accent2",
    title: "Growth",
    price: "R$ 8.000",
    priceAbove: "a partir de",
    subtitle: "Para empresas em expansão rápida",
    features: [
      "1 reunião semanal (ou quinzenal)",
      "Planejamento + funil + copys",
      "Melhorias de LP ou criação de LP novas",
      "Gestão de tráfego (ou coordenação do tráfego)",
      "CRM básico / WhatsApp / automações simples",
      "Relatório mensal com próximos testes",
    ],
    cta: "Solicitar proposta",
  },
];

export function Pricing() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-48">
      <div className="mx-auto text-center max-w-xl">
        <Pill tone="accent" pulse>
          Avaliação sem custo
        </Pill>
        <SectionHeading
          title="Escolha o nível de suporte ideal para o seu momento"
          description="Do diagnóstico com plano de ação em 30 dias à consultoria mensal e ao modelo premium com execução e responsabilidade por metas."
          align="center"
          spacing="default"
        />
      </div>

      <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3">
        {PRICING_CARDS.map((card) => (
          <Card key={card.title}>
            <div className="flex h-full flex-col p-6">
              <span className="w-fit">
                <Pill tone={card.pillTone}>{card.pill}</Pill>
              </span>
              <h3 className="font-display text-h3 text-text mt-1">{card.title}</h3>
              <div className="mt-4">
                <div className="flex flex-col gap-0.5">
                  <div className="text-body text-text-muted">{card.priceAbove}</div>
                  <p className="font-display text-display font-semibold text-text">{card.price}</p>
                </div>
              </div>
              <p className="mt-2 text-small text-text-muted">{card.subtitle}</p>
              <Divider className="my-6" />
              <ul className="flex flex-1 flex-col gap-3">
                {card.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-small text-text-secondary"
                  >
                    <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent/20">
                      <Check className="h-3.5 w-3.5 text-accent" strokeWidth={2.5} />
                    </span>

                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button
                  variant={
                    card.pillTone === "accent"
                      ? "primary"
                      : card.pillTone === "accent2"
                        ? "accent2"
                        : "secondary"
                  }
                  className="h-12 w-full text-base md:h-14"
                >
                  {card.cta}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
