import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Wallet, ArrowUpRight, ArrowDownLeft, ShieldCheck, Copy, Check, History, Coins, ExternalLink } from 'lucide-react';

export default function WalletPage() {
  const { walletBalance, portfolioValue } = useApp();
  const [copied, setCopied] = useState(false);
  const walletAddress = "0xBF71e29C8B190a36C4D18F5B464F36aD4B7893aC";

  // Format ke Rupiah standard
  const formatRupiah = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  // Handler Salin Address Blockchain
  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Data Mock Riwayat Transaksi Blockchain Ledger
  const ledgerHistory = [
    {
      id: "tx-109",
      type: "purchase",
      title: "Pembelian Token Kost Muslim Kuningan",
      hash: "0x7a2d...9e4b",
      date: "14 Jul 2026",
      amount: "- Rp 5.000.000",
      status: "Success",
      isNegative: true
    },
    {
      id: "tx-108",
      type: "dividend",
      title: "Bagi Hasil (Ijarah) - Ruko Halal Plaza",
      hash: "0x3c9f...1a2b",
      date: "01 Jul 2026",
      amount: "+ Rp 245.000",
      status: "Success",
      isNegative: false
    },
    {
      id: "tx-107",
      type: "deposit",
      title: "Top-up Saldo via Virtual Account",
      hash: "0x8e5b...4f6c",
      date: "25 Jun 2026",
      amount: "+ Rp 15.000.000",
      status: "Success",
      isNegative: false
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Halaman */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-neutral-800 font-brand">Blockchain Wallet</h1>
        <p className="text-sm text-neutral-600">Kelola saldo digital, aset token properti, dan pantau transparansi catatan audit ledger.</p>
      </div>

      {/* Grid Atas: Wallet Card & Address Ringkasan */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card Utama Finansial (Blockchain Style) */}
        <div className="lg:col-span-2 bg-neutral-900 text-white p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between min-h-[200px] shadow-lg">
          {/* Efek Gradasi Dekoratif Latar Belakang */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gold-600/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold">Total Saldo Tersedia</p>
              <h2 className="text-3xl font-bold mt-1 text-gold-100">{formatRupiah(walletBalance)}</h2>
            </div>
            <div className="p-2.5 bg-white/10 rounded-xl text-gold-400 border border-white/10">
              <Wallet size={20} />
            </div>
          </div>

          <div className="space-y-3 mt-6">
            <div className="flex items-center justify-between border-t border-neutral-800 pt-3 text-xs">
              <span className="text-neutral-400">Total Nilai Token Aset</span>
              <span className="font-bold text-neutral-200">{formatRupiah(portfolioValue)}</span>
            </div>
            
            {/* Blockchain Address Bar */}
            <div className="flex items-center justify-between bg-neutral-800/60 p-2.5 rounded-xl border border-neutral-800">
              <span className="text-[11px] text-neutral-400 font-mono truncate mr-4">{walletAddress}</span>
              <button 
                onClick={handleCopy}
                className="text-neutral-400 hover:text-gold-400 p-1 rounded-md transition-colors cursor-pointer flex-shrink-0"
                title="Salin Address"
              >
                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
              </button>
            </div>
          </div>
        </div>

        {/* Ringkasan Statistik Token */}
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-[var(--shadow-card-soft)] flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Status Smart Contract</h3>
            
            <div className="flex items-center gap-3 p-3 bg-green-50/70 border border-green-100 rounded-xl">
              <ShieldCheck className="text-green-600 flex-shrink-0" size={20} />
              <div>
                <p className="text-xs font-bold text-green-800">Kepatuhan Syariah Aktif</p>
                <p className="text-[10px] text-neutral-600">Audit otomatis token berjalan lancar</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gold-50/70 border border-gold-100 rounded-xl">
              <Coins className="text-gold-600 flex-shrink-0" size={20} />
              <div>
                <p className="text-xs font-bold text-gold-800">Dividen Otomatis</p>
                <p className="text-[10px] text-neutral-600">Skema bagi hasil masuk langsung ke wallet</p>
              </div>
            </div>
          </div>
          
          <button className="w-full mt-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold text-xs py-2.5 rounded-xl transition-all cursor-pointer">
            Top Up Dana via VA
          </button>
        </div>
      </div>

      {/* Bagian Bawah: Catatan Transaksi / Blockchain Ledger */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-[var(--shadow-card-soft)] overflow-hidden">
        {/* Header Tab Riwayat */}
        <div className="p-5 border-b border-neutral-100 flex items-center gap-2 bg-neutral-50/60">
          <History size={16} className="text-neutral-400" />
          <h3 className="font-bold text-neutral-800 text-sm">Catatan Mutasi Blockchain Ledger</h3>
        </div>

        {/* Daftar Riwayat Transaksi */}
        <div className="divide-y divide-neutral-100">
          {ledgerHistory.map((tx) => (
            <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-neutral-50 transition-colors gap-4">
              <div className="flex items-center gap-3 min-w-0">
                {/* Icon Indikator Tipe */}
                <div className={`p-2.5 rounded-xl flex-shrink-0 ${
                  tx.type === 'purchase' ? 'bg-red-50 text-red-600' :
                  tx.type === 'dividend' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                }`}>
                  {tx.isNegative ? <ArrowUpRight size={16} /> : <ArrowDownLeft size={16} />}
                </div>

                {/* Detail Teks */}
                <div className="min-w-0">
                  <p className="text-xs font-bold text-neutral-800 truncate">{tx.title}</p>
                  <div className="flex items-center gap-2 mt-0.5 text-[10px] text-neutral-400">
                    <span>{tx.date}</span>
                    <span>•</span>
                    <span className="font-mono flex items-center gap-0.5 hover:text-gold-600 cursor-pointer">
                      {tx.hash} <ExternalLink size={8} />
                    </span>
                  </div>
                </div>
              </div>

              {/* Angka Perubahan & Status */}
              <div className="text-right flex-shrink-0">
                <p className={`text-xs font-bold ${tx.isNegative ? 'text-neutral-800' : 'text-green-700'}`}>
                  {tx.amount}
                </p>
                <span className="inline-block bg-neutral-100 text-neutral-600 text-[9px] font-semibold px-1.5 py-0.5 rounded mt-0.5">
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}