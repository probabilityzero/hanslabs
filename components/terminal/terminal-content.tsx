"use client"

import { useState, useRef, useEffect } from "react"
import { useTerminal } from "./terminal-provider"
import { ChevronRight, Lock } from "lucide-react"

export function TerminalContent() {
  const { history, user, inputMode, processInput, handlePasswordSubmit } = useTerminal()
  const [input, setInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  useEffect(() => { inputRef.current?.focus() }, [inputMode])

  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight
  }, [history])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (inputMode === "password") {
      handlePasswordSubmit(input)
      setInput("")
      return
    }

    if (!input.trim()) return
    processInput(input)
    setInput("")
  }

  const renderLine = (line: string) => line
    .replace(/\x1b\[32m/g, '<span class="text-[#32d74b]">')
    .replace(/\x1b\[33m/g, '<span class="text-[#ffd60a]">')
    .replace(/\x1b\[31m/g, '<span class="text-[#ff453a]">')
    .replace(/\x1b\[36m/g, '<span class="text-[#5ac8fa]">')
    .replace(/\x1b\[35m/g, '<span class="text-[#bf5af2]">')
    .replace(/\x1b\[90m/g, '<span class="text-[#6e6e73]">')
    .replace(/\x1b\[0m/g, '</span>')

  return (
    <div className="flex flex-col h-full bg-[#1c1c1e]">
      <div ref={outputRef} className="flex-1 overflow-y-auto p-4 font-mono text-[13px] leading-relaxed">
        <div className="text-[#32d74b]">Last login: {new Date().toLocaleString()}</div>
        <div className="text-[#8e8e93] mb-4">type <span className="text-[#ffd60a]">help</span> for available commands</div>
        {history.map((line, i) => (
          <div key={i} className={`${line.startsWith(">") ? "text-[#e5e5e7]" : "text-[#8e8e93]"} whitespace-pre-wrap`} dangerouslySetInnerHTML={{ __html: renderLine(line) }} />
        ))}
      </div>

      <div className="border-t border-[#2c2c2e] shrink-0">
        <form onSubmit={handleSubmit} className="flex items-center px-3 py-2.5 bg-[#141414]">
          {inputMode === "password" ? (
            <Lock className="w-3.5 h-3.5 mr-1.5 text-[#ffd60a]" strokeWidth={2.5} />
          ) : (
            <ChevronRight className={`w-3.5 h-3.5 mr-1.5 ${user === "root" ? "text-[#ff453a]" : "text-[#32d74b]"}`} strokeWidth={2.5} />
          )}
          <input
            ref={inputRef}
            type={inputMode === "password" ? "password" : "text"}
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 bg-transparent text-[#e5e5e7] font-mono text-[13px] outline-none placeholder:text-[#6e6e73] caret-[#32d74b]"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  )
}