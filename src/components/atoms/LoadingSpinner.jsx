import { classNames } from '../../utils/classNames'

const SIZE = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
}

const LoadingSpinner = ({ size = 'md', className }) => (
  <div className={classNames('animate-spin rounded-full border-2 border-brand-500 border-t-transparent', SIZE[size], className)} />
)

export default LoadingSpinner