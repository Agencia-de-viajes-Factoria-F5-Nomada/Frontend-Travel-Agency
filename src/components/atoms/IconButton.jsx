import { classNames } from '../../utils/classNames'
import { forwardRef } from 'react'

const IconButton = forwardRef(({
  icon: Icon,
  ariaLabel,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  ...props
}, ref) => {
  const base = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-brand-500 text-white hover:bg-brand-400 active:bg-brand-600',
    secondary: 'bg-surface-700 text-white hover:bg-surface-600 active:bg-surface-800 border border-surface-600',
    ghost: 'bg-transparent text-white hover:bg-surface-700 active:bg-surface-800',
    danger: 'bg-red-500 text-white hover:bg-red-400 active:bg-red-600',
  }
  
  const sizes = {
    sm: 'h-8 w-8 p-1.5',
    md: 'h-10 w-10 p-2',
    lg: 'h-12 w-12 p-2.5',
  }

  return (
    <button
      ref={ref}
      className={classNames(base, variants[variant], sizes[size], className)}
      aria-label={ariaLabel}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon className="h-5 w-5" />}
    </button>
  )
})

export default IconButton