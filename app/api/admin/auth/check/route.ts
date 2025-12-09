import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const adminCookie = request.cookies.get("admin_access")
  const validCode = process.env.ADMIN_ACCESS_CODE

  if (!validCode) {
    return NextResponse.json({ authenticated: false }, { status: 500 })
  }

  const authenticated = adminCookie?.value === validCode

  return NextResponse.json({ authenticated })
}