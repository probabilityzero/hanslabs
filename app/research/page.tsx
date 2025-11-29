import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ResearchList } from "@/components/research-list"
import { researchArticles, getAllResearchTags } from "@/lib/research-data"

export const metadata = {
  title: "Research | Han's Labs",
  description: "Technical articles, papers, and research notes from Han's Labs.",
}

export default function ResearchPage() {
  const tags = getAllResearchTags()

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold text-primary uppercase tracking-wide">Research</p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                Technical Notes & Papers
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
                Deep dives into our research, methodologies, and technical discoveries.
              </p>
            </div>
          </div>
        </section>

        <ResearchList articles={researchArticles} tags={tags} />
      </main>
      <SiteFooter />
    </div>
  )
}
