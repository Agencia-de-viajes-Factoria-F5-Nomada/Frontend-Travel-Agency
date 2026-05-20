import Checkbox from '../atoms/Checkbox'
import { classNames } from '../../utils/classNames'

const CheckboxField = ({
  label,
  name,
  checked,
  onChange,
  error,
  disabled = false,
  className,
}) => {
  return (
    <div className={classNames('space-y-1', className)}>
      <Checkbox
        name={name}
        label={label}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

export default CheckboxField