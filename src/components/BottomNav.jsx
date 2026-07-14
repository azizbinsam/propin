import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Store, Coins, Wallet, User } from 'lucide-react';

const items = [
  { name: 'Beranda', path: '/app/dashboard', icon: LayoutDashboard },
  { name: 'Marketplace', path: '/app/marketplace', icon: Store },
  { name: 'Investasi', path: '/app/tokenization', icon: Coins },
  { name: 'Wallet', path: '/app/wallet', icon: Wallet },
  { name: 'Akun', path: '/app/profile', icon: User },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-neutral-0 border-t border-neutral-200 shadow-[0_-2px_8px_rgba(30,27,21,0.06)] z-50">
      <div className="flex justify-around items-center h-16">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center text-xs gap-0.5 transition-colors ${
                  isActive ? 'text-gold-600' : 'text-neutral-400'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-[10px] font-medium">{item.name}</span>
                  {isActive && (
                    <div className="w-1.5 h-1.5 bg-gold-600 rounded-full mt-0.5" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}