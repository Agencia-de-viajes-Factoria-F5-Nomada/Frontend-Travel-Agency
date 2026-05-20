import { classNames } from '../../utils/classNames'

const Radio = ({
  name,
  value,
  checked,
  onChange,
  label,
  disabled = false,
  className
}) => (
  <label className={classNames('inline-flex items-center gap-2 cursor-pointer', disabled && 'opacity-50 cursor-not-allowed', className)}>
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      className="h-4 w-4 border-surface-600 text-brand-500 focus:ring-brand-500 focus:ring-offset-2"
    />
    {label && <span className="text-sm text-ink">{label}</span>}
  </label>
)

export default Radio