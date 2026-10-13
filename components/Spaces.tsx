"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import Tile from "./Tile";
import { products, spaces } from "@/lib/data";
import { Lines } from "./Reveal";

function Card({ s, i, total, progress }: { s: (typeof spaces)[number]; i: number; total: number; progress: MotionValue<number> }) {
  const p = products.find((x) => x.id === s.tile)!;
  const dark = ["Kitchen", "Outdoor", "Commercial"].includes(s.title);
  const scale = useTransform(progress, [i / total, 1], [1, 1 - (total - i) * 0.04]);
  return (
    <div className="sticky top-0 flex h-[100svh] items-start justify-center px-4 md:px-10" style={{ paddingTop: `calc(9vh + ${i * 18}px)` }}>
      <motion.article
        style={{ scale, backgroundColor: s.tone }}
        className={`relative grid h-[78svh] w-full max-w-[1500px] origin-top overflow-hidden rounded-2xl md:grid-cols-[1fr_1.1fr] ${dark ? "text-ivory" : "text-ink"}`}
      >
        <div className="flex flex-col justify-between p-6 md:p-12">
          <div className="flex items-center justify-between">
            <span className="label opacity-60">Space {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
          </div>
          <div>
            <h3 className="display text-[18vw] md:text-[9vw]">{s.title}</h3>
            <p className="mt-4 max-w-sm opacity-75">{s.line}</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {s.items.map((it) => (
                <li key={it} className={`rounded-full border px-4 py-2 text-xs font-medium ${dark ? "border-ivory/25" : "border-ink/20"}`}>
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="relative hidden md:block">
          <div className="absolute inset-0 grid grid-cols-2 gap-1 p-1">
            {[0, 1, 2, 3].map((k) => (
              <div key={k} className="overflow-hidden rounded-lg">
                <Tile look={{ ...p.look, seed: (p.look.seed ?? 1) + k }} portrait />
              </div>
            ))}
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function Spaces() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section id="spaces" className="pt-32">
      <div className="mx-auto mb-8 max-w-[1600px] px-4 md:px-10">
        <h2 className="display text-6xl md:text-8xl">
          <Lines lines={["Designed for", <em key="s" className="text-bronze">every room.</em>]} />
        </h2>
      </div>
      <div ref={ref}>
        {spaces.map((s, i) => (
          <Card key={s.title} s={s} i={i} total={spaces.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
