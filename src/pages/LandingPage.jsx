import { Link } from 'react-router-dom'
import {
  CheckCircle2, Coins, ShieldCheck, Bot, Moon, HeartHandshake,
  UserCheck, Search, ShoppingCart, FileCode2, BadgeCheck, TrendingUp, HandCoins,
} from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'

const ADVANTAGES = [
  {
    icon: Coins,
    title: 'Tokenisasi Properti Syariah',
    desc: 'Kepemilikan fraksional mulai dari Rp100.000',
  },
  {
    icon: ShieldCheck,
    title: 'Blockchain Transparan',
    desc: 'Aman, immutable, dan dapat diverifikasi publik',
  },
  {
    icon: Bot,
    title: 'AI Cerdas',
    desc: 'Rekomendasi personal dan edukasi investasi',
  },
  {
    icon: Moon,
    title: 'Sesuai Syariah',
    desc: 'Akad syariah, bebas riba, gharar, dan maysir',
  },
  {
    icon: HeartHandshake,
    title: 'Berdampak Nyata',
    desc: 'Mendorong inklusi keuangan dan kesejahteraan umat',
  },
]

const INVESTMENT_FLOW = [
  { icon: UserCheck, title: 'Daftar & Verifikasi', desc: 'Buat akun dan verifikasi identitas Anda' },
  { icon: Search, title: 'Pilih Properti', desc: 'Pilih properti syariah di marketplace' },
  { icon: ShoppingCart, title: 'Beli Token', desc: 'Beli token sesuai nominal yang Anda inginkan' },
  { icon: FileCode2, title: 'Smart Contract', desc: 'Transaksi diproses otomatis oleh smart contract' },
  { icon: BadgeCheck, title: 'Kepemilikan Tercatat', desc: 'Anda menjadi pemilik token di blockchain' },
  { icon: TrendingUp, title: 'Terima Imbal Hasil', desc: 'Dapatkan bagi hasil secara berkala' },
  { icon: HandCoins, title: 'Auto-Zakat', desc: 'Zakat mal otomatis disalurkan jika nisab tercapai' },
]

const HERO_BULLETS = [
  'Investasi Properti Lebih Mudah',
  'Transparan & Aman dengan Blockchain',
  'Sesuai Prinsip Syariah',
]

function HeroIllustration() {
  return (
    <svg viewBox="0 0 320 260" className="w-full max-w-sm mx-auto">
      <ellipse cx="160" cy="235" rx="130" ry="14" fill="#EAD49B" opacity="0.4" />
      <rect x="70" y="110" width="180" height="120" rx="8" fill="#FFFFFF" stroke="#E4E0D6" strokeWidth="2" />
      <polygon points="60,120 160,50 260,120" fill="#B08A2E" />
      <rect x="140" y="160" width="40" height="70" rx="4" fill="#1F8A55" />
      <rect x="90" y="140" width="30" height="30" rx="3" fill="#F5E8C8" stroke="#DDBD6E" strokeWidth="1.5" />
      <rect x="200" y="140" width="30" height="30" rx="3" fill="#F5E8C8" stroke="#DDBD6E" strokeWidth="1.5" />
      <circle cx="250" cy="70" r="18" fill="#F5E8C8" />
      <circle cx="250" cy="70" r="10" fill="#EAD49B" />
    </svg>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Nav */}
      <header className="flex items-center justify-between px-6 md:px-10 py-5 max-w-6xl mx-auto">
        <span className="font-serif text-2xl font-bold text-gold-700">PROPIN</span>
        <Link to="/dashboard">
          <Button variant="primary" size="sm">Coba Prototype</Button>
        </Link>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-green-700 font-semibold text-sm mb-2">Satu Token, Satu Kepemilikan</p>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 leading-tight">
            Platform Tokenisasi Properti Syariah Berbasis Blockchain dan AI
          </h1>
          <ul className="mt-6 space-y-3">
            {HERO_BULLETS.map((text) => (
              <li key={text} className="flex items-center gap-2 text-neutral-700">
                <CheckCircle2 size={18} className="text-green-600 shrink-0" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex gap-3">
            <Link to="/dashboard">
              <Button variant="primary" size="lg">Coba Prototype</Button>
            </Link>
            <a href="#alur-investasi">
              <Button variant="outline" size="lg">Lihat Alur Investasi</Button>
            </a>
          </div>
        </div>
        <HeroIllustration />
      </section>

      {/* Keunggulan */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-16">
        <h2 className="text-2xl font-bold text-neutral-800 text-center">Keunggulan PROPIN</h2>
        <p className="text-neutral-500 text-center mt-2 max-w-lg mx-auto">
          Investasi properti syariah yang mudah, transparan, dan berdampak nyata.
        </p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {ADVANTAGES.map(({ icon: Icon, title, desc }) => (
            <Card key={title} variant="default" className="text-center">
              <div className="w-11 h-11 mx-auto rounded-full bg-gold-50 flex items-center justify-center">
                <Icon size={20} className="text-gold-600" />
              </div>
              <h3 className="font-semibold text-neutral-800 mt-3 text-sm">{title}</h3>
              <p className="text-xs text-neutral-500 mt-1">{desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Alur Investasi */}
      <section id="alur-investasi" className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-16">
        <h2 className="text-2xl font-bold text-neutral-800 text-center">Alur Investasi di PROPIN</h2>
        <p className="text-neutral-500 text-center mt-2">7 langkah mudah menuju kepemilikan properti syariah</p>

        {/* Desktop: horizontal stepper */}
        <div className="hidden lg:flex items-start justify-between mt-10 relative">
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-gold-200 mx-6" />
          {INVESTMENT_FLOW.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="relative z-10 flex flex-col items-center text-center w-32">
              <div className="w-12 h-12 rounded-full bg-gold-600 text-white flex items-center justify-center shadow-goldGlow">
                <Icon size={20} />
              </div>
              <p className="text-xs font-bold text-gold-700 mt-3">{i + 1}. {title}</p>
              <p className="text-[11px] text-neutral-500 mt-1">{desc}</p>
            </div>
          ))}
        </div>

        {/* Mobile: vertical stepper */}
        <div className="lg:hidden mt-8 space-y-6 relative pl-6 border-l-2 border-gold-200">
          {INVESTMENT_FLOW.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="relative">
              <div className="absolute -left-[31px] w-8 h-8 rounded-full bg-gold-600 text-white flex items-center justify-center">
                <Icon size={14} />
              </div>
              <p className="text-sm font-bold text-gold-700">{i + 1}. {title}</p>
              <p className="text-xs text-neutral-500 mt-0.5">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-gold-gradient py-12 text-center px-6">
        <h2 className="text-white text-2xl font-bold">Mulai Investasi Properti Syariah Sekarang</h2>
        <p className="text-white/80 mt-2">Prototype interaktif — jelajahi seluruh fitur PROPIN</p>
        <Link to="/dashboard" className="inline-block mt-6">
          <Button variant="outline" size="lg" className="!bg-white !border-white !text-gold-700 hover:!bg-neutral-50">
            Coba Prototype
          </Button>
        </Link>
      </section>
    </div>
  )
}