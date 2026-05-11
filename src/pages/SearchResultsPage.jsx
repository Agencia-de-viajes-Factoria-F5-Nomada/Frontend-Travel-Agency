import { SlidersHorizontal } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import DestinationCard from '../components/common/DestinationCard'
import PageHeader from '../components/ui/PageHeader'
import { FEATURED_DESTINATIONS, BUSES } from '../constants/mockData'

const FILTERS = [
  { label: 'Playa', count: 24 },
  { label: 'Ciudad', count: 38 },
  { label: 'Montaña', count: 17 },
  { label: 'Aventura', count: 12 },
  { label: 'Cultura', count: 21 },
  { label: 'Familia', count: 30 },
]

const SearchResultsPage = () => (
  <div className="container-page py-12">
    <PageHeader
      eyebrow="Búsqueda"
      title="Viajes disponibles"
      description={`${FEATURED_DESTINATIONS.length} destinos encontrados · ordenados por relevancia`}
      actions={
        <Button variant="secondary" size="md">
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          Ordenar
        </Button>
      }
    />

    <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
      <Card as="aside" aria-label="Filtros" className="h-fit p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
          Filtros
        </h2>
        
        {/* Filtros de tipo de destino */}
        <div className="mt-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Tipo de destino
          </p>
          <div className="flex flex-col gap-2">
            {FILTERS.map((filter) => (
              <label
                key={filter.label}
                className="flex items-center justify-between rounded-lg px-2 py-2 text-sm text-ink-soft hover:bg-surface-700"
              >
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-surface-600 bg-surface-900 text-brand-500 focus:ring-brand-500"
                  />
                  {filter.label}
                </span>
                <span className="text-xs text-ink-muted">{filter.count}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Filtros de autobuses */}
        <div className="mt-6 border-t border-surface-700 pt-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Autobús disponible
          </p>
          <div className="flex flex-col gap-2">
            {BUSES.map((bus) => (
              <label
                key={bus.id}
                className="flex flex-col rounded-lg px-2 py-2 text-sm text-ink-soft hover:bg-surface-700"
              >
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-surface-600 bg-surface-900 text-brand-500 focus:ring-brand-500"
                  />
                  <span className="font-medium">{bus.name}</span>
                </span>
                <span className="ml-6 text-xs text-ink-muted">{bus.seats} asientos · {bus.amenities}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Rango de precio */}
        <div className="mt-6 border-t border-surface-700 pt-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
            Rango de precio
          </p>
          <input
            type="range"
            min="500"
            max="5000"
            defaultValue="2500"
            aria-label="Precio máximo"
            className="mt-3 w-full accent-brand-500"
          />
          <p className="mt-1 text-xs text-ink-muted">Hasta €2.500</p>
        </div>

        <Button fullWidth className="mt-6">
          Aplicar filtros
        </Button>
      </Card>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {FEATURED_DESTINATIONS.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </div>
  </div>
)

export default SearchResultsPage
