import { useEffect, useState } from 'react'
import { CalendarRange, MapPinned, Ticket, Users } from 'lucide-react'
import Button from '../components/atoms/Button'
import Card from '../components/atoms/Card'
import PageHeader from '../components/atoms/PageHeader'
import StatCard from '../components/organisms/StatCard'
import StatusPill from '../components/organisms/StatusPill'
import { ADMIN_PATHS } from '../constants/paths'
import { API } from '../services/api'
import { formatCurrency } from '../utils/formatters'

const DashboardPage = () => {
  const [dashData, setDashData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token')
        const headers = { 'Content-Type': 'application/json' }
        if (token) {
          headers['Authorization'] = `Bearer ${token}`
        }

        const res = await fetch(`${API}/dashboard`, { headers })

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}))
          throw new Error(`Error ${res.status}: ${errorData.error || 'Error desconocido'}`)
        }

        const json = await res.json()
        setDashData(json)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchDashboard()
  }, [])

  const totalViajes = dashData
    ? Object.values(dashData.travelsPerYear).reduce((a, b) => a + b, 0)
    : '—'

  const STATS = [
    { label: 'Ingresos este año', value: dashData ? formatCurrency(dashData.currentYearEarnings) : '—', icon: Ticket },
    { label: 'Total viajes históricos', value: loading ? '—' : totalViajes, icon: CalendarRange },
    { label: 'Años con actividad', value: loading ? '—' : Object.keys(dashData?.travelsPerYear ?? {}).length, icon: MapPinned },
    { label: 'Top destino', value: loading ? '—' : (dashData?.topTravels?.[0]?.destiny ?? '—'), icon: Users },
  ]

  return (
    <>
      <PageHeader
        eyebrow="Resumen"
        title="Panel de operaciones"
        description="Vista general de reservas, clientes y estado del contenido."
        actions={<Button to={ADMIN_PATHS.BOOKINGS}>Gestionar reservas</Button>}
      />

      {error && (
        <div className="mt-4 rounded-lg border border-red-400 bg-red-50 px-4 py-3 text-sm text-red-700">
          ⚠️ No se pudo cargar el dashboard: <strong>{error}</strong>
        </div>
      )}

      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="mt-10 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Top 3 viajes por facturación</h2>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[480px] border-separate border-spacing-0 text-left text-sm">
              <thead className="text-xs uppercase tracking-wide">
                <tr className="bg-accent">
                  <th scope="col" className="rounded-l-full px-5 py-3 font-semibold text-white">#</th>
                  <th scope="col" className="px-5 py-3 font-semibold text-white">Destino</th>
                  <th scope="col" className="rounded-r-full px-5 py-3 font-semibold text-white">Facturación</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={3} className="px-5 py-4 text-brand-200">Cargando...</td></tr>
                ) : (
                  (dashData?.topTravels ?? []).map((t, i) => (
                    <tr key={t.travelId} className="text-brand-200">
                      <td className="border-b border-brand-500/30 px-5 py-3 font-medium text-white">
                        {['🥇', '🥈', '🥉'][i]}
                      </td>
                      <td className="border-b border-brand-500/30 px-5 py-3">{t.destiny}</td>
                      <td className="border-b border-brand-500/30 px-5 py-3">{formatCurrency(t.revenue)}</td>
                    </tr>
                  ))
                )}
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
          </div>
        </Card>
      </section>
    </>
  )
}

export default DashboardPage