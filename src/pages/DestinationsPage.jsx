import { Pencil, Plus, Trash2 } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import PageHeader from '../components/ui/PageHeader'
import Badge from '../components/ui/Badge'
import { FEATURED_DESTINATIONS } from '../constants/mockData'
import { formatCurrency } from '../utils/formatters'

const DestinationsPage = () => (
  <>
    <PageHeader
      eyebrow="Catálogo"
      title="Destinos"
      description="Crea, actualiza y selecciona los destinos que ven los viajeros."
      actions={
        <Button>
          <Plus className="h-4 w-4" aria-hidden="true" />
          Nuevo destino
        </Button>
      }
    />

    <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {FEATURED_DESTINATIONS.map((destination) => (
        <Card key={destination.id} className="overflow-hidden">
          <div className="relative h-40">
            <img
              src={destination.image}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute left-3 top-3">
              <Badge tone="brand">{destination.tag}</Badge>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-5">
            <div>
              <h3 className="text-lg font-semibold text-white">
                {destination.name}
              </h3>
              <p className="text-sm text-ink-muted">{destination.country}</p>
            </div>
            <div className="flex items-center justify-between text-sm text-ink-soft">
              <span>{formatCurrency(destination.price)}</span>
              <span>★ {destination.rating}</span>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" fullWidth>
                <Pencil className="h-4 w-4" aria-hidden="true" />
                Editar
              </Button>
              <Button variant="danger" size="sm" aria-label={`Eliminar ${destination.name}`}>
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </section>
  </>
)

export default DestinationsPage
