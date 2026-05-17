import { useState, useEffect } from 'react'
import { BriefcaseBusiness, Eye, LogOut, Plane, ShieldCheck } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/atoms/Button'
import Card from '../components/atoms/Card'
import PageHeader from '../components/atoms/PageHeader'
import { authService } from '../services/authService'
import { bookingService } from '../services/BookingService'

const ROLE_DASHBOARDS = {
  ADMIN: {
    title: 'Jefe',
    role: 'ADMIN',
    Icon: ShieldCheck,
    description: 'Acceso completo a operaciones, usuarios, reservas y configuracion del panel.',
    actions: ['Supervisar reservas', 'Gestionar usuarios', 'Revisar operaciones'],
    personalArea: [
      'Estadisticas',
      'Ventas',
      'Incidencias',
    ],
  },
  EDITOR: {
    title: 'Agente de viajes',
    role: 'EDITOR',
    Icon: BriefcaseBusiness,
    description: 'Gestion de contenido operativo, seguimiento de viajes y apoyo comercial.',
    actions: ['Preparar viajes', 'Actualizar informacion', 'Dar seguimiento a clientes'],
    personalArea: [
      'Incidencias',
      'Vacaciones',
      'Nominas',
      'Certificados',
    ],
  },
  VIEWER: {
    title: 'Becario',
    role: 'VIEWER',
    Icon: Eye,
    description: 'Acceso de consulta para aprender el flujo de trabajo sin modificar datos.',
    actions: ['Consultar reservas', 'Revisar destinos', 'Aprender procesos'],
    personalArea: [
      'Incidencias',
      'Vacaciones',
      'Certificados',
      'Beneficios',
    ],
  },
}

const getUserRole = (user) => {
  const role = (user?.rol ?? user?.role ?? 'VIEWER').toUpperCase()
  return ROLE_DASHBOARDS[role] ? role : 'VIEWER'
}

const DEMO_USER = {
  id: 'demo-viewer',
  name: 'Usuario demo',
  surname: '',
  email: 'demo@nomada.local',
  rol: 'VIEWER',
}

const buildPersonalAreaPath = (label) =>
  `/personal/${label.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-')}`

const ProfilePage = () => {
  const navigate                  = useNavigate()
  const user                      = authService.getUser() ?? DEMO_USER
  const [previewRole, setPreviewRole] = useState(getUserRole(user))
  const userRole                  = previewRole
  const roleDashboard             = ROLE_DASHBOARDS[userRole]
  const RoleIcon                  = roleDashboard.Icon
  const [bookings, setBookings]   = useState([])
  const [loading, setLoading]     = useState(authService.isAuthenticated())
  const [error, setError]         = useState(null)

  useEffect(() => {
    if (!authService.isAuthenticated()) {
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
  }, [navigate, user?.id])

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

        <div className="space-y-6">
        <Card className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-500/20 text-brand-300">
                <RoleIcon className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  Dashboard por rol
                </p>
                <h2 className="mt-1 text-xl font-semibold text-white">
                  {roleDashboard.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-ink-muted">
                  {roleDashboard.description}
                </p>
              </div>
            </div>
            <span className="w-fit rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: '#DAEEF7', color: '#1A3A5C' }}>
              {roleDashboard.role}
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {Object.keys(ROLE_DASHBOARDS).map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setPreviewRole(role)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  userRole === role
                    ? 'border-brand-300 bg-brand-500 text-surface-950'
                    : 'border-surface-700 text-ink-soft hover:border-brand-400 hover:text-white'
                }`}
              >
                {ROLE_DASHBOARDS[role].title} · {role}
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {roleDashboard.actions.map((action) => (
              <div
                key={action}
                className="rounded-xl border border-surface-700 bg-surface-900/60 px-4 py-3 text-sm font-medium text-ink-soft"
              >
                {action}
              </div>
            ))}
          </div>

          {roleDashboard.personalArea ? (
            <div className="mt-6 border-t border-surface-700 pt-5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
                Area personal
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {roleDashboard.personalArea.map((item) => (
                  <Link
                    key={item}
                    to={buildPersonalAreaPath(item)}
                    className="rounded-xl border border-surface-700 bg-surface-900/60 px-4 py-3 text-left text-sm font-medium text-white transition-colors hover:border-brand-400 hover:bg-brand-500/10"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
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
    </div>
  )
}

export default ProfilePage
