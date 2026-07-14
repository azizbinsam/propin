import { useState } from 'react'
import { Search } from 'lucide-react'
import properties from '../data/properties.json'
import PropertyCard from '../components/PropertyCard'

const FILTERS = [
  { value: 'semua', label: 'Semua' },
  { value: 'apartemen', label: 'Apartemen' },
  { value: 'vila', label: 'Vila' },
  { value: 'hotel', label: 'Hotel' },
]

export default function Marketplace() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('semua')

  const filtered = properties.filter((p) => {
    const matchFilter = filter === 'semua' || p.category === filter
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <div>
      <header className="lg:hidden sticky top-0 z-30 bg-neutral-0 border-b border-neutral-200 px-4 py-3">
        <h1 className="font-bold text-neutral-800">Marketplace</h1>
      </header>

      <div className="p-4 lg:p-0">
        <h1 className="hidden lg:block text-xl font-bold text-neutral-800 mb-6">Marketplace Properti</h1>

        <div className="flex items-center gap-2 bg-neutral-0 border border-neutral-200 rounded-btn px-3 py-2.5 mb-4">
          <Search size={16} className="text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari properti atau lokasi"
            className="flex-1 text-sm outline-none placeholder:text-neutral-400 bg-transparent"
          />
        </div>

        <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
          {FILTERS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                filter === value
                  ? 'bg-gold-600 text-white border-gold-600'
                  : 'bg-neutral-0 text-neutral-600 border-neutral-200 hover:border-gold-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-sm text-neutral-500 py-10">
            Tidak ada properti yang cocok dengan pencarian.
          </p>
        )}
      </div>
    </div>
  )
}