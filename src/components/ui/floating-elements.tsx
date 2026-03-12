"use client"

import { motion } from "framer-motion"

interface FloatingElementProps {
  className?: string
  duration?: number
  delay?: number
  range?: number
  children?: React.ReactNode
}

export function FloatingElement({
  className = "",
  duration = 6,
  delay = 0,
  range = 20,
  children,
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-range, range, -range],
        x: [-range * 0.5, range * 0.5, -range * 0.5],
        rotate: [-5, 5, -5],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

export function GlowOrb({
  className = "",
  color = "primary",
  size = 300,
  blur = 80,
  delay = 0,
}: {
  className?: string
  color?: "primary" | "accent" | "cyan"
  size?: number
  blur?: number
  delay?: number
}) {
  const colors = {
    primary: "oklch(0.75 0.18 220 / 0.15)",
    accent: "oklch(0.55 0.25 290 / 0.12)",
    cyan: "oklch(0.70 0.20 195 / 0.10)",
  }

  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${colors[color]} 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  )
}
