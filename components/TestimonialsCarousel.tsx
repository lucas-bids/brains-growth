"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Draggable } from "gsap/dist/Draggable";

interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  text: string;
  source: "google" | "woba";
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

gsap.registerPlugin(Draggable);

function TestimonialSource({ source }: { source: Testimonial["source"] }) {
  if (source === "google") {
    return (
      <p className="flex items-center gap-1.5 text-xs text-text-muted">
        <span>Avaliação do</span>
        <span className="inline-flex items-center gap-1 text-text-secondary">
          <span
            aria-hidden="true"
            className="text-sm font-semibold leading-none text-transparent bg-[conic-gradient(from_0deg,_#4285F4_0deg_90deg,_#34A853_90deg_180deg,_#FBBC05_180deg_270deg,_#EA4335_270deg_360deg)] bg-clip-text"
          >
            G
          </span>
          <span>Google</span>
        </span>
      </p>
    );
  }

  return (
    <p className="flex items-center gap-1.5 text-xs text-text-muted">
      <span>Avaliação do</span>
      <span className="inline-flex items-center gap-1 text-text-secondary">
        <span
          aria-hidden="true"
          className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-sm bg-[#F6D232] text-[8px] font-bold uppercase text-ink"
        >
          W
        </span>
        <span>Woba</span>
      </span>
    </p>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function StarRating() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {[...Array(5)].map((_, i) => (
        <StarIcon key={i} className="h-4 w-4 text-accent" />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="flex w-[280px] shrink-0 flex-col rounded-2xl border border-border bg-surface p-5 md:w-[320px]">
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-surface-2">
          <Image
            src={testimonial.avatar}
            alt=""
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="truncate font-display text-small font-medium text-text">
            {testimonial.name}
          </p>
          <StarRating />
        </div>
      </div>
      <p className="mt-4 line-clamp-4 text-small leading-relaxed text-text-secondary">
        {testimonial.text}
      </p>
      <div className="mt-auto pt-4">
        <TestimonialSource source={testimonial.source} />
      </div>
    </article>
  );
}

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<Draggable | null>(null);
  const isDraggingRef = useRef(false);
  const tickRef = useRef<(() => void) | null>(null);

  // Duplicate for seamless loop
  const displayItems = [...testimonials, ...testimonials, ...testimonials];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth / 3;
      const wrapX = gsap.utils.wrap(-totalWidth, 0);
      const speedPerSecond = totalWidth / (testimonials.length * 1180);
      let currentX = 0;

      gsap.set(track, { x: currentX });

      const tick = () => {
        if (isDraggingRef.current) return;
        currentX = wrapX(currentX - speedPerSecond * gsap.ticker.deltaRatio(60));
        gsap.set(track, { x: currentX });
      };
      tickRef.current = tick;
      gsap.ticker.add(tick);

      const draggable = Draggable.create(track, {
        type: "x",
        trigger: track,
        allowNativeTouchScrolling: true,
        onPress() {
          isDraggingRef.current = true;
        },
        onDrag() {
          const wrappedX = wrapX(this.x);
          currentX = wrappedX;
          this.x = wrappedX;
          gsap.set(track, { x: wrappedX });
        },
        onRelease() {
          isDraggingRef.current = false;
        },
      })[0];

      draggableRef.current = draggable;
    });

    return () => {
      if (tickRef.current) {
        gsap.ticker.remove(tickRef.current);
        tickRef.current = null;
      }
      draggableRef.current?.kill();
      draggableRef.current = null;
      ctx.revert();
    };
  }, [testimonials.length]);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-bg to-transparent md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-bg to-transparent md:w-24" />

      <div ref={trackRef} className="flex w-max cursor-grab touch-pan-y gap-4 py-2 active:cursor-grabbing md:gap-6">
        {displayItems.map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.id}-${index}`}
            testimonial={testimonial}
          />
        ))}
      </div>
    </div>
  );
}
