import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProjectsGrid } from "@/components/projects-grid"
import { projects, getAllTags } from "@/lib/projects-data"

export const metadata = {
  title: "Projects | Han's Labs",
  description: "Explore our portfolio of research projects, prototypes, and production-ready solutions.",
}

export default function ProjectsPage() {
  const tags = getAllTags()

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold text-primary uppercase tracking-wide">Projects</p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                Research, Prototypes & Products
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
                Explore our portfolio of technical projects spanning databases, AI, creative tools, and distributed
                systems.
              </p>
            </div>
          </div>
        </section>

        <ProjectsGrid projects={projects} tags={tags} />
      </main>
      <SiteFooter />
    </div>
  )
}
