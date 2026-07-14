import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { QRCodeSVG } from 'qrcode.react';
import { Shield, CheckCircle, ExternalLink, Download, Share2 } from 'lucide-react';
import propertiesData from '../data/properties.json';

export default function Certificate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { ownedTokens } = useApp();
  
  const property = propertiesData.find(p => p.id === id);
  const token = ownedTokens.find(t => t.id === id);

  if (!property || !token) {
    return (
      <div className="p-8 text-center">
        <p>Sertifikat tidak ditemukan</p>
        <button onClick={() => navigate('/app/wallet')} className="btn-primary mt-4">Kembali ke Wallet</button>
      </div>
    );
  }

  const formatRupiah = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
  const ownershipPercent = ((token.tokens / property.totalTokens) * 100).toFixed(2);
  const tokenId = `PROPIN-${property.id}-${Date.now().toString(36).toUpperCase()}`;

  return (
    <div className="max-w-2xl mx-auto pb-20 md:pb-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Sertifikat Kepemilikan</h1>
        <button onClick={() => navigate('/app/wallet')} className="text-sm text-neutral-500 hover:text-gold-600">← Kembali</button>
      </div>

      <div className="relative bg-white rounded-2xl border-2 border-gold-300 p-8 shadow-lg">
        <div className="absolute inset-2 border border-gold-200 rounded-xl pointer-events-none" />
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-gold-400" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-gold-400" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-gold-400" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-gold-400" />

        <div className="relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="font-brand text-2xl text-gold-600">PROPIN</span>
              <span className="text-xs bg-gold-100 text-gold-700 px-2 py-0.5 rounded-full">NFT</span>
            </div>
            <h2 className="text-lg font-semibold text-neutral-800">Sertifikat Kepemilikan Token</h2>
            <div className="flex items-center justify-center gap-2 text-sm text-green-600 mt-1"><Shield size={14} /> Verified on Blockchain</div>
          </div>

          <div className="border-t border-neutral-200 my-6" />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><p className="text-neutral-400">Token ID</p><p className="font-mono font-semibold text-xs">{tokenId}</p></div>
            <div><p className="text-neutral-400">Status</p><p className="text-green-600 font-semibold flex items-center gap-1"><CheckCircle size={14} /> Aktif</p></div>
            <div><p className="text-neutral-400">Nama Pemilik</p><p className="font-semibold">Ahmad Fauzan</p></div>
            <div><p className="text-neutral-400">Tanggal Terbit</p><p className="font-semibold">{new Date().toLocaleDateString('id-ID')}</p></div>
            <div className="col-span-2"><p className="text-neutral-400">Properti</p><p className="font-semibold">{property.title}</p><p className="text-xs text-neutral-500">{property.location}</p></div>
            <div><p className="text-neutral-400">Jumlah Token</p><p className="font-bold text-gold-700">{token.tokens.toLocaleString('id-ID')}</p></div>
            <div><p className="text-neutral-400">Persentase Kepemilikan</p><p className="font-bold text-gold-700">{ownershipPercent}%</p></div>
            <div className="col-span-2"><p className="text-neutral-400">Nilai Investasi</p><p className="font-bold text-gold-600">{formatRupiah(token.value)}</p></div>
          </div>

          <div className="border-t border-neutral-200 my-6" />

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="bg-gold-50 p-3 rounded-xl border border-gold-200">
              <QRCodeSVG value={`https://propin.id/certificate/${tokenId}`} size={100} bgColor="#FBF6E9" fgColor="#B08A2E" level="H" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-xs text-neutral-400">Scan QR untuk verifikasi</p>
              <p className="text-xs text-neutral-500 mt-1">Sertifikat ini membuktikan kepemilikan token properti di platform PROPIN yang terverifikasi blockchain.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button className="btn-outline flex-1 flex items-center justify-center gap-2 text-sm py-2.5"><Download size={16} /> Unduh Sertifikat</button>
        <button className="btn-outline flex-1 flex items-center justify-center gap-2 text-sm py-2.5"><Share2 size={16} /> Bagikan</button>
        <button onClick={() => alert('Simulasi verifikasi blockchain untuk prototype')} className="btn-secondary flex-1 flex items-center justify-center gap-2 text-sm py-2.5"><ExternalLink size={16} /> Verifikasi di Blockchain</button>
      </div>
      <p className="text-center text-xs text-neutral-400 mt-4">⚠️ Prototype — Sertifikat ini adalah simulasi untuk keperluan demo</p>
    </div>
  );
}