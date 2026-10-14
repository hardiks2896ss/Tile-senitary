"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

const text =
  "A building is only as beautiful as the surfaces you touch every day. For years, Zeel has helped families, builders and architects choose the floors, walls, basins and fittings that turn concrete into a place to live — with honest advice, deep stock and same-batch shades.";

function Word({ w, range, p }: { w: string; range: [number, number]; p: MotionValue<number> }) {
  const o = useTransform(p, range, [0.12, 1]);
  return (
    <motion.span style={{ opacity: o }} className="mr-[0.25em] inline-block">
      {w}
    </motion.span>
  );
}

export default function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <section className="mx-auto max-w-[1600px] px-4 py-32 md:px-10 md:py-48">
      <p className="label mb-10 text-muted">(About Zeel)</p>
      <p ref={ref} className="display max-w-6xl text-[9vw] leading-[1.02] md:text-[4.6vw]">
        {words.map((w, i) => (
          <Word key={i} w={w} p={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
        ))}
      </p>
    </section>
  );
}
