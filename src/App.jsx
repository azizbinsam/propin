import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';

import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import TokenizationDetail from './pages/TokenizationDetail';
import TransactionDetail from './pages/TransactionDetail';
import Wallet from './pages/Wallet';
import Certificate from './pages/Certificate';
import AutoZakat from './pages/AutoZakat';
import AIAssistant from './pages/AIAssistant';
import ImpactReport from './pages/ImpactReport';
import Report from './pages/Report';

function AppContent() {
  return (
    <div className="flex min-h-screen bg-neutral-50">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="tokenization/:id" element={<TokenizationDetail />} />
          <Route path="transaction/:id" element={<TransactionDetail />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="certificate/:id" element={<Certificate />} />
          <Route path="zakat" element={<AutoZakat />} />
          <Route path="ai-assistant" element={<AIAssistant />} />
          <Route path="impact" element={<ImpactReport />} />
          <Route path="report" element={<Report />} />
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </main>
      <div className="md:hidden">
        <BottomNav />
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app/*" element={<AppContent />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;