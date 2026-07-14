import React from 'react';
import { useApp } from '../context/AppContext';
import { HeartHandshake, Calendar, TrendingUp, Shield } from 'lucide-react';
import zakatData from '../data/zakat.json';

export default function AutoZakat() {
  const { portfolioValue } = useApp();

  const formatRupiah = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);

  const { nisabThreshold, currentWealth, isObligatory, zakatAmount, haulStart, haulEnd, daysPassed, partner } = zakatData;

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      <div className="flex items-center gap-2"><h1 className="text-2xl font-bold">Auto-Zakat</h1><span className="badge-syariah"><Shield size={14} /> Syariah</span></div>

      <div className="card-gold">
        <div className="flex items-center gap-3">
          <HeartHandshake size={32} />
          <div>
            <p className="text-gold-100 text-sm">Status Zakat</p>
            <p className="text-xl font-bold">{isObligatory ? 'Wajib Zakat' : 'Belum Wajib'}</p>
          </div>
        </div>
      </div>

      <div className="card">
        <p className="text-sm text-neutral-500">Nisab Tercapai</p>
        <div className="flex justify-between text-sm mt-1"><span>{formatRupiah(currentWealth)}</span><span className="text-neutral-400">{formatRupiah(nisabThreshold)}</span></div>
        <div className="w-full h-2 bg-neutral-200 rounded-full mt-1 overflow-hidden">
          <div className="h-full bg-green-600 rounded-full" style={{ width: `${Math.min((currentWealth / nisabThreshold) * 100, 100)}%` }} />
        </div>
        <p className="text-xs text-neutral-400 mt-1">Target Nisab: {formatRupiah(nisabThreshold)}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="card"><p className="text-xs text-neutral-500">Estimasi Zakat</p><p className="text-xl font-bold text-gold-600">{formatRupiah(zakatAmount)}</p><p className="text-xs text-neutral-400">2.5% dari total harta</p></div>
        <div className="card"><p className="text-xs text-neutral-500">Haul</p><p className="text-sm font-semibold">{new Date(haulStart).toLocaleDateString('id-ID')} - {new Date(haulEnd).toLocaleDateString('id-ID')}</p><p className="text-xs text-neutral-400">{daysPassed} hari</p></div>
      </div>

      <div className="card flex items-center justify-between">
        <div><p className="text-sm text-neutral-500">Mitra Penyalur</p><p className="font-semibold">{partner}</p></div>
        <img src="https://via.placeholder.com/80x40?text=BAZNAS" alt="BAZNAS" className="h-8 object-contain" />
      </div>

      <button className="btn-secondary w-full py-3">Lihat Riwayat Zakat</button>
      <p className="text-xs text-neutral-400 text-center">⚠️ Simulasi prototype – belum terintegrasi dengan sistem zakat nyata</p>
    </div>
  );
}