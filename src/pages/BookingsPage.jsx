import { useState, useMemo } from 'react'
import { Download, Filter, Plus, Search, X } from 'lucide-react'
import Button from '../components/atoms/Button'
import Card from '../components/atoms/Card'
import PageHeader from '../components/atoms/PageHeader'
import StatusPill from '../components/organisms/StatusPill'
import { BOOKINGS } from '../constants/mockData'
import { formatCurrency } from '../utils/formatters'

const STATUS_OPTIONS = [
  { value: '', label: 'Todos los estados' },
  { value: 'confirmed', label: 'Confirmada' },
  { value: 'pending', label: 'Pendiente' },
  { value: 'cancelled', label: 'Cancelada' },
]

const BookingsPage = () => {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    return BOOKINGS.filter(booking => {
      const matchSearch = !search ||
        booking.id.toLowerCase().includes(search.toLowerCase()) ||
        booking.destination.toLowerCase().includes(search.toLowerCase()) ||
        booking.customer?.toLowerCase().includes(search.toLowerCase())

      const matchStatus = !statusFilter || booking.status === statusFilter

      return matchSearch && matchStatus
    })
  }, [search, statusFilter])

  const handleClearFilters = () => {
    setSearch('')
    setStatusFilter('')
  }

  return (
    <>
      <PageHeader
        eyebrow="Operaciones"
        title="Reservas"
        description={`${filtered.length} reservas`}
        actions={
          <>
            <Button variant="secondary">
              <Download className="h-4 w-4" aria-hidden="true" />
              Exportar
            </Button>
            <Button>
              <Plus className="h-4 w-4" aria-hidden="true" />
              Nueva reserva
            </Button>
          </>
        }
      />

      <Card className="mt-8 p-4 md:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex flex-1 items-center gap-2 rounded-full border border-surface-600 bg-surface-900 px-4">
            <Search className="h-4 w-4 text-ink-muted" aria-hidden="true" />
            <input
              type="search"
              placeholder="Buscar por referencia, cliente o destino"
              className="h-10 w-full bg-transparent text-sm text-ink placeholder:text-ink-muted focus:outline-none"
              aria-label="Buscar reservas"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-ink-muted hover:text-ink">
                <X className="h-4 w-4" />
              </button>
            )}
          </label>
          <Button
            variant={showFilters ? 'primary' : 'secondary'}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" aria-hidden="true" />
            Filtros
          </Button>
        </div>

        {showFilters && (
          <div className="mt-4 flex flex-wrap items-center gap-3 rounded-lg bg-surface-800 p-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-surface-600 bg-surface-900 px-3 py-2 text-sm text-ink"
            >
              {STATUS_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {(search || statusFilter) && (
              <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                Limpiar filtros
              </Button>
            )}
          </div>
        )}

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-ink-muted">
            <tr>
              <th scope="col" className="py-3">Referencia</th>
              <th scope="col" className="py-3">Destino</th>
              <th scope="col" className="py-3">Fechas</th>
              <th scope="col" className="py-3">Viajeros</th>
              <th scope="col" className="py-3">Total</th>
              <th scope="col" className="py-3">Estado</th>
              <th scope="col" className="py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-ink-muted">
                  No se encontraron reservas con los filtros aplicados
                </td>
              </tr>
            ) : (
              filtered.map((booking) => (
                <tr key={booking.id} className="border-t border-surface-700 text-ink-soft">
                  <td className="py-4 font-medium text-white">{booking.id}</td>
                  <td className="py-4">{booking.destination}</td>
                  <td className="py-4">{booking.dates}</td>
                  <td className="py-4">{booking.travelers}</td>
                  <td className="py-4">{formatCurrency(booking.total)}</td>
                  <td className="py-4">
                    <StatusPill status={booking.status} />
                  </td>
                  <td className="py-4 text-right">
                    <div className="inline-flex gap-2">
                      <Button variant="ghost" size="sm">Ver</Button>
                      <Button variant="secondary" size="sm">Editar</Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  </>
)

export default BookingsPage
