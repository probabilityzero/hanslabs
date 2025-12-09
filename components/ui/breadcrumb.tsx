import Link from "next/link"
import { ArrowLeft, ChevronRight } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav className={`flex items-center gap-2 text-sm mb-8 ${className}`}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        
        return (
          <div key={item.label} className="flex items-center gap-2">
            {index === 0 && item.href && (
              <Link
                href={item.href}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                {item.label}
              </Link>
            )}
            
            {index > 0 && (
              <>
                <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-foreground font-medium">
                    {item.label}
                  </span>
                )}
              </>
            )}
          </div>
        )
      })}
    </nav>
  )
}

// Simple back link variant
interface BackLinkProps {
  href: string
  label?: string
  className?: string
}

export function BackLink({ href, label = "Back", className = "" }: BackLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group ${className}`}
    >
      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
      Back to {label}
    </Link>
  )
}