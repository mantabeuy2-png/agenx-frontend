"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────────────────────────────
   Data
   ──────────────────────────────────────────────────────────── */

const agents = [
  { icon: "🎨", name: "DesignerAgent", role: "Desain & Layout", desc: "Menentukan struktur visual, color palette, dan susunan section GrapesJS. Website langsung enak dilihat, mobile-first.", tags: ["Layout", "Color Palette", "GrapesJS"] },
  { icon: "✍️", name: "CopywriterAgent", role: "Kata-kata Penjualan", desc: "Menghasilkan headline persuasif (AIDA/PAS), deskripsi bisnis, FAQ, dan Call-to-Action yang mengubah pengunjung jadi pembeli.", tags: ["Headline AIDA", "FAQ", "CTA"] },
  { icon: "🔍", name: "SEOAgent", role: "Rangking di Google", desc: "Menyusun Meta Title, Description, Schema LocalBusiness/Product, Sitemap, dan OpenGraph. Toko kamu gampang ditemukan.", tags: ["Meta", "Schema", "Sitemap"] },
  { icon: "📅", name: "BlogSchedulerAgent", role: "Konten Otomatis", desc: "Menulis dan menayangkan artikel blog SEO relevan otomatis 2x seminggu via n8n. Google selalu dapat konten segar.", tags: ["Auto Blog", "n8n", "2x/Minggu"] },
  { icon: "🛒", name: "CommerceAgent", role: "Toko Online", desc: "Otomatisasi pemetaan produk, varian, dan harga ke Medusa.js API. Katalog, ongkir Biteship, dan pembayaran QRIS siap jalan.", tags: ["Medusa.js", "Biteship", "QRIS"] },
];

const steps = [
  { no: "1", title: "Registrasi", desc: "Daftar via email atau Google OAuth di dashboard AgenX. Tanpa kartu kredit." },
  { no: "2", title: "Isi Info Usaha", desc: "Pilih jenis usaha (Restoran, Salon, Toko Online, Jasa) & deskripsikan produkmu." },
  { no: "3", title: "AI Provision < 60s", desc: "Laravel mengkoordinasikan LiteLLM & Medusa.js. Layout, copy, katalog, SEO langsung jadi." },
  { no: "4", title: "Polish di Editor", desc: "Website muncul di GrapesJS Editor. Ganti warna, foto, atau teks drag-and-drop." },
  { no: "5", title: "One-Click Publish", desc: "Klik Publish. Website langsung online + siap terima pesanan via QRIS / Transfer Bank." },
];

const toolkit = [
  { icon: "🖼️", title: "Banner & IG Story Generator", desc: "Bikin banner promo dan IG Story dari AI dalam hitungan detik." },
  { icon: "✨", title: "Logo Creator", desc: "Generate logo usaha dengan prompt sederhana. Siap dipakai di mana saja." },
  { icon: "📍", title: "Google Business Profile", desc: "AI bantu siapkan profil bisnis Google supaya gampang ditemukan di Maps." },
  { icon: "🔳", title: "QR Code Generator", desc: "Buat QR code untuk menu, pembayaran QRIS, dan link website." },
];

const plans = [
  { name: "Starter", tagline: "Coba gratis, tanpa kartu kredit", price: "Rp 0", period: "", features: ["1 Website", "Subdomain .agenx.site", "3x AI Generation", "Katalog Basic Medusa", "Branding AgenX"], cta: "Mulai Gratis", highlight: false },
  { name: "Pro Business", tagline: "Untuk UMKM yang serius jualan online", price: "Rp 149.000", period: "/bulan", features: ["5 Website", "Free Custom Domain", "AI Generation Unlimited", "Full Checkout QRIS", "Auto Blog SEO 2x/minggu", "Tanpa Branding AgenX"], cta: "Upgrade ke Pro", highlight: true },
  { name: "Premium White-Label", tagline: "Untuk Freelancer, Web Dev & Digital Agency", price: "Rp 299.000", period: "/bulan", features: ["15 Website", "Multi-Tenant Client Dashboard", "White-Label Logo Agensi", "Export Code / API Access", "Dedicated Medusa.js Container", "Priority LiteLLM AI Gateway"], cta: "Ambil Premium", highlight: false },
];

const faqs = [
  { q: "Apakah saya perlu bisa coding?", a: "Tidak sama sekali. AgenX dirancang untuk UMKM. Cukup isi deskripsi usaha, AI yang mengerjakan desain, teks, dan SEO." },
  { q: "Berapa lama website jadi?", a: "Dari registrasi sampai publish rata-rata kurang dari 3 menit. 5 AI agent kerja secara paralel." },
  { q: "Bisa jualan online pakai apa?", a: "Toko di atas Medusa.js, pembayaran QRIS / Transfer Bank, ongkir real-time Biteship. Aktif di fase akhir." },
  { q: "Saya agensi — paket mana cocok?", a: "Premium White-Label: 15 website, dashboard multi-tenant, white-label, export code, dedicated Medusa." },
];

const stats = [
  { v: "< 3 Menit", l: "Registrasi → Publish" },
  { v: "5 Agent", l: "AI bekerja bareng" },
  { v: "Rp 0", l: "Mulai gratis" },
  { v: "QRIS + Ongkir", l: "Siap jualan online" },
];

/* ──────────────────────────────────────────────────────────────
   Komponen
   ──────────────────────────────────────────────────────────── */

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-5 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="glass-strong rounded-2xl flex items-center justify-between h-14 px-5">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-anim-gradient flex items-center justify-center text-white font-bold shadow-glow">A</div>
            <span className="font-extrabold text-xl text-white">AgenX</span>
          </div>

          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-midnight_text/70">
            <a href="#agent" className="hover:text-primary transition-colors">5 AI Agent</a>
            <a href="#cara-kerja" className="hover:text-primary transition-colors">Cara Kerja</a>
            <a href="#toolkit" className="hover:text-primary transition-colors">AI Toolkit</a>
            <a href="#pricing" className="hover:text-primary transition-colors">Harga</a>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="hidden sm:block text-sm font-medium text-midnight_text/70 hover:text-white transition">Masuk</Link>
            <Link href="/dashboard" className="neon rounded-full text-sm font-medium px-6 py-2 bg-primary text-midnight hover:bg-transparent hover:text-primary transition shadow-glow">Mulai Gratis</Link>
            <button className="lg:hidden p-2 text-midnight_text/60" onClick={() => setOpen(!open)} aria-label="menu">
              <span className="block w-5 h-0.5 bg-midnight_text mb-1 transition"></span>
              <span className="block w-5 h-0.5 bg-midnight_text mb-1 transition"></span>
              <span className="block w-5 h-0.5 bg-midnight_text transition"></span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* Hero device with 3D tilt + parallax */
function HeroDevice() {
  const ref = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setRotate({ x: -y * 18, y: x * 18 });
    };
    const onLeave = () => setRotate({ x: 0, y: 0 });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, []);

  return (
    <div ref={ref} className="perspective w-full h-full">
      <div
        className="relative w-full max-w-md mx-auto rounded-[2rem] transition-transform duration-500 ease-out"
        style={{ transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` }}
      >
        {/* Device glow */}
        <div className="absolute -inset-2 rounded-[2.5rem] bg-anim-gradient opacity-30 blur-2xl" />
        {/* Browser chrome */}
        <div className="bg-surface_light/60 border border-white/10 rounded-[1.75rem] overflow-hidden backdrop-blur-xl">
          <div className="h-12 bg-black/40 border-b border-white/5 flex items-center px-4 gap-2">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
            <span className="ml-4 flex-1 h-5 bg-black/30 rounded-full text-xs text-white/40 px-3 flex items-center">warungku.agenx.site</span>
          </div>
          <div className="p-5 bg-gradient-to-b from-[#0a0f24] to-[#050714]">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-6 h-6 rounded-lg bg-anim-gradient flex items-center justify-center text-white font-bold text-xs">W</div>
              <div className="h-2.5 w-20 bg-white/10 rounded-full" />
            </div>
            <div className="h-3 w-3/4 bg-white/15 rounded-full mb-2" />
            <div className="h-3 w-1/2 bg-white/15 rounded-full mb-4" />
            <div className="h-2 w-full bg-white/10 rounded-full mb-2" />
            <div className="h-2 w-5/6 bg-white/10 rounded-full mb-5" />
            <div className="flex gap-2 mb-5">
              <div className="h-6 w-24 bg-primary rounded-full neon" />
              <div className="h-6 w-20 bg-transparent border border-white/15 rounded-full" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-2">
                  <div className="h-7 bg-white/10 rounded-md mb-1" />
                  <div className="h-1.5 w-3/4 bg-white/15 rounded-full mb-1" />
                  <div className="h-1.5 w-1/2 bg-white/15 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating badges */}
        <div className="absolute -top-3 -right-3 z-10 glass-strong rounded-xl px-3 py-1.5 flex items-center gap-1.5 shadow-glow">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="text-xs font-semibold text-white">Published ✓</span>
        </div>
        <div className="absolute -bottom-2 -left-3 z-10 glass-strong rounded-xl px-3 py-1.5 flex items-center gap-1.5 shadow-glow">
          <span className="text-base">🛒</span>
          <span className="text-xs font-semibold text-white">QRIS Ready</span>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="pt-28 lg:pt-32 pb-16 lg:pb-20 overflow-hidden relative">
      <div className="absolute inset-0 noise-grid pointer-events-none [mask-image:radial-gradient(ellipse_at_center,theme(colors.white)_0%,transparent_65%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT */}
          <div className="flex flex-col gap-7">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 w-fit shadow-glow-purple">
              🇮🇩 Untuk UMKM Indonesia
            </span>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-white leading-[1.06] tracking-tight">
              Bikin Website UMKM <br />
              <span className="bg-clip-text text-transparent bg-anim-gradient">dalam 5 Menit</span>
            </h1>

            <p className="text-lg text-midnight_text/70 max-w-xl leading-relaxed">
              Kasih deskripsi usaha saja. <span className="font-semibold text-white">5 AI agent</span> langsung bikin
              website + SEO + konten + katalog produk. Edit drag-and-drop, one-click publish, siap jualan online.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <button className="w-full sm:w-auto text-midnight font-medium text-xl py-4 px-8 rounded-full border border-primary bg-primary hover:bg-transparent hover:shadow-glow transition shadow-glow">
                  Buat Website Sekarang
                </button>
              </Link>
              <a href="#cara-kerja">
                <button className="w-full sm:w-auto text-white text-xl font-medium py-4 px-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition">
                  Lihat Cara Kerja
                </button>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
              {stats.map((s) => (
                <div key={s.l} className="text-center lg:text-start">
                  <div className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-anim-gradient">{s.v}</div>
                  <div className="text-sm text-midnight_text/50 mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — 3D device */}
          <HeroDevice />
        </div>
      </div>
    </section>
  );
}

/* Testimonial */
function Testimonial() {
  return (
    <section id="testi" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="glass-strong rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute -inset-40 bg-primary/5 blur-3xl rounded-full" />
            <div className="relative">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-full bg-anim-gradient flex items-center justify-center text-white text-3xl font-bold shadow-glow">S</div>
                <div>
                  <p className="text-xl font-semibold text-white">Sari Wulandari</p>
                  <p className="text-sm text-midnight_text/55">Pemilik Warung Kopi · Bandung</p>
                </div>
              </div>
              <p className="mt-5 font-medium text-xl leading-9 text-midnight_text/85">
                “Gak nyangka website warung saya jadi <span className="text-primary">3 menit</span>. Sekarang pesanan
                online masuk tiap hari lewat QRIS — modal cuma isi form, sisanya AI yang kerja.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Dipercaya <span className="bg-clip-text text-transparent bg-anim-gradient">1000+ UMKM</span> Indonesia.
            </h2>
            <p className="text-midnight_text/70 text-lg leading-relaxed max-w-md">
              AgenX bantu UMKM bikin website, toko online, dan konten pemasaran — semua otomatis oleh AI dalam satu
              platform.
            </p>
            <Link href="#pricing" className="inline-flex items-center gap-2 text-primary text-lg font-medium w-fit">
              Coba sekarang
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 5 AI agents — bento grid */
function Agents() {
  return (
    <section id="agent" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold text-primary border border-primary/30 rounded-full px-3 py-1">5 AI Agent</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white">Satu Tim AI untuk Usahamu.</h2>
          <p className="mt-3 text-midnight_text/65 text-lg">
            Bukan web builder biasa — AgenX pakai tim AI yang saling bekerja sama, dari desain sampai toko online.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[18rem]">
          {agents.map((a) => (
            <div
              key={a.name}
              className="group relative rounded-[1.5rem] p-6 bg-surface_light/40 border border-white/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute -inset-px bg-anim-gradient opacity-0 group-hover:opacity-15 blur-2xl rounded-[1.5rem] transition-opacity" />
              <div className="relative h-full flex flex-col">
                <div className="text-4xl mb-4">{a.icon}</div>
                <div className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">{a.role}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{a.name}</h3>
                <p className="text-sm text-midnight_text/60 leading-relaxed flex-1">{a.desc}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {a.tags.map((t) => (
                    <span key={t} className="text-xs font-medium text-midnight_text/70 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Business stats neon chart */
function Business() {
  const bars = [45, 62, 40, 78, 55, 92, 70, 100, 84, 66, 95, 88];
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Bikin <span className="bg-clip-text text-transparent bg-anim-gradient">keputusan bisnis</span> lebih baik.
            </h2>
            <p className="text-midnight_text/65 text-lg leading-relaxed max-w-xl">
              Dari laporan penjualan real-time, katalog produk Medusa, sampai insight SEO — AgenX kasih kamu data
              agar keputusan cepat.
            </p>
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-primary text-lg font-medium w-fit">
              Buka Dashboard
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
              </svg>
            </Link>
          </div>

          <div className="glass-strong rounded-[1.75rem] p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-midnight_text/50">Total Omset Bulan Ini</p>
                <p className="text-3xl font-bold text-white">Rp 24.850.000</p>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/30 px-3 py-1.5 rounded-full">+38%</span>
            </div>

            <div className="relative h-40">
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" style={{ overflow: "visible" }}>
                {/* neon line */}
                <polyline
                  points={bars.map((v, i) => `${(i / (bars.length - 1)) * 100},${100 - v}`).join(" ")}
                  fill="none"
                  stroke="url(#gradNeon)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="drop-shadow-[0_0_6px_theme(colors.primary)]"
                />
                <defs>
                  <linearGradient id="gradNeon" x1="0" y1="0" x2="1" y2="0">
                    <stop stopColor="#00f0ff" />
                    <stop offset="1" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="h-full flex items-end gap-1">
                {bars.map((h, i) => (
                  <div key={i} className={`flex-1 rounded-t-sm transition-all ${i === 7 || i === 10 ? "bg-primary neon" : "bg-primary/25"}`} style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="bg-black/20 border border-white/5 rounded-xl p-3 text-center">
                <p className="text-xs text-midnight_text/50">Pengunjung</p>
                <p className="text-lg font-bold text-white">8.2rb</p>
              </div>
              <div className="bg-black/20 border border-white/5 rounded-xl p-3 text-center">
                <p className="text-xs text-midnight_text/50">Order</p>
                <p className="text-lg font-bold text-white">312</p>
              </div>
              <div className="bg-black/20 border border-white/5 rounded-xl p-3 text-center">
                <p className="text-xs text-midnight_text/50">Produk</p>
                <p className="text-lg font-bold text-white">48</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Cara kerja — bento timeline */
function HowItWorks() {
  return (
    <section id="cara-kerja" className="py-20 bg-surface/60 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Cara Kerja: 5 Langkah ke Omset.</h2>
          <p className="mt-3 text-midnight_text/65 text-lg">Dari nol ke website siap menerima pesanan — semua otomatis.</p>
        </div>

        <div className="grid md:grid-cols-5 gap-5">
          {steps.map((s) => (
            <div key={s.no} className="glass-strong rounded-[1.25rem] p-6 relative">
              <div className="w-12 h-12 rounded-full bg-anim-gradient text-white flex items-center justify-center font-bold text-xl shadow-glow mb-4 mx-auto md:mx-0">
                {s.no}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 text-center md:text-start">{s.title}</h3>
              <p className="text-sm text-midnight_text/60 leading-relaxed text-center md:text-start">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Toolkit — bento micro grid */
function Toolkit() {
  return (
    <section id="toolkit" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">AI Business Toolkit.</h2>
          <p className="mt-3 text-midnight_text/60 text-lg">
            Lebih dari website — lengkapi pemasaran mu pakai alat AI tambahan.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {toolkit.map((t) => (
            <div key={t.title} className="glass-strong rounded-[1.25rem] p-6 hover:-translate-y-1 hover:border-primary/40 border border-white/10 transition group">
              <div className="text-3xl mb-4 group-hover:scale-110 transition">{t.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-1.5">{t.title}</h3>
              <p className="text-sm text-midnight_text/60 leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* QRIS */
function Payment() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="flex justify-center">
            <div className="glass-strong rounded-[1.75rem] p-8 flex flex-col items-center max-w-sm shadow-glow-purple">
              <div className="bg-primary/10 border border-primary/30 rounded-2xl p-6 mb-5">
                <svg width="140" height="140" viewBox="0 0 21 21" className="bg-white p-2 rounded-xl">
                  {Array.from({ length: 21 }).map((_, r) =>
                    Array.from({ length: 21 }).map((_, c) => {
                      const inFinder =
                        (r < 6 && c < 6) || (r < 6 && c > 14) || (r > 14 && c < 6);
                      if (inFinder) return null;
                      const v = (r * 31 + c * 17) % 3 === 0;
                      return v ? (
                        <rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" fill="#060b25" />
                      ) : null;
                    })
                  )}
                  {[
                    [0, 0],
                    [0, 15],
                    [15, 0],
                  ].map(([fr, fc]) => (
                    <g key={`${fr}-${fc}`}>
                      <rect x={fc} y={fr} width="6" height="6" fill="none" stroke="#060b25" strokeWidth="1" />
                      <rect x={fc + 1.5} y={fr + 1.5} width="3" height="3" fill="#060b25" />
                    </g>
                  ))}
                </svg>
              </div>
              <p className="text-xl font-semibold text-white mb-1">QRIS</p>
              <p className="text-midnight_text/60 text-base text-center">
                Scan untuk bayar — terima pembayaran langsung dari e-wallet & mobile banking.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Sekarang saatnya <span className="bg-clip-text text-transparent bg-anim-gradient">ganti cara terima pembayaran.</span>
            </h2>
            <p className="text-midnight_text/65 text-lg leading-relaxed max-w-xl">
              Toko online di atas Medusa.js dengan pembayaran QRIS / Transfer Bank serta ongkir real-time dari
              Biteship. Pelanggan bayar — kamu tinggal kirim.
            </p>
            <Link href="#pricing" className="inline-flex items-center gap-2 text-primary text-lg font-medium w-fit">
              Aktifkan di paket Pro
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Pricing — inline glass */
function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-surface/60 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-4">
          <span className="text-xs font-semibold text-primary border border-primary/30 rounded-full px-3 py-1">Harga</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white">Harga Simpel, Sesuai Kebutuhan.</h2>
          <p className="mt-3 text-midnight_text/60 text-lg max-w-xl mx-auto">
            Mulai gratis, upgrade kapan pun kamu butuh lebih banyak website & fitur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {plans.map((item) => (
            <div
              key={item.name}
              className={`relative rounded-[1.75rem] p-8 border transition-all duration-300 ${
                item.highlight
                  ? "glass-strong border-primary/50 shadow-glow"
                  : "glass-strong border-white/10 hover:border-primary/40"
              }`}
            >
              {item.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold text-white bg-primary/15 border border-primary/30 px-3 py-1 rounded-full">
                  Paling Populer
                </span>
              )}

              <h3 className={`text-2xl font-semibold mb-1 ${item.highlight ? "text-primary" : "text-white"}`}>{item.name}</h3>
              <p className="text-sm text-midnight_text/55 mb-6">{item.tagline}</p>

              <div className="mb-6">
                <span className={`text-3xl font-extrabold ${item.highlight ? "text-primary" : "text-white"}`}>{item.price}</span>
                <span className="text-sm text-midnight_text/50 font-medium">{item.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {item.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-midnight_text/70">
                    <svg className="w-4 h-4 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <Link href="/dashboard" className="w-full">
                <button
                  className={`w-full text-sm font-medium py-3.5 rounded-full transition ${
                    item.highlight
                      ? "bg-anim-gradient text-midnight hover:brightness-110 shadow-glow"
                      : "border border-white/10 text-white hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {item.cta}
                </button>
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-midnight_text/50 mt-8">
          Semua harga dalam Rupiah. Pembayaran QRIS / Transfer Bank aktif di fase akhir peluncuran.
        </p>
      </div>
    </section>
  );
}

/* FAQ */
function FAQ() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold text-primary border border-primary/30 rounded-full px-3 py-1">FAQ</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white">Pertanyaan Umum.</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((f) => (
            <div key={f.q} className="glass-strong rounded-[1.25rem] overflow-hidden">
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left text-white/90 hover:bg-white/5 transition"
                onClick={() => setOpen(open === f.q ? null : f.q)}
              >
                <span className="font-semibold text-white">{f.q}</span>
                <svg
                  className={`h-5 w-5 text-primary transition-transform ${open === f.q ? "rotate-45" : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16M4 12h16" />
                </svg>
              </button>
              {open === f.q && <p className="px-6 pb-5 text-midnight_text/65 text-sm leading-relaxed">{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Final CTA */
function FinalCTA() {
  return (
    <section className="py-20 bg-surface/60 border-t border-white/5">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Website UMKM-mu nggak harus nunggu.
        </h2>
        <p className="text-lg text-midnight_text/65 mb-10 max-w-xl mx-auto">
          Daftar gratis sekarang, biarkan 5 AI agent bikin website profesional mu dalam hitungan menit.
        </p>
        <Link href="/dashboard">
          <button className="text-midnight font-medium text-xl py-4 px-10 rounded-full border border-primary bg-primary hover:shadow-glow transition shadow-glow">
            Buat Website Sekarang — Gratis
          </button>
        </Link>
      </div>
    </section>
  );
}

/* Footer */
function Footer() {
  return (
    <footer className="bg-[#030510] border-t border-white/5">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-12 gap-y-8 gap-x-6">
          <div className="sm:col-span-6 lg:col-span-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-anim-gradient flex items-center justify-center text-white font-bold">A</div>
              <span className="font-bold text-2xl text-white">AgenX</span>
            </div>
            <p className="mt-4 text-sm text-midnight_text/60">
              AI Website Builder untuk UMKM Indonesia.
            </p>
          </div>

          <div className="sm:col-span-6 lg:col-span-4 flex items-center">
            <div className="flex flex-wrap gap-6">
              <a href="#agent" className="text-sm font-normal text-midnight_text/60 hover:text-white transition">5 AI Agent</a>
              <a href="#cara-kerja" className="text-sm font-normal text-midnight_text/60 hover:text-white transition">Cara Kerja</a>
              <a href="#toolkit" className="text-sm font-normal text-midnight_text/60 hover:text-white transition">AI Toolkit</a>
              <a href="#pricing" className="text-sm font-normal text-midnight_text/60 hover:text-white transition">Harga</a>
            </div>
          </div>

          <div className="sm:col-span-6 lg:col-span-5">
            <p className="text-sm font-normal text-midnight_text/60 lg:text-end">
              Powered by LiteLLM · Medusa.js · GrapesJS
            </p>
          </div>
        </div>

        <div className="pt-5 mt-5 border-t border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between text-sm text-midnight_text/40">
          <span>© 2026 AgenX. AI Website Builder untuk UMKM Indonesia.</span>
          <div className="flex gap-5">
            <a href="/legal/privacy" className="hover:text-white transition">Privacy policy</a>
            <a href="/legal/terms" className="hover:text-white transition">Terms & conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ──────────────────────────────────────────────────────────────
   Halaman
   ──────────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <main className="min-h-screen bg-midnight text-midnight_text">
      <Navbar />
      <main>
        <Hero />
        <Testimonial />
        <Agents />
        <Business />
        <HowItWorks />
        <Toolkit />
        <Payment />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </main>
  );
}
