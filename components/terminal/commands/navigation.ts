import type { Command, CommandContext } from "@/types/terminal"

export function createNavigationCommands(ctx: CommandContext): Command[] {
  return [
    {
      id: "home",
      keys: ["home"],
      description: "Go to homepage",
      category: "navigation",
      action: () => {
        ctx.terminal.addToHistory("\x1b[36mNavigating to homepage...\x1b[0m")
        ctx.router.push("/")
      },
    },
    {
      id: "services",
      keys: ["services"],
      description: "View our services",
      category: "navigation",
      action: () => {
        ctx.terminal.addToHistory("\x1b[36mNavigating to services...\x1b[0m")
        ctx.router.push("/services")
      },
    },
    {
      id: "showcase",
      keys: ["work", "showcase"],
      description: "View our work",
      category: "navigation",
      action: () => {
        ctx.terminal.addToHistory("\x1b[36mNavigating to showcase...\x1b[0m")
        ctx.router.push("/showcase")
      },
    },
    {
      id: "contact",
      keys: ["contact"],
      description: "Get in touch",
      category: "navigation",
      action: () => {
        ctx.terminal.addToHistory("\x1b[36mNavigating to contact...\x1b[0m")
        ctx.router.push("/company/contact")
      },
    },
    {
      id: "about",
      keys: ["about"],
      description: "Learn about us",
      category: "navigation",
      action: () => {
        ctx.terminal.addToHistory("\x1b[36mNavigating to about...\x1b[0m")
        ctx.router.push("/company/about")
      },
    },
  ]
}