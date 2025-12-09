import { Mail, MapPin, Phone, Clock, ArrowUpRight } from "lucide-react"
import { ContactForm } from "@/components/contact-form"
import { AnimatedBackground } from "@/components/animated-background"
import { FadeUp } from "@/components/animations"

export const metadata = {
  title: "Contact | Han's Labs",
  description: "Get in touch with Han's Labs for partnerships, collaborations, or inquiries.",
}

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@hanslabs.co",
    href: "mailto:hello@hanslabs.co",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (415) 555-0123",
    href: "tel:+14155550123",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "San Francisco, CA",
    href: "https://maps.apple.com/?address=San%20Francisco,%20CA",
  },
]

export default function ContactPage() {
  return (
    <AnimatedBackground as="main" className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-16 items-start">

          <div className="lg:col-span-2 lg:sticky lg:top-24">
            <FadeUp>
              <span className="text-sm font-medium text-primary uppercase tracking-wide">
                Contact Us
              </span>
            </FadeUp>

            <FadeUp delay={25}>
              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
                Let's build something together
              </h1>
            </FadeUp>

            <FadeUp delay={75}>
              <p className="mt-4 text-lg text-muted-foreground">
                Have a project in mind? We'd love to hear from you.
              </p>
            </FadeUp>

            <div className="lg:hidden mt-8">
              <FadeUp delay={50}>
                <ContactForm showResponseTime />
              </FadeUp>
            </div>

            <FadeUp delay={75}>
              <div className="mt-10 space-y-2">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group flex items-center gap-4 p-4 -mx-4 rounded-xl hover:bg-card transition-all duration-300"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-300">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-muted-foreground">{item.label}</div>
                      <div className="text-foreground font-medium truncate">{item.value}</div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 shrink-0" />
                  </a>
                ))}
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={50} className="hidden lg:block lg:col-span-3">
            <ContactForm showResponseTime />
          </FadeUp>

        </div>
      </div>
    </AnimatedBackground>
  )
}