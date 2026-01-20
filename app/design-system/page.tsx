"use client";

import { useState, useEffect } from "react";
import { Inter, Inter_Tight } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
});

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <header className="flex flex-col gap-3">
      <h2 className="font-display text-h2 text-text">{title}</h2>
      {description ? (
        <p className="max-w-2xl text-body text-text-secondary">{description}</p>
      ) : null}
    </header>
  );
}

function Card({
  children,
  variant = "dark",
}: {
  children: React.ReactNode;
  variant?: "dark" | "light";
}) {
  if (variant === "light") {
    return (
      <div className="rounded-2xl border border-paper-border bg-paper shadow-soft-xs">
        {children}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface shadow-soft-xs">
      {children}
    </div>
  );
}

function Divider({ className = "" }: { className?: string }) {
  return <hr className={`border-0 border-t border-divider ${className}`} />;
}

function ButtonRow() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        className="inline-flex h-11 items-center justify-center rounded-xl bg-accent px-5 text-sm font-semibold text-accent-foreground shadow-soft-sm outline-none ring-offset-0 transition hover:brightness-95 focus-visible:ring-2 focus-visible:ring-accent/40"
      >
        Primary
      </button>
      <button
        type="button"
        className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-surface-2 px-5 text-sm font-semibold text-text shadow-soft-xs outline-none transition hover:bg-surface focus-visible:ring-2 focus-visible:ring-accent/25"
      >
        Secondary
      </button>
      <button
        type="button"
        className="inline-flex h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold text-text-secondary outline-none transition hover:bg-surface-2 hover:text-text focus-visible:ring-2 focus-visible:ring-accent/25"
      >
        Ghost
      </button>
    </div>
  );
}

function Pill({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "accent" | "accent2";
}) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium";

  if (tone === "accent") {
    return (
      <span className={`${base} bg-accent/15 text-text`}>
        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
        {children}
      </span>
    );
  }

  if (tone === "accent2") {
    return (
      <span className={`${base} bg-accent-2/18 text-text`}>
        <span className="h-1.5 w-1.5 rounded-full bg-accent-2" aria-hidden />
        {children}
      </span>
    );
  }

  return (
    <span className={`${base} border border-border bg-surface-2 text-text`}>
      {children}
    </span>
  );
}

function Badge({
  children,
  variant = "featured",
}: {
  children: React.ReactNode;
  variant?: "featured" | "milestone";
}) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide";

  if (variant === "milestone") {
    return (
      <span className={`${base} bg-accent-2/18 text-text-secondary`}>
        {children}
      </span>
    );
  }

  return (
    <span className={`${base} bg-surface-2 text-text-secondary`}>{children}</span>
  );
}

export default function DesignSystemPage() {
  // Theme state: dark is the default to match current behavior
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // On mount: read saved preference from localStorage (if any)
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
    }
    // If no preference exists, dark is already the default
  }, []);

  // Toggle between dark and light, persist to localStorage
  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
  };

  return (
    <div
      data-theme={theme}
      className={`${inter.variable} ${interTight.variable} min-h-dvh bg-bg text-text antialiased`}
    >
      <header className="sticky top-0 z-10 border-b border-divider bg-bg/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <nav
            aria-label="Primary"
            className="flex items-center gap-3 rounded-2xl border border-border bg-surface/70 px-3 py-2 shadow-soft-xs"
          >
            <button
              type="button"
              className="inline-flex h-9 items-center gap-3 rounded-xl px-3 text-sm font-medium text-text-secondary transition hover:bg-surface-2 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/25"
            >
              <span className="inline-flex flex-col gap-1" aria-hidden>
                <span className="h-0.5 w-5 rounded-full bg-text-secondary/70" />
                <span className="h-0.5 w-5 rounded-full bg-text-secondary/70" />
                <span className="h-0.5 w-5 rounded-full bg-text-secondary/70" />
              </span>
              Menu
            </button>
            <span className="px-2 text-lg text-text-secondary/70" aria-hidden>
              *
            </span>
          </nav>

          <div className="flex items-center gap-2 rounded-2xl border border-border bg-surface/70 p-2 shadow-soft-xs">
            <span className="hidden rounded-full bg-surface-2 px-3 py-1.5 text-sm font-medium text-text-secondary sm:inline-flex">
              Login
            </span>
            <a
              href="#buttons"
              className="inline-flex h-10 items-center justify-center rounded-xl bg-accent px-5 text-sm font-semibold text-accent-foreground shadow-soft-sm transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
            >
              Join
            </a>
            {/* Theme toggle: shows the target mode (what clicking will switch to) */}
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-full bg-surface-2 px-3 py-1.5 text-sm font-medium text-text-secondary transition hover:text-text"
            >
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20 pt-14">
        <header className="flex flex-col gap-6 pb-14">
          <p className="text-small text-text-muted">
            Brains Growth • Design System (canonical reference)
          </p>
          <div className="flex flex-col gap-4">
            <h1 className="font-display text-display text-text">
              Design System
            </h1>
            <p className="max-w-2xl text-body text-text-secondary">
              A single source of truth for foundational decisions: color, type,
              spacing, surfaces, and core UI elements. Designed to be read
              visually.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Pill tone="accent">Primary accent (lime)</Pill>
            <Pill tone="accent2">Secondary accent (purple)</Pill>
            <Pill>Rounded containers</Pill>
            <Pill>Soft contrast</Pill>
            <Pill>Editorial type hierarchy</Pill>
          </div>
        </header>

        <Divider className="my-2" />

        <section className="py-16">
          <SectionHeading
            title="1. Color system"
            description="Dark-first foundations with clear separation between stacked surfaces and selective accent usage."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Card>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display text-h3 text-text">
                      Foundations (dark)
                    </h3>
                    <div className="flex items-center gap-2">
                      <Badge>FOUNDATION</Badge>
                      <Badge variant="milestone">DARK</Badge>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-border bg-bg p-4">
                      <p className="text-xs font-semibold text-text-secondary">
                        bg
                      </p>
                      <p className="mt-2 text-small text-text-muted">
                        Background
                      </p>
                    </div>
                    <div className="rounded-xl border border-border bg-surface p-4">
                      <p className="text-xs font-semibold text-text-secondary">
                        surface
                      </p>
                      <p className="mt-2 text-small text-text-muted">
                        Primary surface
                      </p>
                    </div>
                    <div className="rounded-xl border border-border bg-surface-2 p-4">
                      <p className="text-xs font-semibold text-text-secondary">
                        surface-2
                      </p>
                      <p className="mt-2 text-small text-text-muted">
                        Raised surface
                      </p>
                    </div>
                    <div className="rounded-xl border border-border bg-surface-2 p-4">
                      <p className="text-xs font-semibold text-text-secondary">
                        border/divider
                      </p>
                      <div className="mt-3 flex flex-col gap-3">
                        <div className="h-px w-full bg-divider" aria-hidden />
                        <div className="h-9 w-full rounded-lg border border-border" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-xl border border-border bg-surface-2 p-5">
                    <p className="text-xs font-semibold text-text-secondary">
                      Text on dark
                    </p>
                    <p className="mt-3 text-body text-text">
                      Primary text reads with soft contrast, while supporting
                      text stays muted for hierarchy.
                    </p>
                    <p className="mt-2 text-small text-text-muted">
                      Muted text is used for helper content, metadata, and
                      secondary labels.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-5">
              <Card>
                <div className="p-6">
                  <h3 className="font-display text-h3 text-text">
                    Accents (sparingly)
                  </h3>

                  <div className="mt-6 grid gap-3">
                    <div className="rounded-xl border border-border bg-surface-2 p-4">
                      <p className="text-xs font-semibold text-text-secondary">
                        accent
                      </p>
                      <div className="mt-3 flex items-center justify-between gap-4">
                        <span className="text-small text-text-muted">
                          CTA / highlight
                        </span>
                        <span className="h-7 w-16 rounded-lg bg-accent shadow-soft-xs" />
                      </div>
                    </div>
                    <div className="rounded-xl border border-border bg-surface-2 p-4">
                      <p className="text-xs font-semibold text-text-secondary">
                        accent-2
                      </p>
                      <div className="mt-3 flex items-center justify-between gap-4">
                        <span className="text-small text-text-muted">
                          Callout surface
                        </span>
                        <span className="h-7 w-16 rounded-lg bg-accent-2 shadow-soft-xs" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3">
                    <div className="rounded-xl border border-border bg-surface p-5">
                      <p className="text-xs font-semibold text-text-secondary">
                        Correct usage
                      </p>
                      <div className="mt-4 flex items-center justify-between gap-4">
                        <p className="text-small text-text-muted">
                          One primary CTA; accents act as punctuation.
                        </p>
                        <button
                          type="button"
                          className="inline-flex h-10 items-center justify-center rounded-xl bg-accent px-4 text-sm font-semibold text-accent-foreground shadow-soft-sm transition hover:brightness-95"
                        >
                          Join
                        </button>
                      </div>
                    </div>

                    <div className="rounded-xl border border-border bg-surface p-5">
                      <p className="text-xs font-semibold text-text-secondary">
                        Avoid
                      </p>
                      <div className="mt-4 grid gap-3">
                        <div className="h-10 rounded-xl bg-accent/70" />
                        <div className="h-10 rounded-xl bg-accent/50" />
                        <div className="h-10 rounded-xl bg-accent/30" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-12">
              <Card variant="light">
                <div className="p-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <h3 className="font-display text-h3 text-ink">
                      Light surfaces (inside dark pages)
                    </h3>
                    <p className="text-small text-ink-muted">
                      Demonstrates dark text on light background.
                    </p>
                  </div>

                  <div className="mt-6 grid gap-4 lg:grid-cols-2">
                    <div className="rounded-xl border border-paper-border bg-paper-2 p-5">
                      <p className="text-xs font-semibold text-ink-muted">
                        Text on light
                      </p>
                      <p className="mt-3 text-body text-ink">
                        Clear hierarchy without harsh contrast. Editorial type
                        stays readable on paper-like surfaces.
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                          Accent on light
                        </span>
                        <span className="inline-flex items-center rounded-full bg-accent-2 px-3 py-1 text-xs font-semibold text-white">
                          Purple on light
                        </span>
                      </div>
                    </div>

                    <div className="rounded-xl border border-paper-border bg-paper p-5">
                      <p className="text-xs font-semibold text-ink-muted">
                        Neutral surfaces
                      </p>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="h-12 rounded-xl border border-paper-border bg-paper-2" />
                        <div className="h-12 rounded-xl border border-paper-border bg-paper" />
                        <div className="h-12 rounded-xl border border-paper-border bg-paper-2" />
                        <div className="h-12 rounded-xl border border-paper-border bg-paper" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <Divider />

        <section className="py-16">
          <SectionHeading
            title="2. Typography"
            description="Display type uses Inter Tight for an editorial, confident feel. Body uses Inter for clean readability."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Card>
                <div className="p-6">
                  <div className="flex flex-col gap-6">
                    <div>
                      <p className="text-small text-text-muted">Display / H1</p>
                      <p className="mt-2 font-display text-display text-text">
                        A growing toolkit for creative developers
                      </p>
                    </div>

                    <div>
                      <p className="text-small text-text-muted">H2</p>
                      <p className="mt-2 font-display text-h2 text-text">
                        Access the HTML
                      </p>
                    </div>

                    <div>
                      <p className="text-small text-text-muted">H3</p>
                      <p className="mt-2 font-display text-h3 text-text">
                        Speed without compromise
                      </p>
                    </div>

                    <div>
                      <p className="text-small text-text-muted">Body</p>
                      <p className="mt-2 text-body text-text-secondary">
                        Dark-first layouts with soft contrast. Keep supporting
                        copy concise and readable, letting headings carry the
                        editorial tone. Use accent color only for callouts and
                        critical actions.
                      </p>
                    </div>

                    <div>
                      <p className="text-small text-text-muted">Small / meta</p>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-semibold tracking-wide text-text-secondary">
                          FEATURED
                        </span>
                        <span className="inline-flex items-center rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-semibold tracking-wide text-text-secondary">
                          MILESTONE
                        </span>
                        <span className="text-small text-text-muted">
                          Last added earlier today
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-5">
              <Card>
                <div className="p-6">
                  <h3 className="font-display text-h3 text-text">
                    Hierarchy (visual)
                  </h3>

                  <div className="mt-6 grid gap-4">
                    <div className="rounded-xl border border-border bg-surface-2 p-5">
                      <p className="text-xs font-semibold text-text-secondary">
                        Correct usage
                      </p>
                      <p className="mt-3 font-display text-h2 text-text">
                        Update log
                      </p>
                      <p className="mt-1 text-small text-text-muted">
                        Last added earlier today
                      </p>
                      <p className="mt-4 text-body text-text-secondary">
                        Short supporting paragraph below the heading. Keep line
                        length comfortable and avoid dense blocks.
                      </p>
                    </div>

                    <div className="rounded-xl border border-border bg-surface-2 p-5">
                      <p className="text-xs font-semibold text-text-secondary">
                        Avoid
                      </p>
                      <p className="mt-3 text-h3 font-medium text-text">
                        Update log
                      </p>
                      <p className="mt-2 text-h3 font-medium text-text">
                        Last added earlier today
                      </p>
                      <p className="mt-2 text-h3 font-medium text-text">
                        Short supporting paragraph below the heading.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <Divider />

        <section className="py-16">
          <SectionHeading
            title="3. Spacing & layout"
            description="Use a consistent spacing scale with generous section padding and controlled line length."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Card>
                <div className="p-6">
                  <h3 className="font-display text-h3 text-text">
                    Spacing scale (xs → xl)
                  </h3>

                  <div className="mt-6 grid gap-3">
                    <div className="rounded-xl border border-border bg-surface-2 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-small text-text-secondary">xs</p>
                        <div className="h-2 w-2 rounded bg-text-secondary/60" />
                        <p className="text-small text-text-muted">2 (0.5rem)</p>
                      </div>
                    </div>
                    <div className="rounded-xl border border-border bg-surface-2 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-small text-text-secondary">sm</p>
                        <div className="h-4 w-4 rounded bg-text-secondary/60" />
                        <p className="text-small text-text-muted">4 (1rem)</p>
                      </div>
                    </div>
                    <div className="rounded-xl border border-border bg-surface-2 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-small text-text-secondary">md</p>
                        <div className="h-6 w-6 rounded bg-text-secondary/60" />
                        <p className="text-small text-text-muted">6 (1.5rem)</p>
                      </div>
                    </div>
                    <div className="rounded-xl border border-border bg-surface-2 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-small text-text-secondary">lg</p>
                        <div className="h-8 w-8 rounded bg-text-secondary/60" />
                        <p className="text-small text-text-muted">8 (2rem)</p>
                      </div>
                    </div>
                    <div className="rounded-xl border border-border bg-surface-2 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-small text-text-secondary">xl</p>
                        <div className="h-12 w-12 rounded bg-text-secondary/60" />
                        <p className="text-small text-text-muted">
                          12 (3rem)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-xl border border-border bg-surface-2 p-5">
                    <p className="text-xs font-semibold text-text-secondary">
                      Vertical rhythm (sections)
                    </p>
                    <div className="mt-4 grid gap-3">
                      <div className="rounded-xl border border-border bg-surface p-6">
                        <p className="text-small text-text-secondary">
                          Section padding example: `py-16`
                        </p>
                        <div className="mt-4 h-2 w-28 rounded bg-divider" />
                      </div>
                      <div className="rounded-xl border border-border bg-surface p-6">
                        <p className="text-small text-text-secondary">
                          Nested block padding: `p-6`
                        </p>
                        <div className="mt-4 h-2 w-20 rounded bg-divider" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-5">
              <Card>
                <div className="p-6">
                  <h3 className="font-display text-h3 text-text">
                    Container & grid
                  </h3>

                  <div className="mt-6 rounded-xl border border-border bg-surface-2 p-5">
                    <p className="text-small text-text-secondary">
                      Max width: <span className="font-semibold">6xl</span>
                    </p>
                    <p className="mt-2 text-small text-text-muted">
                      Keep paragraphs around ~60–75 characters per line.
                    </p>
                    <div className="mt-4 grid grid-cols-12 gap-2">
                      {Array.from({ length: 12 }).map((_, index) => (
                        <div
                          key={index}
                          className="h-10 rounded-lg bg-bg"
                          aria-hidden
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 rounded-xl border border-border bg-surface-2 p-5">
                    <p className="text-xs font-semibold text-text-secondary">
                      Correct usage
                    </p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl border border-border bg-surface p-4">
                        <p className="text-small text-text-secondary">
                          2-column blocks
                        </p>
                        <p className="mt-2 text-small text-text-muted">
                          Balanced, readable.
                        </p>
                      </div>
                      <div className="rounded-xl border border-border bg-surface p-4">
                        <p className="text-small text-text-secondary">
                          3-column cards
                        </p>
                        <p className="mt-2 text-small text-text-muted">
                          Use for small content.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <Divider />

        <section id="buttons" className="py-16">
          <SectionHeading
            title="4. UI elements"
            description="A small set of primitives: buttons, pills, badges, cards, and dividers. Hover states only."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Card>
                <div className="p-6">
                  <h3 className="font-display text-h3 text-text">Buttons</h3>
                  <p className="mt-2 text-small text-text-muted">
                    Primary uses lime. Secondary stays neutral. Ghost is minimal.
                  </p>
                  <div className="mt-6">
                    <ButtonRow />
                  </div>

                  <div className="mt-8 rounded-xl border border-border bg-surface-2 p-5">
                    <p className="text-xs font-semibold text-text-secondary">
                      Correct usage
                    </p>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                      <p className="text-small text-text-muted">
                        One primary action per surface.
                      </p>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-text-secondary transition hover:bg-bg"
                        >
                          Learn more
                        </button>
                        <button
                          type="button"
                          className="inline-flex h-10 items-center justify-center rounded-xl bg-accent px-4 text-sm font-semibold text-accent-foreground shadow-soft-sm transition hover:brightness-95"
                        >
                          Join
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-5">
              <Card>
                <div className="p-6">
                  <h3 className="font-display text-h3 text-text">
                    Pills & badges
                  </h3>

                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    <Pill>The Vault</Pill>
                    <Pill>Icons</Pill>
                    <Pill tone="accent">Expected Feb 2026</Pill>
                    <Pill tone="accent2">Part of the membership</Pill>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    <Badge>FEATURED</Badge>
                    <Badge variant="milestone">MILESTONE</Badge>
                    <span className="inline-flex items-center rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-semibold text-text-secondary">
                      ONE USER
                    </span>
                  </div>

                  <div className="mt-8 rounded-xl border border-border bg-surface-2 p-5">
                    <p className="text-xs font-semibold text-text-secondary">
                      Avoid
                    </p>
                    <p className="mt-3 text-small text-text-muted">
                      Don’t mix too many attention-grabbing pills in one row.
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                        Loud
                      </span>
                      <span className="rounded-full bg-accent-2 px-3 py-1 text-xs font-semibold text-white">
                        Loud
                      </span>
                      <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                        Loud
                      </span>
                      <span className="rounded-full bg-accent-2 px-3 py-1 text-xs font-semibold text-white">
                        Loud
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-12">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-display text-h3 text-text">
                        Card (dark)
                      </h3>
                      <Badge>FOUNDATION</Badge>
                    </div>
                    <p className="mt-2 max-w-xl text-body text-text-secondary">
                      Use dark cards to group content without heavy borders. Add
                      a subtle shadow only when cards overlap or need focus.
                    </p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl border border-border bg-bg p-4">
                        <p className="text-small font-semibold text-text">
                          Vault wide search
                        </p>
                        <p className="mt-2 text-small text-text-muted">
                          Quick access from anywhere.
                        </p>
                      </div>
                      <div className="rounded-xl border border-border bg-bg p-4">
                        <p className="text-small font-semibold text-text">
                          Resource preview
                        </p>
                        <p className="mt-2 text-small text-text-muted">
                          Short-form previews.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card variant="light">
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-display text-h3 text-ink">
                        Card (light)
                      </h3>
                      <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                        Accent CTA
                      </span>
                    </div>
                    <p className="mt-2 max-w-xl text-body text-ink-muted">
                      Light cards work as “paper” surfaces inside dark sections
                      for contrast and focus.
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        className="inline-flex h-11 items-center justify-center rounded-xl bg-accent px-5 text-sm font-semibold text-accent-foreground shadow-soft-sm transition hover:brightness-95"
                      >
                        Become a member
                      </button>
                      <button
                        type="button"
                        className="inline-flex h-11 items-center justify-center rounded-xl border border-paper-border bg-paper-2 px-5 text-sm font-semibold text-ink transition hover:bg-paper"
                      >
                        FAQs
                      </button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <div className="lg:col-span-12">
              <Card>
                <div className="p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="font-display text-h3 text-text">Dividers</h3>
                    <p className="text-small text-text-muted">
                      Use dividers to segment sections, not to box everything.
                    </p>
                  </div>
                  <div className="mt-6 space-y-4">
                    <Divider />
                    <div className="rounded-xl border border-border bg-surface-2 p-4">
                      <Divider className="my-3" />
                      <p className="text-small text-text-muted">
                        Divider inside a container (subtle).
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <Divider />

        <section className="py-16">
          <SectionHeading
            title="5. Surface & elevation"
            description="Stacked surfaces should separate via subtle border + value shift. Shadows are rare and soft."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Card>
                <div className="p-6">
                  <h3 className="font-display text-h3 text-text">
                    Stacked surfaces
                  </h3>
                  <p className="mt-2 max-w-2xl text-small text-text-muted">
                    Prefer value shifts (bg → surface → surface-2) with consistent
                    radii. Use shadow only for “floating” emphasis.
                  </p>

                  <div className="mt-8 rounded-2xl border border-border bg-bg p-6">
                    <div className="rounded-2xl border border-border bg-surface p-6">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-small font-semibold text-text">
                          Surface
                        </p>
                        <Pill tone="accent2">Callout</Pill>
                      </div>
                      <div className="mt-4 rounded-2xl border border-border bg-surface-2 p-5 shadow-soft-xs">
                        <p className="text-small font-semibold text-text">
                          Surface-2 (raised)
                        </p>
                        <p className="mt-2 text-small text-text-muted">
                          Subtle elevation via value shift + soft shadow.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-5">
              <Card>
                <div className="p-6">
                  <h3 className="font-display text-h3 text-text">
                    Border radius scale
                  </h3>
                  <div className="mt-6 grid gap-3">
                    <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface-2 p-4">
                      <span className="text-small text-text-secondary">
                        sm
                      </span>
                      <span className="h-10 w-16 rounded-sm border border-border bg-bg" />
                    </div>
                    <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface-2 p-4">
                      <span className="text-small text-text-secondary">
                        md
                      </span>
                      <span className="h-10 w-16 rounded-md border border-border bg-bg" />
                    </div>
                    <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface-2 p-4">
                      <span className="text-small text-text-secondary">
                        lg
                      </span>
                      <span className="h-10 w-16 rounded-lg border border-border bg-bg" />
                    </div>
                    <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface-2 p-4">
                      <span className="text-small text-text-secondary">
                        xl
                      </span>
                      <span className="h-10 w-16 rounded-xl border border-border bg-bg" />
                    </div>
                    <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface-2 p-4">
                      <span className="text-small text-text-secondary">
                        2xl
                      </span>
                      <span className="h-10 w-16 rounded-2xl border border-border bg-bg" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <Divider />

        <section className="py-16">
          <SectionHeading
            title="6. Usage guidelines (visual)"
            description="A few “rules by composition”: restraint with accents, consistent radii, and clear hierarchy."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Card>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display text-h3 text-text">
                      Accent restraint
                    </h3>
                    <Badge>GUIDELINE</Badge>
                  </div>

                  <div className="mt-6 grid gap-4">
                    <div className="rounded-xl border border-border bg-surface-2 p-5">
                      <p className="text-xs font-semibold text-text-secondary">
                        Correct
                      </p>
                      <div className="mt-4 flex items-center justify-between gap-4">
                        <div className="space-y-2">
                          <p className="text-small font-semibold text-text">
                            Ready to level up?
                          </p>
                          <p className="text-small text-text-muted">
                            One strong CTA; everything else stays quiet.
                          </p>
                        </div>
                        <button
                          type="button"
                          className="inline-flex h-10 items-center justify-center rounded-xl bg-accent px-4 text-sm font-semibold text-accent-foreground shadow-soft-sm transition hover:brightness-95"
                        >
                          Join
                        </button>
                      </div>
                    </div>

                    <div className="rounded-xl border border-border bg-surface-2 p-5">
                      <p className="text-xs font-semibold text-text-secondary">
                        Avoid
                      </p>
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="h-10 rounded-xl bg-accent" />
                        <div className="h-10 rounded-xl bg-accent-2" />
                        <div className="h-10 rounded-xl bg-accent" />
                        <div className="h-10 rounded-xl bg-accent-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-6">
              <Card>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display text-h3 text-text">
                      Consistent surfaces
                    </h3>
                    <Badge>GUIDELINE</Badge>
                  </div>

                  <div className="mt-6 grid gap-4">
                    <div className="rounded-xl border border-border bg-surface-2 p-5">
                      <p className="text-xs font-semibold text-text-secondary">
                        Correct
                      </p>
                      <div className="mt-4 rounded-xl border border-border bg-bg p-6">
                        <p className="text-small font-semibold text-text">
                          One radius language
                        </p>
                        <p className="mt-2 text-small text-text-muted">
                          Rounded containers, subtle borders, soft depth.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-xl border border-border bg-surface-2 p-5">
                      <p className="text-xs font-semibold text-text-secondary">
                        Avoid
                      </p>
                      <div className="mt-4 flex items-center gap-3">
                        <div className="h-16 w-16 rounded-none border border-border bg-bg" />
                        <div className="h-16 w-16 rounded-sm border border-border bg-bg" />
                        <div className="h-16 w-16 rounded-full border border-border bg-bg" />
                        <div className="h-16 w-16 rounded-2xl border border-border bg-bg" />
                      </div>
                      <p className="mt-3 text-small text-text-muted">
                        Mixed radii feel inconsistent.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <footer className="pt-4">
          <Divider />
          <p className="py-10 text-small text-text-muted">
            This page is the authoritative design reference for Brains Growth.
          </p>
        </footer>
      </main>
    </div>
  );
}

