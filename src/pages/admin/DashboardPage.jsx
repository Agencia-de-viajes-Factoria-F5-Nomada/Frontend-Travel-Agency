import { CalendarRange, MapPinned, Ticket, Users } from 'lucide-react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import PageHeader from '../../components/ui/PageHeader'
import StatCard from '../../components/common/StatCard'
import StatusPill from '../../components/common/StatusPill'
import { ADMIN_PATHS } from '../../constants/paths'
import { BOOKINGS } from '../../constants/mockData'
import { formatCurrency } from '../../utils/formatters'

const STATS = [
  { label: 'Reservas activas', value: '128', delta: '+12% vs mes anterior', icon: Ticket },
  { label: 'Nuevos usuarios', value: '54', delta: '+8% vs mes anterior', icon: Users },
  { label: 'Destinos', value: '32', icon: MapPinned },
  { label: 'Próximos viajes', value: '47', icon: CalendarRange },
]

const DashboardPage = () => (
  <>
    <PageHeader
      eyebrow="Resumen"
      title="Panel de operaciones"
      description="Vista general de reservas, clientes y estado del contenido."
      actions={
        <Button to={ADMIN_PATHS.BOOKINGS}>Gestionar reservas</Button>
      }
    />

    <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {STATS.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </section>

    <section className="mt-10 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Reservas recientes</h2>
          <Button variant="ghost" size="sm" to={ADMIN_PATHS.BOOKINGS}>
            Ver todas
          </Button>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-ink-muted">
              <tr>
                <th scope="col" className="py-3">Referencia</th>
                <th scope="col" className="py-3">Destino</th>
                <th scope="col" className="py-3">Total</th>
                <th scope="col" className="py-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {BOOKINGS.map((booking) => (
                <tr key={booking.id} className="border-t border-surface-700 text-ink-soft">
                  <td className="py-3 font-medium text-white">{booking.id}</td>
                  <td className="py-3">{booking.destination}</td>
                  <td className="py-3">{formatCurrency(booking.total)}</td>
                  <td className="py-3">
                    <StatusPill status={booking.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-white">Acciones rápidas</h2>
        <div className="mt-4 grid gap-3">
          <Button variant="secondary" fullWidth to={ADMIN_PATHS.DESTINATIONS}>
            <MapPinned className="h-4 w-4" aria-hidden="true" />
            Añadir nuevo destino
          </Button>
          <Button variant="secondary" fullWidth to={ADMIN_PATHS.USERS}>
            <Users className="h-4 w-4" aria-hidden="true" />
            Invitar a un usuario
          </Button>
          <Button variant="ghost" fullWidth to={ADMIN_PATHS.BOOKINGS}>
            <Ticket className="h-4 w-4" aria-hidden="true" />
            Revisar reservas pendientes
          </Button>
        </div>
      </Card>
    </section>
  </>
)

export default DashboardPage
