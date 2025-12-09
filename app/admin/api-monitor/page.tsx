import fs from "fs"
import path from "path"
import { 
  Globe, 
  CheckCircle2, 
  Clock, 
  Zap, 
  Shield,
  ExternalLink,
  AlertCircle
} from "lucide-react"
import { CopyButton } from "../../../components/copy-button"
import { BackLink } from "@/components/breadcrumb"

export const metadata = {
  title: "API Routes | Han's Labs Admin",
  description: "Manage and monitor API endpoints",
  robots: "noindex, nofollow",
}

interface APIRoute {
  method: string[]
  path: string
  name: string
  file: string
}

interface EnvVariable {
  name: string
  description: string
  required: boolean
  sensitive: boolean
  isSet: boolean
}

async function getAPIRoutes(): Promise<APIRoute[]> {
  const apiDir = path.join(process.cwd(), "app", "api")
  const routes: APIRoute[] = []

  function scanDirectory(dir: string, basePath: string = "/api") {
    if (!fs.existsSync(dir)) return

    const items = fs.readdirSync(dir, { withFileTypes: true })

    for (const item of items) {
      const fullPath = path.join(dir, item.name)

      if (item.isDirectory()) {
        // Handle dynamic routes [param]
        const routeSegment = item.name.startsWith("[") 
          ? `:${item.name.slice(1, -1)}` 
          : item.name
        scanDirectory(fullPath, `${basePath}/${routeSegment}`)
      } else if (item.name === "route.ts" || item.name === "route.js") {
        const content = fs.readFileSync(fullPath, "utf-8")
        const methods: string[] = []

        // Detect HTTP methods from exports
        if (content.includes("export async function GET") || content.includes("export function GET")) {
          methods.push("GET")
        }
        if (content.includes("export async function POST") || content.includes("export function POST")) {
          methods.push("POST")
        }
        if (content.includes("export async function PUT") || content.includes("export function PUT")) {
          methods.push("PUT")
        }
        if (content.includes("export async function PATCH") || content.includes("export function PATCH")) {
          methods.push("PATCH")
        }
        if (content.includes("export async function DELETE") || content.includes("export function DELETE")) {
          methods.push("DELETE")
        }

        if (methods.length > 0) {
          // Generate a name from the path
          const name = basePath
            .replace("/api/", "")
            .split("/")
            .map(segment => {
              if (segment.startsWith(":")) {
                return `[${segment.slice(1)}]`
              }
              return segment.charAt(0).toUpperCase() + segment.slice(1)
            })
            .join(" ")
            || "Root"

          routes.push({
            method: methods,
            path: basePath,
            name: name,
            file: fullPath.replace(process.cwd(), ""),
          })
        }
      }
    }
  }

  scanDirectory(apiDir)
  return routes.sort((a, b) => a.path.localeCompare(b.path))
}

function getEnvVariables(): EnvVariable[] {
  const envVars: EnvVariable[] = [
    {
      name: "TELEGRAM_BOT_TOKEN",
      description: "Bot token from @BotFather",
      required: true,
      sensitive: true,
      isSet: !!process.env.TELEGRAM_BOT_TOKEN,
    },
    {
      name: "TELEGRAM_CHAT_ID",
      description: "Chat/Group ID for notifications",
      required: true,
      sensitive: false,
      isSet: !!process.env.TELEGRAM_CHAT_ID,
    },
    {
      name: "ADMIN_ACCESS_CODE",
      description: "Admin panel access code",
      required: true,
      sensitive: true,
      isSet: !!process.env.ADMIN_ACCESS_CODE,
    },
  ]

  return envVars
}

export default async function APIRoutesPage() {
  const apiRoutes = await getAPIRoutes()
  const envVariables = getEnvVariables()
  const configuredEnvCount = envVariables.filter(e => e.isSet).length

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <BackLink href="/admin" label="admin" />

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-primary/10">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                API Monitor
              </h1>
              <p className="text-muted-foreground">
                Real-time view of your API endpoints
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-card border border-border">
            <div className="text-2xl font-bold text-foreground">{apiRoutes.length}</div>
            <div className="text-sm text-muted-foreground">Active Endpoints</div>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border">
            <div className="text-2xl font-bold text-foreground">
              {configuredEnvCount}/{envVariables.length}
            </div>
            <div className="text-sm text-muted-foreground">Env Variables Set</div>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border">
            <div className="text-2xl font-bold text-green-500">Healthy</div>
            <div className="text-sm text-muted-foreground">System Status</div>
          </div>
        </div>

        <div className="grid gap-8">
          {/* Active Routes */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">
                Active Endpoints
              </h2>
              <span className="text-sm text-muted-foreground">
                Auto-discovered from /app/api
              </span>
            </div>
            
            {apiRoutes.length === 0 ? (
              <div className="p-8 rounded-xl bg-card border border-border text-center">
                <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No API routes found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {apiRoutes.map((route) => (
                  <APIRouteCard key={route.path} route={route} />
                ))}
              </div>
            )}
          </section>

          {/* Environment Variables */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Environment Variables
            </h2>
            <div className="rounded-xl border border-border overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-card border-b border-border">
                    <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">Variable</th>
                    <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3 hidden sm:table-cell">Description</th>
                    <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {envVariables.map((env) => (
                    <tr key={env.name} className="border-b border-border last:border-0">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <code className="text-sm font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                            {env.name}
                          </code>
                          {env.sensitive && (
                            <Shield className="h-3.5 w-3.5 text-amber-500" />
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground hidden sm:table-cell">
                        {env.description}
                      </td>
                      <td className="px-4 py-3">
                        <EnvStatus isSet={env.isSet} required={env.required} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Quick Reference */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Quick Reference
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="font-medium text-foreground">Base URL</span>
                </div>
                <code className="text-sm text-muted-foreground font-mono">
                  {process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}
                </code>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="font-medium text-foreground">Rate Limiting</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Per-IP throttling enabled
                </span>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="font-medium text-foreground">Timeout</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  30s (Vercel default)
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

function APIRouteCard({ route }: { route: APIRoute }) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex gap-1.5">
              {route.method.map((method) => (
                <MethodBadge key={method} method={method} />
              ))}
            </div>
            <code className="text-base sm:text-lg font-mono text-foreground">
              {route.path}
            </code>
          </div>
          <span className="flex items-center gap-1.5 text-sm text-green-500">
            <CheckCircle2 className="h-4 w-4" />
            Active
          </span>
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-2">
          {route.name}
        </h3>
        
        <code className="text-xs text-muted-foreground font-mono bg-background px-2 py-1 rounded">
          {route.file}
        </code>
      </div>

      <div className="px-4 sm:px-6 py-3 bg-background border-t border-border flex flex-wrap items-center gap-2">
        <a
          href={route.path}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border hover:border-primary/50 text-sm font-medium text-muted-foreground hover:text-foreground transition-all"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Open
        </a>
        <CopyButton text={route.path} />
      </div>
    </div>
  )
}

function MethodBadge({ method, muted }: { method: string; muted?: boolean }) {
  const colors: Record<string, string> = {
    GET: muted ? "bg-emerald-500/10 text-emerald-500/60" : "bg-emerald-500/20 text-emerald-500",
    POST: muted ? "bg-blue-500/10 text-blue-500/60" : "bg-blue-500/20 text-blue-500",
    PUT: muted ? "bg-amber-500/10 text-amber-500/60" : "bg-amber-500/20 text-amber-500",
    PATCH: muted ? "bg-orange-500/10 text-orange-500/60" : "bg-orange-500/20 text-orange-500",
    DELETE: muted ? "bg-red-500/10 text-red-500/60" : "bg-red-500/20 text-red-500",
  }

  return (
    <span className={`px-2 py-1 rounded text-xs font-bold font-mono ${colors[method] || "bg-gray-500/20 text-gray-500"}`}>
      {method}
    </span>
  )
}

function EnvStatus({ isSet, required }: { isSet: boolean; required: boolean }) {
  if (isSet) {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm text-green-500">
        <CheckCircle2 className="h-4 w-4" />
        Configured
      </span>
    )
  }

  if (required) {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm text-red-500">
        <AlertCircle className="h-4 w-4" />
        Missing
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
      <Clock className="h-4 w-4" />
      Optional
    </span>
  )
}