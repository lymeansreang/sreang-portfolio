"use client"

import { Hud } from "@/components/hud"
import { BugDefense } from "@/components/game/bug-defense"
import {
  AboutSection, StatsSection, SkillsSection,
  WavesSection, SeedsSection, EducationSection,
  TestimonialsSection, FunFactsSection,
} from "@/components/sections"
import { MailboxSection } from "@/components/mailbox"
import { Cloud, GrassEdge } from "@/components/sprites/props"
import { Plant } from "@/components/sprites/plants"
import { Bug } from "@/components/sprites/bugs"
import { profile } from "@/lib/portfolio"
import { BlurText, TextShimmer, ClickSpark } from "@/components/animations"

export default function Home() {
  const skip = () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })

  return (
    <>
      <a
        href="#about"
        className="sr-only z-[60] rounded-xl border-[3px] border-ink bg-sunny px-3 py-2 font-extrabold focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
      >
        Skip the game
      </a>
      <Hud />

      <main>
        {/* ---------- Hero: playable game ---------- */}
        <section id="play" aria-labelledby="hero-h" className="relative overflow-hidden bg-gradient-to-b from-sky-300 to-sky-100 pb-10 pt-8">
          <Cloud className="cloud absolute top-6 w-28 opacity-90" style={{ animationDuration: "48s" }} />
          <Cloud className="cloud absolute top-24 w-20 opacity-80" style={{ animationDuration: "64s", animationDelay: "-30s" }} />

          <div className="relative mx-auto max-w-5xl px-4">
            <div className="mb-6 flex flex-col items-center text-center">
              <span className="chip mb-2">Now playing · Bug Defense</span>
              <h1 id="hero-h" className="font-display text-4xl leading-none sm:text-6xl">
                <BlurText text={profile.name} stagger={0.05} />
              </h1>
              <p className="mt-2 font-display text-xl text-lawn-800 sm:text-2xl">
                <BlurText text={profile.title} delay={0.4} stagger={0.03} />
              </p>
              <p className="mt-2 max-w-xl font-semibold">
                <TextShimmer className="text-ink-soft" duration={4}>{profile.tagline}</TextShimmer>
              </p>
            </div>
            <BugDefense onSkip={skip} />
          </div>
        </section>

        <div className="bg-sky-100">
          <GrassEdge />
        </div>
        <ClickSpark className="border-t-8 border-lawn-500 bg-mint">
          <AboutSection />
          <StatsSection />
          <SkillsSection />
          <WavesSection />
          <SeedsSection />
          <EducationSection />
          <TestimonialsSection />
          <FunFactsSection />
          <MailboxSection />
        </ClickSpark>
      </main>

      <footer className="relative bg-soil-700 text-paper">
        <div className="bg-mint">
          <GrassEdge />
        </div>
        <div className="h-3 bg-lawn-500" />
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-end gap-1" aria-hidden>
            <Plant kind="coffee" className="h-12 w-12" />
            <Plant kind="pod" className="h-12 w-12" />
            <Bug kind="null" className="h-10 w-10 opacity-80" walking={false} />
          </div>
          <p className="text-sm font-bold">
            © {new Date().getFullYear()} {profile.name}. Built with Next.js, Tailwind CSS and Framer Motion. No real bugs were harmed.
          </p>
        </div>
      </footer>
    </>
  )
}
