# Brains Growth — Front-end

Front-end application for Brains Growth built with Next.js, TypeScript, and Tailwind CSS.

## Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **CMS**: Strapi (Headless, external API)
- **Formatting**: Prettier
- **Version Control**: Git + GitHub
- **Deployment**: Digital Ocean

## Project Structure

```
/app
  /components    # Reusable components
  /sections      # Page sections/landing page sections
  /ui            # UI primitives (buttons, inputs, etc.)
  /lib           # Utility functions and helpers
  /styles        # Global styles (minimal, Tailwind-focused)
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
# Create production build
npm run build

# Start production server
npm start
```

### Linting

```bash
# Run ESLint
npm run lint
```

### Formatting

```bash
# Format code with Prettier (if script is added)
npx prettier --write .
```

## Project Conventions

- **Components**: One component per file, explicit props typing (no `any`)
- **Styling**: Tailwind CSS only, avoid inline styles
- **State**: No global state management unless explicitly needed
- **Data Fetching**: Native `fetch`, prefer server components
- **File Naming**: kebab-case for files, PascalCase for React components

## Strapi Integration

This front-end consumes Strapi as an external headless CMS via REST or GraphQL API. Business logic remains minimal and presentation-focused.
