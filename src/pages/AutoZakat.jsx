import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Scale, Info, CheckCircle2, AlertCircle, Coins, Wallet } from 'lucide-react';

export default function AutoZakat() {
  const { portfolioValue, walletBalance, setWalletBalance } = useApp();
  
  // Asumsi standar Nisab Emas (85 gram x Harga Emas per Gram)
  const hargaEmasPerGram = 1450000; 
  const batasNisab = 85 * hargaEmasPerGram; // Rp 123.250.000
  const persentaseZakat = 0.025; // 2.5%

  // State
  const [includeWallet, setIncludeWallet] = useState(false);
  const [totalHarta, setTotalHarta] = useState(portfolioValue);
  const [jumlahZakat, setJumlahZakat] = useState(0);
  const [apakahWajib, setApakahWajib] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [errorBayar, setErrorBayar] = useState('');

  // Format ke Rupiah standard
  const formatRupiah = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  // Kalkulasi Otomatis Reaktif setiap kali nilai portofolio atau opsi checklist berubah
  useEffect(() => {
    const hartaDihitung = includeWallet ? (portfolioValue + walletBalance) : portfolioValue;
    setTotalHarta(hartaDihitung);

    if (hartaDihitung >= batasNisab) {
      setApakahWajib(true);
      setJumlahZakat(hartaDihitung * persentaseZakat);
    } else {
      setApakahWajib(false);
      setJumlahZakat(0);
    }
  }, [portfolioValue, walletBalance, includeWallet, batasNisab]);

  // Handler Potong Saldo Otomatis untuk Zakat
  const handleBayarZakat = (e) => {
    e.preventDefault();
    setErrorBayar('');

    if (jumlahZakat > walletBalance) {
      setErrorBayar('Saldo Wallet tidak mencukupi untuk menunaikan zakat saat ini. Silakan top-up terlebih dahulu.');
      return;
    }

    // Kurangi saldo wallet secara reaktif
    setWalletBalance(prev => prev - jumlahZakat);
    setIsPaid(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Halaman */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-neutral-800 font-brand">Auto-Zakat Maal</h1>
        <p className="text-sm text-neutral-600">Kalkulator otomatis pembersihan harta investasi properti sesuai syariat Islam.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kolom Kiri: Form & Kalkulator */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-[var(--shadow-card-soft)]">
            <h3 className="font-bold text-neutral-800 text-sm mb-4 flex items-center gap-2">
              <Scale size={18} className="text-gold-600" />
              Kalkulator Aset Wajib Zakat
            </h3>

            {isPaid ? (
              <div className="text-center py-6 space-y-3 bg-green-50/50 border border-green-100 rounded-2xl">
                <CheckCircle2 className="mx-auto text-green-600" size={40} />
                <div>
                  <h4 className="font-bold text-green-900 text-sm">Zakat Berhasil Ditunaikan!</h4>
                  <p className="text-xs text-green-700 mt-1">
                    Dana sebesar <strong>{formatRupiah(jumlahZakat)}</strong> telah disalurkan langsung ke LAZIS melalui smart contract. Semoga berkah dan membersihkan harta Anda.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBayarZakat} className="space-y-4">
                {/* Nilai Portofolio (Read-Only) */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">Nilai Portofolio Token Properti</label>
                  <input 
                    type="text" 
                    value={formatRupiah(portfolioValue)} 
                    disabled 
                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-bold text-neutral-600 cursor-not-allowed"
                  />
                </div>

                {/* Checklist Saldo Tambahan */}
                <label className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200 select-none cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={includeWallet} 
                    onChange={(e) => setIncludeWallet(e.target.checked)}
                    className="w-4 h-4 rounded text-gold-600 focus:ring-gold-500 border-neutral-300"
                  />
                  <div className="text-xs">
                    <p className="font-bold text-neutral-700 group-hover:text-neutral-900">Gabungkan dengan Saldo Aktif Wallet</p>
                    <p className="text-neutral-500 text-[11px] mt-0.5">Menambahkan {formatRupiah(walletBalance)} ke dalam perhitungan haul & nisab.</p>
                  </div>
                </label>

                {/* Info Nisab */}
                <div className="flex items-start gap-2 text-neutral-500 bg-neutral-50 p-3 rounded-xl border border-neutral-100 text-[11px]">
                  <Info size={14} className="mt-0.5 flex-shrink-0 text-neutral-400" />
                  <p>
                    Batas Nisab saat ini setara dengan 85gr Emas Murni = <strong>{formatRupiah(batasNisab)}</strong> per tahun. Jika total harta di atas nominal tersebut, hukumnya wajib mengeluarkan zakat sebesar 2.5%.
                  </p>
                </div>

                {/* Error Banner */}
                {errorBayar && (
                  <div className="flex items-start gap-2 bg-red-50 text-red-700 p-3 rounded-xl border border-red-100 text-xs">
                    <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                    <span>{errorBayar}</span>
                  </div>
                )}

                {/* Tombol Pembayaran Zakat */}
                {apakahWajib ? (
                  <button 
                    type="submit" 
                    className="w-full bg-[image:var(--background-image-gold-gradient)] text-white font-semibold text-xs py-3 rounded-xl shadow-[var(--shadow-gold-button)] hover:opacity-95 active:scale-[0.99] transition-all mt-2 cursor-pointer"
                  >
                    Tunaikan Zakat Otomatis Sekarang
                  </button>
                ) : (
                  <div className="w-full bg-neutral-50 text-neutral-500 text-center text-xs py-3 rounded-xl border border-dashed border-neutral-300 font-medium">
                    Belum Mencapai Batas Nisab Wajib Zakat
                  </div>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Kolom Kanan: Ringkasan & Status Keagamaan */}
              <div className="space-y-4">
                  
                  
          {/* Ringkasan Hasil Hitung */}
          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-[var(--shadow-card-soft)] space-y-4">
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Ringkasan Haul</h4>
            
            <div className="space-y-2 text-xs border-b border-neutral-100 pb-3">
              <div className="flex justify-between text-neutral-500">
                <span>Total Harta Terhitung</span>
                <span className="font-semibold text-neutral-800">{formatRupiah(totalHarta)}</span>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>Batas Minimal Nisab</span>
                <span className="font-semibold text-neutral-800">{formatRupiah(batasNisab)}</span>
              </div>
            </div>

            <div className="pt-1">
              <p className="text-[10px] text-neutral-400 uppercase font-medium tracking-wide">Kewajiban Zakat (2.5%)</p>
              <p className={`text-2xl font-bold mt-1 ${apakahWajib ? 'text-gold-700' : 'text-neutral-400'}`}>
                {formatRupiah(jumlahZakat)}
              </p>
            </div>
                  </div>
                  
                  <div className="space-y-1 pt-2">
  <div className="flex justify-between text-[10px] font-medium text-neutral-500">
    <span>Progres Batas Nisab</span>
    <span>{Math.min(100, Math.round((totalHarta / batasNisab) * 100))}%</span>
  </div>
  <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
    <div 
      className="bg-gold-600 h-full rounded-full transition-all duration-500" 
      style={{ width: `${Math.min(100, (totalHarta / batasNisab) * 100)}%` }}
    ></div>
  </div>
</div>

          {/* Status Indikator */}
          <div className={`p-4 rounded-2xl border flex items-center gap-3 ${
            apakahWajib 
              ? 'bg-amber-50/70 border-amber-100 text-amber-800' 
              : 'bg-green-50/70 border-green-100 text-green-800'
          }`}>
            <Coins size={20} className={apakahWajib ? 'text-amber-600' : 'text-green-600'} />
            <div className="text-xs">
              <p className="font-bold">{apakahWajib ? 'Status: Wajib Zakat' : 'Status: Bebas Zakat Maal'}</p>
              <p className="opacity-80 text-[11px] mt-0.5">
                {apakahWajib 
                  ? 'Harta investasi Anda telah melewati ketentuan batas nisab tahunan.' 
                  : 'Nilai bersih aset Anda saat ini masih berada di bawah batas ketentuan nisab.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}