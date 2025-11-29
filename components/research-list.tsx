"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ResearchArticle } from "@/lib/research-data"

interface ResearchListProps {
  articles: ResearchArticle[]
  tags: string[]
}

export function ResearchList({ articles, tags }: ResearchListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filteredArticles = selectedTag ? articles.filter((a) => a.tags.includes(selectedTag)) : articles

  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Filter */}
        <div className="mb-12 flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground mr-2">Filter:</span>
          <Button variant={selectedTag === null ? "default" : "outline"} size="sm" onClick={() => setSelectedTag(null)}>
            All
          </Button>
          {tags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>

        {/* Articles */}
        <div className="space-y-8">
          {filteredArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/research/${article.slug}`}
              className="group block p-6 lg:p-8 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
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
                  </div>

                  <h2 className="text-xl lg:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {article.title}
                  </h2>

                  <p className="mt-3 text-muted-foreground line-clamp-2">{article.abstract}</p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-md bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 text-sm text-muted-foreground">
                    By {article.authors.map((a) => a.name).join(", ")}
                  </div>
                </div>

                <div className="flex items-center text-primary">
                  <span className="text-sm font-medium mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    Read article
                  </span>
                  <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
