"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { MapPin, RotateCw, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { about, profile, seeds, waves, type Seed } from "@/lib/portfolio"
import { Plant, PLANT_INFO } from "@/components/sprites/plants"
import { Bean } from "@/components/sprites/props"

/** Wooden signpost heading with a level label. */
export function Signpost({ level, title, id }: { level: string; title: string; id: string }) {
  return (
    <div className="mb-8 flex flex-col items-center">
      <div className="signboard -rotate-1 px-8 pb-3 pt-5 text-center">
        <span className="block text-xs font-black uppercase tracking-[0.2em] text-ink">{level}</span>
        <h2 id={id} className="font-display text-3xl sm:text-4xl">
          {title}
        </h2>
      </div>
      <div className="h-6 w-4 border-x-[3px] border-ink bg-wood-500" aria-hidden />
    </div>
  )
}

function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, type: "spring", bounce: 0.35 }}
    >
      {children}
    </motion.div>
  )
}

// ---------------- About ----------------
export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-h" className="mx-auto max-w-5xl px-4 py-16">
      <Signpost level="Level 1" title="Meet the Gardener" id="about-h" />
      <Reveal className="paper grid gap-6 p-6 sm:p-8 md:grid-cols-[200px_1fr]">
        <div className="flex flex-col items-center gap-3">
          <div className="relative flex h-44 w-44 items-end justify-center overflow-hidden rounded-[20px] border-[3px] border-ink bg-sky-300">
            <div className="absolute inset-x-0 bottom-0 h-10 bg-lawn-500" />
            <Plant kind="swift" className="relative h-32 w-32" title="Swift Spitter, the site mascot" />
          </div>
          <span className="chip">
            <MapPin className="h-3.5 w-3.5" /> {profile.location}
          </span>
        </div>
        <div className="space-y-4 text-base font-semibold leading-relaxed text-ink-soft sm:text-lg">
          {about.map((p, i) => (
            <p key={i}>{highlight(p)}</p>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

/** Bold the key tech words in a paragraph. */
function highlight(text: string) {
  const words = ["Swift UIKit", "Next.js", "native performance", "web accessibility"]
  const re = new RegExp(`(${words.map((w) => w.replace(/\./g, "\\.")).join("|")})`, "g")
  return text.split(re).map((part, i) =>
    words.includes(part) ? (
      <mark key={i} className="rounded bg-sunny/70 px-1 font-extrabold text-ink">
        {part}
      </mark>
    ) : (
      part
    ),
  )
}

// ---------------- Experience (waves) ----------------
export function WavesSection() {
  const total = waves.length
  return (
    <section id="waves" aria-labelledby="waves-h" className="mx-auto max-w-5xl px-4 py-16">
      <Signpost level="Level 2" title="Career Waves" id="waves-h" />
      <ol className="relative space-y-8 before:absolute before:bottom-4 before:left-[22px] before:top-4 before:w-2 before:rounded-full before:border-2 before:border-ink before:bg-soil-500 sm:before:left-[30px]">
        {waves.map((w, i) => (
          <li key={`${w.company}-${w.period}`} className="relative pl-14 sm:pl-20">
            {/* wave marker */}
            <span
              className={cn(
                "absolute left-0 top-3 flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-ink font-display text-lg sm:h-16 sm:w-16 sm:text-2xl",
                w.current ? "bg-sunny" : "bg-paper",
              )}
              aria-hidden
            >
              {total - i}
            </span>
            <Reveal delay={i * 0.05} className="paper p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip">Wave {total - i}</span>
                {w.current && <span className="chip !bg-lawn-300">Current wave</span>}
                <span className="text-xs font-black uppercase tracking-wider text-ink-soft">{w.period}</span>
              </div>
              <h3 className="mt-2 font-display text-xl sm:text-2xl">{w.role}</h3>
              <p className="font-extrabold text-wood-700">{w.company}</p>
              {w.summary && <p className="mt-3 font-semibold leading-relaxed text-ink-soft">{w.summary}</p>}
              {w.groups && (
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  {w.groups.map((grp) => (
                    <div key={grp.heading}>
                      <h4 className="text-sm font-black uppercase tracking-wide">{grp.heading}</h4>
                      <ul className="mt-1 space-y-1">
                        {grp.items.map((it) => (
                          <li key={it} className="flex gap-2 text-sm font-semibold text-ink-soft">
                            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full border-2 border-ink bg-lawn-400" aria-hidden />
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
                {w.tech.map((t) => (
                  <li key={t} className="chip !bg-sky-100">
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}

// ---------------- Projects (seed packets) ----------------
export function SeedsSection() {
  return (
    <section id="seeds" aria-labelledby="seeds-h" className="mx-auto max-w-6xl px-4 py-16">
      <Signpost level="Level 3" title="Seed Packets" id="seeds-h" />
      <p className="-mt-4 mb-8 text-center font-bold text-ink-soft">Tap a packet to read what&apos;s inside.</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {seeds.map((s, i) => (
          <Reveal key={s.id} delay={(i % 3) * 0.06}>
            <SeedPacket seed={s} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function SeedPacket({ seed }: { seed: Seed }) {
  const [flipped, setFlipped] = useState(false)
  const plant = PLANT_INFO[seed.plant]
  return (
    <>
    <div className={cn("flip h-[400px]", flipped && "is-flipped")}>
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
        aria-label={`${seed.title} (${seed.variety}). ${flipped ? "Show front" : "Show details"}`}
        className="flip-inner group relative block h-full w-full text-left"
      >
        {/* FRONT */}
        <div className="flip-face absolute inset-0 flex flex-col overflow-hidden rounded-[16px] border-[3px] border-ink bg-kraft shadow-[0_5px_0_0_var(--color-ink)] transition-transform group-hover:-translate-y-1">
          {/* scalloped top */}
          <div
            className="h-3 w-full bg-wood-300"
            style={{ maskImage: "radial-gradient(circle at 8px 0, transparent 7px, #000 7.5px)", maskSize: "16px 12px", WebkitMaskImage: "radial-gradient(circle at 8px 0, transparent 7px, #000 7.5px)", WebkitMaskSize: "16px 12px" }}
            aria-hidden
          />
          <div className="flex items-center justify-between px-4 pt-2">
            <span className="text-[11px] font-black uppercase tracking-[0.18em] text-wood-700">{seed.variety}</span>
            <span className="chip">
              <Bean className="h-3.5 w-3.5" />
              {seed.cost}
            </span>
          </div>
          <div className="relative mx-4 mt-3 flex h-44 items-end justify-center overflow-hidden rounded-[12px] border-[3px] border-ink bg-sky-300">
            {seed.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={seed.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <>
                <div className="absolute inset-x-0 bottom-0 h-12 bg-lawn-500" />
                <div className="absolute inset-x-0 bottom-9 h-3 bg-lawn-600/60" />
              </>
            )}
            <Plant kind={seed.plant} className={cn("relative h-28 w-28", seed.image && "absolute -bottom-1 -right-1 h-20 w-20")} />
          </div>
          <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
            <h3 className="font-display text-2xl leading-tight">{seed.title}</h3>
            <p className="mt-1 line-clamp-2 text-sm font-semibold text-ink-soft">{seed.description}</p>
            <div className="mt-auto flex items-center justify-between pt-3">
              <span className="text-xs font-extrabold text-ink-soft">Grows: {plant.name}</span>
              <span className="inline-flex items-center gap-1 rounded-full border-2 border-ink bg-sunny px-2 py-0.5 text-xs font-black">
                <RotateCw className="h-3.5 w-3.5" /> Open
              </span>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div className="flip-face flip-back absolute inset-0 flex flex-col rounded-[16px] border-[3px] border-ink bg-paper p-5 shadow-[0_5px_0_0_var(--color-ink)]">
          <div className="flex items-center gap-3">
            <Plant kind={seed.plant} className="h-14 w-14 shrink-0" idle={false} />
            <div>
              <h3 className="font-display text-xl leading-tight">{seed.title}</h3>
              <span className="text-xs font-black uppercase tracking-wider text-wood-700">{seed.variety}</span>
            </div>
          </div>
          <p className="mt-3 text-sm font-semibold text-ink-soft">{seed.description}</p>
          <h4 className="mt-3 text-xs font-black uppercase tracking-wider">Growing notes</h4>
          <ul className="mt-1 space-y-1.5">
            {seed.highlights.map((h) => (
              <li key={h} className="flex gap-2 text-sm font-semibold">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full border-2 border-ink bg-lawn-400" aria-hidden />
                {h}
              </li>
            ))}
          </ul>
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-3" aria-label="Technologies">
            {seed.tech.map((t) => (
              <li key={t} className="chip !bg-sky-100">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </button>
    </div>
    {seed.link && (
      <a href={seed.link} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-extrabold underline">
        View project <ExternalLink className="h-3.5 w-3.5" />
      </a>
    )}
    </>
  )
}
