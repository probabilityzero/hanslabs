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
  type LucideIcon,
} from "lucide-react"

export interface Service {
  name: string
  description: string
  icon: LucideIcon
}

export interface Expertise {
  id: string
  title: string
  description: string
  icon: LucideIcon
  services: Service[]
  deliverables: string[]
  engagement: string
  clients: string[]
}

export const expertise: Expertise[] = [
  {
    id: "technology",
    title: "Technology & Engineering",
    description: "Backend systems, databases, simulation engines, and embedded systems built for scale and reliability.",
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
    engagement: "Typical engagements range from 2-6 months depending on scope. We offer fixed-price POCs and T&M for larger implementations.",
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
    engagement: "We work in design sprints (2-4 weeks) for exploration and longer partnerships for full product design.",
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

export function getExpertiseById(id: string): Expertise | undefined {
  return expertise.find(e => e.id === id)
}

export function getAllServiceNames(): string[] {
  return expertise.flatMap(e => e.services.map(s => s.name))
}