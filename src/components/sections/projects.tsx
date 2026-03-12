"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { resumeData } from "@/data/resume"
import { SectionHeader } from "@/components/ui/section-header"
import { ProjectCard } from "@/components/ui/project-card"

type Category = "all" | "ai" | "healthcare" | "fintech"

const categories: { value: Category; label: string; count: number }[] = [
  { value: "all", label: "All", count: resumeData.projects.length },
  {
    value: "ai",
    label: "AI",
    count: resumeData.projects.filter((p) => p.category === "ai").length,
  },
  {
    value: "healthcare",
    label: "Healthcare",
    count: resumeData.projects.filter((p) => p.category === "healthcare")
      .length,
  },
  {
    value: "fintech",
    label: "Fintech",
    count: resumeData.projects.filter((p) => p.category === "fintech").length,
  },
]

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<Category>("all")
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" })

  const filteredProjects =
    activeCategory === "all"
      ? resumeData.projects
      : resumeData.projects.filter((p) => p.category === activeCategory)

  return (
    <section id="projects" className="scroll-mt-20 px-6 py-14 sm:py-20" ref={sectionRef}>
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title="Projects"
          subtitle="Production applications across AI, healthcare, and fintech"
        />

        {/* Category Filter */}
        <motion.div
          className="mb-12 flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.value
                  ? "text-primary-foreground"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeCategory === cat.value && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 rounded-full bg-primary"
                  style={{
                    boxShadow: "0 0 20px oklch(0.75 0.18 220 / 0.4)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-10">
                {cat.label}
                <span className="ml-1.5 text-xs opacity-70">{cat.count}</span>
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
                transition={{
                  duration: 0.4,
                  delay: 0.05 * index,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
