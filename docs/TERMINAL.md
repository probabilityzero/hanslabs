# Terminal Documentation

A floating, draggable terminal widget with Mac-style design for Han's Labs.

## Overview

The terminal is a modular command palette that provides quick navigation, system controls, and utility functions. It features a Mac-inspired design with traffic light buttons, glassmorphism effects, and full keyboard support.

## Features

| Feature | Description |
|---------|-------------|
| Floating Widget | Stays on screen, above all content |
| Draggable | Click and drag the title bar to reposition |
| Resizable | Drag all corners and edges |
| Position Persistence | Saves position to localStorage |
| Viewport Constraints | Never goes off-screen |
| Keyboard Shortcuts | Toggle with `` ` ``, `>`, or `Cmd+K` |
| Click Outside | Collapses when clicking outside |
| Command System | Modular, categorized commands |
| ANSI Colors | Colored output for better readability |
| User Authentication | Switch between guest and root users |
| Password Input Mode | Secure password entry for `su` command |

## Installation

The terminal is already integrated into the app layout:

```tsx
// app/layout.tsx
import { TerminalProvider, TerminalWidget } from "@/components/terminal"

export default function RootLayout({ children }) {
  return (
    <ThemeProvider>
      <TerminalProvider>
        {children}
        <TerminalWidget />
      </TerminalProvider>
    </ThemeProvider>
  )
}
```

## Terminal States

| State | Appearance | Behavior |
|-------|------------|----------|
| `dot` | Small terminal icon (48px) | Click or hotkey to expand |
| `collapsed` | Title bar only | Shows hint, click to expand |
| `expanded` | Full terminal | Interactive, shows history |

## User Modes

| User | Prompt Color | Title Bar | Description |
|------|--------------|-----------|-------------|
| `guest` | Green | `guest@labs` | Default user |
| `root` | Red | `root@labs` | Authenticated admin |

## Input Modes

| Mode | Icon | Behavior |
|------|------|----------|
| `normal` | `>` (chevron) | Standard command input |
| `password` | 🔒 (lock) | Hidden input for authentication |

## Keyboard Shortcuts

### Global (works anywhere except input fields)

| Key | Action |
|-----|--------|
| `` ` `` (backtick) | Toggle terminal |
| `Shift + >` | Toggle terminal |
| `Cmd/Ctrl + K` | Toggle terminal |
| `Escape` | Collapse terminal |

### When Terminal is Expanded

Single-key shortcuts execute commands directly (disabled during password input):

| Key | Command |
|-----|---------|
| `h` | Navigate to Home |
| `s` | Navigate to Services |
| `w` | Navigate to Showcase |
| `c` | Navigate to Contact |
| `a` | Navigate to About |
| `d` | Navigate to Docs |
| `t` | Toggle Theme |

## Commands

### Navigation (Visible in Help)

| Command | Keys | Description |
|---------|------|-------------|
| home | `h`, `home` | Go to homepage |
| services | `s`, `services` | View services |
| showcase | `w`, `work`, `showcase` | View work |
| contact | `c`, `contact` | Get in touch |
| about | `a`, `about` | Learn about us |
| docs | `d`, `docs` | View documentation |

### System (Visible in Help)

| Command | Keys | Description |
|---------|------|-------------|
| theme | `t`, `theme` | Toggle dark/light mode |

### Hidden Commands (Work but not shown in help)

| Command | Keys | Description |
|---------|------|-------------|
| su | `su`, `sudo`, `admin` | Switch to root user (prompts for password) |
| logout | `logout`, `signout` | Logout from root |
| clear | `clear`, `cls` | Clear terminal history |
| exit | `exit`, `quit`, `q` | Close terminal |
| reload | `reload`, `refresh`, `r` | Reload page |

### Utility (Visible in Help)

| Command | Keys | Description |
|---------|------|-------------|
| whoami | `whoami` | Display current user |
| pwd | `pwd` | Print working directory |
| date | `date` | Display current date |
| echo | `echo [text]` | Print text to terminal |
| neofetch | `neofetch`, `fetch` | Display system info |
| uptime | `uptime` | Show session uptime |
| version | `version`, `v` | Show terminal version |
| help | `help` | List all visible commands |

## Authentication Flow

```
guest@labs
> su
Password:
••••••••
Authentication successful

root@labs (header turns red)
> (redirects to /admin)
```

### Logout Flow

```
root@labs
> logout
Logged out

guest@labs (header turns back to normal)
>
```

## File Structure

```
components/terminal/
├── index.tsx                 # Exports
├── terminal-provider.tsx     # Context & state management
├── terminal-widget.tsx       # Main floating UI component
├── terminal-content.tsx      # Output display & input
└── commands/
    ├── index.ts              # Command registry & helpers
    ├── navigation.ts         # Navigation commands
    ├── system.ts             # System commands (includes su, logout)
    └── utility.ts            # Utility commands

hooks/
├── use-terminal.ts           # Terminal state management
├── use-keyboard.ts           # Global keyboard listener
├── use-draggable.ts          # Drag functionality
├── use-resizable.ts          # Resize functionality (all directions)
└── use-click-outside.ts      # Click outside detection

types/
└── terminal.ts               # All TypeScript types
```

## Types

```ts
// types/terminal.ts

type TerminalState = "dot" | "collapsed" | "expanded"
type TerminalUser = "guest" | "root"
type InputMode = "normal" | "password"

interface TerminalPosition {
  x: number
  y: number
}

interface Command {
  id: string
  keys: string[]
  description: string
  action: (args?: string[]) => void | Promise<void>
  icon?: LucideIcon
  category: "navigation" | "system" | "utility"
  hidden?: boolean
}

interface CommandContext {
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

interface TerminalContextType {
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
```

## Adding New Commands

### 1. Create a New Command File

```ts
// components/terminal/commands/custom.ts
import type { Command, CommandContext } from "@/types/terminal"

export function createCustomCommands(ctx: CommandContext): Command[] {
  return [
    {
      id: "mycommand",
      keys: ["mc", "mycommand"],
      description: "Does something cool",
      category: "utility",
      action: () => {
        ctx.terminal.addToHistory("\x1b[32mSomething cool happened!\x1b[0m")
      },
    },
    {
      id: "greet",
      keys: ["greet", "hello"],
      description: "Greet the user",
      category: "utility",
      action: (args) => {
        const name = args?.[0] || "stranger"
        ctx.terminal.addToHistory(`\x1b[36mHello, ${name}!\x1b[0m`)
      },
    },
  ]
}
```

### 2. Register Commands

```ts
// components/terminal/commands/index.ts
import { createCustomCommands } from "./custom"

export function createCommands(ctx: CommandContext): Command[] {
  return [
    ...createNavigationCommands(ctx),
    ...createSystemCommands(ctx),
    ...createUtilityCommands(ctx),
    ...createCustomCommands(ctx),
  ]
}
```

### 3. Adding Password-Protected Commands

```ts
{
  id: "secret",
  keys: ["secret"],
  description: "Secret command",
  category: "system",
  hidden: true,
  action: () => {
    ctx.terminal.addToHistory("\x1b[90mEnter secret code:\x1b[0m")
    ctx.terminal.setInputMode("password", async (code: string) => {
      if (code === "mysecret") {
        ctx.terminal.addToHistory("\x1b[32mAccess granted!\x1b[0m")
      } else {
        ctx.terminal.addToHistory("\x1b[31mAccess denied\x1b[0m")
      }
    })
  },
}
```

## ANSI Color Codes

Use these escape codes for colored output:

| Code | Color | Usage |
|------|-------|-------|
| `\x1b[32m` | Green | Success messages |
| `\x1b[33m` | Yellow | Warnings, keys |
| `\x1b[31m` | Red | Errors |
| `\x1b[36m` | Cyan | Navigation, info |
| `\x1b[35m` | Purple | Special/admin |
| `\x1b[90m` | Gray | Secondary text |
| `\x1b[0m` | Reset | End color |

Example:
```ts
ctx.terminal.addToHistory("\x1b[32mSuccess:\x1b[0m Operation completed")
ctx.terminal.addToHistory("\x1b[31mError:\x1b[0m Something went wrong")
```

## Customization

### Change Terminal Icon

Update the icon URL in `terminal-widget.tsx`:

```tsx
<Image
  src="https://your-icon-url.png"
  alt="Terminal"
  width={48}
  height={48}
/>
```

### Default Position

The terminal defaults to **bottom-left** (`left: 24px, bottom: 24px`).

To change default position, edit `terminal-widget.tsx`:

```tsx
// Bottom-right
return { bottom: margin, right: 24 }

// Top-left
return { top: 24, left: 24 }
```

### Viewport Constraints

The terminal automatically:
- Adjusts position when window resizes
- Prevents expanding below the viewport
- Limits resize to available space
- Maintains 24px minimum margin from edges

### Resize Handles

| Handle | Direction | Cursor |
|--------|-----------|--------|
| Top edge | `n` | `ns-resize` |
| Bottom edge | `s` | `ns-resize` |
| Left edge | `w` | `ew-resize` |
| Right edge | `e` | `ew-resize` |
| Top-left | `nw` | `nwse-resize` |
| Top-right | `ne` | `nesw-resize` |
| Bottom-left | `sw` | `nesw-resize` |
| Bottom-right | `se` | `nwse-resize` |

### Modify Terminal Size

Edit constraints in `terminal-widget.tsx`:

```tsx
const { size, setSize, isResizing, handleResizeStart } = useResizable({
  ref: containerRef,
  minSize: { width: 320, height: 200 },
  maxSize: { width: 800, height: 600 },
})
```

### Modify Colors

Edit the color scheme in `terminal-content.tsx` and `terminal-widget.tsx`:

```tsx
// Terminal background
bg-[#1c1c1e]

// Title bar gradient
bg-gradient-to-b from-[#3c3c3e] to-[#2c2c2e]

// Traffic lights
bg-[#ff5f57]  // Red (close)
bg-[#febc2e]  // Yellow (minimize)
bg-[#28c840]  // Green (maximize)

// Text colors
text-[#e5e5e7]  // Primary text
text-[#8e8e93]  // Secondary text
text-[#6e6e73]  // Muted text

// User colors
text-[#32d74b]  // Guest (green)
text-[#ff453a]  // Root (red)
text-[#ffd60a]  // Password mode (yellow)
```

### Title Bar Dragging

The draggable area is separated from the traffic light buttons:
- Traffic light buttons have their own click zone with invisible padding
- Dragging only works in the center area of the title bar
- This prevents accidental drags when clicking buttons

## Hooks Reference

### useTerminal()

Access terminal state and methods from any component:

```tsx
import { useTerminal } from "@/components/terminal"

function MyComponent() {
  const { 
    state,              // "dot" | "collapsed" | "expanded"
    user,               // "guest" | "root"
    inputMode,          // "normal" | "password"
    toggle,             // Toggle terminal visibility
    expand,             // Expand to full view
    collapse,           // Collapse to title bar
    minimize,           // Minimize to dot
    addToHistory,       // Add line to output
    processInput,       // Process a command string
    setUser,            // Change user
    setInputMode,       // Switch to password mode
    handlePasswordSubmit, // Submit password
  } = useTerminal()

  return (
    <button onClick={() => processInput("help")}>
      Show Help
    </button>
  )
}
```

### useDraggable()

Make any element draggable:

```tsx
import { useDraggable } from "@/hooks/use-draggable"

function DraggableBox() {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  
  const { isDragging, handleMouseDown } = useDraggable({
    ref,
    position,
    onPositionChange: setPosition,
    disabled: false,
  })

  return (
    <div 
      ref={ref} 
      onMouseDown={handleMouseDown}
      style={{ left: position.x, top: position.y }}
    >
      Drag me
    </div>
  )
}
```

### useResizable()

Make any element resizable from all directions:

```tsx
import { useResizable } from "@/hooks/use-resizable"

function ResizableBox() {
  const ref = useRef<HTMLDivElement>(null)
  
  const { size, isResizing, handleResizeStart } = useResizable({
    ref,
    minSize: { width: 100, height: 100 },
    maxSize: { width: 500, height: 500 },
  })

  return (
    <div ref={ref} style={{ width: size.width, height: size.height }}>
      {/* Corner handles */}
      <div onMouseDown={(e) => handleResizeStart(e, "se")} />
      <div onMouseDown={(e) => handleResizeStart(e, "ne")} />
      <div onMouseDown={(e) => handleResizeStart(e, "sw")} />
      <div onMouseDown={(e) => handleResizeStart(e, "nw")} />
      
      {/* Edge handles */}
      <div onMouseDown={(e) => handleResizeStart(e, "n")} />
      <div onMouseDown={(e) => handleResizeStart(e, "s")} />
      <div onMouseDown={(e) => handleResizeStart(e, "e")} />
      <div onMouseDown={(e) => handleResizeStart(e, "w")} />
    </div>
  )
}
```

## API Endpoints

The terminal uses these API endpoints for authentication:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/admin/auth` | POST | Authenticate with password |
| `/api/admin/logout` | POST | Clear authentication |

### Auth Request

```ts
POST /api/admin/auth
Content-Type: application/json

{ "code": "password123" }
```

### Auth Response

```ts
// Success
{ "success": true }

// Failure
{ "success": false }
```

## Troubleshooting

### Terminal not appearing

1. Check `TerminalProvider` wraps your app
2. Check `TerminalWidget` is rendered in layout
3. Check browser console for errors

### Keyboard shortcuts not working

1. Ensure focus is not on input/textarea
2. Check if `inputMode` is "password" (shortcuts disabled)
3. Check if another element is capturing the key

### Position not saving

1. Check localStorage is available
2. Clear localStorage: `localStorage.removeItem("terminal-position")`
3. Check for hydration errors

### Terminal going off-screen

1. The terminal auto-constrains on window resize
2. Try minimizing and re-expanding
3. Clear position: `localStorage.removeItem("terminal-position")`

### Authentication not working

1. Check `/api/admin/auth` endpoint exists
2. Verify environment variable for password
3. Check network tab for API errors

### Password input not appearing

1. Ensure `setInputMode` is called with "password"
2. Check that callback function is provided
3. Verify `handlePasswordSubmit` is wired up

## Future Improvements

- [ ] Command history navigation (up/down arrows)
- [ ] Tab autocomplete
- [ ] Multiple terminal windows
- [ ] Plugin system for third-party commands
- [ ] Custom themes
- [ ] Sound effects
- [ ] Animation presets
- [ ] Mobile touch gestures
- [ ] Command aliases
- [ ] Persistent history across sessions
- [ ] Session timeout for root user
- [ ] Two-factor authentication
- [ ] Command execution logging