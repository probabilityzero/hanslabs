"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
    { name: "Showcase", href: "/showcase" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/company/about" },
]

export function SiteHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [, setIsLoading] = useState(false)
    const [, setLoadingProgress] = useState(0)
    const pathname = usePathname()
    const [hoveredNav, setHoveredNav] = useState<string | null>(null)

    const isContactPage = pathname === "/company/contact"
    const isActivePage = (href: string) => {
        if (href === "/") return pathname === "/"
        return pathname.startsWith(href)
    }

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

    useEffect(() => {
        setIsLoading(true)
        setLoadingProgress(0)

        const timer1 = setTimeout(() => setLoadingProgress(30), 50)
        const timer2 = setTimeout(() => setLoadingProgress(60), 150)
        const timer3 = setTimeout(() => setLoadingProgress(80), 300)
        const timer4 = setTimeout(() => setLoadingProgress(100), 400)
        const timer5 = setTimeout(() => {
            setIsLoading(false)
            setLoadingProgress(0)
        }, 500)

        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
            clearTimeout(timer3)
            clearTimeout(timer4)
            clearTimeout(timer5)
        }
    }, [pathname])

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
                <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8">
                    <div className="flex lg:flex-1">
                        <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2 group">
                            <Image
                                src="/logo-200px.png"
                                alt="Han's Labs Logo"
                                width={40}
                                height={40}
                                className="rounded-lg transition-transform duration-300 group-hover:scale-105"
                            />
                            <span className="font-semibold text-foreground">Han's Labs</span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-3 lg:hidden">
                        <Button size="sm" asChild>
                            <Link href="/company/contact">Get in Touch</Link>
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
                                className="relative text-sm font-medium transition-colors group py-1"
                                onMouseEnter={() => setHoveredNav(item.href)}
                                onMouseLeave={() => setHoveredNav(null)}
                            >
                                <span className={`transition-colors duration-200 ${
                                    isActivePage(item.href) 
                                        ? "text-foreground" 
                                        : "text-muted-foreground group-hover:text-foreground"
                                }`}>
                                    {item.name}
                                </span>
                                <span
                                    className={`
                                        absolute bottom-1 left-0 h-0.5 w-full bg-primary rounded-full
                                        transform transition-transform duration-300 ease-out
                                        ${hoveredNav === item.href || isActivePage(item.href)
                                            ? "scale-x-100 origin-left"
                                            : "scale-x-0 origin-right"}
                                    `}
                                />
                            </Link>
                        ))}
                    </div>

                    <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4 items-center">
                        <Button asChild className="group min-w-[130px] justify-center gap-0">
                            <Link href="/company/contact" className="flex items-center justify-center">
                                <span>Get in Touch</span>
                                <span 
                                    className={`flex items-center justify-center overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                                        isContactPage ? "w-0 opacity-0 -translate-x-full" : "w-6 opacity-100"
                                    }`}
                                >
                                    <ArrowRight 
                                        className={`h-4 w-4 flex-shrink-0 transition-transform ml-2 duration-300 ease-out ${
                                            isContactPage ? "" : "group-hover:translate-x-0.5"
                                        }`}
                                    />
                                </span>
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
                                    className={`block w-full text-left rounded-lg px-3 py-3 text-base font-semibold transition-colors relative ${
                                        isActivePage(item.href)
                                            ? "text-primary bg-primary/10"
                                            : "text-foreground hover:bg-secondary"
                                    }`}
                                >
                                    {isActivePage(item.href) && (
                                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
                                    )}
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
