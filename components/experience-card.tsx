"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

interface ExperienceProps {
  period: string
  role: string
  company: string
  description: string
  technologies: string[]
  link?: string
}

export function ExperienceCard({ period, role, company, description, technologies, link }: ExperienceProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative grid grid-cols-8 gap-4 mb-12 p-6 transition-all hover:bg-white/5 hover:backdrop-blur-sm rounded-xl"
    >
      <header className="col-span-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground/60 pt-1">
        {period}
      </header>
      <div className="col-span-6">
        <h3 className="font-bold leading-snug text-white flex items-center gap-1 group-hover:text-primary transition-colors">
          {role} · {company}
          {link && (
            <ExternalLink className="w-4 h-4 inline-block opacity-0 group-hover:opacity-100 transition-all group-hover:-translate-y-1 group-hover:translate-x-1" />
          )}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground leading-normal">{description}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <li
              key={tech}
              className="px-3 py-1 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/20"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
