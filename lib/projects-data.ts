export type ProjectStatus = "product" | "prototype" | "research"

export interface Project {
  slug: string
  title: string
  description: string
  overview: string
  problemStatement: string
  status: ProjectStatus
  tags: string[]
  stack: string[]
  image: string
  hasDemo: boolean
  demoUrl?: string
  repoUrl?: string
  metrics?: { label: string; value: string }[]
  architecture?: string
  downloads?: { name: string; url: string }[]
  isFeatured?: boolean
}

export const projects: Project[] = [
  {
    slug: "framedb",
    title: "FrameDB",
    description:
      "A high-performance temporal database designed for real-time analytics and time-series data with sub-millisecond query latency.",
    overview:
      "FrameDB is a purpose-built temporal database that combines the flexibility of document stores with the performance of columnar databases. Designed for applications that require real-time analytics on time-series data, it delivers sub-millisecond query latency even at scale.",
    problemStatement:
      "Traditional databases struggle with time-series workloads—they either sacrifice query performance for write throughput or vice versa. We needed a solution that could handle millions of writes per second while maintaining instant query capabilities for real-time dashboards and alerting systems.",
    status: "product",
    tags: ["Database", "Time-Series", "Analytics"],
    stack: ["Rust", "SIMD", "Arrow", "gRPC", "Kubernetes"],
    image: "/abstract-database-visualization-dark-theme.jpg",
    hasDemo: true,
    demoUrl: "/showcase/framedb/demo",
    repoUrl: "https://github.com/hanslabs/framedb",
    metrics: [
      { label: "Write Throughput", value: "2M/sec" },
      { label: "Query Latency", value: "<1ms" },
      { label: "Compression Ratio", value: "10:1" },
      { label: "GitHub Stars", value: "8.2K" },
    ],
    architecture:
      "FrameDB uses a log-structured merge-tree (LSM) architecture with time-partitioned storage. Data is organized into immutable chunks indexed by time range, enabling efficient range queries and automatic data lifecycle management.",
    downloads: [
      { name: "Technical Whitepaper", url: "#" },
      { name: "Architecture Slides", url: "#" },
    ],
    isFeatured: true,
  },
  {
    slug: "neural-canvas",
    title: "Neural Canvas",
    description:
      "AI-powered creative tool that transforms sketches into production-ready illustrations using diffusion models.",
    overview:
      "Neural Canvas bridges the gap between rough ideation and polished output. Using state-of-the-art diffusion models fine-tuned on design assets, it transforms quick sketches into production-ready illustrations, icons, and UI elements.",
    problemStatement:
      "Designers spend hours refining rough concepts into final assets. Meanwhile, non-designers struggle to communicate visual ideas effectively. We built Neural Canvas to democratize visual creation while maintaining professional quality standards.",
    status: "prototype",
    tags: ["AI", "Computer Vision", "Design Tools"],
    stack: ["Python", "PyTorch", "React", "WebGL", "FastAPI"],
    image: "",
    hasDemo: true,
    demoUrl: "/showcase/neural-canvas/demo",
    metrics: [
      { label: "Generation Time", value: "2.3 sec" },
      { label: "Model Parameters", value: "1.2B" },
      { label: "Training Images", value: "50M" },
      { label: "Beta Users", value: "2.4K" },
    ],
    architecture:
      "The system uses a ControlNet-based architecture with custom conditioning modules for sketch input. A lightweight encoder extracts structural features from sketches, which guide the diffusion process to maintain compositional fidelity while adding detail and style.",
  },
  {
    slug: "quantum-sim",
    title: "Quantum Simulator",
    description:
      "Educational quantum computing simulator with visual circuit builder and real-time state visualization.",
    overview:
      "Quantum Simulator makes quantum computing accessible through intuitive visualization. Build quantum circuits with drag-and-drop, watch quantum states evolve in real-time, and understand complex concepts through interactive exploration.",
    problemStatement:
      "Quantum computing education is hindered by the abstract nature of qubits and superposition. Traditional simulators either oversimplify or require deep mathematical background. We created a tool that builds intuition through direct manipulation and visualization.",
    status: "research",
    tags: ["Quantum", "Education", "Simulation"],
    stack: ["TypeScript", "WebGL", "Three.js", "Web Workers"],
    image: "/quantum-computing-visualization-dark-theme.jpg",
    hasDemo: false,
    repoUrl: "https://github.com/hanslabs/quantum-sim",
    metrics: [
      { label: "Max Qubits", value: "24" },
      { label: "Gate Types", value: "35" },
      { label: "Simulation Speed", value: "1M ops/s" },
    ],
    architecture:
      "The simulator uses tensor network contraction for efficient state computation. The UI renders quantum states as interactive Bloch spheres and probability distributions, updated in real-time via Web Workers to maintain responsive interaction.",
    isFeatured: true,
  },
  {
    slug: "semantic-search",
    title: "SemanticDB",
    description:
      "Vector database with hybrid search combining semantic understanding with traditional keyword matching.",
    overview:
      "SemanticDB provides a unified interface for both vector similarity search and traditional full-text search. It automatically balances between semantic understanding and exact matching based on query characteristics.",
    problemStatement:
      "Modern search requires understanding user intent, not just matching keywords. But pure semantic search loses precision for technical queries. SemanticDB dynamically combines both approaches for optimal results.",
    status: "product",
    tags: ["Search", "NLP", "Database"],
    stack: ["Go", "HNSW", "BM25", "PostgreSQL", "gRPC"],
    image: "/placeholder.svg?key=eaqnm",
    hasDemo: true,
    metrics: [
      { label: "Query Latency", value: "<50ms" },
      { label: "Index Size", value: "100M docs" },
      { label: "Recall@10", value: "0.94" },
    ],
  },
  {
    slug: "motion-capture",
    title: "WebMoCap",
    description: "Browser-based motion capture using commodity webcams and machine learning pose estimation.",
    overview:
      "WebMoCap brings professional-quality motion capture to the browser. Using advanced pose estimation models, it captures full-body motion from a single webcam and exports to industry-standard formats.",
    problemStatement:
      "Motion capture traditionally requires expensive hardware and specialized studios. We wanted to democratize this technology for indie game developers, researchers, and content creators with limited budgets.",
    status: "prototype",
    tags: ["Computer Vision", "Motion Capture", "WebGL"],
    stack: ["TensorFlow.js", "MediaPipe", "Three.js", "BVH"],
    image: "/motion-capture-visualization-dark-theme.jpg",
    hasDemo: true,
    metrics: [
      { label: "Frame Rate", value: "30 FPS" },
      { label: "Joints Tracked", value: "33" },
      { label: "Latency", value: "<100ms" },
    ],
  },
  {
    slug: "distributed-ledger",
    title: "MicroLedger",
    description: "Lightweight distributed ledger for IoT networks with Byzantine fault tolerance.",
    overview:
      "MicroLedger is designed for resource-constrained environments where traditional blockchain solutions are too heavy. It provides Byzantine fault tolerance with minimal memory and computation overhead.",
    problemStatement:
      "IoT networks need verifiable, tamper-proof records but can't run full blockchain nodes. MicroLedger provides consensus guarantees suitable for embedded systems with limited resources.",
    status: "research",
    tags: ["Distributed Systems", "IoT", "Consensus"],
    stack: ["Rust", "embedded-hal", "PBFT", "MQTT"],
    image: "/distributed-ledger-network-visualization-dark.jpg",
    hasDemo: false,
    repoUrl: "https://github.com/hanslabs/microledger",
    metrics: [
      { label: "Memory Usage", value: "<512KB" },
      { label: "TPS", value: "1000" },
      { label: "Nodes Tested", value: "100" },
    ],
  },
  {
    slug: "business-card-maker",
    title: "iProfile: Digital Cards",
    description: "Lightweight distributed ledger for IoT networks with Byzantine fault tolerance.",
    overview:
      "MicroLedger is designed for resource-constrained environments where traditional blockchain solutions are too heavy. It provides Byzantine fault tolerance with minimal memory and computation overhead.",
    problemStatement:
      "IoT networks need verifiable, tamper-proof records but can't run full blockchain nodes. MicroLedger provides consensus guarantees suitable for embedded systems with limited resources.",
    status: "research",
    tags: ["Distributed Systems", "IoT", "Consensus"],
    stack: ["Rust", "embedded-hal", "PBFT", "MQTT"],
    image: "/distributed-ledger-network-visualization-dark.jpg",
    hasDemo: false,
    repoUrl: "https://github.com/hanslabs/microledger",
    metrics: [
      { label: "Memory Usage", value: "<512KB" },
      { label: "TPS", value: "1000" },
      { label: "Nodes Tested", value: "100" },
    ],
    isFeatured: true,
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getProjectsByTag(tag: string): Project[] {
  return projects.filter((p) => p.tags.includes(tag))
}

export function getAllTags(): string[] {
  const tags = new Set<string>()
  projects.forEach((p) => p.tags.forEach((t) => tags.add(t)))
  return Array.from(tags).sort()
}
