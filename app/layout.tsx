import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import "@/styles/docs-viewer.css"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ThemeProvider } from "@/components/theme-provider"
import { TerminalProvider, TerminalWidget } from "@/components/terminal"

const geistSans = Geist({ 
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

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
      <head>
        <link rel="icon" href="/logo-200px.png" sizes="any" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen bg-background`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          <TerminalProvider>
            <SiteHeader />
            <main className="relative z-10 pt-16">
              {children}
            </main>
            <SiteFooter />
            <TerminalWidget />
          </TerminalProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
