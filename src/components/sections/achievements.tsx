"use client"

import { useRef, useState, useCallback } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Brain, Zap, Users, Rocket, Target, Globe } from "lucide-react"
import { SectionHeader } from "@/components/ui/section-header"
import { AnimatedCounter, ProgressRing } from "@/components/ui/animated-counter"
import { achievements } from "@/data/achievements"

const typeIcons = {
  ai: Brain,
  performance: Zap,
  leadership: Users,
}

const typeColors = {
  ai: "oklch(0.75 0.18 220)",
  performance: "oklch(0.70 0.20 170)",
  leadership: "oklch(0.55 0.25 290)",
}

const typeLabels = {
  ai: "AI & Innovation",
  performance: "Performance",
  leadership: "Leadership",
}

// Marquee ticker content
const marqueeItems = [
  "20% Performance Boost",
  "3 AI Platforms Built",
  "4+ Years Experience",
  "6 Production Projects",
  "Team Leadership",
  "Real-time Systems",
  "Full-Stack Delivery",
  "Code Quality Champion",
]

// 3D tilt card with cursor spotlight
function AchievementCard({
  achievement,
  index,
  isInView,
  isHero,
}: {
  achievement: (typeof achievements)[0]
  index: number
  isInView: boolean
  isHero?: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const Icon = typeIcons[achievement.type]
  const color = typeColors[achievement.type]
  const label = typeLabels[achievement.type]

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    setTilt({
      rotateX: ((y - centerY) / centerY) * -5,
      rotateY: ((x - centerX) / centerX) * 5,
    })
    setMousePos({ x, y })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 })
    setIsHovered(false)
  }, [])

  return (
    <motion.div
      ref={cardRef}
      className={`group relative ${isHero ? "sm:col-span-2 sm:row-span-2" : ""}`}
      style={{ perspective: "1000px" }}
      initial={{ opacity: 0, y: 35, filter: "blur(8px)", scale: 0.94 }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 } : {}}
      transition={{
        duration: 0.7,
        delay: 0.1 * index + 0.2,
        ease: [0.25, 0.4, 0.25, 1] as const,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="glass-card relative h-full overflow-hidden rounded-2xl"
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
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${color.replace(")", " / 0.1)")}, transparent 50%)`,
          }}
        />

        {/* Animated top border */}
        <motion.div
          className="absolute left-0 right-0 top-0 h-[2px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.1 * index + 0.5, duration: 0.6 }}
        />

        {/* Shimmer on hover */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />

        <div className={`relative ${isHero ? "p-7 sm:p-8" : "p-5 sm:p-6"}`}>
          {/* Category badge + icon */}
          <div className="mb-4 flex items-center justify-between">
            <motion.div
              className="flex items-center gap-2.5"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="rounded-xl p-2.5"
                style={{ background: `${color.replace(")", " / 0.1)")}` }}
                whileHover={{ scale: 1.15, rotate: 8 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <Icon
                  className={isHero ? "h-6 w-6" : "h-5 w-5"}
                  style={{ color }}
                />
              </motion.div>
              <span
                className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                style={{
                  color,
                  background: `${color.replace(")", " / 0.08)")}`,
                  border: `1px solid ${color.replace(")", " / 0.15)")}`,
                }}
              >
                {label}
              </span>
            </motion.div>

            {/* Decorative dot pattern for hero */}
            {isHero && (
              <div className="hidden gap-1 sm:grid grid-cols-3 opacity-20">
                {Array.from({ length: 9 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-1 w-1 rounded-full"
                    style={{ background: color }}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 + i * 0.05 }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Title with character stagger for hero */}
          <h3 className={`font-semibold text-foreground ${isHero ? "text-xl sm:text-2xl mb-3" : "text-base mb-2"}`}>
            {isHero ? (
              achievement.title.split("").map((char, ci) => (
                <motion.span
                  key={`${char}-${ci}`}
                  className="inline-block"
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : undefined}
                  transition={{
                    delay: 0.3 + ci * 0.02,
                    duration: 0.3,
                    ease: [0.25, 0.4, 0.25, 1] as const,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))
            ) : (
              achievement.title
            )}
          </h3>

          <p className={`leading-relaxed text-muted-foreground ${isHero ? "text-sm sm:text-base" : "text-sm"}`}>
            {achievement.description}
          </p>

          {/* Bottom decorative line for hero */}
          {isHero && (
            <motion.div
              className="mt-6 h-px"
              style={{
                background: `linear-gradient(90deg, ${color}, transparent)`,
              }}
              initial={{ width: 0 }}
              animate={isInView ? { width: "60%" } : { width: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

// Stat tile for bento grid
function StatTile({
  value,
  suffix,
  label,
  icon: Icon,
  color,
  index,
  isInView,
  isRing,
}: {
  value: number
  suffix?: string
  label: string
  icon: React.ElementType
  color: string
  index: number
  isInView: boolean
  isRing?: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="glass-card group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl p-5 sm:p-6"
      initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
      animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
      transition={{
        duration: 0.6,
        delay: 0.12 * index + 0.15,
        ease: [0.25, 0.4, 0.25, 1] as const,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -3, scale: 1.02 }}
    >
      {/* Background glow on hover */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color.replace(")", " / 0.08)")}, transparent 70%)`,
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Small icon */}
      <motion.div
        className="mb-3"
        animate={isHovered ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <Icon className="h-4 w-4" style={{ color, opacity: 0.6 }} />
      </motion.div>

      {isRing ? (
        <ProgressRing value={value} label={label} size={90} strokeWidth={3} color={color} />
      ) : (
        <AnimatedCounter value={value} suffix={suffix} label={label} large />
      )}
    </motion.div>
  )
}

// Infinite marquee ticker
function MarqueeTicker({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      className="relative mb-14 overflow-hidden py-4"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ delay: 0.1, duration: 0.5 }}
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background to-transparent" />

      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Duplicate for seamless loop */}
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground/40"
          >
            <span
              className="h-1 w-1 rounded-full"
              style={{
                background: i % 3 === 0
                  ? "oklch(0.75 0.18 220)"
                  : i % 3 === 1
                  ? "oklch(0.70 0.20 170)"
                  : "oklch(0.55 0.25 290)",
              }}
            />
            {item}
          </span>
        ))}
      </motion.div>
    </motion.div>
  )
}

export function Achievements() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" })

  return (
    <section id="achievements" className="scroll-mt-20 px-6 py-14 sm:py-20" ref={sectionRef}>
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          title="Impact & Achievements"
          subtitle="Real results, not just buzzwords"
        />

        {/* Marquee Ticker */}
        <MarqueeTicker isInView={isInView} />

        {/* Bento Grid — Stats + Achievements mixed */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 auto-rows-auto">
          {/* Row 1: Hero Achievement (2x2) + 2 Stats */}
          <AchievementCard
            achievement={achievements[0]}
            index={0}
            isInView={isInView}
            isHero
          />
          <StatTile
            value={4}
            suffix="+"
            label="Years Experience"
            icon={Target}
            color="oklch(0.75 0.18 220)"
            index={1}
            isInView={isInView}
          />
          <StatTile
            value={20}
            label="Perf Boost"
            icon={Zap}
            color="oklch(0.70 0.20 170)"
            index={2}
            isInView={isInView}
            isRing
          />

          {/* Row 2: 2 Achievement cards + 1 stat */}
          <AchievementCard
            achievement={achievements[1]}
            index={3}
            isInView={isInView}
          />
          <AchievementCard
            achievement={achievements[2]}
            index={4}
            isInView={isInView}
          />

          {/* Row 3: 1 stat + 2 achievements */}
          <StatTile
            value={6}
            suffix=""
            label="Projects Shipped"
            icon={Rocket}
            color="oklch(0.55 0.25 290)"
            index={5}
            isInView={isInView}
          />
          <AchievementCard
            achievement={achievements[3]}
            index={6}
            isInView={isInView}
          />

          {/* Row 4: Achievement (2 col) + stat */}
          <AchievementCard
            achievement={achievements[4]}
            index={7}
            isInView={isInView}
          />
          <StatTile
            value={3}
            suffix=""
            label="AI Platforms"
            icon={Globe}
            color="oklch(0.75 0.18 220)"
            index={8}
            isInView={isInView}
          />
        </div>
      </div>
    </section>
  )
}
