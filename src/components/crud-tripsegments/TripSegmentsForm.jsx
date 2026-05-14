import { useState, useEffect } from 'react'
import { tripSegmentsService } from '../../services/tripSegmentsService'

const EMPTY_FORM = {
  origin:      '',
  destination: '',
  startTime:   '',
  endTime:     '',
  busId:       '',
  driverId:    '',
  travelId:    '',
}

const hasDriverConflict = (segments, form, editingId) => {
  if (!form.driverId || !form.startTime || !form.endTime) return false
  const newStart = new Date(form.startTime)
  const newEnd   = new Date(form.endTime)
  return segments.some(s => {
    if (s.id === editingId) return false
    if (Number(s.driverId) !== Number(form.driverId)) return false
    const sStart = new Date(s.startTime)
    const sEnd   = new Date(s.endTime)
    return newStart < sEnd && newEnd > sStart
  })
}

export default function TripSegments() {
  const [segments, setSegments] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing]   = useState(null)
  const [form, setForm]         = useState(EMPTY_FORM)

  const load = async () => {
    try {
      setLoading(true)
      setSegments(await tripSegmentsService.getAll())
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const openCreate = () => { setEditing(null); setForm(EMPTY_FORM); setShowForm(true) }

  const openEdit = (s) => {
    setEditing(s)
    setForm({
      origin:      s.origin      ?? '',
      destination: s.destination ?? '',
      startTime:   s.startTime   ?? '',
      endTime:     s.endTime     ?? '',
      busId:       s.busId       ?? '',
      driverId:    s.driverId    ?? '',
      travelId:    s.travelId    ?? '',
    })
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.endTime && form.startTime && form.endTime <= form.startTime) {
      setError('La hora de llegada debe ser posterior a la de salida')
      return
    }
    if (hasDriverConflict(segments, form, editing?.id)) {
      setError('Este conductor ya tiene asignado otro tramo en ese horario')
      return
    }
    try {
      const payload = {
        ...form,
        busId:    Number(form.busId),
        driverId: Number(form.driverId),
        travelId: Number(form.travelId),
      }
      editing ? await tripSegmentsService.update(editing.id, payload) : await tripSegmentsService.create(payload)
      setShowForm(false)
      setError(null)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este tramo?')) return
    try {
      await tripSegmentsService.delete(id)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const change = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  if (loading) return <p className="p-8 text-center">Cargando tramos...</p>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold" style={{ color: '#1A3A5C' }}>Tramos de viaje</h1>
        <button onClick={openCreate}
          className="rounded-lg px-4 py-2 text-white font-medium"
          style={{ background: '#4A8FA8' }}>
          + Nuevo tramo
        </button>
      </div>

      {error && <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>}

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead style={{ background: '#DAEEF7' }}>
            <tr>
              {['Origen', 'Destino', 'Salida', 'Llegada', 'Bus', 'Conductor', 'Viaje', 'Acciones'].map(h => (
                <th key={h} className="px-4 py-3 text-left font-semibold" style={{ color: '#1A3A5C' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {segments.map((s, i) => (
              <tr key={s.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-3 font-medium">{s.origin}</td>
                <td className="px-4 py-3">{s.destination}</td>
                <td className="px-4 py-3">{s.startTime}</td>
                <td className="px-4 py-3">{s.endTime}</td>
                <td className="px-4 py-3">{s.busId}</td>
                <td className="px-4 py-3">{s.driverId}</td>
                <td className="px-4 py-3">{s.travelId}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => openEdit(s)}
                    className="rounded px-3 py-1 text-xs font-medium text-white"
                    style={{ background: '#7AAFC0' }}>Editar</button>
                  <button onClick={() => handleDelete(s.id)}
                    className="rounded px-3 py-1 text-xs font-medium text-white bg-red-500">Eliminar</button>
                </td>
              </tr>
            ))}
            {segments.length === 0 && (
              <tr><td colSpan={8} className="px-4 py-8 text-center text-gray-400">No hay tramos</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="mb-4 text-lg font-bold" style={{ color: '#1A3A5C' }}>
              {editing ? 'Editar tramo' : 'Nuevo tramo'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-600">Origen *</label>
                  <input name="origin" value={form.origin} onChange={change} required
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                    style={{ borderColor: '#7AAFC0' }} />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">Destino *</label>
                  <input name="destination" value={form.destination} onChange={change} required
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                    style={{ borderColor: '#7AAFC0' }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-600">Salida *</label>
                  <input name="startTime" type="datetime-local" value={form.startTime} onChange={change} required
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                    style={{ borderColor: '#7AAFC0' }} />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">Llegada *</label>
                  <input name="endTime" type="datetime-local" value={form.endTime} onChange={change} required
                    min={form.startTime || undefined}
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                    style={{ borderColor: '#7AAFC0' }} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-600">ID Bus *</label>
                  <input name="busId" type="number" min="1" value={form.busId} onChange={change} required
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                    style={{ borderColor: '#7AAFC0' }} />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">ID Conductor *</label>
                  <input name="driverId" type="number" min="1" value={form.driverId} onChange={change} required
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                    style={{ borderColor: '#7AAFC0' }} />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">ID Viaje *</label>
                  <input name="travelId" type="number" min="1" value={form.travelId} onChange={change} required
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                    style={{ borderColor: '#7AAFC0' }} />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit"
                  className="flex-1 rounded-lg py-2 text-sm font-medium text-white"
                  style={{ background: '#4A8FA8' }}>
                  {editing ? 'Guardar cambios' : 'Crear tramo'}
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