import { useState, useEffect, useMemo } from 'react'
import { Tag, MapPin } from 'lucide-react'
import Button from '../components/atoms/Button'
import Select from '../components/atoms/Select'
import DestinationCard from '../components/organisms/DestinationCard'
import PageHeader from '../components/atoms/PageHeader'
import FiltersCard from '../components/molecules/FiltersCard'
import { travelService } from '../services/TravelsService'
import { PUBLIC_PATHS } from '../constants/paths'

const sortOptions = [
  { value: 'recommended', label: 'Recomendados' },
  { value: 'price-asc', label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
]

const OffersPage = () => {
  const [offers, setOffers]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  const [onlyOffers, setOnlyOffers] = useState(false)
  const [sortBy, setSortBy] = useState('recommended')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 })

  useEffect(() => {
    travelService.getOnSale()
      .then(data => setOffers(data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const handleClearFilters = () => {
    setOnlyOffers(false)
    setSortBy('recommended')
    setPriceRange({ min: 0, max: 5000 })
  }

  const filtered = useMemo(() => {
    let result = offers.filter(t => {
      const price = t.price || t.halfBoardPrice || 0
      const matchPrice = price >= priceRange.min && price <= priceRange.max
      return matchPrice
    })

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => (a.price || a.halfBoardPrice || 0) - (b.price || b.halfBoardPrice || 0))
        break
      case 'price-desc':
        result.sort((a, b) => (b.price || b.halfBoardPrice || 0) - (a.price || a.halfBoardPrice || 0))
        break
      default:
        break
    }

    return result
  }, [offers, onlyOffers, sortBy, priceRange])

  return (
    <div className="container-page py-12">
      <PageHeader
        eyebrow="Ofertas"
        title="Viajes en oferta ahora mismo"
        description="Aprovecha los precios rebajados en estos destinos seleccionados."
      />

      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-brand-400">Resultados</p>
          <h2 className="text-2xl font-bold text-ink">{filtered.length} ofertas encontradas</h2>
        </div>
        <div className="flex items-center gap-3">
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-48"
          />
        </div>
      </div>

      {error && (
        <div className="mt-6 rounded-lg bg-red-50 p-4 text-red-700">{error}</div>
      )}

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <FiltersCard
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          onlyOffers={onlyOffers}
          setOnlyOffers={setOnlyOffers}
          onClearFilters={handleClearFilters}
        />

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-2xl bg-surface-800" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
            <Tag className="h-10 w-10 text-brand-400" />
            <p className="text-lg font-semibold text-white">No hay ofertas disponibles</p>
            <p className="text-sm text-ink-muted">Vuelve pronto, publicamos nuevas ofertas con frecuencia.</p>
            <Button to={PUBLIC_PATHS.SEARCH}>Explorar destinos</Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map(travel => (
              <DestinationCard
                key={travel.id}
                destination={travel}
                showOfferPrice
                featured
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default OffersPage