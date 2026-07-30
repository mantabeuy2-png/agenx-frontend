import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getTokenFromCookies, verifyToken } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    const token = getTokenFromCookies(request)
    if (!token) {
      return NextResponse.json({ user: null })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ user: null })
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, name: true, email: true, createdAt: true },
    })

    if (!user) {
      return NextResponse.json({ user: null })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json({ user: null })
  }
}
