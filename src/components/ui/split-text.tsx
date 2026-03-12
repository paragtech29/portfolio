"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  once?: boolean
  splitBy?: "char" | "word"
  staggerDelay?: number
  animate?: boolean
}

export function SplitText({
  text,
  className = "",
  delay = 0,
  once = true,
  splitBy = "char",
  staggerDelay,
  animate: externalAnimate,
}: SplitTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-60px" })
  const shouldAnimate = externalAnimate !== undefined ? externalAnimate : isInView

  const parts = splitBy === "char" ? text.split("") : text.split(" ")
  const defaultStagger = splitBy === "char" ? 0.03 : 0.08
  const stagger = staggerDelay ?? defaultStagger

  return (
    <motion.span
      ref={ref}
      className={`inline-flex flex-wrap ${className}`}
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
    >
      {parts.map((part, i) => (
        <motion.span
          key={`${part}-${i}`}
          className="inline-block"
          variants={{
            hidden: {
              opacity: 0,
              y: 20,
              rotateX: 90,
              filter: "blur(4px)",
            },
            visible: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              filter: "blur(0px)",
              transition: {
                duration: 0.5,
                ease: [0.25, 0.4, 0.25, 1],
              },
            },
          }}
          style={{ perspective: "500px" }}
        >
          {part === " " ? "\u00A0" : part}
          {splitBy === "word" && i < parts.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>
  )
}
