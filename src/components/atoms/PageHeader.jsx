import { classNames } from '../../utils/classNames'

const PageHeader = ({ eyebrow, title, description, className }) => (
  <div className={classNames('space-y-1', className)}>
    {eyebrow && <p className="text-sm font-medium text-brand-400">{eyebrow}</p>}
    {title && <h1 className="text-3xl font-bold text-ink">{title}</h1>}
    {description && <p className="text-ink-soft">{description}</p>}
  </div>
)

export default PageHeader