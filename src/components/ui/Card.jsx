import { classNames } from '../../utils/classNames'

const Card = ({ as: Tag = 'div', className, children, ...rest }) => (
  <Tag
    className={classNames(
      'rounded-card border border-brand-500/25 bg-surface-800 shadow-card',
      className,
    )}
    {...rest}
  >
    {children}
  </Tag>
)

export default Card
