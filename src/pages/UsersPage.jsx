import { useState, useEffect, useMemo } from 'react'
import { Plus, Search, UserPlus, Loader2, AlertCircle } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import PageHeader from '../components/ui/PageHeader'
import { UserService } from '../services/UserService'

const UsersPage = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const loadUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await UserService.fetchUsers()
      setUsers(data)
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error al cargar usuarios')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return users
    const term = searchTerm.toLowerCase()
    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(term) ||
        u.email?.toLowerCase().includes(term) ||
        u.dni?.toLowerCase().includes(term)
    )
  }, [users, searchTerm])

  const handleDelete = async (id, name) => {
    if (!window.confirm(`¿Eliminar usuario "${name}"?`)) return
    try {
      await UserService.deleteUser(id)
      loadUsers()
    } catch (err) {
      alert(err.response?.data?.message || 'Error al eliminar usuario')
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Personas"
        title="Usuarios"
        description="Gestiona clientes y miembros del equipo."
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
            <Search className="h-4 w-4 text-ink-muted shrink-0" aria-hidden="true" />
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar usuarios por nombre, correo o DNI"
              className="h-10 w-full bg-transparent text-sm text-ink placeholder:text-ink-muted focus:outline-none"
              aria-label="Buscar usuarios"
            />
          </label>
          <Button variant="secondary" onClick={loadUsers}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Refrescar
          </Button>
        </div>

        {loading ? (
          <div className="mt-10 flex flex-col items-center gap-3 text-ink-muted">
            <Loader2 className="h-6 w-6 animate-spin" />
            <p className="text-sm">Cargando usuarios...</p>
          </div>
        ) : error ? (
          <div className="mt-10 flex flex-col items-center gap-3 text-red-400">
            <AlertCircle className="h-6 w-6" />
            <p className="text-sm">{error}</p>
            <Button variant="secondary" size="sm" onClick={loadUsers}>
              Reintentar
            </Button>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="mt-10 text-center text-sm text-ink-muted">
            {searchTerm ? 'No se encontraron usuarios con ese criterio.' : 'No hay usuarios registrados.'}
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-ink-muted">
                <tr>
                  <th scope="col" className="py-3">Usuario</th>
                  <th scope="col" className="py-3">DNI</th>
                  <th scope="col" className="py-3">Correo</th>
                  <th scope="col" className="py-3">Teléfono</th>
                  <th scope="col" className="py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-t border-surface-700 text-ink-soft">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-500/15 text-sm font-semibold text-brand-300">
                          {user.name
                            ?.split(' ')
                            .map((part) => part[0])
                            .slice(0, 2)
                            .join('') || '?'}
                        </span>
                        <div>
                          <p className="font-medium text-white">{user.name}</p>
                          <p className="text-xs text-ink-muted">#{user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">{user.dni || '—'}</td>
                    <td className="py-4">{user.email || '—'}</td>
                    <td className="py-4">{user.phone || '—'}</td>
                    <td className="py-4 text-right">
                      <div className="inline-flex gap-2">
                        <Button variant="ghost" size="sm">Editar</Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(user.id, user.name)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  )
}

export default UsersPage
