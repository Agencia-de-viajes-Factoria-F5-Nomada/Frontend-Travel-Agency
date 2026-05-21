import { useState, useEffect, useMemo } from 'react'
import { MapPin, Search, Calendar, Users, Plane, Hotel, Ticket } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/atoms/PageHeader'
import Select from '../components/atoms/Select'
import DestinationCard from '../components/organisms/DestinationCard'
import FiltersCard from '../components/molecules/FiltersCard'
import { travelService } from '../services/travelsService'
import { bookingService } from '../services/BookingService'
import { authService } from '../services/authService'
import { getCountriesForContinents } from '../constants/continents'

const TABS = [
  { id: 'search', label: 'Viaje' },
  { id: 'custom', label: 'Destino flexible' },
]

const sortOptions = [
  { value: 'recommended', label: 'Recomendados' },
  { value: 'price-asc', label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
]

const DestinationsPage = () => {
  const [travels, setTravels]     = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)
  const [tab, setTab]             = useState('search')
  const [sending, setSending]     = useState(false)
  const [sent, setSent]           = useState(false)
  const [formError, setFormError] = useState(null)
  const [sortBy, setSortBy]       = useState('recommended')
  const navigate                  = useNavigate()

  const [search, setSearch] = useState({
    destiny: '', startDate: '', endDate: '', passengers: 2,
    includesFlight: false, includesHotel: false, includesActivities: false,
  })

  const [priceRange, setPriceRange]           = useState({ min: 0, max: 5000 })
  const [selectedRegions, setSelectedRegions] = useState([])
  const [selectedContinents, setSelectedContinents] = useState([])
  const [durationRange, setDurationRange]     = useState(null)
  const [starFilter, setStarFilter]           = useState([])
  const [availabilityOnly, setAvailabilityOnly] = useState(false)
  const [minDiscount, setMinDiscount]         = useState(null)
  const [boardType, setBoardType]             = useState('half')

  useEffect(() => {
    travelService.getAvailable()
      .then(data => setTravels(data))
      .catch(e => setError(e.message || 'Error al cargar los viajes'))
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
    setPriceRange({ min: 0, max: 5000 })
    setSelectedRegions([])
    setSelectedContinents([])
    setDurationRange(null)
    setStarFilter([])
    setAvailabilityOnly(false)
    setMinDiscount(null)
    setBoardType('half')
    setSortBy('recommended')
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const filtered = useMemo(() => {
    const continentCountries = getCountriesForContinents(selectedContinents)

    let result = travels.filter(t => {
      const matchesSearch = (t.destiny || t.name || '').toLowerCase().includes(search.destiny.toLowerCase())
      const isFuture = t.startDate ? new Date(t.startDate) >= today : true
      const price = boardType === 'full'
        ? (t.fullBoardPrice || t.halfBoardPrice || 0)
        : (t.halfBoardPrice || t.price || 0)
      const matchPrice = price >= priceRange.min && price <= priceRange.max

      const country = t.hotelCountry || t.country
      const matchContinent = continentCountries.length === 0 || continentCountries.includes(country)

      const matchRegion = selectedRegions.length === 0 ||
        selectedRegions.includes(t.hotelCountry) || selectedRegions.includes(t.country)
      let matchDuration = true
      if (durationRange && t.startDate && t.endDate) {
        const days = Math.ceil((new Date(t.endDate) - new Date(t.startDate)) / (1000 * 60 * 60 * 24))
        matchDuration = days >= durationRange.min && days <= durationRange.max
      }
      const stars = t.hotelStars || t.stars || t.rating
      const matchStars = starFilter.length === 0 || (stars && starFilter.includes(stars))
      const matchAvailability = !availabilityOnly || (t.availablePlaces && t.availablePlaces > 0)
      const matchDiscount = !minDiscount || (t.discountPercentage && t.discountPercentage >= minDiscount)
      return matchesSearch && isFuture && matchPrice && matchContinent && matchRegion &&
             matchDuration && matchStars && matchAvailability && matchDiscount
    })

    const getPrice = (t) => boardType === 'full'
      ? (t.fullBoardPrice || t.halfBoardPrice || 0)
      : (t.halfBoardPrice || t.price || 0)

    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => getPrice(a) - getPrice(b)); break
      case 'price-desc': result.sort((a, b) => getPrice(b) - getPrice(a)); break
      default: break
    }

    return result
  }, [travels, search.destiny, priceRange, selectedRegions, selectedContinents, durationRange,
      starFilter, availabilityOnly, minDiscount, boardType, sortBy])

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (search.destiny) params.set('destiny', search.destiny)
    if (search.startDate) params.set('startDate', search.startDate)
    if (search.endDate) params.set('endDate', search.endDate)
    if (search.passengers) params.set('passengers', search.passengers)
    navigate(`/search?${params.toString()}`)
  }

  const handleCustomSubmit = async (e) => {
    e.preventDefault()
    if (!authService.isAuthenticated()) { navigate('/auth'); return }
    setSending(true)
    setFormError(null)
    try {
      await bookingService.create({
        customDestiny: search.destiny,
        customStartDate: search.startDate,
        customEndDate: search.endDate,
        passengers: search.passengers,
        includesFlight: search.includesFlight,
        includesHotel: search.includesHotel,
        includesActivities: search.includesActivities,
        boughtDate: new Date().toISOString(),
        isGroup: search.passengers >= 10,
      })
      setSent(true)
    } catch (e) {
      setFormError(e.message || 'Error al enviar la solicitud')
    } finally {
      setSending(false)
    }
  }

  const SERVICES = [
    { key: 'includesFlight',     label: 'Vuelo',       icon: Plane },
    { key: 'includesHotel',      label: 'Hotel',       icon: Hotel },
    { key: 'includesActivities', label: 'Actividades', icon: Ticket },
  ]

  return (
    <div className="container-page py-12">
      <PageHeader
        eyebrow="Catálogo"
        title="Destinos disponibles"
        description="Busca entre nuestros destinos o diseña tu viaje a medida."
      />

      {/* ── BARRA UNIFICADA ── */}
      <div className="mt-6 rounded-2xl border border-surface-600 overflow-hidden" style={{ background: 'rgba(218,238,247,0.04)' }}>
        <div className="grid grid-cols-2 border-b border-surface-600">
          {TABS.map(t => (
            <button key={t.id} type="button"
              onClick={() => { setTab(t.id); setSent(false); setFormError(null) }}
              className="py-3 text-sm font-semibold transition-colors"
              style={{
                color: tab === t.id ? '#DAEEF7' : '#6B7280',
                background: tab === t.id ? 'rgba(74,143,168,0.15)' : 'transparent',
                borderBottom: tab === t.id ? '2px solid #4A8FA8' : '2px solid transparent',
              }}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row items-stretch divide-y lg:divide-y-0 lg:divide-x divide-surface-600">
          <div className="flex flex-col flex-[2] px-4 py-3">
            <span style={{ fontSize: 10, color: '#4A8FA8', letterSpacing: '0.1em' }} className="uppercase mb-1">Viaje</span>
            <div className="flex items-center gap-2">
              <MapPin size={14} style={{ color: '#4A8FA8', flexShrink: 0 }} />
              <input type="text" placeholder={tab === 'custom' ? 'Cualquier lugar' : 'Viaje'} value={search.destiny}
                onChange={e => setSearch(s => ({ ...s, destiny: e.target.value }))}
                style={{ background: 'transparent', border: 'none', outline: 'none', color: '#DAEEF7', fontSize: 14, width: '100%' }}
                className="placeholder:text-white/25" />
            </div>
          </div>

          <div className="flex flex-col flex-1 px-4 py-3">
            <span style={{ fontSize: 10, color: '#4A8FA8', letterSpacing: '0.1em' }} className="uppercase mb-1">Salida</span>
            <div className="flex items-center gap-2">
              <Calendar size={14} style={{ color: '#4A8FA8', flexShrink: 0 }} />
              <input type="date" value={search.startDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={e => setSearch(s => ({ ...s, startDate: e.target.value }))}
                style={{ colorScheme: 'dark', background: 'transparent', border: 'none', outline: 'none', color: search.startDate ? '#DAEEF7' : 'rgba(218,238,247,0.25)', fontSize: 13, width: '100%' }} />
            </div>
          </div>

          <div className="flex flex-col flex-1 px-4 py-3">
            <span style={{ fontSize: 10, color: '#4A8FA8', letterSpacing: '0.1em' }} className="uppercase mb-1">Vuelta</span>
            <div className="flex items-center gap-2">
              <Calendar size={14} style={{ color: '#4A8FA8', flexShrink: 0 }} />
              <input type="date" value={search.endDate}
                min={search.startDate || new Date().toISOString().split('T')[0]}
                onChange={e => setSearch(s => ({ ...s, endDate: e.target.value }))}
                style={{ colorScheme: 'dark', background: 'transparent', border: 'none', outline: 'none', color: search.endDate ? '#DAEEF7' : 'rgba(218,238,247,0.25)', fontSize: 13, width: '100%' }} />
            </div>
          </div>

          <div className="flex flex-col flex-1 px-4 py-3">
            <span style={{ fontSize: 10, color: '#4A8FA8', letterSpacing: '0.1em' }} className="uppercase mb-1">Viajeros</span>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Users size={14} style={{ color: '#4A8FA8' }} />
                <span style={{ fontSize: 13, color: 'rgba(218,238,247,0.7)' }}>{search.passengers}</span>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setSearch(s => ({ ...s, passengers: Math.max(1, s.passengers - 1) }))}
                  style={{ width: 20, height: 20, borderRadius: '50%', border: '0.5px solid rgba(74,143,168,0.4)', background: 'transparent', color: '#7AAFC0', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                <button type="button" onClick={() => setSearch(s => ({ ...s, passengers: Math.min(50, s.passengers + 1) }))}
                  style={{ width: 20, height: 20, borderRadius: '50%', border: '0.5px solid rgba(74,143,168,0.4)', background: 'transparent', color: '#7AAFC0', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
              </div>
            </div>
          </div>

          {tab === 'custom' && (
            <div className="flex flex-col px-4 py-3 gap-2">
              <span style={{ fontSize: 10, color: '#4A8FA8', letterSpacing: '0.1em' }} className="uppercase mb-1">Incluir</span>
              <div className="flex gap-2">
                {SERVICES.map(({ key, label, icon: Icon }) => (
                  <button key={key} type="button"
                    onClick={() => setSearch(s => ({ ...s, [key]: !s[key] }))}
                    title={label}
                    className="flex flex-col items-center gap-1 rounded-lg px-2 py-1 transition-colors"
                    style={{ background: search[key] ? 'rgba(74,143,168,0.25)' : 'transparent', border: `1px solid ${search[key] ? '#4A8FA8' : 'rgba(255,255,255,0.1)'}` }}>
                    <Icon size={14} style={{ color: search[key] ? '#DAEEF7' : '#6B7280' }} />
                    <span style={{ fontSize: 9, color: search[key] ? '#DAEEF7' : '#6B7280' }}>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center px-4 py-3">
            <button type="button"
              onClick={tab === 'search' ? handleSearch : handleCustomSubmit}
              disabled={sending}
              style={{ background: '#4A8FA8', color: '#DAEEF7', border: 'none', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
              {tab === 'search'
                ? <><Search size={14} /> Buscar</>
                : sending ? 'Enviando...' : <><Plane size={14} /> Solicitar</>}
            </button>
          </div>
        </div>

        <div className="border-t border-surface-600 px-4 py-3 text-sm text-ink-soft">
          El viaje incluye avión, hotel y actividades.
        </div>

        {tab === 'custom' && sent && (
          <div className="flex flex-col items-center gap-2 py-6 text-center border-t border-surface-600">
            <Ticket className="h-8 w-8" style={{ color: '#4A8FA8' }} />
            <p className="font-semibold text-white">¡Solicitud enviada!</p>
            <p className="text-sm text-ink-muted">Nuestro equipo se pondrá en contacto contigo para confirmar los detalles.</p>
            <button onClick={() => { setSent(false); setSearch(s => ({ ...s, destiny: '', startDate: '', endDate: '', passengers: 2, includesFlight: false, includesHotel: false, includesActivities: false })) }}
              style={{ color: '#4A8FA8', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, textDecoration: 'underline', marginTop: 4 }}>
              Crear otra solicitud
            </button>
          </div>
        )}

        {tab === 'custom' && formError && (
          <div className="px-6 pb-4 text-sm text-red-600">{formError}</div>
        )}
      </div>

      {error && <div className="mt-4 rounded-lg bg-red-50 p-4 text-red-700">{error}</div>}

      <div className="mt-8 mb-4 flex flex-wrap items-end justify-between gap-4">
        <p className="text-sm text-ink-muted">{filtered.length} destinos encontrados</p>
        <Select options={sortOptions} value={sortBy} onChange={e => setSortBy(e.target.value)} className="w-48" />
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr] items-start">
        <FiltersCard
          priceRange={priceRange}
          setPriceRange={setPriceRange}
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
          minDiscount={minDiscount}
          setMinDiscount={setMinDiscount}
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
          <div className="mt-12 text-center">
            <MapPin className="mx-auto h-10 w-10 text-brand-400" />
            <p className="mt-3 text-lg font-semibold text-white">No se encontraron destinos</p>
            <p className="text-sm text-ink-muted">Prueba con otro término de búsqueda o ajusta los filtros</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map(travel => (
              <DestinationCard
                key={travel.id}
                destination={travel}
                showOfferPrice={travel.sale === true}
                boardType={boardType}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DestinationsPage
