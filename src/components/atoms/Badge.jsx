import { classNames } from '../../utils/classNames'

const TONES = {
  brand: 'bg-brand-500/15 text-brand-300 border-brand-500/30',
  confirmed: 'bg-status-confirmed/15 text-status-confirmed border-status-confirmed/30',
  pending: 'bg-status-pending/15 text-status-pending border-status-pending/30',
  warning: 'bg-status-warning/15 text-status-warning border-status-warning/30',
  neutral: 'bg-surface-700 text-ink-soft border-surface-600',
}

const Badge = ({ tone = 'neutral', className, children }) => (
  <span
    className={classNames(
      'inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide',
      TONES[tone],
      className,
    )}
  >
    {children}
  </span>
)

export default Badge
