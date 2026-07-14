import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Simulasi Saldo Wallet & Portofolio
  const [walletBalance, setWalletBalance] = useState(15000000); // Mulai dari Rp15 juta
  const [portfolioValue, setPortfolioValue] = useState(125750000); // Portofolio awal
  const [ownedTokens, setOwnedTokens] = useState([
    { id: '1', propertyName: 'Apartemen BSD Green Valley', tokens: 150, value: 15000000 },
    { id: '2', propertyName: 'Vila Tanjung Lesung', tokens: 100, value: 10000000 }
  ]);

  // Fungsi simulasi membeli token
  const buyTokens = (propertyId, propertyName, quantity, pricePerToken) => {
    const cost = quantity * pricePerToken;
    if (walletBalance >= cost) {
      // Kurangi saldo wallet
      setWalletBalance(prev => prev - cost);
      // Tambah nilai portofolio
      setPortfolioValue(prev => prev + cost);
      // Update kepemilikan token
      setOwnedTokens(prev => {
        const existing = prev.find(item => item.id === propertyId);
        if (existing) {
          return prev.map(item => 
            item.id === propertyId 
              ? { ...item, tokens: item.tokens + quantity, value: item.value + cost }
              : item
          );
        } else {
          return [...prev, { id: propertyId, propertyName, tokens: quantity, value: cost }];
        }
      });
      return true;
    }
    return false;
  };

  return (
    <AppContext.Provider value={{ walletBalance, portfolioValue, ownedTokens, buyTokens }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}