const API_URL = '/api'

interface ApiOptions {
  method?: string
  body?: unknown
  headers?: Record<string, string>
}

async function request<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {} } = options

  const reqHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...headers,
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: reqHeaders,
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include', // send cookies
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }))
    throw new Error(error.error || error.message || `API error: ${res.status}`)
  }

  return res.json()
}

// Auth
export const auth = {
  login: (email: string, password: string) =>
    request<{ user: { id: number; name: string; email: string } }>('/auth/login', {
      method: 'POST',
      body: { email, password },
    }),

  register: (name: string, email: string, password: string) =>
    request<{ user: { id: number; name: string; email: string } }>('/auth/register', {
      method: 'POST',
      body: { name, email, password },
    }),

  me: () =>
    request<{ user: { id: number; name: string; email: string } | null }>('/auth/me'),

  logout: () =>
    request<{ message: string }>('/auth/logout', { method: 'POST' }),
}

// Websites
export interface Website {
  id: number
  userId: number
  name: string
  businessType: string | null
  businessName: string | null
  status: string
  content: string | null
  publishedUrl: string | null
  customDomain: string | null
  createdAt: string
  updatedAt: string
}

export const websites = {
  list: () =>
    request<{ websites: Website[] }>('/websites'),

  get: (id: number) =>
    request<{ website: Website }>(`/websites/${id}`),

  create: (data: { name: string; businessType?: string; businessName?: string }) =>
    request<{ website: Website }>('/websites', {
      method: 'POST',
      body: data,
    }),

  update: (id: number, data: Partial<Website>) =>
    request<{ website: Website }>(`/websites/${id}`, {
      method: 'PUT',
      body: data,
    }),

  delete: (id: number) =>
    request<{ message: string }>(`/websites/${id}`, {
      method: 'DELETE',
    }),
}
