import Link from "next/link"
import fs from "fs"
import path from "path"
import { 
  FlaskConical, 
  Layers, 
  Sparkles, 
  AlertCircle,
  CheckCircle2,
  Clock,
  FileQuestion,
  BookOpen
} from "lucide-react"
import { BackLink } from "@/components/ui/breadcrumb"
import { CopyButton } from "@/components/ui/copy-button"
import { SlideDown } from "@/components/hero-transitions"

export const metadata = {
  title: "Test Pages | Admin | Han's Labs",
  description: "Component and feature test pages",
  robots: "noindex, nofollow",
}

type TestStatus = "working" | "partial" | "broken" | "wip"

interface TestPageMeta {
  name: string
  description: string
  status: TestStatus
  category: string
  features: string[]
}

interface TestPage extends TestPageMeta {
  href: string
  slug: string
}

const statusConfig: Record<TestStatus, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  working: { label: "Working", color: "text-green-500 bg-green-500/10", icon: CheckCircle2 },
  partial: { label: "Partial", color: "text-amber-500 bg-amber-500/10", icon: AlertCircle },
  broken: { label: "Broken", color: "text-red-500 bg-red-500/10", icon: AlertCircle },
  wip: { label: "In Progress", color: "text-blue-500 bg-blue-500/10", icon: Clock },
}

const defaultMeta: TestPageMeta = {
  name: "Unnamed Test",
  description: "No description provided",
  status: "wip",
  category: "Uncategorized",
  features: [],
}

const testPageTemplate = `export const testMeta = {
  name: "My Test Page",
  description: "Testing some feature",
  status: "wip", // working | partial | broken | wip
  category: "Components",
  features: ["Feature 1", "Feature 2"],
}

export default function MyTestPage() {
  return <div>...</div>
}`

async function getTestPages(): Promise<TestPage[]> {
  const testsDir = path.join(process.cwd(), "app/admin/tests")
  const entries = fs.readdirSync(testsDir, { withFileTypes: true })
  
  const testPages: TestPage[] = []
  
  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith("_") || entry.name.startsWith(".")) continue
    
    const slug = entry.name
    const pagePath = path.join(testsDir, slug, "page.tsx")
    
    if (!fs.existsSync(pagePath)) continue
    
    let meta: TestPageMeta = { ...defaultMeta }
    
    try {
      const content = fs.readFileSync(pagePath, "utf-8")
      const metaMatch = content.match(/export\s+const\s+testMeta\s*[=:]\s*({[\s\S]*?})\s*(?:as\s+const)?/m)
      
      if (metaMatch) {
        const metaStr = metaMatch[1]
        const nameMatch = metaStr.match(/name:\s*["'`]([^"'`]+)["'`]/)
        const descMatch = metaStr.match(/description:\s*["'`]([^"'`]+)["'`]/)
        const statusMatch = metaStr.match(/status:\s*["'`]([^"'`]+)["'`]/)
        const categoryMatch = metaStr.match(/category:\s*["'`]([^"'`]+)["'`]/)
        const featuresMatch = metaStr.match(/features:\s*\[([\s\S]*?)\]/)
        
        if (nameMatch) meta.name = nameMatch[1]
        if (descMatch) meta.description = descMatch[1]
        if (statusMatch) meta.status = statusMatch[1] as TestStatus
        if (categoryMatch) meta.category = categoryMatch[1]
        if (featuresMatch) {
          meta.features = [...featuresMatch[1].matchAll(/["'`]([^"'`]+)["'`]/g)].map(m => m[1])
        }
      } else {
        const h1Match = content.match(/<h1[^>]*>([^<]+)<\/h1>/)
        const titleMatch = content.match(/title:\s*["'`]([^"'`]+)["'`]/)
        
        if (h1Match) {
          meta.name = h1Match[1].replace(/\{[^}]+\}/g, "").trim()
        } else if (titleMatch) {
          meta.name = titleMatch[1].replace(/ \| .*$/, "")
        } else {
          meta.name = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ")
        }
      }
    } catch {
      meta.name = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ")
    }
    
    testPages.push({ ...meta, href: `/admin/tests/${slug}`, slug })
  }
  
  return testPages.sort((a, b) => a.category !== b.category 
    ? a.category.localeCompare(b.category) 
    : a.name.localeCompare(b.name)
  )
}

export default async function TestsPage() {
  const testPages = await getTestPages()
  const categories = [...new Set(testPages.map(t => t.category))]

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <BackLink href="/admin" label="admin" />

        <SlideDown>
          <div className="flex items-center gap-3 mb-12">
            <div className="p-2.5 rounded-lg bg-primary/10">
            <FlaskConical className="h-6 w-6 text-primary" />
            </div>
            <div>
            <h1 className="text-3xl font-bold text-foreground">Test Pages</h1>
            <p className="text-muted-foreground">Component and feature testing environment</p>
            </div>
          </div>
        </SlideDown>

        <div className="mb-8 p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Layers className="h-4 w-4" />
              <span>{testPages.length} test page{testPages.length !== 1 && "s"}</span>
            </div>
            <div className="flex items-center gap-3">
              {Object.entries(statusConfig).map(([key, { label, color }]) => (
                <div key={key} className="flex items-center gap-1.5 text-xs">
                  <div className={`h-2 w-2 rounded-full ${color.split(" ")[0].replace("text-", "bg-")}`} />
                  <span className="text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {testPages.length === 0 ? (
          <div className="text-center py-16">
            <FileQuestion className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No test pages found</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Create a new folder in <code className="bg-muted px-1.5 py-0.5 rounded">app/admin/tests/</code> with a{" "}
              <code className="bg-muted px-1.5 py-0.5 rounded">page.tsx</code> file to add a test page.
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {categories.map(category => (
              <section key={category}>
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  {category}
                </h2>
                <div className="grid gap-4">
                  {testPages
                    .filter(t => t.category === category)
                    .map(test => <TestCard key={test.href} test={test} />)}
                </div>
              </section>
            ))}
          </div>
        )}

        <section className="mt-12 p-6 rounded-xl bg-muted/30 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-foreground">Adding a new test page</h3>
            <CopyButton text={testPageTemplate} />
          </div>
          <pre className="text-xs bg-background p-4 rounded-lg overflow-x-auto border border-border font-mono">
            {testPageTemplate}
          </pre>
          <p className="text-sm text-muted-foreground mt-2">
            Create test pages in <code className="bg-muted px-1.5 py-0.5 rounded">app/admin/tests/</code> with this metadata
          </p>
        </section>

        <section className="mt-8 p-6 rounded-xl bg-primary/5 border border-primary/20">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground mb-1">Documentation</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Learn how to create test pages, use metadata, and organize your tests.
              </p>
              <Link
                href="/admin/docs-viewer/test-pages"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                View Test Pages Documentation →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function TestCard({ test }: { test: TestPage }) {
  const { label, color, icon: StatusIcon } = statusConfig[test.status]

  return (
    <Link
      href={test.href}
      className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
            <FlaskConical className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
              {test.name}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{test.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${color}`}>
            <StatusIcon className="h-3 w-3" />
            {label}
          </span>
          <svg
            className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
      
      {test.features.length > 0 && (
        <div className="pt-4 border-t border-border">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Features Testing
          </p>
          <div className="flex flex-wrap gap-2">
            {test.features.map(feature => (
              <span key={feature} className="text-xs px-2.5 py-1 rounded-md bg-muted text-muted-foreground">
                {feature}
              </span>
            ))}
          </div>
        </div>
      )}
    </Link>
  )
}