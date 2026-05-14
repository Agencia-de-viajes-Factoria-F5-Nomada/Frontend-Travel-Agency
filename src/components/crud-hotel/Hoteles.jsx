import { useState, useEffect } from 'react'
import { hotelService } from '../../services/HotelService'
import { cloudinaryService } from '../../services/cloudinaryService'

const EMPTY_FORM = {
  name: '',
  address: '',
  city: '',
  country: '',
  stars: 3,
  capacity: 0,
  availablePlaces: 0,
  halfBoardPrice: 0,
  fullBoardPrice: 0,
  imageUrl: '',
  active: true,
}

export default function Hoteles() {
  const [hotels, setHotels]     = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing]   = useState(null)
  const [form, setForm]         = useState(EMPTY_FORM)
  const [uploading, setUploading] = useState(false)

  const load = async () => {
    try {
      setLoading(true)
      const data = await hotelService.getAll()
      setHotels(data)
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

  const openEdit = (hotel) => {
    setEditing(hotel)
    setForm({
      name:            hotel.name            ?? '',
      address:         hotel.address         ?? '',
      city:            hotel.city            ?? '',
      country:         hotel.country         ?? '',
      stars:           hotel.stars           ?? 3,
      capacity:        hotel.capacity        ?? 0,
      availablePlaces: hotel.availablePlaces ?? 0,
      halfBoardPrice:  hotel.halfBoardPrice  ?? 0,
      fullBoardPrice:  hotel.fullBoardPrice  ?? 0,
      imageUrl:        hotel.imageUrl        ?? '',
      active:          hotel.active          ?? true,
    })
    setShowForm(true)
  }

  const handleImage = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    try {
      setUploading(true)
      const url = await cloudinaryService.upload(file)
      setForm(f => ({ ...f, imageUrl: url }))
    } catch (e) {
      setError('Error al subir imagen: ' + e.message)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        ...form,
        stars:           Number(form.stars),
        capacity:        Number(form.capacity),
        availablePlaces: Number(form.availablePlaces),
        halfBoardPrice:  Number(form.halfBoardPrice),
        fullBoardPrice:  Number(form.fullBoardPrice),
      }
      if (editing) {
        await hotelService.update(editing.id, payload)
      } else {
        await hotelService.create(payload)
      }
      setShowForm(false)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este hotel?')) return
    try {
      await hotelService.delete(id)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const change = (e) => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  if (loading) return <p className="p-8 text-center">Cargando hoteles...</p>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold" style={{ color: '#1A3A5C' }}>Hoteles</h1>
        <button onClick={openCreate}
          className="rounded-lg px-4 py-2 text-white font-medium"
          style={{ background: '#4A8FA8' }}>
          + Nuevo hotel
        </button>
      </div>

      {error && <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>}

      {/* Tabla */}
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead style={{ background: '#DAEEF7' }}>
            <tr>
              {['Imagen', 'Nombre', 'Ciudad', 'País', 'Estrellas', 'Plazas', 'MP', 'PC', 'Activo', 'Acciones'].map(h => (
                <th key={h} className="px-4 py-3 text-left font-semibold" style={{ color: '#1A3A5C' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hotels.map((h, i) => (
              <tr key={h.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-3">
                  {h.imageUrl
                    ? <img src={h.imageUrl} alt={h.name} className="h-10 w-14 rounded object-cover" />
                    : <div className="h-10 w-14 rounded bg-gray-200 flex items-center justify-center text-xs text-gray-400">Sin img</div>
                  }
                </td>
                <td className="px-4 py-3 font-medium">{h.name}</td>
                <td className="px-4 py-3">{h.city}</td>
                <td className="px-4 py-3">{h.country}</td>
                <td className="px-4 py-3">{'⭐'.repeat(h.stars)}</td>
                <td className="px-4 py-3">{h.availablePlaces}/{h.capacity}</td>
                <td className="px-4 py-3">{h.halfBoardPrice}€</td>
                <td className="px-4 py-3">{h.fullBoardPrice}€</td>
                <td className="px-4 py-3">{h.active ? '✅' : '❌'}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => openEdit(h)}
                    className="rounded px-3 py-1 text-xs font-medium text-white"
                    style={{ background: '#7AAFC0' }}>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(h.id)}
                    className="rounded px-3 py-1 text-xs font-medium text-white bg-red-500">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {hotels.length === 0 && (
              <tr><td colSpan={10} className="px-4 py-8 text-center text-gray-400">No hay hoteles</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="mb-4 text-lg font-bold" style={{ color: '#1A3A5C' }}>
              {editing ? 'Editar hotel' : 'Nuevo hotel'}
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
                  <label className="text-xs font-medium text-gray-600">Estrellas</label>
                  <select name="stars" value={form.stars} onChange={change}
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                    style={{ borderColor: '#7AAFC0' }}>
                    {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} ⭐</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600">Dirección</label>
                <input name="address" value={form.address} onChange={change}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                  style={{ borderColor: '#7AAFC0' }} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-600">Ciudad *</label>
                  <input name="city" value={form.city} onChange={change} required
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                    style={{ borderColor: '#7AAFC0' }} />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">País *</label>
                  <input name="country" value={form.country} onChange={change} required
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                    style={{ borderColor: '#7AAFC0' }} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-600">Capacidad total</label>
                  <input name="capacity" type="number" min="0" value={form.capacity} onChange={change}
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                    style={{ borderColor: '#7AAFC0' }} />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">Plazas disponibles</label>
                  <input name="availablePlaces" type="number" min="0" value={form.availablePlaces} onChange={change}
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                    style={{ borderColor: '#7AAFC0' }} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-600">Precio media pensión (€)</label>
                  <input name="halfBoardPrice" type="number" min="0" step="0.01" value={form.halfBoardPrice} onChange={change}
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                    style={{ borderColor: '#7AAFC0' }} />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">Precio pensión completa (€)</label>
                  <input name="fullBoardPrice" type="number" min="0" step="0.01" value={form.fullBoardPrice} onChange={change}
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                    style={{ borderColor: '#7AAFC0' }} />
                </div>
              </div>

              {/* Cloudinary */}
              <div>
                <label className="text-xs font-medium text-gray-600">Imagen</label>
                <input type="file" accept="image/*" onChange={handleImage}
                  className="mt-1 w-full text-sm text-gray-500" />
                {uploading && <p className="text-xs text-blue-500 mt-1">Subiendo imagen...</p>}
                {form.imageUrl && (
                  <img src={form.imageUrl} alt="preview"
                    className="mt-2 h-24 w-full rounded-lg object-cover" />
                )}
              </div>

              <div className="flex items-center gap-2">
                <input name="active" type="checkbox" checked={form.active} onChange={change} className="h-4 w-4" />
                <label className="text-sm text-gray-600">Hotel activo</label>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit"
                  className="flex-1 rounded-lg py-2 text-sm font-medium text-white"
                  style={{ background: '#4A8FA8' }}>
                  {editing ? 'Guardar cambios' : 'Crear hotel'}
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