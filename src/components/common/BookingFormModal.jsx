import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { FEATURED_DESTINATIONS } from '../../constants/mockData'

const INITIAL_FORM = {
  destination: '',
  startDate: '',
  endDate: '',
  travelers: 1,
  name: '',
  dni: '',
  email: '',
  phone: '',
  notes: '',
}

const BookingFormModal = ({ open, onClose, onSubmit }) => {
  const [form, setForm] = useState(INITIAL_FORM)

  useEffect(() => {
    if (!open) return undefined

    const handleKey = (event) => {
      if (event.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', handleKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open) setForm(INITIAL_FORM)
  }, [open])

  if (!open) return null

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit?.(form)
    onClose?.()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-form-title"
    >
      <div
        className="absolute inset-0 bg-surface-950/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-card border border-surface-700 bg-surface-800 p-6 shadow-card md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-300">
              Nueva reserva
            </p>
            <h2 id="booking-form-title" className="mt-1 text-2xl font-semibold text-white">
              Planificacion de vieje
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              rellenar datos para comfirmar reserva
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar formulario"
            className="grid h-9 w-9 place-items-center rounded-full border border-surface-600 text-ink-soft hover:bg-surface-700"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <label htmlFor="booking-destination" className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-ink-soft">Destino</span>
            <select
              id="booking-destination"
              name="destination"
              value={form.destination}
              onChange={handleChange}
              required
              className="h-11 rounded-xl border border-surface-600 bg-surface-900 px-4 text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
            >
              <option value="" disabled>
                Selecciona un destino
              </option>
              {FEATURED_DESTINATIONS.map((destination) => (
                <option key={destination.id} value={`${destination.name}, ${destination.country}`}>
                  {destination.name}, {destination.country}
                </option>
              ))}
            </select>
          </label>

          <div className="grid gap-4 md:grid-cols-3">
            <Input
              label="Fecha de inicio"
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
            />
            <Input
              label="Fecha de fin"
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              required
            />
            <Input
              label="Viajeros"
              type="number"
              name="travelers"
              min={1}
              max={20}
              value={form.travelers}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Nombre completo"
              name="name"
              placeholder="Marta Sánchez"
              value={form.name}
              onChange={handleChange}
              required
            />
            <Input
              label="DNI"
              name="dni"
              placeholder="12345678A"
              value={form.dni}
              onChange={handleChange}
              required
            />
            <Input
              label="Correo electrónico"
              type="email"
              name="email"
              placeholder="marta@travel.io"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Teléfono"
              type="tel"
              name="phone"
              placeholder="+34 600 000 000"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <label htmlFor="booking-notes" className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-ink-soft">Notas (opcional)</span>
            <textarea
              id="booking-notes"
              name="notes"
              rows={3}
              value={form.notes}
              onChange={handleChange}
              placeholder="Preferencias, alergias, ocasiones especiales…"
              className="rounded-xl border border-surface-600 bg-surface-900 px-4 py-3 text-ink placeholder:text-ink-muted focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
            />
          </label>

          <div className="mt-2 flex flex-wrap justify-end gap-3">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Confirmar reserva</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BookingFormModal
