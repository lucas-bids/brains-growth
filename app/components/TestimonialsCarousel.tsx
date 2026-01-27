"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  text: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
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
    <article className="flex w-[280px] shrink-0 flex-col gap-4 rounded-2xl border border-border bg-surface p-5 md:w-[320px]">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-surface-2">
          <img
            src={testimonial.avatar}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="min-w-0">
          <p className="truncate font-display text-small font-medium text-text">
            {testimonial.name}
          </p>
          <StarRating />
        </div>
      </div>
      <p className="line-clamp-4 text-small leading-relaxed text-text-secondary">
        {testimonial.text}
      </p>
    </article>
  );
}

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Duplicate for seamless loop
  const displayItems = [...testimonials, ...testimonials, ...testimonials];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      // Calculate the width of one set of testimonials
      const totalWidth = track.scrollWidth / 3;

      // Infinite loop at constant speed
      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
      tl.to(track, {
        x: -totalWidth,
        duration: testimonials.length * 8, // ~8s per card for smooth movement
      });

      timelineRef.current = tl;
    });

    return () => ctx.revert();
  }, [testimonials.length]);

  const handleMouseEnter = () => {
    if (timelineRef.current) {
      gsap.to(timelineRef.current, { timeScale: 0, duration: 0.4, ease: "power2.out" });
    }
  };

  const handleMouseLeave = () => {
    if (timelineRef.current) {
      gsap.to(timelineRef.current, { timeScale: 1, duration: 0.4, ease: "power2.out" });
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-bg to-transparent md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-bg to-transparent md:w-24" />

      <div ref={trackRef} className="flex w-max gap-4 py-2 md:gap-6">
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
