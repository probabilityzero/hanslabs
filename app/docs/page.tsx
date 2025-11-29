import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DocsSidebar } from "@/components/docs-sidebar"
import { docsCategories, getDocsByCategory } from "@/lib/docs-data"
import Link from "next/link"
import { ArrowRight, Book, Code, Terminal, Rocket } from "lucide-react"

export const metadata = {
  title: "Documentation | Han's Labs",
  description: "Developer documentation, API references, and tutorials for Han's Labs tools.",
}

const categoryIcons = {
  "getting-started": Rocket,
  "api-reference": Code,
  tutorials: Book,
  cli: Terminal,
}

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-4 gap-12">
            <DocsSidebar />

            <div className="lg:col-span-3">
              <h1 className="text-4xl font-bold text-foreground mb-4">Documentation</h1>
              <p className="text-lg text-muted-foreground mb-12">Everything you need to build with Han's Labs tools.</p>

              <div className="grid sm:grid-cols-2 gap-6">
                {docsCategories.map((category) => {
                  const Icon = categoryIcons[category.id as keyof typeof categoryIcons] || Book
                  const pages = getDocsByCategory(category.id)

                  return (
                    <Link
                      key={category.id}
                      href={`/docs/${pages[0]?.slug || ""}`}
                      className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {category.name}
                      </h2>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {pages.length} {pages.length === 1 ? "page" : "pages"}
                      </p>
                      <div className="mt-4 flex items-center text-sm text-primary">
                        Get started
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
