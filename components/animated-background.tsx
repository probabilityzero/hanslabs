"use client"

import { ReactNode } from "react"

interface AnimatedBackgroundProps {
  children?: ReactNode
  variant?: "subtle" | "default" | "intense"
  showGrid?: boolean
  className?: string
  as?: "div" | "section" | "main"
}

export function AnimatedBackground({
  children,
  variant = "default",
  showGrid = true,
  className = "",
  as: Component = "section",
}: AnimatedBackgroundProps) {
  const config = {
    subtle: { size: 600, opacity: "opacity-[0.03]" },
    default: { size: 800, opacity: "opacity-[0.05]" },
    intense: { size: 1000, opacity: "opacity-[0.08]" },
  }[variant]

  return (
    <Component className={`relative overflow-hidden ${className}`}>
      {showGrid && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 grid-pattern opacity-10" />
          {/* Fade edges */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />
        </div>
      )}
      
      <div
        className={`absolute top-0 right-0 bg-primary rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 animate-gradient-shift-1 pointer-events-none ${config.opacity}`}
        style={{ width: config.size, height: config.size }}
      />
      <div
        className={`absolute bottom-0 left-0 bg-primary rounded-full blur-3xl translate-y-1/4 -translate-x-1/4 animate-gradient-shift-2 pointer-events-none ${config.opacity}`}
        style={{ width: config.size * 0.75, height: config.size * 0.75 }}
      />
      <div
        className={`absolute top-1/2 left-1/2 bg-primary rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-gradient-shift-3 pointer-events-none ${config.opacity}`}
        style={{ width: config.size * 0.5, height: config.size * 0.5 }}
      />

      <div className="relative z-10">{children}</div>
    </Component>
  )
}