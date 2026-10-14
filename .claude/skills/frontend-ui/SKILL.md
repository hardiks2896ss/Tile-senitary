---
name: frontend-ui
description: Front-end design craft for this site: layout, spacing, typography, responsiveness, accessibility, colour and copy. Use for any UI, HTML, CSS or Tailwind change, new section or page, or when the user asks to make something look better. Works together with zeel-design (brand rules) and react-next (code rules).
---

# Front-end UI craft

## Before writing
- Know the section's one job and its audience: homeowner, builder or architect.
- Reuse what exists: tokens in `app/globals.css`, `.display` / `.label`, `Lines` / `FadeUp`
  from `components/Reveal.tsx`, `Magnetic`, `Tile`, `Icon`. Don't add new one-off colours or fonts.

## Layout
- Wrapper: `mx-auto max-w-[1600px] px-4 md:px-10`. Sections: `py-32`.
- Use flex/grid with `gap`, not margins between siblings.
- Mobile first: check at 390px. Rows wrap or stack; nothing wider than the screen; no
  horizontal page scroll (`overflow-x: clip` is on body; don't rely on it to hide bugs).
- Text measure about 65 characters (`max-w-md` / `max-w-xl` for paragraphs).
- Cards in a row share edges, padding and baseline; let content decide height.
- Use borders, fills and shadows only on things that really are separate objects.

## Typography
- One type scale: display sizes (text-5xl → 8xl / vw-based heroes), body `text-base`/`text-lg`,
  meta `text-sm`/`text-xs`, labels `.label`.
- Headings `text-wrap: balance`; numbers in columns `tabular-nums`.
- Buttons and chips: `whitespace-nowrap`.

## Colour
- Only the brand tokens. Check contrast on dark (`bg-ink`) bands: secondary text ≥ `text-stone/60`.
- Semantic colour (e.g. the green "live stock" dot) is fine but small.

## Accessibility
- Semantic landmarks (`header`, `main`, `section` with headings, `footer`), one `h1`.
- Every interactive element is a real `a` or `button` with visible `:focus-visible`.
- `aria-label` on icon-only buttons; `alt` / `aria-label` on meaningful SVG tiles.
- Respect `prefers-reduced-motion` (global rule in globals.css; don't bypass it with JS loops).
- Content must be readable at rest: animations start from a visible-able state and use
  `viewport={{ once: true }}`; never leave important text stuck at opacity 0.

## Copy
- Plain, specific, the customer's words ("Get a quote", "Boxes in stock"), active voice.
- No lorem ipsum. Unknown business facts → placeholder clearly marked in `lib/site.ts`, and tell the user.

## Check
Run the zeel-design QA loop (screenshots desktop + mobile) before saying it's done.
