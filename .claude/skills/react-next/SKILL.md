---
name: react-next
description: Code conventions for React 19, Next.js 15 App Router, TypeScript, Tailwind v4, Framer Motion 12 and Lenis in this project. Use whenever writing or changing components, hooks, animations, data files or build config.
---

# React / Next.js conventions

## Structure
- `app/` — layout, page, global CSS only. Sections live in `components/<Name>.tsx`, one
  default-exported component per file, composed in `app/page.tsx`.
- Data in `lib/data.ts` (typed), site config in `lib/site.ts`. Components never hard-code
  products or contact details.
- Import alias `@/` for project files.

## Client vs server
- Anything using hooks, Framer Motion, Lenis or event handlers starts with `"use client"`.
- `app/page.tsx` and `app/layout.tsx` stay server components; they only compose.
- No `window`/`document` during render. Use `useEffect` (see `SlabGallery` measuring width).
- SSR and client must render the same thing: random values need a seeded PRNG (see `Tile.tsx`).

## Framer Motion
- Import from `framer-motion`. Scroll: `useScroll({ target: ref, offset })` + `useTransform`.
- Springs for pointer-follow (`useSpring`, stiffness ~120–200, damping ~15–20).
- Lists that filter: `layout` + `AnimatePresence mode="popLayout"`, stable `key`s.
- Shared pills: `layoutId` (unique per group).
- Ease constants: `[0.22, 1, 0.36, 1]` (reveal), `[0.76, 0, 0.24, 1]` (curtain).

## Lenis
- Provided once in `components/SmoothScroll.tsx` (`ReactLenis root`). Use `useLenis()` for
  `scrollTo`, `stop`/`start`. Don't add a second smooth-scroll or GSAP ScrollTrigger.
- Anchor links (`href="#id"`) are handled by Lenis `anchors` option.

## Tailwind v4
- Tokens in `@theme` in `app/globals.css` (`bg-ivory`, `text-bronze`, …). Add new tokens there,
  not as arbitrary hex values in components.
- Arbitrary values are fine for one-off layout (`h-[400vh]`, `w-[46vw]`).

## TypeScript
- `strict` is on; no `any`. Export shared types from `lib/data.ts`.
- `npm run lint` (tsc) and `npm run build` must pass before committing.

## Performance
- Keep SVG filter-heavy `Tile`s to what's on screen; don't render hundreds.
- Prefer CSS transitions for simple hovers; Framer for orchestrated or scroll-linked motion.
- No new dependencies without a reason stated to the user.
