"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
    { name: "Services", href: "/services" },
    { name: "Showcase", href: "/showcase" },
    { name: "Company", href: "/company" },
]

export function SiteHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" })
    }, [pathname])

    useEffect(() => {
        setMobileMenuOpen(false)
    }, [pathname])

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [mobileMenuOpen])

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
                <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8">
                    <div className="flex lg:flex-1">
                        <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                            <Image
                                src="/logo.png"
                                alt="Han's Labs Logo"
                                width={40}
                                height={40}
                                className="rounded-lg"
                            />
                            <span className="font-semibold text-foreground">Han's Labs</span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-3 lg:hidden">
                        <Button size="sm" asChild>
                            <Link href="/contact">Work With Us</Link>
                        </Button>
                        <button
                            type="button"
                            className="relative w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Open menu"}</span>
                            <span
                                className={`absolute h-0.5 w-5 bg-current transform transition-all duration-300 ease-in-out ${
                                    mobileMenuOpen ? "rotate-45" : "-translate-y-1.5"
                                }`}
                            />
                            <span
                                className={`absolute h-0.5 w-5 bg-current transform transition-all duration-300 ease-in-out ${
                                    mobileMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                                }`}
                            />
                            <span
                                className={`absolute h-0.5 w-5 bg-current transform transition-all duration-300 ease-in-out ${
                                    mobileMenuOpen ? "-rotate-45" : "translate-y-1.5"
                                }`}
                            />
                        </button>
                    </div>

                    <div className="hidden lg:flex lg:gap-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4 items-center">
                        <Button asChild>
                            <Link href="/company/contact">
                                Work With Us
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </nav>
            </header>

            <div
                className={`lg:hidden fixed inset-0 z-40 transition-visibility duration-300 ${
                    mobileMenuOpen ? "visible" : "invisible delay-300"
                }`}
            >
                <div
                    className={`absolute inset-0 bg-black transition-opacity duration-300 ease-in-out ${
                        mobileMenuOpen ? "opacity-70" : "opacity-0"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-hidden="true"
                />
                <div
                    className={`absolute top-16 right-0 bottom-0 w-full max-w-sm flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
                        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                    style={{ backgroundColor: "var(--background)" }}
                >
                    <div
                        className="flex-1 px-6 py-6 overflow-y-auto"
                        style={{ backgroundColor: "var(--background)" }}
                    >
                        <div className="space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="block w-full text-left rounded-lg px-3 py-3 text-base font-semibold text-foreground hover:bg-secondary transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
