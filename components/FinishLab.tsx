"use client";

import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";
import Tile from "./Tile";
import { finishes, products, type Finish } from "@/lib/data";
import { Lines } from "./Reveal";

const sample: Record<Finish, string> = {
  Matt: "archie-grey",
  Carving: "casa-multi",
  Velvet: "vel-zeus-white",
  Glossy: "black-panda",
  "Super High Gloss": "sahara-noir",
};

export default function FinishLab() {
  const [active, setActive] = useState(3);
  const f = finishes[active];
  const p = products.find((x) => x.id === sample[f.name])!;

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.35);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });
  const rotX = useTransform(sy, [0, 1], [10, -10]);
  const rotY = useTransform(sx, [0, 1], [-14, 14]);
  const px = useTransform(sx, (v) => `${v * 100}%`);
  const py = useTransform(sy, (v) => `${v * 100}%`);
  const size = 18 + f.rough * 50;
  const sheen = useMotionTemplate`radial-gradient(circle at ${px} ${py}, rgba(255,255,255,${f.sheen}) 0%, rgba(255,255,255,${f.sheen * 0.25}) ${size}%, transparent ${size + 25}%)`;

  return (
    <section id="finishes" className="bg-stone py-32">
      <div className="mx-auto grid max-w-[1600px] gap-16 px-4 md:px-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="label mb-6 text-muted">(Finish lab — move your cursor over the tile)</p>
          <h2 className="display mb-12 text-6xl md:text-8xl">
            <Lines lines={["Feel the", <em key="f" className="text-bronze">difference.</em>]} />
          </h2>
          <ul className="border-t border-ink/15">
            {finishes.map((x, i) => (
              <li key={x.name} className="border-b border-ink/15">
                <button
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className="flex w-full items-center justify-between py-5 text-left"
                  aria-pressed={active === i}
                >
                  <span className={`display text-3xl transition-all duration-500 md:text-5xl ${active === i ? "translate-x-3 text-ink" : "text-ink/35"}`}>
                    {x.name}
                  </span>
                  <span className="flex items-center gap-1" aria-label={`Reflectivity ${Math.round(x.sheen * 5)} of 5`}>
                    {Array.from({ length: 5 }).map((_, k) => (
                      <span key={k} className={`h-1.5 w-4 rounded-full transition-colors ${k < Math.round(x.sheen * 5 + 0.4) ? (active === i ? "bg-bronze" : "bg-ink/30") : "bg-ink/10"}`} />
                    ))}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {active === i && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden pl-3 text-ink-soft"
                    >
                      <span className="block max-w-md pb-6">{x.desc}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="flex justify-center [perspective:1400px]"
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            mx.set((e.clientX - r.left) / r.width);
            my.set((e.clientY - r.top) / r.height);
          }}
          onPointerLeave={() => { mx.set(0.5); my.set(0.35); }}
        >
          <motion.div
            style={{ rotateX: rotX, rotateY: rotY }}
            className="relative aspect-[1/2] w-[min(80vw,380px)] overflow-hidden rounded-[3px] shadow-[0_60px_120px_-40px_rgba(21,19,17,0.6)]"
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                key={p.id}
                className="absolute inset-0"
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                animate={{ clipPath: "inset(0% 0 0 0)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              >
                <Tile look={{ ...p.look, gloss: 0 }} portrait label={`${p.name} in ${f.name} finish`} />
              </motion.div>
            </AnimatePresence>
            {f.name === "Carving" && (
              <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply [background:repeating-linear-gradient(115deg,transparent_0_14px,rgba(0,0,0,.06)_14px_15px,transparent_15px_28px)]" />
            )}
            {f.name === "Matt" && (
              <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%221.2%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')]" />
            )}
            <motion.div className="pointer-events-none absolute inset-0 mix-blend-soft-light" style={{ background: sheen }} />
            <motion.div className="pointer-events-none absolute inset-0" style={{ background: sheen, opacity: f.sheen * 0.6 }} />
            <span className="label absolute bottom-4 left-4 rounded-full bg-ivory/85 px-3 py-1.5 text-[0.6rem] backdrop-blur">
              {p.name} · {f.name}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
