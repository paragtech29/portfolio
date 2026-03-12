"use client"

import { useRef, useState, useCallback } from "react"
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion"
import { GraduationCap, BookOpen, Award, MapPin, Calendar, Sparkles } from "lucide-react"
import { resumeData } from "@/data/resume"
import { SectionHeader } from "@/components/ui/section-header"

// Enriched education data with highlights
const educationMeta: Record<string, {
  highlights?: string[]
  icon: React.ElementType
  color: string
  accentGlow: string
  level: "master" | "bachelor" | "school"
}> = {
  MCA: {
    highlights: ["Data Structures & Algorithms", "Software Engineering", "AI & Machine Learning"],
    icon: Award,
    color: "oklch(0.80 0.15 60)",
    accentGlow: "oklch(0.80 0.15 60 / 0.3)",
    level: "master",
  },
  BCA: {
    highlights: ["Web Development", "Database Management", "Computer Networks"],
    icon: GraduationCap,
    color: "oklch(0.75 0.18 220)",
    accentGlow: "oklch(0.75 0.18 220 / 0.3)",
    level: "bachelor",
  },
  HSC: {
    icon: BookOpen,
    color: "oklch(0.70 0.20 170)",
    accentGlow: "oklch(0.70 0.20 170 / 0.3)",
    level: "school",
  },
  SSC: {
    icon: BookOpen,
    color: "oklch(0.55 0.25 290)",
    accentGlow: "oklch(0.55 0.25 290 / 0.3)",
    level: "school",
  },
}

// 3D tilt + spotlight card
function EducationCard({
  edu,
  index,
  isInView,
  isHero,
}: {
  edu: (typeof resumeData.education)[0]
  index: number
  isInView: boolean
  isHero?: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const meta = educationMeta[edu.abbreviation]
  const Icon = meta?.icon || BookOpen
  const color = meta?.color || "oklch(0.75 0.18 220)"
  const accentGlow = meta?.accentGlow || "oklch(0.75 0.18 220 / 0.3)"

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -6
    const rotateY = ((x - centerX) / centerX) * 6
    setTilt({ rotateX, rotateY })
    setMousePos({ x, y })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 })
    setIsHovered(false)
  }, [])

  return (
    <motion.div
      ref={cardRef}
      className={`group relative ${isHero ? "sm:col-span-2" : ""}`}
      style={{ perspective: "1000px" }}
      initial={{ opacity: 0, y: 40, filter: "blur(10px)", scale: 0.92 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }
          : undefined
      }
      transition={{
        duration: 0.7,
        delay: 0.15 * index + 0.2,
        ease: [0.25, 0.4, 0.25, 1] as const,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated gradient border */}
      <motion.div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `conic-gradient(from var(--border-angle, 0deg), ${color}, oklch(0.55 0.25 290), ${color})`,
        }}
        animate={isHovered ? { "--border-angle": "360deg" } as Record<string, string> : {}}
        transition={isHovered ? { duration: 3, repeat: Infinity, ease: "linear" } : {}}
      />

      <motion.div
        className="relative h-full overflow-hidden rounded-2xl glass-card"
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
        }}
        transition={{ duration: 0.15, ease: "linear" }}
      >
        {/* Cursor spotlight */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, ${accentGlow.replace("0.3", "0.12")}, transparent 50%)`,
          }}
        />

        {/* Top accent gradient line */}
        <motion.div
          className="absolute left-0 right-0 top-0 h-[2px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            opacity: 0,
          }}
          animate={isInView ? { opacity: [0, 1] } : {}}
          transition={{ delay: 0.15 * index + 0.6, duration: 0.5 }}
        />

        <div className={`relative p-6 ${isHero ? "sm:p-8" : ""}`}>
          {/* Header row */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              {/* Animated degree badge */}
              <motion.div
                className="relative flex shrink-0 items-center justify-center rounded-xl"
                style={{
                  width: isHero ? 64 : 52,
                  height: isHero ? 64 : 52,
                  background: `${color.replace(")", " / 0.1)")}`,
                }}
                whileHover={{
                  scale: 1.12,
                  rotate: [0, -5, 5, 0],
                  boxShadow: `0 0 20px ${accentGlow}`,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Pulsing ring on hero */}
                {isHero && (
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    style={{ border: `1px solid ${color.replace(")", " / 0.3)")}` }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
                <span
                  className={`font-bold ${isHero ? "text-lg" : "text-sm"}`}
                  style={{
                    fontFamily: "var(--font-display)",
                    background: `linear-gradient(135deg, ${color}, oklch(0.55 0.25 290))`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {edu.abbreviation}
                </span>
              </motion.div>

              <div className="min-w-0">
                {/* Degree name with character stagger */}
                <h3 className={`font-semibold text-foreground ${isHero ? "text-lg sm:text-xl" : "text-base"}`}>
                  {edu.degree.split("").map((char, ci) => (
                    <motion.span
                      key={`${char}-${ci}`}
                      className="inline-block"
                      initial={{ opacity: 0, y: 15 }}
                      animate={isInView ? { opacity: 1, y: 0 } : undefined}
                      transition={{
                        delay: 0.15 * index + 0.3 + ci * 0.02,
                        duration: 0.3,
                        ease: [0.25, 0.4, 0.25, 1] as const,
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </h3>

                {/* Institution */}
                <motion.div
                  className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : undefined}
                  transition={{ delay: 0.15 * index + 0.5, duration: 0.4 }}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" style={{ color }} />
                  <span>{edu.institution}</span>
                </motion.div>

                {/* Date & Location row */}
                <motion.div
                  className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground/60"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : undefined}
                  transition={{ delay: 0.15 * index + 0.6, duration: 0.4 }}
                >
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {edu.dateRange}
                  </span>
                  {edu.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {edu.location}
                    </span>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Level indicator */}
            {meta?.level !== "school" && (
              <motion.div
                className="hidden shrink-0 sm:block"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : undefined}
                transition={{
                  delay: 0.15 * index + 0.7,
                  duration: 0.4,
                  type: "spring",
                  stiffness: 300,
                }}
              >
                <span
                  className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider"
                  style={{
                    background: `${color.replace(")", " / 0.1)")}`,
                    color,
                    border: `1px solid ${color.replace(")", " / 0.2)")}`,
                  }}
                >
                  {meta.level === "master" ? "Post Graduate" : "Under Graduate"}
                </span>
              </motion.div>
            )}
          </div>

          {/* Highlights / Key subjects (only for degree cards) */}
          {meta?.highlights && (
            <motion.div
              className="mt-5 flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.15 * index + 0.7, duration: 0.5 }}
            >
              {meta.highlights.map((highlight, hi) => (
                <motion.span
                  key={highlight}
                  className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-all duration-300 hover:text-foreground"
                  style={{
                    background: "var(--muted)",
                    border: "1px solid var(--border)",
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : undefined}
                  transition={{
                    delay: 0.15 * index + 0.8 + hi * 0.08,
                    duration: 0.3,
                    ease: [0.25, 0.4, 0.25, 1] as const,
                  }}
                  whileHover={{
                    scale: 1.08,
                    borderColor: color.replace(")", " / 0.3)"),
                    y: -1,
                  }}
                >
                  <Sparkles className="h-2.5 w-2.5" style={{ color }} />
                  {highlight}
                </motion.span>
              ))}
            </motion.div>
          )}

          {/* Completion progress bar */}
          <motion.div
            className="mt-5"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : undefined}
            transition={{ delay: 0.15 * index + 0.8, duration: 0.4 }}
          >
            <div className="flex items-center justify-between text-[10px] text-muted-foreground/50 mb-1.5">
              <span>Completed</span>
              <span>100%</span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-muted/30">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${color}, oklch(0.55 0.25 290))`,
                  boxShadow: `0 0 8px ${accentGlow}`,
                }}
                initial={{ width: "0%" }}
                animate={isInView ? { width: "100%" } : { width: "0%" }}
                transition={{
                  delay: 0.15 * index + 0.9,
                  duration: 1,
                  ease: [0.25, 0.4, 0.25, 1] as const,
                }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <section
      id="education"
      className="relative scroll-mt-20 px-6 py-14 sm:py-20 overflow-hidden"
      ref={sectionRef}
    >
      {/* Floating decorative elements */}
      <motion.div
        className="pointer-events-none absolute right-[10%] top-[15%] opacity-[0.04]"
        style={{ y: backgroundY }}
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <GraduationCap className="h-32 w-32 text-primary" strokeWidth={1} />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute left-[8%] bottom-[20%] opacity-[0.03]"
        style={{ y: backgroundY }}
        animate={{ rotate: [0, -8, 8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <BookOpen className="h-24 w-24 text-primary" strokeWidth={1} />
      </motion.div>

      <div className="mx-auto max-w-4xl" ref={ref}>
        <SectionHeader
          title="Education"
          subtitle="Academic journey in Computer Science"
        />

        {/* Bento Grid Layout */}
        <div className="grid gap-4 sm:grid-cols-2">
          {resumeData.education.map((edu, index) => (
            <EducationCard
              key={edu.abbreviation}
              edu={edu}
              index={index}
              isInView={isInView}
              isHero={index === 0}
            />
          ))}
        </div>

        {/* Academic journey summary */}
        <motion.div
          className="mt-8 flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          {resumeData.education.map((edu, i) => (
            <div key={edu.abbreviation} className="flex items-center gap-3">
              <motion.div
                className="flex items-center gap-1.5"
                whileHover={{ scale: 1.1 }}
              >
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ background: educationMeta[edu.abbreviation]?.color }}
                />
                <span className="text-[11px] font-medium text-muted-foreground/60">
                  {edu.abbreviation}
                </span>
              </motion.div>
              {i < resumeData.education.length - 1 && (
                <motion.div
                  className="h-px w-6"
                  style={{
                    background: `linear-gradient(90deg, ${educationMeta[edu.abbreviation]?.color || "oklch(0.75 0.18 220)"}, oklch(0.5 0 260 / 0.2))`,
                  }}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: 24 } : { width: 0 }}
                  transition={{ delay: 1.3 + i * 0.15, duration: 0.4 }}
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
