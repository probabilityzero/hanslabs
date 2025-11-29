import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Github, Download, Play } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { projects, getProjectBySlug } from "@/lib/projects-data"
import { CTASection } from "@/components/cta-section"
import { CodeBlock } from "@/components/code-block"

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return { title: "Project Not Found | Han's Labs" }
  }

  return {
    title: `${project.title} | Han's Labs`,
    description: project.description,
  }
}

const statusColors = {
  product: "bg-green-500/10 text-green-400 border-green-500/20",
  prototype: "bg-primary/10 text-primary border-primary/20",
  research: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* Hero */}
        <section className="py-16 lg:py-24 relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 grid-pattern opacity-20" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
            <Link
              href="/projects"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="outline" className={statusColors[project.status]}>
                {project.status}
              </Badge>
              {project.hasDemo && (
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  Live Demo
                </Badge>
              )}
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>

            <p className="mt-6 text-xl text-muted-foreground max-w-3xl">{project.description}</p>

            <div className="mt-8 flex flex-wrap gap-4">
              {project.hasDemo && project.demoUrl && (
                <Button size="lg" asChild>
                  <Link href={project.demoUrl}>
                    <Play className="mr-2 h-4 w-4" />
                    Try Live Demo
                  </Link>
                </Button>
              )}
              {project.repoUrl && (
                <Button variant="outline" size="lg" asChild>
                  <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View Source
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Hero image */}
                <div className="aspect-video rounded-2xl overflow-hidden bg-secondary border border-border">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Overview */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Overview</h2>
                  <p className="text-muted-foreground leading-relaxed">{project.overview}</p>
                </div>

                {/* Problem Statement */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Problem Statement</h2>
                  <p className="text-muted-foreground leading-relaxed">{project.problemStatement}</p>
                </div>

                {/* Architecture */}
                {project.architecture && (
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-4">Technical Architecture</h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">{project.architecture}</p>
                    {/* Architecture diagram placeholder */}
                    <div className="rounded-2xl border border-border bg-card p-8 text-center">
                      <div className="aspect-video flex items-center justify-center bg-secondary/50 rounded-lg">
                        <span className="text-muted-foreground font-mono text-sm">[Architecture Diagram]</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Code Example */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Quick Start</h2>
                  <CodeBlock
                    language="bash"
                    code={`# Install ${project.title}\nnpm install @hanslabs/${project.slug}\n\n# Or use with Docker\ndocker pull hanslabs/${project.slug}:latest`}
                  />
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Metrics */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="rounded-2xl border border-border bg-card p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Metrics</h3>
                    <div className="space-y-4">
                      {project.metrics.map((metric) => (
                        <div key={metric.label} className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">{metric.label}</span>
                          <span className="text-lg font-semibold text-gradient">{metric.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stack */}
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/projects?tag=${encodeURIComponent(tag)}`}
                        className="inline-flex items-center rounded-md bg-primary/10 text-primary px-3 py-1 text-sm font-medium hover:bg-primary/20 transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Downloads */}
                {project.downloads && project.downloads.length > 0 && (
                  <div className="rounded-2xl border border-border bg-card p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Downloads</h3>
                    <div className="space-y-2">
                      {project.downloads.map((download) => (
                        <Link
                          key={download.name}
                          href={download.url}
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Download className="h-4 w-4" />
                          {download.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact CTA */}
                <div className="rounded-2xl border border-primary/50 bg-primary/5 p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Interested in this project?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Let's discuss how we can help you build something similar.
                  </p>
                  <Button asChild className="w-full">
                    <Link href="/contact">Get in Touch</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
    </div>
  )
}
