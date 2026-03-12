"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useSpring, useMotionValue } from "framer-motion"

interface AnimatedCounterProps {
  value: number
  suffix?: string
  label: string
  duration?: number
  large?: boolean
}

export function AnimatedCounter({
  value,
  suffix = "",
  label,
  duration = 2000,
  large = false,
}: AnimatedCounterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic with slight overshoot
      const eased = progress < 1
        ? 1 - Math.pow(1 - progress, 3)
        : 1
      setCount(Math.round(eased * value))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, value, duration])

  return (
    <div ref={ref} className="flex flex-col items-center gap-1">
      <div className="flex items-baseline">
        <motion.span
          className={`gradient-text font-bold ${large ? "text-5xl sm:text-6xl" : "text-3xl sm:text-4xl"}`}
          style={{ fontFamily: "var(--font-display)" }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 15 }}
        >
          {count}
        </motion.span>
        {suffix && (
          <motion.span
            className={`gradient-text font-bold ${large ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"}`}
            style={{ fontFamily: "var(--font-display)" }}
            initial={{ opacity: 0, x: -5 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {suffix}
          </motion.span>
        )}
      </div>
      <span className="text-xs text-muted-foreground/70 uppercase tracking-widest sm:text-[11px]">
        {label}
      </span>
    </div>
  )
}

// Progress ring for percentage stats
interface ProgressRingProps {
  value: number
  label: string
  size?: number
  strokeWidth?: number
  color?: string
}

export function ProgressRing({
  value,
  label,
  size = 100,
  strokeWidth = 4,
  color = "oklch(0.75 0.18 220)",
}: ProgressRingProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    const startTime = performance.now()
    const duration = 1800

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * value))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, value])

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          {/* Background ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="oklch(0.25 0.02 260)"
            strokeWidth={strokeWidth}
          />
          {/* Animated progress ring */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={
              isInView
                ? { strokeDashoffset: circumference - (circumference * value) / 100 }
                : { strokeDashoffset: circumference }
            }
            transition={{ duration: 1.8, ease: [0.25, 0.4, 0.25, 1] as const, delay: 0.2 }}
            style={{
              filter: `drop-shadow(0 0 6px ${color.replace(")", " / 0.4)")})`,
            }}
          />
        </svg>
        {/* Center number */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="gradient-text text-2xl font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {count}%
          </span>
        </div>
      </div>
      <span className="text-[10px] text-muted-foreground/70 uppercase tracking-widest">
        {label}
      </span>
    </div>
  )
}
