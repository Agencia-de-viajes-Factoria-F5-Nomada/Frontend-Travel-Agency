import Button from '../components/ui/Button'
import { PUBLIC_PATHS } from '../constants/paths'

const NotFoundPage = () => (
  <div className="container-page grid place-items-center py-24 text-center">
    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-400">
      404
    </p>
    <h1 className="mt-3 text-4xl font-semibold text-white md:text-5xl">
      Página no encontrada
    </h1>
    <p className="mt-3 max-w-md text-sm text-ink-muted">
      La página que buscas no existe o ha sido movida.
    </p>
    <Button to={PUBLIC_PATHS.HOME} className="mt-6">
      Volver al inicio
    </Button>
  </div>
)

export default NotFoundPage
