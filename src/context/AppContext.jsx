import React, { createContext, useContext, useState, useEffect } from 'react';
import userData from '../data/user.json';
import walletData from '../data/wallet.json';
import propertiesData from '../data/properties.json';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(userData);
  const [wallet, setWallet] = useState(walletData);
  const [ownedTokens, setOwnedTokens] = useState(walletData.tokens || []);
  const [portfolioValue, setPortfolioValue] = useState(125750000);
  const [walletBalance, setWalletBalance] = useState(walletData.balance || 15000000);

  // Fungsi untuk membeli token
  const buyTokens = (propertyId, propertyName, tokenAmount, pricePerToken) => {
    const totalCost = tokenAmount * pricePerToken;
    if (totalCost > walletBalance) {
      alert('Saldo tidak mencukupi');
      return false;
    }

    // Kurangi saldo
    setWalletBalance(prev => prev - totalCost);

    // Tambah kepemilikan
    const existing = ownedTokens.find(t => t.id === propertyId);
    if (existing) {
      setOwnedTokens(prev => prev.map(t => 
        t.id === propertyId 
          ? { ...t, tokens: t.tokens + tokenAmount, value: t.value + totalCost }
          : t
      ));
    } else {
      setOwnedTokens(prev => [
        ...prev,
        {
          id: propertyId,
          propertyName: propertyName,
          tokens: tokenAmount,
          value: totalCost,
        }
      ]);
    }

    // Update portfolio value
    setPortfolioValue(prev => prev + totalCost);
    return true;
  };

  // Update wallet.tokens agar sinkron
  useEffect(() => {
    setWallet(prev => ({ ...prev, tokens: ownedTokens, balance: walletBalance }));
  }, [ownedTokens, walletBalance]);

  return (
    <AppContext.Provider value={{
      user,
      wallet,
      ownedTokens,
      portfolioValue,
      walletBalance,
      buyTokens,
      setWalletBalance,
      setOwnedTokens,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};