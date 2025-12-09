# Contact Form Documentation

A secure, validated contact form with Telegram notifications and file attachments.

## Overview

The contact form provides a complete solution for receiving inquiries with:

- Client-side and server-side validation
- Rate limiting protection
- Honeypot spam prevention
- File attachment support
- Telegram notifications
- NDA request option

## Features

| Feature | Description |
|---------|-------------|
| Multi-purpose | Dropdown for inquiry type |
| Validation | Client + server-side checks |
| Rate Limiting | 5 requests per hour per IP |
| Honeypot | Hidden field to catch bots |
| File Upload | Up to 10MB, multiple formats |
| Telegram | Real-time notifications |
| NDA Request | Optional checkbox with info tooltip |
| Sanitization | XSS and injection prevention |

## Installation

### 1. Environment Variables

Add to `.env.local`:

```env
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

### 2. Create Telegram Bot

1. Message [@BotFather](https://t.me/BotFather) on Telegram
2. Send `/newbot` and follow prompts
3. Copy the bot token
4. Start a chat with your bot
5. Get chat ID from `https://api.telegram.org/bot<TOKEN>/getUpdates`

### 3. Usage

```tsx
import { ContactForm } from "@/components/contact-form"

// Basic usage
<ContactForm />

// With response time indicator
<ContactForm showResponseTime />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showResponseTime` | `boolean` | `false` | Shows response time notice below form |

## Form Fields

| Field | Required | Validation |
|-------|----------|------------|
| Purpose | No | Select dropdown |
| Name | Yes | 2-100 characters |
| Company | No | Max 100 characters |
| Email | Yes | Valid email, max 254 chars |
| Phone | No | Max 20 chars, valid format |
| Message | Yes | 10-5000 characters |
| Attachment | No | Max 10MB, allowed types only |
| NDA | No | Checkbox |
| Consent | Yes | Privacy policy agreement |

## Purpose Options

| Value | Label |
|-------|-------|
| `partnership` | Partnership Inquiry |
| `demo` | Request a Demo |
| `hiring` | Hiring / Recruitment |
| `media` | Media / Press |
| `other` | Other |

## Allowed File Types

```ts
const ALLOWED_FILE_TYPES = [
  // Documents
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  
  // Images
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  
  // Text
  "text/plain",
  "text/csv",
  
  // Archives
  "application/zip",
  "application/x-rar-compressed",
  
  // Data
  "application/json",
]
```

## Security Features

### Input Sanitization

Both client and server sanitize all inputs:

```ts
function sanitizeInput(input: string): string {
  return input
    .replace(/<[^>]*>/g, "")         // Remove HTML tags
    .replace(/javascript:/gi, "")     // Remove JS protocol
    .replace(/data:/gi, "")           // Remove data protocol
    .replace(/on\w+\s*=/gi, "")       // Remove event handlers
    .replace(/[<>]/g, "")             // Remove angle brackets
    .trim()
}
```

### Rate Limiting

```ts
const RATE_LIMIT = 5                    // Max requests
const RATE_WINDOW = 60 * 60 * 1000      // 1 hour window

// In production, use Redis instead of in-memory Map
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
```

### Honeypot Field

Hidden field that bots will fill but humans won't:

```tsx
<div className="absolute -left-[9999px]" aria-hidden="true">
  <input type="text" name="website" tabIndex={-1} autoComplete="off" />
</div>
```

If `website` field has value, submission silently succeeds (fools bots).

## API Endpoint

### Request

```
POST /api/contact
Content-Type: multipart/form-data
```

### Form Data

| Field | Type | Required |
|-------|------|----------|
| `purpose` | string | No |
| `name` | string | Yes |
| `company` | string | No |
| `email` | string | Yes |
| `phone` | string | No |
| `message` | string | Yes |
| `nda` | "on" \| "" | No |
| `attachment` | File | No |

### Responses

```ts
// Success
{ success: true }

// Validation Error (400)
{ error: "Invalid email address" }

// Rate Limited (429)
{ error: "Too many requests. Please try again later." }

// Server Error (500)
{ error: "Internal server error" }
```

## Telegram Message Format

```
🔔 *New Contact Form Submission*

📋 *Topic:* Partnership Inquiry

👤 *Name:* John Doe
🏢 *Company:* Acme Inc
📧 *Email:* john@acme.com
📱 *Phone:* +1 555-1234

💬 *Message:*
Hello, I'm interested in discussing a partnership...

📝 *NDA Requested:* Yes
🌐 *IP:* 192.168.1.1
```

Attachments sent as separate document message:

```
📎 Attachment from John Doe (john@acme.com)
```

## File Structure

```
components/
└── contact-form.tsx        # Form component

app/
└── api/
    └── contact/
        └── route.ts        # API handler

docs/
└── CONTACT-FORM.md         # This documentation
```

## Validation Flow

```
┌─────────────────┐
│  Form Submit    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Client Validate │ ──── Invalid ──── Show field errors
└────────┬────────┘
         │ Valid
         ▼
┌─────────────────┐
│   Honeypot?     │ ──── Filled ──── Silent success (bot)
└────────┬────────┘
         │ Empty
         ▼
┌─────────────────┐
│ Server Validate │ ──── Invalid ──── Return 400 error
└────────┬────────┘
         │ Valid
         ▼
┌─────────────────┐
│  Rate Limited?  │ ──── Yes ──── Return 429 error
└────────┬────────┘
         │ No
         ▼
┌─────────────────┐
│ Send Telegram   │ ──── Failed ──── Return 500 error
└────────┬────────┘
         │ Success
         ▼
┌─────────────────┐
│ Send Attachment │ (if exists)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Return Success  │
└─────────────────┘
```

## Form States

| State | UI |
|-------|-----|
| Default | Empty form with fields |
| Submitting | Disabled inputs, spinner on button |
| Field Error | Red border, error message under field |
| API Error | Red banner above submit button |
| Success | Success message with "Send Another" button |

## Customization

### Add Purpose Options

```tsx
// contact-form.tsx
const purposes = [
  { value: "partnership", label: "Partnership Inquiry" },
  { value: "demo", label: "Request a Demo" },
  { value: "hiring", label: "Hiring / Recruitment" },
  { value: "media", label: "Media / Press" },
  { value: "support", label: "Technical Support" },  // Add new option
  { value: "other", label: "Other" },
]
```

Also update the API route labels:

```ts
// app/api/contact/route.ts
const purposeLabels: Record<string, string> = {
  partnership: "Partnership Inquiry",
  demo: "Request a Demo",
  hiring: "Hiring / Recruitment",
  media: "Media / Press",
  support: "Technical Support",  // Add new label
  other: "Other",
}
```

### Change Rate Limits

```ts
// app/api/contact/route.ts
const RATE_LIMIT = 10                    // 10 requests
const RATE_WINDOW = 30 * 60 * 1000       // 30 minutes
```

### Add File Types

```ts
// Both contact-form.tsx and route.ts
const ALLOWED_FILE_TYPES = [
  ...existingTypes,
  "video/mp4",  // Add video support
]
```

Update the file input accept attribute:

```tsx
<input
  type="file"
  accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.webp,.svg,.txt,.csv,.zip,.rar,.json,.mp4"
/>
```

### Custom Success Message

```tsx
if (isSubmitted) {
  return (
    <div className="text-center py-8">
      <Check className="h-16 w-16 text-green-500 mx-auto mb-4" />
      <h3 className="text-2xl font-bold">Your Custom Message</h3>
      <p className="text-muted-foreground">Custom description here.</p>
    </div>
  )
}
```

## Production Considerations

### Redis Rate Limiting

Replace in-memory Map with Redis:

```ts
import { Redis } from "@upstash/redis"

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

async function checkRateLimit(ip: string): Promise<boolean> {
  const key = `ratelimit:contact:${ip}`
  const count = await redis.incr(key)
  
  if (count === 1) {
    await redis.expire(key, 3600) // 1 hour
  }
  
  return count <= RATE_LIMIT
}
```

### Email Fallback

Add email sending as fallback if Telegram fails:

```ts
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

// In the API route, after Telegram fails:
if (!messageResponse.ok) {
  await resend.emails.send({
    from: "noreply@hanslabs.co",
    to: "hello@hanslabs.co",
    subject: `Contact Form: ${name}`,
    text: message,
  })
}
```

### Spam Detection

Add more sophisticated spam detection:

```ts
function isSpam(message: string): boolean {
  const spamPatterns = [
    /\b(viagra|casino|lottery|winner)\b/i,
    /https?:\/\/[^\s]+/g, // Links
    /(.)\1{5,}/,          // Repeated characters
  ]
  
  return spamPatterns.some(pattern => pattern.test(message))
}
```

## Troubleshooting

### Telegram not receiving messages

1. Verify bot token is correct
2. Check chat ID is correct (use getUpdates endpoint)
3. Ensure bot is added to the chat
4. Check Vercel logs for errors

### File upload failing

1. Check file size (max 10MB)
2. Verify file type is in allowed list
3. Check Telegram bot file size limits (50MB for bots)

### Rate limiting too aggressive

1. Increase `RATE_LIMIT` value
2. Decrease `RATE_WINDOW` duration
3. For production, implement per-user limits vs per-IP

### Form not submitting

1. Check required fields are filled
2. Verify consent checkbox is checked
3. Check browser console for errors
4. Verify API route exists at `/api/contact`