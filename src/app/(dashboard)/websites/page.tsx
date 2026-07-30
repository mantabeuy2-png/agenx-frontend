'use client';

import { useAuth } from '@/lib/auth-context';

export default function WebsitesPage() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Website Saya</h1>

      {/* Empty state */}
      <div className="bg-white rounded-xl border border-gray-100 p-12 text-center shadow-sm">
        <div className="text-4xl mb-4">🌐</div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Belum ada website
        </h2>
        <p className="text-gray-500 mb-6">
          Buat website pertama kamu dengan AI dalam hitungan menit
        </p>
        <a
          href="/websites/new"
          className="inline-flex px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Buat Website
        </a>
      </div>
    </div>
  );
}
