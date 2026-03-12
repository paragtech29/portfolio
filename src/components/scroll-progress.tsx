"use client"

import { motion, useScroll, useSpring } from "framer-motion"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, oklch(0.75 0.18 220), oklch(0.55 0.25 290))",
        boxShadow: "0 0 10px oklch(0.75 0.18 220 / 0.5)",
      }}
    />
  )
}
