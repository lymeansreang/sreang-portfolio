"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [activeSection, setActiveSection] = useState("about")

  const navItems = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 },
    )

    navItems.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <nav className="fixed left-0 top-0 bottom-0 w-80 p-12 flex flex-col justify-between hidden lg:flex z-50">
      <div>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-5xl font-bold tracking-tight text-white mb-3">Ly Mean Sreang</h1>
          <h2 className="text-xl font-medium text-primary mb-4">iOS & Full-Stack Developer</h2>
          <p className="text-muted-foreground leading-relaxed max-w-xs text-balance">
            I build high-performance native iOS apps and scalable web architectures with a focus on immersive user
            experiences.
          </p>
        </motion.div>

        <ul className="mt-24 space-y-4">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "group flex items-center py-3 transition-all",
                  activeSection === item.id ? "text-white" : "text-muted-foreground hover:text-white",
                )}
              >
                <span
                  className={cn(
                    "mr-4 h-px transition-all duration-300",
                    activeSection === item.id
                      ? "w-16 bg-white"
                      : "w-8 bg-muted-foreground group-hover:w-16 group-hover:bg-white",
                  )}
                />
                <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-6">
        <SocialLink href="https://github.com/lymeansreang" icon={<Github className="w-6 h-6" />} />
        <SocialLink href="https://www.linkedin.com/in/ly-mean-sreang-28113a2ba?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app](https://www.linkedin.com/in/ly-mean-sreang-28113a2ba?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" icon={<Linkedin className="w-6 h-6" />} />
        <SocialLink href="#" icon={<Mail className="w-6 h-6" />} />
      </div>
    </nav>
  )
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.1, y: -2 }}
      className="text-muted-foreground hover:text-white transition-colors"
    >
      {icon}
    </motion.a>
  )
}
