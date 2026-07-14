import { Link } from 'react-router-dom'
import { Bell, TrendingUp, Store, Wallet, FileText } from 'lucide-react'
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import Card from '../components/Card'
import Badge from '../components/Badge'
import { formatRupiah, formatPercent, formatNumber } from '../utils/format'

import user from '../data/user.json'
import portfolio from '../data/portfolio.json'

const QUICK_MENU = [
  { icon: TrendingUp, label: 'Investasi', to: '/investasi' },
  { icon: Store, label: 'Marketplace', to: '/marketplace' },
  { icon: Wallet, label: 'Wallet', to: '/wallet' },
  { icon: FileText, label: 'Laporan', to: '/laporan' },
]

function PortfolioCard() {
  return (
    <Card variant="gold">
      <p className="text-sm opacity-90">Total Portfolio</p>
      <p className="text-2xl md:text-3xl font-bold mt-1">{formatRupiah(portfolio.totalValue)}</p>
      <div className="flex items-center gap-2 mt-2">
        <span className="text-sm opacity-90">Total Return</span>
        <span className="text-sm font-semibold">
          +{formatRupiah(portfolio.totalReturn)} ({formatPercent(portfolio.totalReturnPercent)})
        </span>
      </div>
    </Card>
  )
}

function QuickMenuCard() {
  return (
    <Card variant="default" padding="sm">
      <div className="grid grid-cols-4 gap-2">
        {QUICK_MENU.map(({ icon: Icon, label, to }) => (
          <Link key={label} to={to} className="flex flex-col items-center gap-1.5 py-2 rounded-btn hover:bg-gold-50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-gold-50 flex items-center justify-center">
              <Icon size={18} className="text-gold-600" />
            </div>
            <span className="text-[11px] font-medium text-neutral-600">{label}</span>
          </Link>
        ))}
      </div>
    </Card>
  )
}

function RingkasanAsetCard() {
  const stats = [
    { label: 'Properti', value: formatNumber(portfolio.totalProperties) },
    { label: 'Token Dimiliki', value: formatNumber(portfolio.totalTokens) },
    { label: 'Rata-rata Return', value: formatPercent(portfolio.averageReturnPercent) },
  ]
  return (
    <Card variant="flat">
      <p className="text-sm font-semibold text-neutral-700 mb-3">Ringkasan Aset</p>
      <div className="grid grid-cols-3 gap-2">
        {stats.map(({ label, value }) => (
          <div key={label} className="bg-neutral-0 rounded-btn border border-neutral-200 px-2 py-3 text-center">
            <p className="text-sm font-bold text-neutral-800">{value}</p>
            <p className="text-[10px] text-neutral-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

function ChartCard() {
  return (
    <Card variant="default">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-semibold text-neutral-700">Kinerja Portofolio</p>
        <Badge variant="success">+{formatPercent(portfolio.totalReturnPercent)}</Badge>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={portfolio.performanceHistory} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: '#9C9587' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value) => [formatRupiah(value), 'Nilai']}
            contentStyle={{ borderRadius: 12, borderColor: '#E4E0D6', fontSize: 12 }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#B08A2E"
            strokeWidth={2.5}
            dot={{ r: 3, fill: '#B08A2E' }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default function Dashboard() {
  return (
    <div>
      {/* Mobile-only header */}
      <header className="lg:hidden sticky top-0 z-30 bg-neutral-0 border-b border-neutral-200 px-4 py-3 flex items-center justify-between">
        <div>
          <span className="font-serif text-lg font-bold text-gold-700">PROPIN</span>
        </div>
        <button className="text-neutral-500">
          <Bell size={20} />
        </button>
      </header>

      <div className="p-4 lg:p-0">
        <p className="text-sm text-neutral-500 lg:hidden mb-4">
          {user.greeting}, Selamat datang kembali!
        </p>
        <h1 className="hidden lg:block text-xl font-bold text-neutral-800 mb-6">
          {user.greeting}, {user.name}
        </h1>

        <div className="space-y-5 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-6">
          <div className="lg:col-span-2 lg:order-1">
            <PortfolioCard />
          </div>

          <div className="lg:order-2 space-y-5">
            <QuickMenuCard />
            <RingkasanAsetCard />
          </div>

          <div className="lg:col-span-2 lg:order-3">
            <ChartCard />
          </div>
        </div>
      </div>
    </div>
  )
}