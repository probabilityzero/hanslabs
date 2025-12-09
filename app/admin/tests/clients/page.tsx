import dynamic from "next/dynamic"
import { FadeUp } from "@/components/hero-transitions"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const testMeta = {
  name: "Contact & Lead Capture",
  description: "Testing contact forms, lead capture, and survey flows for client onboarding.",
  status: "wip" as const,
  category: "Client Engagement",
  features: [
    "Contact form",
    "Lead capture",
    "Survey flow",
    "Validation & error states",
    "Submission feedback",
  ],
}

export const metadata = {
  title: `${testMeta.name} | Admin | Han's Labs`,
  robots: "noindex, nofollow",
}

const ContactForm = dynamic(() => import("@/components/contact-form").then(m => ({ default: m.ContactForm })))

export default function ClientsTestPage() {
  return (
    <div className="min-h-screen bg-background">

      <section className="relative min-h-[50vh] flex items-center justify-center">
        <div className="relative z-10 text-center px-6">
          <FadeUp>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-600 border border-green-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Test Page
            </div>
          </FadeUp>
          <FadeUp delay={25}>
            <h1 className="text-5xl font-bold text-foreground mb-4">{testMeta.name}</h1>
          </FadeUp>
          <FadeUp delay={50}>
            <p className="text-xl text-muted-foreground max-w-lg mx-auto">
              {testMeta.description}
            </p>
          </FadeUp>
        </div>
      </section>
    </div>
  )
}