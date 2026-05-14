import { useState, useEffect } from 'react'
import { UserService } from '../../services/UserService'

const FORM_INICIAL = { name: '', surname: '', email: '', dni: '', phone: '' }

const Users = () => {
  const [users, setUsers] = useState([])
  const [formData, setFormData] = useState(FORM_INICIAL)
  const [isEditing, setIsEditing] = useState(false)
  const [currentId, setCurrentId] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => { cargarUsers() }, [])

  const cargarUsers = async () => {
    try {
      const data = await UserService.fetchUsers()
      setUsers(data)
      setError(null)
    } catch {
      setError('No se pudieron cargar los usuarios.')
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isEditing) {
        await UserService.updateUser(currentId, formData)
      } else {
        await UserService.createUser(formData)
      }
      resetForm()
      cargarUsers()
    } catch {
      setError('Error al guardar el usuario.')
    }
  }

  const handleEditar = (user) => {
    setFormData({ name: user.name ?? '', surname: user.surname ?? '', email: user.email ?? '', dni: user.dni ?? '', phone: user.phone ?? '' })
    setCurrentId(user.id)
    setIsEditing(true)
  }

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Eliminar usuario?')) return
    try {
      await UserService.deleteUser(id)
      cargarUsers()
    } catch {
      setError('Error al eliminar el usuario.')
    }
  }

  const resetForm = () => {
    setFormData(FORM_INICIAL)
    setIsEditing(false)
    setCurrentId(null)
  }

  return (
    <div className="p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">Gestión de Usuarios</h2>
      {error && (
        <p className="mb-4 rounded-lg border border-status-pending/30 bg-status-pending/10 px-4 py-3 text-sm text-status-pending">{error}</p>
      )}
      <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-2 gap-4 rounded-xl border border-surface-700 bg-surface-800 p-5">
        <input name="name" placeholder="Nombre" value={formData.name} onChange={handleChange}
          className="rounded-lg border border-surface-600 bg-surface-900 px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-brand-500 focus:outline-none" required />
        <input name="surname" placeholder="Apellido" value={formData.surname} onChange={handleChange}
          className="rounded-lg border border-surface-600 bg-surface-900 px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-brand-500 focus:outline-none" required />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange}
          className="col-span-2 rounded-lg border border-surface-600 bg-surface-900 px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-brand-500 focus:outline-none" required />
        <input name="dni" placeholder="DNI" value={formData.dni} onChange={handleChange}
          className="rounded-lg border border-surface-600 bg-surface-900 px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-brand-500 focus:outline-none" />
        <input name="phone" placeholder="Teléfono" value={formData.phone} onChange={handleChange}
          className="rounded-lg border border-surface-600 bg-surface-900 px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-brand-500 focus:outline-none" />
        <button type="submit" className="col-span-2 rounded-full bg-brand-500 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-400">
          {isEditing ? 'Actualizar usuario' : 'Registrar usuario'}
        </button>
        {isEditing && (
          <button type="button" onClick={resetForm} className="col-span-2 text-sm text-ink-muted hover:text-white">Cancelar edición</button>
        )}
      </form>
      <div className="overflow-hidden rounded-xl border border-surface-700">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-400 text-white">
            <tr>
              <th className="px-5 py-3 font-semibold">Nombre</th>
              <th className="px-5 py-3 font-semibold">Email</th>
              <th className="px-5 py-3 font-semibold">DNI</th>
              <th className="px-5 py-3 text-center font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-surface-700 text-ink-soft hover:bg-surface-800">
                <td className="px-5 py-3 font-medium text-white">{user.name} {user.surname}</td>
                <td className="px-5 py-3">{user.email}</td>
                <td className="px-5 py-3">{user.dni ?? '—'}</td>
                <td className="px-5 py-3 text-center">
                  <button onClick={() => handleEditar(user)} className="mr-4 text-brand-300 hover:text-brand-200">Editar</button>
                  <button onClick={() => handleEliminar(user.id)} className="text-status-pending hover:text-red-400">Eliminar</button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr><td colSpan={4} className="px-5 py-8 text-center text-ink-muted">No hay usuarios registrados.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users
