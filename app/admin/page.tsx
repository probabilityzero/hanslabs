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
  Key
} from "lucide-react"

export const metadata = {
  title: "Admin | Han's Labs",
  description: "Internal admin dashboard for Han's Labs",
  robots: "noindex, nofollow",
}

const adminSections = [
  {
    title: "Content",
    items: [
      {
        name: "Documentation",
        description: "View and manage internal docs",
        href: "/admin/docs-viewer",
        icon: FileText,
        status: "active",
      },
      {
        name: "Messages",
        description: "View contact form submissions",
        href: "/admin/messages",
        icon: MessageSquare,
        status: "coming",
      },
      {
        name: "Newsletter",
        description: "Manage subscribers and campaigns",
        href: "/admin/newsletter",
        icon: Mail,
        status: "coming",
      },
    ],
  },
  {
    title: "Analytics",
    items: [
      {
        name: "Dashboard",
        description: "Site analytics and metrics",
        href: "/admin/analytics",
        icon: BarChart3,
        status: "coming",
      },
      {
        name: "Visitors",
        description: "Traffic and visitor insights",
        href: "/admin/visitors",
        icon: Users,
        status: "coming",
      },
      {
        name: "Events",
        description: "Track user interactions",
        href: "/admin/events",
        icon: Bell,
        status: "coming",
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        name: "General",
        description: "Site configuration and preferences",
        href: "/admin/settings",
        icon: Settings,
        status: "coming",
      },
      {
        name: "Appearance",
        description: "Theme and design settings",
        href: "/admin/appearance",
        icon: Palette,
        status: "coming",
      },
      {
        name: "SEO",
        description: "Meta tags and search optimization",
        href: "/admin/seo",
        icon: Globe,
        status: "coming",
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        name: "API Routes",
        description: "View and monitor API endpoints",
        href: "/admin/api-monitor",
        icon: Key,
        status: "active",
      },
      {
        name: "Database",
        description: "Data management and backups",
        href: "/admin/database",
        icon: Database,
        status: "coming",
      },
      {
        name: "Security",
        description: "Access logs and security settings",
        href: "/admin/security",
        icon: Shield,
        status: "coming",
      },
    ],
  },
]

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Internal
            </span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Admin Dashboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Manage your site content, view analytics, and configure settings.
          </p>
        </div>

        <div className="space-y-12">
          {adminSections.map((section) => (
            <div key={section.title}>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                {section.title}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.items.map((item) => (
                  <AdminCard key={item.name} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-6 rounded-xl bg-card border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Quick Actions
          </h3>
          <div className="flex flex-wrap gap-3 mt-4">
            <QuickAction href="/admin/docs" label="View Docs" />
            <QuickAction href="/" label="View Site" external />
            <QuickAction href="/company/contact" label="Test Contact Form" external />
          </div>
        </div>
      </div>
    </div>
  )
}

function AdminCard({ item }: { item: typeof adminSections[0]["items"][0] }) {
  const isActive = item.status === "active"
  
  if (!isActive) {
    return (
      <div className="group p-6 rounded-xl bg-card/50 border border-border/50 opacity-60 cursor-not-allowed">
        <div className="flex items-start justify-between mb-4">
          <div className="p-2.5 rounded-lg bg-muted">
            <item.icon className="h-5 w-5 text-muted-foreground" />
          </div>
          <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
            Coming Soon
          </span>
        </div>
        <h3 className="text-lg font-semibold text-muted-foreground mb-1">
          {item.name}
        </h3>
        <p className="text-sm text-muted-foreground/70">
          {item.description}
        </p>
      </div>
    )
  }

  return (
    <a
      href={item.href}
      className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <item.icon className="h-5 w-5 text-primary" />
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
        {item.name}
      </h3>
      <p className="text-sm text-muted-foreground">
        {item.description}
      </p>
    </a>
  )
}

function QuickAction({ href, label, external }: { href: string; label: string; external?: boolean }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium"
    >
      {label}
      {external && (
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      )}
    </a>
  )
}