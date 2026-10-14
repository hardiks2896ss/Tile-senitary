// Builds a static preview: node preview/build.mjs <outDir>
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const out = process.argv[2] ?? "preview-dist";
mkdirSync(out, { recursive: true });

await build({
  entryPoints: ["preview/entry.tsx"],
  bundle: true,
  minify: true,
  format: "iife",
  jsx: "automatic",
  define: { "process.env.NODE_ENV": '"production"' },
  outfile: join(out, "app.js"),
  alias: { "@": "." },
  loader: { ".css": "css" },
});

execFileSync("npx", ["@tailwindcss/cli", "-i", "app/globals.css", "-o", join(out, "tw.css"), "--minify"], { stdio: "inherit" });

writeFileSync(
  join(out, "index.html"),
  `<title>Zeel Tiles &amp; Sanitary</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="tw.css">
<link rel="stylesheet" href="app.css">
<style>
  html { --font-serif: "Instrument Serif"; --font-sans: "Manrope"; color-scheme: light; }
  body { background: #f3eee6; color: #151311; }
</style>
<div id="app"></div>
<script src="app.js"></script>
`
);
console.log("built", out);
