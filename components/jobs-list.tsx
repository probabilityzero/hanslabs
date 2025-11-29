"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPin, DollarSign, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { JobPosting } from "@/lib/careers-data"

interface JobsListProps {
  jobs: JobPosting[]
  departments: string[]
}

export function JobsList({ jobs, departments }: JobsListProps) {
  const [selectedDept, setSelectedDept] = useState<string | null>(null)

  const filteredJobs = selectedDept ? jobs.filter((j) => j.department === selectedDept) : jobs

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Open Positions</h2>
            <p className="mt-2 text-muted-foreground">
              {jobs.length} roles across {departments.length} departments
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedDept === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDept(null)}
            >
              All
            </Button>
            {departments.map((dept) => (
              <Button
                key={dept}
                variant={selectedDept === dept ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDept(dept)}
              >
                {dept}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <Link
              key={job.slug}
              href={`/careers/${job.slug}`}
              className="group block p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge variant="secondary">{job.department}</Badge>
                    <Badge variant="outline" className="capitalize">
                      {job.type}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {job.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </span>
                    {job.salary && (
                      <span className="flex items-center gap-1.5">
                        <DollarSign className="h-4 w-4" />
                        {job.salary}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center text-primary">
                  <span className="text-sm font-medium mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    View role
                  </span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No positions available in this department.</p>
            <Button variant="outline" className="mt-4 bg-transparent" onClick={() => setSelectedDept(null)}>
              View all positions
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
