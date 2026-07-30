import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

export const runtime = 'nodejs'

// GET /api/websites - get user's websites
export async function GET(request: Request) {
  const user = getUserFromRequest(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const websites = await prisma.website.findMany({
    where: { userId: user.userId },
    orderBy: { updatedAt: 'desc' },
  })

  return NextResponse.json({ websites })
}

// POST /api/websites - create new website
export async function POST(request: Request) {
  const user = getUserFromRequest(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { name, businessType, businessName } = await request.json()

    if (!name) {
      return NextResponse.json({ error: 'Nama website wajib diisi' }, { status: 400 })
    }

    const website = await prisma.website.create({
      data: {
        userId: user.userId,
        name,
        businessType,
        businessName,
        status: 'draft',
        content: '',
      },
    })

    return NextResponse.json({ website }, { status: 201 })
  } catch (error) {
    console.error('Create website error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
