"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

const IMAGES = ["/images/hero/01.jpg", "/images/hero/02.jpg", "/images/hero/03.jpg"];

// Duplicate images to ensure a smooth loop
const DISPLAY_IMAGES = [...IMAGES, ...IMAGES, ...IMAGES, ...IMAGES];

// Base motion tuning
const BASE_SPEED = 0.9; // resting timeScale
const MAX_SPEED = 15; // cap
const VELOCITY_TO_SCALE = 0.025; // px/sec -> timeScale delta (tune)
const DEAD_ZONE = 80; // px/sec; ignore tiny velocities (reduces jitter)
const EASE_TO_TARGET = 0.2; // seconds; how quickly timeScale eases to target

export function HeroCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      // Infinite loop (keep it simple and stable)
      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
      tl.to(track, { x: "-50%", duration: 30 });
      tl.timeScale(BASE_SPEED);
      timelineRef.current = tl;

      // Smooth timeScale setter (prevents "clunky" per-frame snapping)
      const proxy = { ts: BASE_SPEED };
      const applyTS = () => {
        tl.timeScale(proxy.ts);
      };

      const setTS = gsap.quickTo(proxy, "ts", {
        duration: EASE_TO_TARGET,
        ease: "power3.out",
        onUpdate: applyTS,
      });

      // Low-pass filter on velocity (prevents jitter from tiny velocity changes)
      let velLP = 0;

      const updateSpeed = () => {
        const smoother = ScrollSmoother.get();
        if (!smoother) return;

        // ScrollSmoother velocity is typically px/sec
        const v = smoother.getVelocity();
        const vAbs = Math.abs(v);

        // Frame-rate independent smoothing:
        // alpha ~= how much we move toward the new value each tick
        const dt = gsap.ticker.deltaRatio(60); // 1 at 60fps, 2 at 30fps, etc.
        const alpha = 1 - Math.pow(1 - 0.18, dt); // tune 0.18 for smoothing strength

        velLP += (vAbs - velLP) * alpha;

        // Dead zone to avoid micro speed changes while "not really scrolling"
        const effectiveVel = velLP < DEAD_ZONE ? 0 : velLP - DEAD_ZONE;

        // Map velocity -> timeScale
        const target =
          BASE_SPEED + effectiveVel * VELOCITY_TO_SCALE;

        const clamped = gsap.utils.clamp(BASE_SPEED, MAX_SPEED, target);

        // Ease to target timeScale
        setTS(clamped);
      };

      gsap.ticker.add(updateSpeed);

      return () => {
        gsap.ticker.remove(updateSpeed);
        tl.kill();
      };
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
        gsap.to(item, { scale, duration: 0.4, ease: "expoScale.out" });
      } else {
        gsap.to(item, { scale: 1, duration: 0.4, ease: "expoScale.out" });
      }
    });
  };

  const handleMouseLeave = () => {
    itemsRef.current.forEach((item) => {
      if (!item) return;
      gsap.to(item, { scale: 1, duration: 0.4, ease: "power2.out" });
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden pt-18 pb-0 select-none"
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
