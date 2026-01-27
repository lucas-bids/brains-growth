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
const DOCK_MAX_SCALE = 1.2;

export function HeroCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      const items = itemsRef.current.filter(Boolean) as HTMLDivElement[];
      const firstItem = items[0];

      // Infinite loop (keep it simple and stable)
      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
      tl.to(track, { x: "-50%", duration: 30 });
      tl.timeScale(BASE_SPEED);
      timelineRef.current = tl;

      let cleanupDock: (() => void) | undefined;

      if (firstItem) {
        let min = 0;
        let max = 0;
        let bound = 0;

        const updateMetrics = () => {
          const rect = firstItem.getBoundingClientRect();
          const styles = window.getComputedStyle(track);
          const gap =
            parseFloat(styles.columnGap || styles.gap || "0") || 0;
          min = rect.width + gap;
          max = min * DOCK_MAX_SCALE;
          bound = min * Math.PI;
        };

        updateMetrics();

        gsap.set(items, {
          transformOrigin: "50% 120%",
        });

        const updateIcons = (pointer: number) => {
          for (let i = 0; i < items.length; i += 1) {
            const icon = items[i];
            const distance = i * min + min / 2 - pointer;
            let x = 0;
            let scale = 1;

            if (-bound < distance && distance < bound) {
              const rad = (distance / min) * 0.5;
              const alpha = 1.4;
              scale = 1 + (max / min - 1) * Math.exp(-alpha * rad * rad);
              x = 2 * (max - min) * Math.sin(rad);
            } else {
              x = (-bound < distance ? 2 : -2) * (max - min);
            }

            gsap.to(icon, {
              duration: 0.3,
              x,
              scale,
              overwrite: "auto",
            });
          }
        };

        const handleMove = (event: MouseEvent) => {
          const offset =
            track.getBoundingClientRect().left + firstItem.offsetLeft;
          updateIcons(event.clientX - offset);
        };

        const handleLeave = () => {
          gsap.to(items, {
            duration: 0.3,
            scale: 1,
            x: 0,
            overwrite: "auto",
          });
        };

        track.addEventListener("mousemove", handleMove);
        track.addEventListener("mouseleave", handleLeave);
        window.addEventListener("resize", updateMetrics);

        cleanupDock = () => {
          track.removeEventListener("mousemove", handleMove);
          track.removeEventListener("mouseleave", handleLeave);
          window.removeEventListener("resize", updateMetrics);
        };
      }

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
        cleanupDock?.();
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden pt-24 pb-0 select-none"
    >
      <div ref={trackRef} className="flex w-max gap-8 px-3">
        {DISPLAY_IMAGES.map((src, index) => (
          <div
            key={`${src}-${index}`}
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
            className="relative h-[230px] w-[120px] shrink-0 overflow-hidden rounded-2xl border border-border bg-surface-2 md:h-[300px] md:w-[220px]"
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
