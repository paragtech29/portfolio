"use client"

import { useState, useRef, useCallback } from "react"
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion"
import { ChevronDown, Briefcase, TrendingUp, Calendar, Building2, ArrowRight } from "lucide-react"
import { resumeData } from "@/data/resume"

// Colors per role for visual hierarchy
const roleColors = [
  { bg: "oklch(0.75 0.18 220)", label: "Current" },
  { bg: "oklch(0.70 0.20 170)", label: "" },
  { bg: "oklch(0.55 0.25 290)", label: "" },
]

// Extract year from date string
function extractYear(dateRange: string): string {
  const match = dateRange.match(/\d{4}/)
  return match ? match[0] : ""
}

function ExperienceCard({
  exp,
  index,
  isExpanded,
  onToggle,
  isInView,
}: {
  exp: (typeof resumeData.experience)[0]
  index: number
  isExpanded: boolean
  onToggle: () => void
  isInView: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const color = roleColors[index]?.bg || "oklch(0.75 0.18 220)"
  const isCurrent = index === 0

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setTilt({
      rotateX: ((y - rect.height / 2) / (rect.height / 2)) * -3,
      rotateY: ((x - rect.width / 2) / (rect.width / 2)) * 3,
    })
    setMousePos({ x, y })
  }, [])

  return (
    <motion.div
      ref={cardRef}
      className="group relative"
      style={{ perspective: "1000px" }}
      initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
      animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
      transition={{
        duration: 0.7,
        delay: 0.2 * index + 0.3,
        ease: [0.25, 0.4, 0.25, 1] as const,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setTilt({ rotateX: 0, rotateY: 0 })
      }}
    >
      <motion.div
        className="glass-card relative overflow-hidden rounded-2xl"
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
        }}
        transition={{ duration: 0.15, ease: "linear" }}
      >
        {/* Cursor spotlight */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${color.replace(")", " / 0.08)")}, transparent 50%)`,
          }}
        />

        {/* Left color accent bar */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl"
          style={{ background: color }}
          initial={{ height: 0 }}
          animate={isInView ? { height: "100%" } : { height: 0 }}
          transition={{ delay: 0.2 * index + 0.5, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const }}
        />

        {/* Shimmer sweep */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent" />

        {/* Header — clickable */}
        <button
          onClick={onToggle}
          className="flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6"
        >
          <div className="flex items-start gap-4">
            {/* Company icon badge */}
            <motion.div
              className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
              style={{ background: `${color.replace(")", " / 0.1)")}` }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Building2 className="h-5 w-5" style={{ color }} />
            </motion.div>

            <div>
              {/* Role with character stagger for current role */}
              <h3 className="text-base font-semibold text-foreground sm:text-lg">
                {isCurrent ? (
                  exp.role.split("").map((char, ci) => (
                    <motion.span
                      key={`${char}-${ci}`}
                      className="inline-block"
                      initial={{ opacity: 0, y: 12 }}
                      animate={isInView ? { opacity: 1, y: 0 } : undefined}
                      transition={{
                        delay: 0.4 + ci * 0.03,
                        duration: 0.3,
                        ease: [0.25, 0.4, 0.25, 1] as const,
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))
                ) : (
                  exp.role
                )}
              </h3>

              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Briefcase className="h-3 w-3" style={{ color, opacity: 0.7 }} />
                  {exp.company}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground/60">
                  <Calendar className="h-3 w-3" />
                  {exp.dateRange}
                </span>
              </div>

              {/* "Current" badge */}
              {isCurrent && (
                <motion.span
                  className="mt-2 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                  style={{
                    color,
                    background: `${color.replace(")", " / 0.1)")}`,
                    border: `1px solid ${color.replace(")", " / 0.2)")}`,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.8, duration: 0.3, type: "spring" }}
                >
                  <motion.span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: color }}
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                  Current Role
                </motion.span>
              )}
            </div>
          </div>

          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] as const }}
            className="mt-2 shrink-0 rounded-full p-1"
            style={{
              background: isExpanded ? `${color.replace(")", " / 0.1)")}` : "transparent",
            }}
          >
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          </motion.div>
        </button>

        {/* Expandable content */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] as const }}
              className="overflow-hidden"
            >
              <div className="border-t border-border/30 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
                <ul className="space-y-3">
                  {exp.bullets.map((bullet, bi) => (
                    <motion.li
                      key={bi}
                      initial={{ opacity: 0, x: -15, filter: "blur(4px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      transition={{
                        delay: 0.06 * bi,
                        duration: 0.4,
                        ease: [0.25, 0.4, 0.25, 1] as const,
                      }}
                      className="flex items-start gap-2.5 text-sm text-muted-foreground"
                    >
                      <motion.div
                        className="mt-1.5 flex h-2 w-2 shrink-0 items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.06 * bi + 0.1, type: "spring", stiffness: 300 }}
                      >
                        <ArrowRight className="h-2.5 w-2.5" style={{ color, opacity: 0.7 }} />
                      </motion.div>
                      {bullet}
                    </motion.li>
                  ))}
                </ul>

                {/* Metrics */}
                {exp.metrics && exp.metrics.length > 0 && (
                  <motion.div
                    className="mt-5 flex flex-wrap gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    {exp.metrics.map((metric, mi) => (
                      <motion.span
                        key={mi}
                        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
                        style={{
                          color,
                          background: `${color.replace(")", " / 0.08)")}`,
                          border: `1px solid ${color.replace(")", " / 0.15)")}`,
                          boxShadow: `0 0 12px ${color.replace(")", " / 0.1)")}`,
                        }}
                        whileHover={{
                          scale: 1.05,
                          boxShadow: `0 0 20px ${color.replace(")", " / 0.25)")}`,
                        }}
                      >
                        <TrendingUp className="h-3 w-3" />
                        {metric}
                      </motion.span>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export function Experience() {
  const [expandedIndex, setExpandedIndex] = useState(0)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" })
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  const backgroundY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section id="experience" className="relative scroll-mt-20 overflow-hidden px-6 py-14 sm:py-20" ref={containerRef}>
      {/* Floating decorative */}
      <motion.div
        className="pointer-events-none absolute right-[5%] top-[20%] opacity-[0.03]"
        style={{ y: backgroundY }}
        animate={{ rotate: [0, 8, -8, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      >
        <Briefcase className="h-40 w-40 text-primary" strokeWidth={0.8} />
      </motion.div>

      <div className="mx-auto max-w-4xl">
        {/* Custom header — big and bold */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const }}
          ref={sectionRef}
        >
          <motion.div
            className="mx-auto mb-5 h-px w-12"
            style={{
              background: "linear-gradient(90deg, transparent, oklch(0.75 0.18 220), transparent)",
            }}
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: 48, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          />

          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {"Where I've".split("").map((char, i) => (
              <motion.span
                key={`a-${i}`}
                className="inline-block text-foreground"
                initial={{ opacity: 0, y: 25, rotateX: 90 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : undefined}
                transition={{
                  delay: 0.3 + i * 0.03,
                  duration: 0.5,
                  ease: [0.25, 0.4, 0.25, 1] as const,
                }}
                style={{ perspective: "500px" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            {" "}
            {"Worked".split("").map((char, i) => (
              <motion.span
                key={`b-${i}`}
                className="inline-block gradient-text"
                initial={{ opacity: 0, y: 25, rotateX: 90 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : undefined}
                transition={{
                  delay: 0.6 + i * 0.03,
                  duration: 0.5,
                  ease: [0.25, 0.4, 0.25, 1] as const,
                }}
                style={{ perspective: "500px" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h2>

          <motion.p
            className="mx-auto mt-4 max-w-md text-sm text-muted-foreground sm:text-base"
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            {resumeData.experience.length} roles across AI, healthcare & fintech — from writing code to leading teams.
          </motion.p>
        </motion.div>

        {/* Year markers + cards */}
        <div className="relative">
          {/* Animated vertical timeline — desktop */}
          <motion.div
            className="absolute left-6 top-0 hidden w-px md:block"
            style={{
              background: "linear-gradient(to bottom, oklch(0.75 0.18 220 / 0.4), oklch(0.55 0.25 290 / 0.2), transparent)",
            }}
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : { height: 0 }}
            transition={{ duration: 1.8, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] as const }}
          />

          <div className="space-y-6">
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="relative md:pl-20">
                {/* Year marker — desktop */}
                <motion.div
                  className="absolute left-0 top-6 hidden md:block"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 * index + 0.5, duration: 0.4 }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[21px] top-1.5 flex items-center justify-center">
                    <motion.div
                      className="h-3 w-3 rounded-full border-2 bg-background"
                      style={{ borderColor: roleColors[index]?.bg || "oklch(0.75 0.18 220)" }}
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: 0.2 * index + 0.6, type: "spring", stiffness: 300 }}
                    />
                    {expandedIndex === index && (
                      <motion.div
                        className="absolute h-5 w-5 rounded-full"
                        style={{ border: `1px solid ${(roleColors[index]?.bg || "oklch(0.75 0.18 220)").replace(")", " / 0.3)")}` }}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      />
                    )}
                  </div>
                </motion.div>

                <ExperienceCard
                  exp={exp}
                  index={index}
                  isExpanded={expandedIndex === index}
                  onToggle={() => setExpandedIndex(expandedIndex === index ? -1 : index)}
                  isInView={isInView}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
