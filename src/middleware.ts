import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyJwt } from '@/lib/auth'

const protectedRoutes = ['/dashboard', '/api/protected']

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const verified = token && verifyJwt(token)

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )

  if (isProtected && !verified) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: protectedRoutes,
}
