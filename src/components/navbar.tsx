"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
]

interface NavbarProps {
  visible: boolean
}

export function Navbar({ visible }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1))
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id)
            }
          })
        },
        { rootMargin: "-40% 0px -55% 0px" }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false)
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault()
      const el = document.querySelector(href)
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
      }
      setMobileOpen(false)
    },
    []
  )

  if (!visible) return null

  return (
    <>
      <motion.nav
        className={`fixed left-0 right-0 top-0.5 z-40 transition-all duration-500 ${
          scrolled
            ? "glass border-b border-border/30"
            : "bg-transparent"
        }`}
        initial={{ opacity: 0, y: -30, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="gradient-text text-lg font-bold"
            style={{ fontFamily: "var(--font-display)" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            PB
          </motion.a>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative rounded-full px-3 py-1.5 text-sm transition-colors duration-200 ${
                  activeSection === link.href.slice(1)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                whileHover={{ y: -1 }}
              >
                {activeSection === link.href.slice(1) && (
                  <motion.div
                    layoutId="navActive"
                    className="absolute inset-0 rounded-full bg-primary/10"
                    style={{
                      boxShadow: "0 0 10px oklch(0.75 0.18 220 / 0.1)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </motion.a>
            ))}
          </div>

          {/* Right side: burger */}
          <div className="flex items-center gap-2">
            <motion.button
              className="glass rounded-full p-2.5 md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5 text-foreground" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5 text-foreground" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-6 bg-background/95 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-xl font-medium transition-colors ${
                  activeSection === link.href.slice(1)
                    ? "gradient-text"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={{ fontFamily: "var(--font-display)" }}
                initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -15 }}
                transition={{
                  delay: 0.05 * index,
                  duration: 0.4,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
