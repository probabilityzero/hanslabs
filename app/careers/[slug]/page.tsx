import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, MapPin, DollarSign, Briefcase } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Badge } from "@/components/ui/badge"
import { jobPostings, getJobBySlug } from "@/lib/careers-data"
import { JobApplicationForm } from "@/components/job-application-form"

export async function generateStaticParams() {
  return jobPostings.map((job) => ({
    slug: job.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const job = getJobBySlug(slug)

  if (!job) {
    return { title: "Job Not Found | Han's Labs" }
  }

  return {
    title: `${job.title} | Han's Labs Careers`,
    description: job.description,
  }
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const job = getJobBySlug(slug)

  if (!job) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-20">
        {/* Header */}
        <section className="py-16 lg:py-24 border-b border-border">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <Link
              href="/careers"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Careers
            </Link>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="secondary">{job.department}</Badge>
              <Badge variant="outline" className="capitalize">
                {job.type}
              </Badge>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">{job.title}</h1>

            <div className="flex flex-wrap items-center gap-6 mt-6 text-muted-foreground">
              <span className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {job.location}
              </span>
              {job.salary && (
                <span className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  {job.salary}
                </span>
              )}
              <span className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                <span className="capitalize">{job.type}</span>
              </span>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-12">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">About the Role</h2>
                  <p className="text-muted-foreground leading-relaxed">{job.description}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Responsibilities</h2>
                  <ul className="space-y-3">
                    {job.responsibilities.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-muted-foreground">
                        <span className="text-primary mt-1.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Requirements</h2>
                  <ul className="space-y-3">
                    {job.requirements.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-muted-foreground">
                        <span className="text-primary mt-1.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {job.niceToHave && job.niceToHave.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-4">Nice to Have</h2>
                    <ul className="space-y-3">
                      {job.niceToHave.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-muted-foreground">
                          <span className="text-primary mt-1.5">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Benefits</h2>
                  <ul className="space-y-3">
                    {job.benefits.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-muted-foreground">
                        <span className="text-green-400 mt-1.5">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar - Application Form */}
              <div>
                <div className="sticky top-24">
                  <JobApplicationForm jobTitle={job.title} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
