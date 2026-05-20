import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, MapPin, Tag, Globe } from 'lucide-react'
import Button from '../components/atoms/Button'
import Card from '../components/atoms/Card'
import DestinationCard from '../components/organisms/DestinationCard'
import PageHeader from '../components/atoms/PageHeader'
import { travelService } from '../services/travelsService'
import { formatDate } from '../utils/formatters'

const normalize = (str) =>
  str?.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() ?? ''

const SearchResultsPage = () => {
  const [searchParams]          = useSearchParams()
  const [travels, setTravels]   = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [onlyOffers, setOnlyOffers] = useState(searchParams.get('onlyOffers') === 'true')
  const [search, setSearch]     = useState(searchParams.get('destiny') ?? '')

  const startDateParam = searchParams.get('startDate') ?? ''
  const endDateParam   = searchParams.get('endDate') ?? ''

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  useEffect(() => {
    travelService.getAvailable()
      .then(data => setTravels(data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => travels.filter(t => {
    const matchFuture = new Date(t.startDate) >= today
    const matchDestiny = !search ||
      normalize(t.destiny).includes(normalize(search)) ||
      normalize(t.hotelCity).includes(normalize(search))
    const matchOffer = onlyOffers ? t.sale === true : true
    const matchStartDate = !startDateParam || new Date(t.startDate) >= new Date(startDateParam)
    const matchEndDate = !endDateParam || new Date(t.endDate) <= new Date(endDateParam)
    return matchFuture && matchDestiny && matchOffer && matchStartDate && matchEndDate
  }), [travels, search, onlyOffers, startDateParam, endDateParam])

  return (
    <div className="container-page py-12">
      <PageHeader
        eyebrow="Búsqueda"
        title="Viajes disponibles"
        description={`${filtered.length} destinos encontrados`}
        actions={
          <Button variant="secondary" size="md">
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            Ordenar
          </Button>
        }
      />

      {/* ── Toggle Todos / Ofertas ── */}
      <div className="mt-6 flex gap-2">
        <button
          onClick={() => setOnlyOffers(false)}
          style={{
            padding: '8px 20px',
            borderRadius: 20,
            border: '1.5px solid',
            borderColor: !onlyOffers ? '#4A8FA8' : 'rgba(74,143,168,0.3)',
            background: !onlyOffers ? '#4A8FA8' : 'transparent',
            color: !onlyOffers ? '#DAEEF7' : '#7AAFC0',
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
          <Globe size={14} /> Todos los viajes
        </button>
        <button
          onClick={() => setOnlyOffers(true)}
          style={{
            padding: '8px 20px',
            borderRadius: 20,
            border: '1.5px solid',
            borderColor: onlyOffers ? '#4A8FA8' : 'rgba(74,143,168,0.3)',
            background: onlyOffers ? '#4A8FA8' : 'transparent',
            color: onlyOffers ? '#DAEEF7' : '#7AAFC0',
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
          <Tag size={14} /> Solo ofertas
        </button>
      </div>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 p-4 text-red-700">{error}</div>
      )}

      <div className="mt-6 grid gap-8 lg:grid-cols-[280px_1fr]">

        <Card as="aside" aria-label="Filtros" className="h-fit p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">Filtros</h2>

          <div className="mt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">Destino</p>
            <div className="flex items-center gap-2 rounded-xl border border-surface-600 bg-surface-900 px-3">
              <MapPin className="h-4 w-4 text-brand-400" aria-hidden="true" />
              <input
                type="text"
                placeholder="Buscar destino..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="h-10 w-full bg-transparent text-sm text-ink placeholder:text-ink-muted focus:outline-none"
              />
            </div>
          </div>

          {startDateParam && (
            <div className="mt-4 rounded-lg bg-surface-800 p-3 text-xs text-ink-muted">
              📅 Salida desde: <span className="text-white">{formatDate(startDateParam)}</span>
              {endDateParam && <> · Vuelta hasta: <span className="text-white">{formatDate(endDateParam)}</span></>}
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            fullWidth
            className="mt-6"
            onClick={() => { setSearch(''); setOnlyOffers(false) }}
          >
            Limpiar filtros
          </Button>
        </Card>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-2xl bg-surface-800" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
            <MapPin className="h-10 w-10 text-brand-400" />
            <p className="text-lg font-semibold text-white">Sin resultados</p>
            <p className="text-sm text-ink-muted">Prueba con otro destino o quita los filtros</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map(travel => (
              <DestinationCard
                key={travel.id}
                destination={travel}
                featured
                showOfferPrice={travel.sale === true}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default SearchResultsPage