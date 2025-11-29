interface ArticleContentProps {
  content: string
}

import type { JSX } from "react"

export function ArticleContent({ content }: ArticleContentProps) {
  // Simple markdown-like parsing
  const parseContent = (text: string) => {
    const lines = text.split("\n")
    const elements: JSX.Element[] = []
    let inTable = false
    let tableRows: string[][] = []
    let inCodeBlock = false
    let codeLines: string[] = []
    let codeLanguage = ""

    lines.forEach((line, index) => {
      // Code blocks
      if (line.startsWith("```")) {
        if (!inCodeBlock) {
          inCodeBlock = true
          codeLanguage = line.replace("```", "").trim()
          codeLines = []
        } else {
          inCodeBlock = false
          elements.push(
            <pre key={index} className="my-6 p-4 rounded-xl bg-card border border-border overflow-x-auto">
              <code className="text-sm font-mono text-foreground">{codeLines.join("\n")}</code>
            </pre>,
          )
        }
        return
      }

      if (inCodeBlock) {
        codeLines.push(line)
        return
      }

      // Tables
      if (line.startsWith("|")) {
        if (!inTable) {
          inTable = true
          tableRows = []
        }
        if (!line.includes("---")) {
          const cells = line
            .split("|")
            .filter(Boolean)
            .map((c) => c.trim())
          tableRows.push(cells)
        }
        return
      } else if (inTable) {
        inTable = false
        elements.push(
          <div key={index} className="my-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead>
                <tr className="bg-secondary">
                  {tableRows[0]?.map((cell, i) => (
                    <th key={i} className="px-4 py-2 text-left text-sm font-semibold text-foreground">
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {tableRows.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="px-4 py-2 text-sm text-muted-foreground">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>,
        )
        tableRows = []
      }

      // Headers
      if (line.startsWith("## ")) {
        const text = line.replace("## ", "")
        const id = text.toLowerCase().replace(/\s+/g, "-")
        elements.push(
          <h2 key={index} id={id} className="text-2xl font-bold text-foreground mt-12 mb-4 scroll-mt-24">
            {text}
          </h2>,
        )
        return
      }

      if (line.startsWith("### ")) {
        const text = line.replace("### ", "")
        elements.push(
          <h3 key={index} className="text-xl font-semibold text-foreground mt-8 mb-3">
            {text}
          </h3>,
        )
        return
      }

      // Lists
      if (line.match(/^\d+\.\s/)) {
        const text = line.replace(/^\d+\.\s/, "")
        elements.push(
          <li key={index} className="ml-6 text-muted-foreground list-decimal">
            {parseInlineFormatting(text)}
          </li>,
        )
        return
      }

      if (line.startsWith("- ")) {
        const text = line.replace("- ", "")
        elements.push(
          <li key={index} className="ml-6 text-muted-foreground list-disc">
            {parseInlineFormatting(text)}
          </li>,
        )
        return
      }

      // Empty lines
      if (line.trim() === "") {
        return
      }

      // Regular paragraphs
      elements.push(
        <p key={index} className="text-muted-foreground leading-relaxed mb-4">
          {parseInlineFormatting(line)}
        </p>,
      )
    })

    return elements
  }

  const parseInlineFormatting = (text: string) => {
    // Bold
    let result = text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
    // Inline code
    result = result.replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 rounded bg-secondary text-sm font-mono">$1</code>')

    return <span dangerouslySetInnerHTML={{ __html: result }} />
  }

  return <article className="prose prose-invert max-w-none">{parseContent(content)}</article>
}
