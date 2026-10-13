"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Tile from "./Tile";
import { products } from "@/lib/data";

const picks = ["black-panda", "sahara-noir", "casa-multi", "bross-brown", "archie-grey", "z-black", "essent-crema"].map(
  (id) => products.find((p) => p.id === id)!
);

export default function SlabGallery() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  useEffect(() => {
    const measure = () => track.current && setDist(track.current.scrollWidth - window.innerWidth + 40);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -dist]);
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className="relative h-[400vh] bg-ink text-ivory">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-10 flex w-full max-w-[1600px] items-end justify-between px-4 md:px-10">
          <h2 className="display text-5xl md:text-8xl">
            Slab <em className="text-bronze">gallery</em>
          </h2>
          <p className="label hidden text-stone/60 md:block">600 × 1200 mm · Large format porcelain</p>
        </div>
        <motion.div ref={track} style={{ x }} className="flex w-max gap-6 pl-4 md:gap-10 md:pl-10">
          {picks.map((p, i) => (
            <figure key={p.id} className="group w-[78vw] shrink-0 sm:w-[60vw] lg:w-[46vw]">
              <div className="relative aspect-[2/1] overflow-hidden rounded-sm">
                <div className="h-full w-full transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105">
                  <Tile look={p.look} label={`${p.name} slab`} />
                </div>
                <span className="display absolute right-4 top-2 text-7xl text-ivory/20 mix-blend-difference md:text-9xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <figcaption className="mt-5 flex items-baseline justify-between border-t border-ivory/15 pt-4">
                <span className="display text-3xl md:text-4xl">{p.name}</span>
                <span className="label text-stone/60">{p.finish}</span>
              </figcaption>
            </figure>
          ))}
        </motion.div>
        <div className="mx-auto mt-12 w-full max-w-[1600px] px-4 md:px-10">
          <div className="h-px w-full bg-ivory/15">
            <motion.div style={{ scaleX: bar }} className="h-px origin-left bg-bronze" />
          </div>
        </div>
      </div>
    </section>
  );
}
