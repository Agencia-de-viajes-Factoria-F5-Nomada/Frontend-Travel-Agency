import { useState, useEffect } from 'react'
import { HotelService } from '../../services/HotelService'

const Hoteles = () => {
  const [hoteles, setHoteles] = useState([])
  const [form, setForm] = useState({ name: '', city: '', country: '', address: '' })
  const [editandoId, setEditandoId] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => { cargarHoteles() }, [])

  const cargarHoteles = async () => {
    try {
      const data = await HotelService.fetchHoteles()
      setHoteles(data)
      setError(null)
    } catch {
      setError('No se pudieron cargar los hoteles.')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editandoId) {
        await HotelService.updateHotel(editandoId, form)
      } else {
        await HotelService.createHotel(form)
      }
      resetForm()
      cargarHoteles()
    } catch {
      setError('Error al guardar el hotel.')
    }
  }

  const handleEditar = (hotel) => {
    setForm({ name: hotel.name ?? '', city: hotel.city ?? '', country: hotel.country ?? '', address: hotel.address ?? '' })
    setEditandoId(hotel.id)
  }

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Deseas eliminar este hotel?')) return
    try {
      await HotelService.deleteHotel(id)
      cargarHoteles()
    } catch {
      setError('Error al eliminar el hotel.')
    }
  }

  const resetForm = () => {
    setForm({ name: '', city: '', country: '', address: '' })
    setEditandoId(null)
  }

  return (
    <div className="p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">Gestión de Hoteles</h2>
      {error && (
        <p className="mb-4 rounded-lg border border-status-pending/30 bg-status-pending/10 px-4 py-3 text-sm text-status-pending">{error}</p>
      )}
      <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-2 gap-4 rounded-xl border border-surface-700 bg-surface-800 p-5">
        <input placeholder="Nombre del hotel" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="col-span-2 rounded-lg border border-surface-600 bg-surface-900 px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-brand-500 focus:outline-none" required />
        <input placeholder="Ciudad" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
          className="rounded-lg border border-surface-600 bg-surface-900 px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-brand-500 focus:outline-none" required />
        <input placeholder="País" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })}
          className="rounded-lg border border-surface-600 bg-surface-900 px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-brand-500 focus:outline-none" required />
        <input placeholder="Dirección" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="col-span-2 rounded-lg border border-surface-600 bg-surface-900 px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-brand-500 focus:outline-none" />
        <button type="submit" className="col-span-2 rounded-full bg-brand-500 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-400">
          {editandoId ? 'Actualizar hotel' : 'Crear hotel'}
        </button>
        {editandoId && (
          <button type="button" onClick={resetForm} className="col-span-2 text-sm text-ink-muted hover:text-white">Cancelar edición</button>
        )}
      </form>
      <div className="overflow-hidden rounded-xl border border-surface-700">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-400 text-white">
            <tr>
              <th className="px-5 py-3 font-semibold">Nombre</th>
              <th className="px-5 py-3 font-semibold">Ciudad</th>
              <th className="px-5 py-3 font-semibold">País</th>
              <th className="px-5 py-3 text-center font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {hoteles.map((hotel) => (
              <tr key={hotel.id} className="border-t border-surface-700 text-ink-soft hover:bg-surface-800">
                <td className="px-5 py-3 font-medium text-white">{hotel.name}</td>
                <td className="px-5 py-3">{hotel.city}</td>
                <td className="px-5 py-3">{hotel.country}</td>
                <td className="px-5 py-3 text-center">
                  <button onClick={() => handleEditar(hotel)} className="mr-4 text-brand-300 hover:text-brand-200">Editar</button>
                  <button onClick={() => handleEliminar(hotel.id)} className="text-status-pending hover:text-red-400">Eliminar</button>
                </td>
              </tr>
            ))}
            {hoteles.length === 0 && (
              <tr><td colSpan={4} className="px-5 py-8 text-center text-ink-muted">No hay hoteles registrados.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Hoteles
