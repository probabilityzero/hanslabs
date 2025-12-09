import { FadeIn, FadeUp } from "@/components/hero-transitions"
import { 
  FileText, 
  Settings, 
  MessageSquare, 
  BarChart3, 
  Bell, 
  Users, 
  Shield, 
  Database,
  Palette,
  Globe,
  Mail,
  Key,
  FlaskConical,
  Layers,
  Bug,
  BookOpen
} from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Admin | Han's Labs",
  description: "Internal admin dashboard for Han's Labs",
  robots: "noindex, nofollow",
}

const adminSections = [
  {
    title: "Development",
    description: "Tools for development and testing",
    items: [
      {
        name: "Documentation",
        description: "Internal docs and guides",
        href: "/admin/docs-viewer",
        icon: FileText,
        status: "active",
      },
      {
        name: "API Monitor",
        description: "View and test API endpoints",
        href: "/admin/api-monitor",
        icon: Key,
        status: "active",
      },
      {
        name: "Test Pages",
        description: "Component and feature test pages",
        href: "/admin/tests",
        icon: FlaskConical,
        status: "active",
      },
    ],
  },
  {
    title: "Content Management",
    description: "Manage site content and communications",
    items: [
      {
        name: "Messages",
        description: "Contact form submissions",
        href: "/admin/messages",
        icon: MessageSquare,
        status: "coming",
      },
      {
        name: "Newsletter",
        description: "Subscribers and campaigns",
        href: "/admin/newsletter",
        icon: Mail,
        status: "coming",
      },
      {
        name: "Projects",
        description: "Manage showcase projects",
        href: "/admin/projects",
        icon: Layers,
        status: "coming",
      },
    ],
  },
  {
    title: "Analytics & Monitoring",
    description: "Track site performance and usage",
    items: [
      {
        name: "Dashboard",
        description: "Overview and key metrics",
        href: "/admin/analytics",
        icon: BarChart3,
        status: "coming",
      },
      {
        name: "Visitors",
        description: "Traffic and user insights",
        href: "/admin/visitors",
        icon: Users,
        status: "coming",
      },
      {
        name: "Events",
        description: "User interaction tracking",
        href: "/admin/events",
        icon: Bell,
        status: "coming",
      },
    ],
  },
  {
    title: "Configuration",
    description: "Site settings and system config",
    items: [
      {
        name: "General",
        description: "Site configuration",
        href: "/admin/settings",
        icon: Settings,
        status: "coming",
      },
      {
        name: "Appearance",
        description: "Theme and design",
        href: "/admin/appearance",
        icon: Palette,
        status: "coming",
      },
      {
        name: "SEO",
        description: "Search optimization",
        href: "/admin/seo",
        icon: Globe,
        status: "coming",
      },
      {
        name: "Database",
        description: "Data and backups",
        href: "/admin/database",
        icon: Database,
        status: "coming",
      },
      {
        name: "Security",
        description: "Access and logs",
        href: "/admin/security",
        icon: Shield,
        status: "coming",
      },
    ],
  },
]

const quickLinks = [
  { href: "/admin/docs-viewer", label: "Documentation", icon: BookOpen },
  { href: "/admin/api-monitor", label: "API Monitor", icon: Key },
  { href: "/admin/tests", label: "Test Pages", icon: FlaskConical },
  { href: "/", label: "View Site", icon: Globe, external: true },
]

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Internal
            </span>
          </div>
          <FadeUp>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Development tools, documentation, and site management.
          </p>
          </FadeUp>
        </div>

        {/* Quick Access */}
        <div className="mb-12 p-6 rounded-xl bg-card border border-border">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Quick Access
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all group"
              >
                <div className="p-2 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <link.icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {link.label}
                </span>
                {link.external && (
                  <svg className="h-3 w-3 text-muted-foreground ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {adminSections.map((section) => (
            <div key={section.title}>
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-foreground">
                  {section.title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {section.description}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.items.map((item) => (
                  <AdminCard key={item.name} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Status Legend */}
        <div className="mt-16 p-6 rounded-xl bg-muted/30 border border-border">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Status Legend
          </h3>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-sm text-muted-foreground">Active - Ready to use</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-amber-500" />
              <span className="text-sm text-muted-foreground">In Progress - Under development</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-muted-foreground/50" />
              <span className="text-sm text-muted-foreground">Coming Soon - Planned</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AdminCard({ item }: { item: typeof adminSections[0]["items"][0] }) {
  const isActive = item.status === "active"
  const isInProgress = item.status === "progress"
  
  if (!isActive && !isInProgress) {
    return (
      <div className="group p-6 rounded-xl bg-card/50 border border-border/50 opacity-60 cursor-not-allowed">
        <div className="flex items-start justify-between mb-4">
          <div className="p-2.5 rounded-lg bg-muted">
            <item.icon className="h-5 w-5 text-muted-foreground" />
          </div>
          <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
            Soon
          </span>
        </div>
        <h3 className="text-base font-semibold text-muted-foreground mb-2">
          {item.name}
        </h3>
        <p className="text-sm text-muted-foreground/70 leading-relaxed">
          {item.description}
        </p>
      </div>
    )
  }

  return (
    <Link
      href={item.href}
      className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <item.icon className="h-5 w-5 text-primary" />
        </div>
        <div className="flex items-center gap-2">
          {isInProgress && (
            <span className="text-xs font-medium text-amber-600 bg-amber-500/10 px-2.5 py-1 rounded-full">
              WIP
            </span>
          )}
          <svg
            className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
      <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
        {item.name}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {item.description}
      </p>
    </Link>
  )
}