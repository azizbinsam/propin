import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Copy, Check, ChevronRight, Award, Wallet as WalletIcon } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import { useAppData } from '../context/AppContext'
import { formatRupiah, formatNumber, formatPercent } from '../utils/format'

import user from '../data/user.json'
import properties from '../data/properties.json'

function WalletAddressCard() {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(user.walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Card variant="flat">
      <p className="text-xs text-neutral-500">Alamat Wallet</p>
      <div className="flex items-center justify-between mt-1.5">
        <p className="text-sm font-mono font-semibold text-neutral-800">{user.walletAddress}</p>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs font-semibold text-gold-700 hover:text-gold-800 shrink-0 ml-2"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Tersalin' : 'Salin'}
        </button>
      </div>
    </Card>
  )
}

function TotalKepemilikanCard({ totalTokens, totalValue }) {
  return (
    <Card variant="gold">
      <div className="flex items-center gap-2">
        <WalletIcon size={16} className="opacity-90" />
        <p className="text-sm opacity-90">Total Kepemilikan</p>
      </div>
      <p className="text-2xl md:text-3xl font-bold mt-1">{formatRupiah(totalValue)}</p>
      <p className="text-sm opacity-90 mt-1">{formatNumber(totalTokens)} Token</p>
    </Card>
  )
}

function AssetRow({ holding }) {
  const property = properties.find((p) => p.id === holding.propertyId)
  if (!property) return null

  const ownershipPercent = (holding.tokens / holding.totalPropertyTokens) * 100
  const value = holding.tokens * property.pricePerToken

  return (
    <Link
      to={`/tokenisasi/${property.id}`}
      className="flex items-center justify-between py-3.5 border-b border-neutral-100 last:border-0 hover:bg-neutral-50 -mx-2 px-2 rounded-btn transition-colors"
    >
      <div>
        <p className="text-sm font-semibold text-neutral-800">{holding.propertyName}</p>
        <p className="text-xs text-neutral-500 mt-0.5">
          {formatNumber(holding.tokens)} Token &middot; {formatPercent(ownershipPercent)} kepemilikan
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0 ml-3">
        <p className="text-sm font-semibold text-gold-700">{formatRupiah(value)}</p>
        <ChevronRight size={16} className="text-neutral-400" />
      </div>
    </Link>
  )
}

export default function Wallet() {
  const { holdings } = useAppData()

  const totalTokens = holdings.reduce((sum, h) => sum + h.tokens, 0)
  const totalValue = holdings.reduce((sum, h) => {
    const property = properties.find((p) => p.id === h.propertyId)
    return sum + (property ? h.tokens * property.pricePerToken : 0)
  }, 0)

  return (
    <div className="pb-8">
      <header className="lg:hidden sticky top-0 z-30 bg-neutral-0 border-b border-neutral-200 px-4 py-3">
        <h1 className="font-bold text-neutral-800">Wallet & Kepemilikan</h1>
      </header>

      <div className="p-4 lg:p-0 max-w-2xl">
        <h1 className="hidden lg:block text-xl font-bold text-neutral-800 mb-6">Wallet & Kepemilikan</h1>

        <div className="space-y-4">
          <WalletAddressCard />
          <TotalKepemilikanCard totalTokens={totalTokens} totalValue={totalValue} />

          <Card variant="default">
            <p className="text-sm font-semibold text-neutral-700 mb-1">Aset Properti</p>
            {holdings.length === 0 ? (
              <p className="text-sm text-neutral-500 py-4">Anda belum memiliki token properti.</p>
            ) : (
              <div>
                {holdings.map((holding) => (
                  <AssetRow key={holding.propertyId} holding={holding} />
                ))}
              </div>
            )}
          </Card>

          <Link to="/sertifikat">
            <Button variant="outline" fullWidth className="mt-1">
              <Award size={16} />
              Lihat Sertifikat NFT
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
