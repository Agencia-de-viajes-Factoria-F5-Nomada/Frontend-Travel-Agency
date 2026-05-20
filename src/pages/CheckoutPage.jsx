import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Minus, Plus, Trash2 } from 'lucide-react'
import Button from '../components/atoms/Button'
import Card from '../components/atoms/Card'
import Input from '../components/atoms/Input'
import PageHeader from '../components/atoms/PageHeader'
import { bookingService } from '../services/BookingService'
import { authService } from '../services/authService'
import { classNames } from '../utils/classNames'

const STEPS = [
  { id: 1, label: 'Pasajeros' },
  { id: 2, label: 'Cotización' },
  { id: 3, label: 'Confirmar' },
  { id: 4, label: 'Confirmado' },
]

const EMPTY_PASSENGER = { name: '', surname: '', birthDate: '' }

const calculateAge = (birthDate) => {
  if (!birthDate) return null
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return age
}

const Stepper = ({ currentStep }) => (
  <ol className="flex flex-wrap items-center gap-3">
    {STEPS.map((step, i) => {
      const isDone   = step.id < currentStep
      const isActive = step.id === currentStep
      return (
        <li key={step.id} className="flex items-center gap-3">
          <span className={classNames(
            'grid h-8 w-8 place-items-center rounded-full border text-sm font-semibold',
            isDone   && 'border-brand-500 bg-brand-500 text-surface-950',
            isActive && 'border-brand-500 text-brand-300',
            !isActive && !isDone && 'border-surface-600 text-ink-muted',
          )}>
            {isDone ? <Check className="h-4 w-4" /> : step.id}
          </span>
          <span className={classNames('text-sm', isActive ? 'font-semibold text-white' : 'text-ink-muted')}>
            {step.label}
          </span>
          {i < STEPS.length - 1 && (
            <span className="hidden h-px w-10 bg-surface-600 sm:block" />
          )}
        </li>
      )
    })}
  </ol>
)

const CATEGORY_LABEL = {
  BABY:      'Bebé (0-2 años)',
  CHILD:     'Niño (2-11 años)',
  ADULT:     'Adulto',
  PENSIONER: 'Pensionista (65+)',
}

const CheckoutPage = () => {
  const location  = useLocation()
  const navigate  = useNavigate()
  const { travelId, typeBoard: initialBoard, travel, hotel } = location.state ?? {}

  const [step, setStep]             = useState(1)
  const [typeBoard, setTypeBoard]   = useState(initialBoard ?? 'HALF')
  const [isGroup, setIsGroup]       = useState(false)
  const [numPassengers, setNumPassengers] = useState(1)
  const [passengers, setPassengers] = useState([{ ...EMPTY_PASSENGER }])
  const [quote, setQuote]           = useState(null)
  const [booking, setBooking]       = useState(null)
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState(null)

  if (!travelId) {
    return (
      <div className="container-page py-12 text-center">
        <p className="text-ink-muted">No hay viaje seleccionado.</p>
        <Button className="mt-4" onClick={() => navigate('/')}>Volver al inicio</Button>
      </div>
    )
  }

  const handleNumPassengersChange = (n) => {
    const newNum = Math.max(1, Math.min(20, n))
    setNumPassengers(newNum)
    setPassengers(prev => {
      if (newNum > prev.length) {
        return [...prev, ...Array(newNum - prev.length).fill(null).map(() => ({ ...EMPTY_PASSENGER }))]
      }
      return prev.slice(0, newNum)
    })
  }

  const changePassenger = (i, field, value) =>
    setPassengers(p => p.map((pass, idx) => idx === i ? { ...pass, [field]: value } : pass))

  const hasMinor   = passengers.some(p => p.birthDate && calculateAge(p.birthDate) < 12)
  const hasAdult   = passengers.some(p => p.birthDate && calculateAge(p.birthDate) >= 12)
  const minorError = hasMinor && !hasAdult
  const allFilled  = passengers.every(p => p.name.trim() && p.surname.trim() && p.birthDate)

  const handleQuote = async () => {
    if (minorError) { setError('Un menor necesita al menos un adulto en el grupo.'); return }
    setLoading(true)
    setError(null)
    try {
      const user   = authService.getUser()
      const result = await bookingService.quote({
        travelId,
        typeBoard,
        isGroup,
        userId: user?.id,
        passengers: passengers.map(p => ({
          name:      p.name,
          surname:   p.surname,
          birthDate: p.birthDate,
        })),
      })
      setQuote(result)
      setStep(2)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleConfirm = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await bookingService.create({
        travelId,
        typeBoard,
        isGroup,
        customerIds: [1],
        boughtDate: new Date().toISOString(),
      })
      setBooking(result)
      setStep(4)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-page py-12">
      <PageHeader
        eyebrow="Reserva"
        title="Completa tu reserva"
        description="Unos pocos pasos para confirmar tu viaje."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card className="p-6 md:p-8">
          <Stepper currentStep={step} />

          {error && (
            <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
          )}

          {step === 1 && (
            <div className="mt-8 space-y-4">

              {/* ── Selector número de personas ── */}
              <div className="rounded-xl border border-surface-600 p-4">
                <p className="text-sm font-medium text-white mb-3">¿Cuántas personas viajan?</p>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => handleNumPassengersChange(numPassengers - 1)}
                    disabled={numPassengers <= 1}
                    className="grid h-9 w-9 place-items-center rounded-full border border-surface-600 text-ink-soft hover:border-brand-500 hover:text-white disabled:opacity-30 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-2xl font-bold text-white w-8 text-center">{numPassengers}</span>
                  <button
                    type="button"
                    onClick={() => handleNumPassengersChange(numPassengers + 1)}
                    disabled={numPassengers >= 20}
                    className="grid h-9 w-9 place-items-center rounded-full border border-surface-600 text-ink-soft hover:border-brand-500 hover:text-white disabled:opacity-30 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <span className="text-sm text-ink-muted">
                    {numPassengers === 1 ? '1 persona' : `${numPassengers} personas`}
                  </span>
                </div>
              </div>

              {/* ── Formularios de pasajeros ── */}
              <h2 className="font-semibold text-white">Datos de los pasajeros</h2>

              {passengers.map((p, i) => (
                <div key={i} className="rounded-xl border border-surface-600 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white">Pasajero {i + 1}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Nombre" value={p.name}
                      onChange={e => changePassenger(i, 'name', e.target.value)} required />
                    <Input label="Apellido" value={p.surname}
                      onChange={e => changePassenger(i, 'surname', e.target.value)} required />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-ink-muted">Fecha de nacimiento</label>
                    <input
                      type="date"
                      value={p.birthDate}
                      max={new Date().toISOString().split('T')[0]}
                      onChange={e => changePassenger(i, 'birthDate', e.target.value)}
                      className="mt-1 w-full rounded-lg border border-surface-600 bg-surface-900 px-3 py-2 text-sm text-ink focus:outline-none"
                    />
                    {p.birthDate && (
                      <p className="mt-1 text-xs text-ink-muted">
                        {calculateAge(p.birthDate)} años —{' '}
                        {calculateAge(p.birthDate) < 2
                          ? 'Bebé (5% del precio)'
                          : calculateAge(p.birthDate) < 12
                          ? 'Niño (60% del precio)'
                          : calculateAge(p.birthDate) >= 65
                          ? 'Pensionista (10% descuento)'
                          : 'Adulto (precio completo)'}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {minorError && (
                <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-700">
                  Un menor no puede viajar sin un adulto.
                </p>
              )}

              <div className="rounded-xl border border-surface-600 p-4 space-y-2">
                <p className="text-sm font-medium text-white">Tipo de pensión</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'HALF', label: 'Media pensión' },
                    { value: 'FULL', label: 'Pensión completa' },
                  ].map(o => (
                    <label key={o.value}
                      className="flex items-center gap-2 rounded-lg p-3 cursor-pointer border"
                      style={{ borderColor: typeBoard === o.value ? '#4A8FA8' : 'transparent', background: typeBoard === o.value ? '#DAEEF7' : '' }}>
                      <input type="radio" name="typeBoard" value={o.value}
                        checked={typeBoard === o.value}
                        onChange={() => setTypeBoard(o.value)} />
                      <span className="text-sm" style={{ color: '#1A3A5C' }}>{o.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={isGroup}
                  onChange={e => setIsGroup(e.target.checked)}
                  className="h-4 w-4 rounded" />
                <span className="text-sm text-ink-soft">
                  Reserva de grupo (IMSERSO, colegio — aplica descuento)
                </span>
              </label>

              <div className="flex justify-end pt-2">
                <Button onClick={handleQuote} disabled={loading || minorError || !allFilled}>
                  {loading ? 'Calculando...' : 'Ver cotización'}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && quote && (
            <div className="mt-8 space-y-4">
              <h2 className="font-semibold text-white">Resumen de la cotización</h2>
              <ul className="divide-y divide-surface-700 rounded-xl border border-surface-600 overflow-hidden">
                {quote.passengerDetails?.map((p, i) => (
                  <li key={i} className="flex justify-between px-4 py-3 text-sm">
                    <span className="text-ink-soft">
                      {p.name} {p.surname} — {CATEGORY_LABEL[p.category] ?? p.category}
                    </span>
                    <span className="text-white font-medium">{p.finalPrice}€</span>
                  </li>
                ))}
                {quote.totalDiscount > 0 && (
                  <li className="flex justify-between px-4 py-3 text-sm text-green-400">
                    <span>Descuentos aplicados</span>
                    <span>-{quote.totalDiscount}€</span>
                  </li>
                )}
                <li className="flex justify-between px-4 py-3 text-sm font-bold bg-surface-900">
                  <span className="text-white">Total</span>
                  <span className="text-white">{quote.totalPrice}€</span>
                </li>
              </ul>
              <div className="flex justify-between pt-2">
                <Button variant="ghost" onClick={() => setStep(1)}>
                  <ArrowLeft className="h-4 w-4" /> Atrás
                </Button>
                <Button onClick={() => setStep(3)}>
                  Continuar <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="mt-8 space-y-4">
              <h2 className="font-semibold text-white">Confirmar reserva</h2>
              <ul className="rounded-xl border border-surface-600 divide-y divide-surface-700 overflow-hidden text-sm">
                <li className="flex justify-between px-4 py-3">
                  <span className="text-ink-soft">Destino</span>
                  <span className="text-white">{travel?.destiny}</span>
                </li>
                <li className="flex justify-between px-4 py-3">
                  <span className="text-ink-soft">Fechas</span>
                  <span className="text-white">{travel?.startDate} → {travel?.endDate}</span>
                </li>
                <li className="flex justify-between px-4 py-3">
                  <span className="text-ink-soft">Pensión</span>
                  <span className="text-white">{typeBoard === 'HALF' ? 'Media pensión' : 'Pensión completa'}</span>
                </li>
                <li className="flex justify-between px-4 py-3">
                  <span className="text-ink-soft">Pasajeros</span>
                  <span className="text-white">{passengers.length}</span>
                </li>
                <li className="flex justify-between px-4 py-3 font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-white">{quote?.totalPrice}€</span>
                </li>
              </ul>
              <div className="flex justify-between pt-2">
                <Button variant="ghost" onClick={() => setStep(2)}>
                  <ArrowLeft className="h-4 w-4" /> Atrás
                </Button>
                <Button onClick={handleConfirm} disabled={loading}>
                  {loading ? 'Confirmando...' : 'Confirmar y reservar'}
                  <Check className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="mt-8 flex flex-col items-center gap-4 py-6 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full"
                style={{ background: '#DAEEF7' }}>
                <Check className="h-8 w-8" style={{ color: '#1A3A5C' }} />
              </span>
              <h2 className="text-2xl font-semibold text-white">¡Reserva confirmada!</h2>
              <p className="max-w-md text-sm text-ink-muted">
                Hemos enviado la confirmación a tu correo. Puedes gestionar este viaje
                desde tu perfil cuando quieras.
              </p>
              {booking?.bookingId && (
                <p className="text-sm text-ink-muted">
                  Número de reserva: <span className="font-bold text-white">#{booking.bookingId}</span>
                </p>
              )}
              <Button onClick={() => navigate('/profile')}>Ir a mis reservas</Button>
            </div>
          )}
        </Card>

        <Card as="aside" className="h-fit p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
            Resumen del viaje
          </h2>
          <ul className="mt-4 grid gap-3 text-sm">
            <li className="flex justify-between text-ink-soft">
              <span>Destino</span>
              <span className="text-white">{travel?.destiny ?? '—'}</span>
            </li>
            <li className="flex justify-between text-ink-soft">
              <span>Salida</span>
              <span className="text-white">{travel?.startDate ?? '—'}</span>
            </li>
            <li className="flex justify-between text-ink-soft">
              <span>Vuelta</span>
              <span className="text-white">{travel?.endDate ?? '—'}</span>
            </li>
            <li className="flex justify-between text-ink-soft">
              <span>Hotel</span>
              <span className="text-white">{hotel?.name ?? '—'}</span>
            </li>
            <li className="flex justify-between text-ink-soft">
              <span>Pasajeros</span>
              <span className="text-white">{passengers.length}</span>
            </li>
          </ul>
          {quote?.totalPrice && (
            <>
              <hr className="my-4 border-surface-700" />
              <p className="flex justify-between text-base font-bold text-white">
                <span>Total</span>
                <span>{quote.totalPrice}€</span>
              </p>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}

export default CheckoutPage