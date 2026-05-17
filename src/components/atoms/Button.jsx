import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { classNames } from '../../utils/classNames'

const VARIANT_STYLES = {
  primary:
    'bg-brand-500 text-white hover:bg-brand-400 active:bg-brand-600 shadow-card',
  secondary:
    'bg-surface-700 text-white hover:bg-surface-600 active:bg-surface-800 border border-surface-600',
  ghost:
    'bg-transparent text-white hover:bg-surface-700 active:bg-surface-800',
  danger:
    'bg-status-pending text-white hover:bg-red-500 active:bg-red-600 shadow-card',
}

const SIZE_STYLES = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-7 text-base',
  icon: 'h-10 w-10 p-0',
}

// Usar la utilidad global .btn definida en src/index.css para mantener consistencia
// Añadir micro-animaciones: ligero escalado en hover y foco visible definido por utilidades Tailwind
const BASE_STYLES = 'btn transform-gpu hover:scale-[1.03] focus-visible:scale-[1.01]'

const Button = forwardRef(function Button(
  {
    as,
    to,
    href,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className,
    children,
    type = 'button',
    ...rest
  },
  ref,
) {
  const composed = classNames(
    BASE_STYLES,
    VARIANT_STYLES[variant],
    SIZE_STYLES[size],
    fullWidth && 'w-full',
    className,
  )

  if (to) {
    return (
      <Link ref={ref} to={to} className={composed} {...rest}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a ref={ref} href={href} className={composed} {...rest}>
        {children}
      </a>
    )
  }

  const Tag = as || 'button'
  const tagProps = Tag === 'button' ? { type } : {}

  return (
    <Tag ref={ref} className={composed} {...tagProps} {...rest}>
      {children}
    </Tag>
  )
})

export default Button