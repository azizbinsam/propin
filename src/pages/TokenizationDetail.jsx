import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  MapPin, Shield, TrendingUp, Coins, Building2, 
  ArrowLeft, AlertCircle, CheckCircle, Info
} from 'lucide-react';
import propertiesData from '../data/properties.json';

export default function TokenizationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { walletBalance, buyTokens } = useApp();
  const property = propertiesData.find(p => p.id === id);

  const [tokenAmount, setTokenAmount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!property) {
    return <div className="p-8 text-center">Properti tidak ditemukan</div>;
  }

  const formatRupiah = (value) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
  };

  const totalCost = tokenAmount * property.tokenPrice;
  const remainingTokens = property.totalTokens - property.tokensSold;
  const ownershipPercent = ((tokenAmount / property.totalTokens) * 100).toFixed(2);

  const handleAmountChange = (e) => {
    const val = parseInt(e.target.value) || 0;
    setTokenAmount(val);
    setError('');
    if (val <= 0) setError('Jumlah token harus lebih dari 0');
    else if (val > remainingTokens) setError(`Sisa token tersedia: ${remainingTokens.toLocaleString('id-ID')} token`);
    else if (totalCost > walletBalance) setError('Saldo wallet tidak mencukupi');
  };

  const handleBuy = () => {
    if (error || tokenAmount <= 0) return;
    if (totalCost > walletBalance) {
      setError('Saldo wallet tidak mencukupi');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const success = buyTokens(property.id, property.title, tokenAmount, property.tokenPrice);
      if (success) {
        navigate(`/app/transaction/${property.id}`, { state: { property, tokenAmount, totalCost } });
      } else {
        setError('Transaksi gagal, silakan coba lagi');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 md:pb-8">
      <button onClick={() => navigate('/app/marketplace')} className="flex items-center gap-2 text-neutral-600 hover:text-gold-600 mb-4">
        <ArrowLeft size={18} /> Kembali
      </button>

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden h-56 md:h-80 bg-neutral-200">
        <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4 badge-syariah"><Shield size={14} /> Verified Syariah</div>
        <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-t from-black/60 to-transparent p-4 rounded-b-2xl">
          <h1 className="text-white text-2xl font-bold">{property.title}</h1>
          <p className="text-white/80 text-sm flex items-center gap-1"><MapPin size={14} /> {property.location}</p>
        </div>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="card text-center"><p className="text-xs text-neutral-500">Total Aset</p><p className="font-bold text-gold-600">{formatRupiah(property.totalValue)}</p></div>
        <div className="card text-center"><p className="text-xs text-neutral-500">Harga per Token</p><p className="font-bold">{formatRupiah(property.tokenPrice)}</p></div>
        <div className="card text-center"><p className="text-xs text-neutral-500">Imbal Hasil</p><p className="font-bold text-green-600">{property.projectedRoi}</p></div>
        <div className="card text-center"><p className="text-xs text-neutral-500">Akad</p><p className="font-bold text-sm">{property.akad}</p></div>
      </div>

      {/* Funding progress */}
      <div className="card mt-6">
        <div className="flex justify-between text-sm"><span className="text-neutral-600">Pendanaan</span><span className="font-semibold">{((property.tokensSold / property.totalTokens) * 100).toFixed(0)}%</span></div>
        <div className="w-full h-2 bg-neutral-200 rounded-full mt-1 overflow-hidden">
          <div className="h-full bg-green-600 rounded-full transition-all duration-500" style={{ width: `${(property.tokensSold / property.totalTokens) * 100}%` }} />
        </div>
        <div className="flex justify-between text-xs text-neutral-400 mt-1">
          <span>{property.tokensSold.toLocaleString('id-ID')} token terjual</span>
          <span>{remainingTokens.toLocaleString('id-ID')} token tersisa</span>
        </div>
      </div>

      {/* Purchase */}
      <div className="card mt-6 border-gold-200 border-2">
        <h3 className="font-bold text-lg">Beli Token {property.title}</h3>
        <p className="text-sm text-neutral-500">Mulai kepemilikan properti dengan modal kecil</p>
        <div className="mt-4 space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-700">Jumlah Token</label>
            <div className="flex items-center gap-4 mt-1">
              <button onClick={() => handleAmountChange({ target: { value: Math.max(1, tokenAmount - 1) } })} className="w-10 h-10 rounded-xl border border-neutral-200 flex items-center justify-center hover:bg-neutral-100">−</button>
              <input type="number" value={tokenAmount} onChange={handleAmountChange} className="w-24 text-center py-2 border border-neutral-200 rounded-xl focus:outline-none focus:border-gold-500" min="1" max={remainingTokens} />
              <button onClick={() => handleAmountChange({ target: { value: tokenAmount + 1 } })} className="w-10 h-10 rounded-xl border border-neutral-200 flex items-center justify-center hover:bg-neutral-100">+</button>
              <span className="text-sm text-neutral-500">Maks {remainingTokens.toLocaleString('id-ID')}</span>
            </div>
          </div>
          <div className="bg-neutral-50 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm"><span className="text-neutral-600">Total Biaya</span><span className="font-bold text-gold-700">{formatRupiah(totalCost)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-neutral-600">Kepemilikan</span><span className="font-medium">{ownershipPercent}% dari total aset</span></div>
            <div className="flex justify-between text-sm"><span className="text-neutral-600">Saldo Wallet</span><span className={walletBalance >= totalCost ? 'text-green-600' : 'text-red-500'}>{formatRupiah(walletBalance)}</span></div>
          </div>
          {error && <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-xl"><AlertCircle size={16} /> {error}</div>}
          <button onClick={handleBuy} disabled={!!error || tokenAmount <= 0 || isLoading} className={`w-full btn-primary flex items-center justify-center gap-2 py-3 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}>
            {isLoading ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Memproses Transaksi...</> : <><Coins size={18} /> Beli Token</>}
          </button>
        </div>
      </div>
    </div>
  );
}