"use client";

import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Lines } from "./Reveal";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2, ease: [0.22, 1, 0.36, 1], onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {v.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

const stats = [
  { to: 3500, suffix: "+", label: "Boxes of premium slabs in stock" },
  { to: 12, suffix: "", label: "Building-material departments" },
  { to: 1200, suffix: "+", label: "SKUs across tiles, sanitary & CP" },
  { to: 48, suffix: "h", label: "Typical dispatch for in-stock orders" },
];

const steps = [
  { t: "Share your BOQ", d: "Send drawings or a bill of quantities on WhatsApp or email." },
  { t: "Curated proposal", d: "We shortlist finishes, brands and alternates across your budget bands." },
  { t: "Samples & mock-ups", d: "Physical samples to site or studio; same-batch shade reserved." },
  { t: "Scheduled dispatch", d: "Floor-wise, phase-wise delivery with breakage cover and site support." },
];

export default function Builders() {
  return (
    <section id="builders" className="bg-ink py-32 text-ivory">
      <div className="mx-auto max-w-[1600px] px-4 md:px-10">
        <div className="grid gap-12 lg:grid-cols-2">
          <h2 className="display text-6xl md:text-8xl">
            <Lines lines={["For builders &", <em key="a" className="text-bronze">architects.</em>]} />
          </h2>
          <p className="self-end text-lg text-stone/70">
            Project pricing, bulk stock and a single point of contact for every material that goes into the finishing
            stage — from residential towers to hospitality and healthcare.
          </p>
        </div>

        <dl className="mt-24 grid grid-cols-2 gap-px bg-ivory/15 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-ink py-10 pr-6 lg:px-8 lg:first:pl-0">
              <dt className="sr-only">{s.label}</dt>
              <dd className="display text-6xl text-ivory md:text-8xl">
                <Counter to={s.to} suffix={s.suffix} />
              </dd>
              <p className="mt-3 max-w-[16rem] text-sm text-stone/60">{s.label}</p>
            </div>
          ))}
        </dl>

        <ol className="mt-24 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.li
              key={s.t}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-ivory/20 pt-6"
            >
              <span className="label text-bronze">Step {i + 1}</span>
              <h3 className="display mt-4 text-4xl">{s.t}</h3>
              <p className="mt-3 text-sm text-stone/60">{s.d}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
