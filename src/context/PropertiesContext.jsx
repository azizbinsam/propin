import { createContext, useContext, useState } from 'react'
import initialProperties from '../data/properties.json'

const PropertiesContext = createContext(null)

export function PropertiesProvider({ children }) {
  const [properties, setProperties] = useState(initialProperties)

  function addProperty(property) {
    const newProperty = {
      ...property,
      id: `prop-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'Aktif',
    }
    setProperties((prev) => [newProperty, ...prev])
    return newProperty
  }

  function updateProperty(id, updates) {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    )
  }

  function togglePropertyStatus(id) {
    setProperties((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: p.status === 'Aktif' ? 'Nonaktif' : 'Aktif' } : p
      )
    )
  }

  function deleteProperty(id) {
    setProperties((prev) => prev.filter((p) => p.id !== id))
  }

  const activeProperties = properties.filter((p) => !p.status || p.status === 'Aktif')

  const value = {
    properties,
    activeProperties,
    addProperty,
    updateProperty,
    togglePropertyStatus,
    deleteProperty,
  }

  return (
    <PropertiesContext.Provider value={value}>
      {children}
    </PropertiesContext.Provider>
  )
}

export function useProperties() {
  const ctx = useContext(PropertiesContext)
  if (!ctx) throw new Error('useProperties must be used within PropertiesProvider')
  return ctx
}