import { useState, useEffect } from 'react'
import { ArrowRight, MapPin, Search, Users, Calendar, LogIn, UserPlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/atoms/Button'
import Card from '../components/atoms/Card'
import Input from '../components/atoms/Input'
import DestinationCard from '../components/organisms/DestinationCard'
import { travelService } from '../services/travelsService'
import { authService } from '../services/authService'
import { PUBLIC_PATHS } from '../constants/paths'
import { classNames } from '../utils/classNames'

const POPULAR = ['Londres', 'París', 'Roma', 'Tokio']

const TABS = [
  { id: 'signin', label: 'Iniciar sesión', icon: LogIn },
  { id: 'signup', label: 'Crear cuenta',   icon: UserPlus },
]

const HomePage = () => {
  const [travels, setTravels] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState({ destiny: '', startDate: '', endDate: '', passengers: 2 })
  const [active, setActive] = useState('signin')
  const [authLoading, setAuthLoading] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({email: '', password: '' })

  const [travelsLoading, setTravelsLoading] = useState(true)
  const navigate = useNavigate()
  const isSignIn = active === 'signin'

  useEffect(() => {
    travelService.getFeatured()
      .then(data => {
        setTravels(data);
      })
      .catch(() => {
        setTravels([]);
      })
      .finally(() => setTravelsLoading(false))
  }, [])

  const change = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await authService.login(form.email, form.password)
      const user = authService.getUser()
      navigate(user?.role === 'ADMIN' || user?.rol === 'ADMIN' ? '/admin' : '/profile')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* ── HERO ── */}
      <section
        style={{ background: '#1A3A5C' }}
        className="flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center px-6 py-10 text-center"
      >
        {/* Title */}
        <h1 style={{ color: '#DAEEF7', letterSpacing: '-0.02em' }} className="text-5xl font-medium leading-tight mb-3">
          Siempre en el lugar exacto
        </h1>
        <p style={{ color: '#7AAFC0' }} className="text-base mb-8 max-w-lg">
          Inicia sesión o crea una cuenta para gestionar tus reservas.
        </p>

        <div
          style={{
            background: 'rgba(218,238,247,0.06)',
            border: '1.5px solid #4A8FA8',
            borderRadius: 16,
            padding: '1.5rem',
            width: '100%',
            maxWidth: 440,
          }}
        >
          <h2 className="text-xl font-semibold text-white text-center mb-1">
            Iniciar sesión
          </h2>
          <p className="text-sm text-[#7AAFC0] text-center mb-4">
            Accede a tu cuenta para gestionar tus reservas.
          </p>

          {error && (
            <div className="mb-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid gap-3">
            <Input
              label="Correo electrónico"
              name="email"
              type="email"
              placeholder="tu@ejemplo.com"
              value={form.email}
              onChange={change}
              required
            />
            <Input
              label="Contraseña"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={change}
              required
            />

            <Button type="submit" fullWidth size="lg" disabled={loading}>
              {loading ? 'Cargando...' : 'Iniciar sesión'}
            </Button>
          </form>
        </div>
      </section>

      {/* ── DESTACADOS ── */}
      <section className="container-page py-12">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold text-white">Destinos destacados</h2>
            <p className="mt-2 text-ink-muted">Viajes disponibles, los favoritos de nuestros viajeros</p>
          </div>
          <Button to={PUBLIC_PATHS.SEARCH} variant="ghost">
            Ver todos <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        {travelsLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-2xl bg-surface-800" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {travels.map(travel => (
              <DestinationCard key={travel.id} destination={travel} featured />
            ))}
          </div>
        )}
      </section>

      {/* ── BUSCADOR ── */}
      <section style={{ background: '#122840' }} className="flex flex-col items-center px-6 py-12">
        <h2 style={{ color: '#DAEEF7' }} className="text-2xl font-medium mb-6">¿A dónde quieres ir?</h2>
        <form onSubmit={handleSearch}
          style={{ background: 'rgba(218,238,247,0.06)', border: '1.5px solid #4A8FA8', borderRadius: 16, padding: '1rem', width: '100%', maxWidth: 860 }}
          className="flex flex-col lg:flex-row items-center gap-0">

          <div className="flex flex-col flex-[2] w-full px-3 py-1 lg:border-r" style={{ borderColor: 'rgba(74,143,168,0.3)' }}>
            <span style={{ fontSize: 10, color: '#4A8FA8', letterSpacing: '0.1em' }} className="uppercase mb-1">Destino</span>
            <div className="flex items-center gap-2">
              <MapPin size={15} style={{ color: '#4A8FA8', flexShrink: 0 }} />
              <input type="text" placeholder="¿A dónde?" value={search.destiny}
                onChange={e => setSearch(s => ({ ...s, destiny: e.target.value }))}
                style={{ background: 'transparent', border: 'none', outline: 'none', color: '#DAEEF7', fontSize: 14, width: '100%' }}
                className="placeholder:text-white/25" />
            </div>
          </div>

          <div className="flex flex-col flex-1 w-full px-3 py-1 lg:border-r" style={{ borderColor: 'rgba(74,143,168,0.3)' }}>
            <span style={{ fontSize: 10, color: '#4A8FA8', letterSpacing: '0.1em' }} className="uppercase mb-1">Salida</span>
            <div className="flex items-center gap-2">
              <Calendar size={15} style={{ color: '#4A8FA8', flexShrink: 0 }} />
              <input type="date" value={search.startDate}
                onChange={e => setSearch(s => ({ ...s, startDate: e.target.value }))}
                style={{ colorScheme: 'dark', background: 'transparent', border: 'none', outline: 'none', color: search.startDate ? '#DAEEF7' : 'rgba(218,238,247,0.25)', fontSize: 13, width: '100%' }} />
            </div>
          </div>

          <div className="flex flex-col flex-1 w-full px-3 py-1 lg:border-r" style={{ borderColor: 'rgba(74,143,168,0.3)' }}>
            <span style={{ fontSize: 10, color: '#4A8FA8', letterSpacing: '0.1em' }} className="uppercase mb-1">Vuelta</span>
            <div className="flex items-center gap-2">
              <Calendar size={15} style={{ color: '#4A8FA8', flexShrink: 0 }} />
              <input type="date" value={search.endDate}
                onChange={e => setSearch(s => ({ ...s, endDate: e.target.value }))}
                style={{ colorScheme: 'dark', background: 'transparent', border: 'none', outline: 'none', color: search.endDate ? '#DAEEF7' : 'rgba(218,238,247,0.25)', fontSize: 13, width: '100%' }} />
            </div>
          </div>

          <div className="flex flex-col flex-1 w-full px-3 py-1 lg:border-r" style={{ borderColor: 'rgba(74,143,168,0.3)' }}>
            <span style={{ fontSize: 10, color: '#4A8FA8', letterSpacing: '0.1em' }} className="uppercase mb-1">Viajeros</span>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Users size={15} style={{ color: '#4A8FA8' }} />
                <span style={{ fontSize: 13, color: 'rgba(218,238,247,0.7)' }}>{search.passengers}</span>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setSearch(s => ({ ...s, passengers: Math.max(1, s.passengers - 1) }))}
                  style={{ width: 20, height: 20, borderRadius: '50%', border: '0.5px solid rgba(74,143,168,0.4)', background: 'transparent', color: '#7AAFC0', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                <button type="button" onClick={() => setSearch(s => ({ ...s, passengers: Math.min(20, s.passengers + 1) }))}
                  style={{ width: 20, height: 20, borderRadius: '50%', border: '0.5px solid rgba(74,143,168,0.4)', background: 'transparent', color: '#7AAFC0', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
              </div>
            </div>
          </div>

          <div className="pl-3 w-full lg:w-auto mt-3 lg:mt-0">
            <button type="submit"
              style={{ background: '#4A8FA8', color: '#DAEEF7', border: 'none', borderRadius: 10, padding: '10px 22px', fontSize: 14, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap', width: '100%', justifyContent: 'center' }}>
              <Search size={15} /> Buscar
            </button>
          </div>
        </form>

        <div className="flex items-center gap-2 mt-4 flex-wrap justify-center">
          <span style={{ fontSize: 11, color: '#7AAFC0' }}>Populares:</span>
          {POPULAR.map(p => (
            <button key={p} type="button" onClick={() => setSearch(s => ({ ...s, destiny: p }))}
              style={{ fontSize: 11, color: '#7AAFC0', border: '0.5px solid rgba(74,143,168,0.3)', borderRadius: 20, padding: '2px 12px', background: 'transparent', cursor: 'pointer' }}>
              {p}
            </button>
          ))}
        </div>
      </section>
    </>
  )
}

export default HomePage