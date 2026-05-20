import Input from '../atoms/Input'
import { classNames } from '../../utils/classNames'

const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  placeholder,
  disabled = false,
  hint,
  step,
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
      <Input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        error={error}
        step={step}
      />
      {hint && !error && <p className="text-xs text-ink-muted">{hint}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

export default FormField