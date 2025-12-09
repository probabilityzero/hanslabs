import { useEffect, useCallback } from "react"
import type { Command } from "@/types/terminal"

interface UseKeyboardProps {
  commands: Command[]
  onExecute: (id: string) => void
  onToggle: () => void
  enabled: boolean
}

export function useKeyboard({ commands, onExecute, onToggle, enabled }: UseKeyboardProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const target = e.target as HTMLElement
    const isInput = target.tagName === "INPUT" || 
                   target.tagName === "TEXTAREA" || 
                   target.isContentEditable

    if (e.key === "`" && !e.ctrlKey && !isInput) {
      e.preventDefault()
      onToggle()
      return
    }

    if (e.shiftKey && e.key === ">" && !isInput) {
      e.preventDefault()
      onToggle()
      return
    }

    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault()
      onToggle()
      return
    }

    if (!enabled || isInput || e.metaKey || e.ctrlKey || e.altKey) return

    const command = commands.find(cmd => cmd.keys.includes(e.key.toLowerCase()))
    if (command) {
      e.preventDefault()
      onExecute(command.id)
    }
  }, [commands, onExecute, onToggle, enabled])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])
}