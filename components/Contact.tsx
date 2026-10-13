"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { categories } from "@/lib/data";
import { site, waLink } from "@/lib/site";
import { Lines } from "./Reveal";
import Magnetic from "./Magnetic";

const roles = ["Homeowner", "Builder / Contractor", "Architect / Designer", "Dealer"];

export default function Contact() {
  const [role, setRole] = useState(roles[0]);
  const [picked, setPicked] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [note, setNote] = useState("");

  const toggle = (t: string) => setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));
  const message = `Hi Zeel, I'm ${name || "—"} (${role}) from ${city || "—"}.\nInterested in: ${picked.join(", ") || "General enquiry"}.\n${note}`;

  return (
    <section id="contact" className="mx-auto max-w-[1600px] px-4 py-32 md:px-10">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 className="display text-6xl md:text-8xl">
            <Lines lines={["Let's build", <em key="s" className="text-bronze">something.</em>]} />
          </h2>
          <div className="mt-12 space-y-6 text-ink-soft">
            <p className="label text-muted">Showroom</p>
            <p className="text-lg">{site.address}</p>
            <p>{site.hours}</p>
            <p className="flex flex-col gap-1">
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="display text-4xl text-ink hover:text-bronze">{site.phone}</a>
              <a href={`mailto:${site.email}`} className="hover:text-bronze">{site.email}</a>
            </p>
          </div>
        </div>

        <form
          className="rounded-2xl bg-stone p-6 md:p-10"
          onSubmit={(e) => {
            e.preventDefault();
            window.open(waLink(message), "_blank", "noopener");
          }}
        >
          <fieldset>
            <legend className="label mb-4 text-muted">I am a</legend>
            <div className="flex flex-wrap gap-2">
              {roles.map((r) => (
                <button type="button" key={r} onClick={() => setRole(r)} aria-pressed={role === r}
                  className={`relative rounded-full border px-4 py-2 text-sm transition-colors ${role === r ? "border-ink text-ivory" : "border-ink/20 hover:border-ink"}`}>
                  {role === r && <motion.span layoutId="role" className="absolute inset-0 rounded-full bg-ink" />}
                  <span className="relative">{r}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-8">
            <legend className="label mb-4 text-muted">Interested in</legend>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button type="button" key={c.n} onClick={() => toggle(c.title)} aria-pressed={picked.includes(c.title)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${picked.includes(c.title) ? "border-bronze bg-bronze text-ivory" : "border-ink/20 hover:border-ink"}`}>
                  {c.title}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {[["Name", name, setName], ["City / Site", city, setCity]].map(([l, v, set]) => (
              <label key={l as string} className="block">
                <span className="label text-muted">{l as string}</span>
                <input value={v as string} onChange={(e) => (set as (s: string) => void)(e.target.value)}
                  className="mt-2 w-full border-b border-ink/25 bg-transparent py-3 text-lg outline-none transition-colors focus:border-ink" />
              </label>
            ))}
          </div>
          <label className="mt-6 block">
            <span className="label text-muted">Project details</span>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} placeholder="Area in sq.ft, rooms, timeline…"
              className="mt-2 w-full resize-none border-b border-ink/25 bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-ink/30 focus:border-ink" />
          </label>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <p className="max-w-xs text-xs text-muted">Opens WhatsApp with your enquiry pre-filled. We reply within business hours.</p>
            <Magnetic>
              <button type="submit" className="rounded-full bg-ink px-8 py-4 text-sm font-semibold text-ivory transition-colors hover:bg-bronze">
                Send on WhatsApp →
              </button>
            </Magnetic>
          </div>
        </form>
      </div>
    </section>
  );
}
