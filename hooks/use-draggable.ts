import { useState, useCallback, useEffect, type RefObject } from "react"
import type { TerminalPosition } from "@/types/terminal"

interface UseDraggableProps {
  ref: RefObject<HTMLElement | null>
  position: TerminalPosition
  onPositionChange: (pos: TerminalPosition) => void
  disabled?: boolean
}

export function useDraggable({ ref, position, onPositionChange, disabled }: UseDraggableProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (disabled) return
    e.preventDefault()
    e.stopPropagation()
    
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return

    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
    setIsDragging(true)
  }, [disabled, ref])

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault()
      
      const newX = e.clientX - dragOffset.x
      const newY = e.clientY - dragOffset.y
      
      const maxX = window.innerWidth - (ref.current?.offsetWidth || 0)
      const maxY = window.innerHeight - (ref.current?.offsetHeight || 0)

      onPositionChange({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    document.body.style.cursor = "grabbing"
    document.body.style.userSelect = "none"

    document.addEventListener("mousemove", handleMouseMove, { passive: false })
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, dragOffset, onPositionChange, ref])

  return {
    isDragging,
    handleMouseDown,
  }
}