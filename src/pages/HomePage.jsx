import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import Button from '../components/atoms/Button'
import Card from '../components/atoms/Card'
import Input from '../components/atoms/Input'
import DestinationCard from '../components/organisms/DestinationCard'
import { travelService } from '../services/TravelsService'
import { authService } from '../services/authService'

const HomePage = () => {
  const [travels, setTravels] = useState([])
  const [loading, setLoading] = useState(true)
  const [authLoading, setAuthLoading] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({ email: '', password: '' })
  const isLoggedIn = authService.isAuthenticated()
  const user = authService.getUser()

  useEffect(() => {
    if (isLoggedIn) {
      travelService.getFeatured()
        .then(data => setTravels(data.slice(0, 6)))
        .catch(() => setTravels([]))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [isLoggedIn])

  const change = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setError(null)
  }

  const handleAuth = async (e) => {
    e.preventDefault()
    setAuthLoading(true)
    setError(null)
    try {
      await authService.login(form.email, form.password)
      window.location.reload()
    } catch (e) {
      setError(e.message)
    } finally {
      setAuthLoading(false)
    }
  }

  return (
    <>
      {/* ── HERO ── */}
      <section className="flex flex-col items-center justify-center bg-accent-dark px-6 py-16 text-center">
        <h1 className="mb-3 text-4xl font-semibold leading-tight tracking-tight text-white">
          {isLoggedIn ? `¡Bienvenido de nuevo, ${user?.name ?? ''}!` : 'Bienvenido a Nómada'}
        </h1>
        <p className="mb-8 max-w-lg text-sm text-ink-muted">
          {isLoggedIn
            ? 'Descubre tus próximos destinos y encuentra el viaje perfecto.'
            : 'Inicia sesión o crea una cuenta para gestionar tus reservas.'}
        </p>

        {isLoggedIn ? (
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap gap-3 justify-center">
              <Button to="/destinations" size="lg">
                Ver todos los destinos <ArrowRight className="h-4 w-4" />
              </Button>
              <Button to="/checkout/custom" variant="secondary" size="lg">
                Crear viaje personalizado
              </Button>
            </div>
            <button
              onClick={() => { authService.logout(); window.location.reload() }}
              className="cursor-pointer border-none bg-transparent text-xs text-accent-muted underline"
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <Card className="w-full max-w-sm p-8 text-left">
            <h2 className="mb-6 text-xl font-semibold text-white">Iniciar sesión</h2>

            {error && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
            )}

            <form onSubmit={handleAuth} className="grid gap-4">
              <Input label="Correo electrónico" name="email" type="email"
                placeholder="tu@ejemplo.com" value={form.email} onChange={change} required />
              <Input label="Contraseña" name="password" type="password"
                placeholder="••••••••" value={form.password} onChange={change} required />
              <Button type="submit" fullWidth size="lg" disabled={authLoading}>
                {authLoading ? 'Cargando...' : 'Iniciar sesión'}
              </Button>
            </form>

            <p className="mt-6 text-center text-xs text-ink-muted">
              Al continuar aceptas nuestros términos y la política de privacidad.
            </p>
          </Card>
        )}
      </section>

      {/* ── DESTACADOS — solo si está logueado ── */}
      {isLoggedIn && (
        <section className="container-page py-12">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold text-white">Destinos destacados</h2>
              <p className="mt-2 text-ink-muted">Los favoritos de nuestros viajeros</p>
            </div>
            <Button to="/destinations" variant="ghost">
              Ver todos <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 animate-pulse rounded-2xl bg-surface-800" />
              ))}
            </div>
          ) : travels.length === 0 ? (
            <p className="text-ink-muted text-center py-8">No hay destinos destacados en este momento.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {travels.map(travel => (
                <DestinationCard key={travel.id} destination={travel} featured />
              ))}
            </div>
          )}
        </section>
      )}
    </>
  )
}

export default HomePage