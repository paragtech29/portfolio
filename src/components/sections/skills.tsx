"use client"

import { useRef, useState, useCallback } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import {
  Monitor,
  Server,
  Wrench,
  GitBranch,
  FlaskConical,
  Container,
  Cloud,
  Users,
  Heart,
  Code2,
} from "lucide-react"
import { resumeData } from "@/data/resume"

const categoryIcons: Record<string, React.ElementType> = {
  "Frontend Development": Monitor,
  "Backend & Full-Stack": Server,
  "Tools & Practices": Wrench,
  "Version Control": GitBranch,
  Testing: FlaskConical,
  "DevOps & CI/CD": Container,
  "Cloud Services": Cloud,
  "Collaboration & Leadership": Users,
  "Soft Skills": Heart,
}

const categoryColors: Record<string, string> = {
  "Frontend Development": "oklch(0.75 0.18 220)",
  "Backend & Full-Stack": "oklch(0.70 0.20 170)",
  "Tools & Practices": "oklch(0.75 0.15 80)",
  "Version Control": "oklch(0.65 0.18 30)",
  Testing: "oklch(0.70 0.17 160)",
  "DevOps & CI/CD": "oklch(0.60 0.20 300)",
  "Cloud Services": "oklch(0.65 0.15 250)",
  "Collaboration & Leadership": "oklch(0.55 0.25 290)",
  "Soft Skills": "oklch(0.70 0.15 350)",
}

// All skills flattened for marquee
const allSkills = resumeData.skills.flatMap((cat) => cat.skills)

function SkillCard({
  category,
  index,
  isInView,
  isHero,
}: {
  category: (typeof resumeData.skills)[0]
  index: number
  isInView: boolean
  isHero?: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const Icon = categoryIcons[category.category] || Wrench
  const color = categoryColors[category.category] || "oklch(0.75 0.18 220)"

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setTilt({
      rotateX: ((y - rect.height / 2) / (rect.height / 2)) * -4,
      rotateY: ((x - rect.width / 2) / (rect.width / 2)) * 4,
    })
    setMousePos({ x, y })
  }, [])

  return (
    <motion.div
      ref={cardRef}
      className={`group relative ${isHero ? "sm:col-span-2" : ""}`}
      style={{ perspective: "1000px" }}
      initial={{ opacity: 0, y: 35, filter: "blur(8px)", scale: 0.94 }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.08 * index + 0.2,
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
        className="glass-card relative h-full overflow-hidden rounded-2xl"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
        transition={{ duration: 0.15, ease: "linear" }}
      >
        {/* Cursor spotlight */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${color.replace(")", " / 0.1)")}, transparent 50%)`,
          }}
        />

        {/* Top accent line */}
        <motion.div
          className="absolute left-0 right-0 top-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ delay: 0.08 * index + 0.5, duration: 0.6 }}
        />

        {/* Shimmer */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent" />

        <div className={`relative ${isHero ? "p-6 sm:p-7" : "p-5"}`}>
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <motion.div
                className="rounded-xl p-2.5"
                style={{ background: `${color.replace(")", " / 0.1)")}` }}
                whileHover={{ scale: 1.15, rotate: 8 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <Icon className={isHero ? "h-5 w-5" : "h-4 w-4"} style={{ color }} />
              </motion.div>
              <h3 className={`font-semibold text-foreground ${isHero ? "text-base" : "text-sm"}`}>
                {category.category}
              </h3>
            </div>

            {/* Skill count */}
            <motion.span
              className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
              style={{
                color,
                background: `${color.replace(")", " / 0.08)")}`,
                border: `1px solid ${color.replace(")", " / 0.15)")}`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.08 * index + 0.6, type: "spring", stiffness: 300 }}
            >
              {category.skills.length}
            </motion.span>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill, si) => (
              <motion.span
                key={skill}
                className="group/tag relative rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all duration-300 hover:text-foreground"
                style={{
                  background: "var(--muted)",
                  border: "1px solid var(--border)",
                }}
                initial={{ opacity: 0, scale: 0.7, filter: "blur(4px)" }}
                animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
                transition={{
                  duration: 0.4,
                  delay: 0.08 * index + 0.3 + si * 0.04,
                  ease: [0.25, 0.4, 0.25, 1] as const,
                }}
                whileHover={{
                  scale: 1.1,
                  y: -2,
                  borderColor: color.replace(")", " / 0.4)"),
                  background: `${color.replace(")", " / 0.08)")}`,
                }}
              >
                {/* Hover glow behind tag */}
                <span
                  className="absolute inset-0 rounded-full opacity-0 group-hover/tag:opacity-100 transition-opacity duration-300"
                  style={{
                    boxShadow: `0 0 12px ${color.replace(")", " / 0.15)")}`,
                  }}
                />
                <span className="relative">{skill}</span>
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Scrolling skill marquee
function SkillMarquee({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      className="relative mb-14 overflow-hidden py-3"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ delay: 0.1, duration: 0.5 }}
    >
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />

      <motion.div
        className="flex gap-6 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[...allSkills, ...allSkills].map((skill, i) => (
          <span
            key={i}
            className="flex items-center gap-1.5 text-sm text-muted-foreground/30 font-medium"
          >
            <Code2 className="h-3 w-3" />
            {skill}
          </span>
        ))}
      </motion.div>
    </motion.div>
  )
}

export function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const backgroundY = useTransform(scrollYProgress, [0, 1], [40, -40])

  // Total skill count
  const totalSkills = resumeData.skills.reduce((acc, cat) => acc + cat.skills.length, 0)

  return (
    <section
      id="skills"
      className="relative scroll-mt-20 overflow-hidden px-6 py-14 sm:py-20"
      ref={sectionRef}
    >
      {/* Floating decorative */}
      <motion.div
        className="pointer-events-none absolute left-[8%] top-[25%] opacity-[0.03]"
        style={{ y: backgroundY }}
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      >
        <Code2 className="h-36 w-36 text-primary" strokeWidth={0.8} />
      </motion.div>

      <div className="mx-auto max-w-5xl" ref={ref}>
        {/* Custom header */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const }}
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
            {"My Tech".split("").map((char, i) => (
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
            {"Arsenal".split("").map((char, i) => (
              <motion.span
                key={`b-${i}`}
                className="inline-block gradient-text"
                initial={{ opacity: 0, y: 25, rotateX: 90 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : undefined}
                transition={{
                  delay: 0.55 + i * 0.03,
                  duration: 0.5,
                  ease: [0.25, 0.4, 0.25, 1] as const,
                }}
                style={{ perspective: "500px" }}
              >
                {char}
              </motion.span>
            ))}
          </h2>

          <motion.p
            className="mx-auto mt-4 max-w-md text-sm text-muted-foreground sm:text-base"
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {totalSkills}+ tools, frameworks & practices I use to ship great products.
          </motion.p>
        </motion.div>

        {/* Marquee */}
        <SkillMarquee isInView={isInView} />

        {/* Bento Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resumeData.skills.map((category, index) => (
            <SkillCard
              key={category.category}
              category={category}
              index={index}
              isInView={isInView}
              isHero={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
