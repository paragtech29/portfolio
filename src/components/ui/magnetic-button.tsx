"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  href?: string
  download?: boolean
  onClick?: (e: React.MouseEvent) => void
  strength?: number
}

export function MagneticButton({
  children,
  className = "",
  href,
  download,
  onClick,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength
    setPosition({ x: deltaX, y: deltaY })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const Tag = href ? "a" : "button"
  const linkProps = href ? { href, download } : {}

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 250, damping: 15, mass: 0.5 }}
      data-magnetic
    >
      <Tag
        {...linkProps}
        onClick={onClick}
        className={className}
      >
        {children}
      </Tag>
    </motion.div>
  )
}
