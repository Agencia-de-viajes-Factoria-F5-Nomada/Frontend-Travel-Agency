import { useState } from 'react'
import { BriefcaseBusiness, Eye, LogIn, LogOut, Plane, ShieldCheck } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/atoms/Button'
import Card from '../components/atoms/Card'
import PageHeader from '../components/atoms/PageHeader'
import { authService } from '../services/authService'

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

const buildPersonalAreaPath = (label) =>
  `/personal/${label.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-')}`

const ProfilePage = () => {
  const navigate = useNavigate()
  const user = authService.getUser()
  const isAuthenticated = authService.isAuthenticated()
  const [previewRole, setPreviewRole] = useState('VIEWER')
  const roleDashboard = ROLE_DASHBOARDS[previewRole]
  const RoleIcon = roleDashboard.Icon

  const handleLogout = () => {
    authService.logout()
    navigate('/')
  }

  return (
    <div className="container-page py-12">
      <PageHeader
        eyebrow="Mi cuenta"
        title={`Bienvenido/a, ${isAuthenticated ? user?.name : 'Viajero'}`}
        description={isAuthenticated ? 'Gestiona tus reservas y datos personales.' : 'Inicia sesion para acceder a tu panel personalizado.'}
        actions={
          isAuthenticated ? (
            <div className="flex gap-3">
              <Button variant="ghost" size="sm" onClick={() => navigate('/destinations')}>
                <Plane className="h-4 w-4" aria-hidden="true" />
                Buscar viajes
              </Button>
              <Button variant="secondary" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Cerrar sesion
              </Button>
            </div>
          ) : null
        }
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[300px_1fr]">

        {/* ── TARJETA 1: Autenticacion ── */}
        <Card className="h-fit p-6 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
            Autenticacion
          </h2>

          {isAuthenticated ? (
            <>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-ink-muted">Nombre</span>
                  <span className="text-white">{user?.name} {user?.surname}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Email</span>
                  <span className="text-white">{user?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Rol</span>
                  <span className="rounded-full bg-accent-light px-2 py-0.5 text-xs font-medium text-accent-dark">
                    {user?.rol ?? user?.role ?? 'USER'}
                  </span>
                </div>
              </div>
              {authService.isAdmin() && (
                <Button fullWidth size="sm" onClick={() => navigate('/admin')}>
                  Ir al panel admin
                </Button>
              )}
              <Button fullWidth variant="secondary" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Cerrar sesion
              </Button>
            </>
          ) : (
            <>
              <div className="rounded-xl bg-surface-800 p-4 text-center">
                <LogIn className="mx-auto h-8 w-8 text-brand-300" />
                <p className="mt-2 text-sm font-semibold text-white">No has iniciado sesion</p>
                <p className="mt-1 text-xs text-ink-muted">Inicia sesion para acceder a tu panel y gestionar tus reservas</p>
              </div>
              <Button fullWidth onClick={() => navigate('/auth')}>
                <LogIn className="h-4 w-4" aria-hidden="true" />
                Iniciar sesion
              </Button>
            </>
          )}
        </Card>

        {/* ── TARJETA 2: Vista previa de rol ── */}
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-500/20 text-brand-300">
                  <RoleIcon className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                    Vista previa de rol
                  </p>
                  <h2 className="mt-1 text-xl font-semibold text-white">
                    {roleDashboard.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-ink-muted">
                    {roleDashboard.description}
                  </p>
                </div>
              </div>
              <span className="w-fit rounded-full bg-accent-light px-3 py-1 text-xs font-semibold text-accent-dark">
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
                    previewRole === role
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
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
