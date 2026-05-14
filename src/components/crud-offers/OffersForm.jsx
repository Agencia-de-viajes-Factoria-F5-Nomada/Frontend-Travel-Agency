import { useState, useEffect } from 'react'
import { offersService } from '../../services/offersService'

const EMPTY_FORM = {
  discountPercentage: 0,
  startDate: '',
  endDate: '',
  travelId: '',
}

export default function Offers() {
  const [offers, setOffers]     = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing]   = useState(null)
  const [form, setForm]         = useState(EMPTY_FORM)

  const load = async () => {
    try {
      setLoading(true)
      setOffers(await offersService.getAll())
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const openCreate = () => { setEditing(null); setForm(EMPTY_FORM); setShowForm(true) }

  const openEdit = (o) => {
    setEditing(o)
    setForm({
      discountPercentage: o.discountPercentage ?? 0,
      startDate:          o.startDate          ?? '',
      endDate:            o.endDate            ?? '',
      travelId:           o.travelId           ?? '',
    })
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.endDate && form.startDate && form.endDate <= form.startDate) {
      setError('La fecha de fin debe ser posterior a la fecha de inicio')
      return
    }
    try {
      const payload = {
        ...form,
        discountPercentage: Number(form.discountPercentage),
        travelId: form.travelId ? Number(form.travelId) : null,
      }
      if (!payload.travelId) delete payload.travelId
      editing ? await offersService.update(editing.id, payload) : await offersService.create(payload)
      setShowForm(false)
      setError(null)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar esta oferta?')) return
    try {
      await offersService.delete(id)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const change = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  if (loading) return <p className="p-8 text-center">Cargando ofertas...</p>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold" style={{ color: '#1A3A5C' }}>Ofertas</h1>
        <button onClick={openCreate}
          className="rounded-lg px-4 py-2 text-white font-medium"
          style={{ background: '#4A8FA8' }}>
          + Nueva oferta
        </button>
      </div>

      {error && <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>}

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead style={{ background: '#DAEEF7' }}>
            <tr>
              {['ID Viaje', 'Descuento %', 'Inicio', 'Fin', 'Acciones'].map(h => (
                <th key={h} className="px-4 py-3 text-left font-semibold" style={{ color: '#1A3A5C' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {offers.map((o, i) => (
              <tr key={o.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-3">{o.travelId ?? '—'}</td>
                <td className="px-4 py-3 font-medium">{o.discountPercentage}%</td>
                <td className="px-4 py-3">{o.startDate}</td>
                <td className="px-4 py-3">{o.endDate}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => openEdit(o)}
                    className="rounded px-3 py-1 text-xs font-medium text-white"
                    style={{ background: '#7AAFC0' }}>Editar</button>
                  <button onClick={() => handleDelete(o.id)}
                    className="rounded px-3 py-1 text-xs font-medium text-white bg-red-500">Eliminar</button>
                </td>
              </tr>
            ))}
            {offers.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">No hay ofertas</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-lg font-bold" style={{ color: '#1A3A5C' }}>
              {editing ? 'Editar oferta' : 'Nueva oferta'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-600">ID Viaje</label>
                <input name="travelId" type="number" min="1" value={form.travelId} onChange={change}
                  placeholder="Dejar vacío si es oferta general"
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                  style={{ borderColor: '#7AAFC0' }} />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600">Descuento (%) *</label>
                <input name="discountPercentage" type="number" min="1" max="100" step="0.01"
                  value={form.discountPercentage} onChange={change} required
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                  style={{ borderColor: '#7AAFC0' }} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-600">Fecha inicio *</label>
                  <input name="startDate" type="date" value={form.startDate} onChange={change} required
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                    style={{ borderColor: '#7AAFC0' }} />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">Fecha fin *</label>
                  <input name="endDate" type="date" value={form.endDate} onChange={change} required
                    min={form.startDate || undefined}
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                    style={{ borderColor: '#7AAFC0' }} />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit"
                  className="flex-1 rounded-lg py-2 text-sm font-medium text-white"
                  style={{ background: '#4A8FA8' }}>
                  {editing ? 'Guardar cambios' : 'Crear oferta'}
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