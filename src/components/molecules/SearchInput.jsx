import { Search } from 'lucide-react'
import Input from '../atoms/Input'
import { classNames } from '../../utils/classNames'

const SearchInput = ({
  value,
  onChange,
  placeholder = 'Buscar...',
  onSubmit,
  className
}) => (
  <div className={className}>
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="pl-10"
        onKeyDown={(e) => e.key === 'Enter' && onSubmit?.()}
      />
    </div>
  </div>
)

export default SearchInput