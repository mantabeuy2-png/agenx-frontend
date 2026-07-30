'use client';

import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Selamat datang, {user?.name || 'Pengguna'} 👋
        </h1>
        <p className="text-gray-500 mt-1">Kelola website AI kamu dari sini</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Website', value: '0', color: 'blue' },
          { label: 'Website Aktif', value: '0', color: 'green' },
          { label: 'AI Generate', value: '0', color: 'cyan' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm"
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className={`text-3xl font-bold text-${stat.color}-600 mt-1`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Mulai Cepat</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/websites/new"
            className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100 hover:border-blue-200 transition-colors"
          >
            <p className="font-semibold text-gray-900">Buat Website Baru</p>
            <p className="text-sm text-gray-500 mt-1">AI akan generate website untuk bisnis kamu</p>
          </Link>
          <Link
            href="/websites"
            className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors"
          >
            <p className="font-semibold text-gray-900">Lihat Website Saya</p>
            <p className="text-sm text-gray-500 mt-1">Kelola website yang sudah dibuat</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
