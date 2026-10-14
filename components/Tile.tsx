"use client";

import { useId } from "react";
import type { TileLook } from "@/lib/data";

type Props = {
  look: TileLook;
  className?: string;
  /** 600×1200 slab standing upright instead of landscape */
  portrait?: boolean;
  label?: string;
};

// deterministic PRNG so server and client render the same veins
function rng(seed: number) {
  let s = seed * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

/** Builds a set of long diagonal strokes that the displacement filter bends into marble veins. */
function veins(seed: number, w: number, h: number, count: number, bold: boolean) {
  const r = rng(seed);
  const out: { d: string; sw: number; o: number }[] = [];
  for (let i = 0; i < count; i++) {
    const x0 = -w * 0.3 + r() * w * 1.6;
    const tilt = (bold ? 0.15 : 0.55) + r() * 0.5;
    const y0 = -h * 0.2;
    const y1 = h * 1.2;
    const x1 = x0 + (y1 - y0) * tilt * (r() > 0.5 ? 1 : -1);
    const cx = (x0 + x1) / 2 + (r() - 0.5) * w * 0.6;
    const cy = (y0 + y1) / 2 + (r() - 0.5) * h * 0.4;
    const main = i < (bold ? 2 : 3);
    out.push({
      d: bold ? `M${y0 * 2},${x0 * 0.5 + h * 0.2} Q${cy * 2},${cx * 0.5} ${y1 * 2},${x1 * 0.5 + h * 0.3}` : `M${x0},${y0} Q${cx},${cy} ${x1},${y1}`,
      sw: main ? (bold ? 9 + r() * 10 : 2.2 + r() * 2.5) : 0.6 + r() * 1.2,
      o: main ? 0.95 : 0.35 + r() * 0.4,
    });
  }
  return out;
}

/** Procedural marble / stone slab rendered with SVG turbulence + displacement. */
export default function Tile({ look, className = "", portrait = false, label }: Props) {
  const id = `t${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const w = 1200;
  const h = 600;
  const seed = look.seed ?? 1;
  const bold = look.vein === "#1a1a1a";
  const lines = look.freq ? veins(seed, w, h, bold ? 5 : 14, bold) : [];
  const lines2 = look.vein2 ? veins(seed + 50, w, h, 6, false) : [];
  const gloss = look.gloss ?? 0;

  return (
    <svg
      viewBox={portrait ? `0 0 ${h} ${w}` : `0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid slice"
      className={`block h-full w-full ${className}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        <filter id={`${id}c`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.003 0.005" numOctaves="4" seed={seed + 3} />
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.6 0 0 0 -0.55" />
          <feComposite in="SourceGraphic" operator="in" />
        </filter>
        <filter id={`${id}d`} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.006" numOctaves="5" seed={seed} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale={bold ? 120 : 170} xChannelSelector="R" yChannelSelector="G" result="d" />
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed={seed + 9} result="f" />
          <feDisplacementMap in="d" in2="f" scale="9" xChannelSelector="R" yChannelSelector="G" result="e" />
          <feGaussianBlur in="e" stdDeviation="0.6" />
        </filter>
        <filter id={`${id}s`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="turbulence" baseFrequency="0.03" numOctaves="3" seed={seed + 1} result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  3 0 0 0 -0.85" result="m" />
          <feComposite in="SourceGraphic" in2="m" operator="in" />
        </filter>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity={gloss * 0.5} />
          <stop offset="0.38" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.6" stopColor="#fff" stopOpacity={gloss * 0.16} />
          <stop offset="0.68" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g transform={portrait ? `rotate(90 ${h / 2} ${h / 2})` : undefined}>
        <rect width={w} height={h} fill={look.base} />
        {look.cloud && <rect width={w} height={h} fill={look.cloud} filter={`url(#${id}c)`} />}
        {look.speckle && <rect width={w} height={h} fill={look.vein} opacity="0.75" filter={`url(#${id}s)`} />}
        {lines.length > 0 && (
          <g filter={`url(#${id}d)`} fill="none" strokeLinecap="round">
            {lines.map((l, i) => (
              <path key={i} d={l.d} stroke={look.vein} strokeWidth={l.sw} strokeOpacity={l.o} />
            ))}
            {lines2.map((l, i) => (
              <path key={`b${i}`} d={l.d} stroke={look.vein2} strokeWidth={l.sw * 0.8} strokeOpacity={Math.min(1, l.o + 0.2)} />
            ))}
          </g>
        )}
        {gloss > 0 && <rect width={w} height={h} fill={`url(#${id}g)`} />}
      </g>
    </svg>
  );
}
