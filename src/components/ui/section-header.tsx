"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  id?: string
}

export function SectionHeader({ title, subtitle, id }: SectionHeaderProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      id={id}
      className="mb-12 flex flex-col items-center gap-3 text-center sm:mb-16"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {/* Decorative line with glow */}
      <motion.div
        className="relative h-px w-12 rounded-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.75 0.18 220), transparent)",
        }}
        initial={{ width: 0, opacity: 0 }}
        animate={isInView ? { width: 48, opacity: 1 } : { width: 0, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.75 0.18 220 / 0.5), transparent)",
            filter: "blur(4px)",
          }}
          animate={isInView ? { opacity: [0, 1, 0.6] } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </motion.div>

      {/* Title with character reveal */}
      <motion.h2
        className="gradient-text text-3xl font-bold tracking-tight sm:text-4xl overflow-hidden"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title.split("").map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            className="inline-block"
            initial={{ opacity: 0, y: 40, rotateX: 90 }}
            animate={
              isInView
                ? { opacity: 1, y: 0, rotateX: 0 }
                : { opacity: 0, y: 40, rotateX: 90 }
            }
            transition={{
              duration: 0.5,
              delay: 0.3 + i * 0.03,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            style={{ perspective: "500px" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.h2>

      {subtitle && (
        <motion.p
          className="max-w-md text-sm text-muted-foreground sm:text-base"
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={
            isInView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 10, filter: "blur(4px)" }
          }
          transition={{ duration: 0.5, delay: 0.5 + title.length * 0.03 }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
