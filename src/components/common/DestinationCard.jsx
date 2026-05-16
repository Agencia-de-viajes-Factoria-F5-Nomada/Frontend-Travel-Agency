import { Link } from 'react-router-dom'
import { Heart, ImageOff, Star } from 'lucide-react'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import Card from '../ui/Card'
import { classNames } from '../../utils/classNames'
import { buildDestinationPath } from '../../constants/paths'
import { formatCurrency } from '../../utils/formatters'
import { getDestinationFallbackImage, getDestinationImage } from '../../utils/destinationImages'

const GRADIENTS = [
  'from-brand-700 to-surface-950',
  'from-brand-600 to-brand-900',
  'from-surface-700 to-brand-800',
  'from-brand-800 to-surface-900',
]

const cardGradient = (id = 0) => GRADIENTS[id % GRADIENTS.length]

const DestinationCard = ({ destination, showOfferPrice = false, featured = false }) => {
  const image = getDestinationImage(destination) || getDestinationFallbackImage(destination)
  const name    = destination.destiny       || destination.name
  const country = destination.hotelCity     || destination.country
  const price   = destination.halfBoardPrice || destination.price || 0

  const rating  = destination.hotelStars    || destination.rating || 0
  const tag     = destination.tag           || (destination.sale ? 'Oferta' : 'Disponible')

  const originalPrice =
    showOfferPrice && destination.discountPercentage && destination.discountPercentage > 0
      ? Math.round(price / (1 - destination.discountPercentage / 100))
      : null

  return (
    <Card className="overflow-hidden transition-transform duration-200 hover:-translate-y-1">
      <Link to={buildDestinationPath(destination.id)} className="relative block h-48 w-full overflow-hidden group">
        {image ? (
          <img
            src={image}
            alt={`${name}, ${country}`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              e.currentTarget.nextElementSibling?.classList.remove('hidden')
            }}
          />
        ) : null}
        <div className={classNames(
          'absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br',
          cardGradient(destination.id),
          image ? 'hidden' : '',
        )}>
          <ImageOff className="h-8 w-8 text-brand-300/60" aria-hidden="true" />
          <span className="px-4 text-center text-sm font-medium text-white/70">{name}</span>
        </div>
        <div className="absolute left-4 top-4">
          <Badge
            tone="brand"
            className={classNames(
              featured &&
                '!border-transparent !bg-brand-500 !text-white shadow-lg shadow-brand-900/40 ring-1 ring-white/20',
            )}
          >
            {tag}
          </Badge>
        </div>
        <button
          onClick={e => e.preventDefault()}
          aria-label={`Guardar ${name} en favoritos`}
          aria-pressed={false}
          className={classNames(
            'absolute right-3 top-3 flex items-center justify-center h-10 w-10 rounded-full backdrop-blur transition-colors focus-visible:ring-2 focus-visible:ring-brand-500',
            featured
              ? 'border border-white/20 bg-white/15 text-white shadow-md hover:bg-white/90 hover:text-rose-500'
              : 'bg-surface-950/60 text-white',
          )}
        >
          <Heart className="h-4 w-4" aria-hidden="true" />
        </button>
      </Link>
      <div className="flex flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-white">{name}</h3>
            <p className="text-sm text-ink-muted">{country}</p>
          </div>
          <span className="inline-flex items-center gap-1 text-sm text-ink-soft">
            <Star className="h-4 w-4 text-brand-400" aria-hidden="true" />
            {rating}
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
                {formatCurrency(price)}
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
