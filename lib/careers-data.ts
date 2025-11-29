export interface JobPosting {
  slug: string
  title: string
  department: string
  location: string
  type: "full-time" | "part-time" | "contract"
  salary?: string
  description: string
  responsibilities: string[]
  requirements: string[]
  niceToHave?: string[]
  benefits: string[]
}

export const jobPostings: JobPosting[] = [
  {
    slug: "senior-ml-engineer",
    title: "Senior ML Engineer",
    department: "Engineering",
    location: "San Francisco, CA (Hybrid)",
    type: "full-time",
    salary: "$180K - $250K",
    description:
      "We're looking for a Senior ML Engineer to join our Intelligent Systems team. You'll work on cutting-edge machine learning systems, from research prototypes to production deployments at scale.",
    responsibilities: [
      "Design and implement ML pipelines for training, evaluation, and deployment",
      "Collaborate with research scientists to productionize novel algorithms",
      "Optimize model performance for latency and throughput requirements",
      "Build and maintain MLOps infrastructure including monitoring and A/B testing",
      "Mentor junior engineers and contribute to technical strategy",
    ],
    requirements: [
      "5+ years of experience in machine learning engineering",
      "Strong programming skills in Python and experience with PyTorch or TensorFlow",
      "Experience deploying ML models at scale in production environments",
      "Deep understanding of ML fundamentals: optimization, regularization, model selection",
      "Experience with distributed training and inference",
      "MS or PhD in Computer Science, Machine Learning, or related field",
    ],
    niceToHave: [
      "Experience with large language models and transformers",
      "Contributions to open source ML projects",
      "Experience with real-time inference systems",
      "Background in probabilistic programming or Bayesian methods",
    ],
    benefits: [
      "Competitive salary and equity",
      "Comprehensive health, dental, and vision insurance",
      "Flexible PTO policy",
      "Learning budget for conferences, courses, and books",
      "Remote-friendly work environment",
      "401(k) with company match",
    ],
  },
  {
    slug: "systems-engineer",
    title: "Systems Engineer",
    department: "Engineering",
    location: "Remote (US)",
    type: "full-time",
    salary: "$160K - $220K",
    description:
      "Join our infrastructure team to build high-performance distributed systems. You'll work on databases, networking, and systems that power our products and client solutions.",
    responsibilities: [
      "Design and implement distributed systems and data infrastructure",
      "Optimize performance of critical system components",
      "Build tooling for deployment, monitoring, and debugging",
      "Contribute to open source projects like FrameDB",
      "Write technical documentation and architecture proposals",
    ],
    requirements: [
      "4+ years of experience in systems programming",
      "Proficiency in Rust, Go, or C++",
      "Experience with distributed systems concepts: consensus, replication, partitioning",
      "Strong understanding of operating systems and networking",
      "Experience with performance profiling and optimization",
    ],
    niceToHave: [
      "Experience with database internals",
      "Contributions to systems-level open source projects",
      "Background in formal methods or verification",
    ],
    benefits: [
      "Competitive salary and equity",
      "Comprehensive health, dental, and vision insurance",
      "Flexible PTO policy",
      "Learning budget for conferences, courses, and books",
      "Remote-friendly work environment",
      "401(k) with company match",
    ],
  },
  {
    slug: "product-designer",
    title: "Product Designer",
    department: "Design",
    location: "San Francisco, CA (Hybrid)",
    type: "full-time",
    salary: "$140K - $190K",
    description:
      "We're looking for a Product Designer to shape the user experience of our developer tools and creative products. You'll work closely with engineering and research to turn complex capabilities into intuitive interfaces.",
    responsibilities: [
      "Lead end-to-end design for product features from concept to launch",
      "Create wireframes, prototypes, and high-fidelity designs",
      "Conduct user research and usability testing",
      "Build and maintain our design system",
      "Collaborate with engineers to ensure design quality in implementation",
    ],
    requirements: [
      "4+ years of product design experience",
      "Strong portfolio demonstrating UX/UI design skills",
      "Experience with design tools like Figma",
      "Ability to prototype interactions and animations",
      "Understanding of front-end development concepts",
    ],
    niceToHave: [
      "Experience designing developer tools or technical products",
      "Background in data visualization or 3D graphics",
      "Familiarity with design tokens and component libraries",
    ],
    benefits: [
      "Competitive salary and equity",
      "Comprehensive health, dental, and vision insurance",
      "Flexible PTO policy",
      "Learning budget for conferences, courses, and books",
      "Remote-friendly work environment",
      "401(k) with company match",
    ],
  },
  {
    slug: "research-scientist",
    title: "Research Scientist",
    department: "Research",
    location: "San Francisco, CA",
    type: "full-time",
    salary: "$200K - $300K",
    description:
      "Join our research team to work on fundamental problems in machine learning, computer graphics, and distributed systems. You'll have the freedom to explore novel ideas while seeing them through to real-world impact.",
    responsibilities: [
      "Conduct original research in your area of expertise",
      "Publish papers at top-tier venues",
      "Prototype research ideas and collaborate with engineering on productionization",
      "Mentor research interns and junior researchers",
      "Stay current with latest developments in the field",
    ],
    requirements: [
      "PhD in Computer Science, Machine Learning, or related field",
      "Track record of publications at top venues (NeurIPS, ICML, CVPR, SIGGRAPH, etc.)",
      "Strong programming skills and ability to implement research ideas",
      "Excellent written and verbal communication skills",
    ],
    niceToHave: [
      "Industry research experience",
      "Experience transitioning research to production",
      "Open source contributions",
    ],
    benefits: [
      "Competitive salary and equity",
      "Comprehensive health, dental, and vision insurance",
      "Flexible PTO policy",
      "Conference travel budget",
      "Research computing resources",
      "401(k) with company match",
    ],
  },
]

export function getJobBySlug(slug: string): JobPosting | undefined {
  return jobPostings.find((j) => j.slug === slug)
}

export function getJobsByDepartment(department: string): JobPosting[] {
  return jobPostings.filter((j) => j.department === department)
}

export function getAllDepartments(): string[] {
  return Array.from(new Set(jobPostings.map((j) => j.department))).sort()
}
