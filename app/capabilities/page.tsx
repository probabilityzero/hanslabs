import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CTASection } from "@/components/cta-section"
import { CapabilityDetail } from "@/components/capability-detail"
import {
  Code2,
  Palette,
  Brain,
  Database,
  Server,
  Cpu,
  Layers,
  Wand2,
  Box,
  GitBranch,
  BarChart3,
  Workflow,
} from "lucide-react"

export const metadata = {
  title: "Capabilities | Han's Labs",
  description:
    "Explore our technical capabilities across technology & engineering, creative experiences, and intelligent systems.",
}

const capabilities = [
  {
    id: "technology",
    title: "Technology & Engineering",
    description:
      "Backend systems, databases, simulation engines, and embedded systems built for scale and reliability.",
    icon: Code2,
    services: [
      {
        name: "Backend Development",
        description: "High-performance APIs, microservices, and distributed systems using Rust, Go, and Node.js.",
        icon: Server,
      },
      {
        name: "Database Engineering",
        description: "Custom database solutions, query optimization, and data pipeline architecture.",
        icon: Database,
      },
      {
        name: "Simulation Systems",
        description: "Real-time physics engines, discrete event simulation, and computational modeling.",
        icon: Cpu,
      },
      {
        name: "Embedded Systems",
        description: "IoT solutions, firmware development, and hardware-software integration.",
        icon: Layers,
      },
    ],
    deliverables: [
      "Technical architecture documents",
      "Production-ready codebases",
      "API documentation",
      "Performance benchmarks",
      "Deployment guides",
    ],
    engagement:
      "Typical engagements range from 2-6 months depending on scope. We offer fixed-price POCs and T&M for larger implementations.",
    clients: ["Enterprise SaaS", "FinTech", "Healthcare Tech", "Industrial IoT"],
  },
  {
    id: "creative",
    title: "Creative Experiences",
    description: "UI/UX design, 3D environments, interactive narratives, and immersive digital experiences.",
    icon: Palette,
    services: [
      {
        name: "UI/UX Design",
        description: "Research-driven interface design with accessibility and usability at the core.",
        icon: Wand2,
      },
      {
        name: "3D & WebGL",
        description: "Real-time 3D visualizations, virtual environments, and interactive experiences.",
        icon: Box,
      },
      {
        name: "Data Visualization",
        description: "Complex data made understandable through interactive charts and visual narratives.",
        icon: BarChart3,
      },
      {
        name: "Interactive Narratives",
        description: "Engaging storytelling experiences combining design, animation, and interactivity.",
        icon: GitBranch,
      },
    ],
    deliverables: [
      "Design systems",
      "Interactive prototypes",
      "Production assets",
      "Animation libraries",
      "Brand guidelines",
    ],
    engagement:
      "We work in design sprints (2-4 weeks) for exploration and longer partnerships for full product design.",
    clients: ["Media & Entertainment", "Education", "E-commerce", "Museums & Exhibitions"],
  },
  {
    id: "ai",
    title: "Intelligent Systems",
    description: "Machine learning, probabilistic modeling, MLOps, and AI-powered automation solutions.",
    icon: Brain,
    services: [
      {
        name: "Machine Learning",
        description: "Custom ML models for classification, prediction, and pattern recognition.",
        icon: Brain,
      },
      {
        name: "Natural Language",
        description: "Text analysis, document processing, conversational AI, and semantic search.",
        icon: Workflow,
      },
      {
        name: "Computer Vision",
        description: "Image recognition, object detection, video analysis, and visual inspection systems.",
        icon: Layers,
      },
      {
        name: "MLOps",
        description: "ML pipeline automation, model monitoring, and scalable inference infrastructure.",
        icon: Server,
      },
    ],
    deliverables: [
      "Trained models",
      "API endpoints",
      "Training pipelines",
      "Model documentation",
      "Performance reports",
    ],
    engagement: "AI projects typically start with a 4-8 week discovery phase followed by iterative development.",
    clients: ["Healthcare", "Manufacturing", "Retail", "Financial Services"],
  },
]

export default function CapabilitiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold text-primary uppercase tracking-wide">Capabilities</p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                Full-stack expertise across the innovation spectrum
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
                From backend infrastructure to AI systems to creative experiences—we have the depth and breadth to
                tackle your most challenging problems.
              </p>
            </div>
          </div>
        </section>

        {/* Capability sections */}
        {capabilities.map((capability, index) => (
          <CapabilityDetail key={capability.id} capability={capability} reversed={index % 2 === 1} />
        ))}

        <CTASection />
      </main>
      <SiteFooter />
    </div>
  )
}
