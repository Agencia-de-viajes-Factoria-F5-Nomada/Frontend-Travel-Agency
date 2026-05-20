import Select from '../atoms/Select'
import { classNames } from '../../utils/classNames'

const SelectField = ({
  label,
  name,
  options = [],
  value,
  onChange,
  error,
  required = false,
  placeholder = 'Seleccionar...',
  disabled = false,
  hint,
  className,
}) => {
  return (
    <div className={classNames('space-y-1', className)}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-ink">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <Select
        options={options}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        error={error}
      />
      {hint && !error && <p className="text-xs text-ink-muted">{hint}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

export default SelectField