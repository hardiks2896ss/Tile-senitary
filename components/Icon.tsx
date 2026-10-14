const paths: Record<string, React.ReactNode> = {
  slab: (<><rect x="10" y="6" width="28" height="36" rx="1" /><path d="M14 14c6 2 8 8 20 10M14 30c5-3 12 2 20-4" /></>),
  grid: (<><rect x="8" y="8" width="32" height="32" /><path d="M8 24h32M24 8v32M8 16h32M16 8v32M32 8v32M8 32h32" opacity=".5" /></>),
  paver: (<><path d="M6 34l18-10 18 10-18 10z" /><path d="M6 34v-6l18-10 18 10v6M15 29l18 10M33 29L15 39" opacity=".6" /></>),
  wc: (<><path d="M12 8h12v14H12z" /><path d="M10 22h26c0 8-5 12-12 12h-2l2 8H14l2-9c-4-2-6-6-6-11z" /></>),
  faucet: (<><path d="M10 40h16M18 40V22M18 22c0-8 4-12 12-12h4v6h-4c-3 0-5 2-5 6" /><path d="M34 22v4M34 30v2M34 36v2" /></>),
  shower: (<><path d="M10 42V12c0-4 3-6 6-6s6 2 6 6v2" /><path d="M16 14h12l4 6H12z" /><path d="M16 26v2M22 26v4M28 26v2M19 34v2M25 34v2" /></>),
  sink: (<><path d="M6 22h36M10 22v6c0 6 4 10 14 10s14-4 14-10v-6" /><path d="M24 22V10h8v4" /><circle cx="24" cy="30" r="2" /></>),
  stone: (<><path d="M8 34l6-18 14-6 12 10-2 16-16 6z" /><path d="M14 16l10 8 14-4M24 24l-4 16" opacity=".6" /></>),
  pipe: (<><path d="M6 18h20a8 8 0 018 8v16M6 28h20v14" /><path d="M10 14v18M38 38h-16" /></>),
  heater: (<><rect x="14" y="6" width="20" height="36" rx="10" /><path d="M20 42v4M28 42v4" /><circle cx="24" cy="18" r="3" /></>),
  bag: (<><path d="M12 12h24l4 30H8z" /><path d="M12 12l4-6h16l4 6M16 24h16M18 30h12" /></>),
  mirror: (<><rect x="12" y="4" width="24" height="32" rx="12" /><path d="M8 40h32v4H8z" /><path d="M18 14l6-4M18 20l10-7" opacity=".6" /></>),
};

export default function Icon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {paths[name]}
    </svg>
  );
}
