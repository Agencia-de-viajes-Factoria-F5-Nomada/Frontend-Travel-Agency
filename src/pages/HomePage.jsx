import { useState, useEffect } from 'react'
import { ArrowRight, MapPin, Search, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import DestinationCard from '../components/common/DestinationCard'
import Hero from '../components/layout/Hero'
import { travelService } from '../services/TravelsService'
import { PUBLIC_PATHS } from '../constants/paths'

const HomePage = () => {
  const [travels, setTravels] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState({ destiny: '', startDate: '', endDate: '', passengers: 2 })
  const navigate = useNavigate()

  useEffect(() => {
    travelService.getFeatured()
      .then(data => {
        console.log('✅ Viajes destacados cargados en HomePage:', data.length);
        setTravels(data);
      })
      .catch(error => {
        console.error('❌ Error cargando viajes en HomePage:', error);
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
      <Hero
        left={(
          <div className="container-page grid min-h-[calc(100svh-4rem)] w-full items-center gap-6 py-8 sm:py-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.9fr)] lg:gap-8">
            <Card className="hero-card flex min-h-[360px] flex-col justify-center p-7 sm:p-8 lg:min-h-[520px] lg:p-10">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-200/40 bg-brand-100/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-brand-300">
                Viajes seleccionados · 2026
              </span>
              <h1 className="hero-title mt-4">Siempre en el lugar exacto</h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-ink-muted sm:text-lg">Explora los mejores destinos seleccionados por nuestros viajeros.</p>
              <div className="hero-cta mt-6">
                <Button to={PUBLIC_PATHS.SEARCH} size="lg" className="btn-primary-lg">
                  Explorar destinos
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </Card>

            <Card className="p-6 sm:p-8 lg:p-10">
              <div className="mx-auto w-full max-w-2xl">
                <h2 className="mb-2 text-xl font-semibold text-white">¿A dónde vas?</h2>
                <p className="mb-6 text-sm text-ink-muted">Busca tu próximo viaje por destino, fechas y número de viajeros.</p>
                <form onSubmit={handleSearch} className="grid gap-5">
                <label className="flex flex-col gap-2">
                  <span className="text-xs font-medium uppercase tracking-widest text-brand-400">Destino</span>
                  <span className="form-field">
                    <MapPin className="h-4 w-4 text-brand-400 shrink-0" aria-hidden="true" />
                    <input
                      type="text"
                      placeholder="¿A dónde?"
                      value={search.destiny}
                      onChange={e => setSearch(s => ({ ...s, destiny: e.target.value }))}
                      className="form-input"
                    />
                  </span>
                </label>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="text-xs font-medium uppercase tracking-widest text-brand-400">Salida</span>
                    <span className="flex items-center rounded-xl border border-surface-600 bg-surface-900 px-3 h-11">
                      <input
                        type="date"
                        value={search.startDate}
                        onChange={e => setSearch(s => ({ ...s, startDate: e.target.value }))}
                        style={{ colorScheme: 'dark', border: 'none', outline: 'none', background: 'transparent', color: 'inherit', width: '100%', fontSize: '12px' }}
                      />
                    </span>
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-xs font-medium uppercase tracking-widest text-brand-400">Vuelta</span>
                    <span className="flex items-center rounded-xl border border-surface-600 bg-surface-900 px-3 h-11">
                      <input
                        type="date"
                        value={search.endDate}
                        onChange={e => setSearch(s => ({ ...s, endDate: e.target.value }))}
                        style={{ colorScheme: 'dark', border: 'none', outline: 'none', background: 'transparent', color: 'inherit', width: '100%', fontSize: '12px' }}
                      />
                    </span>
                  </label>
                </div>

                <label className="flex flex-col gap-2">
                  <span className="text-xs font-medium uppercase tracking-widest text-brand-400">Viajeros</span>
                  <span className="flex items-center justify-between rounded-xl border border-surface-600 bg-surface-900 px-3 h-11">
                    <Users className="h-4 w-4 text-brand-400" aria-hidden="true" />
                    <button
                      type="button"
                      onClick={() => setSearch(s => ({ ...s, passengers: Math.max(1, s.passengers - 1) }))}
                      className="text-[#4A8FA8] font-bold text-xl px-2"
                    >−</button>
                    <span className="text-center text-ink text-sm flex-1">{search.passengers}</span>
                    <button
                      type="button"
                      onClick={() => setSearch(s => ({ ...s, passengers: Math.min(20, s.passengers + 1) }))}
                      className="text-[#4A8FA8] font-bold text-xl px-2"
                    >+</button>
                  </span>
                </label>

                <Button type="submit" size="md" fullWidth>
                  <Search className="h-4 w-4" aria-hidden="true" />
                  Buscar
                </Button>
                </form>
              </div>
            </Card>
          </div>
        )}
        illustrationProps={{ gradientFrom: '#6faecc', gradientTo: '#2a4f68' }}
      />

      <section className="container-page py-16">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
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
