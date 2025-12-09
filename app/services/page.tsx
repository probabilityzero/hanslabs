import { CTASection } from "@/components/cta-section"
import { ServicesDetail } from "@/components/services-detail"
import { AnimatedBackground } from "@/components/animated-background"
import { FadeUp } from "@/components/animations"
import { expertise } from "@/lib/services-data"

export const metadata = {
  title: "Our Services | Han's Labs",
  description:
    "Explore our expertise across technology & engineering, creative experiences, and intelligent systems.",
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <AnimatedBackground variant="intense" className="py-24 lg:py-32">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <FadeUp>
              <p className="text-sm font-semibold text-primary uppercase tracking-wide">Our Expertise</p>
            </FadeUp>
            <FadeUp delay={25}>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                Full-stack expertise across the innovation spectrum
              </h1>
            </FadeUp>
            <FadeUp delay={75}>
              <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
                From backend infrastructure to AI systems to creative experiences—we have the depth and breadth to
                tackle your most challenging problems.
              </p>
            </FadeUp>
          </div>
        </div>
      </AnimatedBackground>

      {/* Capability sections */}
      {expertise.map((capability, index) => (
        <FadeUp key={capability.id} delay={50}>
          <ServicesDetail capability={capability} reversed={index % 2 === 1} />
        </FadeUp>
      ))}

      <CTASection />
    </main>
  )
}