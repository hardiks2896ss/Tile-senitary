# Zeel Tiles & Sanitary — Website

Showcase site for a one-stop tiles, sanitaryware and building-materials showroom.
Design brief: see [`PROMPT.md`](./PROMPT.md). **New computer? Start with [`SETUP.md`](./SETUP.md).**

Repo: https://github.com/hardiks2896ss/Tile-senitary

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lenis smooth scroll.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

- Product / stock data: `lib/data.ts` (from the client's Performa report)
- Phone, WhatsApp, address: `lib/site.ts` — **replace placeholders before launch**
- Tile visuals are procedural SVG marble (`components/Tile.tsx`); swap in real product photos when available.

## Deploy to Vercel
Import this repo at https://vercel.com/new — framework is auto-detected as Next.js, no settings needed.
