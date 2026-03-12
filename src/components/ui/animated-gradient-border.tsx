"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedGradientBorderProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  borderRadius?: string
}

export function AnimatedGradientBorder({
  children,
  className = "",
  containerClassName = "",
  borderRadius = "var(--radius)",
}: AnimatedGradientBorderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${containerClassName}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ borderRadius }}
    >
      {/* Gradient border effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px"
        style={{
          borderRadius,
          background: isHovered
            ? `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, oklch(0.75 0.18 220 / 0.4), oklch(0.55 0.25 290 / 0.2), transparent 70%)`
            : "none",
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className={`relative ${className}`} style={{ borderRadius }}>
        {children}
      </div>
    </motion.div>
  )
}
