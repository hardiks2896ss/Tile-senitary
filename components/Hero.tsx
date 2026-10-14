"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Tile from "./Tile";
import Magnetic from "./Magnetic";
import { products } from "@/lib/data";
import { waLink } from "@/lib/site";

const byId = (id: string) => products.find((p) => p.id === id)!;
const cols = [
  ["black-panda", "beautic-beige-c", "archie-grey"],
  ["sahara-noir", "casa-multi", "bross-brown"],
  ["vel-zeus-white", "korten", "essent-crema"],
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]);
  const ys = [y1, y2, y3];
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative min-h-[100svh] overflow-hidden pt-24">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-4 md:px-10 lg:grid-cols-[1.15fr_1fr]">
        <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 flex flex-col justify-center py-10 lg:py-24">
          <motion.p
            className="label mb-8 flex items-center gap-3 text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <span className="h-px w-10 bg-bronze" /> Tiles · Sanitaryware · Bath · Building materials
          </motion.p>
          <h1 className="display text-[17vw] sm:text-[13vw] lg:text-[8.6vw]">
            {["Every surface.", <em key="e" className="text-bronze">Every space.</em>, "One address."].map((l, i) => (
              <span key={i} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ delay: 1.75 + i * 0.12, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {l}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.div
            className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3, duration: 0.8 }}
          >
            <p className="max-w-sm text-base leading-relaxed text-ink-soft">
              From 1200&nbsp;mm porcelain slabs to wall-hung closets, rain showers and CPVC lines — everything
              that finishes a building, in stock and ready to dispatch.
            </p>
            <div className="flex shrink-0 gap-3">
              <Magnetic>
                <a href="#collection" className="inline-block whitespace-nowrap rounded-full bg-ink px-7 py-4 text-sm font-semibold text-ivory transition-colors hover:bg-bronze">
                  Explore collection
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={waLink("Hi Zeel, I'd like to visit the showroom.")}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block whitespace-nowrap rounded-full border border-ink/25 px-7 py-4 text-sm font-semibold transition-colors hover:border-ink"
                >
                  Visit showroom
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </motion.div>

        <div className="relative -mx-4 grid h-[70svh] grid-cols-3 gap-3 overflow-hidden md:mx-0 lg:h-[calc(100svh-6rem)]">
          {cols.map((col, ci) => (
            <motion.div key={ci} style={{ y: ys[ci] }} className="flex flex-col gap-3">
              {col.concat(col[0]).map((id, i) => {
                const p = byId(id);
                return (
                  <motion.div
                    key={i}
                    className="relative aspect-[1/2] shrink-0 overflow-hidden rounded-sm shadow-[0_30px_60px_-30px_rgba(21,19,17,0.45)]"
                    initial={{ opacity: 0, scale: 1.15 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.6 + ci * 0.12 + i * 0.05, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Tile look={p.look} portrait label={`${p.name} ${p.finish} tile`} />
                    <span className="label absolute bottom-3 left-3 rounded-full bg-ivory/80 px-2.5 py-1 text-[0.58rem] text-ink backdrop-blur">
                      {p.name}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          ))}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ivory to-transparent" />
        </div>
      </div>
      <motion.div
        className="label absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-muted lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6 }}
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-ink/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-ink"
            animate={{ y: [-16, 40] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
