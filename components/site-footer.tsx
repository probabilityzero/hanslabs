import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const footerLinks = {
  expertise: [
    { name: "AI & Machine Learning", href: "/expertise#ai-ml" },
    { name: "Full-Stack Development", href: "/expertise#fullstack" },
    { name: "Cloud Architecture", href: "/expertise#cloud" },
    { name: "System Design", href: "/expertise#system-design" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ],
  resources: [
    { name: "Blog", href: "/blog" },
    { name: "Documentation", href: "/docs" },
    { name: "Research", href: "/research" },
  ],
  social: [
    { name: "GitHub", href: "https://github.com/hanslabs" },
    { name: "LinkedIn", href: "https://linkedin.com/company/hanslabs" },
    { name: "Twitter", href: "https://twitter.com/hanslabs" },
  ],
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo-200px.png"
                alt="Han's Labs Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="font-semibold text-foreground">Han's Labs</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Building intelligent solutions at the intersection of AI and software engineering.
            </p>
          </div>

          {/* Expertise */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Expertise</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.expertise.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Resources</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Connect</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.social.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    {link.name}
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="m-2 mr-6 flex justify-end">
          <ThemeToggle />
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              © {new Date().getFullYear()} Han's Labs. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
