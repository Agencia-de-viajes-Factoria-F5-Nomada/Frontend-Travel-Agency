import { forwardRef, useId } from 'react'
import { classNames } from '../../utils/classNames'

const Input = forwardRef(function Input(
  { label, hint, type = 'text', className, id, ...rest },
  ref,
) {
  const generatedId = useId()
  const inputId = id || generatedId

  return (
    <label htmlFor={inputId} className="flex flex-col gap-1.5 text-sm">
      {label ? <span className="font-medium text-ink-soft">{label}</span> : null}
      <input
        ref={ref}
        id={inputId}
        type={type}
        className={classNames(
          'h-11 rounded-xl border border-surface-600 bg-surface-900 px-4 text-ink placeholder:text-ink-muted',
          'focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40',
          className,
        )}
        {...rest}
      />
      {hint ? <span className="text-xs text-ink-muted">{hint}</span> : null}
    </label>
  )
})

export default Input
