import { Heart, Star } from 'lucide-react'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import Card from '../ui/Card'
import { classNames } from '../../utils/classNames'
import { buildDestinationPath } from '../../constants/paths'
import { formatCurrency } from '../../utils/formatters'

const DestinationCard = ({ destination, showOfferPrice = false, featured = false }) => {
  const originalPrice =
    showOfferPrice && destination.discount
      ? Math.round(destination.price / (1 - destination.discount / 100))
      : null

  return (
  <Card className="overflow-hidden transition-transform duration-200 hover:-translate-y-1">
    <div className="relative h-48 w-full overflow-hidden">
      <img
        src={destination.image}
        alt={`${destination.name}, ${destination.country}`}
        className="h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute left-4 top-4">
        <Badge
          tone="brand"
          className={classNames(
            featured &&
              '!border-transparent !bg-brand-500 !text-white shadow-lg shadow-brand-900/40 ring-1 ring-white/20',
          )}
        >
          {destination.tag}
        </Badge>
      </div>
      <Button
        variant="ghost"
        size="icon"
        aria-label={`Guardar ${destination.name} en favoritos`}
        className={classNames(
          'absolute right-3 top-3 backdrop-blur',
          featured
            ? 'border border-white/20 bg-white/15 text-white shadow-md transition-colors hover:bg-white/90 hover:text-rose-500'
            : 'bg-surface-950/60',
        )}
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
          <div className="flex flex-wrap items-baseline gap-2">
            {originalPrice ? (
              <span className="text-sm font-medium text-ink-muted line-through">
                {formatCurrency(originalPrice)}
              </span>
            ) : null}
            <span className="text-xl font-semibold text-white">
              {formatCurrency(destination.price)}
            </span>
          </div>
        </div>
        <Button to={buildDestinationPath(destination.id)} size="sm">
          Ver
        </Button>
      </div>
    </div>
  </Card>
  )
}

export default DestinationCard
