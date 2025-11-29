import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, ExternalLink, Github, Database } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { researchArticles, getArticleBySlug } from "@/lib/research-data"
import { CTASection } from "@/components/cta-section"
import { ArticleContent } from "@/components/article-content"

export async function generateStaticParams() {
  return researchArticles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    return { title: "Article Not Found | Han's Labs" }
  }

  return {
    title: `${article.title} | Han's Labs Research`,
    description: article.abstract,
  }
}

export default async function ResearchArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  // Generate TOC from content
  const tocItems = article.content
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => ({
      title: line.replace("## ", ""),
      id: line.replace("## ", "").toLowerCase().replace(/\s+/g, "-"),
    }))

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 lg:py-24 border-b border-border">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <Link
              href="/research"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Research
            </Link>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {new Date(article.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {article.readTime}
              </span>
              {article.doi && <span className="font-mono text-xs">DOI: {article.doi}</span>}
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              {article.title}
            </h1>

            <p className="mt-6 text-lg text-muted-foreground">{article.abstract}</p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              {article.authors.map((author, index) => (
                <div key={author.name} className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-sm font-medium text-secondary-foreground">
                    {author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{author.name}</div>
                    <div className="text-xs text-muted-foreground">{author.role}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {article.codeUrl && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={article.codeUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </Link>
                </Button>
              )}
              {article.dataUrl && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={article.dataUrl} target="_blank" rel="noopener noreferrer">
                    <Database className="mr-2 h-4 w-4" />
                    Download Data
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Table of Contents */}
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <h4 className="text-sm font-semibold text-foreground mb-4">Table of Contents</h4>
                  <nav className="space-y-2">
                    {tocItems.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>

                  {/* Tags */}
                  <div className="mt-8">
                    <h4 className="text-sm font-semibold text-foreground mb-4">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/research?tag=${encodeURIComponent(tag)}`}
                          className="inline-flex items-center rounded-md bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>

              {/* Article Content */}
              <div className="lg:col-span-3">
                <ArticleContent content={article.content} />

                {/* Citations */}
                {article.citations && article.citations.length > 0 && (
                  <div className="mt-16 pt-8 border-t border-border">
                    <h2 className="text-2xl font-bold text-foreground mb-6">References</h2>
                    <ol className="space-y-4 list-decimal list-inside">
                      {article.citations.map((citation, index) => (
                        <li key={index} className="text-muted-foreground">
                          <span className="text-foreground">{citation.authors}</span>. <em>{citation.title}</em>.{" "}
                          {citation.venue}, {citation.year}.
                          {citation.url && (
                            <Link
                              href={citation.url}
                              className="ml-2 text-primary hover:underline inline-flex items-center"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </Link>
                          )}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <SiteFooter />
    </div>
  )
}
