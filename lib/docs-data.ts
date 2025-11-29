export interface DocPage {
  slug: string
  title: string
  description: string
  content: string
  category: string
  order: number
}

export const docsCategories = [
  { id: "getting-started", name: "Getting Started", order: 1 },
  { id: "api-reference", name: "API Reference", order: 2 },
  { id: "tutorials", name: "Tutorials", order: 3 },
  { id: "cli", name: "CLI Reference", order: 4 },
]

export const docPages: DocPage[] = [
  {
    slug: "introduction",
    title: "Introduction",
    description: "Welcome to Han's Labs documentation. Learn about our tools and how to get started.",
    category: "getting-started",
    order: 1,
    content: `
## Welcome to Han's Labs

Han's Labs provides a suite of tools for building intelligent systems, creative experiences, and high-performance infrastructure.

## What We Offer

- **FrameDB**: High-performance temporal database
- **Neural Canvas**: AI-powered creative tools
- **SemanticDB**: Hybrid vector search engine

## Quick Links

- [Quick Start Guide](/docs/quickstart)
- [API Reference](/docs/api-overview)
- [Tutorials](/docs/tutorial-framedb)
    `.trim(),
  },
  {
    slug: "quickstart",
    title: "Quick Start",
    description: "Get up and running with Han's Labs tools in under 5 minutes.",
    category: "getting-started",
    order: 2,
    content: `
## Installation

Install our CLI tool to get started:

\`\`\`bash
npm install -g @hanslabs/cli
\`\`\`

## Initialize a Project

Create a new project:

\`\`\`bash
hanslabs init my-project
cd my-project
\`\`\`

## Start Development

Launch the development server:

\`\`\`bash
hanslabs dev
\`\`\`

Your project is now running at \`http://localhost:3000\`.

## Next Steps

- Read the [API Overview](/docs/api-overview)
- Follow the [FrameDB Tutorial](/docs/tutorial-framedb)
- Check out [example projects](https://github.com/hanslabs/examples)
    `.trim(),
  },
  {
    slug: "api-overview",
    title: "API Overview",
    description: "Overview of Han's Labs APIs and how to authenticate.",
    category: "api-reference",
    order: 1,
    content: `
## Authentication

All API requests require authentication using an API key:

\`\`\`bash
curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.hanslabs.com/v1/endpoint
\`\`\`

## Base URL

All API endpoints are relative to:

\`\`\`
https://api.hanslabs.com/v1
\`\`\`

## Rate Limits

| Tier | Requests/minute | Requests/day |
|------|-----------------|--------------|
| Free | 60 | 1,000 |
| Pro | 600 | 50,000 |
| Enterprise | Unlimited | Unlimited |

## Response Format

All responses are JSON:

\`\`\`json
{
  "data": { ... },
  "meta": {
    "request_id": "req_abc123",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
\`\`\`
    `.trim(),
  },
  {
    slug: "framedb-api",
    title: "FrameDB API",
    description: "Complete API reference for FrameDB temporal database.",
    category: "api-reference",
    order: 2,
    content: `
## Overview

FrameDB provides a REST API for time-series data operations.

## Write Data

\`\`\`bash
POST /v1/framedb/write
Content-Type: application/json

{
  "database": "metrics",
  "points": [
    {
      "measurement": "cpu",
      "tags": { "host": "server01" },
      "fields": { "usage": 45.2 },
      "timestamp": "2024-01-15T10:30:00Z"
    }
  ]
}
\`\`\`

## Query Data

\`\`\`bash
POST /v1/framedb/query
Content-Type: application/json

{
  "database": "metrics",
  "query": "SELECT mean(usage) FROM cpu WHERE time > now() - 1h GROUP BY time(5m)"
}
\`\`\`

## Response

\`\`\`json
{
  "results": [
    {
      "series": [
        {
          "name": "cpu",
          "columns": ["time", "mean"],
          "values": [
            ["2024-01-15T10:00:00Z", 42.5],
            ["2024-01-15T10:05:00Z", 44.1]
          ]
        }
      ]
    }
  ]
}
\`\`\`
    `.trim(),
  },
  {
    slug: "tutorial-framedb",
    title: "FrameDB Tutorial",
    description: "Learn how to use FrameDB for time-series analytics.",
    category: "tutorials",
    order: 1,
    content: `
## Introduction

This tutorial walks you through setting up FrameDB for a monitoring use case.

## Prerequisites

- Node.js 18+
- Docker (for local development)

## Step 1: Start FrameDB

Pull and run the FrameDB Docker image:

\`\`\`bash
docker run -d -p 8086:8086 hanslabs/framedb:latest
\`\`\`

## Step 2: Create a Database

\`\`\`bash
curl -X POST http://localhost:8086/v1/databases \\
  -H "Content-Type: application/json" \\
  -d '{"name": "monitoring"}'
\`\`\`

## Step 3: Write Data

\`\`\`javascript
import { FrameDB } from '@hanslabs/framedb';

const db = new FrameDB('http://localhost:8086');

await db.write('monitoring', [
  {
    measurement: 'temperature',
    tags: { location: 'office' },
    fields: { value: 22.5 },
  }
]);
\`\`\`

## Step 4: Query Data

\`\`\`javascript
const results = await db.query('monitoring', \`
  SELECT mean(value) 
  FROM temperature 
  WHERE time > now() - 24h 
  GROUP BY time(1h)
\`);

console.log(results);
\`\`\`

## Next Steps

- Explore [aggregation functions](/docs/framedb-api#aggregations)
- Set up [retention policies](/docs/framedb-api#retention)
- Configure [continuous queries](/docs/framedb-api#continuous-queries)
    `.trim(),
  },
  {
    slug: "cli-reference",
    title: "CLI Reference",
    description: "Complete reference for the Han's Labs CLI tool.",
    category: "cli",
    order: 1,
    content: `
## Installation

\`\`\`bash
npm install -g @hanslabs/cli
\`\`\`

## Commands

### hanslabs init

Initialize a new project:

\`\`\`bash
hanslabs init [project-name] [options]

Options:
  --template <name>   Use a starter template
  --typescript        Enable TypeScript
  --git               Initialize git repository
\`\`\`

### hanslabs dev

Start development server:

\`\`\`bash
hanslabs dev [options]

Options:
  --port <number>     Port to run on (default: 3000)
  --host <string>     Host to bind to (default: localhost)
\`\`\`

### hanslabs build

Build for production:

\`\`\`bash
hanslabs build [options]

Options:
  --output <dir>      Output directory (default: ./dist)
  --minify            Minify output
\`\`\`

### hanslabs deploy

Deploy to Han's Labs cloud:

\`\`\`bash
hanslabs deploy [options]

Options:
  --env <name>        Environment (default: production)
  --region <region>   Deployment region
\`\`\`
    `.trim(),
  },
]

export function getDocBySlug(slug: string): DocPage | undefined {
  return docPages.find((d) => d.slug === slug)
}

export function getDocsByCategory(category: string): DocPage[] {
  return docPages.filter((d) => d.category === category).sort((a, b) => a.order - b.order)
}
