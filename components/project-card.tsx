"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface ProjectProps {
  title: string
  description: string
  imageUrl: string
  tags: string[]
}

export function ProjectCard({ title, description, imageUrl, tags }: ProjectProps) {
  return (
    <motion.div whileHover={{ y: -5 }} className="group glass rounded-2xl overflow-hidden mb-12">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
      </div>
      <div className="p-8">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">{description}</p>
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <span key={tag} className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
