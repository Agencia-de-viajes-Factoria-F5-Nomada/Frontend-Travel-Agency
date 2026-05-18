import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import Input from '../atoms/Input'
import { classNames } from '../../utils/classNames'

const SearchInput = ({
  value,
  onChange,
  placeholder = 'Buscar...',
  onSubmit,
  debounce = 0,
  showClear = true,
  className
}) => {
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  useEffect(() => {
    if (debounce <= 0) return

    const timer = setTimeout(() => {
      onChange?.({ target: { value: localValue } })
    }, debounce)

    return () => clearTimeout(timer)
  }, [localValue, debounce, onChange])

  const handleClear = () => {
    setLocalValue('')
    onChange?.({ target: { value: '' } })
  }

  return (
    <div className={className}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
        <Input
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          placeholder={placeholder}
          className={classNames('pl-10', showClear && localValue && 'pr-10')}
          onKeyDown={(e) => e.key === 'Enter' && onSubmit?.()}
        />
        {showClear && localValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchInput