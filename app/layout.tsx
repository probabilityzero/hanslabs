import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ThemeProvider } from "@/components/theme-provider"

const geistSans = Geist({ 
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

// <CHANGE> Updated metadata for Han's Labs
export const metadata: Metadata = {
  title: "Han's Labs | Software Development Agency",
  description:
    "An R&D-first creative engineering lab building intelligent systems, creative experiences, and cutting-edge technology.",
  generator: "Next.js",
  keywords: ["R&D", "engineering", "AI", "machine learning", "creative technology", "POC", "research"],
  authors: [{ name: "Han's Labs" }],
  openGraph: {
    title: "Han's Labs | Software Development Agency",
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen bg-background`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <SiteHeader />
          <main className="pt-16">
        {children}
        </main>
        <SiteFooter />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
