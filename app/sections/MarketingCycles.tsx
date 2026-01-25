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
  const sectionRef = useRef<HTMLDivElement>(null);

  // Right visual (pinned + pointer-driven tilt)
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoOuterRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Left column (not required for pinning)
  const leftColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const container = videoContainerRef.current;
    const outer = videoOuterRef.current;
    const canvas = canvasRef.current;

    if (!sectionEl || !container || !outer || !canvas) return;

    gsap.registerPlugin(ScrollTrigger);

    const isCoarse = window.matchMedia("(pointer: coarse)").matches;

    const ctx = gsap.context(() => {
      // Perspective belongs to the pinned container
      gsap.set(container, { perspective: 700 });

      // --- Image sequence (GSAP helper) ---
      const frameCount = 237;

      const urls = new Array(frameCount)
        .fill(0)
        .map(
          (_, i) =>
            `/images/sequence/screenshot_${String(i + 1).padStart(3, "0")}.jpg`
        );

      // Optional improvement (recommended): only tilt while section is active
      let isActive = false;

      imageSequence({
        urls,
        canvas,
        scrollTrigger: {
          trigger: sectionEl,
          start: "top top+=96",
          end: "bottom bottom-=96",
          scrub: true,
          pin: container, // pin + scrub in ONE ScrollTrigger
          pinSpacing: true,
          invalidateOnRefresh: true,
          onEnter: () => (isActive = true),
          onEnterBack: () => (isActive = true),
          onLeave: () => {
            isActive = false;
            handlePointerLeave();
          },
          onLeaveBack: () => {
            isActive = false;
            handlePointerLeave();
          },
        },
      });

      // Tilt should be optional, but sequence should always run.
      if (isCoarse) return;

      const outerRX = gsap.quickTo(outer, "rotationX", {
        ease: "power3",
        duration: 0.4,
      });
      const outerRY = gsap.quickTo(outer, "rotationY", {
        ease: "power3",
        duration: 0.4,
      });
      const innerX = gsap.quickTo(canvas, "x", {
        ease: "power3",
        duration: 0.4,
      });
      const innerY = gsap.quickTo(canvas, "y", {
        ease: "power3",
        duration: 0.4,
      });

      // Extra bleed for tilt
      gsap.set(canvas, { scale: 1.12, transformOrigin: "center center" });

      const handlePointerMove = (e: PointerEvent) => {
        if (!isActive) return;

        const xNorm = e.clientX / window.innerWidth;
        const yNorm = e.clientY / window.innerHeight;

        outerRX(gsap.utils.interpolate(25, -25, yNorm));
        outerRY(gsap.utils.interpolate(-25, 25, xNorm));

        innerX(gsap.utils.interpolate(-25, 25, xNorm));
        innerY(gsap.utils.interpolate(-25, 25, yNorm));
      };

      function handlePointerLeave() {
        outerRX(0);
        outerRY(0);
        innerX(0);
        innerY(0);
      }

      // Track pointer anywhere
      window.addEventListener("pointermove", handlePointerMove);

      // Reset when leaving the section (extra safety; ScrollTrigger also resets)
      sectionEl.addEventListener("pointerleave", handlePointerLeave);

      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
        sectionEl.removeEventListener("pointerleave", handlePointerLeave);
      };
    }, sectionEl);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto max-w-6xl px-6 py-16 md:py-24"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* LEFT */}
        <div ref={leftColRef} className="lg:col-span-6 space-y-32">
          {/* Block 1 */}
          <div>
            <Pill tone="accent" pulse>
              Avaliação inicial gratuita
            </Pill>

            <SectionHeading title="Mais velocidade, menos retrabalho. Marketing que funciona em ciclos." />

            <div className="mt-8 space-y-6">
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

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
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

          {/* Block 2 */}
          <MarketingBlock title="Decisões melhores, baseadas em experiência prática.">
            <p>
              Seu marketing é acompanhado por profissionais com vivência real em
              marketing, dados e desenvolvimento. Isso significa menos ruído na
              comunicação, análises mais precisas e recomendações que levam em
              conta limitações técnicas, orçamento e contexto de negócio.
            </p>
            <p>
              Não é apenas sobre o que fazer, mas sobre o que faz sentido fazer
              agora — e o que deve esperar.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <div className="p-5">
                  <h3 className="font-display text-h3 text-text">
                    Visão técnica + marketing
                  </h3>
                  <p className="mt-2 text-small text-text-muted">
                    Decisões considerando stack, dados e execução real.
                  </p>
                </div>
              </Card>
              <Card>
                <div className="p-5">
                  <h3 className="font-display text-h3 text-text">
                    Prioridade correta
                  </h3>
                  <p className="mt-2 text-small text-text-muted">
                    Foco no que gera impacto agora.
                  </p>
                </div>
              </Card>
            </div>
          </MarketingBlock>

          {/* Block 3 */}
          <MarketingBlock title="Sua marca visível nos canais certos, de forma coordenada.">
            <p>
              Planejamos e acompanhamos sua presença nos principais pontos de
              contato: anúncios em Meta e Google, conteúdo orgânico, SEO e novos
              formatos orientados por IA (como LEO). Tudo funciona de forma
              integrada, evitando esforços duplicados ou mensagens desconectadas.
            </p>
            <p>
              Cada canal tem um papel claro dentro da estratégia, contribuindo
              para geração de demanda e conversão — não apenas “marcando
              presença”.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <div className="p-5">
                  <h3 className="font-display text-h3 text-text">
                    Estratégia integrada
                  </h3>
                  <p className="mt-2 text-small text-text-muted">
                    Mensagens coerentes em todos os canais.
                  </p>
                </div>
              </Card>
              <Card>
                <div className="p-5">
                  <h3 className="font-display text-h3 text-text">
                    Papel claro por canal
                  </h3>
                  <p className="mt-2 text-small text-text-muted">
                    Aquisição, nutrição e conversão bem definidas.
                  </p>
                </div>
              </Card>
            </div>
          </MarketingBlock>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-6">
          <div
            ref={videoContainerRef}
            className="top-0 flex items-center justify-center"
          >
            <div
              ref={videoOuterRef}
              className="aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-border"
            >
              <canvas ref={canvasRef} className="h-full w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function imageSequence(config: any) {
  const playhead = { frame: 0 };
  const canvas =
    gsap.utils.toArray(config.canvas)[0] || console.warn("canvas not defined");

  if (!canvas) return gsap.to({}, { duration: 0 });

  const ctx = (canvas as HTMLCanvasElement).getContext("2d");
  if (!ctx) return gsap.to({}, { duration: 0 });

  let curFrame = -1;
  const onUpdate = config.onUpdate;
  let images: HTMLImageElement[];

  const resizeCanvasToDisplaySize = () => {
    const c = canvas as HTMLCanvasElement;
    const dpr = Math.max(1, window.devicePixelRatio || 1);

    const displayWidth = Math.round(c.clientWidth * dpr);
    const displayHeight = Math.round(c.clientHeight * dpr);

    if (c.width !== displayWidth || c.height !== displayHeight) {
      c.width = displayWidth;
      c.height = displayHeight;
    }
  };

  const updateImage = () => {
    const frame = Math.round(playhead.frame);
    if (frame === curFrame) return;

    const img = images[frame];
    if (!img) return;

    // Ensure the drawing buffer matches the CSS size (prevents stretching)
    resizeCanvasToDisplaySize();

    const c = canvas as HTMLCanvasElement;

    const cw = c.width;
    const ch = c.height;
    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;

    // COVER fit (fills canvas; may crop slightly). No stretching.
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);

    curFrame = frame;
    onUpdate && onUpdate(frame, img);
  };

  images = config.urls.map((url: string, i: number) => {
    const img = new Image();
    img.src = url;
    if (i === 0) img.onload = updateImage;
    return img;
  });

  const handleResize = () => updateImage();
  window.addEventListener("resize", handleResize);

  return gsap.to(playhead, {
    frame: images.length - 1,
    ease: "none",
    onUpdate: updateImage,
    duration: images.length / (config.fps || 30),
    paused: !!config.paused,
    scrollTrigger: config.scrollTrigger,
    onKill: () => {
      window.removeEventListener("resize", handleResize);
    },
  });
}
