"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Check, Send } from "lucide-react"

interface JobApplicationFormProps {
  jobTitle: string
}

export function JobApplicationForm({ jobTitle }: JobApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [resumeFile, setResumeFile] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setResumeFile(file.name)
    }
  }

  if (isSubmitted) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 text-green-400 mb-4">
          <Check className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Application Sent!</h3>
        <p className="text-sm text-muted-foreground">We'll review your application and get back to you soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Apply for this role</h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="apply-name">Name *</Label>
          <Input id="apply-name" name="name" placeholder="Your name" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="apply-email">Email *</Label>
          <Input id="apply-email" name="email" type="email" placeholder="you@email.com" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="apply-linkedin">LinkedIn</Label>
          <Input id="apply-linkedin" name="linkedin" placeholder="linkedin.com/in/you" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="apply-portfolio">Portfolio / GitHub</Label>
          <Input id="apply-portfolio" name="portfolio" placeholder="github.com/you" />
        </div>

        <div className="space-y-2">
          <Label>Resume *</Label>
          <div className="relative">
            <input
              type="file"
              id="apply-resume"
              name="resume"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept=".pdf,.doc,.docx"
              required
            />
            <div className="flex items-center gap-2 p-3 rounded-lg border border-dashed border-border hover:border-primary/50 transition-colors">
              <Upload className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground truncate">{resumeFile || "Upload resume (PDF, DOC)"}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="apply-message">Why this role?</Label>
          <Textarea
            id="apply-message"
            name="message"
            placeholder="Tell us why you're excited about this opportunity..."
            rows={4}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            "Submitting..."
          ) : (
            <>
              Submit Application
              <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
