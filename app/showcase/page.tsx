import { ProjectsGrid } from "@/components/projects-grid"
import { AnimatedBackground } from "@/components/animated-background"
import { FadeUp } from "@/components/animations"
import { projects, getAllTags } from "@/lib/projects-data"

export const metadata = {
  title: "Projects | Han's Labs",
  description: "Explore our portfolio of research projects, prototypes, and production-ready solutions.",
}

export default function ProjectsPage() {
  const tags = getAllTags()

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <AnimatedBackground variant="intense" className="py-24 lg:py-32">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <FadeUp>
              <p className="text-sm font-semibold text-primary uppercase tracking-wide">Our Work</p>
            </FadeUp>
            <FadeUp delay={25}>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                Research, Prototypes & Projects
              </h1>
            </FadeUp>
            <FadeUp delay={50}>
              <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
                Explore our portfolio of technical projects spanning databases, AI, creative tools, and distributed
                systems.
              </p>
            </FadeUp>
          </div>
        </div>
      </AnimatedBackground>

      <FadeUp delay={75}>
      <ProjectsGrid projects={projects} tags={tags} />
      </FadeUp>
    </main>
  )
}
