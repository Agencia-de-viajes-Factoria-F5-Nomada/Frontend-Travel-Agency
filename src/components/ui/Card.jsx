import { classNames } from '../../utils/classNames'

const Card = ({ as: Tag = 'div', className, children, ...rest }) => (
  <Tag
    className={classNames(
      'rounded-card border border-surface-700 bg-surface-800 shadow-card',
      className,
    )}
    {...rest}
  >
    {children}
  </Tag>
)

export default Card
