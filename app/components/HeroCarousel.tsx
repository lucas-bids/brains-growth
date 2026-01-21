"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const IMAGES = [
  "/images/hero/01.jpg",
  "/images/hero/02.jpg",
  "/images/hero/03.jpg",
];

// Duplicate images to ensure a smooth loop
const DISPLAY_IMAGES = [...IMAGES, ...IMAGES, ...IMAGES, ...IMAGES];

// Scroll speed settings
const BASE_SPEED = 0.5;
const SCROLL_SPEED = 18;
const SCROLL_STOP_DELAY = 50; // ms to wait before considering scroll "stopped"

export function HeroCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!trackRef.current) return;

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

    // Scroll event handler
    const handleScroll = () => {
      // Speed up while scrolling
      gsap.to(tl, {
        timeScale: SCROLL_SPEED,
        duration: 0.4,
        ease: "expo.out",
      });

      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set timeout to restore normal speed when scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        gsap.to(tl, {
          timeScale: BASE_SPEED,
          duration: 1.2,
          ease: "expoScale.out",
        });
      }, SCROLL_STOP_DELAY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      tl.kill();
    };
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
