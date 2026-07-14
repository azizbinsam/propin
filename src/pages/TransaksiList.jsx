import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useAppData } from '../context/AppContext'
import { formatRupiah, formatNumber } from '../utils/format'
import Badge from '../components/Badge'

export default function TransaksiList() {
  const { transactions } = useAppData()

  return (
    <div>
      <header className="lg:hidden sticky top-0 z-30 bg-neutral-0 border-b border-neutral-200 px-4 py-3">
        <h1 className="font-bold text-neutral-800">Riwayat Transaksi</h1>
      </header>

      <div className="p-4 lg:p-0">
        <h1 className="hidden lg:block text-xl font-bold text-neutral-800 mb-6">Riwayat Transaksi</h1>

        {transactions.length === 0 && (
          <p className="text-sm text-neutral-500 text-center py-10">Belum ada transaksi.</p>
        )}

        <div className="space-y-3">
          {transactions.map((tx) => (
            <Link
              key={tx.id}
              to={`/transaksi/${tx.id}`}
              className="flex items-center justify-between bg-neutral-0 border border-neutral-200 rounded-card p-4 hover:shadow-card transition-shadow"
            >
              <div>
                <p className="text-sm font-semibold text-neutral-800">{tx.propertyName}</p>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {formatNumber(tx.tokenAmount)} Token • {formatRupiah(tx.nominal)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="success" withCheck>{tx.status}</Badge>
                <ArrowUpRight size={16} className="text-neutral-400" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}