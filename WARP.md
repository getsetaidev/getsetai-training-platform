# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Commands

- Install dependencies (uses package-lock.json):
  - npm ci
- Development server:
  - npm run dev
- Production build:
  - npm run build
- Run production server (after build):
  - npm run start
- Lint (Biome):
  - npm run lint
- Format (Biome):
  - npm run format
- Tests:
  - No test runner is configured in this repo.

## High-level architecture

- Framework: Next.js 16 (App Router) with React 19.
- Entry points:
  - app/layout.tsx: Global HTML scaffold. Wraps the app in AppProvider (from @/lib/context/AppContext) and renders a Header (from @/components/layout/Header).
  - app/page.tsx: Client component that renders a role-based feature grid. It uses useApp() (from the AppProvider) to read currentRole and switches between Admin, Learner, and HR feature sets. Uses UI Card from @/components/ui and icons from lucide-react.
- Styling:
  - Tailwind CSS v4 via PostCSS plugin (@tailwindcss/postcss).
  - app/globals.css defines CSS variables for theme colors and “glass/glass-strong” utility styles, plus an inline @theme configuration.
- Configuration:
  - next.config.ts enables reactCompiler.
  - tsconfig.json sets path alias @/* to the repo root and configures Next’s TS plugin.
  - postcss.config.mjs loads Tailwind via @tailwindcss/postcss.
  - biome.json enables formatting and linting with recommended Next/React rules.
- Assets: public/* contains SVG assets; app/globals.css imports the Inter font.

## Notable gaps and setup notes

- Missing source modules: The code imports from @/lib/context/AppContext, @/components/layout/Header, and @/components/ui, but these paths are not present in the repo. Until these modules are added (tsconfig.json maps @/* to the repo root), the dev server and build will fail to resolve imports.
- Tests are not present and no test tooling is configured. If tests are added later, update this file with how to run all tests and a single test.

## Conventions for future changes

- Use Biome for linting/formatting (npm run lint, npm run format). Do not introduce parallel linters/formatters unless consolidated into Biome.
- Respect the @/* path alias when creating new modules (e.g., place shared code under lib/, components/, etc., and import via @/…).
- Keep Next.js App Router structure (app/ directory) and add routes/components within app/ as needed.
