"use client"

import { useEffect, useState } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isMobile, setIsMobile] = useState(true)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
  const smoothX = useSpring(cursorX, springConfig)
  const smoothY = useSpring(cursorY, springConfig)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-magnetic]") ||
        target.closest("[role='button']") ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA"
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-magnetic]") ||
        target.closest("[role='button']") ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA"
      ) {
        setIsHovering(false)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseout", handleMouseOut)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseout", handleMouseOut)
      window.removeEventListener("resize", checkMobile)
    }
  }, [cursorX, cursorY])

  if (isMobile) return null

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{
            width: isClicking ? 4 : 8,
            height: isClicking ? 4 : 8,
            opacity: 0.9,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
        />
      </motion.div>

      {/* Outer ring - small, expands slightly on hover */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full border border-primary/30"
          animate={{
            width: isHovering ? 28 : 24,
            height: isHovering ? 28 : 24,
            opacity: isHovering ? 0.6 : 0.25,
            borderColor: isHovering
              ? "oklch(0.75 0.18 220 / 0.5)"
              : "oklch(0.75 0.18 220 / 0.15)",
          }}
          transition={{ type: "spring", stiffness: 250, damping: 20 }}
        />
      </motion.div>

      {/* Hide default cursor globally */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  )
}
