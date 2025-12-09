import type { Command, CommandContext } from "@/types/terminal"
import { createNavigationCommands } from "./navigation"
import { createSystemCommands } from "./system"
import { createUtilityCommands } from "./utility"

export type { Command, CommandContext } from "@/types/terminal"

export function createCommands(ctx: CommandContext): Command[] {
  return [
    ...createNavigationCommands(ctx),
    ...createSystemCommands(ctx),
    ...createUtilityCommands(ctx),
  ]
}

export function findCommand(commands: Command[], input: string): Command | undefined {
  const normalized = input.toLowerCase().trim()
  return commands.find(cmd => cmd.keys.includes(normalized))
}

export function parseInput(input: string): { command: string; args: string[] } {
  const parts = input.trim().split(/\s+/)
  return {
    command: parts[0] || "",
    args: parts.slice(1),
  }
}

export function formatHelp(commands: Command[]): string[] {
  const lines: string[] = [
    "",
    "\x1b[32mAvailable commands:\x1b[0m",
    "",
  ]

  const categories = ["navigation", "system", "utility"] as const
  const categoryNames = {
    navigation: "Navigation",
    system: "System",
    utility: "Utility",
  }

  for (const category of categories) {
    const cmds = commands.filter(c => c.category === category && !c.hidden)
    if (cmds.length === 0) continue

    lines.push(`\x1b[90m${categoryNames[category]}\x1b[0m`)
    
    for (const cmd of cmds) {
      const keys = cmd.keys.join(", ")
      lines.push(`  \x1b[33m${keys.padEnd(16)}\x1b[0m ${cmd.description}`)
    }
    lines.push("")
  }

  return lines
}