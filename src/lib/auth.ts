import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'agenx-secret-key-change-in-production'

export interface JWTPayload {
  userId: number
  email: string
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch {
    return null
  }
}

export function getTokenFromCookies(request: Request): string | null {
  const cookieHeader = request.headers.get('cookie')
  if (!cookieHeader) return null
  const cookies = cookieHeader.split(';').map(c => c.trim())
  for (const cookie of cookies) {
    const [name, value] = cookie.split('=')
    if (name === 'token') return value
  }
  return null
}

export function getUserFromRequest(request: Request): JWTPayload | null {
  const token = getTokenFromCookies(request)
  if (!token) return null
  return verifyToken(token)
}
