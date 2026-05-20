import { classNames } from '../../utils/classNames'

const Label = ({ htmlFor, required = false, className, children }) => (
  <label
    htmlFor={htmlFor}
    className={classNames('text-sm font-medium text-ink', className)}
  >
    {children}
    {required && <span className="text-red-500 ml-0.5"> *</span>}
  </label>
)

export default Label