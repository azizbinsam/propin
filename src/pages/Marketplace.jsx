import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Building2, MapPin, Percent, Calendar, ShieldCheck, Search, X, Wallet, AlertCircle } from 'lucide-react';
import propertiesData from '../data/properties.json';

export default function Marketplace() {
  const { walletBalance, setWalletBalance, setPortfolioValue } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  
  // State untuk mengontrol Modal Transaksi
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [tokenAmount, setTokenAmount] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const [txSuccess, setTxSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Format ke Rupiah standard
  const formatRupiah = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  // Filter Data berdasarkan input search & kategori
  const filteredProperties = propertiesData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Buka Modal Transaksi
  const handleOpenModal = (property) => {
    setSelectedProperty(property);
    setTokenAmount(1);
    setErrorMessage('');
    setTxSuccess(false);
    setIsModalOpen(true);
  };

  // Validasi Real-time saat input jumlah token berubah
  const handleTokenChange = (amount) => {
    const qty = parseInt(amount) || 0;
    setTokenAmount(qty);

    if (!selectedProperty) return;

    const totalCost = qty * selectedProperty.tokenPrice;
    const remainingTokens = selectedProperty.totalTokens - selectedProperty.tokensSold;

    if (qty <= 0) {
      setErrorMessage('Jumlah token harus lebih dari 0.');
    } else if (qty > remainingTokens) {
      setErrorMessage(`Pembelian melebihi sisa token tersedia (${remainingTokens.toLocaleString('id-ID')} token).`);
    } else if (totalCost > walletBalance) {
      setErrorMessage('Saldo blockchain wallet Anda tidak mencukupi.');
    } else {
      setErrorMessage('');
    }
  };

  // Eksekusi Pembelian Token (Mengurangi Saldo Secara Reaktif)
  const handleConfirmPurchase = (e) => {
  e.preventDefault();
  if (!selectedProperty || errorMessage || tokenAmount <= 0) return;

  const totalCost = tokenAmount * selectedProperty.tokenPrice;

    // Jalankan simulasi alur blockchain step-by-step
  setTxSuccess(true); // Membuka layar status contract
  setCurrentStep(1);

  setTimeout(() => setCurrentStep(2), 500);
  setTimeout(() => setCurrentStep(3), 1000);
  setTimeout(() => {
    setCurrentStep(4);
    // Eksekusi mutasi state reaktif di akhir step
    setWalletBalance(prev => prev - totalCost);
    setPortfolioValue(prev => prev + totalCost);
    selectedProperty.tokensSold += tokenAmount;
  }, 1500);
};

  return (
    <div className="space-y-6 animate-fade-in relative">
      {/* Header Halaman */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-neutral-800 font-brand">Marketplace Properti</h1>
        <p className="text-sm text-neutral-600">Mulai investasi properti fraksional beragun aset nyata secara aman dan amanah.</p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
          <input 
            type="text" 
            placeholder="Cari lokasi atau nama properti..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-gold-500 text-neutral-800 transition-colors"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {['Semua', 'Residansial', 'Komersial', 'Penginapan'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === category 
                  ? 'bg-neutral-800 text-white border-neutral-800' 
                  : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Properti */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((prop) => {
          const progressPercentage = Math.round((prop.tokensSold / prop.totalTokens) * 100);
          const remainingTokens = prop.totalTokens - prop.tokensSold;

          return (
            <div 
              key={prop.id} 
              className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-[var(--shadow-card-soft)] flex flex-col justify-between"
            >
              <div className="relative h-48 w-full bg-neutral-100">
                <img src={prop.image} alt={prop.title} className="w-full h-full object-cover" loading="lazy" />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-green-700 border border-green-100 px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wide flex items-center gap-1">
                  <ShieldCheck size={12} />
                  {prop.akad}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
                    <Building2 size={12} />
                    <span>{prop.category}</span>
                  </div>
                  <h3 className="font-bold text-neutral-800 text-base leading-snug">{prop.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-neutral-600 mt-1.5">
                    <MapPin size={12} className="text-neutral-400" />
                    <span>{prop.location}</span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-neutral-100">
                    <p className="text-[10px] uppercase text-neutral-400 font-medium tracking-wider">Nilai Aset Properti</p>
                    <p className="text-base font-bold text-neutral-800">{formatRupiah(prop.totalValue)}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-3 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                    <div className="flex items-center gap-1.5">
                      <Percent size={14} className="text-green-600" />
                      <div>
                        <p className="text-[9px] text-neutral-400 leading-none">Proyeksi ROI</p>
                        <p className="text-xs font-bold text-green-700 mt-0.5">{prop.projectedRoi} / thn</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-gold-600" />
                      <div>
                        <p className="text-[9px] text-neutral-400 leading-none">Imbal Hasil</p>
                        <p className="text-xs font-bold text-neutral-800 mt-0.5">{prop.dividendPeriod}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-neutral-600">{progressPercentage}% Terdanai</span>
                    <span className="text-neutral-400">{remainingTokens.toLocaleString('id-ID')} Token Sisa</span>
                  </div>
                  <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[image:var(--background-image-green-gradient)] h-full rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[9px] uppercase text-neutral-400 font-medium">Harga per Token</p>
                    <p className="text-sm font-bold text-gold-700">{formatRupiah(prop.tokenPrice)}</p>
                  </div>
                  
                  <button 
                    onClick={() => handleOpenModal(prop)}
                    disabled={remainingTokens === 0}
                    className="flex-1 bg-[image:var(--background-image-gold-gradient)] text-white font-semibold text-xs py-2.5 px-4 rounded-xl text-center shadow-[var(--shadow-gold-button)] hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {remainingTokens === 0 ? 'Habis Terjual' : 'Beli Token'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pop-up Modal Transaksi */}
      {isModalOpen && selectedProperty && (
        <div className="fixed inset-0 bg-neutral-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-xl max-w-md w-full overflow-hidden transform transition-all">
            
            {/* Modal Header */}
            <div className="p-4 border-b border-neutral-100 flex justify-between items-center bg-neutral-50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gold-500 animate-pulse"></div>
                <h3 className="font-bold text-neutral-800 text-sm">Konfirmasi Pembelian Syariah</h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-neutral-600 cursor-pointer">
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            {txSuccess ? (
              // Tampilan Sukses Transaksi
              <div className="p-5 space-y-4">
  <h4 className="font-bold text-neutral-800 text-sm border-b border-neutral-100 pb-2">Status Eksekusi Smart Contract</h4>
  <div className="space-y-3 font-mono text-[11px]">
    {[
      { id: 1, text: "Investor — Memvalidasi Niat & Pembelian Token" },
      { id: 2, text: "Smart Contract — Memverifikasi Ketersediaan Kuota Dana" },
      { id: 3, text: "Verified — Pemotongan Saldo Wallet Berhasil Tercatat" },
      { id: 4, text: "Ownership Updated — Token Properti Resmi Dialokasikan" }
    ].map((step) => (
      <div key={step.id} className={`flex items-center gap-2 transition-all duration-300 ${currentStep >= step.id ? 'text-green-700 opacity-100' : 'text-neutral-400 opacity-50'}`}>
        <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] border ${currentStep >= step.id ? 'bg-green-600 border-green-600 text-white' : 'border-neutral-300'}`}>
          {currentStep >= step.id ? "✓" : step.id}
        </div>
        <span>{step.text}</span>
      </div>
    ))}
  </div>

  {currentStep === 4 && (
    <button 
      onClick={() => setIsModalOpen(false)}
      className="w-full mt-2 bg-neutral-800 text-white text-xs font-semibold py-2.5 rounded-xl cursor-pointer animate-fade-in"
    >
      Selesai & Masuk ke Wallet
    </button>
  )}
</div>
            ) : (
              // Form Pengisian Transaksi
              <form onSubmit={handleConfirmPurchase} className="p-5 space-y-4">
                {/* Informasi Singkat Properti */}
                <div className="flex gap-3 bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                  <img src={selectedProperty.image} className="w-16 h-16 object-cover rounded-lg" alt="" />
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-neutral-800 truncate">{selectedProperty.title}</h4>
                    <p className="text-[10px] text-neutral-500 flex items-center gap-0.5 mt-0.5">
                      <MapPin size={10} /> {selectedProperty.location}
                    </p>
                    <span className="inline-block bg-green-50 text-green-700 text-[9px] font-bold px-1.5 py-0.5 rounded mt-1 border border-green-100">
                      {selectedProperty.akad}
                    </span>
                  </div>
                </div>

                {/* Sisa Saldo Indikator */}
                <div className="flex justify-between items-center text-xs bg-gold-50/50 p-2.5 rounded-xl border border-gold-100 text-gold-800">
                  <div className="flex items-center gap-1.5">
                    <Wallet size={14} className="text-gold-600" />
                    <span className="font-medium text-[11px]">Saldo Anda:</span>
                  </div>
                  <span className="font-bold">{formatRupiah(walletBalance)}</span>
                </div>

                {/* Input Jumlah Token */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-neutral-600 uppercase tracking-wider block">Jumlah Token yang Dibeli</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      min="1"
                      value={tokenAmount}
                      onChange={(e) => handleTokenChange(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-sm font-bold text-neutral-800 focus:outline-none focus:border-gold-500"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-neutral-400">Token</span>
                  </div>
                </div>

                {/* Info Error jika Validasi Gagal */}
                {errorMessage && (
                  <div className="flex items-start gap-2 bg-red-50 text-red-700 p-2.5 rounded-xl border border-red-100 text-xs">
                    <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Rincian Pembayaran */}
                <div className="space-y-1.5 pt-3 border-t border-neutral-100 text-xs">
                  <div className="flex justify-between text-neutral-500">
                    <span>Harga Satuan</span>
                    <span>{formatRupiah(selectedProperty.tokenPrice)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-neutral-800 text-sm pt-1">
                    <span>Total Pembayaran</span>
                    <span className="text-gold-700">{formatRupiah(tokenAmount * selectedProperty.tokenPrice)}</span>
                  </div>
                </div>

                {/* Tombol Aksi */}
                <button 
                  type="submit"
                  disabled={!!errorMessage || tokenAmount <= 0}
                  className="w-full bg-[image:var(--background-image-gold-gradient)] text-white font-semibold text-xs py-3 rounded-xl shadow-[var(--shadow-gold-button)] hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-50 disabled:pointer-events-none mt-2 cursor-pointer"
                >
                  Konfirmasi & Tanda Tangan Akad
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}