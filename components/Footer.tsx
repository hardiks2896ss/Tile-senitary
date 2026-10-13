"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLenis } from "lenis/react";
import { categories } from "@/lib/data";
import { site } from "@/lib/site";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);

  return (
    <footer ref={ref} className="overflow-hidden bg-ink text-ivory">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-4 pt-24 md:grid-cols-4 md:px-10">
        <div className="md:col-span-2">
          <p className="display max-w-md text-4xl">Tiles, sanitaryware &amp; everything that finishes a building.</p>
        </div>
        <ul className="grid grid-cols-2 gap-2 text-sm text-stone/60 md:col-span-1 md:grid-cols-1">
          {categories.slice(0, 6).map((c) => <li key={c.n}>{c.title}</li>)}
        </ul>
        <div className="space-y-2 text-sm text-stone/60">
          <p>{site.address}</p>
          <p>{site.phone}</p>
          <p>{site.email}</p>
          <button onClick={() => lenis?.scrollTo(0, { duration: 2.2 })} className="label mt-6 text-ivory hover:text-bronze">
            Back to top ↑
          </button>
        </div>
      </div>
      <motion.p style={{ y }} className="display select-none whitespace-nowrap text-center text-[34vw] leading-[0.8] text-ivory/95" aria-hidden>
        Zeel
      </motion.p>
      <div className="mx-auto flex max-w-[1600px] justify-between border-t border-ivory/15 px-4 py-6 text-xs text-stone/50 md:px-10">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>Every surface. Every space.</span>
      </div>
    </footer>
  );
}
