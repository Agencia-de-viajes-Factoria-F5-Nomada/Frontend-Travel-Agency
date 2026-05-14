import { useState, useEffect } from 'react'
import { LogOut, Plane } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import PageHeader from '../components/ui/PageHeader'
import { authService } from '../services/authService'
import { bookingService } from '../services/BookingService'

const ProfilePage = () => {
  const navigate                  = useNavigate()
  const user                      = authService.getUser()
  const [bookings, setBookings]   = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/auth')
      return
    }
    bookingService.getAll()
      .then(data => {
        // Filtrar solo las reservas del usuario actual
        const mine = Array.isArray(data)
          ? data.filter(b => b.userId === user?.id)
          : []
        setBookings(mine)
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const handleLogout = () => {
    authService.logout()
    navigate('/')
  }

  const statusLabel = (status) => {
    const map = {
      PENDING:   { label: 'Pendiente',  bg: '#FAEEDA', color: '#854F0B' },
      CONFIRMED: { label: 'Confirmada', bg: '#EAF3DE', color: '#3B6D11' },
      CANCELLED: { label: 'Cancelada',  bg: '#FCEBEB', color: '#A32D2D' },
    }
    return map[status] ?? { label: status, bg: '#DAEEF7', color: '#1A3A5C' }
  }

  return (
    <div className="container-page py-12">
      <PageHeader
        eyebrow="Mi cuenta"
        title={`Bienvenido/a, ${user?.name ?? 'Viajero'}`}
        description="Gestiona tus reservas y datos personales."
        actions={
          <div className="flex gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/destinations')}>
              <Plane className="h-4 w-4" aria-hidden="true" />
              Buscar viajes
            </Button>
            <Button variant="secondary" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Cerrar sesión
            </Button>
          </div>
        }
      />

      {/* Datos del usuario */}
      <div className="mt-8 grid gap-6 lg:grid-cols-[300px_1fr]">
        <Card className="h-fit p-6 space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
            Mis datos
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-ink-muted">Nombre</span>
              <span className="text-white">{user?.name} {user?.surname}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-muted">Email</span>
              <span className="text-white">{user?.email}</span>
            </div>
            {user?.passport && (
              <div className="flex justify-between">
                <span className="text-ink-muted">Pasaporte</span>
                <span className="text-white">{user.passport}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-ink-muted">Rol</span>
              <span className="rounded-full px-2 py-0.5 text-xs font-medium"
                style={{ background: '#DAEEF7', color: '#1A3A5C' }}>
                {user?.rol ?? 'USER'}
              </span>
            </div>
          </div>
          {authService.isAdmin() && (
            <Button fullWidth size="sm" onClick={() => navigate('/admin')}
              className="mt-2">
              Ir al panel admin
            </Button>
          )}
        </Card>

        {/* Reservas */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-white">Mis reservas</h2>

          {error && (
            <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
          )}

          {loading ? (
            <div className="mt-6 space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 animate-pulse rounded-xl bg-surface-800" />
              ))}
            </div>
          ) : bookings.length === 0 ? (
            <div className="mt-8 text-center">
              <Plane className="mx-auto h-10 w-10 text-brand-400" />
              <p className="mt-3 font-semibold text-white">No tienes reservas aún</p>
              <p className="text-sm text-ink-muted">Encuentra tu próximo viaje y resérvalo</p>
              <Button className="mt-4" onClick={() => navigate('/destinations')}>
                Buscar viajes
              </Button>
            </div>
          ) : (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead className="text-xs uppercase tracking-wide text-ink-muted">
                  <tr>
                    <th className="py-3">Nº reserva</th>
                    <th className="py-3">Destino</th>
                    <th className="py-3">Fechas</th>
                    <th className="py-3">Pasajeros</th>
                    <th className="py-3">Total</th>
                    <th className="py-3">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(b => {
                    const st = statusLabel(b.status)
                    return (
                      <tr key={b.id} className="border-t border-surface-700 text-ink-soft">
                        <td className="py-4 font-medium text-white">#{b.id}</td>
                        <td className="py-4">{b.travelDestiny ?? b.destiny ?? '—'}</td>
                        <td className="py-4">{b.startDate ?? '—'}</td>
                        <td className="py-4">{b.passengers?.length ?? '—'}</td>
                        <td className="py-4 font-medium text-white">{b.total ?? '—'}€</td>
                        <td className="py-4">
                          <span className="rounded-full px-2 py-1 text-xs font-medium"
                            style={{ background: st.bg, color: st.color }}>
                            {st.label}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

export default ProfilePage