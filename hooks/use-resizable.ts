import { useState, useCallback, useEffect, type RefObject } from "react"

interface Size {
  width: number
  height: number
}

interface UseResizableProps {
  ref: RefObject<HTMLElement | null>
  minSize?: Size
  maxSize?: Size
  onSizeChange?: (size: Size) => void
}

const DEFAULT_MIN: Size = { width: 320, height: 200 }
const DEFAULT_MAX: Size = { width: 800, height: 600 }

type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw"

export function useResizable({ 
  ref, 
  minSize = DEFAULT_MIN, 
  maxSize = DEFAULT_MAX,
  onSizeChange 
}: UseResizableProps) {
  const [size, setSize] = useState<Size>({ width: 420, height: 360 })
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState<ResizeDirection | null>(null)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const [startSize, setStartSize] = useState<Size>({ width: 0, height: 0 })

  const handleResizeStart = useCallback((e: React.MouseEvent, direction: ResizeDirection) => {
    e.preventDefault()
    e.stopPropagation()
    
    setIsResizing(true)
    setResizeDirection(direction)
    setStartPos({ x: e.clientX, y: e.clientY })
    setStartSize({ ...size })
  }, [size])

  useEffect(() => {
    if (!isResizing || !resizeDirection) return

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault()
      
      const deltaX = e.clientX - startPos.x
      const deltaY = e.clientY - startPos.y

      let newWidth = startSize.width
      let newHeight = startSize.height

      // Handle horizontal resizing
      if (resizeDirection.includes("e")) {
        newWidth = startSize.width + deltaX
      }
      if (resizeDirection.includes("w")) {
        newWidth = startSize.width - deltaX
      }

      // Handle vertical resizing
      if (resizeDirection.includes("s")) {
        newHeight = startSize.height + deltaY
      }
      if (resizeDirection.includes("n")) {
        newHeight = startSize.height - deltaY
      }

      // Get viewport constraints
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const padding = 24 // Minimum padding from edges

      // Get element position
      const rect = ref.current?.getBoundingClientRect()
      const elementLeft = rect?.left ?? 0
      const elementTop = rect?.top ?? 0

      // Calculate max size based on position and viewport
      const maxWidthFromPosition = viewportWidth - elementLeft - padding
      const maxHeightFromPosition = viewportHeight - elementTop - padding

      // Apply constraints
      const effectiveMaxWidth = Math.min(maxSize.width, maxWidthFromPosition)
      const effectiveMaxHeight = Math.min(maxSize.height, maxHeightFromPosition)

      newWidth = Math.max(minSize.width, Math.min(newWidth, effectiveMaxWidth))
      newHeight = Math.max(minSize.height, Math.min(newHeight, effectiveMaxHeight))

      const newSize = { width: newWidth, height: newHeight }
      setSize(newSize)
      onSizeChange?.(newSize)
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      setResizeDirection(null)
    }

    // Set cursor based on direction
    const getCursor = (dir: ResizeDirection): string => {
      switch (dir) {
        case "n":
        case "s":
          return "ns-resize"
        case "e":
        case "w":
          return "ew-resize"
        case "ne":
        case "sw":
          return "nesw-resize"
        case "nw":
        case "se":
          return "nwse-resize"
        default:
          return "default"
      }
    }

    document.body.style.cursor = getCursor(resizeDirection)
    document.body.style.userSelect = "none"

    document.addEventListener("mousemove", handleMouseMove, { passive: false })
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isResizing, resizeDirection, startPos, startSize, minSize, maxSize, onSizeChange, ref])

  return {
    size,
    setSize,
    isResizing,
    handleResizeStart,
  }
}