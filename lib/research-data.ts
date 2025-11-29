export interface ResearchArticle {
  slug: string
  title: string
  abstract: string
  content: string
  date: string
  readTime: string
  authors: { name: string; role: string }[]
  tags: string[]
  citations?: { title: string; authors: string; venue: string; year: number; url?: string }[]
  doi?: string
  codeUrl?: string
  dataUrl?: string
}

export const researchArticles: ResearchArticle[] = [
  {
    slug: "probabilistic-graph-inference",
    title: "Probabilistic Graph Inference at Scale",
    abstract:
      "A novel approach to scaling probabilistic inference on large-scale knowledge graphs using variational methods and sparse tensor operations.",
    content: `
## Introduction

Probabilistic inference on knowledge graphs presents significant computational challenges as graph sizes scale to millions of nodes and billions of edges. Traditional message-passing algorithms become intractable, while sampling-based methods struggle with convergence.

We present **GraphVI**, a variational inference framework that leverages graph structure to enable efficient approximate inference at scale.

## Background

### Knowledge Graphs and Uncertainty

Modern knowledge graphs often contain uncertain or incomplete information. Representing and reasoning about this uncertainty requires probabilistic graphical models, but standard inference techniques don't scale to web-scale graphs.

### Variational Inference

Variational inference transforms inference into an optimization problem, approximating the true posterior with a tractable distribution family. The key challenge is balancing approximation quality with computational efficiency.

## Method

Our approach combines three key innovations:

1. **Sparse Variational Families**: We parameterize variational distributions using sparse tensor networks that exploit graph locality.

2. **Stochastic Subgraph Sampling**: We develop a stratified sampling scheme that provides unbiased gradient estimates while focusing computation on uncertain regions.

3. **Amortized Inference Networks**: We train neural networks to predict variational parameters, enabling rapid inference on new queries without re-optimization.

## Experiments

We evaluate GraphVI on three benchmark knowledge graphs:

| Dataset | Nodes | Edges | Inference Time | ELBO |
|---------|-------|-------|----------------|------|
| FB15k-237 | 15K | 310K | 2.3s | -0.42 |
| WN18RR | 41K | 93K | 1.1s | -0.38 |
| YAGO3-10 | 123K | 1.1M | 8.7s | -0.51 |

Our method achieves 10-100x speedup compared to exact inference while maintaining comparable accuracy to state-of-the-art approximate methods.

## Conclusion

GraphVI enables practical probabilistic inference on large-scale knowledge graphs. Our variational framework provides a principled approach to trading off accuracy and computation, opening new possibilities for reasoning under uncertainty at web scale.
    `.trim(),
    date: "2024-11-15",
    readTime: "12 min read",
    authors: [
      { name: "Dr. Sarah Chen", role: "Principal Investigator" },
      { name: "James Park", role: "Research Scientist" },
    ],
    tags: ["Machine Learning", "Graph Theory", "Probabilistic Inference"],
    citations: [
      { title: "Variational Message Passing", authors: "Winn, J. & Bishop, C.", venue: "JMLR", year: 2005 },
      { title: "Knowledge Graph Embedding", authors: "Wang et al.", venue: "TKDE", year: 2017 },
    ],
    codeUrl: "https://github.com/hanslabs/graphvi",
  },
  {
    slug: "real-time-rendering-techniques",
    title: "Real-time Neural Rendering Techniques",
    abstract:
      "Exploring hybrid rendering pipelines that combine traditional rasterization with neural radiance fields for interactive applications.",
    content: `
## Introduction

Neural radiance fields (NeRFs) have revolutionized novel view synthesis but remain too slow for real-time applications. Meanwhile, traditional rasterization is fast but struggles with complex lighting and materials.

We present **HybridNeRF**, a rendering pipeline that combines the best of both approaches.

## Background

### Neural Radiance Fields

NeRFs represent scenes as continuous volumetric functions parameterized by neural networks. While they produce photorealistic results, rendering requires expensive ray marching with hundreds of network evaluations per pixel.

### Rasterization

Traditional rasterization projects geometry directly to screen space, enabling real-time performance. However, it struggles with global illumination, subsurface scattering, and other complex phenomena.

## Method

Our hybrid approach works in three stages:

1. **Geometry Pass**: We rasterize scene geometry to produce G-buffers containing depth, normals, and material properties.

2. **Neural Lighting**: A compact neural network predicts view-dependent lighting using G-buffer features and a compressed scene representation.

3. **Temporal Accumulation**: We accumulate predictions across frames, amortizing the cost of expensive effects over time.

## Results

On our benchmark scenes, HybridNeRF achieves:

- 60+ FPS at 1080p on RTX 3080
- Visual quality within 2dB PSNR of offline NeRF
- Support for dynamic scenes with real-time updates

## Applications

HybridNeRF enables new applications in:

- Virtual production and real-time cinematography
- Interactive architectural visualization
- Game engines with path-traced quality at raster speeds

## Conclusion

By carefully partitioning computation between rasterization and neural networks, we achieve the quality of neural rendering at interactive framerates.
    `.trim(),
    date: "2024-10-28",
    readTime: "18 min read",
    authors: [
      { name: "Elena Vasquez", role: "Research Lead" },
      { name: "Marcus Rivera", role: "Graphics Engineer" },
    ],
    tags: ["Computer Graphics", "Neural Networks", "Real-time Rendering"],
    citations: [
      { title: "NeRF: Neural Radiance Fields", authors: "Mildenhall et al.", venue: "ECCV", year: 2020 },
      { title: "Instant NGP", authors: "Müller et al.", venue: "SIGGRAPH", year: 2022 },
    ],
    codeUrl: "https://github.com/hanslabs/hybrid-nerf",
    dataUrl: "https://data.hanslabs.com/hybrid-nerf-benchmark",
  },
  {
    slug: "distributed-consensus-mechanisms",
    title: "Distributed Consensus for Edge Computing",
    abstract: "Lightweight consensus protocols designed for resource-constrained edge devices in IoT networks.",
    content: `
## Introduction

Edge computing networks require consensus mechanisms that can tolerate Byzantine failures while running on resource-constrained devices. Traditional protocols like PBFT have prohibitive communication complexity, while blockchain-based approaches consume too much energy.

We present **EdgeBFT**, a consensus protocol optimized for edge computing environments.

## Problem Statement

IoT edge networks face unique challenges:

- **Resource Constraints**: Devices have limited CPU, memory, and battery
- **Network Unreliability**: Wireless connections are intermittent
- **Byzantine Faults**: Compromised devices may behave maliciously
- **Latency Requirements**: Many applications need sub-second consensus

## Protocol Design

EdgeBFT achieves efficiency through several innovations:

### Leader Rotation with Reputation

We use a reputation-weighted random leader selection that adapts to network conditions and device reliability.

### Message Aggregation

Devices aggregate messages locally before broadcast, reducing network traffic by O(n) compared to all-to-all communication.

### Checkpointing

Periodic checkpoints allow devices to recover quickly from failures without replaying the entire history.

## Evaluation

We deployed EdgeBFT on a testbed of 100 Raspberry Pi devices:

| Metric | EdgeBFT | PBFT | Raft |
|--------|---------|------|------|
| Latency (ms) | 45 | 180 | 32 |
| Messages/tx | 3n | n² | 2n |
| Memory (KB) | 128 | 512 | 64 |
| Byzantine Tolerance | 33% | 33% | 0% |

EdgeBFT achieves Byzantine fault tolerance with communication complexity comparable to crash-tolerant protocols.

## Conclusion

EdgeBFT demonstrates that practical Byzantine consensus is achievable on resource-constrained edge devices, enabling new classes of secure distributed applications.
    `.trim(),
    date: "2024-10-12",
    readTime: "15 min read",
    authors: [{ name: "James Park", role: "Systems Researcher" }],
    tags: ["Distributed Systems", "IoT", "Consensus"],
    citations: [
      { title: "Practical Byzantine Fault Tolerance", authors: "Castro & Liskov", venue: "OSDI", year: 1999 },
      {
        title: "In Search of an Understandable Consensus Algorithm",
        authors: "Ongaro & Ousterhout",
        venue: "USENIX ATC",
        year: 2014,
      },
    ],
    codeUrl: "https://github.com/hanslabs/edgebft",
  },
  {
    slug: "multimodal-embeddings-unified",
    title: "Unified Multimodal Embeddings for Cross-Modal Retrieval",
    abstract:
      "A contrastive learning framework for learning aligned embeddings across text, images, audio, and structured data.",
    content: `
## Introduction

Cross-modal retrieval—finding images given text, or audio given images—requires embedding different modalities in a shared space. We present **UniEmbed**, a framework for learning aligned multimodal embeddings.

## Method

UniEmbed uses a multi-tower architecture with modality-specific encoders feeding into a shared projection space. We train with a novel contrastive objective that handles arbitrary modality pairs.

## Results

On cross-modal retrieval benchmarks:

- Text-to-Image: R@10 = 78.3%
- Image-to-Audio: R@10 = 62.1%  
- Structured-to-Text: R@10 = 85.7%

## Conclusion

Unified multimodal embeddings enable flexible cross-modal applications with a single model.
    `.trim(),
    date: "2024-09-20",
    readTime: "10 min read",
    authors: [{ name: "Dr. Sarah Chen", role: "Principal Investigator" }],
    tags: ["Machine Learning", "Multimodal", "Embeddings"],
  },
]

export function getArticleBySlug(slug: string): ResearchArticle | undefined {
  return researchArticles.find((a) => a.slug === slug)
}

export function getAllResearchTags(): string[] {
  const tags = new Set<string>()
  researchArticles.forEach((a) => a.tags.forEach((t) => tags.add(t)))
  return Array.from(tags).sort()
}
