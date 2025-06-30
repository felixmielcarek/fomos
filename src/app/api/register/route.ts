import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  const hashed = await bcrypt.hash(password, 10)
  try {
    await prisma.user.create({
      data: { email, password: hashed },
    })
    return NextResponse.json({ message: 'User created' }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Email already in use' }, { status: 400 })
  }
}
