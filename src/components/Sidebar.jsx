import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Store, Coins, Wallet, FileText, Shield,
  HeartHandshake, MessageSquare, Award, ChartNoAxesCombined,
  Home
} from 'lucide-react';

const menus = [
  { name: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
  { name: 'Marketplace', path: '/app/marketplace', icon: Store },
  { name: 'Tokenisasi', path: '/app/tokenization', icon: Coins },
  { name: 'Wallet & Token', path: '/app/wallet', icon: Wallet },
  { name: 'Smart Contract', path: '/app/transactions', icon: FileText },
  { name: 'Sertifikat NFT', path: '/app/certificates', icon: Shield },
  { name: 'Auto-Zakat', path: '/app/zakat', icon: HeartHandshake },
  { name: 'AI Assistant', path: '/app/ai-assistant', icon: MessageSquare },
  { name: 'Dampak Sosial', path: '/app/impact', icon: Award },
  { name: 'Laporan', path: '/app/report', icon: ChartNoAxesCombined },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-neutral-0 border-r border-neutral-200 h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b border-neutral-200 flex items-center gap-2">
        <Home className="text-gold-600" size={24} />
        <span className="font-brand text-2xl text-gold-600">PROPIN</span>
        <span className="text-xs text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-full">Prototype</span>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menus.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-gold-50 text-gold-700 border-l-3 border-gold-600'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800'
                }`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
      <div className="p-4 border-t border-neutral-200 text-xs text-neutral-400">
        <p>PROPIN v1.0 – Prototype</p>
        <p className="mt-1">© 2026 PROPIN</p>
      </div>
    </aside>
  );
}