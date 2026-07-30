'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { auth } from './api'

interface User {
  id: number
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check session on mount via httpOnly cookie
  useEffect(() => {
    auth.me()
      .then((res) => {
        if (res.user) setUser(res.user)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const res = await auth.login(email, password)
    setUser(res.user)
  }, [])

  const register = useCallback(async (name: string, email: string, password: string) => {
    const res = await auth.register(name, email, password)
    setUser(res.user)
  }, [])

  const logout = useCallback(async () => {
    try {
      await auth.logout()
    } catch {}
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
