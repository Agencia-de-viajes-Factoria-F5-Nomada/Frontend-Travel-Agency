import { classNames } from '../../utils/classNames'

const Avatar = ({
  src,
  alt,
  fallback,
  size = 'md',
  className
}) => {
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
  }

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={classNames('rounded-full object-cover', sizes[size], className)}
      />
    )
  }

  return (
    <div className={classNames(
      'flex items-center justify-center rounded-full bg-brand-500 text-white font-medium',
      sizes[size],
      className
    )}>
      {fallback || '?'}
    </div>
  )
}

export default Avatar