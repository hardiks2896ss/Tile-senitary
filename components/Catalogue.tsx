"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Tile from "./Tile";
import { finishes, products, type Finish } from "@/lib/data";
import { Lines } from "./Reveal";
import { waLink } from "@/lib/site";

const max = Math.max(...products.map((p) => p.stock));
const sqm = (boxes: number, pcs: number) => Math.round(boxes * pcs * 0.72);

export default function Catalogue() {
  const [filter, setFilter] = useState<Finish | "All">("All");
  const list = filter === "All" ? products : products.filter((p) => p.finish === filter);
  const total = list.reduce((s, p) => s + p.stock, 0);

  return (
    <section id="collection" className="mx-auto max-w-[1600px] px-4 py-32 md:px-10">
      <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="label mb-6 flex items-center gap-2 text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Live stock · Premium grade
          </p>
          <h2 className="display text-6xl md:text-8xl">
            <Lines lines={["Ready to", <em key="d" className="text-bronze">dispatch.</em>]} />
          </h2>
        </div>
        <div className="text-left lg:text-right">
          <motion.p key={total} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="display text-6xl">
            {total.toLocaleString("en-IN")}
          </motion.p>
          <p className="label text-muted">boxes · ≈ {list.reduce((s, p) => s + sqm(p.stock, p.pcs), 0).toLocaleString("en-IN")} m² in stock</p>
        </div>
      </div>

      <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter by finish">
        {(["All", ...finishes.map((f) => f.name)] as const).map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={`relative rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
              filter === f ? "border-ink text-ivory" : "border-ink/20 hover:border-ink"
            }`}
          >
            {filter === f && (
              <motion.span layoutId="pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 35 }} />
            )}
            <span className="relative">{f}</span>
          </button>
        ))}
      </div>

      <motion.ul layout className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.li
              layout
              key={p.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <div className="relative aspect-[2/1] overflow-hidden rounded-sm ring-1 ring-ink/10">
                <div className="h-full w-full transition-transform duration-1000 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110">
                  <Tile look={p.look} label={`${p.name} ${p.finish}`} />
                </div>
                <a
                  href={waLink(`Hi Zeel, I'm interested in ${p.name} (${p.finish}, ${p.size}). Please share price for ___ boxes.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="label absolute inset-x-3 bottom-3 translate-y-[140%] rounded-full bg-ivory py-2.5 text-center text-ink transition-transform duration-500 group-hover:translate-y-0 focus:translate-y-0"
                >
                  Enquire on WhatsApp →
                </a>
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  <p className="text-sm text-muted">
                    {p.finish} · {p.size} mm · {p.pcs} pcs/box
                  </p>
                </div>
                <span className="label rounded-full border border-ink/15 px-2 py-1 text-[0.6rem]">{p.grade}</span>
              </div>
              <div className="mt-4">
                <div className="mb-1.5 flex justify-between text-xs text-muted">
                  <span>In stock</span>
                  <span className="font-semibold text-ink">{p.stock} boxes</span>
                </div>
                <div className="h-[3px] w-full overflow-hidden rounded-full bg-ink/10">
                  <motion.div
                    className="h-full rounded-full bg-bronze"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(p.stock / max) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </section>
  );
}
