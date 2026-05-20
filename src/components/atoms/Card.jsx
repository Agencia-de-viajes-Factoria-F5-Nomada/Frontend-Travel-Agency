import { classNames } from '../../utils/classNames'

const Card = ({ as: Tag = 'div', className, children, ...rest }) => (
  <Tag
    className={classNames(
      'rounded-card border-[1.5px] border-accent bg-accent-light/[0.06] shadow-card backdrop-blur-sm',
      className,
    )}
    {...rest}
  >
    {children}
  </Tag>
)

export default Card
