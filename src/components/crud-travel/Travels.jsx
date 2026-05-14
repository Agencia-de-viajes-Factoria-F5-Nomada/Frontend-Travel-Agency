import { useState, useEffect } from 'react'
import { TravelsService } from '../../services/TravelsService'

const FORM_INICIAL = { destiny: '', startDate: '', endDate: '', availablePlaces: '', hotelId: '', sale: false }

const Travels = () => {
  const [travels, setTravels] = useState([])
  const [formData, setFormData] = useState(FORM_INICIAL)
  const [isEditing, setIsEditing] = useState(false)
  const [currentId, setCurrentId] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => { cargarTravels() }, [])

  const cargarTravels = async () => {
    try {
      const data = await TravelsService.fetchTravels()
      setTravels(data)
      setError(null)
    } catch {
      setError('No se pudieron cargar los viajes.')
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        ...formData,
        availablePlaces: Number(formData.availablePlaces),
        hotelId: formData.hotelId ? Number(formData.hotelId) : undefined,
      }
      if (isEditing) {
        await TravelsService.updateTravel(currentId, payload)
      } else {
        await TravelsService.createTravel(payload)
      }
      resetForm()
      cargarTravels()
    } catch {
      setError('Error al guardar el viaje.')
    }
  }

  const handleEditar = (travel) => {
    setFormData({
      destiny: travel.destiny ?? '',
      startDate: travel.startDate ?? '',
      endDate: travel.endDate ?? '',
      availablePlaces: travel.availablePlaces ?? '',
      hotelId: travel.hotelId ?? '',
      sale: travel.sale ?? false,
    })
    setCurrentId(travel.id)
    setIsEditing(true)
  }

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este viaje?')) return
    try {
      await TravelsService.deleteTravel(id)
      cargarTravels()
    } catch {
      setError('Error al eliminar el viaje.')
    }
  }

  const resetForm = () => {
    setFormData(FORM_INICIAL)
    setIsEditing(false)
    setCurrentId(null)
  }

  return (
    <div className="p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">Gestión de Viajes</h2>
      {error && (
        <p className="mb-4 rounded-lg border border-status-pending/30 bg-status-pending/10 px-4 py-3 text-sm text-status-pending">{error}</p>
      )}
      <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-2 gap-4 rounded-xl border border-surface-700 bg-surface-800 p-5">
        <input name="destiny" placeholder="Destino" value={formData.destiny} onChange={handleChange}
          className="col-span-2 rounded-lg border border-surface-600 bg-surface-900 px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-brand-500 focus:outline-none" required />
        <div className="flex flex-col gap-1">
          <label className="text-xs text-ink-muted">Fecha de inicio</label>
          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange}
            className="rounded-lg border border-surface-600 bg-surface-900 px-3 py-2 text-sm text-ink focus:border-brand-500 focus:outline-none" required />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-ink-muted">Fecha de fin</label>
          <input type="date" name="endDate" value={formData.endDate} onChange={handleChange}
            className="rounded-lg border border-surface-600 bg-surface-900 px-3 py-2 text-sm text-ink focus:border-brand-500 focus:outline-none" required />
        </div>
        <input name="availablePlaces" type="number" placeholder="Plazas disponibles" value={formData.availablePlaces} onChange={handleChange}
          className="rounded-lg border border-surface-600 bg-surface-900 px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-brand-500 focus:outline-none" required />
        <input name="hotelId" type="number" placeholder="ID del hotel" value={formData.hotelId} onChange={handleChange}
          className="rounded-lg border border-surface-600 bg-surface-900 px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-brand-500 focus:outline-none" />
        <label className="col-span-2 flex items-center gap-2 text-sm text-ink-soft">
          <input type="checkbox" name="sale" checked={formData.sale} onChange={handleChange} />
          Marcar como oferta
        </label>
        <button type="submit" className="col-span-2 rounded-full bg-brand-500 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-400">
          {isEditing ? 'Actualizar viaje' : 'Crear viaje'}
        </button>
        {isEditing && (
          <button type="button" onClick={resetForm} className="col-span-2 text-sm text-ink-muted hover:text-white">Cancelar edición</button>
        )}
      </form>
      <div className="overflow-hidden rounded-xl border border-surface-700">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-400 text-white">
            <tr>
              <th className="px-5 py-3 font-semibold">Destino</th>
              <th className="px-5 py-3 font-semibold">Inicio</th>
              <th className="px-5 py-3 font-semibold">Fin</th>
              <th className="px-5 py-3 font-semibold">Plazas</th>
              <th className="px-5 py-3 font-semibold">Estado</th>
              <th className="px-5 py-3 text-center font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {travels.map((travel) => (
              <tr key={travel.id} className="border-t border-surface-700 text-ink-soft hover:bg-surface-800">
                <td className="px-5 py-3 font-medium text-white">{travel.destiny}</td>
                <td className="px-5 py-3">{travel.startDate}</td>
                <td className="px-5 py-3">{travel.endDate}</td>
                <td className="px-5 py-3">{travel.availablePlaces}</td>
                <td className="px-5 py-3">
                  {travel.sale
                    ? <span className="rounded-full bg-status-warning/10 px-2 py-1 text-xs text-status-warning">Oferta</span>
                    : <span className="rounded-full bg-brand-500/10 px-2 py-1 text-xs text-brand-300">Normal</span>
                  }
                </td>
                <td className="px-5 py-3 text-center">
                  <button onClick={() => handleEditar(travel)} className="mr-4 text-brand-300 hover:text-brand-200">Editar</button>
                  <button onClick={() => handleEliminar(travel.id)} className="text-status-pending hover:text-red-400">Eliminar</button>
                </td>
              </tr>
            ))}
            {travels.length === 0 && (
              <tr><td colSpan={6} className="px-5 py-8 text-center text-ink-muted">No hay viajes registrados.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Travels
