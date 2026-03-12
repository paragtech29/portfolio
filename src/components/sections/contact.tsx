"use client"

import { useRef, useState, useCallback } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Mail, Phone, MapPin, ArrowUpRight, Copy, Check, Send } from "lucide-react"
import { resumeData } from "@/data/resume"
import { MagneticButton } from "@/components/ui/magnetic-button"

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/parag-baldaniya-b67973210/",
    icon: () => (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    color: "oklch(0.60 0.15 250)",
  },
  {
    label: "GitHub",
    href: "https://github.com/paragbaldaniya",
    icon: () => (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    color: "oklch(0.75 0.02 260)",
  },
]

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  })
  const backgroundY = useTransform(scrollYProgress, [0, 1], [60, -20])

  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleCopy = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(label)
    setTimeout(() => setCopiedField(null), 2000)
  }, [])

  return (
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden px-6 pb-12 pt-14 sm:pt-20"
      ref={sectionRef}
    >
      {/* Background glow orbs */}
      <motion.div
        className="pointer-events-none absolute left-1/4 top-1/3 h-[400px] w-[400px] rounded-full opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, oklch(0.75 0.18 220), transparent 70%)",
          filter: "blur(80px)",
          y: backgroundY,
        }}
      />
      <motion.div
        className="pointer-events-none absolute right-1/4 top-1/2 h-[300px] w-[300px] rounded-full opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, oklch(0.55 0.25 290), transparent 70%)",
          filter: "blur(80px)",
          y: backgroundY,
        }}
      />

      <div className="relative mx-auto max-w-4xl" ref={ref}>
        {/* Big headline instead of generic SectionHeader */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const }}
        >
          {/* Decorative line */}
          <motion.div
            className="mx-auto mb-5 h-px w-12"
            style={{
              background: "linear-gradient(90deg, transparent, oklch(0.75 0.18 220), transparent)",
            }}
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: 48, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          />

          <h2
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {"Let's Build".split("").map((char, i) => (
              <motion.span
                key={`a-${i}`}
                className="inline-block text-foreground"
                initial={{ opacity: 0, y: 30, rotateX: 90 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : undefined}
                transition={{
                  delay: 0.3 + i * 0.03,
                  duration: 0.5,
                  ease: [0.25, 0.4, 0.25, 1] as const,
                }}
                style={{ perspective: "500px" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            <br />
            {"Something Great".split("").map((char, i) => (
              <motion.span
                key={`b-${i}`}
                className="inline-block gradient-text"
                initial={{ opacity: 0, y: 30, rotateX: 90 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : undefined}
                transition={{
                  delay: 0.5 + i * 0.03,
                  duration: 0.5,
                  ease: [0.25, 0.4, 0.25, 1] as const,
                }}
                style={{ perspective: "500px" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h2>

          <motion.p
            className="mx-auto mt-5 max-w-md text-sm text-muted-foreground sm:text-base"
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ delay: 1, duration: 0.5 }}
          >
            Got a project in mind? Let&apos;s talk about how we can work together.
          </motion.p>
        </motion.div>

        {/* Main CTA */}
        <motion.div
          className="mb-12 flex justify-center"
          initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6, delay: 1.1, ease: [0.25, 0.4, 0.25, 1] as const }}
        >
          <MagneticButton
            href={`mailto:${resumeData.basics.email}`}
            className="group relative flex items-center gap-3 rounded-full bg-primary px-10 py-5 text-base font-semibold text-primary-foreground transition-all duration-500 hover:shadow-[0_0_60px_oklch(0.75_0.18_220_/_0.5)]"
            strength={0.15}
          >
            {/* Animated ring around button */}
            <motion.span
              className="absolute -inset-1 rounded-full"
              style={{
                border: "1px solid oklch(0.75 0.18 220 / 0.3)",
              }}
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <Send className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            Send Me a Message
            <ArrowUpRight className="h-4 w-4 opacity-50 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>
        </motion.div>

        {/* Contact cards - redesigned as interactive tiles */}
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Email card - copyable */}
          <ContactTile
            icon={Mail}
            label="Email"
            value={resumeData.basics.email}
            href={`mailto:${resumeData.basics.email}`}
            color="oklch(0.75 0.18 220)"
            index={0}
            isInView={isInView}
            copyable
            copied={copiedField === "Email"}
            onCopy={() => handleCopy(resumeData.basics.email, "Email")}
          />

          {/* Phone card - copyable */}
          <ContactTile
            icon={Phone}
            label="Phone"
            value={resumeData.basics.phone}
            href={`tel:${resumeData.basics.phone.replace(/[^+\d]/g, "")}`}
            color="oklch(0.70 0.20 170)"
            index={1}
            isInView={isInView}
            copyable
            copied={copiedField === "Phone"}
            onCopy={() => handleCopy(resumeData.basics.phone, "Phone")}
          />

          {/* Location card */}
          <ContactTile
            icon={MapPin}
            label="Location"
            value={resumeData.basics.location}
            color="oklch(0.55 0.25 290)"
            index={2}
            isInView={isInView}
          />
        </div>

        {/* Social links */}
        <motion.div
          className="mt-8 flex justify-center gap-4"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          {socialLinks.map((social, i) => {
            const IconComp = social.icon
            return (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card group relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground"
                whileHover={{
                  y: -2,
                  boxShadow: `0 0 20px ${social.color.replace(")", " / 0.15)")}`,
                }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.6 + i * 0.1, duration: 0.4 }}
              >
                <motion.span
                  className="transition-colors duration-300"
                  style={{ color: social.color }}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                >
                  <IconComp />
                </motion.span>
                {social.label}
                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-60 group-hover:translate-x-0" />
              </motion.a>
            )
          })}
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="mt-20 border-t border-border/20 pt-8 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.8, duration: 0.5 }}
        >
          <p className="text-xs text-muted-foreground/40">
            Crafted with Next.js, TailwindCSS & Framer Motion
          </p>
          <p className="mt-1 text-xs text-muted-foreground/30">
            &copy; {new Date().getFullYear()} {resumeData.basics.name}
          </p>
        </motion.footer>
      </div>
    </section>
  )
}

// Interactive contact tile with 3D tilt, spotlight, and copy
function ContactTile({
  icon: Icon,
  label,
  value,
  href,
  color,
  index,
  isInView,
  copyable,
  copied,
  onCopy,
}: {
  icon: React.ElementType
  label: string
  value: string
  href?: string
  color: string
  index: number
  isInView: boolean
  copyable?: boolean
  copied?: boolean
  onCopy?: () => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setTilt({
      rotateX: ((y - rect.height / 2) / (rect.height / 2)) * -5,
      rotateY: ((x - rect.width / 2) / (rect.width / 2)) * 5,
    })
    setMousePos({ x, y })
  }, [])

  const Wrapper = href ? "a" : "div"
  const wrapperProps = href
    ? { href, target: "_blank" as const, rel: "noopener noreferrer" }
    : {}

  return (
    <motion.div
      ref={cardRef}
      className="group"
      style={{ perspective: "800px" }}
      initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{
        duration: 0.6,
        delay: 1.2 + 0.1 * index,
        ease: [0.25, 0.4, 0.25, 1] as const,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setTilt({ rotateX: 0, rotateY: 0 })
      }}
    >
      <motion.div
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
        transition={{ duration: 0.15, ease: "linear" }}
      >
        <Wrapper
          {...wrapperProps}
          className="glass-card relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl p-6 text-center transition-all duration-300"
        >
          {/* Cursor spotlight */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, ${color.replace(")", " / 0.1)")}, transparent 50%)`,
            }}
          />

          {/* Animated top line */}
          <motion.div
            className="absolute left-0 right-0 top-0 h-[2px]"
            style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ delay: 1.4 + 0.1 * index, duration: 0.5 }}
          />

          <div className="relative">
            {/* Icon with animated ring */}
            <motion.div
              className="relative mb-1 rounded-xl p-3"
              style={{ background: `${color.replace(")", " / 0.1)")}` }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Icon className="h-5 w-5" style={{ color }} />
              {/* Pulse ring */}
              <motion.div
                className="absolute inset-0 rounded-xl"
                style={{ border: `1px solid ${color.replace(")", " / 0.2)")}` }}
                animate={isHovered ? {
                  scale: [1, 1.4, 1],
                  opacity: [0.3, 0, 0.3],
                } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </div>

          <div className="relative">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/50">
              {label}
            </p>
            <p className="mt-1.5 text-sm font-medium text-foreground">
              {value}
            </p>
          </div>

          {/* Copy button */}
          {copyable && onCopy && (
            <motion.button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onCopy()
              }}
              className="relative mt-1 flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium text-muted-foreground/60 transition-all duration-300 hover:text-foreground"
              style={{
                background: "var(--muted)",
                border: "1px solid var(--border)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  Copy
                </>
              )}
            </motion.button>
          )}
        </Wrapper>
      </motion.div>
    </motion.div>
  )
}
