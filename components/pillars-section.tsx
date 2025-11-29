import { Code2, Palette, Brain } from "lucide-react"
import { cn } from "@/lib/utils"

const pillars = [
  {
    name: "Technology & Engineering",
    description:
      "Backend systems, databases, simulation engines, and embedded systems built for scale and reliability.",
    icon: Code2,
    tags: ["Distributed Systems", "Real-time Processing", "High-Performance Computing"],
  },
  {
    name: "Creative Experiences",
    description: "UI/UX design, 3D environments, interactive narratives, and immersive digital experiences.",
    icon: Palette,
    tags: ["Interactive Design", "3D Visualization", "Motion Graphics"],
  },
  {
    name: "Intelligent Systems",
    description: "Machine learning, probabilistic modeling, MLOps, and AI-powered automation solutions.",
    icon: Brain,
    tags: ["Deep Learning", "NLP", "Computer Vision", "MLOps"],
  },
]

export function PillarsSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">What we do</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Our collection of capabilities spans every stage of the innovation process
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Explore how we help organizations transform ideas into production-ready solutions.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {pillars.map((pillar, index) => (
              <div
                key={pillar.name}
                className={cn(
                  "relative flex flex-col gap-6 rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/50 hover:glow",
                  index === 1 && "lg:-mt-4 lg:mb-4",
                )}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <pillar.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{pillar.name}</h3>
                  <p className="mt-2 text-muted-foreground">{pillar.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {pillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
