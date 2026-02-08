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
    name: "Wellington Borges",
    avatar: "https://i.pravatar.cc/150?img=1",
    text: "Excelente espaço, atendimento humanizado, local seguro e localização estratégica.",
    source: "google",
  },
  {
    id: "2",
    name: "Gabriela Carmona",
    avatar: "https://i.pravatar.cc/150?img=2",
    text: "Um excelente espaço para compartilhar ideias, projetos e oportunidades de negócios.",
    source: "google",
  },
  {
    id: "3",
    name: "Christian Bundt",
    avatar: "https://i.pravatar.cc/150?img=3",
    text: "Ambiente incrível, com diversas comodidades e espaços. Vibe super positiva.",
    source: "google",
  },
  {
    id: "4",
    name: "Revisor do Woba",
    avatar: "https://i.pravatar.cc/150?img=4",
    text: "Excelente local, muito organizado, copa completa e espaços bem cuidados.",
    source: "woba",
  },
  {
    id: "5",
    name: "Simone Oliveira",
    avatar: "https://i.pravatar.cc/150?img=5",
    text: "Fui super bem atendida e as pessoas são super simpáticas! Um ótimo lugar para fazer networking.",
    source: "google",
  },
  {
    id: "6",
    name: "Acp David",
    avatar: "https://i.pravatar.cc/150?img=6",
    text: "Apaixonada pelo Brains e sua filosofia... Toda a estrutura é pensada para INSPIRAR. Equipe comprometida.",
    source: "google",
  },
  {
    id: "7",
    name: "M K",
    avatar: "https://i.pravatar.cc/150?img=7",
    text: "Ótimo ambiente, sem contar o atendimento que é nota 10, funcionários muito educados, preços maravilhosos, muito bom voltarei mais vezes.",
    source: "google",
  },
  {
    id: "8",
    name: "Aline França",
    avatar: "https://i.pravatar.cc/150?img=8",
    text: "Que lugar mais acolhedor! Simplesmente encantada! Espaço agradável, limpo, super organizado e receptivo!",
    source: "google",
  },
];

export function Testimonials() {
  return (
    <section className="pt-24 md:pt-48">
      <div className="mx-auto max-w-xl px-6 text-center">
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
