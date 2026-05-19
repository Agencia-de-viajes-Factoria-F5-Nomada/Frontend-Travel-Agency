import { useState, useEffect, useMemo } from 'react'
import { MapPin } from 'lucide-react'
import Select from '../components/atoms/Select'
import DestinationCard from '../components/organisms/DestinationCard'
import TravelSearch from '../components/molecules/TravelSearch'
import FiltersCard from '../components/molecules/FiltersCard'
import { travelService } from '../services/TravelsService'

const POPULAR = ['Londres', 'París', 'Roma', 'Tokio']

const TravelsPage = () => {
  const [travels, setTravels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [searchMode, setSearchMode] = useState('dates')

  const [search, setSearch] = useState({
    destiny: '',
    startDate: '',
    endDate: '',
    month: '',
    passengers: 2,
  })

  const [appliedSearch, setAppliedSearch] = useState({
    destiny: '',
    startDate: '',
    endDate: '',
    month: '',
    passengers: 2,
  })

  const [onlyOffers, setOnlyOffers] = useState(false)
  const [sortBy, setSortBy] = useState('recommended')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 })

  useEffect(() => {
    travelService.getAvailable()
      .then(data => setTravels(data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    setAppliedSearch({ ...search })
  }

  const handlePopularClick = (destiny) => {
    setSearch(s => ({ ...s, destiny }))
  }

  const handleClearFilters = () => {
    setSearch({ destiny: '', startDate: '', endDate: '', month: '', passengers: 2 })
    setAppliedSearch({ destiny: '', startDate: '', endDate: '', month: '', passengers: 2 })
    setOnlyOffers(false)
    setSortBy('recommended')
    setPriceRange({ min: 0, max: 5000 })
  }

  const sortOptions = [
    { value: 'recommended', label: 'Recomendados' },
    { value: 'price-asc', label: 'Precio: menor a mayor' },
    { value: 'price-desc', label: 'Precio: mayor a menor' },
    { value: 'date-asc', label: 'Fecha: más cercano' },
    { value: 'date-desc', label: 'Fecha: más lejano' },
  ]

  const filtered = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    let result = travels.filter(t => {
      const matchFuture = new Date(t.startDate) >= today

      const matchDestiny = !appliedSearch.destiny ||
        t.destiny?.toLowerCase().includes(appliedSearch.destiny.toLowerCase()) ||
        t.hotelCity?.toLowerCase().includes(appliedSearch.destiny.toLowerCase())

      const matchOffer = onlyOffers ? t.sale === true : true

      if (searchMode === 'dates') {
        const matchStartDate = !appliedSearch.startDate ||
          new Date(t.startDate) >= new Date(appliedSearch.startDate)
        const matchEndDate = !appliedSearch.endDate ||
          new Date(t.endDate) <= new Date(appliedSearch.endDate)
        if (!(matchStartDate && matchEndDate)) return false
      } else if (searchMode === 'month' && appliedSearch.month) {
        const [year, month] = appliedSearch.month.split('-').map(Number)
        const tripStart = new Date(t.startDate)
        const monthStart = new Date(year, month - 1, 1)
        const monthEnd = new Date(year, month, 0, 23, 59, 59)
        if (!(tripStart >= monthStart && tripStart <= monthEnd)) return false
      }

      const price = t.price || t.halfBoardPrice || 0
      const matchPrice = price >= priceRange.min && price <= priceRange.max

      return matchFuture && matchDestiny && matchOffer && matchPrice
    })

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => (a.price || a.halfBoardPrice || 0) - (b.price || b.halfBoardPrice || 0))
        break
      case 'price-desc':
        result.sort((a, b) => (b.price || b.halfBoardPrice || 0) - (a.price || a.halfBoardPrice || 0))
        break
      case 'date-asc':
        result.sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
        break
      case 'date-desc':
        result.sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
        break
      default:
        break
    }

    return result
  }, [travels, appliedSearch, onlyOffers, sortBy, priceRange, searchMode])

  return (
    <>
      <TravelSearch
        searchMode={searchMode}
        setSearchMode={setSearchMode}
        search={search}
        setSearch={setSearch}
        onSearch={handleSearch}
        onPopularClick={handlePopularClick}
      />

      {/* ── RESULTADOS Y FILTROS ── */}
      <div className="container-page py-12">
        {/* Cabecera de resultados */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-brand-400">Resultados</p>
            <h2 className="text-2xl font-bold text-ink">{filtered.length} viajes encontrados</h2>
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
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">{error}</div>
        )}

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <FiltersCard
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            onlyOffers={onlyOffers}
            setOnlyOffers={setOnlyOffers}
            onClearFilters={handleClearFilters}
          />

          {/* Grid de resultados */}
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
              <p className="text-sm text-ink-muted">Prueba con otro destino o cambia los filtros</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map(travel => (
                <DestinationCard key={travel.id} destination={travel} showOfferPrice={travel.sale === true} featured />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default TravelsPage
