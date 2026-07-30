'use client';

import { useAuth } from '@/lib/auth-context';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>

      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-500">{user?.name}</div>
        <button
          onClick={logout}
          className="text-sm text-gray-500 hover:text-red-500 transition-colors"
        >
          Keluar
        </button>
      </div>
    </header>
  );
}
