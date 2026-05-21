import { useState } from 'react'
import { LogIn, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/atoms/Button'
import Card from '../components/atoms/Card'
import PageHeader from '../components/atoms/PageHeader'
import EntityTable from '../components/organisms/EntityTable'
import { authService } from '../services/authService'

const CRUD_OPTIONS = [
  { key: 'travels',        label: 'Viajes' },
  { key: 'hotels',         label: 'Hoteles' },
  { key: 'buses',          label: 'Autobuses' },
  { key: 'drivers',        label: 'Conductores' },
  { key: 'bookings',       label: 'Reservas' },
  { key: 'users',          label: 'Usuarios' },
  { key: 'employees',      label: 'Empleados' },
  { key: 'offers',         label: 'Ofertas' },
  { key: 'trip-segments',  label: 'Tramos' },
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

      <div className="lg:hidden">
        <div className="flex gap-2 overflow-x-auto pb-3" style={{ WebkitOverflowScrolling: 'touch' }}>
          {CRUD_OPTIONS.map(opt => (
            <button
              key={opt.key}
              onClick={() => setSelectedEntity(opt.key)}
              className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedEntity === opt.key
                  ? 'bg-brand-500/20 text-brand-300 ring-1 ring-brand-500/40'
                  : 'text-ink-soft hover:bg-surface-800'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[220px_1fr]">

        <div className="hidden lg:block lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
          <Card className="p-4">
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

        <Card className="p-4 sm:p-6">
            <EntityTable entityType={selectedEntity} />
          </Card>
      </div>
    </div>
  )
}

export default EntitiesPage
