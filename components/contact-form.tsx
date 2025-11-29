"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, Upload, Check } from "lucide-react"

const purposes = [
  { value: "partnership", label: "Partnership Inquiry" },
  { value: "demo", label: "Request a Demo" },
  { value: "hiring", label: "Hiring / Recruitment" },
  { value: "media", label: "Media / Press" },
  { value: "other", label: "Other" },
]

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  if (isSubmitted) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 lg:p-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-400 mb-6">
          <Check className="h-8 w-8" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
        <p className="text-muted-foreground mb-6">
          Thank you for reaching out. Our team will review your inquiry and get back to you within 24 hours.
        </p>
        <Button variant="outline" onClick={() => setIsSubmitted(false)}>
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-8 lg:p-12">
      <div className="grid gap-6">
        {/* Purpose */}
        <div className="space-y-2">
          <Label htmlFor="purpose">What can we help you with?</Label>
          <Select name="purpose" required>
            <SelectTrigger id="purpose">
              <SelectValue placeholder="Select a topic" />
            </SelectTrigger>
            <SelectContent>
              {purposes.map((purpose) => (
                <SelectItem key={purpose.value} value={purpose.value}>
                  {purpose.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Name & Company */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input id="name" name="name" placeholder="Your name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input id="company" name="company" placeholder="Your company" />
          </div>
        </div>

        {/* Email & Phone */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input id="email" name="email" type="email" placeholder="you@company.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <Label htmlFor="message">Message *</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Tell us about your project or inquiry..."
            rows={5}
            required
          />
        </div>

        {/* File Upload */}
        <div className="space-y-2">
          <Label>Attachment (optional)</Label>
          <div className="relative">
            <input
              type="file"
              id="attachment"
              name="attachment"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept=".pdf,.doc,.docx,.ppt,.pptx"
            />
            <div className="flex items-center gap-3 p-4 rounded-lg border border-dashed border-border hover:border-primary/50 transition-colors">
              <Upload className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {fileName || "Upload spec, RFP, or other documents (PDF, DOC, PPT)"}
              </span>
            </div>
          </div>
        </div>

        {/* NDA Checkbox */}
        <div className="flex items-start gap-3">
          <Checkbox id="nda" name="nda" />
          <div className="space-y-1">
            <Label htmlFor="nda" className="text-sm font-normal cursor-pointer">
              Request NDA prior to meeting
            </Label>
            <p className="text-xs text-muted-foreground">
              We'll send you our mutual NDA before any detailed discussions.
            </p>
          </div>
        </div>

        {/* Consent */}
        <div className="flex items-start gap-3">
          <Checkbox id="consent" name="consent" required />
          <Label htmlFor="consent" className="text-sm font-normal cursor-pointer">
            I agree to the processing of my personal data in accordance with the{" "}
            <a href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </a>
            . *
          </Label>
        </div>

        {/* Submit */}
        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? (
            "Sending..."
          ) : (
            <>
              Send Message
              <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
