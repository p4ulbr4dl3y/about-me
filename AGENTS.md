# AGENTS.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website with a terminal/hacker aesthetic. Content is in Russian. Single-page scrollable layout with three sections: Hero (animated terminal intro), Skills (marquee icon rows), and Projects (horizontal scrolling cards).

## Commands

- `npm run dev` - Start Vite dev server with HMR
- `npm run build` - TypeScript check + production build (outputs to `dist/`)
- `npm run lint` - Run ESLint
- `npm run preview` - Serve production build locally

No test suite is configured.

## Architecture

**Stack**: React 19 + TypeScript (ES2023) + Vite 8, plain CSS with custom properties.

**Key patterns**:
- No routing - single-page scrollable site
- Static data in `src/data/` (skills.ts, projects.ts) - no API calls or backend
- State: React Context for lightbox only (`LightboxContext.tsx`), component-local state elsewhere
- Animations: CSS marquee, IntersectionObserver reveals (`RevealSection`), setInterval typewriter in `Hero.tsx`

**Asset handling**: `src/utils/resolveAsset.ts` resolves paths relative to Vite's `BASE_URL` (`/about-me/`). All public assets live in `public/assets/`.

**Deployment**: GitHub Pages via `.github/workflows/deploy.yml` on push to `main`. The `base: '/about-me/'` in `vite.config.ts` matches the Pages subpath.

## File Organization

```
src/
  components/   # All React components (no co-located styles)
  data/         # Static content definitions
  styles/       # CSS files in styles/components/
  utils/        # Utility functions (resolveAsset.ts)
public/
  assets/       # Images, icons, demo GIFs, ASCII diagram .txt files
```

## Commits

Use conventional commits format, keep messages short:

```
<type>(<scope>): <description>
```

Types: `feat`, `fix`, `refactor`, `style`, `chore`, `docs`, `ci`

Examples:
- `feat(hero): add typewriter animation`
- `fix(assets): resolve paths relative to BASE_URL`
- `ci(deploy): add GitHub Pages workflow`
