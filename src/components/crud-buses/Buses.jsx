import { useState, useEffect } from 'react'
import { busService } from '../../services/BusService'

const EMPTY_FORM = {
  licensePlate: '',
  capacity: 0,
  available: true,
  bath: false,
  wifi: false,
  ac: false,
  usb: false,
  driverId: '',
}

export default function Buses() {
  const [buses, setBuses]       = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing]   = useState(null)
  const [form, setForm]         = useState(EMPTY_FORM)

  const load = async () => {
    try {
      setLoading(true)
      const data = await busService.getAll()
      setBuses(data)
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

  const openEdit = (bus) => {
    setEditing(bus)
    setForm({
      licensePlate: bus.licensePlate ?? '',
      capacity:     bus.capacity     ?? 0,
      available:    bus.available    ?? true,
      bath:         bus.bath         ?? false,
      wifi:         bus.wifi         ?? false,
      ac:           bus.ac           ?? false,
      usb:          bus.usb          ?? false,
      driverId:     bus.driverId     ?? '',
    })
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        ...form,
        capacity: Number(form.capacity),
        driverId: form.driverId ? Number(form.driverId) : null,
      }
      if (!payload.driverId) delete payload.driverId

      if (editing) {
        await busService.update(editing.id, payload)
      } else {
        await busService.create(payload)
      }
      setShowForm(false)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este autobús?')) return
    try {
      await busService.delete(id)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const change = (e) => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  if (loading) return <p className="p-8 text-center">Cargando autobuses...</p>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold" style={{ color: '#1A3A5C' }}>Autobuses</h1>
        <button onClick={openCreate}
          className="rounded-lg px-4 py-2 text-white font-medium"
          style={{ background: '#4A8FA8' }}>
          + Nuevo autobús
        </button>
      </div>

      {error && <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>}

      {/* Tabla */}
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead style={{ background: '#DAEEF7' }}>
            <tr>
              {['Matrícula', 'Capacidad', 'Disponible', 'Baño', 'Wifi', 'AC', 'USB', 'Acciones'].map(h => (
                <th key={h} className="px-4 py-3 text-left font-semibold" style={{ color: '#1A3A5C' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {buses.map((b, i) => (
              <tr key={b.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-3 font-medium">{b.licensePlate}</td>
                <td className="px-4 py-3">{b.capacity}</td>
                <td className="px-4 py-3">{b.available ? '✅' : '❌'}</td>
                <td className="px-4 py-3">{b.bath ? '✅' : '❌'}</td>
                <td className="px-4 py-3">{b.wifi ? '✅' : '❌'}</td>
                <td className="px-4 py-3">{b.ac   ? '✅' : '❌'}</td>
                <td className="px-4 py-3">{b.usb  ? '✅' : '❌'}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => openEdit(b)}
                    className="rounded px-3 py-1 text-xs font-medium text-white"
                    style={{ background: '#7AAFC0' }}>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(b.id)}
                    className="rounded px-3 py-1 text-xs font-medium text-white bg-red-500">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {buses.length === 0 && (
              <tr><td colSpan={8} className="px-4 py-8 text-center text-gray-400">No hay autobuses</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-lg font-bold" style={{ color: '#1A3A5C' }}>
              {editing ? 'Editar autobús' : 'Nuevo autobús'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-600">Matrícula *</label>
                  <input name="licensePlate" value={form.licensePlate} onChange={change} required
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                    style={{ borderColor: '#7AAFC0' }} />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">Capacidad *</label>
                  <input name="capacity" type="number" min="1" value={form.capacity} onChange={change} required
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                    style={{ borderColor: '#7AAFC0' }} />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600">ID Conductor</label>
                <input name="driverId" type="number" value={form.driverId} onChange={change}
                  placeholder="Dejar vacío si no asignado"
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                  style={{ borderColor: '#7AAFC0' }} />
              </div>

              <div className="rounded-lg p-3 space-y-2" style={{ background: '#DAEEF7' }}>
                <p className="text-xs font-semibold" style={{ color: '#1A3A5C' }}>Equipamiento</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: 'bath', label: 'Baño' },
                    { name: 'wifi', label: 'Wifi' },
                    { name: 'ac',   label: 'Aire acondicionado' },
                    { name: 'usb',  label: 'USB' },
                  ].map(({ name, label }) => (
                    <label key={name} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="checkbox" name={name} checked={form[name]} onChange={change} className="h-4 w-4 rounded" />
                      {label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input name="available" type="checkbox" checked={form.available} onChange={change} className="h-4 w-4" />
                <label className="text-sm text-gray-600">Disponible</label>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit"
                  className="flex-1 rounded-lg py-2 text-sm font-medium text-white"
                  style={{ background: '#4A8FA8' }}>
                  {editing ? 'Guardar cambios' : 'Crear autobús'}
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