import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DocsSidebar } from "@/components/docs-sidebar"
import { ArticleContent } from "@/components/article-content"
import { docPages, getDocBySlug, docsCategories, getDocsByCategory } from "@/lib/docs-data"

export async function generateStaticParams() {
  return docPages.map((doc) => ({
    slug: doc.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = getDocBySlug(slug)

  if (!doc) {
    return { title: "Doc Not Found | Han's Labs" }
  }

  return {
    title: `${doc.title} | Han's Labs Docs`,
    description: doc.description,
  }
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = getDocBySlug(slug)

  if (!doc) {
    notFound()
  }

  // Find prev/next pages
  const allDocs = docsCategories.flatMap((cat) => getDocsByCategory(cat.id))
  const currentIndex = allDocs.findIndex((d) => d.slug === slug)
  const prevDoc = currentIndex > 0 ? allDocs[currentIndex - 1] : null
  const nextDoc = currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null

  const category = docsCategories.find((c) => c.id === doc.category)

  return (
    <div className="min-h-screen bg-background">
      <main>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-4 gap-12">
            <DocsSidebar />

            <div className="lg:col-span-3">
              <div className="mb-8">
                <span className="text-sm text-primary font-medium">{category?.name}</span>
                <h1 className="text-3xl font-bold text-foreground mt-2">{doc.title}</h1>
                <p className="text-muted-foreground mt-2">{doc.description}</p>
              </div>

              <div className="prose prose-invert max-w-none">
                <ArticleContent content={doc.content} />
              </div>

              {/* Prev/Next navigation */}
              <div className="mt-16 pt-8 border-t border-border flex justify-between gap-4">
                {prevDoc ? (
                  <Link
                    href={`/docs/${prevDoc.slug}`}
                    className="flex-1 p-4 rounded-xl border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Previous
                    </div>
                    <div className="font-medium text-foreground">{prevDoc.title}</div>
                  </Link>
                ) : (
                  <div className="flex-1" />
                )}

                {nextDoc && (
                  <Link
                    href={`/docs/${nextDoc.slug}`}
                    className="flex-1 p-4 rounded-xl border border-border hover:border-primary/50 transition-colors text-right"
                  >
                    <div className="flex items-center justify-end text-sm text-muted-foreground mb-1">
                      Next
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </div>
                    <div className="font-medium text-foreground">{nextDoc.title}</div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
