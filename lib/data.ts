export type Finish = "Matt" | "Carving" | "Velvet" | "Glossy" | "Super High Gloss";

export type TileLook = {
  base: string;
  vein: string;
  vein2?: string;
  cloud?: string;
  freq?: string;
  band?: number;
  speckle?: boolean;
  gloss?: number;
  seed?: number;
};

export type Product = {
  id: string;
  name: string;
  finish: Finish;
  size: string;
  pcs: number;
  stock: number;
  grade: string;
  look: TileLook;
};

export const products: Product[] = [
  { id: "archie-grey", name: "Archie Grey", finish: "Matt", size: "600×1200", pcs: 3, stock: 572, grade: "PRE",
    look: { base: "#a7a5a1", vein: "#d8d6d1", cloud: "#8d8b86", freq: "0.004 0.012", band: 0.5, gloss: 0, seed: 4 } },
  { id: "casa-multi", name: "Casa Multi", finish: "Carving", size: "600×1200", pcs: 3, stock: 521, grade: "PRE",
    look: { base: "#f4f3f0", vein: "#a9adb3", vein2: "#d4a74e", cloud: "#e3e3e2", freq: "0.006 0.018", band: 0.48, gloss: 0.15, seed: 11 } },
  { id: "black-panda", name: "Black Panda", finish: "Super High Gloss", size: "600×1200", pcs: 2, stock: 386, grade: "PRE",
    look: { base: "#f6f6f4", vein: "#1a1a1a", cloud: "#e8e8e6", freq: "0.002 0.03", band: 0.5, gloss: 0.6, seed: 23 } },
  { id: "beautic-beige-c", name: "Beautic Beige", finish: "Carving", size: "600×1200", pcs: 2, stock: 376, grade: "PRE",
    look: { base: "#efe5d3", vein: "#e2d4bb", cloud: "#e8dcc7", freq: "0.008 0.01", band: 0.52, gloss: 0.15, seed: 7 } },
  { id: "essent-crema", name: "Essent Crema", finish: "Carving", size: "600×1200", pcs: 2, stock: 328, grade: "PRE",
    look: { base: "#ece7dc", vein: "#bdb4a4", cloud: "#e1dbcf", freq: "0.005 0.009", band: 0.47, gloss: 0.15, seed: 31 } },
  { id: "sahara-noir", name: "Sahara Noir", finish: "Super High Gloss", size: "600×1200", pcs: 2, stock: 308, grade: "PRE",
    look: { base: "#121110", vein: "#c9a265", vein2: "#f1e9dc", cloud: "#1d1b19", freq: "0.004 0.016", band: 0.5, gloss: 0.6, seed: 17 } },
  { id: "z-black", name: "Z Black", finish: "Glossy", size: "600×1200", pcs: 2, stock: 284, grade: "PRE",
    look: { base: "#060606", vein: "#060606", gloss: 0.5, seed: 2 } },
  { id: "bross-brown", name: "Bross Brown", finish: "Super High Gloss", size: "600×1200", pcs: 2, stock: 231, grade: "PRE",
    look: { base: "#4a3627", vein: "#c9b08e", cloud: "#2f2219", freq: "0.012 0.014", band: 0.5, speckle: true, gloss: 0.6, seed: 9 } },
  { id: "vel-zeus-white", name: "Vel-Zeus White", finish: "Velvet", size: "600×1200", pcs: 2, stock: 211, grade: "PRE",
    look: { base: "#f3f3f1", vein: "#cfd0cf", cloud: "#ebebea", freq: "0.006 0.01", band: 0.5, gloss: 0.05, seed: 41 } },
  { id: "roma-ivory", name: "Roma Ivory", finish: "Carving", size: "600×1200", pcs: 2, stock: 204, grade: "PRE",
    look: { base: "#eee3cf", vein: "#e3d5bd", cloud: "#e6dac4", freq: "0.01 0.012", band: 0.5, gloss: 0.15, seed: 13 } },
  { id: "beautic-beige-m", name: "Beautic Beige", finish: "Matt", size: "600×1200", pcs: 2, stock: 203, grade: "PRE",
    look: { base: "#ece2cf", vein: "#e0d3bb", cloud: "#e4d8c3", freq: "0.008 0.01", band: 0.52, gloss: 0, seed: 8 } },
  { id: "korten", name: "Korten Rust", finish: "Glossy", size: "600×1200", pcs: 2, stock: 196, grade: "PRE",
    look: { base: "#7b4a2e", vein: "#a8683f", cloud: "#5a3320", freq: "0.02 0.02", band: 0.5, speckle: true, gloss: 0.4, seed: 19 } },
  { id: "archie-bianco", name: "Archie Bianco", finish: "Matt", size: "600×1200", pcs: 3, stock: 186, grade: "PRE",
    look: { base: "#e9e8e4", vein: "#c9c7c2", cloud: "#dedcd7", freq: "0.004 0.012", band: 0.5, gloss: 0, seed: 5 } },
];

export const finishes: { name: Finish; desc: string; sheen: number; rough: number }[] = [
  { name: "Matt", desc: "Zero glare, soft-touch and naturally anti-slip. The calm choice for bedrooms, offices and wet zones.", sheen: 0.08, rough: 1 },
  { name: "Carving", desc: "A tactile, hand-carved relief that catches low light — stone character with everyday grip.", sheen: 0.22, rough: 0.7 },
  { name: "Velvet", desc: "Satin-smooth with a whisper of lustre. Feels like honed marble under bare feet.", sheen: 0.32, rough: 0.5 },
  { name: "Glossy", desc: "Polished reflections that open up a room and bounce daylight deep into interiors.", sheen: 0.6, rough: 0.2 },
  { name: "Super High Gloss", desc: "Mirror-grade polish with crisp, liquid reflections — statement floors and feature walls.", sheen: 0.9, rough: 0.05 },
];

export const categories = [
  { n: "01", title: "Porcelain Slabs", sub: "600×1200 · 800×1600 · 1200×2400", icon: "slab" },
  { n: "02", title: "Floor & Wall Tiles", sub: "GVT · PGVT · Double charge · Digital wall", icon: "grid" },
  { n: "03", title: "Outdoor & Parking", sub: "Anti-skid · Heavy duty · Pavers · Step-riser", icon: "paver" },
  { n: "04", title: "Sanitaryware", sub: "Wall-hung WCs · One-piece · Basins · Urinals", icon: "wc" },
  { n: "05", title: "Bath Fittings", sub: "Faucets · Diverters · Rain showers · CP accessories", icon: "faucet" },
  { n: "06", title: "Wellness", sub: "Shower panels · Enclosures · Bathtubs · Jacuzzi", icon: "shower" },
  { n: "07", title: "Kitchen", sub: "Quartz & steel sinks · Pull-out mixers", icon: "sink" },
  { n: "08", title: "Natural Stone", sub: "Granite · Italian marble · Quartz tops", icon: "stone" },
  { n: "09", title: "Plumbing", sub: "CPVC · UPVC · SWR pipes & fittings · Tanks", icon: "pipe" },
  { n: "10", title: "Water Heating", sub: "Storage & instant geysers · Solar heaters", icon: "heater" },
  { n: "11", title: "Fixing Solutions", sub: "Adhesives · Epoxy grout · Levelling · Waterproofing", icon: "bag" },
  { n: "12", title: "Mirrors & Vanities", sub: "LED mirrors · Vanities · Cabinets · Hardware", icon: "mirror" },
] as const;

export const spaces = [
  { title: "Bath", line: "Spa-grade sanitaryware, rain showers and slip-safe matt floors.", items: ["Wall-hung WCs", "Rain showers", "Vanities", "Anti-skid tiles"], tile: "vel-zeus-white", tone: "#e9e6df" },
  { title: "Kitchen", line: "Stain-proof surfaces, quartz sinks and pull-out mixers built for daily heat.", items: ["Quartz sinks", "Backsplash slabs", "Pull-out mixers", "Countertops"], tile: "sahara-noir", tone: "#1b1916" },
  { title: "Living", line: "Seamless large-format slabs that make rooms feel twice their size.", items: ["1200×2400 slabs", "Super high gloss", "Skirting", "Feature walls"], tile: "casa-multi", tone: "#efe9de" },
  { title: "Outdoor", line: "Heavy-duty parking, pavers and elevation tiles rated for sun and rain.", items: ["Parking tiles", "Pavers", "Elevation", "Step-riser"], tile: "korten", tone: "#4a2c1b" },
  { title: "Commercial", line: "Project supply for hotels, hospitals and offices — on schedule, in bulk.", items: ["Bulk dispatch", "Spec sheets", "Site support", "Same-batch shade"], tile: "archie-grey", tone: "#2a2926" },
];
