import { useState, useEffect } from 'react'
import { DriverService as driverService } from '../../services/DriverService'

const EMPTY_FORM = {
  name: '',
  surname: '',
  enrollment: '',
  licenceActive: true,
  imageUrl: '',
}

export default function Drivers() {
  const [drivers, setDrivers]   = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing]   = useState(null)
  const [form, setForm]         = useState(EMPTY_FORM)

  const load = async () => {
    try {
      setLoading(true)
      const data = await driverService.getAll()
      setDrivers(data)
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

  const openEdit = (driver) => {
    setEditing(driver)
    setForm({
      name:          driver.name          ?? '',
      surname:       driver.surname       ?? '',
      enrollment:    driver.enrollment    ?? '',
      licenceActive: driver.licenceActive ?? true,
      imageUrl:      driver.imageUrl      ?? '',
    })
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editing) {
        await driverService.update(editing.id, form)
      } else {
        await driverService.create(form)
      }
      setShowForm(false)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este conductor?')) return
    try {
      await driverService.delete(id)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const change = (e) => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  if (loading) return <p className="p-8 text-center">Cargando conductores...</p>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold" style={{ color: '#1A3A5C' }}>Conductores</h1>
        <button onClick={openCreate}
          className="rounded-lg px-4 py-2 text-white font-medium"
          style={{ background: '#4A8FA8' }}>
          + Nuevo conductor
        </button>
      </div>

      {error && <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>}

      {/* Tabla */}
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead style={{ background: '#DAEEF7' }}>
            <tr>
              {['Nombre', 'Apellido', 'Matriculación', 'Licencia activa', 'Acciones'].map(h => (
                <th key={h} className="px-4 py-3 text-left font-semibold" style={{ color: '#1A3A5C' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {drivers.map((d, i) => (
              <tr key={d.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-3 font-medium">{d.name}</td>
                <td className="px-4 py-3">{d.surname}</td>
                <td className="px-4 py-3">{d.enrollment}</td>
                <td className="px-4 py-3">{d.licenceActive ? '✅' : '❌'}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => openEdit(d)}
                    className="rounded px-3 py-1 text-xs font-medium text-white"
                    style={{ background: '#7AAFC0' }}>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(d.id)}
                    className="rounded px-3 py-1 text-xs font-medium text-white bg-red-500">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {drivers.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">No hay conductores</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-lg font-bold" style={{ color: '#1A3A5C' }}>
              {editing ? 'Editar conductor' : 'Nuevo conductor'}
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

              <div>
                <label className="text-xs font-medium text-gray-600">Número de matriculación *</label>
                <input name="enrollment" value={form.enrollment} onChange={change} required
                  placeholder="Ej: DRV-2024-001"
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                  style={{ borderColor: '#7AAFC0' }} />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600">URL imagen (opcional)</label>
                <input name="imageUrl" value={form.imageUrl} onChange={change}
                  placeholder="https://..."
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                  style={{ borderColor: '#7AAFC0' }} />
              </div>

              <div className="flex items-center gap-2">
                <input name="licenceActive" type="checkbox" checked={form.licenceActive} onChange={change} className="h-4 w-4" />
                <label className="text-sm text-gray-600">Licencia activa</label>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit"
                  className="flex-1 rounded-lg py-2 text-sm font-medium text-white"
                  style={{ background: '#4A8FA8' }}>
                  {editing ? 'Guardar cambios' : 'Crear conductor'}
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