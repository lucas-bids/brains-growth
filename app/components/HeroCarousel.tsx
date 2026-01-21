"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const IMAGES = [
  "/images/hero/01.jpg",
  "/images/hero/02.jpg",
  "/images/hero/03.jpg",
];

// Duplicate images to ensure a smooth loop
const DISPLAY_IMAGES = [...IMAGES, ...IMAGES, ...IMAGES, ...IMAGES];

export function HeroCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!trackRef.current) return;

    // Create the infinite loop
    const totalWidth = trackRef.current.scrollWidth / 2; // Half because we duplicated
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "none" },
      });

      tl.to(trackRef.current, {
        x: `-50%`,
        duration: 30,
      });

      timelineRef.current = tl;

      // Scroll-linked speed
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          // Increase speed based on scroll velocity
          const velocity = Math.abs(self.getVelocity());
          const speedBoost = Math.min(velocity / 100, 5); // Cap the boost
          gsap.to(tl, {
            timeScale: 1 + speedBoost,
            duration: 0.5,
            ease: "power2.out",
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX;
    const range = 250; // pixels
    const maxScale = 1.15;

    itemsRef.current.forEach((item) => {
      if (!item) return;
      const itemRect = item.getBoundingClientRect();
      const itemCenterX = itemRect.left + itemRect.width / 2;
      const distance = Math.abs(mouseX - itemCenterX);

      if (distance < range) {
        const scale = 1 + (maxScale - 1) * (1 - distance / range);
        gsap.to(item, {
          scale: scale,
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(item, {
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    });
  };

  const handleMouseLeave = () => {
    itemsRef.current.forEach((item) => {
      if (!item) return;
      gsap.to(item, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden py-12 select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={trackRef} className="flex w-max gap-6 px-3">
        {DISPLAY_IMAGES.map((src, index) => (
          <div
            key={`${src}-${index}`}
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
            className="relative h-[300px] w-[220px] shrink-0 overflow-hidden rounded-2xl border border-border bg-surface-2 md:h-[400px] md:w-[300px]"
          >
            <Image
              src={src}
              alt={`Project ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 220px, 300px"
              priority={index < 6}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
