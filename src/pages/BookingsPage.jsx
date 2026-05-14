import { useState, useEffect } from 'react'
import { Filter, Plus, Search } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import PageHeader from '../components/ui/PageHeader'
import { bookingService } from '../services/BookingService'

const BookingsPage = () => {
  const [bookings, setBookings] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch]     = useState('')
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  useEffect(() => {
    bookingService.getAll()
      .then(data => { setBookings(data); setFiltered(data) })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const q = search.toLowerCase()
    setFiltered(
      bookings.filter(b =>
        String(b.id ?? '').toLowerCase().includes(q) ||
        (b.customerName ?? b.userName ?? '').toLowerCase().includes(q) ||
        (b.destination ?? b.travelName ?? '').toLowerCase().includes(q)
      )
    )
  }, [search, bookings])

  return (
    <>
      <PageHeader
        eyebrow="Operaciones"
        title="Reservas"
        description="Revisa, confirma y haz seguimiento de cada reserva."
        actions={
          <Button>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Nueva reserva
          </Button>
        }
      />

      {error && <div className="mt-4 rounded-lg bg-red-50 p-4 text-red-700">{error}</div>}

      <Card className="mt-8 p-4 md:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex flex-1 items-center gap-2 rounded-full border border-surface-600 bg-surface-900 px-4">
            <Search className="h-4 w-4 text-ink-muted" aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por ID, cliente o destino"
              className="h-10 w-full bg-transparent text-sm text-ink placeholder:text-ink-muted focus:outline-none"
            />
          </label>
          <Button variant="secondary">
            <Filter className="h-4 w-4" aria-hidden="true" />
            Filtros
          </Button>
        </div>

        <div className="mt-6 overflow-x-auto">
          {loading ? (
            <p className="py-10 text-center text-sm text-gray-400">Cargando reservas...</p>
          ) : (
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-ink-muted">
                <tr>
                  <th className="py-3">ID</th>
                  <th className="py-3">Cliente</th>
                  <th className="py-3">Destino</th>
                  <th className="py-3">Fecha</th>
                  <th className="py-3">Pasajeros</th>
                  <th className="py-3">Total</th>
                  <th className="py-3">Estado</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-gray-400">
                      {bookings.length === 0 ? 'No hay reservas' : 'Sin resultados'}
                    </td>
                  </tr>
                ) : (
                  filtered.map((b, i) => (
                    <tr key={b.id ?? i} className="border-t border-surface-700 text-ink-soft">
                      <td className="py-4 font-medium text-white">{b.id}</td>
                      <td className="py-4">{b.customerName ?? b.userName ?? '—'}</td>
                      <td className="py-4">{b.destination ?? b.travelName ?? '—'}</td>
                      <td className="py-4">{b.bookingDate ?? b.startDate ?? '—'}</td>
                      <td className="py-4">{b.numberOfPassengers ?? b.travelers ?? '—'}</td>
                      <td className="py-4">{b.totalPrice != null ? `${b.totalPrice}€` : (b.total != null ? `${b.total}€` : '—')}</td>
                      <td className="py-4">{b.status ?? '—'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </>
  )
}

export default BookingsPage