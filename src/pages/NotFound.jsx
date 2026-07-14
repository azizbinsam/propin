import { Link } from 'react-router-dom'
import Button from '../components/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-3xl font-bold text-neutral-800">404</h1>
      <p className="text-neutral-500 mt-2">Halaman tidak ditemukan.</p>
      <Link to="/" className="mt-4">
        <Button variant="outline">Kembali ke Landing</Button>
      </Link>
    </div>
  )
}