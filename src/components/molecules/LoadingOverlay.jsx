import LoadingSpinner from '../atoms/LoadingSpinner'
import { classNames } from '../../utils/classNames'

const LoadingOverlay = ({ message = 'Cargando...', className }) => (
  <div className={classNames('flex flex-col items-center justify-center gap-3 p-8', className)}>
    <LoadingSpinner size="lg" />
    {message && <p className="text-sm text-ink-muted">{message}</p>}
  </div>
)

export default LoadingOverlay