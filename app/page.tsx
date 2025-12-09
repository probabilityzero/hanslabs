import Link from "next/link"
import dynamic from "next/dynamic"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeUp } from "@/components/animations"

const PillarsSection = dynamic(() => import("@/components/pillars-section").then(m => ({ default: m.PillarsSection })))
const FeaturedProjects = dynamic(() => import("@/components/featured-projects").then(m => ({ default: m.FeaturedProjects })))
const StatsSection = dynamic(() => import("@/components/stats-section").then(m => ({ default: m.StatsSection })))
const CTASection = dynamic(() => import("@/components/cta-section").then(m => ({ default: m.CTASection })))

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-30" />

          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-gradient-shift-1" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-chart-2/20 rounded-full blur-3xl animate-gradient-shift-2" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <FadeUp>
                <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm text-muted-foreground border border-border">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  Now accepting collaboration inquiries
                </div>
              </FadeUp>

              <FadeUp delay={50}>
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance">
                  Where deep tech meets <span className="text-gradient">human ingenuity</span>
                </h1>
              </FadeUp>

              <FadeUp delay={100}>
                <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto text-pretty">
                  An R&D-first creative engineering lab. We research, prototype, and build intelligent systems, creative
                  experiences, and cutting-edge technology solutions.
                </p>
              </FadeUp>

              <FadeUp delay={150}>
                <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
                  <Button size="lg" asChild>
                    <Link href="/company/contact">
                      Start a Project
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/showcase">
                      <Play className="mr-2 h-4 w-4" />
                      View Our Work
                    </Link>
                  </Button>
                </div>
              </FadeUp>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent" />
        </section>

        <PillarsSection />
        <FeaturedProjects />
        <StatsSection />
        <CTASection />
      </main>
    </div>
  )
}