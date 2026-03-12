"use client"

import { useEffect, useRef, useCallback } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  originalOpacity: number
}

interface GradientBlob {
  x: number
  y: number
  radius: number
  color: string
  phase: number
  speed: number
}

function getParticleCount(width: number): number {
  if (width < 768) return 25
  if (width < 1024) return 50
  return 80
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const blobsRef = useRef<GradientBlob[]>([])
  const reducedMotionRef = useRef(false)
  const isDarkRef = useRef(true)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  const initParticles = useCallback((width: number, height: number) => {
    const count = getParticleCount(width)
    const particles: Particle[] = []
    for (let i = 0; i < count; i++) {
      const opacity = Math.random() * 0.3 + 0.15
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
        opacity,
        originalOpacity: opacity,
      })
    }
    particlesRef.current = particles
  }, [])

  const initBlobs = useCallback((width: number, height: number) => {
    blobsRef.current = [
      {
        x: width * 0.3,
        y: height * 0.3,
        radius: Math.max(width, height) * 0.25,
        color: "rgba(0, 150, 255, 0.06)",
        phase: 0,
        speed: 0.0003,
      },
      {
        x: width * 0.7,
        y: height * 0.6,
        radius: Math.max(width, height) * 0.3,
        color: "rgba(120, 60, 230, 0.05)",
        phase: Math.PI * 0.7,
        speed: 0.0004,
      },
      {
        x: width * 0.5,
        y: height * 0.8,
        radius: Math.max(width, height) * 0.2,
        color: "rgba(0, 200, 220, 0.04)",
        phase: Math.PI * 1.3,
        speed: 0.00035,
      },
    ]
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    reducedMotionRef.current = motionQuery.matches
    const handleMotionChange = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches
    }
    motionQuery.addEventListener("change", handleMotionChange)

    const checkTheme = () => {
      isDarkRef.current = !document.documentElement.classList.contains("light")
    }
    checkTheme()

    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    // Mouse tracking for particle interaction
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mouseleave", handleMouseLeave)

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initParticles(w, h)
      initBlobs(w, h)
    }

    resize()

    let resizeTimeout: ReturnType<typeof setTimeout>
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resize, 150)
    }
    window.addEventListener("resize", handleResize)

    const CONNECTION_DIST = 130
    const CONNECTION_DIST_SQ = CONNECTION_DIST * CONNECTION_DIST
    const MOUSE_RADIUS = 150
    const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS
    let time = 0

    const drawBlobs = (w: number, h: number) => {
      for (const blob of blobsRef.current) {
        const offsetX = Math.sin(time * blob.speed * 1000 + blob.phase) * 50
        const offsetY = Math.cos(time * blob.speed * 800 + blob.phase) * 40

        const gradient = ctx.createRadialGradient(
          blob.x + offsetX,
          blob.y + offsetY,
          0,
          blob.x + offsetX,
          blob.y + offsetY,
          blob.radius
        )

        if (isDarkRef.current) {
          gradient.addColorStop(0, blob.color)
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
        } else {
          gradient.addColorStop(0, blob.color.replace(/[\d.]+\)$/, "0.08)"))
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)")
        }

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, w, h)
      }
    }

    const drawParticles = (w: number, h: number) => {
      const particles = particlesRef.current
      const mouse = mouseRef.current
      const particleColor = isDarkRef.current
        ? "rgba(180, 210, 255,"
        : "rgba(40, 60, 120,"
      const mouseLineColor = isDarkRef.current
        ? "rgba(120, 180, 255,"
        : "rgba(60, 100, 200,"

      for (const p of particles) {
        // Mouse interaction - particles get attracted/repelled
        const dmx = p.x - mouse.x
        const dmy = p.y - mouse.y
        const distToMouseSq = dmx * dmx + dmy * dmy

        if (distToMouseSq < MOUSE_RADIUS_SQ && distToMouseSq > 0) {
          const distToMouse = Math.sqrt(distToMouseSq)
          const force = (1 - distToMouse / MOUSE_RADIUS) * 0.02
          // Gentle attraction toward mouse
          p.vx -= (dmx / distToMouse) * force
          p.vy -= (dmy / distToMouse) * force
          // Increase opacity near mouse
          p.opacity = Math.min(p.originalOpacity + 0.3 * (1 - distToMouse / MOUSE_RADIUS), 0.7)
        } else {
          // Decay back to original opacity
          p.opacity += (p.originalOpacity - p.opacity) * 0.02
        }

        // Apply velocity with damping
        p.vx *= 0.99
        p.vy *= 0.99
        p.x += p.vx
        p.y += p.vy

        // Wrap around
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0
      }

      // Draw connecting lines
      if (w >= 768) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const distSq = dx * dx + dy * dy

            if (distSq < CONNECTION_DIST_SQ) {
              const dist = Math.sqrt(distSq)
              const alpha = (1 - dist / CONNECTION_DIST) * 0.15
              ctx.beginPath()
              ctx.moveTo(particles[i].x, particles[i].y)
              ctx.lineTo(particles[j].x, particles[j].y)
              ctx.strokeStyle = `${particleColor} ${alpha})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }

          // Draw lines from particles to mouse if close enough
          const dmx = particles[i].x - mouse.x
          const dmy = particles[i].y - mouse.y
          const distToMouseSq = dmx * dmx + dmy * dmy
          if (distToMouseSq < MOUSE_RADIUS_SQ) {
            const dist = Math.sqrt(distToMouseSq)
            const alpha = (1 - dist / MOUSE_RADIUS) * 0.25
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `${mouseLineColor} ${alpha})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `${particleColor} ${p.opacity})`
        ctx.fill()
      }

      // Draw mouse glow
      if (mouse.x > 0 && mouse.y > 0) {
        const gradient = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, MOUSE_RADIUS
        )
        if (isDarkRef.current) {
          gradient.addColorStop(0, "rgba(120, 180, 255, 0.03)")
          gradient.addColorStop(1, "rgba(120, 180, 255, 0)")
        } else {
          gradient.addColorStop(0, "rgba(60, 100, 200, 0.04)")
          gradient.addColorStop(1, "rgba(60, 100, 200, 0)")
        }
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, w, h)
      }
    }

    const animate = (timestamp: number) => {
      if (document.hidden) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      time = timestamp
      const w = window.innerWidth
      const h = window.innerHeight

      ctx.clearRect(0, 0, w, h)
      drawBlobs(w, h)

      if (!reducedMotionRef.current) {
        drawParticles(w, h)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    if (reducedMotionRef.current) {
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)
      drawBlobs(w, h)
    } else {
      animationRef.current = requestAnimationFrame(animate)
    }

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      clearTimeout(resizeTimeout)
      motionQuery.removeEventListener("change", handleMotionChange)
      observer.disconnect()
    }
  }, [initParticles, initBlobs])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  )
}
