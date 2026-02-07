"use client";

import { useState, useEffect, useRef, type MouseEvent as ReactMouseEvent } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Divider } from "./ui/Divider";

interface NavbarProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

type NavLink = {
  href: string;
  label: string;
  scrollTarget?: "#inicio" | "#contato";
  external?: boolean;
};

const navLinks: NavLink[] = [
  { href: "#inicio", label: "Início", scrollTarget: "#inicio" },
  {
    href: "https://brainscoworking.com.br/politica-de-privacidade/",
    label: "Política de privacidade",
    external: true,
  },
  { href: "#contato", label: "Contato", scrollTarget: "#contato" },
];

export function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleClickOutside = (event: globalThis.MouseEvent) => {
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

  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin);
  }, []);

  const scrollToSection = (target: "#inicio" | "#contato") => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: target, autoKill: true },
      ease: "power3.out",
    });
  };

  // Close menu when clicking a nav link
  const handleNavLinkClick = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    link: NavLink
  ) => {
    if (link.scrollTarget) {
      event.preventDefault();
      scrollToSection(link.scrollTarget);
    }
    setIsMobileMenuOpen(false);
  };

  const themeIcon =
    theme === "dark" ? (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <circle cx="12" cy="12" r="4" />
        <line x1="12" y1="2" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="22" />
        <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
        <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
        <line x1="2" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="22" y2="12" />
        <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
        <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
      </svg>
    ) : (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
      </svg>
    );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-6 py-4">
        {/* Full-width pill nav: logo left | links + toggle right */}
        <nav
          ref={navRef}
          aria-label="Primary"
          className="relative flex w-full items-center justify-between rounded-full bg-surface/50 p-4 border border-border backdrop-blur-md transition-colors"
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
                onClick={(event) => handleNavLinkClick(event, link)}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-sm text-text-secondary transition hover:text-text"
              >
                {link.label}
              </a>
            ))}

            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Alternar tema"
              className="rounded-full bg-surface-2 px-3 py-1.5 text-sm font-medium text-text-secondary transition hover:text-text"
            >
              {themeIcon}
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
                    onClick={(event) => handleNavLinkClick(event, link)}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
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
                aria-label="Alternar tema"
                className="w-full rounded-full bg-surface-2 px-3 py-2 text-left text-sm font-medium text-text-secondary transition hover:text-text"
              >
                {themeIcon}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
