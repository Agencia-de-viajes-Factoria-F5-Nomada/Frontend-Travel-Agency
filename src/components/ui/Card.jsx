import { classNames } from '../../utils/classNames'

const Card = ({ as: Tag = 'div', className, children, ...rest }) => (
  <Tag
    className={classNames(
      'rounded-card border border-surface-700/40 bg-gradient-to-b from-brand-100/60 to-surface-950/40 shadow-card backdrop-blur',
      className,
    )}
    {...rest}
  >
    {children}
  </Tag>
)

export default Card
