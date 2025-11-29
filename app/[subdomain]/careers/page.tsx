import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { JobsList } from "@/components/jobs-list"
import { jobPostings, getAllDepartments } from "@/lib/careers-data"
import { Users, Lightbulb, Rocket, Heart } from "lucide-react"

export const metadata = {
  title: "Careers | Han's Labs",
  description: "Join Han's Labs and work on cutting-edge research and engineering projects.",
}

const values = [
  {
    icon: Lightbulb,
    title: "Research-First",
    description: "We believe deep understanding leads to better solutions. Every project starts with curiosity.",
  },
  {
    icon: Rocket,
    title: "Ship to Learn",
    description: "We build to discover. Prototypes aren't just demos—they're how we validate ideas.",
  },
  {
    icon: Users,
    title: "Diverse Perspectives",
    description: "The best teams combine different backgrounds, skills, and ways of thinking.",
  },
  {
    icon: Heart,
    title: "Craft Matters",
    description: "We care about quality at every level, from algorithms to interfaces to documentation.",
  },
]

const hiringProcess = [
  { step: "Application Review", description: "We review your resume and any work samples you share." },
  { step: "Intro Call", description: "30-minute call to learn about your background and interests." },
  { step: "Technical Interview", description: "Deep dive into your expertise with domain experts." },
  { step: "Take-Home Project", description: "A realistic problem that showcases your skills." },
  { step: "Final Round", description: "Meet the team and discuss your project." },
  { step: "Offer", description: "Competitive offer with equity and benefits." },
]

export default function CareersPage() {
  const departments = getAllDepartments()

  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* Hero */}
        <section className="py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold text-primary uppercase tracking-wide">Careers</p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                Build the future with us
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
                Join a team of world-class researchers and engineers working on some of the most challenging problems in
                technology.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 lg:py-24 bg-card/50 border-y border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground">Our Culture</h2>
              <p className="mt-4 text-muted-foreground">What makes Han's Labs different</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <div key={value.title} className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                    <value.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <JobsList jobs={jobPostings} departments={departments} />

        {/* Hiring Process */}
        <section className="py-16 lg:py-24 bg-card/50 border-t border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground">How We Hire</h2>
              <p className="mt-4 text-muted-foreground">
                Our hiring process is designed to be thorough but respectful of your time
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

                <div className="space-y-8">
                  {hiringProcess.map((step, index) => (
                    <div key={step.step} className="relative flex gap-6">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold relative z-10">
                        {index + 1}
                      </div>
                      <div className="flex-1 pb-4">
                        <h3 className="font-semibold text-foreground">{step.step}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
