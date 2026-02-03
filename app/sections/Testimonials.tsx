"use client";

import { SectionHeading } from "../components/ui/SectionHeading";
import { TestimonialsCarousel } from "../components/TestimonialsCarousel";
import { Pill } from "../components/ui/Pill";

type TestimonialSource = "google" | "woba";

// Placeholder testimonials data
const TESTIMONIALS: {
  id: string;
  name: string;
  avatar: string;
  text: string;
  source: TestimonialSource;
}[] = [
  {
    id: "1",
    name: "Mariana Costa",
    avatar: "https://i.pravatar.cc/150?img=1",
    text: "A Brains Growth transformou completamente nossa estratégia digital. Em poucos meses, nosso ROI triplicou e finalmente entendemos nossos dados.",
    source: "google",
  },
  {
    id: "2",
    name: "Rafael Oliveira",
    avatar: "https://i.pravatar.cc/150?img=3",
    text: "Profissionalismo e resultados reais. A equipe entende tanto de marketing quanto de tecnologia, o que faz toda a diferença na execução.",
    source: "woba",
  },
  {
    id: "3",
    name: "Camila Ferreira",
    avatar: "https://i.pravatar.cc/150?img=5",
    text: "Depois de anos testando agências, finalmente encontrei um parceiro que entrega o que promete. Comunicação clara e entregas consistentes.",
    source: "google",
  },
  {
    id: "4",
    name: "Bruno Santos",
    avatar: "https://i.pravatar.cc/150?img=8",
    text: "O ciclo de marketing faz muito sentido. Antes, era tudo desconectado. Agora temos um processo claro que evolui com nossos dados.",
    source: "woba",
  },
  {
    id: "5",
    name: "Ana Paula Lima",
    avatar: "https://i.pravatar.cc/150?img=9",
    text: "Impressionada com a velocidade de execução. O que outras agências levavam semanas, eles entregam em dias com qualidade superior.",
    source: "google",
  },
  {
    id: "6",
    name: "Lucas Mendes",
    avatar: "https://i.pravatar.cc/150?img=11",
    text: "A integração entre canais foi game-changer para nós. Agora temos uma visão completa do funil e sabemos exatamente onde investir.",
    source: "woba",
  },
  {
    id: "7",
    name: "Fernanda Rocha",
    avatar: "https://i.pravatar.cc/150?img=16",
    text: "Equipe técnica e estratégica ao mesmo tempo. Raro encontrar quem entende de performance e também de branding.",
    source: "google",
  },
  {
    id: "8",
    name: "Pedro Almeida",
    avatar: "https://i.pravatar.cc/150?img=12",
    text: "Transparência total nos relatórios e métricas. Pela primeira vez, sei exatamente onde meu investimento está indo.",
    source: "woba",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <Pill tone="accent" pulse>
          Junte-se as centenas de clientes felizes
        </Pill>
        <SectionHeading
          title="Brains Growth é do grupo Brains, confiado por centenas de pessoas."
          description="A Brains Growth é o braço especializado em marketing digital do grupo Brains. Faça parte você também."
          align="center"
          spacing="hero"
        />
      </div>

      <div className="mt-10 md:mt-14">
        <TestimonialsCarousel testimonials={TESTIMONIALS} />
      </div>
    </section>
  );
}
