import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Store, Wallet, ArrowLeftRight,
  Award, HandCoins, Bot, Leaf, FileText,
} from 'lucide-react'

const NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/marketplace', icon: Store, label: 'Marketplace Properti', matchPrefixes: ['/marketplace', '/tokenisasi'] },
  { to: '/wallet', icon: Wallet, label: 'Wallet & Kepemilikan' },
  { to: '/transaksi', icon: ArrowLeftRight, label: 'Transaksi' },
  { to: '/sertifikat', icon: Award, label: 'Sertifikat Kepemilikan' },
  { to: '/zakat', icon: HandCoins, label: 'Auto-Zakat' },
  { to: '/ai-assistant', icon: Bot, label: 'AI Assistant' },
  { to: '/dampak', icon: Leaf, label: 'Dampak Investasi' },
  { to: '/laporan', icon: FileText, label: 'Laporan & Transparansi' },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <aside className="w-60 shrink-0 bg-neutral-0 border-r border-neutral-200 flex flex-col h-screen sticky top-0">
      <div className="px-5 py-5 border-b border-neutral-200">
        <span className="font-serif text-xl font-bold text-gold-700">PROPIN</span>
        <p className="text-[11px] text-neutral-400 mt-0.5">Satu Token, Satu Kepemilikan</p>
      </div>
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {NAV_ITEMS.map(({ to, icon: Icon, label, matchPrefixes }) => {
          const isActive = matchPrefixes
            ? matchPrefixes.some((prefix) => location.pathname.startsWith(prefix))
            : location.pathname === to

          return (
            <NavLink
              key={to}
              to={to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-btn text-sm font-medium transition-colors border-l-[3px] ${
                isActive
                  ? 'bg-gold-50 text-gold-700 border-gold-600'
                  : 'text-neutral-600 border-transparent hover:bg-neutral-50 hover:text-gold-600'
              }`}
            >
              <Icon size={18} />
              {label}
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}