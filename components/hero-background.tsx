"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import gsap from "gsap"

type BlobConfig = {
  x: number
  y: number
  size: number
  opacity: number
}

type PageConfig = {
  hero: BlobConfig
  blob1: BlobConfig
  blob2: BlobConfig
  blob3: BlobConfig
}

const configs: Record<string, PageConfig> = {
  "/": {
    hero: { x: 50, y: 70, size: 500, opacity: 0.25 },
    blob1: { x: 18, y: 28, size: 380, opacity: 0.14 },
    blob2: { x: 82, y: 22, size: 300, opacity: 0.12 },
    blob3: { x: 72, y: 62, size: 250, opacity: 0.1 },
  },
  "/test1": {
    hero: { x: 80, y: 30, size: 400, opacity: 0.2 },
    blob1: { x: 15, y: 60, size: 350, opacity: 0.12 },
    blob2: { x: 40, y: 20, size: 280, opacity: 0.1 },
    blob3: { x: 60, y: 75, size: 220, opacity: 0.08 },
  },
  "/test2": {
    hero: { x: 20, y: 40, size: 450, opacity: 0.22 },
    blob1: { x: 75, y: 55, size: 320, opacity: 0.1 },
    blob2: { x: 55, y: 25, size: 260, opacity: 0.08 },
    blob3: { x: 30, y: 70, size: 200, opacity: 0.06 },
  },
  "/showcase": {
    hero: { x: 30, y: 50, size: 350, opacity: 0.18 },
    blob1: { x: 78, y: 28, size: 280, opacity: 0.1 },
    blob2: { x: 58, y: 58, size: 240, opacity: 0.08 },
    blob3: { x: 32, y: 72, size: 200, opacity: 0.06 },
  },
  default: {
    hero: { x: 40, y: 45, size: 300, opacity: 0.15 },
    blob1: { x: 75, y: 30, size: 260, opacity: 0.08 },
    blob2: { x: 55, y: 60, size: 220, opacity: 0.06 },
    blob3: { x: 28, y: 72, size: 180, opacity: 0.05 },
  },
}

const STORAGE_KEY = "blob-positions"

function getStoredPositions(): PageConfig | null {
  if (typeof window === "undefined") return null
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

function storePositions(config: PageConfig) {
  if (typeof window === "undefined") return
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(config))
  } catch {
    // ignore
  }
}

function getPixelPos(percent: number, viewport: number, size: number) {
  return (viewport * percent) / 100 - size / 2
}

export function HeroBackground() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  
  const heroRef = useRef<HTMLDivElement>(null)
  const blob1Ref = useRef<HTMLDivElement>(null)
  const blob2Ref = useRef<HTMLDivElement>(null)
  const blob3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const vw = window.innerWidth
    const vh = window.innerHeight
    const target = configs[pathname] || configs.default
    const previous = getStoredPositions()

    const blobs = [
      { ref: heroRef, key: "hero" as const },
      { ref: blob1Ref, key: "blob1" as const },
      { ref: blob2Ref, key: "blob2" as const },
      { ref: blob3Ref, key: "blob3" as const },
    ]

    blobs.forEach(({ ref, key }) => {
      if (!ref.current) return

      const t = target[key]
      const p = previous?.[key]

      // Set initial position from previous state (or target if no previous)
      if (p) {
        gsap.set(ref.current, {
          x: getPixelPos(p.x, vw, p.size),
          y: getPixelPos(p.y, vh, p.size),
          width: p.size,
          height: p.size,
          opacity: p.opacity,
        })
      }

      // Animate to target
      gsap.to(ref.current, {
        x: getPixelPos(t.x, vw, t.size),
        y: getPixelPos(t.y, vh, t.size),
        width: t.size,
        height: t.size,
        opacity: t.opacity,
        duration: previous ? 1.2 : 0,
        ease: "power3.inOut",
      })
    })

    // Store current positions for next navigation
    storePositions(target)
  }, [pathname, mounted])

  // Floating animation
  useEffect(() => {
    if (!mounted) return

    const blobs = [heroRef, blob1Ref, blob2Ref, blob3Ref]
    const tweens: gsap.core.Tween[] = []

    blobs.forEach((ref, i) => {
      if (!ref.current) return
      tweens.push(
        gsap.to(ref.current, {
          x: `+=${gsap.utils.random(-20, 20)}`,
          y: `+=${gsap.utils.random(-20, 20)}`,
          duration: 6 + i * 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        })
      )
    })

    return () => tweens.forEach((t) => t.kill())
  }, [mounted])

  // Mouse tracking for blob2
  useEffect(() => {
    if (!mounted) return

    const onMove = (e: MouseEvent) => {
      if (!blob2Ref.current) return
      const x = (e.clientX / window.innerWidth - 0.5) * 50
      const y = (e.clientY / window.innerHeight - 0.5) * 50
      gsap.to(blob2Ref.current, {
        x: `+=${x * 0.1}`,
        y: `+=${y * 0.1}`,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      })
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [mounted])

  const isHome = pathname === "/"

  // Scroll fade for homepage
  useEffect(() => {
    if (!mounted || !isHome) return

    const config = configs["/"]
    const onScroll = () => {
      if (!heroRef.current) return
      const fade = Math.max(0, 1 - window.scrollY / 500)
      heroRef.current.style.opacity = String(config.hero.opacity * fade)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [mounted, isHome])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      <div
        className="absolute inset-0 grid-pattern opacity-30"
        style={{
          maskImage: "linear-gradient(to bottom, black 0%, black 50%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 50%, transparent 100%)",
        }}
      />

      <div
        ref={heroRef}
        className="absolute rounded-full blur-[100px] bg-primary will-change-transform"
      />

      <div
        ref={blob1Ref}
        className="absolute rounded-full blur-[80px] bg-copper will-change-transform"
      />

      <div
        ref={blob2Ref}
        className="absolute rounded-full blur-[80px] bg-primary/80 will-change-transform"
      />

      <div
        ref={blob3Ref}
        className="absolute rounded-full blur-[60px] bg-silver will-change-transform"
      />

      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}