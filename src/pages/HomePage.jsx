import { ArrowRight, Calendar, MapPin, Search, Users } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import DestinationCard from '../components/common/DestinationCard'
import { FEATURED_DESTINATIONS } from '../constants/mockData'
import { PUBLIC_PATHS } from '../constants/paths'

const HomePage = () => (
  <>
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(6,182,212,0.25),_transparent_55%)]"
      />
      <div className="container-page relative grid gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
        <div className="flex flex-col justify-center gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-brand-300">
            Viajes seleccionados · 2026
          </span>
          <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
            planificacion de viajes inolvidables
            <span className="text-brand-400"> NOMADA</span>
          </h1>
          <div className="flex flex-wrap gap-3">
            <Button to={PUBLIC_PATHS.SEARCH} size="lg">
              Explorar destinos
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button to={PUBLIC_PATHS.OFFERS} size="lg" variant="secondary">
              Ver ofertas
            </Button>
          </div>
        </div>

        <Card className="p-6 md:p-8">
          <h2 className="text-lg font-semibold text-white">buscar nuevo viaje</h2>
          <form className="mt-6 grid gap-4">
            <label className="flex flex-col gap-2 text-sm">
              <span className="font-medium text-ink-soft">Destino</span>
              <span className="flex items-center gap-2 rounded-xl border border-surface-600 bg-surface-900 px-4">
                <MapPin className="h-4 w-4 text-brand-400" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="¿A dónde?"
                  className="h-11 w-full bg-transparent text-ink placeholder:text-ink-muted focus:outline-none"
                />
              </span>
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm">
                <span className="font-medium text-ink-soft">Fechas</span>
                <span className="flex items-center gap-2 rounded-xl border border-surface-600 bg-surface-900 px-4">
                  <Calendar className="h-4 w-4 text-brand-400" aria-hidden="true" />
                  <input
                    type="text"
                    placeholder="Añadir fechas"
                    className="h-11 w-full bg-transparent text-ink placeholder:text-ink-muted focus:outline-none"
                  />
                </span>
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <span className="font-medium text-ink-soft">Viajeros</span>
                <span className="flex items-center gap-2 rounded-xl border border-surface-600 bg-surface-900 px-4">
                  <Users className="h-4 w-4 text-brand-400" aria-hidden="true" />
                  <input
                    type="text"
                    placeholder="2 adultos"
                    className="h-11 w-full bg-transparent text-ink placeholder:text-ink-muted focus:outline-none"
                  />
                </span>
              </label>
            </div>
            <Button to={PUBLIC_PATHS.SEARCH} size="lg" fullWidth>
              <Search className="h-4 w-4" aria-hidden="true" />
              Buscar
            </Button>
          </form>
        </Card>
      </div>
    </section>

    <section className="container-page py-16">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold text-white">Destinos destacados</h2>
          <p className="mt-2 text-ink-muted">Viajes seleccionados, los favoritos de nuestros viajeros.</p>
        </div>
        <Button to={PUBLIC_PATHS.SEARCH} variant="ghost">
          Ver todos
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURED_DESTINATIONS.slice(0, 6).map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </section>
  </>
)

export default HomePage
