# Pennat workspace instructions

## Purpose
This file helps GitHub Copilot Chat understand how to work effectively in the `Pennat` repository.

## Key project facts
- **Framework**: React 19 + React Router v7
- **Build tool**: Vite
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite`
- **Backend**: Supabase auth + database
- **Rich text editor**: Tiptap
- **Media**: Cloudinary image upload
- **PWA**: enabled through `vite-plugin-pwa`
- **Path alias**: `@/*` resolves to `./src/*`

## Common commands
- `npm install` / `npm ci`
- `npm run dev` — start Vite development server
- `npm run build` — build production bundle
- `npm run preview` — preview production build locally
- `npm run lint` — run ESLint
- `npm run deploy` — deploy `dist` via `gh-pages`

## Project structure
- `src/components/` — feature components and pages
- `src/components/ui/` — shared UI components, many from shadcn/Radix
- `src/context/` — React context providers and shared app state
- `src/config/` — Supabase client configuration
- `src/utils/` — helper functions and utilities
- `src/assets/` — static asset references

## Important conventions
- Use **functional components** and React hooks
- Use **PascalCase** for component names
- Use `import` syntax and ES modules only
- React hook rules are enforced by ESLint
- Avoid unused variables; `no-unused-vars` is enabled except for names starting with uppercase or underscore conventions
- Don’t duplicate README content; refer to `README.md` for standard setup and feature summary

## Configuration details
- `vite.config.js` includes PWA config, `@` alias, and Tailwind plugin
- `jsconfig.json` sets `@/` to `./src/*`
- `eslint.config.js` extends recommended JS, React hooks, and Vite refresh
- `src/config/supabaseClient.js` uses `import.meta.env` for Supabase values:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY`

## What to do when editing
- Prefer modifying existing `src/components` or `src/components/ui` components rather than adding duplicate UI patterns
- Keep business logic in feature components and helpers, not in global scripts
- Keep Supabase usage centralized in `src/config/supabaseClient.js` and call it from feature components or utilities
- For new UI components, follow the existing shadcn-inspired styling and naming patterns

## Notes for AI assistance
- When asked to implement or refactor features, use the repo structure and existing patterns first
- Avoid inventing new backend table schemas; infer only from existing UI and README references
- If a task requires env-specific values, remind the user to add or validate `.env` variables
- For build or test suggestions, use the scripts defined in `package.json`

## Useful files
- `README.md` — project introduction, setup, and expected Supabase tables
- `package.json` — available scripts and dependencies
- `vite.config.js` — Vite plugins, PWA settings, and alias config
- `eslint.config.js` — linting rules and file patterns
- `src/config/supabaseClient.js` — Supabase client setup
- `src/context/Context.jsx` — app-level React context provider(s)
