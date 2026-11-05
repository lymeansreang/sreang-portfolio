// All portfolio content lives here — edit this file to update the site.
import type { PlantKind } from "@/components/sprites/plants"

export const profile = {
  name: "Ly Mean Sreang",
  title: "iOS & Full-Stack Developer",
  location: "Phnom Penh, Cambodia",
  tagline:
    "I build high-performance native iOS apps and scalable web systems — and squash the bugs before they reach production.",
  // Leave empty to hide the mail icon. The contact form uses Formspree (see README).
  email: "",
  socials: {
    github: "https://github.com/lymeansreang",
    linkedin: "https://www.linkedin.com/in/ly-mean-sreang-28113a2ba",
  },
}

export const about = [
  "I'm a developer who bridges native performance and web accessibility. My work spans pixel-perfect Swift interfaces to robust, distributed back-end systems.",
  "Right now I focus on Swift UIKit and Next.js — building experiences that feel as fast as they look. Engineering is a creative craft where details matter, from the spring of a gesture to the latency of a database query.",
  "When I'm not coding, I'm exploring architectural photography or deep-diving into hardware-accelerated graphics.",
]

export type Wave = {
  period: string
  role: string
  company: string
  summary?: string
  groups?: { heading: string; items: string[] }[]
  tech: string[]
  current?: boolean
}

// Most recent first.
export const waves: Wave[] = [
  {
    period: "2025 — Present",
    role: "Chief, Mobile Application Developer (iOS)",
    company: "AEON Specialized Bank (Cambodia) Plc.",
    summary:
      "Leading iOS development of AEON's consumer and merchant card apps — from feature work to App Store releases across separate UAT and production environments.",
    tech: ["Swift", "Objective-C", "UIKit", "Firebase", "CocoaPods"],
    current: true,
  },
  {
    period: "2024 — Present",
    role: "Full-Stack Developer",
    company: "Anukwat Technology",
    summary:
      "Architected and deployed a multi-tenant SaaS platform serving over 50k active users. Integrated real-time collaboration with WebSockets and optimized PostgreSQL queries for high-concurrency workloads.",
    tech: ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "Redis", "Docker", "FastAPI", "Nginx"],
    current: true,
  },
  {
    period: "2024 — 2025",
    role: "iOS Developer",
    company: "ACLEDA Bank Plc.",
    groups: [
      {
        heading: "Production support",
        items: [
          "Troubleshot and fixed bugs and production issues",
          "Performed thorough testing and code reviews",
        ],
      },
      {
        heading: "Feature enhancements",
        items: [
          "Exchange Rate",
          "ACLEDA Bank Lao transfer",
          "New app-version update notification",
          "Loan term loaded from service",
        ],
      },
      {
        heading: "New Card Request feature",
        items: [
          "Clean, intuitive UI with smooth animations",
          "Migrated architecture from MVC to MVVM for scalability",
          "In-app tutorial link for each feature",
        ],
      },
      {
        heading: "Also",
        items: ["Integrated a vendor SDK into ACLEDA Mobile", "Mentored new staff and led knowledge sharing"],
      },
    ],
    tech: ["Swift", "UIKit", "MVVM"],
  },
]

export type Seed = {
  id: string
  title: string
  variety: string // small caption on the packet, e.g. "iOS · Banking"
  plant: PlantKind
  cost: number
  description: string
  highlights: string[]
  tech: string[]
  image?: string
  link?: string
}

export const seeds: Seed[] = [
  {
    id: "exchange-rate",
    title: "Exchange Rate",
    variety: "iOS · ACLEDA Mobile",
    plant: "swift",
    cost: 100,
    description: "Enhanced the Exchange Rate feature in the ACLEDA Mobile banking app.",
    highlights: ["Currency rates for KHR and USD", "Built natively in Swift + UIKit", "Shipped to production users"],
    tech: ["Swift", "UIKit"],
    image: "/exchange.jpeg",
  },
  {
    id: "aeon-consumer",
    title: "AEON Card Mobile",
    variety: "iOS · Consumer app",
    plant: "swift",
    cost: 150,
    description: "The cardholder app for AEON Specialized Bank customers in Cambodia.",
    highlights: [
      "Push notifications with APNs + Firebase Cloud Messaging",
      "Separate UAT and production environments",
      "Released through the App Store",
    ],
    tech: ["Swift", "Objective-C", "Firebase"],
  },
  {
    id: "aeon-merchant",
    title: "AEON Card Mobile",
    variety: "iOS · Merchant app",
    plant: "pod",
    cost: 150,
    description: "The merchant-side companion app for AEON partner businesses.",
    highlights: [
      "Push messaging via APNs + FCM per environment",
      "Local persistence with Realm",
      "Dependencies managed with CocoaPods",
    ],
    tech: ["Swift", "Realm", "Firebase", "CocoaPods"],
  },
  {
    id: "accontrol",
    title: "AcControl",
    variety: "Android · Personal",
    plant: "thorn",
    cost: 75,
    description: "Turns an Android phone's built-in IR blaster into a remote for Panasonic air conditioners.",
    highlights: [
      "Kotlin port of a Panasonic AC IR encoder",
      "Diagnostics hex viewer and raw-send screens",
      "Fully offline — no network permissions",
    ],
    tech: ["Kotlin", "Jetpack Compose", "Material 3", "MVVM"],
  },
  {
    id: "wedding",
    title: "Khmer Wedding Invitations",
    variety: "Web · Personal",
    plant: "coffee",
    cost: 50,
    description: "A platform for Cambodian digital wedding invitations with culturally rooted templates.",
    highlights: [
      "“Angkor Era” template with kbach Khmer ornaments",
      "Illustrated couples in traditional attire",
      "React front end + API monorepo",
    ],
    tech: ["React", "Node.js", "Monorepo"],
  },
  {
    id: "inventory",
    title: "Inventory Manager",
    variety: "Web · Personal",
    plant: "pod",
    cost: 125,
    description: "E-commerce inventory management with an AI analytics layer.",
    highlights: [
      "Camera barcode scanning in the browser",
      "FastAPI microservice for analytics",
      "Dockerized Next.js + NestJS + PostgreSQL",
    ],
    tech: ["Next.js", "NestJS", "PostgreSQL", "Docker", "FastAPI"],
  },
]

export const stats = [
  { label: "Years shipping", value: "2+" },
  { label: "Projects", value: String(seeds.length) },
  { label: "Banks served", value: "2" },
]
