import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, MapPin, Users, Building2 } from 'lucide-react'
import Button from '../components/atoms/Button'
import Card from '../components/atoms/Card'
import { travelService } from '../services/travelsService'
import { hotelService } from '../services/hotelService'
import { authService } from '../services/authService'
import { getDestinationFallbackImage, getDestinationImage } from '../utils/destinationImages'
import { formatDate } from '../utils/formatters'

const DestinationDetailPage = () => {
  const { id }                  = useParams()
  const navigate                = useNavigate()
  const [travel, setTravel]     = useState(null)
  const [hotel, setHotel]       = useState(null)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [typeBoard, setTypeBoard] = useState('HALF')

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const travelData = await travelService.getById(id)
        setTravel(travelData)
        if (travelData.hotelId) {
          const hotelData = await hotelService.getById(travelData.hotelId)
          setHotel(hotelData)
        }
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const handleReservar = () => {
    if (!authService.isAuthenticated()) {
      navigate('/auth')
      return
    }
    navigate('/checkout', {
      state: { travelId: travel.id, typeBoard, travel, hotel }
    })
  }

  if (loading) return (
    <div className="container-page py-12">
      <div className="h-80 animate-pulse rounded-2xl bg-surface-800" />
    </div>
  )

  if (error || !travel) return (
    <div className="container-page py-12 text-center">
      <p className="text-red-400">{error ?? 'Viaje no encontrado'}</p>
      <Button className="mt-4" onClick={() => navigate(-1)}>Volver</Button>
    </div>
  )

  const halfBoard = hotel?.halfBoardPrice ?? travel?.halfBoardPrice
  const fullBoard = hotel?.fullBoardPrice ?? travel?.fullBoardPrice
  const price = typeBoard === 'HALF' ? halfBoard : fullBoard

  const isOffer = travel.sale === true
  const discountPct = isOffer && travel.discountPercentage ? travel.discountPercentage : 0
  const originalPrice = discountPct > 0 ? Math.round(price / (1 - discountPct / 100)) : null

  const isPast = travel.startDate && new Date(travel.startDate) < new Date()
  const isFull = travel.availablePlaces === 0
  const image = getDestinationImage(travel)

  return (
    <div className="container-page py-12">

      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-sm text-ink-muted hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver
      </button>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

        <div className="space-y-6">
          <div className="relative h-64 overflow-hidden rounded-2xl bg-surface-800 lg:h-80">
            {image ? (
              <img src={image} alt={travel.destiny} className="h-full w-full object-cover"
                onError={(event) => {
                  const fallbackImage = getDestinationFallbackImage(travel)
                  if (fallbackImage && event.currentTarget.src !== fallbackImage) {
                    event.currentTarget.src = fallbackImage
                  }
                }} />
            ) : (
              <div className="flex h-full items-center justify-center">
                <MapPin className="h-16 w-16 text-brand-400" />
              </div>
            )}
            {travel.sale && (
              <div className="absolute left-4 top-4 flex gap-2">
                <span className="rounded-full bg-accent px-3 py-1 text-sm font-bold text-white">
                  EN OFERTA
                </span>
                {discountPct > 0 && (
                  <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
                    -{discountPct}%
                  </span>
                )}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white">{travel.destiny}</h1>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-ink-muted">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(travel.startDate)} → {formatDate(travel.endDate)}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {travel.availablePlaces} plazas disponibles
              </span>
            </div>
          </div>

          {(travel.description || travel.notes) && (
            <Card className="p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted mb-3">Sobre este viaje</h2>
              <p className="text-sm leading-7 text-ink-soft">{travel.description || travel.notes}</p>
            </Card>
          )}

          {(hotel || travel.hotelName) && (
            <Card className="p-5">
              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-brand-400 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Hotel incluido</p>
                  <h3 className="mt-1 font-semibold text-white">{hotel?.name ?? travel.hotelName}</h3>
                  <p className="text-sm text-ink-muted">
                    {hotel ? `${hotel.city}, ${hotel.country}` : `${travel.hotelCity}, ${travel.hotelCountry}`}
                  </p>
                  <p className="mt-1 text-sm text-ink-muted">{'⭐'.repeat(hotel?.stars ?? travel.hotelStars ?? 0)}</p>
                </div>
              </div>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <Card className="p-6">
            <h2 className="text-lg font-bold text-white">Reservar este viaje</h2>

            {(hotel || travel.halfBoardPrice) && (
              <div className="mt-4 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Tipo de pensión</p>
                <label className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 transition-colors ${
                  typeBoard === 'HALF' ? 'border-accent bg-accent-light' : 'border-transparent bg-transparent'
                }`}>
                  <span className="text-sm font-medium text-accent-dark">Media pensión</span>
                  <div className="flex items-center gap-2">
                    {isOffer && discountPct > 0 && (
                      <span className="text-xs line-through text-gray-400">
                        {Math.round(halfBoard / (1 - discountPct / 100))}€
                      </span>
                    )}
                    <span className="font-bold text-accent-dark">{halfBoard}€/persona</span>
                  </div>
                  <input type="radio" name="typeBoard" value="HALF"
                    checked={typeBoard === 'HALF'} onChange={() => setTypeBoard('HALF')} className="ml-2" />
                </label>
                <label className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 transition-colors ${
                  typeBoard === 'FULL' ? 'border-accent bg-accent-light' : 'border-transparent bg-transparent'
                }`}>
                  <span className="text-sm font-medium text-accent-dark">Pensión completa</span>
                  <div className="flex items-center gap-2">
                    {isOffer && discountPct > 0 && (
                      <span className="text-xs line-through text-gray-400">
                        {Math.round(fullBoard / (1 - discountPct / 100))}€
                      </span>
                    )}
                    <span className="font-bold text-accent-dark">{fullBoard}€/persona</span>
                  </div>
                  <input type="radio" name="typeBoard" value="FULL"
                    checked={typeBoard === 'FULL'} onChange={() => setTypeBoard('FULL')} className="ml-2" />
                </label>
              </div>
            )}

            {price && (
              <div className="mt-4 rounded-xl bg-accent-light p-4 text-center">
                <p className="text-xs text-ink-muted">Precio por persona · IVA incluido</p>
                {originalPrice && (
                  <p className="text-sm line-through text-gray-400">{originalPrice}€</p>
                )}
                <p className="text-3xl font-bold text-accent-dark">{price}€</p>
                {discountPct > 0 && (
                  <p className="mt-1 text-xs font-semibold text-red-500">-{discountPct}% de descuento aplicado</p>
                )}
              </div>
            )}

            {isPast && (
              <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                Este viaje ya ha pasado y no admite reservas.
              </p>
            )}
            {isFull && !isPast && (
              <p className="mt-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-700">
                No quedan plazas disponibles.
              </p>
            )}

            <button onClick={handleReservar} disabled={isPast || isFull}
              className="mt-4 w-full rounded-xl bg-accent py-3 font-semibold text-white transition-opacity disabled:opacity-40">
              {isPast ? 'Viaje finalizado' : isFull ? 'Sin plazas' : 'Reservar ahora'}
            </button>

            <p className="mt-3 text-center text-xs text-ink-muted">
              {!authService.isAuthenticated() && 'Necesitas iniciar sesión para reservar'}
            </p>
          </Card>
        </div>

      </div>
    </div>
  )
}

export default DestinationDetailPage