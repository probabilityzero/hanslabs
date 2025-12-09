import dynamic from "next/dynamic"
import { FadeUp } from "@/components/hero-transitions"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const testMeta = {
  name: "Test Page Two",
  description: "Full-height hero section with different content sections",
  status: "wip" as const,
  category: "Hero Background",
  features: [
    "Full-height hero (100vh)",
    "HeroBackground component",
    "PillarsSection",
    "FeaturedProjects section",
    "StatsSection",
  ],
}

export const metadata = {
  title: `${testMeta.name} | Admin | Han's Labs`,
  robots: "noindex, nofollow",
}

const PillarsSection = dynamic(() => import("@/components/pillars-section").then(m => ({ default: m.PillarsSection })))
const FeaturedProjects = dynamic(() => import("@/components/featured-projects").then(m => ({ default: m.FeaturedProjects })))
const StatsSection = dynamic(() => import("@/components/stats-section").then(m => ({ default: m.StatsSection })))

export default function TestTwoPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Back Link */}
      <div className="fixed top-20 left-6 z-50">
        <Link
          href="/admin/tests"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/80 backdrop-blur border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Tests
        </Link>
      </div>

      {/* Hero - Full Height */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="relative z-10 text-center px-6">
          <FadeUp>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-600 border border-blue-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              Test Page
            </div>
          </FadeUp>
          <FadeUp delay={25}>
            <h1 className="text-5xl font-bold text-foreground mb-4">{testMeta.name}</h1>
          </FadeUp>
          <FadeUp delay={50}>
            <p className="text-xl text-muted-foreground max-w-lg mx-auto">
              {testMeta.description}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Content Sections */}
      <PillarsSection />
      <FeaturedProjects />
      <StatsSection />
    </div>
  )
}