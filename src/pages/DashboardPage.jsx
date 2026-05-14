import { useState, useEffect } from 'react'
import { CalendarRange, MapPinned, Ticket, Users } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import PageHeader from '../components/ui/PageHeader'
import StatCard from '../components/common/StatCard'
import { ADMIN_PATHS } from '../constants/paths'
import { bookingService } from '../services/BookingService'
import { userService } from '../services/UserService'
import { travelService } from '../services/TravelsService'

const DashboardPage = () => {
  const [stats, setStats]     = useState({ bookings: 0, users: 0, travels: 0, upcoming: 0 })
  const [recent, setRecent]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const [bRes, uRes, tRes] = await Promise.allSettled([
        bookingService.getAll(),
        userService.getAll(),
        travelService.getAvailable(),
      ])
      const b = bRes.status === 'fulfilled' ? bRes.value : []
      const u = uRes.status === 'fulfilled' ? uRes.value : []
      const t = tRes.status === 'fulfilled' ? tRes.value : []
      const now = new Date()
      const upcoming = t.filter(tr => tr.startDate && new Date(tr.startDate) > now).length
      setStats({ bookings: b.length, users: u.length, travels: t.length, upcoming })
      setRecent(b.slice(0, 5))
      setLoading(false)
    }
    load()
  }, [])

  const STATS_CONFIG = [
    { label: 'Reservas totales',  value: String(stats.bookings), icon: Ticket },
    { label: 'Usuarios',          value: String(stats.users),    icon: Users },
    { label: 'Destinos',          value: String(stats.travels),  icon: MapPinned },
    { label: 'Próximos viajes',   value: String(stats.upcoming), icon: CalendarRange },
  ]

  return (
    <>
      <PageHeader
        eyebrow="Resumen"
        title="Panel de operaciones"
        description="Vista general de reservas, clientes y estado del contenido."
        actions={<Button to={ADMIN_PATHS.BOOKINGS}>Gestionar reservas</Button>}
      />

      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS_CONFIG.map(stat => <StatCard key={stat.label} {...stat} />)}
      </section>

      <section className="mt-10 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Reservas recientes</h2>
            <Button variant="ghost" size="sm" to={ADMIN_PATHS.BOOKINGS}>Ver todas</Button>
          </div>
          <div className="mt-5 overflow-x-auto">
            {loading ? (
              <p className="py-8 text-center text-sm text-gray-400">Cargando...</p>
            ) : recent.length === 0 ? (
              <p className="py-8 text-center text-sm text-gray-400">No hay reservas</p>
            ) : (
              <table className="w-full min-w-[500px] border-separate border-spacing-0 text-left text-sm">
                <thead className="text-xs uppercase tracking-wide">
                  <tr className="bg-brand-400">
                    <th className="rounded-l-full px-5 py-3 font-semibold text-white">ID</th>
                    <th className="px-5 py-3 font-semibold text-white">Cliente</th>
                    <th className="px-5 py-3 font-semibold text-white">Destino</th>
                    <th className="rounded-r-full px-5 py-3 font-semibold text-white">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((b, i) => (
                    <tr key={b.id ?? i} className="text-brand-200">
                      <td className="border-b border-brand-500/30 px-5 py-3 font-medium text-white">{b.id}</td>
                      <td className="border-b border-brand-500/30 px-5 py-3">{b.customerName ?? b.userName ?? '—'}</td>
                      <td className="border-b border-brand-500/30 px-5 py-3">{b.destination ?? b.travelName ?? '—'}</td>
                      <td className="border-b border-brand-500/30 px-5 py-3">{b.bookingDate ?? b.startDate ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
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
              Gestionar usuarios
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
}

export default DashboardPage