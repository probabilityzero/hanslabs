"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { Minus, X } from "lucide-react"
import Image from "next/image"
import { useTerminal } from "./terminal-provider"
import { useDraggable } from "@/hooks/use-draggable"
import { useResizable } from "@/hooks/use-resizable"
import { useClickOutside } from "@/hooks/use-click-outside"
import { TerminalContent } from "./terminal-content"

export function TerminalWidget() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  
  const { state, position, user, setPosition, expand, collapse, minimize } = useTerminal()

  const { isDragging, handleMouseDown } = useDraggable({
    ref: containerRef,
    position,
    onPositionChange: setPosition,
    disabled: state === "dot",
  })

  const { size, setSize, isResizing, handleResizeStart } = useResizable({
    ref: containerRef,
    minSize: { width: 320, height: 200 },
    maxSize: { width: 800, height: 600 },
  })

  const handleClickOutside = useCallback(() => {
    if (state === "expanded") collapse()
  }, [state, collapse])

  useClickOutside(containerRef, handleClickOutside, state !== "dot")

  useEffect(() => {
    if (!mounted || state === "dot") return

    const constrainToViewport = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const w = state === "expanded" ? size.width : 280
      const h = state === "expanded" ? size.height : 60

      if (position.x === -1 || position.y === -1) return

      let newPos = { ...position }
      let newSize = { ...size }
      let update = false

      if (position.x + w > vw) { newPos.x = Math.max(0, vw - w); update = true }
      if (position.x < 0) { newPos.x = 0; update = true }
      if (position.y + h > vh) { newPos.y = Math.max(0, vh - h); update = true }
      if (position.y < 0) { newPos.y = 0; update = true }

      if (state === "expanded") {
        if (size.width > vw - position.x && position.x !== -1) { newSize.width = Math.max(320, vw - position.x); update = true }
        if (size.height > vh - position.y && position.y !== -1) { newSize.height = Math.max(200, vh - position.y); update = true }
      }

      if (update) {
        if (newPos.x !== position.x || newPos.y !== position.y) setPosition(newPos)
        if (newSize.width !== size.width || newSize.height !== size.height) setSize(newSize)
      }
    }

    constrainToViewport()
    window.addEventListener("resize", constrainToViewport)
    return () => window.removeEventListener("resize", constrainToViewport)
  }, [mounted, state, position, size, setPosition, setSize])

  const getSafePosition = useCallback(() => {
    const vh = window.innerHeight
    const margin = 24
    if (size.height + margin > vh) return { top: 24, left: 24 }
    return { bottom: margin, left: 24 }
  }, [size.height])

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null

  const isDefault = position.x === -1 || position.y === -1

  if (state === "dot") {
    return (
      <button
        onClick={expand}
        className="fixed bottom-14 left-6 z-50 group transition-transform duration-200 hover:scale-110 active:scale-95"
        aria-label="Open terminal"
      >
        <Image
          src="https://images.icon-icons.com/3053/PNG/512/terminal_macos_bigsur_icon_189655.png"
          alt="Terminal"
          width={48}
          height={48}
          className="drop-shadow-lg"
          draggable={false}
        />
      </button>
    )
  }

  const getStyles = () => {
    if (!isDefault) {
      const maxX = window.innerWidth - (state === "expanded" ? size.width : 280)
      const maxY = window.innerHeight - (state === "expanded" ? size.height : 60)
      return { top: Math.max(0, Math.min(position.y, maxY)), left: Math.max(0, Math.min(position.x, maxX)) }
    }
    return getSafePosition()
  }

  return (
    <div
      ref={containerRef}
      className={`fixed z-50 transition-all duration-300 ease-out ${isDragging || isResizing ? "transition-none" : ""} ${state === "collapsed" ? "opacity-90" : ""}`}
      style={{ ...getStyles(), width: state === "expanded" ? size.width : 280, height: state === "expanded" ? size.height : "auto", maxHeight: "calc(100vh - 48px)" }}
    >
      <div className="h-full flex flex-col bg-[#1c1c1e]/95 backdrop-blur-xl rounded-xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10">
        <div className="flex items-center px-4 py-3 bg-gradient-to-b from-[#3c3c3e] to-[#2c2c2e] border-b border-black/20 shrink-0">
          <div className="flex items-center gap-2 pr-4 relative z-10" onClick={e => e.stopPropagation()} onMouseDown={e => e.stopPropagation()}>
            <div className="absolute -inset-2" />
            <button onClick={minimize} className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 group relative shadow-sm" aria-label="Close">
              <X className="w-2 h-2 absolute inset-0.5 text-[#820005] opacity-0 group-hover:opacity-100" strokeWidth={2.5} />
            </button>
            <button onClick={collapse} className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-110 group relative shadow-sm" aria-label="Minimize">
              <Minus className="w-2 h-2 absolute inset-0.5 text-[#9a6c00] opacity-0 group-hover:opacity-100" strokeWidth={2.5} />
            </button>
            <button onClick={expand} className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-110 group relative shadow-sm" aria-label="Maximize">
              <div className="w-1.5 h-1.5 absolute inset-[3px] border border-[#0a6b15] opacity-0 group-hover:opacity-100" />
            </button>
          </div>
          
          <div onMouseDown={handleMouseDown} className={`flex-1 flex items-center justify-center select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}>
            <span className={`text-xs font-medium ${user === "root" ? "text-[#ff453a]" : "text-[#a0a0a5]"}`}>
              {user}@labs — zsh
            </span>
          </div>
          
          <div className="w-[60px]" />
        </div>

        <div className={`flex-1 overflow-hidden transition-all duration-300 ${state === "expanded" ? "opacity-100" : "opacity-0 h-0"}`}>
          {state === "expanded" && <TerminalContent />}
        </div>
        
        {state === "collapsed" && (
          <button className="px-4 py-2.5 text-xs text-[#a0a0a5] hover:bg-white/5 text-left" onClick={expand}>
            Press <kbd className="px-1.5 py-0.5 bg-black/30 rounded text-[#e5e5e5] font-mono mx-1">`</kbd> or <kbd className="px-1.5 py-0.5 bg-black/30 rounded text-[#e5e5e5] font-mono mx-1">{'>'}</kbd> to expand
          </button>
        )}

        {state === "expanded" && (
          <>
            <div onMouseDown={e => handleResizeStart(e, "e")} className="absolute top-0 right-0 w-1 h-full cursor-ew-resize hover:bg-primary/20" />
            <div onMouseDown={e => handleResizeStart(e, "s")} className="absolute bottom-0 left-0 w-full h-1 cursor-ns-resize hover:bg-primary/20" />
            <div onMouseDown={e => handleResizeStart(e, "n")} className="absolute top-0 left-0 w-full h-1 cursor-ns-resize hover:bg-primary/20" />
            <div onMouseDown={e => handleResizeStart(e, "se")} className="absolute bottom-0 right-0 w-3 h-3 cursor-nwse-resize">
              <svg className="w-3 h-3 text-[#5a5a5e]" viewBox="0 0 12 12"><path d="M10 6L6 10M10 10L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </div>
            <div onMouseDown={e => handleResizeStart(e, "ne")} className="absolute top-0 right-0 w-3 h-3 cursor-nesw-resize" />
            <div onMouseDown={e => handleResizeStart(e, "sw")} className="absolute bottom-0 left-0 w-3 h-3 cursor-nesw-resize" />
            <div onMouseDown={e => handleResizeStart(e, "nw")} className="absolute top-0 left-0 w-3 h-3 cursor-nwse-resize" />
          </>
        )}
      </div>
    </div>
  )
}