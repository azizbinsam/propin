import { NavLink, useLocation, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/Logo'

const ADMIN_NAV = [
  { to: '/admin/dashboard', label: 'Dashboard Admin', icon: 'LayoutDashboard' },
  { to: '/admin/properti', label: 'Manajemen Properti', icon: 'Building2' },
  { to: '/admin/investor', label: 'Manajemen Investor', icon: 'Users' },
  { to: '/admin/transaksi', label: 'Monitoring Transaksi', icon: 'ArrowLeftRight' },
  { to: '/admin/zakat', label: 'Monitoring Auto Zakat', icon: 'HandCoins' },
  { to: '/admin/pengaturan', label: 'Pengaturan Admin', icon: 'Settings' },
]

const ICONS = {
  LayoutDashboard: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
  ),
  Building2: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 21V11a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v10"/><path d="M6 21V3h12v6"/><path d="M14 7h-4"/><path d="M14 11h-4"/></svg>
  ),
  Users: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  ArrowLeftRight: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/></svg>
  ),
  HandCoins: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="m2 16 6 6"/><circle cx="16" cy="9" r="2.9"/><circle cx="6" cy="5" r="3"/></svg>
  ),
  Settings: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
}

export default function AdminLayout() {
  const { user } = useAuth()
  const location = useLocation()

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Admin Sidebar */}
      <aside className="w-60 shrink-0 bg-neutral-0 border-r border-neutral-200 flex flex-col h-screen sticky top-0">
        <div className="px-5 py-5 border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <Logo size={28} />
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold-100 text-gold-800 font-medium">
              Admin
            </span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-0.5">Panel Administrasi</p>
        </div>
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {ADMIN_NAV.map((item) => {
            const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + '/')
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-gold-50 text-gold-700 border-l-[3px] border-gold-600'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-800 border-l-[3px] border-transparent'
                }`}
              >
                <span className={isActive ? 'text-gold-600' : 'text-neutral-400'}>
                  {ICONS[item.icon]}
                </span>
                <span className="truncate">{item.label}</span>
              </NavLink>
            )
          })}
        </nav>
        <div className="p-3 border-t border-neutral-200">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl">
            <div className="w-9 h-9 rounded-full bg-gold-100 flex items-center justify-center text-gold-700 font-bold text-sm">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-neutral-800 truncate">{user?.name || 'Admin'}</p>
              <p className="text-[11px] text-neutral-400 truncate">{user?.email || ''}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Content area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-neutral-0 border-b border-neutral-200 px-6 flex items-center justify-between sticky top-0 z-20">
          <h1 className="text-lg font-bold text-neutral-800">Admin Panel</h1>
          <div className="flex items-center gap-3">
            
              <a href="/dashboard"
              className="text-xs px-3 py-1.5 rounded-lg bg-gold-50 text-gold-700 border border-gold-200 hover:bg-gold-100 transition-colors">
              Lihat Tampilan User
            </a>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-[1400px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}