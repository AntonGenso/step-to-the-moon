# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server with Turbopack
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Run ESLint
npx prettier --write .  # Format all files
```

> Note: `next.config.mjs` currently ignores ESLint and TypeScript errors during builds (`ignoreDuringBuilds: true`). This is intentional but temporary.

## Architecture

**Stack**: Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS 4 + Material UI 7 + TanStack React Query + Axios

### Routing

The app uses Next.js route groups:
- `app/(auth)/` — Login/signup pages with a shared background-image layout. No auth required.
- `app/(profile)/` — Protected pages. The layout at `app/(profile)/layout.tsx` checks for the `accessToken` cookie (server-side) and redirects to `/login` if missing.
- `app/api/` — Next.js API routes acting as a backend proxy to the external API.

### Authentication Flow

1. Signup/login form submits to a Next.js API route (`/api/auth/signup`).
2. The API route calls the external backend at `https://api-sttm.21id.uz/api` via the Axios instance in `src/services/api.ts`.
3. On success, a `httpOnly` cookie named `accessToken` is set.
4. The `(profile)` route group layout checks this cookie to protect pages.
5. Client-side, `src/context/AuthContext.tsx` manages `isLoggedIn` state using `localStorage` (separate from the cookie).

### Layout & Navigation

`src/components/LayoutWrapper.tsx` is a client component that conditionally renders `Header` and `Footer` based on the current pathname — Header is hidden on auth pages, Footer is hidden on the profile page.

### Path Aliases

`@/*` maps to the repo root (`./`), so `@/src/...` and `@/app/...` are valid imports.

### SVG Imports

SVGs can be imported as React components via `@svgr/webpack`. Both Webpack and Turbopack are configured for this.

### Styling

- Tailwind CSS 4 via `@tailwindcss/postcss` (not the classic `tailwindcss` PostCSS plugin).
- Custom breakpoints in `tailwind.config.js`: `mobile` (320px), `tablet` (768px), `laptop` (1200px), `desktop` (1440px).
- Custom font: `alumni` (Alumni Sans, loaded in root layout).
- Prettier runs Tailwind class sorting via `prettier-plugin-tailwindcss`.

### Data

`src/components/utils/` contains static mock data files (`factsData.ts`, `missionData.ts`, `testData.ts`) used by profile feature components.

### Key Directories

- `src/components/profile/` — All profile page feature components (missions, tests, leaderboard, tablet/book, skins).
- `src/uikit/` — Reusable primitive UI components (Card, Heading, MoonProgressBar).
- `src/providers/` — React Query provider (configured with `refetchOnWindowFocus: false`, `retry: 2`).
- `src/services/api.ts` — Shared Axios instance for external API calls.
