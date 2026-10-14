# Zeel Tiles & Sanitary — project guide for Claude

Marketing site for **Zeel Tiles & Sanitary**, a one-stop showroom for tiles, sanitaryware, bath
fittings and building materials. The full design brief is in [`PROMPT.md`](./PROMPT.md); read it
before any design work.

## Stack
- Next.js 15 (App Router) + TypeScript, React 19
- Tailwind CSS v4 (tokens live in `app/globals.css` under `@theme`)
- Framer Motion 12 for all animation, Lenis (`lenis/react`) for smooth scroll
- No image assets: tiles are procedural SVG marble from `components/Tile.tsx`

## Commands
```bash
npm run dev            # http://localhost:3000
npm run build          # production build + type check — must pass before committing
npm run lint           # tsc --noEmit
npm run shots          # screenshots of the running site → screenshots/ (needs dev server)
npm run preview:build  # static client-only bundle → preview-dist/ (for Artifact previews)
```
First time for screenshots: `npx playwright install chromium`.

## Where things live
| What | File |
|---|---|
| Phone, WhatsApp, email, address (**placeholders — replace before launch**) | `lib/site.ts` |
| Products, stock, finishes, categories, spaces | `lib/data.ts` |
| Page section order | `app/page.tsx` |
| Fonts, metadata | `app/layout.tsx` |
| Colours, type helpers (`.display`, `.label`) | `app/globals.css` |
| Each section | `components/<Section>.tsx` |

Sections, top to bottom: Intro → Nav → Hero → Marquee → Manifesto → Categories → SlabGallery →
Catalogue → FinishLab → Spaces → Builders → Contact → Footer.

## Working rules
1. **Look at what you build.** After any visual change, run the dev server and `npm run shots`,
   then open the PNGs and check desktop *and* mobile before saying it's done. Fix what you see
   and re-check once. This is what kept the first prototype polished.
2. Keep the design language (see `.claude/skills/zeel-design/SKILL.md`): ivory / stone / ink /
   bronze palette, Instrument Serif display + Manrope body, big serif headlines with one italic
   bronze word, thin rules, generous whitespace.
3. Motion uses Framer Motion with the ease `[0.22, 1, 0.36, 1]`; scroll-linked effects use
   `useScroll` / `useTransform`. Don't add GSAP or another scroll library — Lenis already drives
   scrolling and `useScroll` works with it.
4. Product data comes from `lib/data.ts` only. New tiles: add an entry with a `look` (base, vein,
   optional vein2 / cloud / speckle / gloss, seed) and check it in screenshots.
5. Enquiries go through `waLink()` in `lib/site.ts` as real `<a href>` links, not `window.open`.
6. Keep it static-friendly: no server-only APIs unless the user asks for a backend.
7. Respect `prefers-reduced-motion`; keep the 16px+ side gutter and no horizontal scroll on mobile.

## Deploy
Vercel: import the GitHub repo at vercel.com/new (auto-detects Next.js), or `npx vercel --prod`.

## Open items
- Real contact details in `lib/site.ts`.
- "Korten Rust" and "Archie Bianco" were cut off in the source report; confirm name and stock.
- Stats in `components/Builders.tsx` (1,200+ SKUs, 48h dispatch) are sample figures; confirm with client.
- Replace procedural tiles with real product photos when available (keep `Tile` as fallback).
