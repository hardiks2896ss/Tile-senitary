"use client";

import { motion } from "framer-motion";
import { categories } from "@/lib/data";
import Icon from "./Icon";
import { Lines } from "./Reveal";
import { waLink } from "@/lib/site";

export default function Categories() {
  return (
    <section id="categories" className="mx-auto max-w-[1600px] px-4 pb-32 md:px-10">
      <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <h2 className="display text-6xl md:text-8xl">
          <Lines lines={["The building", <em key="i" className="text-bronze">index.</em>]} />
        </h2>
        <p className="max-w-md text-ink-soft">
          Twelve departments under one roof — from the first plumbing line to the last mirror. Tap any category to
          ask for prices, brands and availability.
        </p>
      </div>
      <ul className="grid gap-px border-y border-ink/15 bg-ink/15 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c, i) => (
          <motion.li
            key={c.n}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ delay: (i % 3) * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="bg-ivory"
          >
            <a
              href={waLink(`Hi Zeel, please share details for ${c.title}.`)}
              target="_blank"
              rel="noreferrer"
              className="group relative flex h-full flex-col gap-10 overflow-hidden p-6 md:p-8"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100" />
              <div className="relative flex items-start justify-between transition-colors duration-500 group-hover:text-ivory">
                <span className="label text-muted transition-colors group-hover:text-bronze">{c.n}</span>
                <Icon name={c.icon} className="h-14 w-14 transition-transform duration-700 group-hover:-rotate-6 group-hover:scale-110" />
              </div>
              <div className="relative transition-colors duration-500 group-hover:text-ivory">
                <h3 className="display text-4xl md:text-5xl">{c.title}</h3>
                <p className="mt-3 text-sm text-muted transition-colors group-hover:text-stone/70">{c.sub}</p>
                <span className="label mt-6 inline-flex items-center gap-2 opacity-0 transition-all duration-500 group-hover:opacity-100">
                  Enquire <span aria-hidden>→</span>
                </span>
              </div>
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
