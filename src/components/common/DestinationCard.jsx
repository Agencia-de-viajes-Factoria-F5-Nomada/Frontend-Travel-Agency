import { Heart, Star } from 'lucide-react'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import Card from '../ui/Card'
import { buildDestinationPath } from '../../constants/paths'
import { formatCurrency } from '../../utils/formatters'

const DestinationCard = ({ destination }) => (
  <Card className="overflow-hidden transition-transform duration-200 hover:-translate-y-1">
    <div className="relative h-48 w-full overflow-hidden">
      <img
        src={destination.image}
        alt={`${destination.name}, ${destination.country}`}
        className="h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute left-4 top-4">
        <Badge tone="brand">{destination.tag}</Badge>
      </div>
      <Button
        variant="ghost"
        size="icon"
        aria-label={`Guardar ${destination.name} en favoritos`}
        className="absolute right-3 top-3 bg-surface-950/60 backdrop-blur"
      >
        <Heart className="h-4 w-4" aria-hidden="true" />
      </Button>
    </div>
    <div className="flex flex-col gap-4 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">{destination.name}</h3>
          <p className="text-sm text-ink-muted">{destination.country}</p>
        </div>
        <span className="inline-flex items-center gap-1 text-sm text-ink-soft">
          <Star className="h-4 w-4 text-brand-400" aria-hidden="true" />
          {destination.rating}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-ink-muted">Desde</p>
          <p className="text-xl font-semibold text-white">
            {formatCurrency(destination.price)}
          </p>
        </div>
        <Button to={buildDestinationPath(destination.id)} size="sm">
          Ver
        </Button>
      </div>
    </div>
  </Card>
)

export default DestinationCard
