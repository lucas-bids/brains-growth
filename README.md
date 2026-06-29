# Brains Growth

A conversion-focused landing page designed and developed for **Brains Growth**, a marketing consultancy positioned around clarity, performance, and data-driven decision-making.

This was a real client project. I handled the full process: research, positioning, copywriting, client communication, UI direction, front-end development, deployment, and final delivery.

The goal was not only to build a visually polished website, but to create a clear communication system that helps potential clients understand the offer, trust the business, and take action.

**Live project:** https://brains-growth.netlify.app

![Brains Growth preview](./brains-growth-prev.gif)

## Project scope

For this project, I was responsible for the complete landing page process:

- Client discovery and project direction
- Market and positioning research
- Landing page structure
- Copywriting and messaging
- Visual direction and UI decisions
- Front-end development
- Responsive implementation
- Animation and interaction details
- Deployment to Netlify
- Client communication and iteration

This project reflects how I approach client work: product thinking, communication strategy, design judgment, and technical execution.

## Why I built this

Many service businesses know what they do well, but struggle to explain it online in a way that feels clear, trustworthy, and easy to act on.

For Brains Growth, the challenge was:

> How do we present a data-driven marketing service in a way that feels human, premium, and easy to understand, without overwhelming the user with jargon?

The final landing page was built around that challenge. The content, layout, visual hierarchy, and interactions were designed to reduce friction and guide visitors through the business value proposition.

## What the project does

Brains Growth is a marketing landing page built to communicate a clear offer, guide users through the value proposition, and support conversion.

The page includes:

- Hero section with clear positioning
- Floating navigation
- Theme toggle with light and dark modes
- Smooth scrolling behavior
- Marketing-cycle explanation section
- Pricing section
- Testimonials section
- FAQ section
- Floating CTA interaction
- Responsive layout
- Reusable component structure
- Design direction focused on trust, clarity, and premium presentation

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- GSAP
- Lucide React
- ESLint
- Prettier
- Netlify

## Product and design thinking

This project was not treated as a generic landing page. The focus was to design a page that works as a sales narrative.

The structure was planned around questions a potential client would likely have:

- What does this company do?
- Why should I trust them?
- What problem are they solving?
- How is their process different?
- What kind of results or expertise can I expect?
- What should I do next?

The interface uses a clean visual system, controlled spacing, dark/light mode support, focused messaging, and clear section hierarchy to reduce friction and make the offer easier to understand.

## Technical highlights

The application uses the Next.js App Router with a component-based structure. Page sections are separated into reusable modules, making the landing page easier to maintain and extend.

Theme state is handled client-side and persisted with `localStorage`, allowing users to switch between dark and light modes.

GSAP is included for interaction and animation work, supporting a more polished presentation without relying on heavy UI libraries.

The project also follows practical front-end conventions:

- Typed React components
- Tailwind-first styling
- Reusable UI and section components
- Prettier formatting
- ESLint linting
- Clear file organization
- Minimal unnecessary state management
- Deployment-ready production build

## What this project demonstrates

This project demonstrates skills that are useful in front-end, product, and client-facing development roles:

- Managing a real client website project from discovery to deployment
- Translating business goals into a clear landing page structure
- Writing conversion-focused copy for a service business
- Building polished landing pages with Next.js and TypeScript
- Structuring a page around trust, clarity, and conversion
- Creating reusable front-end components
- Working with modern styling through Tailwind CSS
- Implementing light and dark mode behavior
- Using animation to support the experience without overwhelming the content
- Combining development, design, copywriting, and client management in one project

## Getting started

Clone the repository:

```bash
git clone https://github.com/lucas-bids/brains-growth.git
cd brains-growth
````

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Then open:

```bash
http://localhost:3000
```

## Available scripts

Run the local development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

Run linting:

```bash
npm run lint
```

Format the codebase:

```bash
npm run format
```

Check formatting:

```bash
npm run format:check
```

## Project structure

```bash
app/
  page.tsx
  layout.tsx
  globals.css

components/
  Navbar.tsx
  FloatingCTA.tsx
  SmoothScroll.tsx

sections/
  Hero.tsx
  MarketingCycles.tsx
  Pricing.tsx
  Testimonials.tsx
  FAQ.tsx

public/
  images/
```

Key files and folders:

* `app/page.tsx` defines the main landing page composition.
* `components/` contains reusable interface and behavior components.
* `sections/` contains the main landing page sections.
* `public/images/` stores visual assets used by the page.
* `app/globals.css` contains global styling and Tailwind setup.

## Status

This is a completed client landing page project.

It represents my ability to take a website from early direction to live deployment, covering technical implementation ans also the research, copy, communication, and product decisions behind the final page.

## Future improvements

Potential next steps for this project:

* Connect dynamic content to a headless CMS
* Add case study pages
* Add analytics and conversion tracking
* Add form submission handling
* Add A/B testing for CTA and pricing copy
* Improve accessibility testing
* Add automated UI checks
* Expand the design system documentation

## About

Brains Growth is a client landing page built to show how a marketing consultancy can present a complex service in a clearer, more credible, and more conversion-focused way.

It reflects my interest in building websites that are not only visually polished, but also strategically useful, commercially grounded, and ready for real users.

```
```
