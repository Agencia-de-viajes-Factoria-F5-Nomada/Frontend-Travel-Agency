import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ImageOff, Star } from 'lucide-react'
import Badge from '../atoms/Badge'
import Button from '../atoms/Button'
import Card from '../atoms/Card'
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

const BOARD_LABELS = { half: 'Media pension', full: 'Pension completa' }

const DestinationCard = ({ destination, showOfferPrice, boardType = 'half', featured = false }) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const image = getDestinationImage(destination) || getDestinationFallbackImage(destination)
  const name    = destination.destiny       || destination.name
  const country = destination.hotelCity     || destination.country
  const basePrice = boardType === 'full'
    ? (destination.fullBoardPrice || destination.halfBoardPrice || destination.price || 0)
    : (destination.halfBoardPrice || destination.price || 0)

  const rating  = destination.hotelStars    || destination.rating || 0
  const tag     = destination.tag           || (destination.sale ? 'Oferta' : 'Disponible')

  const discountPct = destination.discountPercentage || 0

  // Mostrar precio de oferta: automatico si sale===true, o forzado con showOfferPrice
  const isOnOffer = showOfferPrice !== undefined
    ? showOfferPrice && discountPct > 0
    : destination.sale === true && discountPct > 0

  const discountedPrice = isOnOffer
    ? Math.round(basePrice * (1 - discountPct / 100))
    : null

  const displayPrice = discountedPrice ?? basePrice

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
              {isOnOffer && (
                <span className="text-sm font-medium text-ink-muted line-through">
                  {formatCurrency(basePrice)}
                </span>
              )}
              {isOnOffer && (
                <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-xs font-bold text-red-400">
                  -{discountPct}%
                </span>
              )}
              <span className={classNames(
                'text-xl font-semibold',
                isOnOffer ? 'text-brand-400' : 'text-white',
              )}>
                {formatCurrency(displayPrice)}
              </span>
            </div>
            <p className="mt-0.5 text-[10px] uppercase tracking-wider text-ink-muted">
              {BOARD_LABELS[boardType] || BOARD_LABELS.half}
            </p>
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
