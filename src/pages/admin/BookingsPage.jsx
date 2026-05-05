import { Download, Filter, Plus, Search } from 'lucide-react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import PageHeader from '../../components/ui/PageHeader'
import StatusPill from '../../components/common/StatusPill'
import { BOOKINGS } from '../../constants/mockData'
import { formatCurrency } from '../../utils/formatters'

const BookingsPage = () => (
  <>
    <PageHeader
      eyebrow="Operaciones"
      title="Reservas"
      description="Revisa, confirma y haz seguimiento de cada reserva."
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
          />
        </label>
        <Button variant="secondary">
          <Filter className="h-4 w-4" aria-hidden="true" />
          Filtros
        </Button>
      </div>

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
            {BOOKINGS.map((booking) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </>
)

export default BookingsPage
