import { useState, useEffect } from 'react'
import { userService } from '../../services/UserService'

const EMPTY_FORM = {
  name: '',
  surname: '',
  email: '',
  password: '',
  passport: '',
  birthDate: '',
  tutorId: '',
  rol: 'USER',
  active: true,
}

export default function Users() {
  const [users, setUsers]       = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing]   = useState(null)
  const [form, setForm]         = useState(EMPTY_FORM)

  const load = async () => {
    try {
      setLoading(true)
      const data = await userService.getAll()
      setUsers(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const openCreate = () => {
    setEditing(null)
    setForm(EMPTY_FORM)
    setShowForm(true)
  }

  const openEdit = (user) => {
    setEditing(user)
    setForm({
      name:      user.name      ?? '',
      surname:   user.surname   ?? '',
      email:     user.email     ?? '',
      password:  '',
      passport:  user.passport  ?? '',
      birthDate: user.birthDate ?? '',
      tutorId:   user.tutorId   ?? '',
      rol:       user.rol       ?? 'USER',
      active:    user.active    ?? true,
    })
    setShowForm(true)
  }

  const validate = () => {
    if (form.passport && !/^[A-Z0-9]{5,20}$/i.test(form.passport))
      return 'El pasaporte debe tener entre 5 y 20 caracteres alfanuméricos'
    if (form.birthDate) {
      const date = new Date(form.birthDate)
      const now  = new Date()
      const min  = new Date(now.getFullYear() - 120, now.getMonth(), now.getDate())
      if (date > now)  return 'La fecha de nacimiento no puede ser futura'
      if (date < min)  return 'Fecha de nacimiento no válida (más de 120 años)'
    }
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationError = validate()
    if (validationError) { setError(validationError); return }
    try {
      const payload = { ...form }
      if (!payload.password) delete payload.password
      if (!payload.tutorId)  delete payload.tutorId

      if (editing) {
        await userService.update(editing.id, payload)
      } else {
        await userService.create(payload)
      }
      setShowForm(false)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este usuario?')) return
    try {
      await userService.delete(id)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const change = (e) => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  if (loading) return <p className="p-8 text-center">Cargando usuarios...</p>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold" style={{ color: '#1A3A5C' }}>Usuarios</h1>
        <button
          onClick={openCreate}
          className="rounded-lg px-4 py-2 text-white font-medium"
          style={{ background: '#4A8FA8' }}
        >
          + Nuevo usuario
        </button>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>
      )}

      {/* Tabla */}
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead style={{ background: '#DAEEF7' }}>
            <tr>
              {['Nombre', 'Apellido', 'Email', 'Rol', 'Activo', 'Acciones'].map(h => (
                <th key={h} className="px-4 py-3 text-left font-semibold" style={{ color: '#1A3A5C' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-3">{u.name}</td>
                <td className="px-4 py-3">{u.surname}</td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full px-2 py-1 text-xs font-medium"
                    style={{ background: u.rol === 'ADMIN' ? '#1A3A5C' : '#DAEEF7', color: u.rol === 'ADMIN' ? 'white' : '#1A3A5C' }}>
                    {u.rol}
                  </span>
                </td>
                <td className="px-4 py-3">{u.active ? '✅' : '❌'}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => openEdit(u)}
                    className="rounded px-3 py-1 text-xs font-medium text-white"
                    style={{ background: '#7AAFC0' }}>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(u.id)}
                    className="rounded px-3 py-1 text-xs font-medium text-white bg-red-500">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">No hay usuarios</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal formulario */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-lg font-bold" style={{ color: '#1A3A5C' }}>
              {editing ? 'Editar usuario' : 'Nuevo usuario'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-600">Nombre *</label>
                  <input name="name" value={form.name} onChange={change} required
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2"
                    style={{ borderColor: '#7AAFC0' }} />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">Apellido *</label>
                  <input name="surname" value={form.surname} onChange={change} required
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2"
                    style={{ borderColor: '#7AAFC0' }} />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600">Email *</label>
                <input name="email" type="email" value={form.email} onChange={change} required
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2"
                  style={{ borderColor: '#7AAFC0' }} />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600">
                  {editing ? 'Contraseña (dejar vacío para no cambiar)' : 'Contraseña *'}
                </label>
                <input name="password" type="password" value={form.password} onChange={change}
                  required={!editing}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2"
                  style={{ borderColor: '#7AAFC0' }} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-600">Pasaporte</label>
                  <input name="passport" value={form.passport} onChange={change}
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2"
                    style={{ borderColor: '#7AAFC0' }} />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">Fecha nacimiento</label>
                  <input name="birthDate" type="date" value={form.birthDate} onChange={change}
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2"
                    style={{ borderColor: '#7AAFC0' }} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-600">Rol</label>
                  <select name="rol" value={form.rol} onChange={change}
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2"
                    style={{ borderColor: '#7AAFC0' }}>
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">ID Tutor (menores)</label>
                  <input name="tutorId" type="number" value={form.tutorId} onChange={change}
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2"
                    style={{ borderColor: '#7AAFC0' }} />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input name="active" type="checkbox" checked={form.active} onChange={change}
                  className="h-4 w-4 rounded" />
                <label className="text-sm text-gray-600">Usuario activo</label>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit"
                  className="flex-1 rounded-lg py-2 text-sm font-medium text-white"
                  style={{ background: '#4A8FA8' }}>
                  {editing ? 'Guardar cambios' : 'Crear usuario'}
                </button>
                <button type="button" onClick={() => setShowForm(false)}
                  className="flex-1 rounded-lg border py-2 text-sm font-medium"
                  style={{ borderColor: '#7AAFC0', color: '#1A3A5C' }}>
                  Cancelar
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  )
}