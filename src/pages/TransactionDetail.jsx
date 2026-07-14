import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, Loader2, ArrowRight, Copy } from 'lucide-react';

export default function TransactionDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { property, tokenAmount, totalCost } = location.state || {};
  
  const [currentStep, setCurrentStep] = useState(0);
  const [txHash, setTxHash] = useState('');
  const [completed, setCompleted] = useState(false);

  const steps = [
    { label: 'Investor — Membeli Token', icon: '👤' },
    { label: 'Smart Contract — Memverifikasi pembayaran', icon: '⚡' },
    { label: 'Verified — Pembayaran berhasil diverifikasi', icon: '✅' },
    { label: 'Ownership Updated — Kepemilikan token diperbarui', icon: '📝' },
    { label: 'Completed — Transaksi selesai', icon: '🏁' },
  ];

  useEffect(() => {
    const hash = '0x' + Array.from({ length: 40 }, () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('');
    setTxHash(hash);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setCurrentStep(step);
      if (step >= steps.length) {
        setCompleted(true);
        clearInterval(interval);
      }
    }, 600);
    return () => clearInterval(interval);
  }, []);

  const formatRupiah = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);

  if (!property) {
    return (
      <div className="p-8 text-center">
        <p>Data transaksi tidak ditemukan</p>
        <button onClick={() => navigate('/app/dashboard')} className="btn-primary mt-4">Kembali ke Dashboard</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pb-20 md:pb-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 badge-syariah mb-2"><CheckCircle size={14} /> Smart Contract Execution</div>
        <h1 className="text-2xl font-bold">Transaksi Tokenisasi</h1>
        <p className="text-neutral-500 text-sm">{property.title} · {tokenAmount} token · {formatRupiah(totalCost)}</p>
      </div>

      <div className="flex justify-center mb-6">
        {completed ? (
          <span className="bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2"><CheckCircle size={18} /> Executed — Transaksi Selesai</span>
        ) : (
          <span className="bg-gold-50 text-gold-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 animate-pulse"><Loader2 size={18} className="animate-spin" /> Processing...</span>
        )}
      </div>

      <div className="card relative">
        <div className="absolute left-5 top-8 bottom-8 w-0.5 bg-neutral-200">
          <div className="w-full bg-green-600 transition-all duration-500" style={{ height: `${(currentStep / (steps.length - 1)) * 100}%` }} />
        </div>
        <div className="space-y-6 relative">
          {steps.map((step, idx) => {
            const isActive = idx <= currentStep;
            const isCurrent = idx === currentStep;
            return (
              <div key={idx} className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 transition-all duration-300 ${isActive ? 'bg-green-600 text-white' : 'bg-neutral-200 text-neutral-400'} ${isCurrent && !completed ? 'ring-4 ring-green-100 animate-pulse' : ''}`}>
                  {isActive ? <CheckCircle size={18} /> : <Clock size={18} />}
                </div>
                <div className={`flex-1 pt-1 ${!isActive ? 'opacity-40' : ''}`}>
                  <p className="font-medium text-sm">{step.label}</p>
                  <p className="text-xs text-neutral-400">{isActive ? '✓ Selesai' : 'Menunggu...'}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {completed && (
        <div className="mt-6 card bg-neutral-50">
          <p className="text-xs text-neutral-500">Transaction Hash</p>
          <div className="flex items-center gap-2 mt-1">
            <code className="text-sm font-mono bg-neutral-100 px-3 py-1 rounded-lg flex-1 truncate">{txHash}</code>
            <button onClick={() => navigator.clipboard.writeText(txHash)} className="p-2 hover:bg-neutral-200 rounded-lg transition-colors"><Copy size={16} className="text-neutral-500" /></button>
          </div>
          <p className="text-xs text-neutral-400 mt-2">🔗 Transaksi tercatat di blockchain (simulasi prototype)</p>
        </div>
      )}

      {completed && (
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <button onClick={() => navigate('/app/wallet')} className="btn-primary flex-1 flex items-center justify-center gap-2"><ArrowRight size={18} /> Lihat Wallet</button>
          <button onClick={() => navigate(`/app/certificate/${property.id}`)} className="btn-outline flex-1 flex items-center justify-center gap-2">Lihat Sertifikat NFT</button>
        </div>
      )}
    </div>
  );
}