"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function TestNav() {
  const pathname = usePathname()

  const links = [
    { href: "/admin", label: "Home" },
    { href: "/admin/tests", label: "Tests" },
    { href: "/admin/tests/one", label: "One" },
    { href: "/admin/tests/two", label: "Two" },
    { href: "/showcase", label: "Showcase" },
  ]

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-card/80 backdrop-blur-md border border-border rounded-full px-2 py-2 shadow-lg">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            pathname === link.href
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}