"use client";

import { Navbar } from "@/components/navbar";
import { ExperienceCard } from "@/components/experience-card";
import { ProjectCard } from "@/components/project-card";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen selection:bg-primary/30">
      <Navbar />

      <main className="lg:pl-96 lg:pr-24 px-6 py-24 max-w-7xl mx-auto">
        {/* About Section */}
        <section id="about" className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6 text-lg text-muted-foreground leading-relaxed"
          >
            <p>
              I'm a developer who bridges the gap between{" "}
              <span className="text-white font-medium">native performance</span>{" "}
              and{" "}
              <span className="text-white font-medium">web accessibility</span>.
              My work spans from crafting pixel-perfect Swift interfaces to
              architecting robust distributed systems.
            </p>
            <p>
              Currently, I focus on{" "}
              <span className="text-primary font-medium">Swift UIKit</span> and{" "}
              <span className="text-primary font-medium">Next.js</span>,
              creating digital experiences that feel as fast as they look. I
              believe that engineering is a creative craft where the details
              matter—from the spring of a gesture to the latency of a database
              query.
            </p>
            <p>
              When I'm not coding, I'm usually exploring architectural
              photography or deep-diving into the latest advancements in
              hardware-accelerated graphics.
            </p>
          </motion.div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-32">
          <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/0 px-6 py-5 backdrop-blur-sm md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
            <h2 className="text-sm font-bold uppercase tracking-widest text-white lg:sr-only">
              Experience
            </h2>
          </div>
          <ExperienceCard
            period="2025 — Present"
            role="Chief, Mobile Application Developer (iOS)"
            company="AEON Specialized Bank (Cambodia) Plc."
            description=""
            technologies={[
              "Swift",
              "Objective-C",
            ]}
            link="#"
          />
          <ExperienceCard
            period="2024 — Present"
            role="Full-Stack Developer"
            company="Anukwat Technology"
            description="Architected and deployed a multi-tenant SaaS platform serving over 50k active users. Integrated real-time collaboration features using WebSockets and optimized PostgreSQL queries for high-concurrency environments."
            technologies={[
              "TypeScript",
              "Next.js",
              "Node.js",
              "PostgreSQL",
              "Redis",
              "Docker",
              "FastApi",
              "Nginx",
            ]}
            link="#"
          />
          <ExperienceCard
            period="2024 — 2025"
            role="iOS Developer"
            company="ACLEDA Bank Plc."
            description="Resolve production and technical issues :

            - Troubleshoot problem fix bugs and fix production issues
            - Perform through testing and code reviews

            Mentorship:

            - Guidance to new staff, fostering team growth and knowledge sharing.

            Enhance Features :
            Exchange Rate
            Acleda bank Lao transfer
            New Notification update app version
            Load Term From Service

            Develop New Card Request Feature :

            - Implement with a clean, intuitive UI and smooth animations
            - Transition architecture from MVC to MVVM for better scalability and maintainability
            - Tutorial link of each feature

            Integrate Vendor SDK into Acleda Mobile."
            technologies={["Swift", "Swift UIKit"]}
            link="#"
          />
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-32">
          <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/0 px-6 py-5 backdrop-blur-sm md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
            <h2 className="text-sm font-bold uppercase tracking-widest text-white lg:sr-only">
              Projects
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProjectCard
              title="Exchange Rate"
              description="A hardware-accelerated design system library for iOS focused on fluid interactions and micro-gestures."
              imageUrl="/exchange.jpeg"
              tags={["Swift", "Swift UIKit"]}
            />
            {/* <ProjectCard
              title="Aether Dashboard"
              description="Real-time infrastructure monitoring dashboard with predictive analytics and customizable data widgets."
              imageUrl="/modern-web-dashboard-dark.jpg"
              tags={["Next.js", "D3.js", "Tailwind"]}
            /> */}
          </div>
        </section>

        <footer className="text-sm text-muted-foreground/50 pb-24">
          <p>
            © 2025 Ly Mean Sreang. Built with Next.js, Framer Motion, and
            Tailind CSS.
          </p>
        </footer>
      </main>

      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[128px]" />
      </div>
    </div>
  );
}
