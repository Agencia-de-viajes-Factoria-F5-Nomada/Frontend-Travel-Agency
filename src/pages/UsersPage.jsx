import { Plus, Search, UserPlus } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import PageHeader from '../components/ui/PageHeader'
import StatusPill from '../components/common/StatusPill'
import Badge from '../components/ui/Badge'
import { USERS } from '../constants/mockData'

const UsersPage = () => (
  <>
    <PageHeader
      eyebrow="Personas"
      title="Usuarios"
      description="Gestiona clientes y miembros del equipo con sus roles."
      actions={
        <Button>
          <UserPlus className="h-4 w-4" aria-hidden="true" />
          Invitar usuario
        </Button>
      }
    />

    <Card className="mt-8 p-4 md:p-6">
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex flex-1 items-center gap-2 rounded-full border border-surface-600 bg-surface-900 px-4">
          <Search className="h-4 w-4 text-ink-muted" aria-hidden="true" />
          <input
            type="search"
            placeholder="Buscar usuarios por nombre o correo"
            className="h-10 w-full bg-transparent text-sm text-ink placeholder:text-ink-muted focus:outline-none"
            aria-label="Buscar usuarios"
          />
        </label>
        <Button variant="secondary">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Nuevo rol
        </Button>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-ink-muted">
            <tr>
              <th scope="col" className="py-3">Usuario</th>
              <th scope="col" className="py-3">Correo</th>
              <th scope="col" className="py-3">Rol</th>
              <th scope="col" className="py-3">Estado</th>
              <th scope="col" className="py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {USERS.map((user) => (
              <tr key={user.id} className="border-t border-surface-700 text-ink-soft">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-500/15 text-sm font-semibold text-brand-300">
                      {user.name
                        .split(' ')
                        .map((part) => part[0])
                        .slice(0, 2)
                        .join('')}
                    </span>
                    <div>
                      <p className="font-medium text-white">{user.name}</p>
                      <p className="text-xs text-ink-muted">{user.id}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4">{user.email}</td>
                <td className="py-4">
                  <Badge tone={user.role === 'Admin' ? 'brand' : 'neutral'}>
                    {user.role}
                  </Badge>
                </td>
                <td className="py-4">
                  <StatusPill status={user.status} />
                </td>
                <td className="py-4 text-right">
                  <div className="inline-flex gap-2">
                    <Button variant="ghost" size="sm">Editar</Button>
                    <Button variant="danger" size="sm">Eliminar</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </>
)

export default UsersPage
