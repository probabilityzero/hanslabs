import { NextRequest, NextResponse } from "next/server"

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

const purposeLabels: Record<string, string> = {
  partnership: "Partnership Inquiry",
  demo: "Request a Demo",
  hiring: "Hiring / Recruitment",
  media: "Media / Press",
  other: "Other",
}

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
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const MAX_MESSAGE_LENGTH = 5000
const MAX_NAME_LENGTH = 100
const MAX_COMPANY_LENGTH = 100

// Rate limiting (in production, use Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 5
const RATE_WINDOW = 60 * 60 * 1000 // 1 hour

function sanitizeInput(input: string): string {
  if (!input) return ""
  return input
    .replace(/<[^>]*>/g, "")
    .replace(/javascript:/gi, "")
    .replace(/data:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .replace(/[<>]/g, "")
    .trim()
}

function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, "\\$&")
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

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW })
    return true
  }

  if (record.count >= RATE_LIMIT) {
    return false
  }

  record.count++
  return true
}

function getClientIP(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  )
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIP(request)
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      )
    }

    const formData = await request.formData()

    // Extract and sanitize inputs (even though client already did, never trust client)
    const purpose = sanitizeInput(formData.get("purpose") as string || "")
    const name = sanitizeInput(formData.get("name") as string || "")
    const company = sanitizeInput(formData.get("company") as string || "")
    const email = sanitizeInput(formData.get("email") as string || "")
    const phone = sanitizeInput(formData.get("phone") as string || "")
    const message = sanitizeInput(formData.get("message") as string || "")
    const nda = formData.get("nda") === "on"
    const attachment = formData.get("attachment") as File | null

    // Server-side validation (never trust client)
    if (!name || name.length < 2 || name.length > MAX_NAME_LENGTH) {
      return NextResponse.json(
        { error: "Invalid name" },
        { status: 400 }
      )
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      )
    }

    if (!message || message.length < 10 || message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: "Message must be between 10 and 5000 characters" },
        { status: 400 }
      )
    }

    if (phone && !isValidPhone(phone)) {
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 }
      )
    }

    if (company && company.length > MAX_COMPANY_LENGTH) {
      return NextResponse.json(
        { error: "Company name too long" },
        { status: 400 }
      )
    }

    // File validation
    if (attachment && attachment.size > 0) {
      if (attachment.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: "File too large. Maximum size is 10MB." },
          { status: 400 }
        )
      }

      if (!ALLOWED_FILE_TYPES.includes(attachment.type)) {
        return NextResponse.json(
          { error: "Invalid file type. Only PDF, DOC, DOCX, PPT, PPTX allowed." },
          { status: 400 }
        )
      }
    }

    const telegramMessage = `
🔔 *New Contact Form Submission*

📋 *Topic:* ${escapeMarkdown(purposeLabels[purpose] || purpose || "Not selected")}

👤 *Name:* ${escapeMarkdown(name)}
🏢 *Company:* ${escapeMarkdown(company || "Not provided")}
📧 *Email:* ${escapeMarkdown(email)}
📱 *Phone:* ${escapeMarkdown(phone || "Not provided")}

💬 *Message:*
${escapeMarkdown(message)}

📝 *NDA Requested:* ${nda ? "Yes" : "No"}
🌐 *IP:* ${escapeMarkdown(ip)}
    `.trim()

    const messageResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: "Markdown",
        }),
      }
    )

    if (!messageResponse.ok) {
      const error = await messageResponse.json()
      console.error("Telegram message error:", error)
      return NextResponse.json(
        { error: "Failed to send notification" },
        { status: 500 }
      )
    }

    if (attachment && attachment.size > 0) {
      const fileFormData = new FormData()
      fileFormData.append("chat_id", TELEGRAM_CHAT_ID!)
      fileFormData.append("document", attachment)
      fileFormData.append(
        "caption",
        `📎 Attachment from ${escapeMarkdown(name)} (${escapeMarkdown(email)})`
      )

      const fileResponse = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`,
        {
          method: "POST",
          body: fileFormData,
        }
      )

      if (!fileResponse.ok) {
        const error = await fileResponse.json()
        console.error("Telegram file error:", error)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}