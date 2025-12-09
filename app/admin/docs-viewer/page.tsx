import fs from "fs"
import path from "path"
import { notFound } from "next/navigation"
import { FileText, ArrowLeft } from "lucide-react"
import { BackLink } from "@/components/breadcrumb"

export const metadata = {
  title: "Documentation | Han's Labs",
  description: "Internal documentation for Han's Labs",
  robots: "noindex, nofollow",
}

async function getDocFiles() {
  const docsDir = path.join(process.cwd(), "docs")
  
  if (!fs.existsSync(docsDir)) {
    return []
  }
  
  const files = fs.readdirSync(docsDir).filter(file => file.endsWith(".md"))
  
  return files.map(file => ({
    name: file.replace(".md", ""),
    slug: file.replace(".md", "").toLowerCase(),
  }))
}

export default async function DocsPage() {
  const docs = await getDocFiles()

  if (docs.length === 0) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <BackLink href="/admin" label="admin" />

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Documentation
              </h1>
              <p className="text-muted-foreground">
                Internal docs and guides
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-8">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">
                Available Documents
              </h2>
              <span className="text-sm text-muted-foreground">
                {docs.length} doc{docs.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
              {docs.map((doc) => (
                <a
                  key={doc.slug}
                  href={`/admin/docs-viewer/${doc.slug}`}
                  className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <svg
                      className="h-5 w-5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                    {doc.name}
                  </h3>
                  <p className="text-sm text-muted-foreground font-mono">
                    /docs/{doc.slug}.md
                  </p>
                </a>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Quick Reference
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-card border border-border">
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Location
                </div>
                <code className="text-sm font-medium text-foreground font-mono">
                  /docs/*.md
                </code>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border">
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Format
                </div>
                <span className="text-sm font-medium text-foreground">
                  Markdown (GFM)
                </span>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border">
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Syntax Highlighting
                </div>
                <span className="text-sm font-medium text-foreground">
                  Shiki (github)
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}