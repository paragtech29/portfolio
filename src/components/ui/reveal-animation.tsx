"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  blur?: boolean
  duration?: number
  once?: boolean
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  blur = true,
  duration = 0.7,
  once = true,
}: RevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-80px" })

  const directionOffset = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
    none: {},
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        filter: blur ? "blur(8px)" : "none",
        ...directionOffset[direction],
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              filter: "blur(0px)",
              x: 0,
              y: 0,
            }
          : undefined
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

interface StaggerRevealProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  once?: boolean
}

export function StaggerReveal({
  children,
  className = "",
  staggerDelay = 0.1,
  once = true,
}: StaggerRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export const staggerChildVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
}
