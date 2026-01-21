"use client";

import { useEffect, useRef } from "react";
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

// Scroll speed settings
const BASE_SPEED = 0.5;
const VELOCITY_FACTOR = 0.02; // How much scroll velocity affects the speed
const RETURN_DURATION = 1.2; // How long it takes to return to base speed

export function HeroCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const ctx = gsap.context(() => {
      // Create the infinite loop timeline
      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "none" },
      });

      tl.to(trackRef.current, {
        x: `-50%`,
        duration: 30,
      });

      timelineRef.current = tl;

      // Proportional Scroll-linked speed
      ScrollTrigger.create({
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity()); // pixels per second
          const targetTimeScale = BASE_SPEED + velocity * VELOCITY_FACTOR;

          // Animate to the new speed quickly
          gsap.to(tl, {
            timeScale: targetTimeScale,
            duration: 0.4,
            ease: "expo.out",
            overwrite: "auto",
          });

          // Create a "return to base" tween that starts after a tiny delay
          // and will be overwritten if more scroll updates happen
          gsap.to(tl, {
            timeScale: BASE_SPEED,
            duration: RETURN_DURATION,
            ease: "power2.inOut",
            delay: 0.1,
            overwrite: false,
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
          ease: "expoScale.out",
        });
      } else {
        gsap.to(item, {
          scale: 1,
          duration: 0.4,
          ease: "expoScale.out",
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
