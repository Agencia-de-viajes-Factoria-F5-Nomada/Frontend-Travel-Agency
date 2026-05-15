import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, MapPin, Users, Building2 } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { travelService } from '../services/TravelsService'
import { hotelService } from '../services/HotelService'
import { authService } from '../services/authService'
import { getDestinationFallbackImage, getDestinationImage } from '../utils/destinationImages'

const DestinationDetailPage = () => {
  const { id }                  = useParams()
  const navigate                = useNavigate()
  const [travel, setTravel]     = useState(null)
  const [hotel, setHotel]       = useState(null)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [typeBoard, setTypeBoard] = useState('HALF_BOARD')

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

  const price = typeBoard === 'HALF_BOARD'
    ? hotel?.halfBoardPrice
    : hotel?.fullBoardPrice

  const isPast = travel.startDate && new Date(travel.startDate) < new Date()
  const isFull = travel.availablePlaces === 0
  const image = getDestinationImage(travel)

  return (
    <div className="container-page py-12">

      {/* Volver */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-sm text-ink-muted hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver
      </button>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

        {/* Info principal */}
        <div className="space-y-6">

          {/* Imagen o banner */}
          <div className="relative h-64 overflow-hidden rounded-2xl bg-surface-800 lg:h-80">
            {image ? (
              <img
                src={image}
                alt={travel.destiny}
                className="h-full w-full object-cover"
                onError={(event) => {
                  const fallbackImage = getDestinationFallbackImage(travel)
                  if (fallbackImage && event.currentTarget.src !== fallbackImage) {
                    event.currentTarget.src = fallbackImage
                  }
                }}
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <MapPin className="h-16 w-16 text-brand-400" />
              </div>
            )}
            {travel.sale && (
              <span className="absolute left-4 top-4 rounded-full px-3 py-1 text-sm font-bold text-white"
                style={{ background: '#4A8FA8' }}>
                EN OFERTA
              </span>
            )}
          </div>

          {/* Título */}
          <div>
            <h1 className="text-3xl font-bold text-white">{travel.destiny}</h1>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-ink-muted">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {travel.startDate} → {travel.endDate}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {travel.availablePlaces} plazas disponibles
              </span>
            </div>
          </div>

          {/* Hotel */}
          {hotel && (
            <Card className="p-5">
              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-brand-400 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Hotel incluido</p>
                  <h3 className="mt-1 font-semibold text-white">{hotel.name}</h3>
                  <p className="text-sm text-ink-muted">{hotel.city}, {hotel.country}</p>
                  <p className="mt-1 text-sm text-ink-muted">{'⭐'.repeat(hotel.stars)}</p>
                </div>
              </div>
            </Card>
          )}

        </div>

        {/* Panel de reserva */}
        <div className="space-y-4">
          <Card className="p-6">
            <h2 className="text-lg font-bold text-white">Reservar este viaje</h2>

            {/* Tipo de pensión */}
            {hotel && (
              <div className="mt-4 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Tipo de pensión</p>
                <label className="flex items-center justify-between rounded-xl border p-3 cursor-pointer transition-colors"
                  style={{ borderColor: typeBoard === 'HALF_BOARD' ? '#4A8FA8' : 'transparent',
                           background: typeBoard === 'HALF_BOARD' ? '#DAEEF7' : '' }}>
                  <span className="text-sm font-medium" style={{ color: '#1A3A5C' }}>Media pensión</span>
                  <span className="font-bold" style={{ color: '#1A3A5C' }}>{hotel.halfBoardPrice}€/persona</span>
                  <input type="radio" name="typeBoard" value="HALF_BOARD"
                    checked={typeBoard === 'HALF_BOARD'}
                    onChange={() => setTypeBoard('HALF_BOARD')}
                    className="ml-2" />
                </label>
                <label className="flex items-center justify-between rounded-xl border p-3 cursor-pointer transition-colors"
                  style={{ borderColor: typeBoard === 'FULL_BOARD' ? '#4A8FA8' : 'transparent',
                           background: typeBoard === 'FULL_BOARD' ? '#DAEEF7' : '' }}>
                  <span className="text-sm font-medium" style={{ color: '#1A3A5C' }}>Pensión completa</span>
                  <span className="font-bold" style={{ color: '#1A3A5C' }}>{hotel.fullBoardPrice}€/persona</span>
                  <input type="radio" name="typeBoard" value="FULL_BOARD"
                    checked={typeBoard === 'FULL_BOARD'}
                    onChange={() => setTypeBoard('FULL_BOARD')}
                    className="ml-2" />
                </label>
              </div>
            )}

            {/* Precio */}
            {price && (
              <div className="mt-4 rounded-xl p-4 text-center" style={{ background: '#DAEEF7' }}>
                <p className="text-xs text-ink-muted">Precio por persona</p>
                <p className="text-3xl font-bold" style={{ color: '#1A3A5C' }}>{price}€</p>
              </div>
            )}

            {/* Advertencias */}
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

            <button
              onClick={handleReservar}
              disabled={isPast || isFull}
              className="mt-4 w-full rounded-xl py-3 font-semibold text-white transition-opacity disabled:opacity-40"
              style={{ background: '#4A8FA8' }}
            >
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
