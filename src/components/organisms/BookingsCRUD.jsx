import { useState, useEffect } from 'react'
import Table from '../molecules/Table'
import Alert from '../molecules/Alert'
import Pagination from '../molecules/Pagination'
import Button from '../atoms/Button'
import BookingForm from './BookingForm'
import { bookingService } from '../../services/BookingService'
import { travelService } from '../../services/TravelsService'
import { userService } from '../../services/usersService'
import usePagination from '../../hooks/usePagination'

const EMPTY_FORM = {
  travelId: '',
  customerId: '',
  typeBoard: 'HALF',
  isGroup: false,
}

export default function BookingsCRUD() {
  const [error, setError]     = useState(null)
  const [form, setForm]       = useState(EMPTY_FORM)
  const [travels, setTravels] = useState([])
  const [users, setUsers]     = useState([])

  const { data: bookings, page, totalPages, loading, load } = usePagination(
    (pageNum, size) => bookingService.getPage(pageNum, size),
    0,
    10
  )

  useEffect(() => {
    load()
    travelService.getAvailable().then(setTravels).catch(() => {})
    userService.getAll().then(data => setUsers(data.content ?? data)).catch(() => {})
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await bookingService.confirm({
        travelId:    Number(form.travelId),
        typeBoard:   form.typeBoard,
        isGroup:     form.isGroup === 'true' || form.isGroup === true,
        customerIds: [Number(form.customerId)],
        boughtDate:  new Date().toISOString(),
      })
      setForm(EMPTY_FORM)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const deleteBooking = async (id) => {
    try {
      await bookingService.delete(id)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const columns = [
    { key: 'travelDestiny', label: 'Destino' },
    { key: 'typeBoard',     label: 'Pensión' },
    { key: 'totalPrice',    label: 'Total €' },
    { key: 'boughtDate',    label: 'Fecha' },
    {
      key: 'actions',
      label: '',
      align: 'center',
      render: (_, row) => (
        <Button size="sm" variant="danger" onClick={() => deleteBooking(row.bookingId)}>
          Eliminar
        </Button>
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
          <BookingForm form={form} onChange={handleChange} travels={travels} users={users} />
          <Button type="submit">Crear Reserva</Button>
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