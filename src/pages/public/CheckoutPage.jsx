import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import PageHeader from '../../components/ui/PageHeader'
import { CHECKOUT_STEPS } from '../../constants/mockData'
import { PUBLIC_PATHS } from '../../constants/paths'
import { classNames } from '../../utils/classNames'

const Stepper = ({ currentStep }) => (
  <ol className="flex flex-wrap items-center gap-3" aria-label="Progreso de la reserva">
    {CHECKOUT_STEPS.map((step, index) => {
      const isActive = step.id === currentStep
      const isDone = step.id < currentStep
      return (
        <li key={step.id} className="flex items-center gap-3">
          <span
            className={classNames(
              'grid h-8 w-8 place-items-center rounded-full border text-sm font-semibold',
              isDone && 'border-brand-500 bg-brand-500 text-surface-950',
              isActive && 'border-brand-500 text-brand-300',
              !isActive && !isDone && 'border-surface-600 text-ink-muted',
            )}
            aria-current={isActive ? 'step' : undefined}
          >
            {isDone ? <Check className="h-4 w-4" aria-hidden="true" /> : step.id}
          </span>
          <span
            className={classNames(
              'text-sm',
              isActive ? 'font-semibold text-white' : 'text-ink-muted',
            )}
          >
            {step.label}
          </span>
          {index < CHECKOUT_STEPS.length - 1 ? (
            <span aria-hidden="true" className="hidden h-px w-10 bg-surface-600 sm:block" />
          ) : null}
        </li>
      )
    })}
  </ol>
)

const StepContent = ({ step }) => {
  if (step === 1) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Nombre completo" placeholder="Juan Pérez" />
        <Input label="Correo electrónico" type="email" placeholder="juan@ejemplo.com" />
        <Input label="Teléfono" type="tel" placeholder="+34 600 000 000" />
        <Input label="Viajeros" type="number" defaultValue={2} min={1} />
      </div>
    )
  }
  if (step === 2) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Titular de la tarjeta" placeholder="Como aparece en la tarjeta" />
        <Input label="Número de tarjeta" inputMode="numeric" placeholder="0000 0000 0000 0000" />
        <Input label="Caducidad" placeholder="MM/AA" />
        <Input label="CVC" inputMode="numeric" placeholder="123" />
      </div>
    )
  }
  if (step === 3) {
    return (
      <div className="space-y-3 text-sm text-ink-soft">
        <p>Revisa los detalles de tu reserva antes de confirmar.</p>
        <ul className="grid gap-2 rounded-xl border border-surface-600 bg-surface-900 p-4">
          <li className="flex justify-between"><span>Destino</span><span className="text-white">Bali, Indonesia</span></li>
          <li className="flex justify-between"><span>Fechas</span><span className="text-white">12 jun – 22 jun</span></li>
          <li className="flex justify-between"><span>Viajeros</span><span className="text-white">2 adultos</span></li>
          <li className="flex justify-between"><span>Total</span><span className="font-semibold text-white">€2.560</span></li>
        </ul>
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center gap-3 py-6 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-full bg-status-confirmed/15 text-status-confirmed">
        <Check className="h-6 w-6" aria-hidden="true" />
      </span>
      <h2 className="text-2xl font-semibold text-white">Reserva confirmada</h2>
      <p className="max-w-md text-sm text-ink-muted">
        Hemos enviado la confirmación a tu correo. Puedes gestionar este viaje
        desde tu perfil cuando quieras.
      </p>
      <Button to={PUBLIC_PATHS.PROFILE}>Ir a mis reservas</Button>
    </div>
  )
}

const CheckoutPage = () => {
  const [step, setStep] = useState(1)
  const isLast = step === CHECKOUT_STEPS.length
  const isFirst = step === 1

  const handleNext = () => setStep((value) => Math.min(value + 1, CHECKOUT_STEPS.length))
  const handleBack = () => setStep((value) => Math.max(value - 1, 1))

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
          <div className="mt-8">
            <StepContent step={step} />
          </div>

          {!isLast ? (
            <div className="mt-8 flex flex-wrap justify-between gap-3">
              <Button variant="ghost" onClick={handleBack} disabled={isFirst}>
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Atrás
              </Button>
              <Button onClick={handleNext}>
                {step === CHECKOUT_STEPS.length - 1 ? 'Confirmar y pagar' : 'Continuar'}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          ) : null}
        </Card>

        <Card as="aside" aria-label="Resumen del pedido" className="h-fit p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
            Resumen del pedido
          </h2>
          <ul className="mt-4 grid gap-3 text-sm">
            <li className="flex justify-between text-ink-soft">
              <span>Total del viaje</span>
              <span className="text-white">€2.400</span>
            </li>
            <li className="flex justify-between text-ink-soft">
              <span>Tasa de servicio</span>
              <span className="text-white">€90</span>
            </li>
            <li className="flex justify-between text-ink-soft">
              <span>Impuestos</span>
              <span className="text-white">€70</span>
            </li>
          </ul>
          <hr className="my-4 border-surface-700" />
          <p className="flex justify-between text-base font-semibold text-white">
            <span>Total</span>
            <span>€2.560</span>
          </p>
        </Card>
      </div>
    </div>
  )
}

export default CheckoutPage
