import { createContext, useContext, useState } from 'react'
import initialTransactions from '../data/transactions.json'
import initialHoldings from '../data/holdings.json'
import { generateTxHash } from '../utils/blockchain'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [holdings, setHoldings] = useState(initialHoldings)
  const [transactions, setTransactions] = useState(initialTransactions)

  function addPurchase({ property, tokenAmount, nominal }) {
    const txId = `tx-${Date.now()}`
    const txHash = generateTxHash()

    const transaction = {
      id: txId,
      propertyId: property.id,
      propertyName: property.name,
      tokenAmount,
      nominal,
      txHash,
      status: 'Executed',
      createdAt: new Date().toISOString(),
    }

    setTransactions((prev) => [transaction, ...prev])

    setHoldings((prev) => {
      const existing = prev.find((h) => h.propertyId === property.id)
      if (existing) {
        return prev.map((h) =>
          h.propertyId === property.id
            ? { ...h, tokens: h.tokens + tokenAmount }
            : h
        )
      }
      return [
        ...prev,
        {
          propertyId: property.id,
          propertyName: property.name,
          tokens: tokenAmount,
          totalPropertyTokens: property.totalTokens,
        },
      ]
    })

    return txId
  }

  return (
    <AppContext.Provider value={{ holdings, transactions, addPurchase }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppData() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppData must be used within AppProvider')
  return ctx
}