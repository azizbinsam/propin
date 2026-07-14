import { Link } from 'react-router-dom'
import Button from '../components/Button'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 text-center px-6">
      <span className="font-serif text-4xl font-bold text-gold-700">PROPIN</span>
      <p className="text-neutral-500 mt-2">Satu Token, Satu Kepemilikan</p>
      <p className="text-neutral-600 mt-6 max-w-md">
        Landing page lengkap (Hero, Keunggulan PROPIN, Alur Investasi) akan dibangun di Part 4.
      </p>
      <Link to="/dashboard" className="mt-6">
        <Button variant="primary" size="lg">Coba Prototype</Button>
      </Link>
    </div>
  )
}