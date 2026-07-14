import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ResponsiveShell from './layouts/ResponsiveShell'

import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import Marketplace from './pages/Marketplace'
import PropertyDetail from './pages/PropertyDetail'
import DetailTokenisasi from './pages/DetailTokenisasi'
import Investasi from './pages/Investasi'
import Wallet from './pages/Wallet'
import TransaksiList from './pages/TransaksiList'
import DetailTransaksi from './pages/DetailTransaksi'
import SertifikatList from './pages/SertifikatList'
import SertifikatDetail from './pages/SertifikatDetail'
import AutoZakat from './pages/AutoZakat'
import AiAssistant from './pages/AiAssistant'
import Dampak from './pages/Dampak'
import Laporan from './pages/Laporan'
import Akun from './pages/Akun'
import Styleguide from './pages/Styleguide'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/styleguide" element={<Styleguide />} />

        <Route element={<ResponsiveShell />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/marketplace/:propertyId" element={<PropertyDetail />} />
          <Route path="/tokenisasi/:propertyId" element={<DetailTokenisasi />} />
          <Route path="/investasi" element={<Investasi />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/transaksi" element={<TransaksiList />} />
          <Route path="/transaksi/:txId" element={<DetailTransaksi />} />
          <Route path="/sertifikat" element={<SertifikatList />} />
          <Route path="/sertifikat/:tokenId" element={<SertifikatDetail />} />
          <Route path="/zakat" element={<AutoZakat />} />
          <Route path="/ai-assistant" element={<AiAssistant />} />
          <Route path="/dampak" element={<Dampak />} />
          <Route path="/laporan" element={<Laporan />} />
          <Route path="/akun" element={<Akun />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App