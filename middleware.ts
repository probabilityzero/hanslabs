import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const adminCode = request.cookies.get("admin_access")?.value
  const validCode = process.env.ADMIN_ACCESS_CODE

  if (pathname === "/admin/login") {
    if (validCode && adminCode === validCode) {
      return NextResponse.redirect(new URL("/admin", request.url))
    }
    return NextResponse.next()
  }

  if (pathname.startsWith("/admin")) {
    if (!validCode) {
      return NextResponse.redirect(new URL("/", request.url))
    }

    if (adminCode !== validCode) {
      const url = new URL("/admin/login", request.url)
      url.searchParams.set("redirect", pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}