"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-11 h-6 rounded-full bg-secondary" />
    )
  }

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-11 h-6 rounded-full bg-secondary transition-colors duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label="Toggle theme"
    >
      <div
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-background shadow-md flex items-center justify-center transition-transform duration-300 ease-in-out ${
          isDark ? "translate-x-5" : "translate-x-0"
        }`}
      >
        {isDark ? (
          <Moon className="h-3 w-3" />
        ) : (
          <Sun className="h-3 w-3" />
        )}
      </div>
    </button>
  )
}