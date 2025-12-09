"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Lock, ArrowLeft, Loader2 } from "lucide-react"

function LoginForm() {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })

      const data = await res.json()

      if (data.success) {
        const redirect = searchParams.get("redirect") || "/admin"
        router.push(redirect)
      } else {
        setError("Invalid access code")
        setCode("")
      }
    } catch {
      setError("Authentication failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="code"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Access Code
        </label>
        <input
          id="code"
          type="password"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground"
          placeholder="Enter access code"
          autoFocus
          disabled={loading}
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading || !code}
        className="w-full py-3 px-4 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Authenticating...
          </>
        ) : (
          "Access Dashboard"
        )}
      </button>
    </form>
  )
}

function LoginFormFallback() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-5 w-24 bg-muted rounded animate-pulse mb-2" />
        <div className="h-12 w-full bg-muted rounded-lg animate-pulse" />
      </div>
      <div className="h-12 w-full bg-muted rounded-lg animate-pulse" />
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to site
        </a>

        <div className="p-8 rounded-2xl bg-card border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-lg bg-primary/10">
              <Lock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                Admin Access
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your access code to continue
              </p>
            </div>
          </div>

          <Suspense fallback={<LoginFormFallback />}>
            <LoginForm />
          </Suspense>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          This area is restricted to authorized personnel only.
        </p>
      </div>
    </div>
  )
}