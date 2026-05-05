import { useParams } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock, Heart, MapPin, Star } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { FEATURED_DESTINATIONS } from '../constants/mockData'
import { PUBLIC_PATHS } from '../constants/paths'
import { formatCurrency } from '../utils/formatters'

const FALLBACK = FEATURED_DESTINATIONS[0]

const HIGHLIGHTS = [
  'Traslados privados desde el aeropuerto',
  'Alojamiento boutique 4★',
  'Experiencias guiadas a diario',
  'Todos los desayunos incluidos',
]

const DestinationDetailPage = () => {
  const { id } = useParams()
  const destination =
    FEATURED_DESTINATIONS.find((item) => item.id === id) || FALLBACK

  return (
    <div className="container-page py-12">
      <Button variant="ghost" size="sm" to={PUBLIC_PATHS.SEARCH}>
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Volver a los resultados
      </Button>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div className="overflow-hidden rounded-card border border-surface-700">
          <img
            src={destination.image}
            alt={`${destination.name}, ${destination.country}`}
            className="aspect-[4/3] h-full w-full object-cover"
          />
        </div>

        <Card className="flex flex-col gap-6 p-6 lg:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Badge tone="brand">{destination.tag}</Badge>
              <h1 className="mt-3 text-3xl font-semibold text-white">
                {destination.name}
              </h1>
              <p className="mt-1 inline-flex items-center gap-2 text-sm text-ink-muted">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {destination.country}
              </p>
            </div>
            <Button variant="ghost" size="icon" aria-label="Guardar en favoritos">
              <Heart className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>

          <div className="flex items-center gap-4 text-sm text-ink-soft">
            <span className="inline-flex items-center gap-1">
              <Star className="h-4 w-4 text-brand-400" aria-hidden="true" />
              {destination.rating} · 312 reseñas
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-4 w-4" aria-hidden="true" />8 días
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              Todo el año
            </span>
          </div>

          <div className="rounded-xl border border-surface-600 bg-surface-900 p-5">
            <p className="text-xs uppercase tracking-wide text-ink-muted">Desde</p>
            <p className="text-3xl font-semibold text-white">
              {formatCurrency(destination.price)}
              <span className="ml-1 text-sm font-normal text-ink-muted">
                / persona
              </span>
            </p>
            <Button to={PUBLIC_PATHS.CHECKOUT} fullWidth className="mt-4">
              Reservar este viaje
            </Button>
            <Button variant="ghost" fullWidth className="mt-2">
              Guardar para más tarde
            </Button>
          </div>
        </Card>
      </div>

      <section className="mt-12 grid gap-6 lg:grid-cols-3">
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-white">Lo más destacado</h2>
          <ul className="mt-4 grid gap-2 text-sm text-ink-soft">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-brand-400"
                />
                {item}
              </li>
            ))}
          </ul>
        </Card>
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-white">Sobre el destino</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            Sumérgete en el ritmo de {destination.name}. Un itinerario diseñado
            con detalle que combina lugares emblemáticos con rincones ocultos,
            todo guiado por expertos locales que conocen la zona a la perfección.
          </p>
        </Card>
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-white">Día a día</h2>
          <ol className="mt-4 flex flex-col gap-4 text-sm text-ink-soft">
            {[1, 2, 3].map((day) => (
              <li key={day} className="flex gap-4">
                <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-brand-500/15 text-brand-300">
                  {day}
                </span>
                <p>
                  Día {day}: llegada, cena de bienvenida y paseo de orientación
                  por el centro histórico.
                </p>
              </li>
            ))}
          </ol>
        </Card>
      </section>
    </div>
  )
}

export default DestinationDetailPage
