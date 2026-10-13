# Design Prompt — Zeel Tiles & Sanitary

> Paste this into Claude (Claude Design / Claude Code) to generate or iterate on the website.

---

## Role

You are a senior product designer and creative front-end engineer. Design and build a
premium, award-level marketing website for **Zeel Tiles & Sanitary**, a one-stop
building-materials showroom that supplies homeowners, builders, architects and contractors.

## The business

Zeel Tiles & Sanitary is not "just a tile shop". It covers the **entire finishing side of the
building industry**:

| Category | What it includes |
|---|---|
| Porcelain slabs & tiles | 600×1200, 800×1600, 1200×2400 slabs — Matt, Carving, Velvet, Glossy, Super High Gloss |
| Floor & wall tiles | GVT / PGVT, double charge, digital wall, elevation tiles |
| Outdoor & parking | Anti-skid, heavy-duty parking, pavers, step-and-riser |
| Sanitaryware | Wall-hung & floor-mount WCs, one-piece closets, wash basins, urinals |
| Bath fittings / CP | Faucets, diverters, rain showers, concealed bodies, accessories |
| Wellness | Shower panels, enclosures, bathtubs, jacuzzis, steam |
| Kitchen | Quartz & steel sinks, pull-out mixers, kitchen tiles |
| Natural stone | Granite, Italian & Indian marble, quartz countertops |
| Plumbing | CPVC / UPVC / SWR pipes and fittings, tanks |
| Water heating | Storage & instant geysers, solar water heaters |
| Fixing solutions | Tile adhesives, epoxy grout, spacers, levelling systems, waterproofing |
| Hardware & mirrors | LED mirrors, vanities, bath cabinets, door & cabinet hardware |

### Real stock sample (from the client's "Performa Report", 600×1200)

| Finish | Product | Pcs/box | Boxes in stock (PRE grade) |
|---|---|---|---|
| Matt | Archie Grey | 3 | 572 |
| Carving | Casa Multi | 3 | 521 |
| Super High Gloss | Black Panda | 2 | 386 |
| Carving | Beautic Beige | 2 | 376 |
| Carving | Essent Crema | 2 | 328 |
| Super High Gloss | Sahara Noir | 2 | 308 |
| High Gloss | Z Black | 2 | 284 |
| Super High Gloss | Bross Brown | 2 | 231 |
| Velvet | Vel-Zeus White | 2 | 211 |
| Carving | Roma Ivory | 2 | 204 |
| Matt | Beautic Beige | 2 | 203 |

Use this data to build a **live-stock catalogue** experience (filter by finish, show boxes ready
to dispatch, enquire on WhatsApp in one tap).

## Audience & goals

1. **Homeowners** — get inspired, understand finishes, visit the showroom.
2. **Builders / contractors** — see that large stock is ready, request bulk project quotes.
3. **Architects & interior designers** — browse finishes, request samples & spec sheets.

Primary CTA: **"Get a Quote" → WhatsApp / enquiry form**. Secondary: **"Visit Showroom"**.

## Art direction

- Mood: quiet luxury, gallery / material library — stone, light, shadow.
- Palette: warm ivory `#F3EEE6`, stone `#E4DCCF`, charcoal `#151311`, bronze accent `#B08D57`.
- Type: editorial serif display (Instrument Serif) + clean grotesk (Manrope). Huge, confident
  headlines; small uppercase tracked labels.
- Imagery: the materials themselves are the hero — large slab textures with realistic veining
  and gloss highlights. Generous whitespace, thin 1px rules, numbered sections (01 — 12).

## Motion (Lenis + Framer Motion)

- **Lenis** smooth scrolling for the whole page, anchor links scroll through Lenis.
- Intro curtain reveal of the wordmark on first load.
- Hero tile mosaic with scroll-linked parallax (columns moving at different speeds).
- Infinite category marquee.
- Manifesto paragraph that lights up word-by-word as you scroll.
- Sticky **horizontal-scroll slab gallery** driven by vertical scroll.
- Catalogue filter with Framer `layout` + `AnimatePresence` re-ordering.
- **Finish lab**: a tile that tilts in 3D and shows a cursor-following light sheen; switching
  Matt → Carving → Velvet → Glossy → Super High Gloss changes the reflectivity.
- Stacked sticky "Spaces" cards (Bath, Kitchen, Living, Outdoor, Commercial).
- Animated counters for stats; magnetic buttons; respect `prefers-reduced-motion`.

## Page structure

1. Intro loader → Navigation (Collections, Categories, Finishes, Projects, Contact, Get a Quote)
2. Hero — "Every surface. Every space. One address."
3. Category marquee
4. Manifesto (scroll-lit text)
5. The Building Index — all 12 categories
6. Slab gallery (horizontal scroll)
7. Live stock catalogue (filterable)
8. Finish lab (interactive)
9. Spaces (stacked cards)
10. For builders & architects — process + stats
11. Enquiry form → WhatsApp
12. Footer with oversized wordmark

## Tech

Next.js (App Router) + TypeScript, Tailwind CSS v4, Framer Motion, Lenis. Fully responsive
(360px → 4K), accessible (semantic landmarks, focus states, alt text, reduced motion),
Lighthouse 90+. Deploy on Vercel.
