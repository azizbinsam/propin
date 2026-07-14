import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Copy, Shield, Wallet as WalletIcon, ChevronRight } from 'lucide-react';

export default function Wallet() {
  const { wallet, ownedTokens, walletBalance } = useApp();

  const formatRupiah = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      <h1 className="text-2xl font-bold">Wallet & Kepemilikan</h1>

      <div className="card">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-neutral-500">Alamat Wallet</p>
            <div className="flex items-center gap-2 mt-1">
              <code className="text-sm font-mono bg-neutral-100 px-3 py-1 rounded-lg">{wallet.address}</code>
              <button onClick={() => navigator.clipboard.writeText(wallet.address)} className="p-1 hover:bg-neutral-200 rounded"><Copy size={14} /></button>
            </div>
          </div>
          <span className="badge-syariah"><Shield size={14} /> Verified</span>
        </div>
        <div className="mt-4 p-4 bg-neutral-50 rounded-xl">
          <p className="text-sm text-neutral-500">Total Kepemilikan</p>
          <p className="text-2xl font-bold">{formatRupiah(walletBalance)}</p>
          <p className="text-sm text-neutral-500">{ownedTokens.reduce((sum, t) => sum + t.tokens, 0)} token</p>
        </div>
      </div>

      <h2 className="font-semibold text-lg">Aset Properti</h2>
      <div className="space-y-3">
        {ownedTokens.map((token) => (
          <div key={token.id} className="card flex justify-between items-center">
            <div>
              <p className="font-semibold">{token.propertyName}</p>
              <p className="text-sm text-neutral-500">{token.tokens} token · {formatRupiah(token.value)}</p>
            </div>
            <Link to={`/app/certificate/${token.id}`} className="text-gold-600 text-sm hover:underline flex items-center gap-1">
  <Shield size={14} /> Sertifikat <ChevronRight size={14} />
</Link>
          </div>
        ))}
        {ownedTokens.length === 0 && (
          <div className="text-center py-8 text-neutral-400">
            <WalletIcon className="mx-auto mb-2" size={32} />
            <p>Belum ada token yang dimiliki.</p>
            <Link to="/app/marketplace" className="btn-primary inline-block mt-4 text-sm py-2">Mulai Investasi</Link>
          </div>
        )}
      </div>
    </div>
  );
}