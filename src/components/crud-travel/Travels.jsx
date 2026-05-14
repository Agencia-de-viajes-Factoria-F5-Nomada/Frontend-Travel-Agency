import { useState, useEffect } from 'react'
import { TravelsService as travelService } from '../../services/TravelsService'
import { HotelService as hotelService } from '../../services/HotelService'
import { BusService as busService } from '../../services/BusService'

const EMPTY_FORM = {
  destiny: '',
  startDate: '',
  endDate: '',
  availablePlaces: 0,
  sale: false,
  hotelId: '',
  busId: '',
}

export default function Travels() {
  const [travels, setTravels]   = useState([])
  const [hotels, setHotels]     = useState([])
  const [buses, setBuses]       = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing]   = useState(null)
  const [form, setForm]         = useState(EMPTY_FORM)

  const load = async () => {
    try {
      setLoading(true)
      const [travelsData, hotelsData, busesData] = await Promise.all([
        travelService.getAll(),
        hotelService.getAll(),
        busService.getAll(),
      ])
      setTravels(travelsData)
      setHotels(hotelsData)
      setBuses(busesData)
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

  const openEdit = (travel) => {
    setEditing(travel)
    setForm({
      destiny:         travel.destiny         ?? '',
      startDate:       travel.startDate       ?? '',
      endDate:         travel.endDate         ?? '',
      availablePlaces: travel.availablePlaces ?? 0,
      sale:            travel.sale            ?? false,
      hotelId:         travel.hotelId         ?? '',
      busId:           travel.busId           ?? '',
    })
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        ...form,
        availablePlaces: Number(form.availablePlaces),
        hotelId:         Number(form.hotelId),
        busId:           form.busId ? Number(form.busId) : null,
      }
      if (!payload.busId) delete payload.busId

      if (editing) {
        await travelService.update(editing.id, payload)
      } else {
        await travelService.create(payload)
      }
      setShowForm(false)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este viaje?')) return
    try {
      await travelService.delete(id)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const change = (e) => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const getHotelName = (id) => hotels.find(h => h.id === id)?.name ?? id
  const getBusPlate  = (id) => buses.find(b => b.id === id)?.licensePlate ?? id

  if (loading) return <p className="p-8 text-center">Cargando viajes...</p>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold" style={{ color: '#1A3A5C' }}>Viajes</h1>
        <button onClick={openCreate}
          className="rounded-lg px-4 py-2 text-white font-medium"
          style={{ background: '#4A8FA8' }}>
          + Nuevo viaje
        </button>
      </div>

      {error && <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>}

      {/* Tabla */}
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead style={{ background: '#DAEEF7' }}>
            <tr>
              {['Destino', 'Fecha inicio', 'Fecha fin', 'Plazas', 'Hotel', 'Bus', 'Oferta', 'Acciones'].map(h => (
                <th key={h} className="px-4 py-3 text-left font-semibold" style={{ color: '#1A3A5C' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {travels.map((t, i) => (
              <tr key={t.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-3 font-medium">{t.destiny}</td>
                <td className="px-4 py-3">{t.startDate}</td>
                <td className="px-4 py-3">{t.endDate}</td>
                <td className="px-4 py-3">{t.availablePlaces}</td>
                <td className="px-4 py-3">{getHotelName(t.hotelId)}</td>
                <td className="px-4 py-3">{t.busId ? getBusPlate(t.busId) : '—'}</td>
                <td className="px-4 py-3">{t.sale ? '🏷 Sí' : 'No'}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => openEdit(t)}
                    className="rounded px-3 py-1 text-xs font-medium text-white"
                    style={{ background: '#7AAFC0' }}>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(t.id)}
                    className="rounded px-3 py-1 text-xs font-medium text-white bg-red-500">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {travels.length === 0 && (
              <tr><td colSpan={8} className="px-4 py-8 text-center text-gray-400">No hay viajes</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="mb-4 text-lg font-bold" style={{ color: '#1A3A5C' }}>
              {editing ? 'Editar viaje' : 'Nuevo viaje'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">

              <div>
                <label className="text-xs font-medium text-gray-600">Destino *</label>
                <input name="destiny" value={form.destiny} onChange={change} required
                  placeholder="Ej: París, Francia"
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
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                    style={{ borderColor: '#7AAFC0' }} />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600">Plazas disponibles *</label>
                <input name="availablePlaces" type="number" min="0" value={form.availablePlaces} onChange={change} required
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                  style={{ borderColor: '#7AAFC0' }} />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600">Hotel *</label>
                <select name="hotelId" value={form.hotelId} onChange={change} required
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                  style={{ borderColor: '#7AAFC0' }}>
                  <option value="">Selecciona un hotel</option>
                  {hotels.map(h => (
                    <option key={h.id} value={h.id}>{h.name} — {h.city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600">Autobús</label>
                <select name="busId" value={form.busId} onChange={change}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                  style={{ borderColor: '#7AAFC0' }}>
                  <option value="">Sin autobús asignado</option>
                  {buses.map(b => (
                    <option key={b.id} value={b.id}>{b.licensePlate} ({b.capacity} plazas)</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input name="sale" type="checkbox" checked={form.sale} onChange={change} className="h-4 w-4" />
                <label className="text-sm text-gray-600">En oferta</label>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit"
                  className="flex-1 rounded-lg py-2 text-sm font-medium text-white"
                  style={{ background: '#4A8FA8' }}>
                  {editing ? 'Guardar cambios' : 'Crear viaje'}
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