# Hero Background System

An animated background system with floating gradient blobs that transition between pages.

## Status: 🚧 Work in Progress

The hero background system is currently under development. This document tracks all approaches tried and lessons learned.

---

## Overview

The goal is to create a visually appealing background with:
- Multiple gradient blobs (gold, copper, silver colors)
- Grid pattern overlay
- Smooth transitions when navigating between pages
- Floating/drifting animation
- Mouse tracking for one blob
- Scroll fade effect on homepage

---

## Current Implementation

### Component Location
```
components/hero-background.tsx
```

### Usage
```tsx
import { HeroBackground } from "@/components/hero-background"

export default function Page() {
  return (
    <div>
      <HeroBackground preset="home" scrollFade />
      {/* page content */}
    </div>
  )
}
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `preset` | `string` | `"default"` | Named preset configuration |
| `config` | `HeroBackgroundConfig` | - | Custom blob configuration |
| `showGrid` | `boolean` | `true` | Show grid pattern overlay |
| `scrollFade` | `boolean` | `false` | Fade hero blob on scroll |

### Available Presets
- `home` - Homepage configuration (large centered blobs)
- `test1` - Test page 1 (blobs positioned right/top)
- `test2` - Test page 2 (blobs positioned left/center)
- `showcase` - Projects page
- `default` - Fallback configuration

---

## Technical Details

### Dependencies
- `gsap` - Animation library
- `next/navigation` - usePathname for route detection

### Blob Configuration Type
```typescript
type BlobConfig = {
  x: number      // X position as percentage (0-100)
  y: number      // Y position as percentage (0-100)
  size: number   // Blob diameter in pixels
  opacity: number // Opacity (0-1)
}

type PageConfig = {
  hero: BlobConfig   // Main large blob (primary color)
  blob1: BlobConfig  // Secondary blob (copper color)
  blob2: BlobConfig  // Tertiary blob (primary/80)
  blob3: BlobConfig  // Quaternary blob (silver color)
}
```

### Color Mapping
| Blob | CSS Class | Color Variable |
|------|-----------|----------------|
| Hero | `bg-primary` | `--primary` (gold) |
| Blob 1 | `bg-copper` | `--copper` |
| Blob 2 | `bg-primary/80` | `--primary` at 80% |
| Blob 3 | `bg-silver` | `--silver` |

---

## Approaches Tried

### Approach 1: Layout-Level Component ❌
**Method:** Place `HeroBackground` in `app/layout.tsx` as a wrapper.

**Problem:** Component remounts on route change in Next.js App Router, causing blobs to reset.

**Lesson:** Layout components in App Router don't persist child state across route navigations the way expected.

---

### Approach 2: CSS Custom Properties ❌
**Method:** Store blob positions as CSS variables on `:root`, update via JavaScript on route change.

**Code:**
```tsx
useEffect(() => {
  const styles = pageStyles[pathname]
  Object.entries(styles).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value)
  })
}, [pathname])
```

**Problem:** CSS transitions worked but the component still remounted, losing GSAP animation context.

**Lesson:** CSS-only solutions can't maintain JavaScript animation state.

---

### Approach 3: Zustand Global Store ❌
**Method:** Use Zustand to persist blob positions globally.

**Code:**
```typescript
// lib/blob-store.ts
export const useBlobStore = create<BlobStore>((set) => ({
  hero: { x: "50%", y: "70%", size: 500, opacity: 0.22 },
  // ...
  setBlobs: (config) => set(config),
}))
```

**Problem:** Store updated correctly but component still remounted, refs were lost.

**Lesson:** Global state doesn't prevent component remounting in App Router.

---

### Approach 4: SessionStorage + Per-Page Import ⚠️ (Current)
**Method:** 
1. Import `HeroBackground` in each page (not layout)
2. Store current positions in sessionStorage
3. On mount, read previous positions and animate from there

**Code:**
```typescript
const STORAGE_KEY = "blob-positions"

function getStoredPositions(): PageConfig | null {
  const stored = sessionStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : null
}

useEffect(() => {
  const previous = getStoredPositions()
  const target = configs[preset]
  
  if (previous) {
    // Set initial position from previous
    gsap.set(blobRef.current, { x: prevX, y: prevY })
    // Animate to target
    gsap.to(blobRef.current, { x: targetX, y: targetY })
  }
  
  storePositions(target)
}, [])
```

**Status:** Partially working - blobs appear but transitions not consistent.

**Issues:**
- Timing of sessionStorage read vs GSAP initialization
- GSAP percentage values don't animate smoothly with `left`/`top`
- Component hydration timing issues

---

### Approach 5: Portal to Body (Not Tried)
**Idea:** Render blobs via React Portal directly to `<body>`, outside Next.js routing.

```tsx
import { createPortal } from "react-dom"

function HeroBackground() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => setMounted(true), [])
  
  if (!mounted) return null
  
  return createPortal(
    <div className="fixed inset-0">
      {/* blobs */}
    </div>,
    document.body
  )
}
```

**Potential:** May avoid remounting issues since portal is outside component tree.

---

### Approach 6: Canvas/WebGL (Not Tried)
**Idea:** Render blobs on a persistent `<canvas>` element in layout, controlled by global state.

**Potential:** Canvas element persists, only the draw calls update based on route.

---

## Known Issues

1. **Component Remounting**
   - App Router causes component remount on navigation
   - GSAP tweens get killed and recreated
   - Refs point to new DOM elements

2. **GSAP + Percentage Values**
   - GSAP can't smoothly animate CSS percentage values for `left`/`top`
   - Need to convert to pixels using viewport dimensions

3. **Hydration Mismatch**
   - Server renders without positions
   - Client calculates based on viewport
   - Can cause hydration warnings

4. **Floating Animation Conflict**
   - Floating animation uses relative `x`/`y` transforms
   - Position animation also uses transforms
   - Animations can conflict

---

## Recommended Next Steps

1. **Try Portal Approach**
   - Render outside Next.js routing tree
   - Maintain single instance across navigations

2. **Use `next/link` with `scroll={false}`**
   - May help maintain component state

3. **Investigate View Transitions API**
   - Native browser API for page transitions
   - `next/navigation` has experimental support

4. **Consider Framer Motion**
   - Has built-in layout animations
   - `AnimatePresence` for exit animations
   - May handle Next.js routing better

---

## Test Pages

Test pages are available at:
- `/test1` - Half-height hero with FeaturedProjects, Stats, CTA
- `/test2` - Full-height hero with Pillars, FeaturedProjects, Stats
- `/admin/tests` - Index of all test pages

Use the sticky bottom navigation to switch between pages and observe blob behavior.

---

## File References

| File | Purpose |
|------|---------|
| `components/hero-background.tsx` | Main component |
| `lib/blob-store.ts` | Zustand store (if using) |
| `app/test1/page.tsx` | Test page 1 |
| `app/test2/page.tsx` | Test page 2 |
| `app/admin/tests/page.tsx` | Test page index |
| `components/test-nav.tsx` | Sticky navigation for testing |

---

## Related Documentation

- [GSAP Documentation](https://greensock.com/docs/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)