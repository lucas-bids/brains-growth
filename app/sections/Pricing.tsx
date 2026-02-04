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
  pricePromo?: string;
  features: string[];
  cta: string;
}[] = [
  {
    pill: "Produto de entrada",
    pillTone: "neutral",
    title: "Mentoria / Diagnóstico (entrada)",
    price: "R$ 1.500",
    pricePromo: "R$ 750",
    features: [
      "Pra quem: pequeno empresário, profissional liberal, prestador de serviço, loja local",
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
    title: "Consultoria Mensal (recorrência)",
    price: "R$ 6.000/mês (1ª parcela) • depois do 2º mês: R$ 3.500/mês",
    features: [
      "Pra quem: empresa que já fatura e quer previsibilidade de marketing",
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
    title: "Growth / Marketing as a Service (premium)",
    price: "R$ 8.000 a R$ 12.000/mês",
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
    <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="text-center">
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
              <Pill tone={card.pillTone}>{card.pill}</Pill>
              <h3 className="font-display text-h3 text-text mt-1">{card.title}</h3>
              <div className="mt-4">
                {card.pricePromo ? (
                  <p className="text-body text-text">
                    <span className="text-text-muted line-through">{card.price}</span>
                    <span className="ml-2 font-semibold">promo 50% off: {card.pricePromo}</span>
                  </p>
                ) : (
                  <p className="font-display text-body font-semibold text-text">{card.price}</p>
                )}
              </div>
              <Divider className="my-6" />
              <ul className="flex flex-1 flex-col gap-3">
                {card.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-small text-text-secondary">
                    <span className="mt-0.5 shrink-0 rounded-full bg-accent/20 p-0.5">
                      <Check className="h-3.5 w-3.5 text-accent" strokeWidth={2.5} />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button variant="secondary" className="w-full">
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
