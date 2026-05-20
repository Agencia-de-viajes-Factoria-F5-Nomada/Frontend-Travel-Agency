import { X, AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react'
import { classNames } from '../../utils/classNames'

const ICONS = {
  error: AlertCircle,
  success: CheckCircle,
  warning: AlertTriangle,
  info: Info,
}

const STYLES = {
  error: 'bg-red-50 border-red-200 text-red-700',
  success: 'bg-green-50 border-green-200 text-green-700',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
  info: 'bg-blue-50 border-blue-200 text-blue-700',
}

const Alert = ({ type = 'info', title, message, onClose, className }) => {
  const Icon = ICONS[type]

  return (
    <div className={classNames('flex items-start gap-3 rounded-lg border p-4', STYLES[type], className)}>
      <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        {title && <p className="font-medium">{title}</p>}
        {message && <p className="text-sm opacity-90">{message}</p>}
      </div>
      {onClose && (
        <button onClick={onClose} className="flex-shrink-0 hover:opacity-70">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export default Alert