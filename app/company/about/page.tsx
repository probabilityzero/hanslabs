import { CTASection } from "@/components/cta-section"
import { TeamSection } from "@/components/team-section"
import { TimelineSection } from "@/components/timeline-section"
import { ProcessSection } from "@/components/process-section"
import { AnimatedBackground } from "@/components/animated-background"
import { FadeUp } from "@/components/animations"

export const metadata = {
  title: "About | Han's Labs",
  description: "Learn about our mission, team, and the philosophy behind Han's Labs R&D creative engineering.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <AnimatedBackground variant="intense" className="py-24 lg:py-32">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <FadeUp>
              <p className="text-sm font-semibold text-primary uppercase tracking-wide">About Us</p>
            </FadeUp>
            <FadeUp delay={25}>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                Engineering the future, one experiment at a time
              </h1>
            </FadeUp>
            <FadeUp delay={75}>
              <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
                We believe the best products emerge from rigorous
                research, rapid prototyping, and deep technical expertise combined with creative vision.
              </p>
            </FadeUp>
          </div>
        </div>
      </AnimatedBackground>

      {/* Mission & Philosophy */}
      <section className="py-16 lg:py-24 bg-card/50 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Mission</h2>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  We exist to bridge the gap between cutting-edge research and production-ready solutions. Too often,
                  brilliant ideas remain trapped in academic papers or prototype graveyards. We change that.
                </p>
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                  Our lab operates at the intersection of technology, creativity, and intelligence. We take complex
                  problems, break them down through systematic research, build proof-of-concepts, and deliver scalable
                  products.
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={50}>
              <div className="space-y-6">
                  <div className="p-6 mx-3 rounded-2xl border border-border bg-card">
                    <h3 className="text-xl font-semibold text-foreground">Research-First</h3>
                    <p className="mt-2 text-muted-foreground">
                      Every project begins with deep investigation. We study the problem space, existing solutions, and
                      potential approaches before writing a single line of code.
                    </p>
                  </div>
                  <div className="p-6 ml-6 rounded-2xl border border-border bg-card">
                    <h3 className="text-xl font-semibold text-foreground">Prototype-Driven</h3>
                    <p className="mt-2 text-muted-foreground">
                      We believe in building to learn. Our POCs aren't just demos—they're functional explorations that
                      validate assumptions and de-risk development.
                    </p>
                  </div>
                  <div className="p-6 mr-5 rounded-2xl border border-border bg-card">
                    <h3 className="text-xl font-semibold text-foreground">Production-Ready</h3>
                    <p className="mt-2 text-muted-foreground">
                      When we ship, we ship for real. Our solutions are built with reliability, scalability, and
                      maintainability as first-class concerns.
                    </p>
                  </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <ProcessSection />
      <TeamSection />
      <TimelineSection />
      <CTASection />
    </main>
  )
}
