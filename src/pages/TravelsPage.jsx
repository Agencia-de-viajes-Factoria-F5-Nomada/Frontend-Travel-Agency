import { useState, useEffect, useMemo } from 'react'
import { MapPin } from 'lucide-react'
import DestinationCard from '../components/organisms/DestinationCard'
import FiltersCard from '../components/molecules/FiltersCard'
import { travelService } from '../services/travelsService'
import { getCountriesForContinents } from '../constants/continents'

const TravelsPage = () => {
  const [travels, setTravels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [onlyOffers, setOnlyOffers] = useState(false)
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 })
  const [selectedRegions, setSelectedRegions] = useState([])
  const [selectedContinents, setSelectedContinents] = useState([])
  const [durationRange, setDurationRange] = useState(null)
  const [starFilter, setStarFilter] = useState([])
  const [availabilityOnly, setAvailabilityOnly] = useState(false)
  const [boardType, setBoardType] = useState('half')

  useEffect(() => {
    travelService.getAvailable()
      .then(data => setTravels(data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const regions = useMemo(() => {
    const set = new Set()
    travels.forEach(t => {
      const region = t.hotelCountry || t.country
      if (region) set.add(region)
    })
    return [...set].sort()
  }, [travels])

  const handleClearFilters = () => {
    setOnlyOffers(false)
    setPriceRange({ min: 0, max: 5000 })
    setSelectedRegions([])
    setSelectedContinents([])
    setDurationRange(null)
    setStarFilter([])
    setAvailabilityOnly(false)
    setBoardType('half')
  }

  const filtered = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const continentCountries = getCountriesForContinents(selectedContinents)

    let result = travels.filter(t => {
      const matchFuture = new Date(t.startDate) >= today
      const matchOffer = onlyOffers ? t.sale === true : true

      const price = boardType === 'full'
        ? (t.fullBoardPrice || t.halfBoardPrice || 0)
        : (t.halfBoardPrice || t.price || 0)
      const matchPrice = price >= priceRange.min && price <= priceRange.max

      const country = t.hotelCountry || t.country

      const matchContinent = continentCountries.length === 0 || continentCountries.includes(country)

      const matchRegion = selectedRegions.length === 0 || selectedRegions.includes(country)

      let matchDuration = true
      if (durationRange && t.startDate && t.endDate) {
        const days = Math.ceil(
          (new Date(t.endDate) - new Date(t.startDate)) / (1000 * 60 * 60 * 24)
        )
        matchDuration = days >= durationRange.min && days <= durationRange.max
      }

      const stars = t.hotelStars || t.stars || t.rating
      const matchStars = starFilter.length === 0 || (stars && starFilter.includes(stars))

      const matchAvailability = !availabilityOnly || (t.availablePlaces && t.availablePlaces > 0)

      return matchFuture && matchOffer && matchPrice &&
             matchContinent && matchRegion && matchDuration && matchStars && matchAvailability
    })

    return result
  }, [travels, onlyOffers, priceRange, selectedRegions, selectedContinents, durationRange, starFilter, availabilityOnly, boardType])

  return (
    <div className="container-page py-12">
      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">{error}</div>
      )}

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <FiltersCard
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          onlyOffers={onlyOffers}
          setOnlyOffers={setOnlyOffers}
          regions={regions}
          selectedRegions={selectedRegions}
          setSelectedRegions={setSelectedRegions}
          selectedContinents={selectedContinents}
          setSelectedContinents={setSelectedContinents}
          durationRange={durationRange}
          setDurationRange={setDurationRange}
          starFilter={starFilter}
          setStarFilter={setStarFilter}
          availabilityOnly={availabilityOnly}
          setAvailabilityOnly={setAvailabilityOnly}
          boardType={boardType}
          setBoardType={setBoardType}
          onClearFilters={handleClearFilters}
        />

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
            <p className="text-sm text-ink-muted">Prueba a cambiar los filtros</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map(travel => (
              <DestinationCard key={travel.id} destination={travel} showOfferPrice={travel.sale === true} boardType={boardType} featured />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TravelsPage
