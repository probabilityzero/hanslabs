import { useState, useCallback, useEffect, useRef } from "react"
import type { TerminalState, TerminalPosition, TerminalUser, InputMode } from "@/types/terminal"

const STORAGE_KEY = "terminal-position"
const DEFAULT_POSITION: TerminalPosition = { x: -1, y: -1 }

export function useTerminalState() {
  const [state, setState] = useState<TerminalState>("dot")
  const [position, setPositionState] = useState<TerminalPosition>(DEFAULT_POSITION)
  const [history, setHistory] = useState<string[]>([])
  const [user, setUserState] = useState<TerminalUser>("guest")
  const [inputMode, setInputModeState] = useState<InputMode>("normal")
  const passwordCallbackRef = useRef<((value: string) => void | Promise<void>) | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setPositionState(JSON.parse(saved))
      } catch {
        setPositionState(DEFAULT_POSITION)
      }
    }
  }, [])

  useEffect(() => {
    if (position.x !== -1 && position.y !== -1) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(position))
    }
  }, [position])

  const expand = useCallback(() => setState("expanded"), [])
  const collapse = useCallback(() => setState("collapsed"), [])
  const minimize = useCallback(() => setState("dot"), [])
  
  const toggle = useCallback(() => {
    setState(prev => prev === "expanded" ? "dot" : "expanded")
  }, [])

  const setPosition = useCallback((pos: TerminalPosition) => {
    setPositionState(pos)
  }, [])

  const addToHistory = useCallback((entry: string) => {
    setHistory(prev => [...prev.slice(-99), entry])
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
  }, [])

  const setUser = useCallback((newUser: TerminalUser) => {
    setUserState(newUser)
  }, [])

  const setInputMode = useCallback((mode: InputMode, callback?: (value: string) => void | Promise<void>) => {
    setInputModeState(mode)
    passwordCallbackRef.current = callback || null
  }, [])

  const handlePasswordSubmit = useCallback((password: string) => {
    addToHistory("••••••••")
    setInputModeState("normal")
    if (passwordCallbackRef.current) {
      passwordCallbackRef.current(password)
      passwordCallbackRef.current = null
    }
  }, [addToHistory])

  return {
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
  }
}