"use client"

import { createContext, useContext, useCallback, useMemo, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { useTerminalState } from "@/hooks/use-terminal"
import { useKeyboard } from "@/hooks/use-keyboard"
import { createCommands, findCommand, parseInput, formatHelp } from "./commands"
import type { TerminalContextType } from "@/types/terminal"

const TerminalContext = createContext<TerminalContextType | null>(null)

export function useTerminal() {
  const context = useContext(TerminalContext)
  if (!context) throw new Error("useTerminal must be used within TerminalProvider")
  return context
}

export function TerminalProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  
  const {
    state,
    position,
    history,
    user,
    inputMode,
    expand,
    collapse,
    minimize,
    toggle,
    setPosition,
    addToHistory,
    clearHistory,
    setUser,
    setInputMode,
    handlePasswordSubmit,
  } = useTerminalState()

  const commands = useMemo(() => createCommands({
    router: { push: router.push },
    theme: { 
      toggle: () => setTheme(theme === "dark" ? "light" : "dark"),
      current: theme || "dark"
    },
    terminal: { user, addToHistory, clearHistory, minimize, setUser, setInputMode }
  }), [router, theme, setTheme, user, addToHistory, clearHistory, minimize, setUser, setInputMode])

  const executeCommand = useCallback((id: string, args?: string[]) => {
    const command = commands.find(cmd => cmd.id === id)
    if (command) command.action(args)
  }, [commands])

  const processInput = useCallback((input: string) => {
    const { command: cmdStr, args } = parseInput(input)
    
    addToHistory(`> ${input}`)

    if (cmdStr.toLowerCase() === "help") {
      formatHelp(commands).forEach(line => addToHistory(line))
      return
    }

    const cmd = findCommand(commands, cmdStr)
    if (cmd) {
      cmd.action(args)
    } else if (cmdStr) {
      addToHistory(`\x1b[31mcommand not found: ${cmdStr}\x1b[0m`)
    }
  }, [commands, addToHistory])

  useKeyboard({
    commands,
    onExecute: executeCommand,
    onToggle: toggle,
    enabled: state === "expanded" && inputMode === "normal",
  })

  return (
    <TerminalContext.Provider value={{
      state, position, history, user, inputMode, commands,
      expand, collapse, minimize, toggle,
      executeCommand, processInput, setPosition,
      addToHistory, clearHistory, setUser, setInputMode, handlePasswordSubmit,
    }}>
      {children}
    </TerminalContext.Provider>
  )
}