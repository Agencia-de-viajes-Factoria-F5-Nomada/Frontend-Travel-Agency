import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Bike,
  Calendar,
  Check,
  ChevronLeft,
  Hotel,
  Landmark,
  Map,
  Mountain,
  Palmtree,
  Plane,
  Route,
  Send,
  Sparkles,
  Utensils,
  Users,
  Wallet,
} from 'lucide-react'
import Button from '../components/atoms/Button'
import Card from '../components/atoms/Card'
import Input from '../components/atoms/Input'
import PageHeader from '../components/atoms/PageHeader'
import Textarea from '../components/atoms/Textarea'
import { bookingService } from '../services/BookingService'
import { authService } from '../services/authService'
import { classNames } from '../utils/classNames'

const TRIP_STYLES = [
  { id: 'playa', label: 'Playa', icon: Palmtree },
  { id: 'aventura', label: 'Aventura', icon: Mountain },
  { id: 'ruta', label: 'Ruta', icon: Route },
  { id: 'cultura', label: 'Cultura', icon: Landmark },
  { id: 'gastronomia', label: 'Gastronomía', icon: Utensils },
  { id: 'naturaleza', label: 'Naturaleza', icon: Bike },
]

const PACE_OPTIONS = ['Relajado', 'Equilibrado', 'Intenso']
const LODGING_OPTIONS = ['Hotel urbano', 'Resort', 'Casa rural', 'Boutique', 'Familiar']

const initialForm = {
  destination: '',
  originCity: '',
  startDate: '',
  endDate: '',
  passengers: 2,
  budget: '',
  pace: 'Equilibrado',
  lodging: 'Hotel urbano',
  includesFlight: true,
  includesHotel: true,
  includesActivities: true,
  typeBoard: 'FULL',
  styles: ['playa'],
  mustHave: '',
  avoid: '',
}

const CustomTripPage = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(null)

  const selectedStyles = useMemo(
    () => TRIP_STYLES.filter(style => form.styles.includes(style.id)),
    [form.styles],
  )

  const change = (field, value) => {
    setForm(current => ({ ...current, [field]: value }))
    setError(null)
  }

  const toggleStyle = (id) => {
    setForm(current => {
      const exists = current.styles.includes(id)
      const styles = exists
        ? current.styles.filter(style => style !== id)
        : [...current.styles, id]
      return { ...current, styles: styles.length ? styles : current.styles }
    })
    setError(null)
  }

  const toggleInclude = (field) => {
    setForm(current => ({ ...current, [field]: !current[field] }))
    setError(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!authService.isAuthenticated()) {
      navigate('/auth')
      return
    }
    if (!form.destination.trim()) {
      setError('Indica un destino o escribe "cualquier lugar".')
      return
    }
    if (form.endDate && form.startDate && new Date(form.endDate) < new Date(form.startDate)) {
      setError('La fecha de vuelta no puede ser anterior a la salida.')
      return
    }

    setSending(true)
    setError(null)

    const preferenceSummary = [
      `Origen: ${form.originCity || 'sin definir'}`,
      `Destino: ${form.destination}`,
      `Estilo: ${selectedStyles.map(style => style.label).join(', ')}`,
      `Ritmo: ${form.pace}`,
      `Alojamiento: ${form.lodging}`,
      `Presupuesto: ${form.budget ? `${form.budget} EUR por persona` : 'sin definir'}`,
      `Incluye: ${[
        form.includesFlight && 'avión',
        form.includesHotel && 'hotel',
        form.includesActivities && 'actividades',
      ].filter(Boolean).join(', ') || 'sin extras'}`,
      form.mustHave && `Imprescindibles: ${form.mustHave}`,
      form.avoid && `Evitar: ${form.avoid}`,
    ].filter(Boolean).join(' | ')

    try {
      await bookingService.createCustomTrip({
        customDestiny: preferenceSummary,
        customStartDate: form.startDate || null,
        customEndDate: form.endDate || null,
        passengers: Number(form.passengers),
        includesFlight: form.includesFlight,
        includesHotel: form.includesHotel,
        includesActivities: form.includesActivities,
        boughtDate: new Date().toISOString(),
        typeBoard: form.typeBoard,
        basePricePerPassenger: form.budget ? Number(form.budget) : null,
      })
      setSent(true)
    } catch (e) {
      setError(e.response?.data?.message || e.message || 'Error al enviar la solicitud')
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <div className="container-page py-12">
        <Card className="mx-auto max-w-2xl p-8 text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-500 text-surface-950">
            <Check className="h-8 w-8" />
          </span>
          <h1 className="mt-5 text-3xl font-semibold text-white">Solicitud enviada</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-ink-muted">
            Hemos recibido tus preferencias. Nuestro equipo preparará una propuesta de viaje personalizado con avión,
            hotel y actividades adaptadas a tu idea.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button onClick={() => { setSent(false); setForm(initialForm) }}>Crear otra solicitud</Button>
            <Button variant="secondary" onClick={() => navigate('/destinations')}>Volver a destinos</Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="container-page py-12">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-white"
      >
        <ChevronLeft className="h-4 w-4" />
        Volver
      </button>

      <PageHeader
        eyebrow="Viaje a medida"
        title="Diseña tu viaje personalizado"
        description="Cuéntanos cómo quieres viajar y prepararemos una propuesta adaptada a tus fechas, presupuesto y estilo."
      />

      <form onSubmit={handleSubmit} className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <Map className="h-5 w-5 text-brand-400" />
              <h2 className="text-lg font-semibold text-white">Datos principales</h2>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Input
                label="Destino o idea de viaje"
                placeholder="Cualquier lugar, Japón, playa tranquila..."
                value={form.destination}
                onChange={event => change('destination', event.target.value)}
                required
              />
              <Input
                label="Ciudad de salida"
                placeholder="Madrid, Barcelona..."
                value={form.originCity}
                onChange={event => change('originCity', event.target.value)}
              />
              <Input
                label="Salida"
                type="date"
                value={form.startDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={event => change('startDate', event.target.value)}
              />
              <Input
                label="Vuelta"
                type="date"
                value={form.endDate}
                min={form.startDate || new Date().toISOString().split('T')[0]}
                onChange={event => change('endDate', event.target.value)}
              />
              <Input
                label="Viajeros"
                type="number"
                min="1"
                max="50"
                value={form.passengers}
                onChange={event => change('passengers', event.target.value)}
              />
              <Input
                label="Presupuesto por persona"
                type="number"
                min="0"
                placeholder="1200"
                value={form.budget}
                onChange={event => change('budget', event.target.value)}
              />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-brand-400" />
              <h2 className="text-lg font-semibold text-white">Tipo de experiencia</h2>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {TRIP_STYLES.map(({ id, label, icon: Icon }) => {
                const active = form.styles.includes(id)
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => toggleStyle(id)}
                    className={classNames(
                      'flex h-24 flex-col items-center justify-center gap-2 rounded-xl border text-sm font-medium transition-colors',
                      active
                        ? 'border-brand-500 bg-brand-500/20 text-white'
                        : 'border-surface-600 bg-surface-900 text-ink-soft hover:border-brand-500 hover:text-white',
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {label}
                  </button>
                )
              })}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <Wallet className="h-5 w-5 text-brand-400" />
              <h2 className="text-lg font-semibold text-white">Preferencias</h2>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div>
                <p className="mb-2 text-sm font-medium text-ink-soft">Ritmo del viaje</p>
                <div className="grid grid-cols-3 gap-2">
                  {PACE_OPTIONS.map(option => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => change('pace', option)}
                      className={classNames(
                        'rounded-xl border px-3 py-2 text-sm transition-colors',
                        form.pace === option
                          ? 'border-brand-500 bg-brand-500/20 text-white'
                          : 'border-surface-600 text-ink-soft hover:border-brand-500 hover:text-white',
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-ink-soft">Alojamiento preferido</p>
                <select
                  value={form.lodging}
                  onChange={event => change('lodging', event.target.value)}
                  className="h-11 w-full rounded-xl border border-surface-600 bg-surface-900 px-4 text-sm text-ink focus:border-brand-500 focus:outline-none"
                >
                  {LODGING_OPTIONS.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div>
                <p className="mb-2 text-sm font-medium text-ink-soft">Imprescindibles</p>
                <Textarea
                  value={form.mustHave}
                  onChange={event => change('mustHave', event.target.value)}
                  placeholder="Excursiones, playa cerca, guía local, spa..."
                  className="bg-surface-900 text-ink placeholder:text-ink-muted"
                  rows={4}
                />
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-ink-soft">Cosas a evitar</p>
                <Textarea
                  value={form.avoid}
                  onChange={event => change('avoid', event.target.value)}
                  placeholder="Muchas escalas, viajes muy largos, zonas masificadas..."
                  className="bg-surface-900 text-ink placeholder:text-ink-muted"
                  rows={4}
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">El viaje incluye</h2>
            <div className="mt-4 grid gap-3">
              {[
                { key: 'includesFlight', label: 'Avión', icon: Plane },
                { key: 'includesHotel', label: 'Hotel', icon: Hotel },
                { key: 'includesActivities', label: 'Actividades', icon: Sparkles },
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleInclude(key)}
                  className={classNames(
                    'flex items-center justify-between rounded-xl border px-4 py-3 text-sm transition-colors',
                    form[key]
                      ? 'border-brand-500 bg-brand-500/20 text-white'
                      : 'border-surface-600 text-ink-soft hover:border-brand-500 hover:text-white',
                  )}
                >
                  <span className="inline-flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {label}
                  </span>
                  <span>{form[key] ? 'Incluido' : 'Opcional'}</span>
                </button>
              ))}
            </div>
            <div className="mt-4">
              <p className="mb-2 text-sm font-medium text-ink-soft">Régimen de comidas</p>
              <div className="grid grid-cols-2 gap-2">
                {['FULL', 'HALF'].map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => change('typeBoard', option)}
                    className={classNames(
                      'rounded-xl border px-3 py-2 text-sm transition-colors',
                      form.typeBoard === option
                        ? 'border-brand-500 bg-brand-500/20 text-white'
                        : 'border-surface-600 text-ink-soft hover:border-brand-500 hover:text-white',
                    )}
                  >
                    {option === 'FULL' ? 'Pensión completa' : 'Media pensión'}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">Resumen</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex justify-between gap-4">
                <span className="text-ink-muted">Idea</span>
                <span className="text-right text-white">{form.destination || 'Sin definir'}</span>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-ink-muted">Viajeros</span>
                <span className="text-white">{form.passengers}</span>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-ink-muted">Estilo</span>
                <span className="text-right text-white">{selectedStyles.map(style => style.label).join(', ')}</span>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-ink-muted">Ritmo</span>
                <span className="text-white">{form.pace}</span>
              </li>
            </ul>
            {error && (
              <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>
            )}
            <Button type="submit" fullWidth size="lg" className="mt-5" disabled={sending}>
              {sending ? 'Enviando...' : 'Enviar solicitud'}
              <Send className="h-4 w-4" />
            </Button>
          </Card>

          <Card className="p-6">
            <div className="flex gap-3">
              <Users className="mt-0.5 h-5 w-5 text-brand-400" />
              <p className="text-sm leading-6 text-ink-soft">
                Si viajáis en grupo, podemos adaptar horarios, transporte, actividades privadas y presupuesto por persona.
              </p>
            </div>
            <div className="mt-4 flex gap-3">
              <Calendar className="mt-0.5 h-5 w-5 text-brand-400" />
              <p className="text-sm leading-6 text-ink-soft">
                Si no tienes fechas cerradas, deja el calendario vacío y buscaremos la mejor temporada para tu idea.
              </p>
            </div>
          </Card>
        </div>
      </form>
    </div>
  )
}

export default CustomTripPage
