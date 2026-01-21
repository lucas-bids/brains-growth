"use client";

import Image from "next/image";

interface NavbarProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

export function Navbar({ theme, toggleTheme }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-6 py-4">
        {/* Full-width pill nav: logo left | links + toggle right */}
        <nav
          aria-label="Primary"
          className="flex w-full items-center justify-between rounded-full bg-surface/50 p-4 backdrop-blur-md transition-colors"
        >
          {/* Logo */}
          <Image
            src="/images/logo-green.png"
            alt="Brains Coworking"
            width={160}
            height={40}
            className="h-10 w-auto"
            priority
          />

          {/* Nav links + toggle grouped on the right */}
          <div className="flex items-center gap-6">
            <a
              href="#color-system"
              className="text-sm text-text-secondary transition hover:text-text"
            >
              Color system
            </a>
            <a
              href="#typography"
              className="text-sm text-text-secondary transition hover:text-text"
            >
              Typography
            </a>
            <a
              href="#spacing-layout"
              className="text-sm text-text-secondary transition hover:text-text"
            >
              Spacing & layout
            </a>
            <a
              href="#ui-elements"
              className="text-sm text-text-secondary transition hover:text-text"
            >
              UI elements
            </a>

            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-full bg-surface-2 px-3 py-1.5 text-sm font-medium text-text-secondary transition hover:text-text"
            >
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
