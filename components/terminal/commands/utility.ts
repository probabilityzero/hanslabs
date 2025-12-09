import type { Command, CommandContext } from "@/types/terminal"

export function createUtilityCommands(ctx: CommandContext): Command[] {
  return [
    {
      id: "whoami",
      keys: ["whoami"],
      description: "Display current user",
      category: "utility",
      action: () => {
        ctx.terminal.addToHistory("guest@labs")
      },
    },
    {
      id: "pwd",
      keys: ["pwd"],
      description: "Print working directory",
      category: "utility",
      action: () => {
        ctx.terminal.addToHistory("/home/guest")
      },
    },
    {
      id: "date",
      keys: ["date"],
      description: "Display current date",
      category: "utility",
      action: () => {
        ctx.terminal.addToHistory(new Date().toString())
      },
    },
    {
      id: "echo",
      keys: ["echo"],
      description: "Print text to terminal",
      category: "utility",
      action: (args) => {
        if (args && args.length > 0) {
          ctx.terminal.addToHistory(args.join(" "))
        }
      },
    },
    {
      id: "neofetch",
      keys: ["neofetch", "fetch"],
      description: "Display system info",
      category: "utility",
      action: () => {
        ctx.terminal.addToHistory(`\x1b[32m
  ██╗  ██╗ █████╗ ███╗   ██╗███████╗
  ██║  ██║██╔══██╗████╗  ██║██╔════╝
  ███████║███████║██╔██╗ ██║███████╗
  ██╔══██║██╔══██║██║╚██╗██║╚════██║
  ██║  ██║██║  ██║██║ ╚████║███████║
  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝\x1b[0m

\x1b[33mOS:\x1b[0m HansOS 1.0.0
\x1b[33mShell:\x1b[0m zsh 5.9
\x1b[33mTerminal:\x1b[0m hansterm
\x1b[33mTheme:\x1b[0m ${ctx.theme.current}`)
      },
    },
    {
      id: "theme",
      keys: ["dark", "light"],
      description: "Toggle theme",
      category: "system",
      action: () => {
        const newTheme = ctx.theme.current === "dark" ? "light" : "dark"
        ctx.terminal.addToHistory(`\x1b[32mTheme switched to ${newTheme} mode\x1b[0m`)
        ctx.theme.toggle()
      },
    },
    {
      id: "uptime",
      keys: ["uptime"],
      description: "Show session uptime",
      category: "utility",
      action: () => {
        const start = performance.now()
        const seconds = Math.floor(start / 1000)
        const minutes = Math.floor(seconds / 60)
        const hours = Math.floor(minutes / 60)
        ctx.terminal.addToHistory(`up ${hours}h ${minutes % 60}m ${seconds % 60}s`)
      },
    },
    {
      id: "version",
      keys: ["version", "v"],
      description: "Show terminal version",
      category: "utility",
      action: () => {
        ctx.terminal.addToHistory("\x1b[32mhansterm\x1b[0m v1.0.0")
        ctx.terminal.addToHistory("\x1b[90mBuilt with Next.js & TypeScript\x1b[0m")
      },
    },
  ]
}