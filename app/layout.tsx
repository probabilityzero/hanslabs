import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

// <CHANGE> Updated metadata for Han's Labs
export const metadata: Metadata = {
  title: "Han's Labs | R&D Creative Engineering",
  description:
    "An R&D-first creative engineering lab building intelligent systems, creative experiences, and cutting-edge technology.",
  generator: "Next.js",
  keywords: ["R&D", "engineering", "AI", "machine learning", "creative technology", "POC", "research"],
  authors: [{ name: "Han's Labs" }],
  openGraph: {
    title: "Han's Labs | R&D Creative Engineering",
    description:
      "An R&D-first creative engineering lab building intelligent systems, creative experiences, and cutting-edge technology.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
