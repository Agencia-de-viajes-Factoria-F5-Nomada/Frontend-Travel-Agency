import { useState, useEffect } from 'react'
import { BookingService } from '../../services/BookingService'

const FORM_INICIAL = { customerName: '', destination: '', bookingDate: '' }

const Bookings = () => {
  const [bookings, setBookings] = useState([])
  const [formData, setFormData] = useState(FORM_INICIAL)
  const [isEditing, setIsEditing] = useState(false)
  const [currentId, setCurrentId] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => { cargarBookings() }, [])

  const cargarBookings = async () => {
    try {
      const data = await BookingService.fetchBookings()
      setBookings(data)
      setError(null)
    } catch {
      setError('No se pudieron cargar las reservas.')
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isEditing) {
        await BookingService.updateBooking(currentId, formData)
      } else {
        await BookingService.createBooking(formData)
      }
      resetForm()
      cargarBookings()
    } catch {
      setError('Error al guardar la reserva.')
    }
  }

  const handleEditar = (booking) => {
    setFormData({ customerName: booking.customerName ?? '', destination: booking.destination ?? '', bookingDate: booking.bookingDate ?? '' })
    setCurrentId(booking.id)
    setIsEditing(true)
  }

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Anular esta reserva?')) return
    try {
      await BookingService.deleteBooking(id)
      cargarBookings()
    } catch {
      setError('Error al eliminar la reserva.')
    }
  }

  const resetForm = () => {
    setFormData(FORM_INICIAL)
    setIsEditing(false)
    setCurrentId(null)
  }

  return (
    <div className="p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">Gestión de Reservas</h2>
      {error && (
        <p className="mb-4 rounded-lg border border-status-pending/30 bg-status-pending/10 px-4 py-3 text-sm text-status-pending">{error}</p>
      )}
      <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-2 gap-4 rounded-xl border border-surface-700 bg-surface-800 p-5">
        <input name="customerName" placeholder="Nombre del cliente" value={formData.customerName} onChange={handleChange}
          className="col-span-2 rounded-lg border border-surface-600 bg-surface-900 px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-brand-500 focus:outline-none" required />
        <input name="destination" placeholder="Destino" value={formData.destination} onChange={handleChange}
          className="rounded-lg border border-surface-600 bg-surface-900 px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-brand-500 focus:outline-none" required />
        <div className="flex flex-col gap-1">
          <label className="text-xs text-ink-muted">Fecha de reserva</label>
          <input type="date" name="bookingDate" value={formData.bookingDate} onChange={handleChange}
            className="rounded-lg border border-surface-600 bg-surface-900 px-3 py-2 text-sm text-ink focus:border-brand-500 focus:outline-none" required />
        </div>
        <button type="submit" className="col-span-2 rounded-full bg-brand-500 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-400">
          {isEditing ? 'Actualizar reserva' : 'Crear reserva'}
        </button>
        {isEditing && (
          <button type="button" onClick={resetForm} className="col-span-2 text-sm text-ink-muted hover:text-white">Cancelar edición</button>
        )}
      </form>
      <div className="overflow-hidden rounded-xl border border-surface-700">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-400 text-white">
            <tr>
              <th className="px-5 py-3 font-semibold">Cliente</th>
              <th className="px-5 py-3 font-semibold">Destino</th>
              <th className="px-5 py-3 font-semibold">Fecha</th>
              <th className="px-5 py-3 text-center font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-t border-surface-700 text-ink-soft hover:bg-surface-800">
                <td className="px-5 py-3 font-medium text-white">{b.customerName}</td>
                <td className="px-5 py-3">{b.destination}</td>
                <td className="px-5 py-3">{b.bookingDate}</td>
                <td className="px-5 py-3 text-center">
                  <button onClick={() => handleEditar(b)} className="mr-4 text-brand-300 hover:text-brand-200">Editar</button>
                  <button onClick={() => handleEliminar(b.id)} className="text-status-pending hover:text-red-400">Eliminar</button>
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr><td colSpan={4} className="px-5 py-8 text-center text-ink-muted">No hay reservas registradas.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Bookings
