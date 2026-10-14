# Setup: Zeel Tiles & Sanitary on your computer (VS Code + Claude Code)

Follow these steps once, top to bottom.

## 1. Install the tools
| Tool | Check | Get it |
|---|---|---|
| Git | `git --version` | https://git-scm.com/downloads |
| Node.js 20 or newer | `node -v` | https://nodejs.org (LTS) |
| VS Code | `code --version` | https://code.visualstudio.com |
| Claude Code | `claude --version` | `npm install -g @anthropic-ai/claude-code`, then run `claude` once and log in |

## 2. Clone the repo
Repository: **https://github.com/hardiks2896ss/Tile-senitary**

```bash
git clone https://github.com/hardiks2896ss/Tile-senitary.git
cd Tile-senitary
git checkout claude/zeel-tiles-website   # skip this if PR #1 is already merged into main
```

## 3. Install and run
```bash
npm install
npx playwright install chromium   # once; lets Claude take screenshots of the site
npm run dev                        # open http://localhost:3000
```

## 4. Open in VS Code with Claude Code
```bash
code .
```
- Install the **Claude Code** extension from the VS Code Extensions panel (search "Claude Code"),
  or open VS Code's terminal (`Ctrl+``) and run `claude`.
- Claude reads `CLAUDE.md` and the project skills in `.claude/skills/` automatically. There's nothing to paste.
- Optional: run `claude --teleport` in this folder to continue the original cloud session with its full history.

## 5. First message to Claude
> Read CLAUDE.md and PROMPT.md. Start the dev server, run `npm run shots`, look at the
> screenshots and tell me the top 5 improvements.

## 6. Project skills (in `.claude/skills/`)
| Skill | When it runs |
|---|---|
| `prompt-builder` | **Every message.** It rewrites your message into a structured prompt before any work starts. A hook in `.claude/settings.json` enforces this. |
| `zeel-design` | Any visual change: palette, type, motion, tiles, and the screenshot check |
| `frontend-ui` | Any UI/HTML/CSS work: layout, responsiveness, accessibility, design craft |
| `react-next` | Any React / Next.js / Framer Motion / Lenis code |

Check they're loaded: type `/skills` in Claude Code.

## 7. Deploy to Vercel
```bash
npx vercel          # log in once, link the project
npx vercel --prod   # publish the live URL
```
Or import the repo at https://vercel.com/new. Every push then redeploys automatically.

## 8. Before showing the client
- Put the real phone / WhatsApp / email / address in `lib/site.ts`.
- Confirm stock numbers and the stats in `components/Builders.tsx`.
