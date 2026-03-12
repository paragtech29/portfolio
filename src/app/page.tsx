"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { AnimatedBackground } from "@/components/animated-background"
import { SplashScreen } from "@/components/splash-screen"
import { Navbar } from "@/components/navbar"
import { CustomCursor } from "@/components/custom-cursor"
import { NoiseOverlay } from "@/components/noise-overlay"
import { SmoothScroll } from "@/components/smooth-scroll"
import { Hero } from "@/components/sections/hero"
import { Experience } from "@/components/sections/experience"
import { Achievements } from "@/components/sections/achievements"
import { Projects } from "@/components/sections/projects"
import { Skills } from "@/components/sections/skills"
import { Education } from "@/components/sections/education"
import { Contact } from "@/components/sections/contact"

export default function Home() {
  const [splashComplete, setSplashComplete] = useState(false)

  return (
    <SmoothScroll>
      <div className="relative min-h-screen">
        {/* Custom Cursor */}
        <CustomCursor />

        {/* Noise Overlay for premium feel */}
        <NoiseOverlay />

        {/* Animated Background */}
        <AnimatedBackground />


        {/* Splash Screen */}
        <AnimatePresence mode="wait">
          {!splashComplete && (
            <SplashScreen onComplete={() => setSplashComplete(true)} />
          )}
        </AnimatePresence>

        {/* Navbar (appears after splash) */}
        <Navbar visible={splashComplete} />

        {/* Main Content */}
        <Hero animate={splashComplete} />
        <Experience />
        <Achievements />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </div>
    </SmoothScroll>
  )
}
