import type { Command, CommandContext } from "@/types/terminal"

export function createSystemCommands(ctx: CommandContext): Command[] {
  return [
    {
      id: "clear",
      keys: ["clear", "c"],
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
      keys: ["reload", "r"],
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
      keys: ["su", "admin"],
      description: "Switch to root user",
      category: "system",
      hidden: true,
      action: async () => {
        // Check if already authenticated
        if (ctx.terminal.user === "root") {
          ctx.terminal.addToHistory("\x1b[33mAlready logged in as root\x1b[0m")
          ctx.router.push("/admin")
          return
        }

        // Check if cookie session is still valid
        try {
          const res = await fetch("/api/admin/auth/check")
          if (res.ok) {
            const data = await res.json()
            if (data.authenticated) {
              ctx.terminal.addToHistory("\x1b[32mSession restored\x1b[0m")
              ctx.terminal.setUser("root")
              setTimeout(() => ctx.router.push("/admin"), 300)
              return
            }
          }
        } catch {
          // Session check failed, proceed with password
        }

        // Prompt for password
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

            if (res.ok) {
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
      id: "tests",
      keys: ["t", "tests", "test"],
      description: "Go to test pages",
      category: "system",
      hidden: true,
      action: async () => {
        // Check if already authenticated
        if (ctx.terminal.user === "root") {
          ctx.terminal.addToHistory("\x1b[36mNavigating to tests...\x1b[0m")
          ctx.router.push("/admin/tests")
          return
        }

        // Check if cookie session is still valid
        try {
          const res = await fetch("/api/admin/auth/check")
          if (res.ok) {
            const data = await res.json()
            if (data.authenticated) {
              ctx.terminal.addToHistory("\x1b[32mSession restored\x1b[0m")
              ctx.terminal.setUser("root")
              ctx.terminal.addToHistory("\x1b[36mNavigating to tests...\x1b[0m")
              setTimeout(() => ctx.router.push("/admin/tests"), 300)
              return
            }
          }
        } catch {
          // Session check failed, proceed with password
        }

        // Prompt for password
        ctx.terminal.addToHistory("\x1b[90mAuthentication required\x1b[0m")
        ctx.terminal.addToHistory("\x1b[90mPassword:\x1b[0m")
        ctx.terminal.setInputMode("password", async (password: string) => {
          if (!password) {
            ctx.terminal.addToHistory("\x1b[31mAuthentication failure\x1b[0m")
            return
          }

          try {
            const res = await fetch("/api/admin/auth", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ code: password }),
            })

            if (res.ok) {
              ctx.terminal.addToHistory("\x1b[32mAuthentication successful\x1b[0m")
              ctx.terminal.setUser("root")
              ctx.terminal.addToHistory("\x1b[36mNavigating to tests...\x1b[0m")
              setTimeout(() => ctx.router.push("/admin/tests"), 500)
            } else {
              ctx.terminal.addToHistory("\x1b[31mAuthentication failure\x1b[0m")
            }
          } catch {
            ctx.terminal.addToHistory("\x1b[31mAuthentication service unavailable\x1b[0m")
          }
        })
      },
    },
    {
      id: "logout",
      keys: ["logout", "signout", "exit-admin"],
      description: "Logout from root",
      category: "system",
      hidden: true,
      action: async () => {
        if (ctx.terminal.user === "guest") {
          ctx.terminal.addToHistory("\x1b[33mNot logged in\x1b[0m")
          return
        }

        try {
          await fetch("/api/admin/auth", { method: "DELETE" })
          ctx.terminal.setUser("guest")
          ctx.terminal.addToHistory("\x1b[32mLogged out\x1b[0m")
        } catch {
          ctx.terminal.addToHistory("\x1b[31mLogout failed\x1b[0m")
        }
      },
    },
  ]
}