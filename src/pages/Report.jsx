import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TrendingUp, FileText, PieChart, Download, ArrowUpRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import portfolioData from '../data/portfolio.json';

export default function Report() {
  const { portfolioValue } = useApp();
  const [activeTab, setActiveTab] = useState('kinerja');

  const formatRupiah = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
  const chartData = portfolioData.monthlyPerformance.map(item => ({ ...item, value: item.value / 1000000 }));

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      <div><h1 className="text-2xl font-bold">Laporan & Transparansi</h1><p className="text-neutral-500">Pantau kinerja investasi dan transaksi on-chain</p></div>

      <div className="flex gap-2 border-b border-neutral-200">
        {['kinerja', 'transaksi', 'distribusi'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? 'border-gold-600 text-gold-700' : 'border-transparent text-neutral-500 hover:text-neutral-700'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'kinerja' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card text-center"><p className="text-xs text-neutral-500">Total Return</p><p className="text-xl font-bold text-green-600">+Rp12.45 JT</p></div>
            <div className="card text-center"><p className="text-xs text-neutral-500">Imbal Hasil</p><p className="text-xl font-bold text-gold-600">11.02%</p></div>
            <div className="card text-center"><p className="text-xs text-neutral-500">Total Aset</p><p className="text-xl font-bold">{formatRupiah(portfolioValue)}</p></div>
            <div className="card text-center"><p className="text-xs text-neutral-500">Periode</p><p className="text-sm font-medium">Jan - Jun 2026</p></div>
          </div>
          <div className="card"><h3 className="font-semibold mb-4">Grafik Kinerja</h3><div className="h-64"><ResponsiveContainer width="100%" height="100%"><LineChart data={chartData}><XAxis dataKey="month" stroke="#9C9587" fontSize={12} /><YAxis tickFormatter={v => `Rp${v}JT`} stroke="#9C9587" fontSize={12} /><Tooltip formatter={v => [`Rp${v.toLocaleString()} Juta`, 'Nilai']} /><Line type="monotone" dataKey="value" stroke="#B08A2E" strokeWidth={2} /></LineChart></ResponsiveContainer></div></div>
          <button className="btn-primary w-full flex items-center justify-center gap-2 py-3"><Download size={18} /> Unduh Laporan (Simulasi)</button>
        </div>
      )}

      {activeTab === 'transaksi' && <div className="card text-center py-12"><FileText size={48} className="text-neutral-300 mx-auto mb-4" /><p className="text-neutral-500">Riwayat transaksi akan ditampilkan di sini</p><p className="text-sm text-neutral-400">(Fitur prototype)</p></div>}
      {activeTab === 'distribusi' && <div className="card text-center py-12"><PieChart size={48} className="text-neutral-300 mx-auto mb-4" /><p className="text-neutral-500">Distribusi aset akan ditampilkan di sini</p><p className="text-sm text-neutral-400">(Fitur prototype)</p></div>}
    </div>
  );
}