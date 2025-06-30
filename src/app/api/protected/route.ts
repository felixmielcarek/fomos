import { NextRequest, NextResponse } from 'next/server'
import { verifyJwt } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const decoded = token && verifyJwt(token)
  if (!decoded) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.json({ message: 'You are authorized', user: decoded })
}