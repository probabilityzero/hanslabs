import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { projects } from "@/lib/projects-data" 

const statusColors = {
  product: "bg-green-500/10 text-green-400 border-green-500/20",
  prototype: "bg-primary/10 text-primary border-primary/20",
  research: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
}

const featuredProjects = projects.filter((p) => p.isFeatured) 

export function FeaturedProjects() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wide">Featured Work</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Recent Projects 
            </h2>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/projects">
              View all projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/showcase/${project.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/50"
            >
              <div className="aspect-video overflow-hidden bg-secondary">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className={statusColors[project.status as keyof typeof statusColors]}>
                    {project.status}
                  </Badge>
                  {project.hasDemo && (
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      Live Demo
                    </Badge>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
