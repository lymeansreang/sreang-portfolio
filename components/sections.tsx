"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { MapPin, RotateCw, ExternalLink, GraduationCap, Award, Quote } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  about, profile, seeds, waves, stats, skillCategories,
  education, certifications, testimonials, funFacts,
  type Seed,
} from "@/lib/portfolio"
import { Plant, PLANT_INFO } from "@/components/sprites/plants"
import { Bean } from "@/components/sprites/props"
import { CountUp } from "@/components/count-up"
import Lanyard from "@/components/Lanyard"
import {
  TiltCard,
  AnimatedList,
  GradientText,
  StarBorder,
  SplitText,
  DecryptedText,
  ClickSpark,
} from "@/components/animations"

/** Wooden signpost heading with a level label. */
export function Signpost({ level, title, id }: { level: string; title: string; id: string }) {
  return (
    <div className="mb-8 flex flex-col items-center">
      <div className="signboard -rotate-1 px-8 pb-3 pt-5 text-center">
        <span className="block text-xs font-black uppercase tracking-[0.2em] text-ink">{level}</span>
        <h2 id={id} className="font-display text-3xl sm:text-4xl">
          <GradientText>{title}</GradientText>
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

// ════════════════════════════════════════════════════════
// About
// ════════════════════════════════════════════════════════
export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-h" className="mx-auto max-w-5xl px-4 py-16">
      <Signpost level="Level 1" title="Meet the Gardener" id="about-h" />
      <Reveal className="grid gap-8 md:grid-cols-[280px_1fr]">
        <div className="relative h-[400px] w-full">
          <Lanyard
            frontImage="/assets/image.png"
            cardColor="#fff7e3"
            strapColor="#ffcd3c"
            finish="glossy"
            orientation="portrait"
            metal="gold"
            breeze={1}
            className="h-full w-full"
          />
        </div>
        <div className="paper p-6 sm:p-8">
          <div className="space-y-4 text-base font-semibold leading-relaxed text-ink-soft sm:text-lg">
            {about.map((p, i) => (
              <p key={i}>
                <SplitText text={p} delay={i * 0.15} />
              </p>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}

// ════════════════════════════════════════════════════════
// Stats Counters
// ════════════════════════════════════════════════════════
const STAT_COLORS = [
  { bg: "bg-sunny", ring: "ring-yellow-600/30" },
  { bg: "bg-sky-300", ring: "ring-sky-500/30" },
  { bg: "bg-lawn-300", ring: "ring-lawn-500/30" },
  { bg: "bg-wood-200", ring: "ring-wood-500/30" },
]

export function StatsSection() {
  return (
    <section aria-label="Stats" className="mx-auto max-w-5xl px-4 py-14">
      <div className="grid grid-cols-2 gap-x-5 gap-y-10 pt-8 sm:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.12}>
            <ClickSpark>
              <div className="group relative flex flex-col items-center gap-3 rounded-[20px] border-[3px] border-ink bg-paper px-4 pb-5 pt-10 text-center shadow-[0_5px_0_0_var(--color-ink)] transition-transform hover:-translate-y-1">
                <div
                  className={cn(
                    "absolute -top-7 flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-ink shadow-md ring-4 transition-transform group-hover:scale-110",
                    STAT_COLORS[i].bg,
                    STAT_COLORS[i].ring,
                  )}
                >
                  <Plant kind={s.icon} className="h-10 w-10" idle />
                </div>
                <span className="font-display text-4xl leading-none sm:text-5xl">
                  <CountUp to={s.num} suffix={s.suffix} duration={2400} />
                </span>
                <span className="text-[11px] font-black uppercase tracking-[0.15em] text-ink-soft">
                  {s.label}
                </span>
              </div>
            </ClickSpark>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════
// Skills / Tech Stack
// ════════════════════════════════════════════════════════
export function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-h" className="mx-auto max-w-5xl px-4 py-16">
      <Signpost level="Level 2" title="Skill Garden" id="skills-h" />
      <p className="-mt-4 mb-8 text-center font-bold text-ink-soft">
        Every plant represents a skill category. The fuller the bar, the deeper the roots.
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        {skillCategories.map((cat, ci) => (
          <Reveal key={cat.heading} delay={ci * 0.08}>
            <div className="paper p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-ink bg-sky-300">
                  <Plant kind={cat.icon} className="h-9 w-9" />
                </div>
                <h3 className="font-display text-xl">{cat.heading}</h3>
              </div>
              <AnimatedList className="space-y-2.5" stagger={0.05}>
                {cat.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-extrabold">{skill.name}</span>
                      <span className="text-xs font-bold text-ink-soft">{skill.level}/5</span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full border-2 border-ink bg-paper">
                      <SkillBar level={skill.level} />
                    </div>
                  </div>
                ))}
              </AnimatedList>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function SkillBar({ level }: { level: number }) {
  const reduce = useReducedMotion()
  const pct = (level / 5) * 100
  const colors = [
    "bg-cherry",
    "bg-wood-500",
    "bg-sunny",
    "bg-lawn-400",
    "bg-lawn-500",
  ]
  return (
    <motion.div
      className={cn("h-full rounded-full", colors[level - 1])}
      initial={reduce ? { width: `${pct}%` } : { width: 0 }}
      whileInView={{ width: `${pct}%` }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
    />
  )
}

// ════════════════════════════════════════════════════════
// Experience (waves)
// ════════════════════════════════════════════════════════
export function WavesSection() {
  const total = waves.length
  return (
    <section id="waves" aria-labelledby="waves-h" className="mx-auto max-w-5xl px-4 py-16">
      <Signpost level="Level 3" title="Career Waves" id="waves-h" />
      <ol className="relative space-y-8 before:absolute before:bottom-4 before:left-[22px] before:top-4 before:w-2 before:rounded-full before:border-2 before:border-ink before:bg-soil-500 sm:before:left-[30px]">
        {waves.map((w, i) => (
          <li key={`${w.company}-${w.period}`} className="relative pl-14 sm:pl-20">
            <span
              className={cn(
                "absolute left-0 top-3 flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-ink font-display text-lg sm:h-16 sm:w-16 sm:text-2xl",
                w.current ? "bg-sunny" : "bg-paper",
              )}
              aria-hidden
            >
              {total - i}
            </span>
            <Reveal delay={i * 0.05}>
              <StarBorder className="rounded-[14px]">
                <div className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="chip">Wave {total - i}</span>
                    {w.current && <span className="chip !bg-lawn-300">Current wave</span>}
                    <span className="text-xs font-black uppercase tracking-wider text-ink-soft">{w.period}</span>
                  </div>
                  <h3 className="mt-2 font-display text-xl sm:text-2xl">
                    <DecryptedText text={w.role} speed={35} />
                  </h3>
                  <p className="font-extrabold text-wood-700">{w.company}</p>
                  {w.summary && <p className="mt-3 font-semibold leading-relaxed text-ink-soft">{w.summary}</p>}
                  {w.groups && (
                    <div className="mt-3 grid gap-4 sm:grid-cols-2">
                      {w.groups.map((grp) => (
                        <div key={grp.heading}>
                          <h4 className="text-sm font-black uppercase tracking-wide">{grp.heading}</h4>
                          <AnimatedList className="mt-1 space-y-1" stagger={0.06}>
                            {grp.items.map((it) => (
                              <div key={it} className="flex gap-2 text-sm font-semibold text-ink-soft">
                                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full border-2 border-ink bg-lawn-400" aria-hidden />
                                {it}
                              </div>
                            ))}
                          </AnimatedList>
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
                </div>
              </StarBorder>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}

// ════════════════════════════════════════════════════════
// Projects (seed packets)
// ════════════════════════════════════════════════════════
export function SeedsSection() {
  return (
    <section id="seeds" aria-labelledby="seeds-h" className="mx-auto max-w-6xl px-4 py-16">
      <Signpost level="Level 4" title="Seed Packets" id="seeds-h" />
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
    <TiltCard tiltDeg={6} className="rounded-[16px]">
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
    </TiltCard>
    {seed.link && (
      <a href={seed.link} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-extrabold underline">
        View project <ExternalLink className="h-3.5 w-3.5" />
      </a>
    )}
    </>
  )
}

// ════════════════════════════════════════════════════════
// Education & Certifications
// ════════════════════════════════════════════════════════
export function EducationSection() {
  return (
    <section id="education" aria-labelledby="edu-h" className="mx-auto max-w-5xl px-4 py-16">
      <Signpost level="Level 5" title="Growth Rings" id="edu-h" />

      {/* Education */}
      {education.map((edu, i) => (
        <Reveal key={edu.school} delay={i * 0.1}>
          <div className="paper mb-8 p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-[3px] border-ink bg-sunny">
                <GraduationCap className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <span className="text-xs font-black uppercase tracking-wider text-ink-soft">{edu.period}</span>
                <h3 className="font-display text-xl sm:text-2xl">{edu.degree}</h3>
                <p className="font-extrabold text-wood-700">{edu.school}</p>
                {edu.description && (
                  <p className="mt-3 font-semibold leading-relaxed text-ink-soft">{edu.description}</p>
                )}
                {edu.achievements && (
                  <ul className="mt-3 space-y-1.5">
                    {edu.achievements.map((a) => (
                      <li key={a} className="flex gap-2 text-sm font-semibold text-ink-soft">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full border-2 border-ink bg-lawn-400" aria-hidden />
                        {a}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      ))}

      {/* Certifications */}
      <h3 className="mb-4 text-center font-display text-2xl">
        <GradientText>Certifications & Courses</GradientText>
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {certifications.map((cert, i) => (
          <Reveal key={cert.title} delay={i * 0.08}>
            <div className="paper flex items-start gap-3 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[3px] border-ink bg-sky-300">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold leading-tight">{cert.title}</h4>
                <p className="mt-0.5 text-xs font-bold text-ink-soft">{cert.issuer}</p>
                <span className="chip mt-1.5 !text-[10px]">{cert.date}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════
// Testimonials
// ════════════════════════════════════════════════════════
export function TestimonialsSection() {
  return (
    <section id="testimonials" aria-labelledby="test-h" className="mx-auto max-w-5xl px-4 py-16">
      <Signpost level="Level 6" title="Garden Reviews" id="test-h" />
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1}>
            <TiltCard tiltDeg={5} className="rounded-[14px]">
              <div className="paper flex h-full flex-col p-5">
                <Quote className="mb-2 h-6 w-6 text-sunny" />
                <p className="flex-1 text-sm font-semibold italic leading-relaxed text-ink-soft">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-4 border-t-2 border-ink/10 pt-3">
                  <p className="text-sm font-extrabold">{t.name}</p>
                  <p className="text-xs font-bold text-ink-soft">{t.role} · {t.company}</p>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════
// Fun Facts
// ════════════════════════════════════════════════════════
export function FunFactsSection() {
  return (
    <section id="fun" aria-labelledby="fun-h" className="mx-auto max-w-5xl px-4 py-16">
      <Signpost level="Level 7" title="Garden Notes" id="fun-h" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {funFacts.map((fact, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <ClickSpark>
              <div className="paper flex items-start gap-3 p-4 transition-transform hover:-translate-y-0.5">
                <span className="text-2xl" role="img">{fact.emoji}</span>
                <p className="text-sm font-semibold text-ink-soft">{fact.text}</p>
              </div>
            </ClickSpark>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
