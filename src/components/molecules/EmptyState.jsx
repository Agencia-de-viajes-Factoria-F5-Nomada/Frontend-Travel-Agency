import { Package } from 'lucide-react'
import Button from '../atoms/Button'
import { classNames } from '../../utils/classNames'

const EmptyState = ({
  icon: Icon = Package,
  title = 'No hay datos',
  description,
  actionLabel,
  onAction,
  className,
}) => (
  <div className={classNames('flex flex-col items-center justify-center py-12 text-center', className)}>
    <div className="mb-4 rounded-full bg-surface-800 p-4">
      <Icon className="h-8 w-8 text-ink-muted" />
    </div>
    <h3 className="text-lg font-medium text-ink">{title}</h3>
    {description && <p className="mt-1 text-sm text-ink-muted">{description}</p>}
    {actionLabel && onAction && (
      <Button onClick={onAction} className="mt-4">
        {actionLabel}
      </Button>
    )}
  </div>
)

export default EmptyState