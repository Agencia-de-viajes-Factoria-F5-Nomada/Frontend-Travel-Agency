import { Navigate, useParams } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import PageHeader from '../components/ui/PageHeader'

const PERSONAL_SECTIONS = {
  incidencias: {
    title: 'Incidencias',
    description: 'Consulta, registra y sigue el estado de tus incidencias internas.',
    items: ['Nueva incidencia', 'Incidencias abiertas', 'Historial de resoluciones'],
  },
  vacaciones: {
    title: 'Vacaciones',
    description: 'Revisa tus dias disponibles y el estado de tus solicitudes de vacaciones.',
    items: ['Dias disponibles', 'Solicitudes pendientes', 'Calendario de vacaciones'],
  },
  nominas: {
    title: 'Nominas',
    description: 'Accede a tus nominas y documentos salariales disponibles.',
    items: ['Ultima nomina', 'Historico de nominas', 'Descargar justificantes'],
  },
  certificados: {
    title: 'Certificados',
    description: 'Solicita y descarga certificados laborales o administrativos.',
    items: ['Certificado laboral', 'Certificado de retenciones', 'Solicitudes recientes'],
  },
  beneficios: {
    title: 'Beneficios',
    description: 'Consulta los beneficios internos disponibles para tu perfil.',
    items: ['Beneficios activos', 'Condiciones', 'Solicitar informacion'],
  },
  estadisticas: {
    title: 'Estadisticas',
    description: 'Revisa indicadores generales de actividad y rendimiento.',
    items: ['Ventas por periodo', 'Reservas activas', 'Resumen operativo'],
  },
  ventas: {
    title: 'Ventas',
    description: 'Consulta informacion comercial y seguimiento de ventas.',
    items: ['Ventas recientes', 'Objetivos', 'Clientes destacados'],
  },
}

const PersonalAreaPage = () => {
  const { section } = useParams()
  const content = PERSONAL_SECTIONS[section]

  if (!content) {
    return <Navigate to="/profile" replace />
  }

  return (
    <div className="container-page py-12">
      <PageHeader
        eyebrow="Area personal"
        title={content.title}
        description={content.description}
        actions={<Button variant="ghost" to="/profile">Volver a mi perfil</Button>}
      />

      <Card className="mt-8 p-6">
        <div className="grid gap-3 sm:grid-cols-3">
          {content.items.map((item) => (
            <div
              key={item}
              className="rounded-xl border border-surface-700 bg-surface-900/60 px-4 py-4 text-sm font-medium text-ink-soft"
            >
              {item}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default PersonalAreaPage
