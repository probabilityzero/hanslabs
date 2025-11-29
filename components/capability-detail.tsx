import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface Service {
  name: string
  description: string
  icon: LucideIcon
}

interface CapabilityProps {
  capability: {
    id: string
    title: string
    description: string
    icon: LucideIcon
    services: Service[]
    deliverables: string[]
    engagement: string
    clients: string[]
  }
  reversed?: boolean
}

export function CapabilityDetail({ capability, reversed = false }: CapabilityProps) {
  const Icon = capability.icon

  return (
    <section id={capability.id} className={cn("py-24 lg:py-32 border-t border-border", reversed && "bg-card/50")}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-7 w-7" />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">{capability.title}</h2>
            <p className="text-lg text-muted-foreground">{capability.description}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-foreground mb-6">Services</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {capability.services.map((service) => {
                const ServiceIcon = service.icon
                return (
                  <div
                    key={service.name}
                    className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
                  >
                    <ServiceIcon className="h-6 w-6 text-primary mb-4" />
                    <h4 className="font-semibold text-foreground">{service.name}</h4>
                    <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Sidebar info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Deliverables</h3>
              <ul className="space-y-2">
                {capability.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Engagement Model</h3>
              <p className="text-sm text-muted-foreground">{capability.engagement}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Typical Clients</h3>
              <div className="flex flex-wrap gap-2">
                {capability.clients.map((client) => (
                  <span
                    key={client}
                    className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    {client}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
