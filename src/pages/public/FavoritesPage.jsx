import { Heart } from 'lucide-react'
import Button from '../../components/ui/Button'
import DestinationCard from '../../components/common/DestinationCard'
import PageHeader from '../../components/ui/PageHeader'
import { FEATURED_DESTINATIONS } from '../../constants/mockData'
import { PUBLIC_PATHS } from '../../constants/paths'

const favorites = FEATURED_DESTINATIONS.slice(0, 4)

const FavoritesPage = () => (
  <div className="container-page py-12">
    <PageHeader
      eyebrow="Viajes guardados"
      title="Tus favoritos"
      description="Viajes que has guardado para revisar más tarde."
      actions={
        <Button variant="secondary" to={PUBLIC_PATHS.SEARCH}>
          <Heart className="h-4 w-4" aria-hidden="true" />
          Buscar más
        </Button>
      }
    />

    {favorites.length ? (
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {favorites.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    ) : (
      <div className="mt-12 grid place-items-center gap-3 rounded-card border border-dashed border-surface-700 p-12 text-center">
        <Heart className="h-8 w-8 text-brand-400" aria-hidden="true" />
        <p className="text-lg font-semibold text-white">Aún no tienes favoritos</p>
        <p className="text-sm text-ink-muted">
          Guarda los viajes que te gusten y encuéntralos todos en un solo sitio.
        </p>
        <Button to={PUBLIC_PATHS.SEARCH}>Explorar destinos</Button>
      </div>
    )}
  </div>
)

export default FavoritesPage
