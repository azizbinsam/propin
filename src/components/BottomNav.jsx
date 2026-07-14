import { NavLink } from 'react-router-dom'
import { Home, Store, TrendingUp, Wallet, User } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/dashboard', icon: Home, label: 'Beranda' },
  { to: '/marketplace', icon: Store, label: 'Marketplace' },
  { to: '/investasi', icon: TrendingUp, label: 'Investasi' },
  { to: '/wallet', icon: Wallet, label: 'Wallet' },
  { to: '/akun', icon: User, label: 'Akun' },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-neutral-0 border-t border-neutral-200 shadow-[0_-2px_8px_rgba(30,27,21,0.06)] z-50">
      <div className="flex items-center justify-around h-16">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center gap-1 flex-1 h-full text-[11px] font-medium transition-colors ${
                isActive ? 'text-gold-600' : 'text-neutral-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute top-0 h-0.5 w-8 rounded-full bg-gold-600" />
                )}
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}