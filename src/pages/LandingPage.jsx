import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, Shield, Zap, HandCoins, Users, TrendingUp, 
  CheckCircle, ArrowRight, Building2, Database, Bot, 
  HeartHandshake, Globe 
} from 'lucide-react';

export default function LandingPage() {
  const features = [
    { icon: Building2, title: 'Tokenisasi Properti Syariah', desc: 'Kepemilikan fraksional mulai Rp100.000, akses aset properti premium yang sebelumnya sulit dijangkau.' },
    { icon: Database, title: 'Blockchain Transparan', desc: 'Aman, immutable, dan dapat diverifikasi publik. Setiap transaksi tercatat di blockchain.' },
    { icon: Bot, title: 'AI Cerdas', desc: 'Rekomendasi investasi personal & edukasi syariah berbasis kecerdasan buatan.' },
    { icon: HeartHandshake, title: 'Sesuai Syariah', desc: 'Akad syariah, bebas riba, gharar, dan maysir. Diawasi Dewan Syariah.' },
    { icon: Globe, title: 'Berdampak Nyata', desc: 'Mendorong inklusi keuangan & kesejahteraan umat melalui investasi produktif.' },
  ];

  const steps = [
    { number: 1, label: 'Daftar & Verifikasi', icon: CheckCircle },
    { number: 2, label: 'Pilih Properti', icon: Building2 },
    { number: 3, label: 'Beli Token', icon: HandCoins },
    { number: 4, label: 'Smart Contract', icon: Zap },
    { number: 5, label: 'Kepemilikan Tercatat', icon: Shield },
    { number: 6, label: 'Terima Imbal Hasil', icon: TrendingUp },
    { number: 7, label: 'Auto-Zakat', icon: HeartHandshake },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-neutral-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-brand text-2xl text-gold-600">PROPIN</span>
            <span className="text-xs text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-full">Prototype</span>
          </div>
          <Link to="/app/dashboard" className="btn-primary text-sm py-2">
            Coba Prototype
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="badge-syariah mb-4">
              <Shield size={14} /> Platform Syariah Terverifikasi
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight">
              Investasi Properti Syariah{' '}
              <span className="text-gold-600">Tanpa Ribet</span>
            </h1>
            <p className="text-neutral-600 text-lg mt-4 max-w-lg">
              Tokenisasi properti fisik menjadi digital. Mulai kepemilikan fraksional 
              dari Rp100.000 dengan kepatuhan syariah penuh.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <Link to="/app/dashboard" className="btn-primary flex items-center gap-2">
                Mulai Investasi <ArrowRight size={18} />
              </Link>
              <button className="btn-outline">Pelajari Lebih Lanjut</button>
            </div>
            <div className="flex items-center gap-6 mt-8 text-sm text-neutral-500">
              <span className="flex items-center gap-1">✅ 100% Syariah</span>
              <span className="flex items-center gap-1">🔒 Terverifikasi Blockchain</span>
              <span className="flex items-center gap-1">🇮🇩 Mitra BAZNAS</span>
            </div>
          </div>
          <div className="relative">
            <div className="card-gold">
              <div className="text-center">
                <div className="text-6xl mb-2">🏠</div>
                <h3 className="text-2xl font-bold">Satu Token, Satu Kepemilikan</h3>
                <p className="text-gold-100 mt-2">Platform Tokenisasi Properti Syariah</p>
                <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white/20 rounded-xl p-3">
                    <div className="font-bold text-xl">Rp100K</div>
                    <div>Minimal Investasi</div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-3">
                    <div className="font-bold text-xl">11.5%</div>
                    <div>Imbal Hasil Proyeksi</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 px-4 bg-neutral-0">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Keunggulan PROPIN</h2>
            <p className="text-neutral-600 mt-2">Investasi properti yang aman, syariah, dan berdampak</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="card text-center hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 bg-gold-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-gold-600" size={24} />
                  </div>
                  <h3 className="font-semibold text-neutral-800">{feature.title}</h3>
                  <p className="text-sm text-neutral-600 mt-1">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Alur Investasi di PROPIN</h2>
            <p className="text-neutral-600 mt-2">7 langkah mudah menuju kepemilikan properti syariah</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative flex flex-col items-center text-center">
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-6 left-[60%] w-[80%] h-0.5 border-t-2 border-dashed border-gold-300" />
                  )}
                  <div className="w-12 h-12 rounded-full bg-gold-600 text-white flex items-center justify-center font-bold text-sm z-10">
                    {step.number}
                  </div>
                  <div className="mt-2">
                    <Icon className="text-gold-500 mx-auto" size={16} />
                    <p className="text-xs font-medium text-neutral-700 mt-1">{step.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link to="/app/dashboard" className="btn-primary inline-flex items-center gap-2">
              Mulai Sekarang <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-neutral-900 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="font-brand text-xl text-gold-400">PROPIN</span>
          <p className="text-neutral-400 text-sm mt-2">
            © 2026 PROPIN — Prototype. Platform Tokenisasi Properti Syariah.
          </p>
        </div>
      </footer>
    </div>
  );
}