import React from 'react';
import { useApp } from '../context/AppContext';
import { Building2, Coins, TrendingUp, ArrowUpRight, Wallet } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

export default function Dashboard() {
  // Ambil data reaktif dari simulator global context kita
  const { walletBalance, portfolioValue } = useApp();

  // Format angka ke Rupiah standard
  const formatRupiah = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 1. Header Ucapan */}
      <div>
  <h1 className="text-xl md:text-2xl font-bold text-neutral-800 font-brand">Assalamu'alaikum, Selamat Datang!</h1>
  <p className="text-sm text-neutral-600">Pantau pertumbuhan investasi dan distribusi imbal hasil berkala Anda secara amanah.</p>
</div>

      {/* 2. Grid Utama Card Finansial */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card Total Portofolio (Gold Gradient Sesuai Guideline) */}
        <div className="bg-[image:var(--background-image-gold-gradient)] p-6 rounded-2xl text-white shadow-[var(--shadow-gold-button)] flex flex-col justify-between min-h-[160px]">
          <div>
            <p className="text-xs font-medium text-gold-100 uppercase tracking-wider">Total Nilai Portofolio</p>
            <h2 className="text-2xl md:text-3xl font-bold mt-1">{formatRupiah(portfolioValue)}</h2>
          </div>
          <div className="flex items-center gap-2 mt-4 text-xs bg-white/20 px-3 py-1.5 rounded-full w-fit">
            <TrendingUp size={14} />
            <span className="font-semibold">+11.02% Bln ini</span>
          </div>
        </div>

        {/* Card Saldo Wallet (Simulasi Reaktif) */}
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-[var(--shadow-card-soft)] flex flex-col justify-between min-h-[160px]">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-neutral-600 uppercase tracking-wider">Saldo Blockchain Wallet</p>
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mt-1">{formatRupiah(walletBalance)}</h2>
            </div>
            <div className="p-3 bg-gold-50 text-gold-600 rounded-xl">
              <Wallet size={20} />
            </div>
          </div>
          <p className="text-xs text-neutral-400 font-mono mt-4">Simulated Account: 0xBF71...3aD4B</p>
        </div>
      </div>

      {/* 3. Baris Ringkasan Aset Finansial & Sosial */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-neutral-200 flex items-center gap-4">
          <div className="p-3 bg-neutral-100 text-neutral-600 rounded-lg">
            <Building2 size={20} />
          </div>
          <div>
            <p className="text-xs text-neutral-600">Jumlah Properti</p>
            <p className="text-lg font-bold text-neutral-800">{portfolioData.metrics.propertyCount} Aset</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-neutral-200 flex items-center gap-4">
          <div className="p-3 bg-neutral-100 text-neutral-600 rounded-lg">
            <Coins size={20} />
          </div>
          <div>
            <p className="text-xs text-neutral-600">Token Dimiliki</p>
            <p className="text-lg font-bold text-neutral-800">{portfolioData.metrics.totalTokens} Unit</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-neutral-200 flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-lg">
            <ArrowUpRight size={20} />
          </div>
          <div>
            <p className="text-xs text-neutral-600">Rata-rata Imbal Hasil</p>
            <p className="text-lg font-bold text-green-700">{portfolioData.metrics.averageReturn}</p>
          </div>
        </div>
      </div>

      {/* 4. Placeholder Section Grafik Performa */}
      <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-[var(--shadow-card-soft)]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-neutral-800">Grafik Kinerja Investasi</h3>
          <span className="text-xs font-medium text-gold-700 bg-gold-50 px-2.5 py-1 rounded-md">6 Bulan Terakhir</span>
        </div>
        
        {/* Visualisasi Mini-Chart CSS Sederhana sebelum integrasi Recharts */}
        <div className="h-48 flex items-end gap-3 pt-6 px-2 border-b border-l border-neutral-200">
          {portfolioData.monthlyPerformance.map((item, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
              <div 
                className="w-full bg-gold-200 group-hover:bg-gold-600 rounded-t-md transition-all duration-300 relative" 
                style={{ height: `${(item.value / 130000000) * 100}%` }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {formatRupiah(item.value)}
                </div>
              </div>
              <span className="text-xs text-neutral-400 mb-[-24px]">{item.month}</span>
            </div>
          ))}
        </div>
        <div className="h-6"></div> {/* Spacer label bawah */}
      </div>
    </div>
  );
}