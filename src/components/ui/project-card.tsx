"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import type { Project } from "@/data/types"

const categoryColors: Record<string, string> = {
  ai: "oklch(0.75 0.18 220)",
  healthcare: "oklch(0.70 0.17 160)",
  fintech: "oklch(0.75 0.15 80)",
  other: "oklch(0.65 0.02 260)",
}

const categoryLabels: Record<string, string> = {
  ai: "AI",
  healthcare: "Healthcare",
  fintech: "Fintech",
  other: "Other",
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const color = categoryColors[project.category] || categoryColors.other
  const label = categoryLabels[project.category] || "Other"

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -4
    const rotateY = ((x - centerX) / centerX) * 4
    setTilt({ rotateX, rotateY })
  }

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 })
    setIsHovered(false)
  }

  const visibleBullets = expanded ? project.bullets : project.bullets.slice(0, 2)
  const hasMore = project.bullets.length > 2

  return (
    <motion.div
      ref={cardRef}
      layout
      className="group relative overflow-hidden rounded-xl"
      style={{
        perspective: "800px",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated border gradient */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${color}, transparent, ${color})`,
          padding: "1px",
        }}
      />

      <motion.div
        className="glass-card relative h-full p-5"
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.15, ease: "linear" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Hover glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at 50% 30%, ${color.replace(")", " / 0.06)")}, transparent)`,
          }}
        />

        <div className="relative">
          {/* Header */}
          <div className="mb-3 flex items-start justify-between gap-2">
            <div>
              <h3 className="text-base font-semibold text-foreground">
                {project.title}
              </h3>
              {project.client && (
                <p className="text-xs text-muted-foreground">
                  {project.client}
                </p>
              )}
            </div>
            <span
              className="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium"
              style={{
                background: `${color.replace(")", " / 0.12)")}`,
                color,
              }}
            >
              {label}
            </span>
          </div>

          {/* Role badge */}
          <div className="mb-3">
            <span className="inline-flex rounded-md bg-muted/50 px-2 py-0.5 text-xs font-medium text-muted-foreground">
              {project.role}
            </span>
          </div>

          {/* Tech stack */}
          <div className="mb-3 flex flex-wrap gap-1.5">
            {project.techStack.map((tech, i) => (
              <span
                key={i}
                className="rounded-full border border-border/50 px-2 py-0.5 text-[10px] text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
            {project.description.split(".").slice(0, 2).join(".") + "."}
          </p>

          {/* Bullets */}
          <ul className="space-y-1.5">
            {visibleBullets.map((bullet, i) => (
              <li
                key={i}
                className="flex items-start gap-1.5 text-xs text-muted-foreground"
              >
                <span
                  className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                  style={{ background: color }}
                />
                {bullet}
              </li>
            ))}
          </ul>

          {/* Show more toggle */}
          {hasMore && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-2 flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80"
            >
              {expanded ? "Show less" : `Show ${project.bullets.length - 2} more`}
              <motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-3 w-3" />
              </motion.span>
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
