const stats = [
  { label: "Research Papers", value: "24+" },
  { label: "Production Projects", value: "40+" },
  { label: "Enterprise Partners", value: "12" },
  { label: "Open Source Repos", value: "50+" },
]

export function StatsSection() {
  return (
    <section className="py-16 bg-card/50 border-y border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-gradient lg:text-5xl">{stat.value}</div>
              <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
