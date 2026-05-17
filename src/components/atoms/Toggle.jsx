import { classNames } from '../../utils/classNames'

const Toggle = ({
  checked,
  onChange,
  name,
  id,
  label,
  disabled = false,
  className
}) => (
  <label className={classNames('inline-flex items-center gap-3 cursor-pointer', disabled && 'opacity-50 cursor-not-allowed', className)}>
    <div className="relative">
      <input
        type="checkbox"
        name={name}
        id={id || name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="sr-only"
      />
      <div className={classNames(
        'h-6 w-11 rounded-full transition-colors',
        checked ? 'bg-brand-500' : 'bg-surface-600'
      )} />
      <div className={classNames(
        'absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform',
        checked && 'translate-x-5'
      )} />
    </div>
    {label && <span className="text-sm text-ink">{label}</span>}
  </label>
)

export default Toggle