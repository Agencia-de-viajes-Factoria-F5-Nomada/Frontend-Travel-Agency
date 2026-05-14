import { useState, useEffect } from 'react'
import { BusService } from '../../services/BusService'

const Buses = () => {
  const [buses, setBuses] = useState([])
  const [formData, setFormData] = useState({ licensePlate: '', capacity: '', available: true })
  const [isEditing, setIsEditing] = useState(false)
  const [currentId, setCurrentId] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => { cargarBuses() }, [])

  const cargarBuses = async () => {
    try {
      const data = await BusService.fetchBuses()
      setBuses(data)
      setError(null)
    } catch {
      setError('No se pudieron cargar los autobuses.')
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isEditing) {
        await BusService.updateBus(currentId, formData)
      } else {
        await BusService.createBus(formData)
      }
      resetForm()
      cargarBuses()
    } catch {
      setError('Error al guardar el autobús.')
    }
  }

  const handleEditar = (bus) => {
    setFormData({ licensePlate: bus.licensePlate, capacity: bus.capacity, available: bus.available ?? true })
    setCurrentId(bus.id)
    setIsEditing(true)
  }

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Eliminar autobús?')) return
    try {
      await BusService.deleteBus(id)
      cargarBuses()
    } catch {
      setError('Error al eliminar el autobús.')
    }
  }

  const resetForm = () => {
    setFormData({ licensePlate: '', capacity: '', available: true })
    setIsEditing(false)
    setCurrentId(null)
  }

  return (
    <div className="p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">Gestión de Autobuses</h2>
      {error && (
        <p className="mb-4 rounded-lg border border-status-pending/30 bg-status-pending/10 px-4 py-3 text-sm text-status-pending">{error}</p>
      )}
      <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-2 gap-4 rounded-xl border border-surface-700 bg-surface-800 p-5">
        <input name="licensePlate" placeholder="Matrícula" value={formData.licensePlate} onChange={handleChange}
          className="rounded-lg border border-surface-600 bg-surface-900 px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-brand-500 focus:outline-none" required />
        <input name="capacity" type="number" placeholder="Capacidad" value={formData.capacity} onChange={handleChange}
          className="rounded-lg border border-surface-600 bg-surface-900 px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-brand-500 focus:outline-none" required />
        <label className="col-span-2 flex items-center gap-2 text-sm text-ink-soft">
          <input type="checkbox" name="available" checked={formData.available} onChange={handleChange} />
          Disponible
        </label>
        <button type="submit" className="col-span-2 rounded-full bg-brand-500 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-400">
          {isEditing ? 'Actualizar autobús' : 'Registrar autobús'}
        </button>
        {isEditing && (
          <button type="button" onClick={resetForm} className="col-span-2 text-sm text-ink-muted hover:text-white">Cancelar edición</button>
        )}
      </form>
      <div className="overflow-hidden rounded-xl border border-surface-700">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-400 text-white">
            <tr>
              <th className="px-5 py-3 font-semibold">Matrícula</th>
              <th className="px-5 py-3 font-semibold">Capacidad</th>
              <th className="px-5 py-3 font-semibold">Estado</th>
              <th className="px-5 py-3 text-center font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus) => (
              <tr key={bus.id} className="border-t border-surface-700 text-ink-soft hover:bg-surface-800">
                <td className="px-5 py-3 font-medium text-white">{bus.licensePlate}</td>
                <td className="px-5 py-3">{bus.capacity}</td>
                <td className="px-5 py-3">
                  {bus.available
                    ? <span className="rounded-full bg-status-confirmed/10 px-2 py-1 text-xs text-status-confirmed">Disponible</span>
                    : <span className="rounded-full bg-status-pending/10 px-2 py-1 text-xs text-status-pending">No disponible</span>
                  }
                </td>
                <td className="px-5 py-3 text-center">
                  <button onClick={() => handleEditar(bus)} className="mr-4 text-brand-300 hover:text-brand-200">Editar</button>
                  <button onClick={() => handleEliminar(bus.id)} className="text-status-pending hover:text-red-400">Eliminar</button>
                </td>
              </tr>
            ))}
            {buses.length === 0 && (
              <tr><td colSpan={4} className="px-5 py-8 text-center text-ink-muted">No hay autobuses registrados.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Buses
