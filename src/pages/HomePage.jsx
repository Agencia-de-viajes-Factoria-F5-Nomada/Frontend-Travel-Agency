import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/atoms/Button'
import DestinationCard from '../components/organisms/DestinationCard'
import Input from '../components/atoms/Input'
import { travelService } from '../services/TravelsService'
import { authService } from '../services/authService'
import { PUBLIC_PATHS } from '../constants/paths'

const HomePage = () => {
  const [travels, setTravels] = useState([])
  const [travelsLoading, setTravelsLoading] = useState(true)
  const navigate = useNavigate()

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

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({ email: '', password: '' })

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
        <p style={{ color: '#7AAFC0' }} className="text-base leading-7 mb-8 max-w-lg">
          Explora los mejores destinos seleccionados por nuestros viajeros.
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
            Ver todos
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
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
    </>
  )
}

export default HomePage