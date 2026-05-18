import { useState, useEffect } from 'react'
import { ArrowRight, MapPin, Search, Users, Calendar } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/atoms/Button'
import Card from '../components/atoms/Card'
import DestinationCard from '../components/organisms/DestinationCard'
import Hero from '../components/layout/Hero'
import { travelService } from '../services/TravelsService'
import { PUBLIC_PATHS } from '../constants/paths'

const POPULAR = ['Londres', 'París', 'Roma', 'Tokio']

const HomePage = () => {
  const [travels, setTravels] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState({ destiny: '', startDate: '', endDate: '', passengers: 2 })
  const navigate = useNavigate()

  useEffect(() => {
    travelService.getFeatured()
      .then(data => {
        setTravels(data);
      })
      .catch(() => {
        setTravels([]);
      })
      .finally(() => setLoading(false))
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (search.destiny) params.set('destiny', search.destiny)
    if (search.startDate) params.set('startDate', search.startDate)
    if (search.endDate) params.set('endDate', search.endDate)
    if (search.passengers) params.set('passengers', search.passengers)
    navigate(`${PUBLIC_PATHS.SEARCH}?${params.toString()}`)
  }

  return (
    <>
      {/* ── HERO ── */}
      <section
        style={{ background: '#1A3A5C' }}
        className="flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center px-6 py-10 text-center"
      >
        {/* Eyebrow */}
        <div className="mb-5 flex items-center gap-3">
          <span style={{ width: 20, height: 1, background: '#4A8FA8', display: 'inline-block' }} />
          <span style={{ fontSize: 11, color: '#7AAFC0', letterSpacing: '0.12em' }} className="uppercase">
            Viajes seleccionados · 2026
          </span>
          <span style={{ width: 20, height: 1, background: '#4A8FA8', display: 'inline-block' }} />
        </div>

        {/* Title */}
        <h1 style={{ color: '#DAEEF7', letterSpacing: '-0.02em' }} className="text-5xl font-medium leading-tight mb-3">
          Siempre en el lugar exacto
        </h1>
        <p style={{ color: '#7AAFC0' }} className="text-base leading-7 mb-8 max-w-lg">
          Explora los mejores destinos seleccionados por nuestros viajeros.
        </p>

        {/* Search bar — borde más visible */}
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
              onClick={() => setSearch(s => ({ ...s, destiny: p }))}
              style={{ fontSize: 11, color: '#7AAFC0', border: '0.5px solid rgba(74,143,168,0.3)', borderRadius: 20, padding: '2px 12px', background: 'transparent', cursor: 'pointer' }}>
              {p}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-10 mt-8 pt-6" style={{ borderTop: '0.5px solid rgba(218,238,247,0.08)' }}>
          {[{ n: '+150', l: 'Destinos' }, { n: '12k+', l: 'Viajeros' }, { n: '98%', l: 'Satisfacción' }].map((s, i, arr) => (
            <div key={s.l} className="flex items-center gap-10">
              <div className="text-center">
                <p style={{ fontSize: 20, fontWeight: 500, color: '#DAEEF7', margin: 0 }}>{s.n}</p>
                <p style={{ fontSize: 11, color: '#7AAFC0', margin: 0 }}>{s.l}</p>
              </div>
              {i < arr.length - 1 && <span style={{ width: 1, height: 32, background: 'rgba(218,238,247,0.1)', display: 'inline-block' }} />}
            </div>
          ))}
        </div>
      </section>

      {/* ── DESTACADOS ── */}
      <section className="container-page py-12">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold text-white">Destinos destacados</h2>
            <p className="mt-2 text-ink-muted">Viajes disponibles, los favoritos de nuestros viajeros</p>
          </div>
          <Button to={PUBLIC_PATHS.SEARCH} variant="ghost">
            Ver todos
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-2xl bg-surface-800" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {travels.map(travel => (
              <DestinationCard key={travel.id} destination={travel} featured />
            ))}
          </div>
        )}
      </section>
    </>
  )
}

export default HomePage