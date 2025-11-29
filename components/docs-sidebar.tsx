"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { docsCategories, getDocsByCategory } from "@/lib/docs-data"
import { cn } from "@/lib/utils"

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-32 space-y-8">
        {docsCategories.map((category) => {
          const pages = getDocsByCategory(category.id)

          return (
            <div key={category.id}>
              <h4 className="text-sm font-semibold text-foreground mb-3">{category.name}</h4>
              <nav className="space-y-1">
                {pages.map((page) => {
                  const isActive = pathname === `/docs/${page.slug}`

                  return (
                    <Link
                      key={page.slug}
                      href={`/docs/${page.slug}`}
                      className={cn(
                        "block text-sm py-1.5 px-3 rounded-md transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                      )}
                    >
                      {page.title}
                    </Link>
                  )
                })}
              </nav>
            </div>
          )
        })}
      </div>
    </aside>
  )
}
