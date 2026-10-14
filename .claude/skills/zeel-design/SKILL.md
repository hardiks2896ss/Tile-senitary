---
name: zeel-design
description: Design system and visual QA loop for the Zeel Tiles & Sanitary website. Use whenever adding or changing a section, component, animation, colour, typography or product tile on this site, or when asked to make the site look better.
---

# Zeel design skill

## Identity
- Mood: quiet luxury, a material library. The tiles are the hero; the UI stays calm.
- Palette (Tailwind tokens): `ivory #f3eee6` page, `stone #e4dccf` alt band, `ink #151311` text
  and dark bands, `ink-soft #2a2724`, `bronze #b08d57` single accent, `muted #7d756b` secondary text.
  Never introduce a second accent colour.
- Type: `.display` = Instrument Serif, tight leading (0.92), used for headlines and big numbers.
  `.label` = 0.7rem uppercase, 0.22em tracking, for eyebrows and meta. Body = Manrope.
- Headline pattern: 2 lines, second line `<em className="text-bronze">word.</em>`, revealed with
  `<Lines>` from `components/Reveal.tsx`.
- Layout: `mx-auto max-w-[1600px] px-4 md:px-10`, sections `py-32`, hairline rules
  `border-ink/15`, grids with `gap-px bg-ink/15` for ruled tables.
- Dark sections (`bg-ink text-ivory`) alternate with light ones; avoid two dark sections in a row.

## Motion rules
- Ease: `[0.22, 1, 0.36, 1]` for reveals, `[0.76, 0, 0.24, 1]` for curtains/clip-paths.
- Entrance: mask-up text (`y: "105%" → 0`) or fade-up 40px, `viewport={{ once: true }}`.
- Scroll-linked: `useScroll({ target, offset })` + `useTransform`. Sticky + horizontal track for
  galleries; measure track width in px, don't guess percentages.
- Hover: slow scale (duration ~1s) on tile images; magnetic wrapper (`Magnetic.tsx`) on primary CTAs.
- One showpiece interaction per section at most.

## Tiles (`components/Tile.tsx`)
Procedural marble: base colour → `cloud` turbulence → displaced vein strokes (`vein`, optional
`vein2` gold) → optional `speckle` (breccia/emperador) → `gloss` highlight (0–0.6).
Bold black veins (Black Panda style) trigger when `vein === "#1a1a1a"`. Change `seed` to vary.

## QA loop (required)
1. `npm run dev` (keep running).
2. `npm run shots` → open `screenshots/desktop-*.png` and `screenshots/mobile-*.png`.
3. Check: text not clipped or wrapping awkwardly (buttons use `whitespace-nowrap`), no empty
   gaps at the end of the horizontal gallery, tiles look like stone (not blobs), mobile has no
   horizontal scroll, contrast fine on dark bands, no console errors in the script output.
4. Fix, re-shoot once, then `npm run build` must pass before committing.
