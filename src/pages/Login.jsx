import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { toast } from '../components/Toast'
import Button from '../components/Button'

// Simple email validation: must have @ and . with non-empty parts
function isValidEmail(email) {
  const trimmed = email.trim()
  if (!trimmed) return false
  const parts = trimmed.split('@')
  if (parts.length !== 2) return false
  const [local, domain] = parts
  if (!local || !domain) return false
  if (!domain.includes('.')) return false
  const domainParts = domain.split('.')
  if (domainParts.some(p => !p)) return false
  return true
}

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isAuthenticated, user } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if already logged in
  if (isAuthenticated && user) {
    const redirectTo = user.role === 'admin' ? '/admin/dashboard' : '/dashboard'
    navigate(redirectTo, { replace: true })
    return null
  }

  function validate() {
    const errs = {}
    const trimmedEmail = email.trim()
    if (!trimmedEmail) {
      errs.email = 'Email wajib diisi'
    } else if (!isValidEmail(trimmedEmail)) {
      errs.email = 'Format email tidak valid'
    }
    if (!password) {
      errs.password = 'Kata sandi wajib diisi'
    } else if (password.length < 6) {
      errs.password = 'Kata sandi minimal 6 karakter'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    try {
      const result = await login(email.trim(), password)
      toast(`Selamat datang, ${result.user.name}!`, 'success')
      const from = location.state?.from
      if (from && !from.startsWith('/admin')) {
        navigate(from, { replace: true })
      } else {
        navigate(result.user.role === 'admin' ? '/admin/dashboard' : '/dashboard', { replace: true })
      }
    } catch (err) {
      toast(err.message || 'Gagal masuk', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-8">
      {/* Decorative left panel on desktop */}
      <div className="hidden lg:flex lg:w-2/5 min-h-screen bg-gradient-to-br from-gold-500 to-gold-800 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full border border-white/30" />
          <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full border border-white/20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-white/10" />
        </div>
        <div className="relative z-10 text-center text-white px-8">
          <h1 className="font-serif text-4xl font-bold mb-4">PROPIN</h1>
          <p className="text-lg opacity-90 mb-2">Satu Token, Satu Kepemilikan</p>
          <p className="text-sm opacity-70 max-w-xs mx-auto">
            Platform tokenisasi properti syariah berbasis blockchain & AI
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="w-full max-w-md mx-auto lg:mx-0 lg:w-3/5 lg:px-16">
        <div className="lg:hidden text-center mb-8">
          <h1 className="font-serif text-2xl font-bold text-gold-700">PROPIN</h1>
          <p className="text-xs text-neutral-400 mt-1">Satu Token, Satu Kepemilikan</p>
        </div>

        <div className="bg-neutral-0 rounded-2xl border border-neutral-200 shadow-sm p-6 lg:p-8">
          <h2 className="text-xl font-bold text-neutral-800 mb-1">Masuk</h2>
          <p className="text-sm text-neutral-500 mb-6">Silakan masuk ke akun Anda</p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })) }}
                  placeholder="nama@email.com"
                  className={`w-full h-11 pl-10 pr-3 rounded-xl border text-sm transition-colors outline-none
                    ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100' : 'border-neutral-200 focus:border-gold-600 focus:ring-2 focus:ring-gold-100'}`}
                />
              </div>
              {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1.5">Kata Sandi</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: '' })) }}
                  placeholder="••••••••"
                  className={`w-full h-11 pl-10 pr-10 rounded-xl border text-sm transition-colors outline-none
                    ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100' : 'border-neutral-200 focus:border-gold-600 focus:ring-2 focus:ring-gold-100'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full h-11 mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2 justify-center">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Memproses...
                </span>
              ) : (
                'Masuk'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-500">
              Belum punya akun?{' '}
              <Link to="/register" className="text-gold-700 font-medium hover:underline">
                Daftar
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-100">
            <p className="text-xs text-neutral-400 text-center mb-2">Akun demo:</p>
            <div className="flex gap-2 justify-center">
              <button
                type="button"
                onClick={() => { setEmail('sinta@propin.id'); setPassword('password123'); setErrors({}) }}
                className="text-xs px-3 py-1.5 rounded-lg bg-gold-50 text-gold-700 border border-gold-200 hover:bg-gold-100 transition-colors"
              >
                User Demo
              </button>
              <button
                type="button"
                onClick={() => { setEmail('admin@propin.id'); setPassword('password123'); setErrors({}) }}
                className="text-xs px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-600 border border-neutral-200 hover:bg-neutral-200 transition-colors"
              >
                Admin Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}