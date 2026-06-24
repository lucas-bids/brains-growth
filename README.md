# Brains Growth

A conversion-focused landing page and front-end system for **Brains Growth**, a marketing consultancy positioned around clarity, performance, and data-driven decision-making.

This project was designed as a **communication system**: identify the trust gap, simplify the value proposition, build a reusable visual language, and turn that into a landing experience that feels premium, credible, and actionable.

## Reasoning

Many service businesses know what they do well, and struggle to explain it online in a way that feels:

- clear to first-time visitors
- trustworthy enough to reduce hesitation
- structured enough to guide people toward contact

For Brains Growth:

**How do we present a data-driven marketing service in a way that feels human, premium, and easy to understand, without overwhelming the user with jargon?**

That question shaped the process.

## My Approach

I treated this as a small product design exercise rather than a pure front-end build.

### 1. Problem Identification

The page needed to solve four communication problems quickly:

- explain the offer in simple language
- create trust early
- show that the service has a real method
- keep the path to contact visible throughout the experience

### 2. Design Thinking

From there, the page structure was organized around progressive clarity:

- **Hero:** communicate the main promise immediately
- **Method section:** show that the work happens through systems and cycles
- **Social proof:** reduce risk perception
- **Pricing:** make the offer concrete
- **FAQ:** remove the most common objections
- **Persistent CTA:** keep conversion available without being aggressive

The goal was to make the experience feel like a guided conversation: first understanding, then credibility, then action.

### 3. Design System First

Instead of styling section by section, I created a reusable visual foundation and documented it in a dedicated [`/design-system`](/Users/lucasvidal/Documents/Projects/brains-growth/app/design-system/page.tsx) page.

That system includes:

- semantic color tokens via CSS variables
- dark/light theming
- typography hierarchy for editorial-style marketing layouts
- consistent spacing and surface treatment
- reusable UI primitives such as buttons, pills, cards, dividers, and section headings

This made the page easier to scale, easier to keep consistent, and easier to reason about as a product rather than a collection of components.

## The Final Page

The final landing page combines brand expression, motion, and conversion structure:

- a strong headline with a direct value proposition
- a looping media carousel to give the hero more energy and context
- a scroll-driven "marketing cycles" section that visually reinforces process and system thinking
- testimonials and trust-building content
- pricing cards that make the service ladder easy to compare
- an FAQ that handles objections in a lightweight way
- a floating WhatsApp CTA that stays available and expands near the end of the page

There is also thoughtful motion throughout the experience using GSAP, not as decoration, but to support hierarchy, rhythm, and attention.

## Tech Stack

- **Next.js 16**
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **GSAP** for motion and scroll interactions

## Project Structure

```text
app/
  page.tsx                 # Main landing page
  design-system/page.tsx   # Visual system reference
  globals.css              # Design tokens and theme foundations

components/
  ui/                      # Reusable primitives
  Navbar.tsx
  FloatingCTA.tsx
  HeroCarousel.tsx

sections/
  Hero.tsx
  MarketingCycles.tsx
  Testimonials.tsx
  Pricing.tsx
  FAQ.tsx
```

## Running Locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Notes

- The interface copy is in **Portuguese** because the target audience is Brazilian.
- The README is in **English** because this repository is also intended to function as a portfolio case study for recruiters and collaborators.
