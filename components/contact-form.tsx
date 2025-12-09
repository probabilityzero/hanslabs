"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, Upload, Check, Loader2, AlertCircle, Info, X, Clock, SendHorizonal } from "lucide-react"

const purposes = [
    { value: "partnership", label: "Partnership Inquiry" },
    { value: "demo", label: "Request a Demo" },
    { value: "hiring", label: "Hiring / Recruitment" },
    { value: "media", label: "Media / Press" },
    { value: "other", label: "Other" },
]

const ALLOWED_FILE_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
    "text/plain",
    "text/csv",
    "application/zip",
    "application/x-rar-compressed",
    "application/json",
]
const MAX_FILE_SIZE = 10 * 1024 * 1024
const MAX_MESSAGE_LENGTH = 5000
const MAX_NAME_LENGTH = 100
const MAX_COMPANY_LENGTH = 100

function sanitizeInput(input: string): string {
    return input
        .replace(/<[^>]*>/g, "")
        .replace(/javascript:/gi, "")
        .replace(/data:/gi, "")
        .replace(/on\w+\s*=/gi, "")
        .replace(/[<>]/g, "")
        .trim()
}

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email) && email.length <= 254
}

function isValidPhone(phone: string): boolean {
    if (!phone) return true
    const phoneRegex = /^[+\d\s\-().]{0,20}$/
    return phoneRegex.test(phone)
}

interface ContactFormProps {
  showResponseTime?: boolean
}

export function ContactForm({ showResponseTime = false }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [fileName, setFileName] = useState<string | null>(null)
  const [purpose, setPurpose] = useState("")
  const [showNdaInfo, setShowNdaInfo] = useState(false)

  const validateForm = (formData: FormData): boolean => {
    const errors: Record<string, string> = {}

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const message = formData.get("message") as string
    const company = formData.get("company") as string
    const file = formData.get("attachment") as File | null

    if (!name || name.length < 2) {
        errors.name = "Name must be at least 2 characters"
    } else if (name.length > MAX_NAME_LENGTH) {
        errors.name = `Name must be less than ${MAX_NAME_LENGTH} characters`
    }

    if (!email || !isValidEmail(email)) {
        errors.email = "Please enter a valid email address"
    }

    if (phone && !isValidPhone(phone)) {
        errors.phone = "Please enter a valid phone number"
    }

    if (!message || message.length < 10) {
        errors.message = "Message must be at least 10 characters"
    } else if (message.length > MAX_MESSAGE_LENGTH) {
        errors.message = `Message must be less than ${MAX_MESSAGE_LENGTH} characters`
    }

    if (company && company.length > MAX_COMPANY_LENGTH) {
        errors.company = `Company name must be less than ${MAX_COMPANY_LENGTH} characters`
    }

    if (file && file.size > 0) {
        if (file.size > MAX_FILE_SIZE) {
            errors.attachment = "File size must be less than 10MB"
        }
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            errors.attachment = "Unsupported file type"
        }
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setFieldErrors({})

    const formData = new FormData(e.currentTarget)

    if (!validateForm(formData)) {
        setIsSubmitting(false)
        return
    }

    const sanitizedFormData = new FormData()
    sanitizedFormData.append("purpose", sanitizeInput(purpose))
    sanitizedFormData.append("name", sanitizeInput(formData.get("name") as string))
    sanitizedFormData.append("company", sanitizeInput(formData.get("company") as string || ""))
    sanitizedFormData.append("email", sanitizeInput(formData.get("email") as string))
    sanitizedFormData.append("phone", sanitizeInput(formData.get("phone") as string || ""))
    sanitizedFormData.append("message", sanitizeInput(formData.get("message") as string))
    sanitizedFormData.append("nda", formData.get("nda") as string || "")

    const attachment = formData.get("attachment") as File | null
    if (attachment && attachment.size > 0) {
        sanitizedFormData.append("attachment", attachment)
    }

    const honeypot = formData.get("website") as string
    if (honeypot) {
        setIsSubmitted(true)
        setIsSubmitting(false)
        return
    }

    try {
        const response = await fetch("/api/contact", {
            method: "POST",
            body: sanitizedFormData,
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || "Failed to send message")
        }

        setIsSubmitted(true)
    } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong. Please try again or email us directly at hello@hanslabs.co")
    } finally {
        setIsSubmitting(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setFieldErrors((prev) => ({ ...prev, attachment: "" }))

    if (file) {
        if (file.size > MAX_FILE_SIZE) {
            setFieldErrors((prev) => ({ ...prev, attachment: "File size must be less than 10MB" }))
            e.target.value = ""
            setFileName(null)
            return
        }
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            setFieldErrors((prev) => ({ ...prev, attachment: "Unsupported file type" }))
            e.target.value = ""
            setFileName(null)
            return
        }
        setFileName(file.name)
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-8 border rounded-lg bg-background">
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
    <form onSubmit={handleSubmit}>
      <div className="space-y-6 border p-4 md:p-6 lg:p-8 lg:mt-8 rounded-lg bg-background">
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="purpose"></Label>
        <Select name="purpose" value={purpose} onValueChange={setPurpose} required>
          <SelectTrigger id="purpose">
            <SelectValue placeholder="Choose a subject" />
          </SelectTrigger>
          <SelectContent>
            {purposes.map((p) => (
              <SelectItem key={p.value} value={p.value}>
                {p.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name*</Label>
          <Input
            id="name"
            name="name"
            required
            maxLength={MAX_NAME_LENGTH}
            className={fieldErrors.name ? "border-red-500" : ""}
          />
          {fieldErrors.name && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {fieldErrors.name}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            name="company"
            maxLength={MAX_COMPANY_LENGTH}
            className={fieldErrors.company ? "border-red-500" : ""}
          />
          {fieldErrors.company && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {fieldErrors.company}
            </p>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email*</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            maxLength={254}
            className={fieldErrors.email ? "border-red-500" : ""}
          />
          {fieldErrors.email && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {fieldErrors.email}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            maxLength={20}
            className={fieldErrors.phone ? "border-red-500" : ""}
          />
          {fieldErrors.phone && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {fieldErrors.phone}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message*</Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          required
          maxLength={MAX_MESSAGE_LENGTH}
          className={fieldErrors.message ? "border-red-500" : ""}
        />
        {fieldErrors.message && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {fieldErrors.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Attachment</Label>
        <div className="relative">
          <input
            type="file"
            id="attachment"
            name="attachment"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.webp,.svg,.txt,.csv,.zip,.rar,.json"
          />
          <div className={`flex items-center gap-3 p-4 rounded-lg border border-dashed transition-colors ${
            fieldErrors.attachment ? "border-red-500" : "border-border hover:border-primary/50"
          }`}>
            <Upload className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {fileName || "Drop a file here or click to upload (Max 10MB)"}
            </span>
          </div>
        </div>
        {fieldErrors.attachment && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {fieldErrors.attachment}
          </p>
        )}
      </div>

      <div className="flex items-start gap-3 relative">
        <Checkbox id="nda" name="nda" />
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Label htmlFor="nda" className="text-sm font-normal cursor-pointer">
              Request NDA prior to meeting
            </Label>
            <button
              type="button"
              onClick={() => setShowNdaInfo(!showNdaInfo)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Info className="h-4 w-4" />
            </button>
          </div>
        </div>

        {showNdaInfo && (
          <div className="absolute left-0 top-full mt-2 z-10 w-full sm:w-80 p-4 rounded-lg bg-card border border-border shadow-lg">
            <div className="flex items-start justify-between gap-2 mb-2">
              <p className="text-xs text-muted-foreground">
                  We'll send you our mutual NDA before any detailed discussions.
              </p>
              <button
                  type="button"
                  onClick={() => setShowNdaInfo(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
              >
                  <X className="h-4 w-4" />
              </button>
            </div>
            <h4 className="font-medium text-foreground text-sm mb-1">Why request one?</h4>
            <p className="text-xs text-muted-foreground mb-3">
              A Non-Disclosure Agreement (NDA) is a legal contract that protects confidential information shared between parties.
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Protects your proprietary ideas and business plans</li>
              <li>• Ensures confidentiality during discussions</li>
              <li>• Creates legal obligation to protect shared information</li>
              <li>• Standard practice for sensitive business conversations</li>
            </ul>
          </div>
        )}
      </div>

      <div className="flex items-start gap-3">
        <Checkbox id="consent" name="consent" required />
        <Label htmlFor="consent" className="text-sm font-normal cursor-pointer">
          I agree to the processing of my personal data in accordance with the<a href="/company/privacy" className="text-primary hover:underline">Privacy Policy</a>
        </Label>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
          <p className="text-sm text-red-500 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            {error}
          </p>
        </div>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <SendHorizonal className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
      </div>
      
      {/* Response Time - Inside Form */}
      {showResponseTime && (
        <div className="flex items-start gap-3 mt-6 p-4 rounded-xl bg-card/50 border border-border/50">
          <Clock className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
          <div>
            <div className="text-sm font-medium text-foreground">Response Time</div>
            <p className="text-sm text-muted-foreground mt-1">
              We typically respond within 24 hours during business days.
            </p>
          </div>
        </div>
      )}
    </form>
  )
}