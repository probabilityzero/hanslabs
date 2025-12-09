"use client"

import { ReactNode } from "react"

interface AnimatedProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

export function FadeUp({ children, delay = 0, duration = 400, className = "" }: AnimatedProps) {
  return (
    <div
      className={`animate-fade-up ${className}`}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
        animationFillMode: "backwards",
      }}
    >
      {children}
    </div>
  )
}

export function FadeIn({ children, delay = 0, duration = 400, className = "" }: AnimatedProps) {
  return (
    <div
      className={`animate-fade-in ${className}`}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
        animationFillMode: "backwards",
      }}
    >
      {children}
    </div>
  )
}

export function SlideIn({ children, delay = 0, duration = 400, className = "" }: AnimatedProps) {
  return (
    <div
      className={`animate-slide-in ${className}`}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
        animationFillMode: "backwards",
      }}
    >
      {children}
    </div>
  )
}

export function ScaleIn({ children, delay = 0, duration = 400, className = "" }: AnimatedProps) {
  return (
    <div
      className={`animate-scale-in ${className}`}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
        animationFillMode: "backwards",
      }}
    >
      {children}
    </div>
  )
}

export function SlideDown({ children, delay = 0, duration = 400, className = "" }: AnimatedProps) {
  return (
    <div
      className={`animate-slide-down ${className}`}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
        animationFillMode: "forwards",
      }}
    >
      {children}
    </div>
  )
}

interface StaggerProps {
  children: ReactNode[]
  baseDelay?: number
  staggerDelay?: number
  duration?: number
  animation?: "fade-up" | "fade-in" | "slide-in" | "scale-in" | "slide-down"
  className?: string
  childClassName?: string
}

export function Stagger({
  children,
  baseDelay = 0,
  staggerDelay = 50,
  duration = 400,
  animation = "fade-up",
  className = "",
  childClassName = "",
}: StaggerProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className={`animate-${animation} ${childClassName}`}
          style={{
            animationDelay: `${baseDelay + index * staggerDelay}ms`,
            animationDuration: `${duration}ms`,
            animationFillMode: "backwards",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}