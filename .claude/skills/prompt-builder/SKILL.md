---
name: prompt-builder
description: MUST run first on every user message in this project. Rewrites the user's message (often short, informal or mixed Hindi/Gujarati-English) into a precise, structured working prompt for the Zeel Tiles & Sanitary website, shows it to the user, then carries it out.
---

# Prompt builder (mandatory, every message)

The user writes short, quick messages. Before doing any work, turn the message into a
complete prompt, show it, then do it.

## Steps
1. **Read the message and the context**: `CLAUDE.md`, `PROMPT.md` and the files the request touches.
2. **Rewrite it** using the template below. Fill gaps with sensible defaults from the design
   system. Don't invent business facts (prices, phone numbers, stock); list those as questions.
3. **Show it** to the user under the heading `Rewritten prompt`, in a fenced block.
4. **Proceed immediately** unless something is truly blocking (missing business data, or a
   choice that changes the outcome a lot). Then ask at most 2 short questions.
5. When finished, check the result against the **Done when** list and report against it.

## Template
```
Goal: <one sentence: what the user wants and why>
Context: <page/section/files involved; current state>
Changes:
  1. <concrete change, file>
  2. ...
Design rules: <relevant zeel-design rules: palette, type, motion, mobile>
Skills to apply: <zeel-design / frontend-ui / react-next>
Out of scope: <what not to touch>
Open questions: <only real unknowns, or "none">
Done when:
  - npm run build passes
  - screenshots (desktop + mobile) checked: <specific things to look for>
  - <request-specific acceptance check>
```

## Example
User: "hero ma sanitary products pan batavo"
```
Goal: Show sanitaryware in the hero so visitors see Zeel sells more than tiles.
Context: components/Hero.tsx — right side is a 3-column tile mosaic.
Changes:
  1. Replace 2 of the 9 mosaic cells with sanitaryware cards (WC, basin) using line icons
     from components/Icon.tsx on a stone background, keeping the label chip style.
  2. Update the eyebrow text to mention sanitaryware first.
Design rules: keep parallax speeds, ivory/stone/ink/bronze only, labels in .label style.
Skills to apply: zeel-design, react-next
Out of scope: headline copy, nav.
Open questions: none (can swap in real product photos later)
Done when:
  - build passes; desktop + mobile screenshots show the new cards un-clipped
  - mosaic still loops with no gaps while scrolling
```
