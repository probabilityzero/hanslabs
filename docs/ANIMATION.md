# Han's Labs Animation System

A reusable animation system for consistent, premium page transitions and effects.

## Components

### 1. `<AnimatedBackground>` - Section with Animated Background

Wraps content with animated gradient blobs and optional grid pattern. Can be used as a standalone section or container.

```tsx
import { AnimatedBackground } from "@/components/animated-background"

<AnimatedBackground>
  {/* Your content */}
</AnimatedBackground>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"subtle"` \| `"default"` \| `"intense"` | `"default"` | Controls gradient blob size and opacity |
| `showGrid` | `boolean` | `true` | Shows the square grid pattern |
| `className` | `string` | `""` | Additional classes |
| `as` | `"div"` \| `"section"` \| `"main"` | `"section"` | HTML element to render |

#### Variants

| Variant | Blob Size | Opacity | Use Case |
|---------|-----------|---------|----------|
| `subtle` | 600px | 3% | Content-heavy sections |
| `default` | 800px | 5% | Standard sections |
| `intense` | 1000px | 8% | Hero sections, landing areas |

#### Examples

```tsx
// Hero section with intense background
<AnimatedBackground variant="intense" as="section">
  <HeroContent />
</AnimatedBackground>

// Content section with subtle background
<AnimatedBackground variant="subtle">
  <ContentGrid />
</AnimatedBackground>

// Main wrapper without grid
<AnimatedBackground as="main" showGrid={false} className="min-h-screen">
  {children}
</AnimatedBackground>

// Simple div with default settings
<AnimatedBackground as="div">
  <Card />
</AnimatedBackground>
```

---

### 2. `<FadeUp>` - Fade In From Below

Content fades in while moving up.

```tsx
import { FadeUp } from "@/components/animations"

<FadeUp>
  <h1>Hello World</h1>
</FadeUp>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `delay` | `number` | `0` | Delay in milliseconds before animation starts |
| `duration` | `number` | `400` | Animation duration in milliseconds |
| `className` | `string` | `""` | Additional classes (useful for grid layouts) |

#### Examples

```tsx
<FadeUp delay={100}>First</FadeUp>
<FadeUp delay={150}>Second</FadeUp>
<FadeUp delay={200} duration={600}>Slower</FadeUp>
<FadeUp className="lg:col-span-2">Grid item</FadeUp>
```

---

### 3. `<FadeIn>` - Simple Fade In

Content fades in without movement.

```tsx
import { FadeIn } from "@/components/animations"

<FadeIn delay={100}>
  <img src="/hero.png" />
</FadeIn>
```

#### Props

Same as `<FadeUp>`

---

### 4. `<SlideIn>` - Slide In From Left

Content slides in from the left while fading.

```tsx
import { SlideIn } from "@/components/animations"

<SlideIn delay={100}>
  <nav>Sidebar</nav>
</SlideIn>
```

#### Props

Same as `<FadeUp>`

---

### 5. `<ScaleIn>` - Scale Up While Fading

Content scales from 95% to 100% while fading in.

```tsx
import { ScaleIn } from "@/components/animations"

<ScaleIn delay={100}>
  <Card>Featured Item</Card>
</ScaleIn>
```

#### Props

Same as `<FadeUp>`

---

### 6. `<Stagger>` - Animate Multiple Children

Automatically staggers animation delay for each child.

```tsx
import { Stagger } from "@/components/animations"

<Stagger baseDelay={100} staggerDelay={50}>
  {items.map(item => (
    <Card key={item.id}>{item.name}</Card>
  ))}
</Stagger>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `baseDelay` | `number` | `0` | Initial delay before first item |
| `staggerDelay` | `number` | `50` | Delay between each item |
| `duration` | `number` | `400` | Animation duration |
| `animation` | `"fade-up"` \| `"fade-in"` \| `"slide-in"` \| `"scale-in"` | `"fade-up"` | Animation type |
| `className` | `string` | `""` | Classes for the container |
| `childClassName` | `string` | `""` | Classes for each animated child |

#### Examples

```tsx
<Stagger 
  baseDelay={100} 
  staggerDelay={75} 
  animation="scale-in" 
  className="grid grid-cols-3 gap-4"
>
  {cards.map(card => <Card key={card.id} />)}
</Stagger>
```

---

## Animation Timing Guide

Recommended delay sequence for page elements:

| Element | Delay |
|---------|-------|
| Badge/Label | `0ms` |
| Title | `50ms` |
| Description | `100ms` |
| First list item | `150ms` |
| Second list item | `200ms` |
| Third list item | `250ms` |
| Secondary content | `200-300ms` |
| Form/CTA | `200ms` |

---

## CSS Animation Classes

These classes are defined in `globals.css` and can be used directly:

| Class | Effect |
|-------|--------|
| `animate-fade-up` | Fade in + move up 16px |
| `animate-fade-in` | Fade in only |
| `animate-slide-in` | Fade in + move right 16px |
| `animate-scale-in` | Fade in + scale from 95% |
| `animate-gradient-shift-1` | Blob movement (12s loop) |
| `animate-gradient-shift-2` | Blob movement (14s loop) |
| `animate-gradient-shift-3` | Blob movement (16s loop) |

---

## Full Page Template

```tsx
import { AnimatedBackground } from "@/components/animated-background"
import { FadeUp, Stagger } from "@/components/animations"
import { SomeIcon } from "lucide-react"

export const metadata = {
  title: "Page Title | Han's Labs",
  description: "Page description",
}

const items = [
  { id: 1, title: "Item 1" },
  { id: 2, title: "Item 2" },
  { id: 3, title: "Item 3" },
]

export default function ExamplePage() {
  return (
    <>
      {/* Hero Section */}
      <AnimatedBackground variant="intense" className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          <FadeUp>
            <div className="flex items-center gap-2 mb-6">
              <SomeIcon className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary uppercase">
                Section Label
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={50}>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
              Page Title Here
            </h1>
          </FadeUp>

          <FadeUp delay={100}>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
              Page description or introduction text goes here.
            </p>
          </FadeUp>

        </div>
      </AnimatedBackground>

      {/* Content Section */}
      <AnimatedBackground variant="subtle" className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          <Stagger 
            baseDelay={150} 
            staggerDelay={50} 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {items.map((item) => (
              <div 
                key={item.id} 
                className="p-6 rounded-xl bg-card border border-border"
              >
                <h3 className="font-semibold text-foreground">{item.title}</h3>
              </div>
            ))}
          </Stagger>

        </div>
      </AnimatedBackground>
    </>
  )
}
```

---

## Section-Based Layout

Use `AnimatedBackground` as standalone sections throughout your page:

```tsx
export default function Page() {
  return (
    <>
      {/* Hero - intense effect */}
      <AnimatedBackground variant="intense" className="min-h-[60vh] flex items-center">
        <Hero />
      </AnimatedBackground>

      {/* Features - default effect */}
      <AnimatedBackground className="py-24">
        <Features />
      </AnimatedBackground>

      {/* Testimonials - subtle effect, no grid */}
      <AnimatedBackground variant="subtle" showGrid={false} className="py-24">
        <Testimonials />
      </AnimatedBackground>

      {/* CTA - intense effect */}
      <AnimatedBackground variant="intense" className="py-16">
        <CallToAction />
      </AnimatedBackground>
    </>
  )
}
```

---

## Quick Reference

```tsx
// Import everything you need
import { AnimatedBackground } from "@/components/animated-background"
import { FadeUp, FadeIn, SlideIn, ScaleIn, Stagger } from "@/components/animations"

// Animated background sections
<AnimatedBackground>
<AnimatedBackground variant="subtle">
<AnimatedBackground variant="intense">
<AnimatedBackground as="main" showGrid={false}>
<AnimatedBackground as="div" className="rounded-xl">

// Single element animations
<FadeUp>
<FadeUp delay={50}>
<FadeIn delay={100}>
<SlideIn delay={150}>
<ScaleIn delay={200}>

// With custom duration
<FadeUp delay={100} duration={600}>

// Multiple elements with stagger
<Stagger baseDelay={100} staggerDelay={50}>
  {items.map(item => <div key={item.id}>{item}</div>)}
</Stagger>

// Stagger with different animation
<Stagger animation="scale-in" baseDelay={100}>

// With grid layout
<FadeUp className="lg:col-span-2">
<Stagger className="grid grid-cols-3 gap-4">
```

---

## File Structure

```
components/
├── animations.tsx          # FadeUp, FadeIn, SlideIn, ScaleIn, Stagger
└── animated-background.tsx # Standalone animated section component

app/
└── globals.css             # Animation keyframes and classes

docs/
└── ANIMATION.md            # This documentation
```