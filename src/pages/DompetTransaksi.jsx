import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowDownLeft, ArrowUpRight, ChevronLeft, Plus, Download, Upload } from 'lucide-react'
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import Card from '../components/Card'
import Badge from '../components/Badge'
import Button from '../components/Button'
import { usePortfolio } from '../context/PortfolioContext'
import { useProperties } from '../context/PropertiesContext'
import { useAuth } from '../context/AuthContext'
import { toast } from '../components/Toast'
import { formatRupiah, formatNumber, formatPercent } from '../utils/format'

const PERIODES = [
  { key: '24H', label: '24J' },
  { key: '7D', label: '7H' },
  { key: '1M', label: '1B' },
  { key: '1Y', label: '1T' },
]

const TX_ICONS = {
  'Beli Token': { icon: ArrowDownLeft, bg: 'bg-green-50', color: 'text-green-600' },
  'Distribusi Sewa': { icon: ArrowDownLeft, bg: 'bg-green-50', color: 'text-green-600' },
  'Top Up': { icon: ArrowDownLeft, bg: 'bg-green-50', color: 'text-green-600' },
  'Zakat': { icon: ArrowUpRight, bg: 'bg-gold-50', color: 'text-gold-700' },
  'Withdraw': { icon: ArrowUpRight, bg: 'bg-gold-50', color: 'text-gold-700' },
}

function getTxIcon(type) {
  return TX_ICONS[type] || TX_ICONS['Beli Token']
}

export default function DompetTransaksi() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { portfolio, holdings, transactions } = usePortfolio()
  const { activeProperties } = useProperties()
  const [periode, setPeriode] = useState('1M')

  // Mock saldo data — in real app this would come from context
  const saldoTersedia = portfolio.totalValue * 0.15
  const saldoData = {
    '24H': [
      { label: '00:00', value: saldoTersedia * 0.98 },
      { label: '06:00', value: saldoTersedia * 0.99 },
      { label: '12:00', value: saldoTersedia },
      { label: '18:00', value: saldoTersedia * 1.01 },
    ],
    '7D': [
      { label: 'Sen', value: saldoTersedia * 0.97 },
      { label: 'Sel', value: saldoTersedia * 0.98 },
      { label: 'Rab', value: saldoTersedia * 0.99 },
      { label: 'Kam', value: saldoTersedia },
      { label: 'Jum', value: saldoTersedia * 1.01 },
      { label: 'Sab', value: saldoTersedia * 1.02 },
      { label: 'Min', value: saldoTersedia * 1.01 },
    ],
    '1M': [
      { label: 'M1', value: saldoTersedia * 0.95 },
      { label: 'M2', value: saldoTersedia * 0.97 },
      { label: 'M3', value: saldoTersedia * 0.98 },
      { label: 'M4', value: saldoTersedia },
    ],
    '1Y': [
      { label: 'Q1', value: saldoTersedia * 0.85 },
      { label: 'Q2', value: saldoTersedia * 0.90 },
      { label: 'Q3', value: saldoTersedia * 0.95 },
      { label: 'Q4', value: saldoTersedia },
    ],
  }

  function handleTopUp() {
    toast('Fitur simulasi — tidak memproses dana sungguhan.', 'success')
  }

  function handleWithdraw() {
    if (saldoTersedia <= 0) {
      toast('Saldo tidak mencukupi', 'warning')
      return
    }
    toast('Fitur simulasi — tidak memproses dana sungguhan.', 'success')
  }

  return (
    <div className="pb-8">
      <header className="lg:hidden sticky top-0 z-30 bg-neutral-0 border-b border-neutral-200 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-neutral-600">
          <ChevronLeft size={20} />
        </button>
        <h1 className="font-bold text-neutral-800">Dompet & Transaksi</h1>
      </header>

      <div className="p-4 lg:p-0 max-w-3xl">
        <h1 className="hidden lg:block text-xl font-bold text-neutral-800 mb-6">Dompet & Transaksi</h1>

        {/* Ringkasan Saldo */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <Card variant="gold">
            <p className="text-xs opacity-90">Total Asset</p>
            <p className="text-xl font-bold mt-1">{formatRupiah(portfolio.totalValue)}</p>
            <p className="text-xs opacity-75 mt-1">~${formatNumber(portfolio.totalValue / 16000)}</p>
            <button
              onClick={handleWithdraw}
              className="mt-3 text-xs px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
            >
              <span className="flex items-center gap-1">
                <Download size={12} /> Withdraw
              </span>
            </button>
          </Card>
          <Card variant="default">
            <p className="text-xs text-neutral-500">Saldo Tersedia</p>
            <p className="text-xl font-bold text-neutral-800 mt-1">{formatRupiah(saldoTersedia)}</p>
            <p className="text-xs text-neutral-400 mt-1">Terakhir diperbarui: Hari ini</p>
            <button
              onClick={handleTopUp}
              className="mt-3 text-xs px-3 py-1.5 rounded-lg bg-gold-50 text-gold-700 border border-gold-200 hover:bg-gold-100 transition-colors"
            >
              <span className="flex items-center gap-1">
                <Plus size={12} /> Top Up
              </span>
            </button>
          </Card>
        </div>

        {/* Metric Ringkas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          <div className="bg-neutral-0 rounded-xl border border-neutral-200 p-3">
            <p className="text-[10px] text-neutral-500">Total Asset</p>
            <p className="text-sm font-bold text-neutral-800">{formatRupiah(portfolio.totalValue)}</p>
          </div>
          <div className="bg-neutral-0 rounded-xl border border-neutral-200 p-3">
            <p className="text-[10px] text-neutral-500">Yield Berjalan</p>
            <p className="text-sm font-bold text-green-600">{formatNumber(portfolio.averageReturnPercent)}%</p>
          </div>
          <div className="bg-neutral-0 rounded-xl border border-neutral-200 p-3">
            <p className="text-[10px] text-neutral-500">Masuk Bulan Ini</p>
            <p className="text-sm font-bold text-green-600">+{formatRupiah(portfolio.totalReturn / 12)}</p>
          </div>
          <div className="bg-neutral-0 rounded-xl border border-neutral-200 p-3">
            <p className="text-[10px] text-neutral-500">Zakat Dipotong</p>
            <p className="text-sm font-bold text-gold-700">{formatRupiah(portfolio.totalValue * 0.025 / 12)}</p>
          </div>
        </div>

        {/* Grafik Pertumbuhan Saldo */}
        <Card variant="default" className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-neutral-700">Pertumbuhan Saldo</p>
            <div className="flex gap-1">
              {PERIODES.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setPeriode(key)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-colors ${
                    periode === key
                      ? 'bg-gold-600 text-white'
                      : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={saldoData[periode]} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
              <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#9C9587' }} axisLine={false} tickLine={false} />
              <Tooltip
                formatter={(value) => [formatRupiah(value), 'Saldo']}
                contentStyle={{ borderRadius: 12, borderColor: '#E4E0D6', fontSize: 12 }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#B08A2E"
                strokeWidth={2}
                fill="url(#goldGradient)"
              />
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#B08A2E" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#B08A2E" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Token Saya */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-neutral-700">Token Saya</p>
            <button className="text-xs text-gold-700 font-medium hover:underline">
              Lihat Semua
            </button>
          </div>
          {holdings.length === 0 ? (
            <div className="text-center py-8 bg-neutral-0 rounded-xl border border-neutral-200">
              <p className="text-sm text-neutral-500">Belum ada token dimiliki</p>
              <Button variant="outline" className="mt-3" onClick={() => navigate('/marketplace')}>
                Mulai Investasi
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {holdings.map((holding) => {
                const property = activeProperties.find((p) => p.id === holding.propertyId)
                if (!property) return null
                return (
                  <div key={holding.propertyId} className="bg-neutral-0 rounded-xl border border-neutral-200 p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-neutral-800">{holding.propertyName}</p>
                      <p className="text-xs text-neutral-500">{property.location}</p>
                      <p className="text-xs text-green-600 mt-1">{formatNumber(holding.tokens)} token</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-neutral-800">{formatRupiah(holding.tokens * property.pricePerToken)}</p>
                      <p className="text-xs text-neutral-400">{formatPercent(property.projectedReturnPercent)} /thn</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Riwayat Transaksi */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-neutral-700">Riwayat Transaksi</p>
            <div className="flex gap-1">
              {PERIODES.map(({ key, label }) => (
                <button
                  key={key}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-colors ${
                    key === '1M'
                      ? 'bg-gold-600 text-white'
                      : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {transactions.length === 0 ? (
            <div className="text-center py-8 bg-neutral-0 rounded-xl border border-neutral-200">
              <p className="text-sm text-neutral-500">Belum ada transaksi</p>
            </div>
          ) : (
            <div className="space-y-2">
              {transactions.slice(0, 10).map((tx) => {
                const { icon: Icon, bg, color } = getTxIcon(tx.type || 'Beli Token')
                return (
                  <button
                    key={tx.id}
                    onClick={() => navigate(`/transaksi/${tx.id}`)}
                    className="w-full bg-neutral-0 rounded-xl border border-neutral-200 p-3 flex items-center gap-3 hover:bg-neutral-50 transition-colors text-left"
                  >
                    <div className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center shrink-0`}>
                      <Icon size={18} className={color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-800 truncate">{tx.type || 'Beli Token'}</p>
                      <p className="text-xs text-neutral-500 truncate">{tx.propertyName || 'PROPIN'}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-neutral-800">{formatRupiah(tx.nominal)}</p>
                      <p className="text-[10px] text-neutral-400">
                        {new Date(tx.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}