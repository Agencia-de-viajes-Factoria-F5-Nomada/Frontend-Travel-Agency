import { Tag } from 'lucide-react'
import Button from '../components/ui/Button'
import DestinationCard from '../components/common/DestinationCard'
import PageHeader from '../components/ui/PageHeader'
import { FEATURED_DESTINATIONS } from '../constants/mockData'
import { PUBLIC_PATHS } from '../constants/paths'

const offers = FEATURED_DESTINATIONS.filter((destination) => destination.discount > 0)

const OffersPage = () => (
  <div className="container-page py-12">
    <PageHeader
      eyebrow="Ofertas"
      title="Viajes en oferta ahora mismo"
      description="Aprovecha los precios rebajados en estos destinos seleccionados."
    />

    {offers.length ? (
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {offers.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} showOfferPrice featured />
        ))}
      </div>
    ) : (
      <div className="mt-12 grid place-items-center gap-3 rounded-card border border-dashed border-surface-700 p-12 text-center">
        <Tag className="h-8 w-8 text-brand-400" aria-hidden="true" />
        <p className="text-lg font-semibold text-white">No hay ofertas disponibles</p>
        <p className="text-sm text-ink-muted">
          Vuelve pronto, publicamos nuevas ofertas con frecuencia.
        </p>
        <Button to={PUBLIC_PATHS.SEARCH}>Explorar destinos</Button>
      </div>
    )}
  </div>
)

export default OffersPage
