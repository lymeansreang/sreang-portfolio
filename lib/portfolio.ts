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

// ─── Skills / Tech Stack ─────────────────────────────────

export type SkillCategory = {
  heading: string
  icon: PlantKind
  skills: { name: string; level: number }[] // level 1-5
}

export const skillCategories: SkillCategory[] = [
  {
    heading: "Mobile",
    icon: "swift",
    skills: [
      { name: "Swift", level: 5 },
      { name: "UIKit", level: 5 },
      { name: "SwiftUI", level: 4 },
      { name: "Objective-C", level: 3 },
      { name: "Kotlin", level: 3 },
      { name: "Jetpack Compose", level: 3 },
      { name: "Firebase", level: 4 },
      { name: "Core Data", level: 3 },
      { name: "Realm", level: 3 },
    ],
  },
  {
    heading: "Front-End",
    icon: "thorn",
    skills: [
      { name: "TypeScript", level: 4 },
      { name: "React", level: 4 },
      { name: "Next.js", level: 4 },
      { name: "Tailwind CSS", level: 5 },
      { name: "HTML / CSS", level: 5 },
      { name: "Framer Motion", level: 4 },
    ],
  },
  {
    heading: "Back-End",
    icon: "pod",
    skills: [
      { name: "Node.js", level: 4 },
      { name: "NestJS", level: 3 },
      { name: "FastAPI", level: 3 },
      { name: "PostgreSQL", level: 4 },
      { name: "Redis", level: 3 },
      { name: "REST APIs", level: 5 },
      { name: "WebSockets", level: 3 },
    ],
  },
  {
    heading: "DevOps & Tools",
    icon: "coffee",
    skills: [
      { name: "Git", level: 5 },
      { name: "Docker", level: 4 },
      { name: "Nginx", level: 3 },
      { name: "CI / CD", level: 3 },
      { name: "Xcode", level: 5 },
      { name: "VS Code", level: 5 },
      { name: "Figma", level: 3 },
      { name: "CocoaPods", level: 4 },
    ],
  },
]

// ─── Education ───────────────────────────────────────────

export type Education = {
  period: string
  degree: string
  school: string
  description?: string
  achievements?: string[]
}

export const education: Education[] = [
  {
    period: "2020 — 2024",
    degree: "Bachelor of Science in Computer Science",
    school: "Royal University of Phnom Penh (RUPP)",
    description:
      "Focused on software engineering, data structures, and mobile application development. Graduated with strong practical experience through internships and personal projects.",
    achievements: [
      "Dean's List for academic excellence",
      "Led the mobile development club",
      "Capstone: Multi-platform inventory management system",
    ],
  },
]

// ─── Certifications ──────────────────────────────────────

export type Certification = {
  title: string
  issuer: string
  date: string
  link?: string
}

export const certifications: Certification[] = [
  {
    title: "iOS & Swift — The Complete iOS App Development Bootcamp",
    issuer: "Udemy / Angela Yu",
    date: "2023",
  },
  {
    title: "The Complete Web Development Bootcamp",
    issuer: "Udemy / Angela Yu",
    date: "2023",
  },
  {
    title: "Docker & Kubernetes: The Practical Guide",
    issuer: "Udemy / Maximilian Schwarzmüller",
    date: "2024",
  },
  {
    title: "PostgreSQL for Developers",
    issuer: "Pluralsight",
    date: "2024",
  },
]

// ─── Testimonials ────────────────────────────────────────

export type Testimonial = {
  quote: string
  name: string
  role: string
  company: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Sreang consistently delivers clean, well-tested code ahead of schedule. His ability to own the full iOS release cycle — from feature development to App Store submission — has been invaluable to our team.",
    name: "Technical Lead",
    role: "Engineering",
    company: "AEON Specialized Bank",
  },
  {
    quote:
      "Working with Sreang on the SaaS platform was a great experience. He took full ownership of the frontend architecture, handled complex real-time features with WebSockets, and always communicated clearly.",
    name: "Product Manager",
    role: "Product",
    company: "Anukwat Technology",
  },
  {
    quote:
      "He picked up our legacy Objective-C codebase quickly and migrated critical modules to Swift without breaking production. Very few junior devs can do that. He also mentored new hires with patience.",
    name: "Senior iOS Developer",
    role: "Mobile Team",
    company: "ACLEDA Bank Plc.",
  },
]

// ─── Fun Facts / Interests ──────────────────────────────

export const funFacts = [
  { emoji: "📸", text: "Architectural photography hobbyist — I love shooting brutalist buildings at golden hour" },
  { emoji: "🎮", text: "Built this entire portfolio as a tower-defense game because… why not?" },
  { emoji: "🍵", text: "Powered by matcha and green tea — at least 3 cups a day" },
  { emoji: "🏍️", text: "Weekend motorbike trips to Kampot, Kep, and the countryside" },
  { emoji: "📚", text: "Currently reading: 'Designing Data-Intensive Applications' by Martin Kleppmann" },
  { emoji: "🌱", text: "Learning Rust on the side — systems programming is my next frontier" },
]

// ─── Experience (waves) ──────────────────────────────────

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
    groups: [
      {
        heading: "Leadership",
        items: [
          "Lead a team of 3 mobile developers across consumer and merchant apps",
          "Established coding standards, PR review process, and CI/CD pipeline",
          "Coordinate with backend, QA, and product teams for sprint planning",
        ],
      },
      {
        heading: "Key deliverables",
        items: [
          "Push notification system with APNs + Firebase Cloud Messaging",
          "Biometric authentication and secure keychain storage",
          "Dual-environment deployment (UAT/Production) with separate configs",
          "Automated build and distribution via Fastlane",
        ],
      },
    ],
    tech: ["Swift", "Objective-C", "UIKit", "Firebase", "CocoaPods", "Fastlane"],
    current: true,
  },
  {
    period: "2024 — Present",
    role: "Full-Stack Developer",
    company: "Anukwat Technology",
    summary:
      "Architected and deployed a multi-tenant SaaS platform serving over 50k active users. Integrated real-time collaboration with WebSockets and optimized PostgreSQL queries for high-concurrency workloads.",
    groups: [
      {
        heading: "Architecture",
        items: [
          "Multi-tenant SaaS with role-based access control",
          "Real-time collaboration via WebSocket channels",
          "Containerized microservices with Docker Compose",
        ],
      },
      {
        heading: "Performance",
        items: [
          "Optimized PostgreSQL queries — reduced P95 latency by 40%",
          "Redis caching layer for frequently accessed data",
          "Server-side rendering with Next.js for SEO and fast LCP",
        ],
      },
    ],
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

// ─── Projects (seed packets) ─────────────────────────────

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
      "\u201CAngkor Era\u201D template with kbach Khmer ornaments",
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
  {
    id: "bug-defense",
    title: "Bug Defense Portfolio",
    variety: "Web · Personal",
    plant: "thorn",
    cost: 200,
    description: "This very portfolio — a garden-themed tower-defense game built with Next.js and Framer Motion.",
    highlights: [
      "Playable tower-defense mini-game in the hero",
      "Custom SVG sprites for plants and bugs",
      "10+ ReactBits-inspired animations throughout",
      "Fully responsive and accessible",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "saas-platform",
    title: "Multi-Tenant SaaS",
    variety: "Web · Anukwat Tech",
    plant: "coffee",
    cost: 175,
    description: "Enterprise SaaS platform with real-time collaboration serving 50k+ active users.",
    highlights: [
      "Multi-tenant architecture with RBAC",
      "Real-time collaboration via WebSockets",
      "40% reduction in P95 query latency",
      "Containerized deployment with Docker Compose",
    ],
    tech: ["TypeScript", "Next.js", "PostgreSQL", "Redis", "Docker", "Nginx"],
  },
]

// ─── Stats ───────────────────────────────────────────────

export const stats = [
  { label: "Years shipping", num: 2, suffix: "+", icon: "swift" as PlantKind },
  { label: "Projects shipped", num: seeds.length, suffix: "", icon: "pod" as PlantKind },
  { label: "Banks served", num: 2, suffix: "", icon: "coffee" as PlantKind },
  { label: "Users reached", num: 50, suffix: "k+", icon: "thorn" as PlantKind },
]
