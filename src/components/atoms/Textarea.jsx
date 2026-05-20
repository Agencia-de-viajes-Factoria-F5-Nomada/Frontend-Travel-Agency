import { forwardRef } from 'react'
import { classNames } from '../../utils/classNames'

const Textarea = forwardRef(({
  value,
  onChange,
  name,
  id,
  placeholder,
  rows = 3,
  disabled = false,
  error = false,
  className,
  ...props
}, ref) => {
  return (
    <textarea
      ref={ref}
      id={id || name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      className={classNames(
        'w-full rounded-lg border px-4 py-2.5 text-sm transition-colors resize-none',
        'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
        error ? 'border-red-500 focus:ring-red-500' : 'border-surface-600 hover:border-surface-500',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...props}
    />
  )
})

export default Textarea