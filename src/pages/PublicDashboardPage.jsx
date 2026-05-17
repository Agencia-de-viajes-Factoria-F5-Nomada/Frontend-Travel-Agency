import { CalendarRange, MapPinned, Ticket, Users } from 'lucide-react'
import Badge from '../components/atoms/Badge'
import Card from '../components/atoms/Card'
import StatusPill from '../components/organisms/StatusPill'
import { BOOKINGS } from '../constants/mockData'
import { formatCurrency } from '../utils/formatters'

const DASHBOARD_STATS = [
  { label: 'Reservas activas', value: '128', icon: Ticket },
  { label: 'Nuevos usuarios', value: '54', icon: Users },
  { label: 'Destinos', value: '32', icon: MapPinned },
  { label: 'Proximos viajes', value: '47', icon: CalendarRange },
]

const dashboardRows = Array.from(
  { length: 8 },
  (_, index) => BOOKINGS[index % BOOKINGS.length],
)

const PublicDashboardPage = () => (
  <section className="container-page py-8 lg:py-12">
    <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
      <aside className="rounded-card border border-brand-500/25 bg-surface-800 p-5 shadow-card">
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Resumen de actividad y reservas recientes.
        </p>

        <div className="mt-8 grid gap-4">
          {DASHBOARD_STATS.map((stat) => (
            <div key={stat.label} className="border-t border-brand-500/25 pt-4">
              <div className="flex items-center gap-3 text-ink-soft">
                <stat.icon className="h-4 w-4 text-brand-200" aria-hidden="true" />
                <span className="text-sm">{stat.label}</span>
              </div>
              <p className="mt-2 text-2xl font-semibold text-white">{stat.value}</p>
            </div>
          ))}
        </div>
      </aside>

      <Card className="overflow-hidden border-brand-500/30 bg-surface-900/80 p-4">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] border-separate border-spacing-0 text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-white">
              <tr className="bg-brand-400">
                <th scope="col" className="rounded-l-full px-6 py-4 font-semibold">ID</th>
                <th scope="col" className="px-6 py-4 font-semibold">Cliente</th>
                <th scope="col" className="px-6 py-4 font-semibold">Destino</th>
                <th scope="col" className="px-6 py-4 font-semibold">Fechas</th>
                <th scope="col" className="px-6 py-4 font-semibold">Estado</th>
                <th scope="col" className="rounded-r-full px-6 py-4 text-right font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {dashboardRows.map((booking, index) => (
                <tr key={`${booking.id}-${index}`} className="text-brand-200">
                  <td className="border-b border-brand-500/30 px-6 py-3 font-medium text-white">{booking.id}</td>
                  <td className="border-b border-brand-500/30 px-6 py-3">{booking.name}</td>
                  <td className="border-b border-brand-500/30 px-6 py-3">{booking.destination}</td>
                  <td className="border-b border-brand-500/30 px-6 py-3">{booking.dates}</td>
                  <td className="border-b border-brand-500/30 px-6 py-3">
                    <StatusPill status={booking.status} />
                  </td>
                  <td className="border-b border-brand-500/30 px-6 py-3 text-right">
                    <Badge tone="brand">{formatCurrency(booking.total)}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  </section>
)

export default PublicDashboardPage
