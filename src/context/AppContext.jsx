import React, { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [walletBalance, setWalletBalance] = useState(15000000);
  const [portfolioValue, setPortfolioValue] = useState(125750000);
  const [ownedTokens, setOwnedTokens] = useState([]);

  // Gunakan useCallback agar fungsi tidak berubah tiap render
  const buyTokens = useCallback((propertyId, propertyName, tokenAmount, pricePerToken) => {
    const totalCost = tokenAmount * pricePerToken;
    if (totalCost > walletBalance) {
      alert('Saldo tidak mencukupi');
      return false;
    }
    setWalletBalance(prev => prev - totalCost);
    setOwnedTokens(prev => [
      ...prev,
      { id: propertyId, propertyName, tokens: tokenAmount, value: totalCost }
    ]);
    setPortfolioValue(prev => prev + totalCost);
    return true;
  }, [walletBalance]);

  return (
    <AppContext.Provider value={{
      walletBalance,
      setWalletBalance,
      portfolioValue,
      setPortfolioValue,
      ownedTokens,
      setOwnedTokens,
      buyTokens,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};