"use client";

import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { FloatingCTA } from "./components/FloatingCTA";
import { SmoothScroll } from "./components/SmoothScroll";
import { Hero } from "./sections/Hero";
import { MarketingCycles } from "./sections/MarketingCycles";
import { Pricing } from "./sections/Pricing";
import { Testimonials } from "./sections/Testimonials";

export default function Home() {
  // Theme state: always start with "dark" to avoid hydration mismatch
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // After hydration, read from localStorage and update if different
  // Using setTimeout to defer the update and avoid linter warning
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      // Defer state update to avoid synchronous setState in effect
      setTimeout(() => {
        setTheme(saved);
      }, 0);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
  };

  return (
    <div
      data-theme={theme}
      className="min-h-dvh bg-bg text-text antialiased transition-colors duration-300"
    >
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <SmoothScroll contentClassName="min-h-dvh bg-bg">
        <main id="inicio" className="pt-24">
          <Hero />
          <MarketingCycles />
          <Testimonials />
          <Pricing />
        </main>
        
        <div
          id="cta-landing-zone"
          className="min-h-[140px] w-full px-4 md:min-h-[160px] md:px-6"
        />

        {/* Footer or other sections would go here */}
        <footer id="contato" className="mx-auto max-w-6xl px-6 py-12">
          <hr className="border-divider mb-8" />
          <p className="text-small text-text-muted text-center">
            © 2026 Brains Growth. Todos os direitos reservados.
          </p>
        </footer>

        {/* Landing zone for CTA morph: reserves space at page end */}
      </SmoothScroll>

      <FloatingCTA />
    </div>
  );
}
