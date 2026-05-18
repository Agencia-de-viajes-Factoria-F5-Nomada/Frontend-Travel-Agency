import { useState, useEffect } from 'react'
import Table from '../molecules/Table'
import Alert from '../molecules/Alert'
import Pagination from '../molecules/Pagination'
import Button from '../atoms/Button'
import BookingForm from './BookingForm'
import { bookingService } from '../../services/BookingService'
import usePagination from '../../hooks/usePagination'

const EMPTY_FORM = {
  customerName: '',
  destination: '',
  bookingDate: '',
}

export default function BookingsCRUD() {
  const [error, setError] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [isEditing, setIsEditing] = useState(false)
  const [currentId, setCurrentId] = useState(null)

  const { data: bookings, page, totalPages, loading, load } = usePagination(
    (pageNum, size) => bookingService.getPage(pageNum, size),
    0,
    10
  )

  useEffect(() => { load() }, [load])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isEditing) {
        await bookingService.update(currentId, form)
      } else {
        await bookingService.confirm(form)
      }
      resetForm()
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const prepararEdicion = (booking) => {
    setForm({
      customerName: booking.customerName,
      destination: booking.destination,
      bookingDate: booking.bookingDate
    })
    setCurrentId(booking.id)
    setIsEditing(true)
  }

  const deleteBooking = async (id) => {
    try {
      await bookingService.delete(id)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const resetForm = () => {
    setForm(EMPTY_FORM)
    setIsEditing(false)
    setCurrentId(null)
  }

  const columns = [
    { key: 'customerName', label: 'Cliente' },
    { key: 'destination', label: 'Destino' },
    { key: 'bookingDate', label: 'Fecha' },
    {
      key: 'actions',
      label: '',
      align: 'center',
      render: (_, row) => (
        <div className="flex gap-2 justify-center">
          <Button size="sm" onClick={() => prepararEdicion(row)}>Editar</Button>
          <Button size="sm" variant="danger" onClick={() => deleteBooking(row.id)}>Eliminar</Button>
        </div>
      )
    }
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-ink">Gestión de Reservas</h1>

      {error && (
        <Alert type="error" message={error} onClose={() => setError(null)} />
      )}

      <div className="bg-surface-950/30 p-6 rounded-xl border border-surface-700/40">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <BookingForm form={form} onChange={handleChange} />
          </div>
          <div className="flex gap-3">
            <Button type="submit">
              {isEditing ? 'Actualizar Reserva' : 'Crear Reserva'}
            </Button>
            {isEditing && (
              <Button variant="secondary" onClick={resetForm}>
                Cancelar Edición
              </Button>
            )}
          </div>
        </form>
      </div>

      <Table columns={columns} data={bookings} loading={loading} emptyMessage="No hay reservas" />

      <div className="flex justify-center pt-4">
        <Pagination
          currentPage={page + 1}
          totalPages={totalPages}
          onPageChange={(p) => load(p - 1)}
        />
      </div>
    </div>
  )
}
