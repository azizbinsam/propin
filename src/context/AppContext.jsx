import { createContext, useContext, useMemo, useState } from 'react'
import initialTransactions from '../data/transactions.json'
import initialHoldings from '../data/holdings.json'
import properties from '../data/properties.json'
import portfolioBase from '../data/portfolio.json'
import { generateTxHash } from '../utils/blockchain'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [holdings, setHoldings] = useState(initialHoldings)
  const [transactions, setTransactions] = useState(initialTransactions)

  // Portfolio dihitung otomatis dari holdings + properties, jadi selalu
  // sinkron begitu ada pembelian baru (bukan angka statis lagi).
  const portfolio = useMemo(() => {
    let totalValue = 0
    let weightedReturnSum = 0

    holdings.forEach((holding) => {
      const property = properties.find((p) => p.id === holding.propertyId)
      if (!property) return
      const value = holding.tokens * property.pricePerToken
      totalValue += value
      weightedReturnSum += value * property.projectedReturnPercent
    })

    const averageReturnPercent = totalValue > 0 ? weightedReturnSum / totalValue : 0
    const totalReturn = totalValue * (averageReturnPercent / 100)
    const totalTokens = holdings.reduce((sum, h) => sum + h.tokens, 0)

    // Grafik kinerja tetap pakai histori bulan-bulan sebelumnya (mock),
    // hanya titik terakhir yang di-update mengikuti nilai portofolio saat ini.
    const performanceHistory = portfolioBase.performanceHistory.map((point, i, arr) =>
      i === arr.length - 1 ? { ...point, value: totalValue } : point
    )

    return {
      totalValue,
      totalReturn,
      totalReturnPercent: averageReturnPercent,
      totalProperties: holdings.length,
      totalTokens,
      averageReturnPercent,
      performanceHistory,
    }
  }, [holdings])

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
    <AppContext.Provider value={{ holdings, transactions, portfolio, addPurchase }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppData() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppData must be used within AppProvider')
  return ctx
}