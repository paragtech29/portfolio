"use client"

import { motion } from "framer-motion"

interface SplashScreenProps {
  onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden"
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {/* Background particles during splash */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-primary/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 0.5, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2,
            delay: Math.random() * 1.5,
            repeat: Infinity,
          }}
        />
      ))}

      {/* PB Monogram */}
      <motion.div className="relative mb-8">
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          {/* Background circle */}
          <motion.circle
            cx="60"
            cy="60"
            r="56"
            stroke="url(#monogramGradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
          />

          {/* P letter */}
          <motion.path
            d="M 35 85 L 35 35 L 52 35 Q 65 35 65 48 Q 65 61 52 61 L 35 61"
            stroke="url(#monogramGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
          />

          {/* B letter */}
          <motion.path
            d="M 58 85 L 58 35 L 73 35 Q 87 35 87 47 Q 87 55 78 57 Q 89 59 89 70 Q 89 85 73 85 L 58 85"
            stroke="url(#monogramGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          />

          <defs>
            <linearGradient
              id="monogramGradient"
              x1="0"
              y1="0"
              x2="120"
              y2="120"
            >
              <stop offset="0%" stopColor="oklch(0.75 0.18 220)" />
              <stop offset="100%" stopColor="oklch(0.55 0.25 290)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Rotating glow ring */}
        <motion.div
          className="absolute -inset-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <div
            className="h-full w-full rounded-full"
            style={{
              background: "conic-gradient(from 0deg, transparent, oklch(0.75 0.18 220 / 0.3), transparent, oklch(0.55 0.25 290 / 0.3), transparent)",
              filter: "blur(8px)",
            }}
          />
        </motion.div>

        {/* Glow effect after letters complete */}
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0.4] }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{
            background:
              "radial-gradient(circle, oklch(0.75 0.18 220 / 0.25) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />
      </motion.div>

      {/* Name text with letter animation */}
      <motion.div
        className="mb-6 flex gap-[0.15em] text-sm font-medium tracking-[0.3em] text-muted-foreground uppercase"
      >
        {"Parag Baldaniya".split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5 + i * 0.04,
              duration: 0.3,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>

      {/* Loading bar */}
      <div className="w-48 overflow-hidden rounded-full bg-muted/30">
        <motion.div
          className="h-0.5 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.75 0.18 220), oklch(0.55 0.25 290))",
            boxShadow: "0 0 16px oklch(0.75 0.18 220 / 0.6)",
          }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.3, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
          onAnimationComplete={onComplete}
        />
      </div>

      {/* Subtle "Loading" text */}
      <motion.p
        className="mt-3 text-[10px] tracking-[0.5em] text-muted-foreground/40 uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0.3] }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        Loading
      </motion.p>
    </motion.div>
  )
}
