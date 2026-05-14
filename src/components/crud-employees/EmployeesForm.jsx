import { useState, useEffect } from 'react'
import { employeesService } from '../../services/employeesService'

const EMPTY_FORM = {
  name:     '',
  surname:  '',
  gender:   'MALE',
  workHour: 40,
  hired:    true,
}

export default function Employees() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)
  const [showForm, setShowForm]   = useState(false)
  const [editing, setEditing]     = useState(null)
  const [form, setForm]           = useState(EMPTY_FORM)

  const load = async () => {
    try {
      setLoading(true)
      setEmployees(await employeesService.getAll())
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const openCreate = () => { setEditing(null); setForm(EMPTY_FORM); setShowForm(true) }

  const openEdit = (emp) => {
    setEditing(emp)
    setForm({
      name:     emp.name     ?? '',
      surname:  emp.surname  ?? '',
      gender:   emp.gender   ?? 'MALE',
      workHour: emp.workHour ?? 40,
      hired:    emp.hired    ?? true,
    })
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = { ...form, workHour: Number(form.workHour) }
      editing ? await employeesService.update(editing.id, payload) : await employeesService.create(payload)
      setShowForm(false)
      setError(null)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este empleado?')) return
    try {
      await employeesService.delete(id)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const change = (e) => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  if (loading) return <p className="p-8 text-center">Cargando empleados...</p>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold" style={{ color: '#1A3A5C' }}>Empleados</h1>
        <button onClick={openCreate}
          className="rounded-lg px-4 py-2 text-white font-medium"
          style={{ background: '#4A8FA8' }}>
          + Nuevo empleado
        </button>
      </div>

      {error && <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>}

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead style={{ background: '#DAEEF7' }}>
            <tr>
              {['Nombre', 'Apellido', 'Género', 'Horas/semana', 'Contratado', 'Acciones'].map(h => (
                <th key={h} className="px-4 py-3 text-left font-semibold" style={{ color: '#1A3A5C' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, i) => (
              <tr key={emp.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-3 font-medium">{emp.name}</td>
                <td className="px-4 py-3">{emp.surname}</td>
                <td className="px-4 py-3">{emp.gender}</td>
                <td className="px-4 py-3">{emp.workHour}h</td>
                <td className="px-4 py-3">{emp.hired ? '✅' : '❌'}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => openEdit(emp)}
                    className="rounded px-3 py-1 text-xs font-medium text-white"
                    style={{ background: '#7AAFC0' }}>Editar</button>
                  <button onClick={() => handleDelete(emp.id)}
                    className="rounded px-3 py-1 text-xs font-medium text-white bg-red-500">Eliminar</button>
                </td>
              </tr>
            ))}
            {employees.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">No hay empleados</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-lg font-bold" style={{ color: '#1A3A5C' }}>
              {editing ? 'Editar empleado' : 'Nuevo empleado'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-600">Nombre *</label>
                  <input name="name" value={form.name} onChange={change} required
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                    style={{ borderColor: '#7AAFC0' }} />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">Apellido *</label>
                  <input name="surname" value={form.surname} onChange={change} required
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                    style={{ borderColor: '#7AAFC0' }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-600">Género</label>
                  <select name="gender" value={form.gender} onChange={change}
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                    style={{ borderColor: '#7AAFC0' }}>
                    <option value="MALE">Hombre</option>
                    <option value="FEMALE">Mujer</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">Horas/semana</label>
                  <input name="workHour" type="number" min="1" max="60" value={form.workHour} onChange={change}
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                    style={{ borderColor: '#7AAFC0' }} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input name="hired" type="checkbox" checked={form.hired} onChange={change} className="h-4 w-4" />
                <label className="text-sm text-gray-600">Empleado contratado</label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit"
                  className="flex-1 rounded-lg py-2 text-sm font-medium text-white"
                  style={{ background: '#4A8FA8' }}>
                  {editing ? 'Guardar cambios' : 'Crear empleado'}
                </button>
                <button type="button" onClick={() => { setShowForm(false); setError(null) }}
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