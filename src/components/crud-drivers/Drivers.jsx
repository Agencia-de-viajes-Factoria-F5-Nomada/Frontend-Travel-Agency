import { useState, useEffect } from 'react'
import { DriverService } from '../../services/DriverService'

const Drivers = () => {
  const [drivers, setDrivers] = useState([])
  const [formData, setFormData] = useState({ name: '', phone: '', enrollment: '', licenceActive: true })
  const [isEditing, setIsEditing] = useState(false)
  const [currentId, setCurrentId] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => { cargarDrivers() }, [])

  const cargarDrivers = async () => {
    try {
      const data = await DriverService.fetchDrivers()
      setDrivers(data)
      setError(null)
    } catch {
      setError('No se pudieron cargar los conductores.')
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
        await DriverService.updateDriver(currentId, formData)
      } else {
        await DriverService.createDriver(formData)
      }
      resetForm()
      cargarDrivers()
    } catch {
      setError('Error al guardar el conductor.')
    }
  }

  const handleEditar = (driver) => {
    setFormData({ name: driver.name, phone: driver.phone, enrollment: driver.enrollment, licenceActive: driver.licenceActive ?? true })
    setCurrentId(driver.id)
    setIsEditing(true)
  }

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Eliminar conductor?')) return
    try {
      await DriverService.deleteDriver(id)
      cargarDrivers()
    } catch {
      setError('Error al eliminar el conductor.')
    }
  }

  const resetForm = () => {
    setFormData({ name: '', phone: '', enrollment: '', licenceActive: true })
    setIsEditing(false)
    setCurrentId(null)
  }

  return (
    <div className="p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">Gestión de Conductores</h2>
      {error && (
        <p className="mb-4 rounded-lg border border-status-pending/30 bg-status-pending/10 px-4 py-3 text-sm text-status-pending">{error}</p>
      )}
      <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-2 gap-4 rounded-xl border border-surface-700 bg-surface-800 p-5">
        <input name="name" placeholder="Nombre completo" value={formData.name} onChange={handleChange}
          className="rounded-lg border border-surface-600 bg-surface-900 px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-brand-500 focus:outline-none" required />
        <input name="phone" placeholder="Teléfono" value={formData.phone} onChange={handleChange}
          className="rounded-lg border border-surface-600 bg-surface-900 px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-brand-500 focus:outline-none" required />
        <input name="enrollment" placeholder="Nº de licencia" value={formData.enrollment} onChange={handleChange}
          className="col-span-2 rounded-lg border border-surface-600 bg-surface-900 px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-brand-500 focus:outline-none" required />
        <label className="col-span-2 flex items-center gap-2 text-sm text-ink-soft">
          <input type="checkbox" name="licenceActive" checked={formData.licenceActive} onChange={handleChange} />
          Licencia activa
        </label>
        <button type="submit" className="col-span-2 rounded-full bg-brand-500 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-400">
          {isEditing ? 'Actualizar conductor' : 'Registrar conductor'}
        </button>
        {isEditing && (
          <button type="button" onClick={resetForm} className="col-span-2 text-sm text-ink-muted hover:text-white">Cancelar edición</button>
        )}
      </form>
      <div className="overflow-hidden rounded-xl border border-surface-700">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-400 text-white">
            <tr>
              <th className="px-5 py-3 font-semibold">Nombre</th>
              <th className="px-5 py-3 font-semibold">Teléfono</th>
              <th className="px-5 py-3 font-semibold">Licencia</th>
              <th className="px-5 py-3 font-semibold">Estado</th>
              <th className="px-5 py-3 text-center font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id} className="border-t border-surface-700 text-ink-soft hover:bg-surface-800">
                <td className="px-5 py-3 font-medium text-white">{driver.name}</td>
                <td className="px-5 py-3">{driver.phone}</td>
                <td className="px-5 py-3">{driver.enrollment}</td>
                <td className="px-5 py-3">
                  {driver.licenceActive
                    ? <span className="rounded-full bg-status-confirmed/10 px-2 py-1 text-xs text-status-confirmed">Activa</span>
                    : <span className="rounded-full bg-status-pending/10 px-2 py-1 text-xs text-status-pending">Inactiva</span>
                  }
                </td>
                <td className="px-5 py-3 text-center">
                  <button onClick={() => handleEditar(driver)} className="mr-4 text-brand-300 hover:text-brand-200">Editar</button>
                  <button onClick={() => handleEliminar(driver.id)} className="text-status-pending hover:text-red-400">Eliminar</button>
                </td>
              </tr>
            ))}
            {drivers.length === 0 && (
              <tr><td colSpan={5} className="px-5 py-8 text-center text-ink-muted">No hay conductores registrados.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Drivers
