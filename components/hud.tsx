"use client"

import { useEffect, useState } from "react"
import { Github, Linkedin, Mail, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { profile } from "@/lib/portfolio"
import { Plant } from "@/components/sprites/plants"
import { Magnet } from "@/components/animations"

const NAV = [
  { id: "play", label: "Play" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "waves", label: "Experience" },
  { id: "seeds", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "mailbox", label: "Contact" },
]

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
    <header className="sticky top-0 z-50 border-b-[3px] border-ink bg-wood-300/95 shadow-[0_2px_0_0_var(--color-wood-700)] backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-3 py-1.5">
        {/* Logo */}
        <a href="#play" className="flex shrink-0 items-center gap-1.5" aria-label={`${profile.name}, back to top`}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-ink bg-sky-300">
            <Plant kind="swift" className="h-7 w-7" />
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block font-display text-sm">{profile.name}</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Sections" className="ml-auto hidden lg:block">
          <ul className="flex gap-0.5">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  aria-current={active === n.id ? "location" : undefined}
                  className={cn(
                    "rounded-lg border-2 px-2 py-0.5 text-xs font-extrabold transition",
                    active === n.id
                      ? "border-ink bg-sunny"
                      : "border-transparent hover:border-ink hover:bg-paper",
                  )}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Socials */}
        <div className="ml-auto flex items-center gap-0.5 lg:ml-2">
          <Social href={profile.socials.github} label="GitHub">
            <Github className="h-4 w-4" />
          </Social>
          <Social href={profile.socials.linkedin} label="LinkedIn">
            <Linkedin className="h-4 w-4" />
          </Social>
          {profile.email && (
            <Social href={`mailto:${profile.email}`} label="Email">
              <Mail className="h-4 w-4" />
            </Social>
          )}
          <button
            className="ml-1 rounded-lg border-2 border-ink bg-paper p-1.5 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav id="mobile-nav" aria-label="Sections" className="border-t-2 border-ink bg-paper lg:hidden">
          <ul className="mx-auto grid max-w-6xl grid-cols-3 gap-1.5 p-2.5 sm:grid-cols-4">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-lg border-2 border-ink px-2 py-1.5 text-center text-xs font-extrabold",
                    active === n.id ? "bg-sunny" : "bg-paper",
                  )}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <Magnet strength={0.35}>
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
        aria-label={label}
        className="rounded-lg border-2 border-transparent p-1.5 transition hover:-translate-y-0.5 hover:border-ink hover:bg-paper"
      >
        {children}
      </a>
    </Magnet>
  )
}
