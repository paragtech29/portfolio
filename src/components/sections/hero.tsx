"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, Sparkles, Download, Eye } from "lucide-react"
import { resumeData } from "@/data/resume"
import { useTextScramble } from "@/hooks/use-text-scramble"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { SplitText } from "@/components/ui/split-text"
import { GlowOrb } from "@/components/ui/floating-elements"
import { useRef } from "react"

interface HeroProps {
  animate: boolean
}

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.2 },
  },
}

const customEase = [0.25, 0.4, 0.25, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: customEase },
  },
}

const fadeIn = {
  hidden: { opacity: 0, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: customEase },
  },
}

export function Hero({ animate }: HeroProps) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95])

  const { displayText: roleText } = useTextScramble(
    "Frontend Developer · Team Lead · AI Enthusiast",
    { trigger: animate, delay: 800, duration: 1200 }
  )

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Decorative glow orbs */}
      <GlowOrb className="-left-32 top-1/4" color="primary" size={500} blur={100} />
      <GlowOrb className="-right-32 top-1/3" color="accent" size={400} blur={100} delay={2} />
      <GlowOrb className="left-1/3 bottom-1/4" color="cyan" size={350} blur={90} delay={4} />

      <motion.div
        className="flex flex-col items-center gap-6 text-center relative z-10"
        variants={stagger}
        initial="hidden"
        animate={animate ? "visible" : "hidden"}
        style={{ y, opacity, scale }}
      >
        {/* Badge with pulse */}
        <motion.div
          variants={fadeUp}
          className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm text-muted-foreground"
        >
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Sparkles className="h-4 w-4 text-primary" />
          </motion.div>
          <span>Available for opportunities</span>
          <motion.div
            className="h-2 w-2 rounded-full bg-emerald-500"
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.div>

        {/* Name with split text animation */}
        <motion.h1
          variants={fadeUp}
          className="text-5xl font-bold tracking-tight sm:text-7xl md:text-8xl lg:text-9xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="gradient-text inline-block">
            <SplitText
              text={resumeData.basics.name.split(" ")[0]}
              animate={animate}
              delay={0.3}
              splitBy="char"
              staggerDelay={0.05}
            />
          </span>
          <br />
          <span className="text-foreground inline-block">
            <SplitText
              text={resumeData.basics.name.split(" ")[1]}
              animate={animate}
              delay={0.6}
              splitBy="char"
              staggerDelay={0.05}
            />
          </span>
        </motion.h1>

        {/* Role with scramble effect */}
        <motion.p
          variants={fadeIn}
          className="text-lg text-muted-foreground sm:text-xl font-mono tracking-wide"
        >
          {animate ? roleText : ""}
        </motion.p>

        {/* Summary Card with gradient border on hover */}
        <motion.div variants={fadeUp} className="glass-card mt-2 max-w-xl p-6 group relative overflow-hidden">
          {/* Animated gradient border on hover */}
          <div className="absolute inset-0 rounded-[var(--radius)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "linear-gradient(135deg, oklch(0.75 0.18 220 / 0.2), oklch(0.55 0.25 290 / 0.2))",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "xor",
              WebkitMaskComposite: "xor",
              padding: "1px",
            }}
          />
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base relative z-10">
            {resumeData.summary.split(".").slice(0, 2).join(".") + "."}
          </p>
        </motion.div>

        {/* CTAs with magnetic effect */}
        <motion.div variants={fadeUp} className="mt-4 flex flex-wrap justify-center gap-4">
          <MagneticButton
            href="#experience"
            className="group flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_oklch(0.75_0.18_220_/_0.5)]"
            strength={0.25}
          >
            <Eye className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            View Experience
          </MagneticButton>
          <MagneticButton
            href="/Parag_Baldaniya_Resume.pdf"
            download
            className="glass group flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:shadow-[0_0_20px_oklch(0.75_0.18_220_/_0.2)]"
            strength={0.25}
          >
            <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            Download Resume
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator with enhanced animation */}
      <motion.div
        className="absolute bottom-8 z-10"
        initial={{ opacity: 0 }}
        animate={animate ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.a
          href="#experience"
          className="flex flex-col items-center gap-2"
        >
          <motion.span
            className="text-xs tracking-widest text-muted-foreground/60 uppercase"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            Scroll
          </motion.span>
          <motion.div className="relative">
            <motion.div
              className="h-8 w-5 rounded-full border border-muted-foreground/30"
            >
              <motion.div
                className="mx-auto mt-1.5 h-1.5 w-1 rounded-full bg-primary"
                animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.a>
      </motion.div>
    </section>
  )
}
