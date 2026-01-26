"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Divider } from "./ui/Divider";

interface NavbarProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

const navLinks = [
  { href: "#color-system", label: "Color system" },
  { href: "#typography", label: "Typography" },
  { href: "#spacing-layout", label: "Spacing & layout" },
  { href: "#ui-elements", label: "UI elements" },
];

export function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        navRef.current &&
        dropdownRef.current &&
        !navRef.current.contains(target) &&
        !dropdownRef.current.contains(target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Close menu when clicking a nav link
  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-6 py-4">
        {/* Full-width pill nav: logo left | links + toggle right */}
        <nav
          ref={navRef}
          aria-label="Primary"
          className="relative flex w-full items-center justify-between rounded-full bg-surface/50 p-4 backdrop-blur-md transition-colors"
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

          {/* Desktop nav links + toggle (hidden on mobile) */}
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary transition hover:text-text"
              >
                {link.label}
              </a>
            ))}

            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-full bg-surface-2 px-3 py-1.5 text-sm font-medium text-text-secondary transition hover:text-text"
            >
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          </div>

          {/* Mobile hamburger button (visible only on mobile) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
            className="flex items-center justify-center rounded-full p-2 text-text-secondary transition hover:text-text md:hidden"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile dropdown menu */}
        {isMobileMenuOpen && (
          <div
            ref={dropdownRef}
            id="mobile-menu"
            className="mt-2 w-full rounded-xl bg-surface/50 p-4 backdrop-blur-md transition-all duration-200 md:hidden"
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map((link, index) => (
                <div key={link.href}>
                  <a
                    href={link.href}
                    onClick={handleNavLinkClick}
                    className="block py-3 text-sm text-text-secondary transition hover:text-text"
                  >
                    {link.label}
                  </a>
                  {index < navLinks.length - 1 && (
                    <Divider className="my-1" />
                  )}
                </div>
              ))}
              <Divider className="my-1" />
              <button
                type="button"
                onClick={() => {
                  toggleTheme();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full rounded-full bg-surface-2 px-3 py-2 text-left text-sm font-medium text-text-secondary transition hover:text-text"
              >
                {theme === "dark" ? "Light" : "Dark"} mode
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
