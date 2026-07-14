import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  LineChart, Line, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';
import { Wallet, ArrowUpRight } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

export default function Dashboard() {
  const { walletBalance, portfolioValue } = useApp();

  const formatRupiah = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const chartData = portfolioData.monthlyPerformance.map(item => ({
    ...item,
    value: item.value / 1000000,
  }));

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Assalamu'alaikum, Selamat Datang!</h1>
        <p className="text-neutral-500">Pantau pertumbuhan investasi dan distribusi imbal hasil berkala Anda secara amanah.</p>
      </div>

      {/* Portfolio Card - Gold */}
      <div className="card-gold">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gold-100 text-sm">Total Nilai Portofolio</p>
            <p className="text-3xl font-bold">{formatRupiah(portfolioValue)}</p>
          </div>
          <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <ArrowUpRight size={16} /> +11.02%
          </span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gold-200/70">Jumlah Properti</p>
            <p className="font-semibold text-white">{portfolioData.metrics.propertyCount} Aset</p>
          </div>
          <div>
            <p className="text-gold-200/70">Token Dimiliki</p>
            <p className="font-semibold text-white">{portfolioData.metrics.totalTokens} Unit</p>
          </div>
          <div>
            <p className="text-gold-200/70">Rata-rata Return</p>
            <p className="font-semibold text-white">{portfolioData.metrics.averageReturn}</p>
          </div>
        </div>
      </div>

      {/* Wallet Card */}
      <div className="card">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-neutral-500 text-sm flex items-center gap-1">
              <Wallet size={14} /> Saldo Blockchain Wallet
            </p>
            <p className="text-2xl font-bold">{formatRupiah(walletBalance)}</p>
          </div>
          <span className="text-xs text-neutral-400 font-mono">0xBF71...3aD4B</span>
        </div>
      </div>

      {/* Chart */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Grafik Kinerja Investasi</h3>
          <span className="text-xs text-neutral-400">6 Bulan Terakhir</span>
        </div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#B08A2E" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#B08A2E" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E4E0D6" />
              <XAxis dataKey="month" stroke="#9C9587" fontSize={12} />
              <YAxis tickFormatter={(v) => `Rp${v}JT`} stroke="#9C9587" fontSize={12} />
              <Tooltip 
                formatter={(value) => [`Rp${value.toLocaleString('id-ID')} Juta`, 'Nilai Portofolio']}
                contentStyle={{ backgroundColor: 'white', border: '1px solid #E4E0D6', borderRadius: '12px', padding: '8px 12px' }}
              />
              <Area type="monotone" dataKey="value" stroke="#B08A2E" strokeWidth={2} fill="url(#goldGradient)" />
              <Line type="monotone" dataKey="value" stroke="#B08A2E" strokeWidth={2} dot={{ fill: '#B08A2E', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}