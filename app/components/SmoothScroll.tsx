"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// Register plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

interface SmoothScrollProps {
  children: React.ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    // Create ScrollSmoother instance
    smootherRef.current = ScrollSmoother.create({
      smooth: 1, // seconds to "catch up" to native scroll position
      effects: true, // looks for data-speed and data-lag attributes
      smoothTouch: 0.1, // shorter smoothing on touch devices
    });

    // Refresh ScrollTrigger after setup
    ScrollTrigger.refresh();

    return () => {
      // Cleanup on unmount
      smootherRef.current?.kill();
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
