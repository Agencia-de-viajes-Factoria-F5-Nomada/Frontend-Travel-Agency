import { useState } from 'react'
import { LogIn, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/atoms/Button'
import Card from '../components/atoms/Card'
import PageHeader from '../components/atoms/PageHeader'
import EntityTable from '../components/organisms/EntityTable'
import { authService } from '../services/authService'

const CRUD_OPTIONS = [
  { key: 'travels',    label: 'Viajes' },
  { key: 'hotels',     label: 'Hoteles' },
  { key: 'buses',      label: 'Autobuses' },
  { key: 'drivers',    label: 'Conductores' },
  { key: 'bookings',   label: 'Reservas' },
]

const EntitiesPage = () => {
  const navigate = useNavigate()
  const user = authService.getUser()
  const isAuthenticated = authService.isAuthenticated()
  const [selectedEntity, setSelectedEntity] = useState('travels')

  const handleLogout = () => {
    authService.logout()
    navigate('/')
  }

  return (
    <div className="container-page py-12">
      <PageHeader
        eyebrow="Panel de gestión"
        title={isAuthenticated ? `Hola, ${user?.name}` : 'Panel de gestión'}
        description={isAuthenticated ? 'Consulta los datos de la plataforma.' : 'Inicia sesión para acceder.'}
        actions={
          isAuthenticated ? (
            <Button variant="secondary" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </Button>
          ) : null
        }
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[220px_1fr]">

        {/* TARJETA 1: Auth + Menú CRUD */}
        <div className="space-y-4">
          <Card className="p-4">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-ink-muted mb-3">
              Autenticación
            </h2>
            {isAuthenticated ? (
              <div className="space-y-2 text-sm">
                <p className="text-white font-medium">{user?.name}</p>
                <p className="text-ink-muted text-xs">{user?.email}</p>
                <Button fullWidth size="sm" variant="secondary" onClick={handleLogout}>
                  <LogOut className="h-3.5 w-3.5" />
                  Cerrar sesión
                </Button>
              </div>
            ) : (
              <Button fullWidth onClick={() => navigate('/auth')}>
                <LogIn className="h-4 w-4" />
                Iniciar sesión
              </Button>
            )}
          </Card>

          <Card className="p-4">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-ink-muted mb-3">
              Entidad
            </h2>
            <div className="space-y-1">
              {CRUD_OPTIONS.map(opt => (
                <button
                  key={opt.key}
                  onClick={() => setSelectedEntity(opt.key)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedEntity === opt.key
                      ? 'bg-brand-500/20 text-brand-300'
                      : 'text-ink-soft hover:bg-surface-800'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* TARJETA 2: Tabla CRUD */}
        <Card className="p-6">
          <EntityTable entityType={selectedEntity} />
        </Card>
      </div>
    </div>
  )
}

export default EntitiesPage
