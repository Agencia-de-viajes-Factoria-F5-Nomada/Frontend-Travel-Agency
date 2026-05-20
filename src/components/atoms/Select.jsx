import { classNames } from '../../utils/classNames'

const Select = ({
  options = [],
  value,
  onChange,
  name,
  id,
  placeholder = 'Seleccionar...',
  disabled = false,
  error = false,
  className,
  ...props
}) => {
  return (
    <select
      id={id || name}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={classNames(
        'w-full rounded-lg border px-4 py-2.5 text-sm transition-colors',
        'bg-surface-900 text-ink',
        'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-surface-950',
        error ? 'border-red-500 focus:ring-red-500' : 'border-surface-600 hover:border-surface-500',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...props}
    >
      <option value="" className="bg-surface-900">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="bg-surface-900">
          {opt.label}
        </option>
      ))}
    </select>
  )
}

export default Select