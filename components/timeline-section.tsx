const milestones = [
  {
    year: "2019",
    title: "Founded",
    description: "Han's Labs established as a research-focused engineering consultancy.",
  },
  {
    year: "2020",
    title: "First Major Partnership",
    description: "Signed enterprise partnership with Fortune 500 client for AI infrastructure.",
  },
  {
    year: "2021",
    title: "FrameDB Launch",
    description: "Released first open-source project, gaining 5K+ GitHub stars in first month.",
  },
  {
    year: "2022",
    title: "Research Lab Expansion",
    description: "Opened dedicated research facility and doubled team size.",
  },
  {
    year: "2023",
    title: "Series A Funding",
    description: "Raised $12M to accelerate product development and expand capabilities.",
  },
  {
    year: "2024",
    title: "Global Reach",
    description: "Serving clients across 15 countries with distributed engineering teams.",
  },
]

export function TimelineSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">Our Journey</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Milestones</h2>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border lg:left-1/2 lg:-translate-x-1/2" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex items-start gap-6 lg:gap-12 ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 w-3 h-3 rounded-full bg-primary ring-4 ring-background" />

                  {/* Content */}
                  <div className={`flex-1 ml-12 lg:ml-0 ${index % 2 === 0 ? "lg:text-right lg:pr-12" : "lg:pl-12"}`}>
                    <span className="text-sm font-mono text-primary">{milestone.year}</span>
                    <h3 className="mt-1 text-lg font-semibold text-foreground">{milestone.title}</h3>
                    <p className="mt-2 text-muted-foreground">{milestone.description}</p>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden lg:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
