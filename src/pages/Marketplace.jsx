import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, TrendingUp, Building2 } from 'lucide-react';
import propertiesData from '../data/properties.json';

export default function Marketplace() {
  const [filter, setFilter] = useState('Semua');
  const [search, setSearch] = useState('');

  const categories = ['Semua', 'Apartemen', 'Komersial', 'Vila', 'Penginapan'];

  const filtered = propertiesData.filter(p => {
    const matchCategory = filter === 'Semua' || p.category === filter;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                        p.location.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const formatRupiah = (val) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      <h1 className="text-2xl font-bold">Marketplace Properti</h1>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
        <input
          type="text"
          placeholder="Cari properti atau lokasi"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:border-gold-500 bg-neutral-0"
        />
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === cat
                ? 'bg-gold-600 text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <Link to={`/app/tokenization/${item.id}`} key={item.id} className="card hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="relative h-40 rounded-xl overflow-hidden bg-neutral-200">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 badge-syariah">
                <Building2 size={12} /> {item.category}
              </div>
            </div>
            <div className="mt-3">
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-sm text-neutral-500 flex items-center gap-1"><MapPin size={14} /> {item.location}</p>
              <div className="flex justify-between items-center mt-2 text-sm">
                <span className="font-semibold text-gold-700">{formatRupiah(item.tokenPrice)} / token</span>
                <span className="text-green-600 font-medium flex items-center gap-1">
                  <TrendingUp size={14} /> {item.projectedRoi}
                </span>
              </div>
              {/* Progress bar */}
              <div className="mt-2">
                <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-600 rounded-full" style={{ width: `${(item.tokensSold / item.totalTokens) * 100}%` }} />
                </div>
                <div className="flex justify-between text-xs text-neutral-400 mt-1">
                  <span>{((item.tokensSold / item.totalTokens) * 100).toFixed(0)}% terkumpul</span>
                  <span>{item.tokensSold.toLocaleString()}/{item.totalTokens.toLocaleString()} token</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-12 text-neutral-400">
          Tidak ada properti yang sesuai dengan filter.
        </div>
      )}
    </div>
  );
}