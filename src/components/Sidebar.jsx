import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Store, Wallet, HandCoins, Settings,
} from 'lucide-react'

const NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/marketplace', icon: Store, label: 'Marketplace Properti', matchPrefixes: ['/marketplace', '/tokenisasi'] },
  { to: '/wallet', icon: Wallet, label: 'Dompet & Transaksi', matchPrefixes: ['/wallet', '/transaksi', '/sertifikat'] },
  { to: '/zakat', icon: HandCoins, label: 'Auto-Zakat' },
  { to: '/akun', icon: Settings, label: 'Pengaturan', matchPrefixes: ['/akun', '/ai-assistant', '/dampak', '/laporan'] },
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
            ? matchPrefixes.some((p) => location.pathname.startsWith(p))
            : location.pathname === to

          return (
            <NavLink
              key={to}
              to={to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-gold-50 text-gold-700 border-l-[3px] border-gold-600'
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-800 border-l-[3px] border-transparent'
              }`}
            >
              <Icon
                size={18}
                className={isActive ? 'text-gold-600' : 'text-neutral-400'}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className="truncate">{label}</span>
            </NavLink>
          )
        })}
      </nav>
      <div className="p-3 border-t border-neutral-200">
        <NavLink
          to="/akun"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-neutral-600 hover:bg-neutral-50 hover:text-neutral-800 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-gold-100 flex items-center justify-center text-gold-700 font-bold text-xs">
            S
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">Siti Aminah</p>
            <p className="text-[11px] text-neutral-400 truncate">Investor</p>
          </div>
        </NavLink>
      </div>
    </aside>
  )
}