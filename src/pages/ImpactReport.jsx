import React from 'react';
import { Users, Building2, Coins, Briefcase, Leaf, HandHelping, Award } from 'lucide-react';
import impactData from '../data/impact.json';

export default function ImpactReport() {
  const { metrics, maqashidScore, sdgs } = impactData;

  const formatRupiah = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, notation: 'compact' }).format(value);

  const metricCards = [
    { icon: Users, label: 'Investor Aktif', value: metrics.activeInvestors.toLocaleString() },
    { icon: Building2, label: 'Properti Dibiayai', value: metrics.propertiesFunded },
    { icon: Coins, label: 'Dana Terkumpul', value: formatRupiah(metrics.totalFunds) },
    { icon: Briefcase, label: 'Lapangan Kerja', value: metrics.jobsCreated },
    { icon: Leaf, label: 'CO₂ Terserap (ton)', value: metrics.co2Offset.toLocaleString() },
    { icon: HandHelping, label: 'UMKM Didukung', value: metrics.umkmSupported },
  ];

  const sdgList = [
    { num: 1, label: 'Tanpa Kemiskinan' },
    { num: 4, label: 'Pendidikan Berkualitas' },
    { num: 8, label: 'Pekerjaan Layak' },
    { num: 11, label: 'Kota Berkelanjutan' },
    { num: 17, label: 'Kemitraan' },
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      <div><h1 className="text-2xl font-bold">Dampak Investasi</h1><p className="text-neutral-500">Dampak sosial, ekonomi, dan lingkungan dari investasi PROPIN</p></div>

      <div className="card-gold">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gold-100 text-sm">Maqashid Syariah Impact Score</p>
            <p className="text-4xl font-bold">{maqashidScore}/5</p>
            <p className="text-gold-100">Sangat Baik</p>
          </div>
          <Award size={48} className="text-white/70" />
        </div>
        <div className="w-full h-2 bg-white/30 rounded-full mt-3 overflow-hidden">
          <div className="h-full bg-white rounded-full" style={{ width: `${(maqashidScore / 5) * 100}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {metricCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="card text-center">
              <Icon className="mx-auto text-gold-600 mb-1" size={20} />
              <p className="text-xs text-neutral-500">{card.label}</p>
              <p className="font-bold text-sm">{card.value}</p>
            </div>
          );
        })}
      </div>

      <div className="card">
        <h3 className="font-semibold mb-3">Kontribusi SDGs</h3>
        <div className="flex flex-wrap gap-3">
          {sdgList.map(sdg => (
            <div key={sdg.num} className="flex items-center gap-2 bg-neutral-50 px-3 py-1.5 rounded-full border border-neutral-200">
              <span className="w-6 h-6 rounded-full bg-gold-600 text-white text-xs font-bold flex items-center justify-center">{sdg.num}</span>
              <span className="text-xs text-neutral-600">{sdg.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}