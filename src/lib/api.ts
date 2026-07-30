const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface ApiOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
  token?: string;
}

async function request<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {}, token } = options;

  const reqHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...headers,
  };

  if (token) {
    reqHeaders['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: reqHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || `API error: ${res.status}`);
  }

  return res.json();
}

// Auth
export const auth = {
  login: (email: string, password: string) =>
    request<{ token: string; user: { id: number; name: string; email: string } }>('/auth/login', {
      method: 'POST',
      body: { email, password },
    }),

  register: (name: string, email: string, password: string) =>
    request<{ token: string; user: { id: number; name: string; email: string } }>('/auth/register', {
      method: 'POST',
      body: { name, email, password },
    }),

  me: (token: string) =>
    request<{ id: number; name: string; email: string }>('/auth/me', { token }),

  logout: (token: string) =>
    request<{ message: string }>('/auth/logout', { method: 'POST', token }),
};

// Websites
export const websites = {
  list: (token: string) =>
    request<Array<{ id: number; name: string; status: string; url: string; updated_at: string }>>('/websites', { token }),

  get: (token: string, id: number) =>
    request<{ id: number; name: string; content: string }>(`/websites/${id}`, { token }),

  create: (token: string, data: { name: string; business_type: string; business_name: string }) =>
    request<{ id: number; name: string }>('/websites', {
      method: 'POST',
      body: data,
      token,
    }),

  updateContent: (token: string, id: number, content: string) =>
    request<{ message: string }>(`/websites/${id}`, {
      method: 'PATCH',
      body: { content },
      token,
    }),

  generate: (token: string, id: number) =>
    request<{ message: string; preview_url: string }>(`/websites/${id}/generate`, {
      method: 'POST',
      token,
    }),

  publish: (token: string, id: number) =>
    request<{ message: string; url: string }>(`/websites/${id}/publish`, {
      method: 'POST',
      token,
    }),
};

export default request;
