import type React from "react"
import '@/app/globals.css'
import { TestNav } from "@/components/tests/test-nav"

export default function TestLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <section className={`min-h-screen bg-background`}>
              {children}
            <TestNav />
      </section>
  )
}
