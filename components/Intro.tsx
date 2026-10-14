"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";

const letters = "ZEEL".split("");

export default function Intro() {
  const [done, setDone] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    lenis?.stop();
    const t = setTimeout(() => setDone(true), 1900);
    return () => clearTimeout(t);
  }, [lenis]);

  useEffect(() => {
    if (done) lenis?.start();
  }, [done, lenis]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink text-ivory"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="display flex overflow-hidden text-[22vw] md:text-[14vw]">
              {letters.map((l, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  {l}
                </motion.span>
              ))}
            </div>
            <motion.div
              className="h-px w-48 origin-left bg-bronze"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
            />
            <motion.p className="label text-stone/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
              Tiles &amp; Sanitary
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
