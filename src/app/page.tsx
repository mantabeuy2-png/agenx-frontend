'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-cyan-50">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg" />
              <span className="font-bold text-lg text-gray-900">AgenX</span>
            </div>
            <nav className="flex items-center gap-4">
              <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Masuk
              </Link>
              <Link
                href="/register"
                className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Daftar
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
          Buat Website UMKM{' '}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
            dalam 5 Menit
          </span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Cukup isi data bisnis kamu, AI kami akan generate website + SEO + blog + logo secara otomatis.
          Tanpa coding, tanpa ribet.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/register"
            className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
          >
            Mulai Sekarang
          </Link>
          <Link
            href="#how-it-works"
            className="px-6 py-3 text-gray-700 rounded-xl font-medium hover:bg-gray-100 transition-colors border border-gray-200"
          >
            Lihat Cara Kerja
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Cara Kerjanya</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '1', title: 'Isi Data Bisnis', desc: 'Nama usaha, jenis, lokasi, dan logo — cukup 5 menit' },
            { step: '2', title: 'AI Generate Semua', desc: 'Website, SEO, blog, konten sosial media — otomatis' },
            { step: '3', title: 'Edit & Publikasikan', desc: 'Drag-drop editor, tinggal publish. Selesai.' },
          ].map((item) => (
            <div key={item.step} className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold text-lg mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        © 2026 AgenX. All rights reserved.
      </footer>
    </div>
  );
}
