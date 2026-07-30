'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { websites } from '@/lib/api';

const businessTypes = [
  { value: 'salon', label: 'Salon Kecantikan', icon: '💇' },
  { value: 'bengkel', label: 'Bengkel Mobil/Motor', icon: '🔧' },
  { value: 'restoran', label: 'Restoran/Kafe', icon: '🍽️' },
  { value: 'toko', label: 'Toko Online', icon: '🛍️' },
  { value: 'klinik', label: 'Klinik/Dokter', icon: '🏥' },
  { value: 'fotografi', label: 'Fotografi', icon: '📸' },
  { value: 'fitness', label: 'Fitness/Gym', icon: '💪' },
  { value: 'property', label: 'Properti', icon: '🏠' },
  { value: 'laundry', label: 'Laundry', icon: '🧺' },
  { value: 'katering', label: 'Katering', icon: '🍱' },
  { value: 'lainnya', label: 'Lainnya', icon: '📋' },
];

export default function NewWebsitePage() {
  const { token } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    business_type: '',
    business_name: '',
    name: '',
  });

  const handleGenerate = async () => {
    if (!token) return;
    setLoading(true);

    try {
      const res = await websites.create(token, form);
      router.push(`/websites/${res.id}/editor`);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Gagal membuat website');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Buat Website Baru</h1>
      <p className="text-gray-500 mb-8">Isi data bisnis kamu, AI akan generate semuanya</p>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= s
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {s}
            </div>
            {s < 3 && <div className={`w-12 h-0.5 ${step > s ? 'bg-blue-600' : 'bg-gray-100'}`} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Pilih Jenis Usaha</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {businessTypes.map((bt) => (
              <button
                key={bt.value}
                onClick={() => {
                  setForm({ ...form, business_type: bt.value, name: bt.label });
                  setStep(2);
                }}
                className={`p-4 rounded-xl border text-center transition-all ${
                  form.business_type === bt.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-100 hover:border-gray-200 bg-white'
                }`}
              >
                <span className="text-2xl">{bt.icon}</span>
                <p className="text-sm text-gray-700 mt-1">{bt.label}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Detail Bisnis</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Bisnis</label>
              <input
                type="text"
                value={form.business_name}
                onChange={(e) => setForm({ ...form, business_name: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contoh: Salon Cantik Ayu"
                required
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setStep(1)} className="px-4 py-2.5 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
                Kembali
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!form.business_name}
                className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
              >
                Lanjut
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Konfirmasi</h2>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2 mb-6">
            <p className="text-sm"><span className="text-gray-500">Jenis:</span> <span className="font-medium">{businessTypes.find((bt) => bt.value === form.business_type)?.label}</span></p>
            <p className="text-sm"><span className="text-gray-500">Nama:</span> <span className="font-medium">{form.business_name}</span></p>
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-600 transition-all disabled:opacity-50 shadow-lg shadow-blue-200"
          >
            {loading ? 'AI sedang bekerja...' : '✨ Generate Website Sekarang'}
          </button>
        </div>
      )}
    </div>
  );
}
