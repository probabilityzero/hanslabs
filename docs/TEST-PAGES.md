# Test Pages System

A dynamic test page discovery system for development and feature testing.

## Overview

Test pages are automatically discovered from the `app/admin/tests/` directory. Each subdirectory with a `page.tsx` file becomes a test page entry in the admin test index.

---

## Quick Start

### Creating a Test Page

1. **Create a folder** in `app/admin/tests/`:
   ```
   app/admin/tests/my-feature/
   ```

2. **Add `page.tsx`** with metadata:
   ```tsx
   export const testMeta = {
     name: "My Feature Test",
     description: "Testing the new feature",
     status: "wip",
     category: "Components",
     features: ["Feature 1", "Feature 2"],
   }

   export default function MyFeatureTestPage() {
     return (
       <div className="min-h-screen bg-background">
         {/* Your test content */}
       </div>
     )
   }
   ```

3. **Visit** `/admin/tests` — your page appears automatically!

---

## Test Metadata Schema

Each test page should export a `testMeta` object:

```typescript
export const testMeta = {
  name: string          // Display name in the index
  description: string   // Brief description of what's being tested
  status: TestStatus    // Current status of the test
  category: string      // Group tests by category
  features: string[]    // List of features being tested
}
```

### Status Values

| Status | Label | Color | Use When |
|--------|-------|-------|----------|
| `"working"` | Working | Green | Test passes, feature works correctly |
| `"partial"` | Partial | Amber | Some aspects work, others don't |
| `"broken"` | Broken | Red | Test fails, feature is broken |
| `"wip"` | In Progress | Blue | Currently being developed |

### Categories

Categories group related tests together. Use existing categories when possible:

- `Hero Background` — Background blob animations, transitions
- `Components` — UI component testing
- `Animations` — Motion and transition testing
- `Layout` — Page layout experiments
- `API` — API endpoint testing
- `Performance` — Performance benchmarking

---

## Full Example

```tsx
// filepath: app/admin/tests/button-variants/page.tsx
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export const testMeta = {
  name: "Button Variants",
  description: "Testing all button component variants and states",
  status: "working" as const,
  category: "Components",
  features: [
    "Default variant",
    "Secondary variant", 
    "Outline variant",
    "Ghost variant",
    "Destructive variant",
    "Disabled state",
    "Loading state",
    "With icons",
  ],
}

export const metadata = {
  title: `${testMeta.name} | Admin | Han's Labs`,
  robots: "noindex, nofollow",
}

export default function ButtonVariantsTestPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="fixed top-20 left-6 z-50">
        <Link
          href="/admin/tests"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/80 backdrop-blur border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Tests
        </Link>
      </div>

      {/* Test Content */}
      <div className="max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-8">{testMeta.name}</h1>
        <p className="text-muted-foreground mb-12">{testMeta.description}</p>

        {/* Variants */}
        <section className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">Variants</h2>
            <div className="flex flex-wrap gap-4">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Sizes</h2>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">States</h2>
            <div className="flex flex-wrap gap-4">
              <Button disabled>Disabled</Button>
              <Button className="pointer-events-none">
                <span className="animate-spin mr-2">⏳</span>
                Loading
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
```

---

## Directory Structure

```
app/admin/tests/
├── page.tsx              # Test index (auto-discovers tests)
├── layout.tsx            # Shared layout for all tests
├── one/
│   └── page.tsx          # Test page 1
├── two/
│   └── page.tsx          # Test page 2
├── button-variants/
│   └── page.tsx          # Button testing
└── hero-animations/
    └── page.tsx          # Hero animation testing
```

---

## Auto-Discovery System

The test index page (`app/admin/tests/page.tsx`) automatically:

1. **Scans** all subdirectories in `app/admin/tests/`
2. **Reads** each `page.tsx` file
3. **Extracts** the `testMeta` export using regex parsing
4. **Falls back** to folder name if no metadata found
5. **Groups** tests by category
6. **Sorts** alphabetically within categories

### How Metadata is Extracted

```typescript
// The system looks for this pattern in your page.tsx:
export const testMeta = {
  name: "...",
  description: "...",
  status: "...",
  category: "...",
  features: ["...", "..."],
}
```

### Fallback Behavior

If no `testMeta` is found:
- **Name**: Extracted from `<h1>` tag, page `metadata.title`, or folder name
- **Description**: "No description provided"
- **Status**: `"wip"`
- **Category**: `"Uncategorized"`
- **Features**: Empty array

---

## Best Practices

### 1. Always Include Back Navigation

```tsx
<div className="fixed top-20 left-6 z-50">
  <Link
    href="/admin/tests"
    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/80 backdrop-blur border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
  >
    <ArrowLeft className="h-3 w-3" />
    Back to Tests
  </Link>
</div>
```

### 2. Use Descriptive Names

```tsx
// ❌ Bad
export const testMeta = {
  name: "Test 1",
  description: "Testing stuff",
}

// ✅ Good
export const testMeta = {
  name: "Modal Animation Variants",
  description: "Testing enter/exit animations for modal dialogs with different easing functions",
}
```

### 3. Keep Status Updated

Update the status as you work:
- Start with `"wip"` when creating
- Move to `"partial"` when some things work
- Set to `"working"` when complete
- Mark `"broken"` if it regresses

### 4. List Specific Features

```tsx
// ❌ Too vague
features: ["Animations", "Styling"]

// ✅ Specific
features: [
  "Enter animation (fade + scale)",
  "Exit animation (fade out)",
  "Backdrop blur effect",
  "Focus trap",
  "ESC key to close",
]
```

### 5. Use Consistent Categories

Check existing tests for categories before creating new ones. This keeps the index organized.

---

## Adding Page Metadata

For SEO (even though test pages are noindex), add Next.js metadata:

```tsx
export const testMeta = {
  name: "My Test",
  // ...
}

export const metadata = {
  title: `${testMeta.name} | Admin | Han's Labs`,
  robots: "noindex, nofollow",
}
```

---

## Using with Dynamic Imports

For performance, use dynamic imports for heavy components:

```tsx
import dynamic from "next/dynamic"

const HeavyComponent = dynamic(
  () => import("@/components/heavy").then(m => ({ default: m.HeavyComponent })),
  { loading: () => <div>Loading...</div> }
)

export default function TestPage() {
  return <HeavyComponent />
}
```

---

## Accessing Test Pages

| Method | URL |
|--------|-----|
| Admin Dashboard | `/admin` → Click "Test Pages" |
| Direct URL | `/admin/tests` |
| Terminal | Type `t` or `tests` (requires auth) |
| Specific Test | `/admin/tests/{folder-name}` |

---

## Troubleshooting

### Test not appearing in index

1. Check folder is directly under `app/admin/tests/`
2. Ensure `page.tsx` exists in the folder
3. Verify `testMeta` export syntax is correct
4. Check for TypeScript errors in the file

### Metadata not updating

The file system is read at request time in development. Try:
1. Hard refresh the test index page
2. Restart the dev server

### Category showing as "Uncategorized"

Ensure `testMeta` has a `category` field:
```tsx
export const testMeta = {
  // ...
  category: "My Category", // Don't forget this!
}
```

---

## Related Documentation

- [Hero Background System](./HERO-BACKGROUND.md) — Background animations
- [Animation System](./ANIMATION.md) — Motion components
- [Terminal](./TERMINAL.md) — Terminal commands including `tests`