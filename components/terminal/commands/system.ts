import type { Command, CommandContext } from "@/types/terminal"

export function createSystemCommands(ctx: CommandContext): Command[] {
  return [
    {
      id: "theme",
      keys: ["t", "theme"],
      description: "Toggle dark/light mode",
      category: "system",
      action: () => {
        const newTheme = ctx.theme.current === "dark" ? "light" : "dark"
        ctx.terminal.addToHistory(`\x1b[32mTheme switched to ${newTheme} mode\x1b[0m`)
        ctx.theme.toggle()
      },
    },
    {
      id: "clear",
      keys: ["clear", "cls"],
      description: "Clear terminal history",
      category: "system",
      hidden: true,
      action: () => {
        ctx.terminal.clearHistory()
      },
    },
    {
      id: "exit",
      keys: ["exit", "quit", "q"],
      description: "Close terminal",
      category: "system",
      hidden: true,
      action: () => {
        setTimeout(() => ctx.terminal.minimize(), 100)
      },
    },
    {
      id: "reload",
      keys: ["reload", "refresh", "r"],
      description: "Reload current page",
      category: "system",
      hidden: true,
      action: () => {
        ctx.terminal.addToHistory("\x1b[33mReloading...\x1b[0m")
        setTimeout(() => window.location.reload(), 300)
      },
    },
    {
      id: "su",
      keys: ["su", "sudo", "admin"],
      description: "Switch to root user",
      category: "system",
      hidden: true,
      action: () => {
        ctx.terminal.addToHistory("\x1b[90mPassword:\x1b[0m")
        ctx.terminal.setInputMode("password", async (password: string) => {
          if (!password) {
            ctx.terminal.addToHistory("\x1b[31msu: Authentication failure\x1b[0m")
            return
          }

          try {
            const res = await fetch("/api/admin/auth", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ code: password }),
            })

            const data = await res.json()

            if (data.success) {
              ctx.terminal.addToHistory("\x1b[32mAuthentication successful\x1b[0m")
              ctx.terminal.setUser("root")
              setTimeout(() => ctx.router.push("/admin"), 500)
            } else {
              ctx.terminal.addToHistory("\x1b[31msu: Authentication failure\x1b[0m")
            }
          } catch {
            ctx.terminal.addToHistory("\x1b[31msu: Authentication service unavailable\x1b[0m")
          }
        })
      },
    },
    {
      id: "logout",
      keys: ["logout", "signout"],
      description: "Logout from root",
      category: "system",
      hidden: true,
      action: async () => {
        if (ctx.terminal.user === "guest") {
          ctx.terminal.addToHistory("\x1b[33mNot logged in\x1b[0m")
          return
        }

        try {
          await fetch("/api/admin/logout", { method: "POST" })
          ctx.terminal.setUser("guest")
          ctx.terminal.addToHistory("\x1b[32mLogged out\x1b[0m")
        } catch {
          ctx.terminal.addToHistory("\x1b[31mLogout failed\x1b[0m")
        }
      },
    },
  ]
}