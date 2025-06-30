import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { signJwt } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

  const token = signJwt({ userId: user.id })
  const res = NextResponse.json({ message: 'Login successful' })
  res.cookies.set('token', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 7 })
  return res
}