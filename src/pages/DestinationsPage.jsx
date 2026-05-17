import { useState, useEffect } from 'react'
import { MapPin } from 'lucide-react'
import Button from '../components/atoms/Button'
import Card from '../components/atoms/Card'
import PageHeader from '../components/atoms/PageHeader'
import { travelService } from '../services/TravelsService'

const DestinationsPage = () => {
  const [travels, setTravels]   = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [search, setSearch]     = useState('')

  useEffect(() => {
    travelService.getAvailable()
      .then(data => setTravels(data))
      .catch(e => setError(e.message || 'Error al cargar los viajes'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = travels.filter(t =>
    (t.destiny || t.name || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="container-page py-12">
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
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(travel => (
            <DestinationCard
              key={travel.id}
              destination={travel}
              showOfferPrice={travel.sale === true}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default DestinationsPage