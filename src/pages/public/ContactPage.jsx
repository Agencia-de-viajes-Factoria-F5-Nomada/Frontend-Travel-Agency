import { Mail, MapPin, Phone, Send } from 'lucide-react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import PageHeader from '../../components/ui/PageHeader'

const CHANNELS = [
  { icon: Mail, label: 'Correo', value: 'hola@travel-agency.io' },
  { icon: Phone, label: 'Teléfono', value: '+34 900 123 456' },
  { icon: MapPin, label: 'Oficina', value: 'Calle Mayor 1, Madrid' },
]

const ContactPage = () => (
  <div className="container-page py-12">
    <PageHeader
      eyebrow="Contacto"
      title="Estamos aquí para ayudarte"
      description="Cuéntanos sobre tu viaje y uno de nuestros expertos te responderá en menos de 24 horas."
    />

    <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
      <Card className="p-6 md:p-8">
        <form className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Nombre completo" placeholder="Juan Pérez" />
            <Input label="Correo electrónico" type="email" placeholder="tu@ejemplo.com" />
          </div>
          <Input label="Asunto" placeholder="¿En qué podemos ayudarte?" />
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-ink-soft">Mensaje</span>
            <textarea
              rows={6}
              placeholder="Cuéntanos un poco sobre el viaje de tus sueños…"
              className="rounded-xl border border-surface-600 bg-surface-900 px-4 py-3 text-ink placeholder:text-ink-muted focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
            />
          </label>
          <Button size="lg" className="md:w-fit">
            <Send className="h-4 w-4" aria-hidden="true" />
            Enviar mensaje
          </Button>
        </form>
      </Card>

      <Card as="aside" aria-label="Canales de contacto" className="h-fit p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
          Otros canales
        </h2>
        <ul className="mt-4 grid gap-4">
          {CHANNELS.map((channel) => (
            <li key={channel.label} className="flex items-start gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500/10 text-brand-400">
                <channel.icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wide text-ink-muted">
                  {channel.label}
                </p>
                <p className="text-sm text-white">{channel.value}</p>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  </div>
)

export default ContactPage
