import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import PageHeader from '../components/ui/PageHeader'
import { travelService } from '../services/TravelsService'
import { PUBLIC_PATHS } from '../constants/paths'

const DestinationsPage = () => {
  const [travels, setTravels]   = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [search, setSearch]     = useState('')
  const navigate                = useNavigate()

  useEffect(() => {
    travelService.getAvailable()
      .then(data => setTravels(data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const filtered = travels.filter(t =>
    t.destiny?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <PageHeader
        eyebrow="Catálogo"
        title="Destinos disponibles"
        description="Explora todos los viajes disponibles y encuentra el tuyo."
      />

      {/* Buscador */}
      <div className="mt-6 flex items-center gap-3 rounded-xl border border-surface-600 bg-surface-900 px-4">
        <MapPin className="h-4 w-4 text-brand-400" aria-hidden="true" />
        <input
          type="text"
          placeholder="Filtrar por destino..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="h-11 w-full bg-transparent text-ink placeholder:text-ink-muted focus:outline-none"
        />
      </div>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 p-4 text-red-700">{error}</div>
      )}

      {loading ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-2xl bg-surface-800" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="mt-12 text-center">
          <MapPin className="mx-auto h-10 w-10 text-brand-400" />
          <p className="mt-3 text-lg font-semibold text-white">No se encontraron destinos</p>
          <p className="text-sm text-ink-muted">Prueba con otro término de búsqueda</p>
        </div>
      ) : (
        <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map(travel => (
            <Card
              key={travel.id}
              className="overflow-hidden cursor-pointer hover:ring-2 transition-all"
              style={{ '--tw-ring-color': '#4A8FA8' }}
              onClick={() => navigate(`/destinations/${travel.id}`)}
            >
              {/* Imagen o placeholder */}
              <div className="relative h-40 bg-surface-800">
                {travel.imageUrl ? (
                  <img
                    src={travel.imageUrl}
                    alt={travel.destiny}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <MapPin className="h-10 w-10 text-brand-400" />
                  </div>
                )}
                {travel.sale && (
                  <span className="absolute left-3 top-3 rounded-full px-2 py-1 text-xs font-bold text-white"
                    style={{ background: '#4A8FA8' }}>
                    OFERTA
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-3 p-5">
                <div>
                  <h3 className="text-lg font-semibold text-white">{travel.destiny}</h3>
                  <p className="text-sm text-ink-muted">
                    {travel.startDate} → {travel.endDate}
                  </p>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink-soft">
                    {travel.availablePlaces} plazas disponibles
                  </span>
                </div>
                <Button
                  size="sm"
                  fullWidth
                  onClick={e => { e.stopPropagation(); navigate(`/destinations/${travel.id}`) }}
                >
                  Ver detalles
                </Button>
              </div>
            </Card>
          ))}
        </section>
      )}
    </>
  )
}

export default DestinationsPage