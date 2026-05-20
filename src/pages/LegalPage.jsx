import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { PUBLIC_PATHS } from '../constants/paths'

const LEGAL_CONTENT = {
  privacidad: {
    eyebrow: 'Legal',
    title: 'Política de privacidad',
    updatedAt: 'Actualizado el 16 de mayo de 2026',
    intro:
      'En Nomada tratamos tus datos personales con responsabilidad y solo para prestar nuestros servicios de búsqueda, reserva y gestión de viajes.',
    sections: [
      {
        title: 'Datos que podemos recopilar',
        text: 'Podemos solicitar datos identificativos, datos de contacto, información de reserva, preferencias de viaje y datos técnicos básicos necesarios para mantener la seguridad y mejorar la experiencia de uso.',
      },
      {
        title: 'Finalidad del tratamiento',
        text: 'Utilizamos la información para gestionar solicitudes, tramitar reservas, prestar atención al cliente, enviar comunicaciones relacionadas con el servicio y cumplir obligaciones legales aplicables.',
      },
      {
        title: 'Conservación y derechos',
        text: 'Conservamos los datos durante el tiempo necesario para cada finalidad. Puedes solicitar acceso, rectificación, supresión, oposición, limitación o portabilidad escribiendo a hola@nomadaviajes.com.',
      },
    ],
  },
  terminos: {
    eyebrow: 'Condiciones',
    title: 'Términos y condiciones',
    updatedAt: 'Actualizado el 16 de mayo de 2026',
    intro:
      'Estos términos regulan el uso de la plataforma Nomada y la contratación de servicios de viaje ofrecidos o intermediados a través de la web.',
    sections: [
      {
        title: 'Uso de la plataforma',
        text: 'El usuario se compromete a utilizar la web de forma lícita, aportar información veraz y no realizar acciones que puedan afectar a la seguridad, disponibilidad o funcionamiento del servicio.',
      },
      {
        title: 'Reservas y precios',
        text: 'Las reservas quedan sujetas a disponibilidad, confirmación y condiciones particulares de cada proveedor. Los precios mostrados pueden incluir promociones y se confirmarán antes del pago.',
      },
      {
        title: 'Cancelaciones y responsabilidad',
        text: 'Las cancelaciones, cambios y reembolsos se regirán por las condiciones comunicadas en cada reserva. Nomada no responde por incidencias imputables a terceros proveedores fuera de su control directo.',
      },
    ],
  },
  cookies: {
    eyebrow: 'Preferencias',
    title: 'Cookies',
    updatedAt: 'Actualizado el 16 de mayo de 2026',
    intro:
      'Nomada puede utilizar cookies y tecnologías similares para que la web funcione correctamente y para entender cómo se utiliza el servicio.',
    sections: [
      {
        title: 'Qué son las cookies',
        text: 'Las cookies son pequeños archivos que se guardan en el navegador para recordar información técnica, preferencias o datos de navegación durante una visita o entre visitas.',
      },
      {
        title: 'Tipos de cookies',
        text: 'Podemos usar cookies técnicas necesarias, cookies de preferencias y cookies analíticas agregadas. Las cookies no esenciales se utilizarán conforme a la configuración aceptada por el usuario.',
      },
      {
        title: 'Gestión de cookies',
        text: 'Puedes bloquear, eliminar o configurar las cookies desde tu navegador. Ten en cuenta que desactivar cookies técnicas puede afectar al funcionamiento normal de la plataforma.',
      },
    ],
  },
  copyright: {
    eyebrow: 'Nomada',
    title: 'Copyright',
    updatedAt: 'Actualizado el 16 de mayo de 2026',
    intro:
      'El contenido, diseño, marca, textos, interfaces y recursos visuales de Nomada están protegidos por la normativa de propiedad intelectual e industrial.',
    sections: [
      {
        title: 'Titularidad',
        text: 'Salvo que se indique lo contrario, Nomada es titular o licenciataria de los derechos sobre los elementos publicados en esta plataforma.',
      },
      {
        title: 'Uso permitido',
        text: 'Puedes consultar la web para fines personales y contratar servicios disponibles. No está permitida la reproducción, distribución o transformación de contenidos sin autorización previa.',
      },
      {
        title: 'Contacto',
        text: 'Para solicitar permisos de uso, comunicar incidencias o consultar cualquier cuestión relacionada con derechos de autor, escribe a hola@nomadaviajes.com.',
      },
    ],
  },
}

const LegalPage = () => {
  const { slug } = useParams()
  const content = LEGAL_CONTENT[slug]

  if (!content) {
    return <Navigate to={PUBLIC_PATHS.HOME} replace />
  }

  return (
    <div className="container-page py-12 sm:py-16">
      <Link
        to={PUBLIC_PATHS.HOME}
        className="inline-flex items-center gap-2 text-sm font-semibold text-brand-400 transition-colors hover:text-brand-300"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Volver al inicio
      </Link>

      <section className="mt-8 overflow-hidden rounded-card border border-surface-700/40 bg-gradient-to-b from-brand-100/60 to-surface-950/40 shadow-card backdrop-blur">
        <div className="border-b border-surface-700/40 px-6 py-8 sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-400">
            {content.eyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-white sm:text-5xl">
            {content.title}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-ink-muted sm:text-base">
            {content.intro}
          </p>
          <p className="mt-4 text-xs font-medium text-ink-muted">
            {content.updatedAt}
          </p>
        </div>

        <div className="grid gap-6 px-6 py-8 sm:px-10">
          {content.sections.map((section) => (
            <article key={section.title} className="max-w-4xl">
              <h2 className="text-lg font-semibold text-white">
                {section.title}
              </h2>
              <p className="mt-2 text-sm leading-7 text-ink-muted sm:text-base">
                {section.text}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default LegalPage
