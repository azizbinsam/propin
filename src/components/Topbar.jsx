import { Search, Bell } from 'lucide-react'

export default function Topbar() {
  return (
    <header className="h-16 border-b border-neutral-200 bg-neutral-0 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-2 text-neutral-400 bg-neutral-50 border border-neutral-200 rounded-btn px-3 py-2 w-72">
        <Search size={16} />
        <span className="text-sm">Cari properti atau lokasi</span>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-neutral-500 hover:text-gold-600">
          <Bell size={20} />
        </button>
        <div className="w-9 h-9 rounded-full bg-gold-gradient flex items-center justify-center text-white text-sm font-semibold">
          A
        </div>
      </div>
    </header>
  )
}