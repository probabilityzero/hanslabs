import Link from "next/link"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

const researchArticles = [
  {
    slug: "probabilistic-graph-inference",
    title: "Probabilistic Graph Inference at Scale",
    abstract:
      "A novel approach to scaling probabilistic inference on large-scale knowledge graphs using variational methods.",
    date: "2024-11-15",
    readTime: "12 min read",
    tags: ["Machine Learning", "Graph Theory"],
  },
  {
    slug: "real-time-rendering-techniques",
    title: "Real-time Neural Rendering Techniques",
    abstract:
      "Exploring hybrid rendering pipelines that combine traditional rasterization with neural radiance fields.",
    date: "2024-10-28",
    readTime: "18 min read",
    tags: ["Computer Graphics", "Neural Networks"],
  },
  {
    slug: "distributed-consensus-mechanisms",
    title: "Distributed Consensus for Edge Computing",
    abstract: "Lightweight consensus protocols designed for resource-constrained edge devices in IoT networks.",
    date: "2024-10-12",
    readTime: "15 min read",
    tags: ["Distributed Systems", "IoT"],
  },
]

export function ResearchHighlights() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wide">Research</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Latest Technical Writeups
            </h2>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/research">
              View all research
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {researchArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/research/${article.slug}`}
              className="group relative flex flex-col p-6 rounded-2xl border border-border bg-card transition-all hover:border-primary/50"
            >
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(article.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {article.readTime}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground flex-1">{article.abstract}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
