import { Link } from 'react-router-dom'
import ProgressBar from './ProgressBar'
import { formatRupiah, formatPercent } from '../utils/format'

const CATEGORY_GRADIENT = {
  apartemen: 'from-gold-300 to-gold-600',
  vila: 'from-green-300 to-green-700',
  hotel: 'from-gold-400 to-green-700',
}

export default function PropertyCard({ property }) {
  const {
    id, name, location, category, pricePerToken,
    minInvestment, projectedReturnPercent, fundingPercent,
  } = property

  return (
    <Link
      to={`/tokenisasi/${id}`}
      className="block bg-neutral-0 border border-neutral-200 rounded-card overflow-hidden hover:shadow-card transition-shadow"
    >
      <div className={`h-32 bg-gradient-to-br ${CATEGORY_GRADIENT[category]} flex items-center justify-center`}>
        <span className="text-white/90 text-xs font-semibold uppercase tracking-wide">{category}</span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-neutral-800">{name}</h3>
        <p className="text-xs text-neutral-500 mt-0.5">{location}</p>

        <p className="text-sm font-bold text-gold-700 mt-3">{formatRupiah(pricePerToken)} / token</p>
        <p className="text-xs text-neutral-500 mt-0.5">Min. Investasi {formatRupiah(minInvestment)}</p>

        <div className="flex items-center justify-between mt-3 text-xs">
          <span className="text-green-700 font-semibold">{formatPercent(projectedReturnPercent)} / tahun</span>
          <span className="text-neutral-500">{fundingPercent}%</span>
        </div>
        <ProgressBar value={fundingPercent} variant="green" className="mt-1.5" />
      </div>
    </Link>
  )
}