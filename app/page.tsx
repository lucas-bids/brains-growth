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
  // Theme state: dark is the default for this project
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Sync with localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
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
        <main className="pt-24">
          <Hero />
          <MarketingCycles />
          <Testimonials />
          <Pricing />
        </main>

        {/* Footer or other sections would go here */}
        <footer className="mx-auto max-w-6xl px-6 py-12">
          <hr className="border-divider mb-8" />
          <p className="text-small text-text-muted text-center">
            © 2026 Brains Growth. Todos os direitos reservados.
          </p>
        </footer>

        {/* Landing zone for CTA morph: reserves space at page end */}
        <div
          id="cta-landing-zone"
          className="min-h-[140px] w-full px-4 md:min-h-[160px] md:px-6"
        />
      </SmoothScroll>

      <FloatingCTA />
    </div>
  );
}
