import { useState, useEffect, useMemo } from 'react'
import { MapPin, Search, Calendar, Users, SlidersHorizontal } from 'lucide-react'
import Button from '../components/atoms/Button'
import Card from '../components/atoms/Card'
import Select from '../components/atoms/Select'
import DestinationCard from '../components/organisms/DestinationCard'
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
      {/* ── BUSCADOR HORIZONTAL ── */}
      <section
        style={{ background: '#1A3A5C' }}
        className="flex flex-col items-center justify-center px-6 py-10 text-center"
      >
        <div className="mb-5 flex items-center gap-3">
          <span style={{ width: 20, height: 1, background: '#4A8FA8', display: 'inline-block' }} />
          <span style={{ fontSize: 11, color: '#7AAFC0', letterSpacing: '0.12em' }} className="uppercase">
            Catálogo de viajes · 2026
          </span>
          <span style={{ width: 20, height: 1, background: '#4A8FA8', display: 'inline-block' }} />
        </div>

        <h1 style={{ color: '#DAEEF7', letterSpacing: '-0.02em' }} className="text-4xl font-medium leading-tight mb-3">
          Encuentra tu viaje ideal
        </h1>
        <p style={{ color: '#7AAFC0' }} className="text-base leading-7 mb-8 max-w-lg">
          Explora todos los destinos disponibles y compara precios por fecha o mes.
        </p>

        {/* Toggle Fechas / Mes */}
        <div className="flex items-center gap-2 mb-4">
          <button
            type="button"
            onClick={() => setSearchMode('dates')}
            style={{
              fontSize: 13,
              padding: '4px 16px',
              borderRadius: 20,
              border: searchMode === 'dates' ? '1px solid #4A8FA8' : '1px solid rgba(74,143,168,0.3)',
              background: searchMode === 'dates' ? 'rgba(74,143,168,0.2)' : 'transparent',
              color: searchMode === 'dates' ? '#DAEEF7' : '#7AAFC0',
              cursor: 'pointer',
              fontWeight: searchMode === 'dates' ? 600 : 400,
            }}
          >
            Fechas exactas
          </button>
          <button
            type="button"
            onClick={() => setSearchMode('month')}
            style={{
              fontSize: 13,
              padding: '4px 16px',
              borderRadius: 20,
              border: searchMode === 'month' ? '1px solid #4A8FA8' : '1px solid rgba(74,143,168,0.3)',
              background: searchMode === 'month' ? 'rgba(74,143,168,0.2)' : 'transparent',
              color: searchMode === 'month' ? '#DAEEF7' : '#7AAFC0',
              cursor: 'pointer',
              fontWeight: searchMode === 'month' ? 600 : 400,
            }}
          >
            Por mes
          </button>
        </div>

        {/* Formulario de búsqueda */}
        <form
          onSubmit={handleSearch}
          style={{
            background: 'rgba(218,238,247,0.06)',
            border: '1.5px solid #4A8FA8',
            borderRadius: 16,
            padding: '1rem',
            width: '100%',
            maxWidth: 860,
          }}
          className="flex flex-col lg:flex-row items-center gap-0"
        >
          {/* Destino */}
          <div className="flex flex-col flex-[2] w-full px-3 py-1 lg:border-r" style={{ borderColor: 'rgba(74,143,168,0.3)' }}>
            <span style={{ fontSize: 10, color: '#4A8FA8', letterSpacing: '0.1em' }} className="uppercase mb-1">Destino</span>
            <div className="flex items-center gap-2">
              <MapPin size={15} style={{ color: '#4A8FA8', flexShrink: 0 }} />
              <input
                type="text"
                placeholder="¿A dónde?"
                value={search.destiny}
                onChange={e => setSearch(s => ({ ...s, destiny: e.target.value }))}
                style={{ background: 'transparent', border: 'none', outline: 'none', color: '#DAEEF7', fontSize: 14, width: '100%' }}
                className="placeholder:text-white/25"
              />
            </div>
          </div>

          {searchMode === 'dates' ? (
            <>
              {/* Salida */}
              <div className="flex flex-col flex-1 w-full px-3 py-1 lg:border-r" style={{ borderColor: 'rgba(74,143,168,0.3)' }}>
                <span style={{ fontSize: 10, color: '#4A8FA8', letterSpacing: '0.1em' }} className="uppercase mb-1">Salida</span>
                <div className="flex items-center gap-2">
                  <Calendar size={15} style={{ color: '#4A8FA8', flexShrink: 0 }} />
                  <input
                    type="date"
                    value={search.startDate}
                    onChange={e => setSearch(s => ({ ...s, startDate: e.target.value }))}
                    style={{ colorScheme: 'dark', background: 'transparent', border: 'none', outline: 'none', color: search.startDate ? '#DAEEF7' : 'rgba(218,238,247,0.25)', fontSize: 13, width: '100%' }}
                  />
                </div>
              </div>

              {/* Vuelta */}
              <div className="flex flex-col flex-1 w-full px-3 py-1 lg:border-r" style={{ borderColor: 'rgba(74,143,168,0.3)' }}>
                <span style={{ fontSize: 10, color: '#4A8FA8', letterSpacing: '0.1em' }} className="uppercase mb-1">Vuelta</span>
                <div className="flex items-center gap-2">
                  <Calendar size={15} style={{ color: '#4A8FA8', flexShrink: 0 }} />
                  <input
                    type="date"
                    value={search.endDate}
                    onChange={e => setSearch(s => ({ ...s, endDate: e.target.value }))}
                    style={{ colorScheme: 'dark', background: 'transparent', border: 'none', outline: 'none', color: search.endDate ? '#DAEEF7' : 'rgba(218,238,247,0.25)', fontSize: 13, width: '100%' }}
                  />
                </div>
              </div>
            </>
          ) : (
            /* Mes */
            <div className="flex flex-col flex-1 w-full px-3 py-1 lg:border-r" style={{ borderColor: 'rgba(74,143,168,0.3)' }}>
              <span style={{ fontSize: 10, color: '#4A8FA8', letterSpacing: '0.1em' }} className="uppercase mb-1">Mes</span>
              <div className="flex items-center gap-2">
                <Calendar size={15} style={{ color: '#4A8FA8', flexShrink: 0 }} />
                <input
                  type="month"
                  value={search.month}
                  onChange={e => setSearch(s => ({ ...s, month: e.target.value }))}
                  style={{ colorScheme: 'dark', background: 'transparent', border: 'none', outline: 'none', color: search.month ? '#DAEEF7' : 'rgba(218,238,247,0.25)', fontSize: 13, width: '100%' }}
                />
              </div>
            </div>
          )}

          {/* Viajeros */}
          <div className="flex flex-col flex-1 w-full px-3 py-1 lg:border-r" style={{ borderColor: 'rgba(74,143,168,0.3)' }}>
            <span style={{ fontSize: 10, color: '#4A8FA8', letterSpacing: '0.1em' }} className="uppercase mb-1">Viajeros</span>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Users size={15} style={{ color: '#4A8FA8' }} />
                <span style={{ fontSize: 13, color: 'rgba(218,238,247,0.7)' }}>{search.passengers}</span>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setSearch(s => ({ ...s, passengers: Math.max(1, s.passengers - 1) }))}
                  style={{ width: 20, height: 20, borderRadius: '50%', border: '0.5px solid rgba(74,143,168,0.4)', background: 'transparent', color: '#7AAFC0', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                <button type="button" onClick={() => setSearch(s => ({ ...s, passengers: Math.min(20, s.passengers + 1) }))}
                  style={{ width: 20, height: 20, borderRadius: '50%', border: '0.5px solid rgba(74,143,168,0.4)', background: 'transparent', color: '#7AAFC0', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
              </div>
            </div>
          </div>

          {/* Botón */}
          <div className="pl-3 w-full lg:w-auto mt-3 lg:mt-0">
            <button type="submit"
              style={{ background: '#4A8FA8', color: '#DAEEF7', border: 'none', borderRadius: 10, padding: '10px 22px', fontSize: 14, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap', width: '100%', justifyContent: 'center' }}>
              <Search size={15} />
              Buscar
            </button>
          </div>
        </form>

        {/* Populares */}
        <div className="flex items-center gap-2 mt-4 flex-wrap justify-center">
          <span style={{ fontSize: 11, color: '#7AAFC0' }}>Populares:</span>
          {POPULAR.map(p => (
            <button key={p} type="button"
              onClick={() => handlePopularClick(p)}
              style={{ fontSize: 11, color: '#7AAFC0', border: '0.5px solid rgba(74,143,168,0.3)', borderRadius: 20, padding: '2px 12px', background: 'transparent', cursor: 'pointer' }}>
              {p}
            </button>
          ))}
        </div>
      </section>

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
          {/* Sidebar de filtros */}
          <Card as="aside" aria-label="Filtros" className="h-fit p-6">
            <div className="flex items-center gap-2 mb-4">
              <SlidersHorizontal className="h-4 w-4 text-brand-400" />
              <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
                Filtros
              </h3>
            </div>

            {/* Precio */}
            <div className="mb-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">Precio</p>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="50"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(p => ({ ...p, max: Number(e.target.value) }))}
                  className="w-full accent-brand-500"
                />
                <div className="flex justify-between text-xs text-ink-muted">
                  <span>0€</span>
                  <span>{priceRange.max}€</span>
                </div>
              </div>
            </div>

            {/* Solo ofertas */}
            <div className="mb-6 border-t border-surface-700 pt-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyOffers}
                  onChange={e => setOnlyOffers(e.target.checked)}
                  className="h-4 w-4 rounded"
                />
                <span className="text-sm text-ink-soft">Solo viajes en oferta</span>
              </label>
            </div>

            {/* Limpiar */}
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              onClick={handleClearFilters}
            >
              Limpiar filtros
            </Button>
          </Card>

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
