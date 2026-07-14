import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Store, 
  Wallet, 
  MessageSquare, 
  HeartHandshake, 
  Award 
} from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import WalletPage from './pages/Wallet';
import AutoZakat from './pages/AutoZakat';
import AIAssistant from './pages/AIAssistant';
import ImpactReport from './pages/ImpactReport';

// --- SIMULASI DUMMY COMPONENT UNTUK PROTOTYPE ---
const Tokenization = () => <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-[var(--shadow-card-soft)] text-neutral-800"><h2>Detail Tokenisasi Modul 3</h2></div>;
const SmartContract = () => <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-[var(--shadow-card-soft)] text-neutral-800"><h2>Alur Smart Contract Modul 5</h2></div>;

// --- DUMMY LANDING PAGE (MODUL 0) ---
const LandingPage = () => (
  <div className="min-h-screen flex flex-col justify-center items-center bg-[var(--color-neutral-50)] px-4 text-center">
    <h1 className="font-brand text-4xl md:text-6xl text-gold-600 font-bold mb-4">PROPIN</h1>
    <p className="text-neutral-600 text-sm md:text-base max-w-sm mb-8 leading-relaxed">
      Platform Tokenisasi Properti Syariah Berbasis Blockchain & AI. <br />
      <span className="italic font-medium text-neutral-700">"Satu Token, Satu Kepemilikan"</span>
    </p>
    <Link to="/app/dashboard" className="px-6 py-3 bg-[image:var(--background-image-gold-gradient)] hover:opacity-95 text-white font-semibold text-sm rounded-xl shadow-[var(--shadow-gold-button)] transition-all">
      Masuk ke Prototype App
    </Link>
  </div>
);

// --- SIDEBAR DESKTOP ---
const Sidebar = () => {
  const location = useLocation();
  const menus = [
    { name: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
    { name: 'Marketplace', path: '/app/marketplace', icon: Store },
    { name: 'Wallet & Token', path: '/app/wallet', icon: Wallet },
    { name: 'Auto-Zakat', path: '/app/zakat', icon: HeartHandshake },
    { name: 'AI Assistant', path: '/app/ai-assistant', icon: MessageSquare },
    { name: 'Dampak Sosial', path: '/app/impact', icon: Award },
  ];

  return (
    <aside className="w-64 bg-white border-r border-neutral-200 min-h-screen p-6 hidden md:flex flex-col">
      <div className="mb-10 pl-4">
        <span className="font-brand text-2xl font-bold tracking-wide text-gold-600">PROPIN</span>
      </div>
      <nav className="flex-1 space-y-1">
        {menus.map((menu) => {
          const Icon = menu.icon;
          const isActive = location.pathname === menu.path;
          return (
            <Link
              key={menu.path}
              to={menu.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-xs font-semibold ${
                isActive 
                  ? 'bg-gold-50 text-gold-700 font-bold border-l-4 border-gold-600' 
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-gold-600'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-gold-600' : 'text-neutral-400'} />
              <span>{menu.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

// --- BOTTOM NAVIGATION MOBILE ---
const BottomNav = () => {
  const location = useLocation();
  const mobileMenus = [
    { name: 'Beranda', path: '/app/dashboard', icon: LayoutDashboard },
    { name: 'Pasar', path: '/app/marketplace', icon: Store },
    { name: 'Dompet', path: '/app/wallet', icon: Wallet },
    { name: 'Zakat', path: '/app/zakat', icon: HeartHandshake },
    { name: 'AI Chat', path: '/app/ai-assistant', icon: MessageSquare },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 h-16 flex items-center justify-around md:hidden shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-50">
      {mobileMenus.map((menu) => {
        const Icon = menu.icon;
        const isActive = location.pathname === menu.path;
        return (
          <Link
            key={menu.path}
            to={menu.path}
            className={`flex flex-col items-center justify-center w-full h-full transition-all ${
              isActive ? 'text-gold-600 font-semibold' : 'text-neutral-400'
            }`}
          >
            <Icon size={18} className={isActive ? 'text-gold-600' : 'text-neutral-400'} />
            <span className="text-[10px] mt-1">{menu.name}</span>
          </Link>
        );
      })}
    </nav>
  );
};

// --- CORE APP SWITCHER LAYOUT ---
function AppContent() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-neutral-50)] text-neutral-800 font-sans flex flex-col md:flex-row">
      {/* Tampilkan Sidebar jika di layar Desktop */}
      {!isMobile && <Sidebar />}
      
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-0">
        {/* Topbar dekoratif sederhana untuk Desktop */}
        {!isMobile && (
          <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-end px-8">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">Investor Mode</span>
              <div className="w-8 h-8 rounded-full bg-gold-100 flex items-center justify-center text-gold-700 font-bold text-xs shadow-xs">AZ</div>
            </div>
          </header>
        )}
        
        {/* Area Isi Konten Halaman */}
        <main className="flex-1 p-4 md:p-8 max-w-[1200px] w-full mx-auto">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="marketplace" element={<Marketplace />} />
            <Route path="tokenization/:id" element={<Tokenization />} />
            <Route path="wallet" element={<WalletPage />} />
            <Route path="transaction/:txHash" element={<SmartContract />} />
            <Route path="zakat" element={<AutoZakat />} />
            <Route path="ai-assistant" element={<AIAssistant />} />
            <Route path="impact" element={<ImpactReport />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </main>
      </div>

      {/* Tampilkan Bottom Nav jika di layar Mobile */}
      {isMobile && <BottomNav />}
    </div>
  );
}

// --- MAIN ENTRY POINT ---
export default function App() {
  return (
    <Router>
      <Routes>
        {/* Modul 0: Halaman depan publik */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Hubungkan ke layout internal dashboard utama */}
        <Route path="/app/*" element={<AppContent />} />
        
        {/* Lempar rute tidak dikenal kembali ke Landing Page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}