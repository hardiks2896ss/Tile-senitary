"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const items = ["Porcelain Slabs", "Sanitaryware", "Bath Fittings", "Natural Stone", "Kitchen Sinks", "Parking Tiles", "Plumbing", "Water Heaters", "Adhesives & Grout", "LED Mirrors"];

export default function Marquee() {
  const { scrollYProgress } = useScroll();
  const skew = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const row = [...items, ...items];
  return (
    <section aria-label="Product range" className="overflow-hidden border-y border-ink/10 bg-ink py-6 text-ivory">
      <motion.div style={{ x: skew }}>
        <div className="flex w-max animate-[marquee_40s_linear_infinite] gap-10">
          {row.map((t, i) => (
            <span key={i} className="display flex items-center gap-10 whitespace-nowrap text-5xl md:text-7xl">
              {t}
              <span className="inline-block h-3 w-3 rotate-45 bg-bronze" />
            </span>
          ))}
        </div>
      </motion.div>
      <style>{`@keyframes marquee { to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}
