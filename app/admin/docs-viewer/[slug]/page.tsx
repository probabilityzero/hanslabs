import fs from "fs"
import path from "path"
import { notFound } from "next/navigation"
import { remark } from "remark"
import html from "remark-html"
import remarkGfm from "remark-gfm"
import { codeToHtml } from "shiki"
import { ArrowLeft } from "lucide-react"
import { BackLink } from "@/components/breadcrumb"

interface Props {
  params: Promise<{ slug: string }>
}

async function highlightCode(content: string) {
  const codeBlockRegex = /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g
  
  let result = content
  const matches = [...content.matchAll(codeBlockRegex)]
  
  for (const match of matches) {
    const [fullMatch, lang, code] = match
    const decodedCode = code
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
    
    try {
      const highlighted = await codeToHtml(decodedCode.trim(), {
        lang: lang || "text",
        theme: "github",
      })
      result = result.replace(fullMatch, highlighted)
    } catch {
      continue
    }
  }
  
  return result
}

async function getDocContent(slug: string) {
  const docsDir = path.join(process.cwd(), "docs")
  
  if (!fs.existsSync(docsDir)) {
    return null
  }
  
  const files = fs.readdirSync(docsDir).filter(file => file.endsWith(".md"))
  
  const matchedFile = files.find(
    file => file.replace(".md", "").toLowerCase() === slug.toLowerCase()
  )
  
  if (!matchedFile) {
    return null
  }
  
  const filePath = path.join(docsDir, matchedFile)
  const rawContent = fs.readFileSync(filePath, "utf-8")
  
  const processed = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(rawContent)
  
  const contentWithHighlighting = await highlightCode(processed.toString())
  
  return {
    name: matchedFile.replace(".md", ""),
    content: contentWithHighlighting,
  }
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const doc = await getDocContent(slug)
  
  return {
    title: doc ? `${doc.name} | Han's Labs Docs` : "Not Found",
    robots: "noindex, nofollow",
  }
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params
  const doc = await getDocContent(slug)

  if (!doc) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <BackLink href="/admin/docs-viewer" label="docs" />
        <article 
          className="doc-content"
          dangerouslySetInnerHTML={{ __html: doc.content }}
        />
      </div>
    </div>
  )
}