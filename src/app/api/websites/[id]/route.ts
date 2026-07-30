import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

export const runtime = 'nodejs'

// GET /api/websites/[id]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = getUserFromRequest(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const website = await prisma.website.findFirst({
    where: { id: Number(id), userId: user.userId },
  })

  if (!website) {
    return NextResponse.json({ error: 'Website tidak ditemukan' }, { status: 404 })
  }

  return NextResponse.json({ website })
}

// PUT /api/websites/[id] - update website
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = getUserFromRequest(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json()

  const website = await prisma.website.findFirst({
    where: { id: Number(id), userId: user.userId },
  })

  if (!website) {
    return NextResponse.json({ error: 'Website tidak ditemukan' }, { status: 404 })
  }

  const updated = await prisma.website.update({
    where: { id: Number(id) },
    data: {
      name: body.name ?? website.name,
      businessType: body.businessType ?? website.businessType,
      businessName: body.businessName ?? website.businessName,
      content: body.content ?? website.content,
      status: body.status ?? website.status,
    },
  })

  return NextResponse.json({ website: updated })
}

// DELETE /api/websites/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = getUserFromRequest(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const website = await prisma.website.findFirst({
    where: { id: Number(id), userId: user.userId },
  })

  if (!website) {
    return NextResponse.json({ error: 'Website tidak ditemukan' }, { status: 404 })
  }

  await prisma.website.delete({ where: { id: Number(id) } })

  return NextResponse.json({ message: 'Website berhasil dihapus' })
}
