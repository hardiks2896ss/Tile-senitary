"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { site, waLink } from "@/lib/site";

const links = [
  ["Categories", "#categories"],
  ["Collection", "#collection"],
  ["Finishes", "#finishes"],
  ["Spaces", "#spaces"],
  ["Builders", "#builders"],
];

export default function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(v > prev && v > 400 && !open);
    setSolid(v > 40);
  });

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid ? "bg-ivory/80 backdrop-blur-md" : ""}`}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-4 md:px-10">
          <a href="#top" className="flex items-baseline gap-2" aria-label={site.name}>
            <span className="display text-3xl">Zeel</span>
            <span className="label hidden text-muted sm:inline">Tiles &amp; Sanitary</span>
          </a>
          <ul className="hidden items-center gap-8 lg:flex">
            {links.map(([l, h]) => (
              <li key={h}>
                <a href={h} className="group relative text-sm font-medium">
                  {l}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-ink transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <a
              href={waLink("Hi Zeel, I'd like a quote.")}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-ivory transition-colors hover:bg-bronze sm:inline-block"
            >
              Get a Quote
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-ink/20 lg:hidden"
              aria-label="Menu"
              aria-expanded={open}
            >
              <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 4 : 0 }} className="h-px w-5 bg-ink" />
              <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -3 : 0 }} className="h-px w-5 bg-ink" />
            </button>
          </div>
        </nav>
      </motion.header>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-end bg-stone px-6 pb-12 lg:hidden"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            {links.map(([l, h], i) => (
              <motion.a
                key={h}
                href={h}
                onClick={() => setOpen(false)}
                className="display border-b border-ink/10 py-3 text-5xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.06 }}
              >
                {l}
              </motion.a>
            ))}
            <a href={waLink("Hi Zeel, I'd like a quote.")} className="mt-8 rounded-full bg-ink py-4 text-center font-semibold text-ivory">
              Get a Quote on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
