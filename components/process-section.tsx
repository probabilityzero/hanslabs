import { Search, Lightbulb, Code, Rocket } from "lucide-react"

const steps = [
  {
    name: "Research",
    description:
      "Deep dive into the problem space. We analyze existing solutions, identify gaps, and formulate hypotheses.",
    icon: Search,
  },
  {
    name: "Prototype",
    description:
      "Build fast, fail fast. We create functional POCs to validate ideas and explore technical feasibility.",
    icon: Lightbulb,
  },
  {
    name: "Develop",
    description:
      "Engineering excellence. We architect, build, and test production-grade systems with rigorous standards.",
    icon: Code,
  },
  {
    name: "Deploy",
    description: "Launch and iterate. We deploy, monitor, and continuously improve based on real-world feedback.",
    icon: Rocket,
  },
]

export function ProcessSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">Our Process</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Research → Prototype → Product
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            A systematic approach to turning complex ideas into production-ready solutions.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="relative">
            {/* Connection line */}
            <div className="absolute top-12 left-0 right-0 h-0.5 bg-border hidden lg:block" />

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <div key={step.name} className="relative flex flex-col items-center text-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-card border border-border relative z-10">
                    <step.icon className="h-10 w-10 text-primary" />
                  </div>
                  <span className="mt-4 text-sm font-medium text-primary">0{index + 1}</span>
                  <h3 className="mt-2 text-lg font-semibold text-foreground">{step.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
