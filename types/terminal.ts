import type { LucideIcon } from "lucide-react"

export type TerminalState = "dot" | "collapsed" | "expanded"
export type TerminalUser = "guest" | "root"
export type InputMode = "normal" | "password"

export interface TerminalPosition {
  x: number
  y: number
}

export interface Command {
  id: string
  keys: string[]
  description: string
  action: (args?: string[]) => void | Promise<void>
  icon?: LucideIcon
  category: "navigation" | "system" | "utility"
  hidden?: boolean
}

export interface CommandContext {
  router: { push: (path: string) => void }
  theme: { toggle: () => void; current: string }
  terminal: {
    user: TerminalUser
    addToHistory: (entry: string) => void
    clearHistory: () => void
    minimize: () => void
    setUser: (user: TerminalUser) => void
    setInputMode: (mode: InputMode, callback?: (value: string) => void | Promise<void>) => void
  }
}

export interface TerminalContextType {
  state: TerminalState
  position: TerminalPosition
  history: string[]
  user: TerminalUser
  inputMode: InputMode
  commands: Command[]
  expand: () => void
  collapse: () => void
  minimize: () => void
  toggle: () => void
  executeCommand: (id: string, args?: string[]) => void
  processInput: (input: string) => void
  setPosition: (pos: TerminalPosition) => void
  addToHistory: (entry: string) => void
  clearHistory: () => void
  setUser: (user: TerminalUser) => void
  setInputMode: (mode: InputMode, callback?: (value: string) => void | Promise<void>) => void
  handlePasswordSubmit: (password: string) => void
}














