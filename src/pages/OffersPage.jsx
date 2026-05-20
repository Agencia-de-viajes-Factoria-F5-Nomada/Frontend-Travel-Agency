import { useState, useEffect, useMemo } from 'react'
import { Tag } from 'lucide-react'
import Button from '../components/atoms/Button'
import Select from '../components/atoms/Select'
import DestinationCard from '../components/organisms/DestinationCard'
import PageHeader from '../components/atoms/PageHeader'
import FiltersCard from '../components/molecules/FiltersCard'
import { travelService } from '../services/travelsService'
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

  // Filtros existentes
  const [onlyOffers, setOnlyOffers] = useState(false)
  const [sortBy, setSortBy] = useState('recommended')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 })

  // Nuevos filtros
  const [selectedRegions, setSelectedRegions] = useState([])
  const [durationRange, setDurationRange] = useState(null)
  const [starFilter, setStarFilter] = useState([])
  const [availabilityOnly, setAvailabilityOnly] = useState(false)
  const [minDiscount, setMinDiscount] = useState(null)
  const [boardType, setBoardType] = useState('half')

  useEffect(() => {
    travelService.getOnSale()
      .then(data => setOffers(data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  // Extraer regiones unicas
  const regions = useMemo(() => {
    const set = new Set()
    offers.forEach(t => {
      const region = t.hotelCountry || t.country
      if (region) set.add(region)
    })
    return [...set].sort()
  }, [offers])

  const handleClearFilters = () => {
    setOnlyOffers(false)
    setSortBy('recommended')
    setPriceRange({ min: 0, max: 5000 })
    setSelectedRegions([])
    setDurationRange(null)
    setStarFilter([])
    setAvailabilityOnly(false)
    setMinDiscount(null)
    setBoardType('half')
  }

  const filtered = useMemo(() => {
    let result = offers.filter(t => {
      const price = boardType === 'full'
        ? (t.fullBoardPrice || t.halfBoardPrice || 0)
        : (t.halfBoardPrice || t.price || 0)
      const matchPrice = price >= priceRange.min && price <= priceRange.max

      // Region / Pais
      const matchRegion = selectedRegions.length === 0 ||
        selectedRegions.includes(t.hotelCountry) ||
        selectedRegions.includes(t.country)

      // Duracion en dias
      let matchDuration = true
      if (durationRange && t.startDate && t.endDate) {
        const days = Math.ceil(
          (new Date(t.endDate) - new Date(t.startDate)) / (1000 * 60 * 60 * 24)
        )
        matchDuration = days >= durationRange.min && days <= durationRange.max
      }

      // Estrellas del hotel
      const stars = t.hotelStars || t.stars || t.rating
      const matchStars = starFilter.length === 0 || (stars && starFilter.includes(stars))

      // Disponibilidad
      const matchAvailability = !availabilityOnly || (t.availablePlaces && t.availablePlaces > 0)

      // Descuento minimo
      const matchDiscount = !minDiscount ||
        (t.discountPercentage && t.discountPercentage >= minDiscount)

      return matchPrice && matchRegion && matchDuration &&
             matchStars && matchAvailability && matchDiscount
    })

    const getPrice = (t) => boardType === 'full'
      ? (t.fullBoardPrice || t.halfBoardPrice || 0)
      : (t.halfBoardPrice || t.price || 0)

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => getPrice(a) - getPrice(b))
        break
      case 'price-desc':
        result.sort((a, b) => getPrice(b) - getPrice(a))
        break
      default:
        break
    }

    return result
  }, [offers, onlyOffers, sortBy, priceRange, selectedRegions, durationRange,
      starFilter, availabilityOnly, minDiscount, boardType])

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
          regions={regions}
          selectedRegions={selectedRegions}
          setSelectedRegions={setSelectedRegions}
          durationRange={durationRange}
          setDurationRange={setDurationRange}
          starFilter={starFilter}
          setStarFilter={setStarFilter}
          availabilityOnly={availabilityOnly}
          setAvailabilityOnly={setAvailabilityOnly}
          minDiscount={minDiscount}
          setMinDiscount={setMinDiscount}
          boardType={boardType}
          setBoardType={setBoardType}
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
                boardType={boardType}
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
