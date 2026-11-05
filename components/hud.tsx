"use client"

import { useEffect, useState } from "react"
import { Github, Linkedin, Mail, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { profile, stats } from "@/lib/portfolio"
import { Plant } from "@/components/sprites/plants"

const NAV = [
  { id: "play", label: "Play" },
  { id: "about", label: "About" },
  { id: "waves", label: "Experience" },
  { id: "seeds", label: "Projects" },
  { id: "mailbox", label: "Contact" },
]

/** Sticky game-style HUD: brand, section links, stats and socials. Works on mobile. */
export function Hud() {
  const [active, setActive] = useState("play")
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    )
    NAV.forEach((n) => {
      const el = document.getElementById(n.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b-4 border-ink bg-wood-300 shadow-[0_3px_0_0_var(--color-wood-700)]">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2">
        <a href="#play" className="flex items-center gap-2" aria-label={`${profile.name}, back to top`}>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border-[3px] border-ink bg-sky-300">
            <Plant kind="swift" className="h-9 w-9" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg">{profile.name}</span>
            <span className="hidden text-xs font-extrabold text-ink-soft sm:block">{profile.title}</span>
          </span>
        </a>

        <nav aria-label="Sections" className="ml-auto hidden md:block">
          <ul className="flex gap-1">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  aria-current={active === n.id ? "location" : undefined}
                  className={cn(
                    "rounded-xl border-[3px] px-3 py-1 text-sm font-extrabold transition",
                    active === n.id ? "border-ink bg-sunny" : "border-transparent hover:border-ink hover:bg-paper",
                  )}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto hidden items-center gap-1.5 lg:ml-2 lg:flex" aria-label="Stats">
          {stats.map((s) => (
            <span key={s.label} className="chip" title={s.label}>
              <span className="font-display text-sm">{s.value}</span>
              <span className="text-[10px] uppercase">{s.label}</span>
            </span>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-1 md:ml-2">
          <Social href={profile.socials.github} label="GitHub">
            <Github className="h-5 w-5" />
          </Social>
          <Social href={profile.socials.linkedin} label="LinkedIn">
            <Linkedin className="h-5 w-5" />
          </Social>
          {profile.email && (
            <Social href={`mailto:${profile.email}`} label="Email">
              <Mail className="h-5 w-5" />
            </Social>
          )}
          <button
            className="ml-1 rounded-xl border-[3px] border-ink bg-paper p-1.5 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Sections" className="border-t-[3px] border-ink bg-paper md:hidden">
          <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-2 p-3">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-xl border-[3px] border-ink px-3 py-2 text-center font-extrabold",
                    active === n.id ? "bg-sunny" : "bg-paper",
                  )}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap justify-center gap-1.5 px-3 pb-3">
            {stats.map((s) => (
              <span key={s.label} className="chip">
                <span className="font-display text-sm">{s.value}</span>
                <span className="text-[10px] uppercase">{s.label}</span>
              </span>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      aria-label={label}
      className="rounded-xl border-[3px] border-transparent p-1.5 transition hover:-translate-y-0.5 hover:border-ink hover:bg-paper"
    >
      {children}
    </a>
  )
}
