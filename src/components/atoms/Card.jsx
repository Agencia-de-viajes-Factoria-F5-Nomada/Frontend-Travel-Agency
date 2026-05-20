import { classNames } from '../../utils/classNames'

const Card = ({ as: Tag = 'div', className, children, ...rest }) => (
  <Tag
    className={classNames(
      'rounded-card border-[1.5px] border-[#4A8FA8] bg-[rgba(218,238,247,0.06)] shadow-card backdrop-blur-sm',
      className,
    )}
    {...rest}
  >
    {children}
  </Tag>
)

export default Card
