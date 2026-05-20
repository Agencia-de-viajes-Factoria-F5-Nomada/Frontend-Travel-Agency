import { SlidersHorizontal, Star } from 'lucide-react'
import Card from '../atoms/Card'
import Button from '../atoms/Button'

const DURATION_OPTIONS = [
  { label: '1-3 dias', min: 1, max: 3 },
  { label: '4-7 dias', min: 4, max: 7 },
  { label: '8-14 dias', min: 8, max: 14 },
  { label: '15+ dias', min: 15, max: Infinity },
]

const DISCOUNT_OPTIONS = [5, 10, 15, 20]

const FiltersCard = ({
  priceRange, setPriceRange,
  onlyOffers, setOnlyOffers,
  regions, selectedRegions, setSelectedRegions,
  durationRange, setDurationRange,
  starFilter, setStarFilter,
  availabilityOnly, setAvailabilityOnly,
  minDiscount, setMinDiscount,
  boardType, setBoardType,
  onClearFilters,
}) => {

  const toggleRegion = (region) => {
    if (!setSelectedRegions) return
    setSelectedRegions(prev =>
      prev.includes(region) ? prev.filter(r => r !== region) : [...prev, region]
    )
  }

  const toggleStar = (star) => {
    if (!setStarFilter) return
    setStarFilter(prev =>
      prev.includes(star) ? prev.filter(s => s !== star) : [...prev, star]
    )
  }

  const toggleDuration = (option) => {
    if (!setDurationRange) return
    if (durationRange && durationRange.min === option.min && durationRange.max === option.max) {
      setDurationRange(null)
    } else {
      setDurationRange({ min: option.min, max: option.max })
    }
  }

  const toggleDiscount = (value) => {
    if (!setMinDiscount) return
    setMinDiscount(minDiscount === value ? null : value)
  }

  return (
    <Card as="aside" aria-label="Filtros" className="h-fit p-6">
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal className="h-4 w-4 text-brand-400" />
        <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
          Filtros
        </h3>
      </div>

      {/* ── Tipo de pension ── */}
      {setBoardType && (
        <div className="mb-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Tipo de pensión
          </p>
          <div className="flex rounded-lg overflow-hidden border border-surface-700">
            <button type="button" onClick={() => setBoardType('half')}
              className={`flex-1 px-3 py-2 text-xs font-medium transition-colors
                ${boardType === 'half' ? 'bg-brand-500 text-white' : 'bg-surface-800 text-ink-soft hover:bg-surface-700'}`}>
              Media pensión
            </button>
            <button type="button" onClick={() => setBoardType('full')}
              className={`flex-1 px-3 py-2 text-xs font-medium transition-colors
                ${boardType === 'full' ? 'bg-brand-500 text-white' : 'bg-surface-800 text-ink-soft hover:bg-surface-700'}`}>
              Pensión completa
            </button>
          </div>
        </div>
      )}

      {/* ── Precio ── */}
      <div className="mb-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">Precio</p>
        <div className="space-y-2">
          <input type="range" min="0" max="5000" step="50"
            value={priceRange.max}
            onChange={(e) => setPriceRange(p => ({ ...p, max: Number(e.target.value) }))}
            className="w-full accent-brand-500" />
          <div className="flex justify-between text-xs text-ink-muted">
            <span>0€</span>
            <span>{priceRange.max}€</span>
          </div>
        </div>
      </div>

      {/* ── País ── */}
      {setSelectedRegions && regions && regions.length > 0 && (
        <div className="mb-6 border-t border-surface-700 pt-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            País
          </p>
          <div className="space-y-2 pr-1">
            {regions.map(region => (
              <label key={region} className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox"
                  checked={selectedRegions?.includes(region) ?? false}
                  onChange={() => toggleRegion(region)}
                  className="h-4 w-4 rounded accent-brand-500" />
                <span className="text-sm text-ink-soft">{region}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* ── Duración ── */}
      {setDurationRange !== undefined && setDurationRange !== null && (
        <div className="mb-6 border-t border-surface-700 pt-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Duración
          </p>
          <div className="flex flex-wrap gap-2">
            {DURATION_OPTIONS.map(option => {
              const isActive = durationRange &&
                durationRange.min === option.min && durationRange.max === option.max
              return (
                <button key={option.label} type="button" onClick={() => toggleDuration(option)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors
                    ${isActive ? 'bg-brand-500 text-white' : 'bg-surface-700 text-ink-soft hover:bg-surface-600'}`}>
                  {option.label}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Estrellas del hotel ── */}
      {setStarFilter && (
        <div className="mb-6 border-t border-surface-700 pt-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Estrellas del hotel
          </p>
          <div className="space-y-2">
            {[5, 4, 3].map(star => (
              <label key={star} className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox"
                  checked={starFilter?.includes(star) ?? false}
                  onChange={() => toggleStar(star)}
                  className="h-4 w-4 rounded accent-brand-500" />
                <span className="flex items-center gap-0.5">
                  {[...Array(star)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* ── Disponibilidad ── */}
      {setAvailabilityOnly && (
        <div className="mb-6 border-t border-surface-700 pt-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox"
              checked={availabilityOnly ?? false}
              onChange={e => setAvailabilityOnly(e.target.checked)}
              className="h-4 w-4 rounded accent-brand-500" />
            <span className="text-sm text-ink-soft">Solo con plazas disponibles</span>
          </label>
        </div>
      )}

      {/* ── Descuento mínimo ── */}
      {setMinDiscount && (
        <div className="mb-6 border-t border-surface-700 pt-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Descuento mínimo
          </p>
          <div className="flex flex-wrap gap-2">
            {DISCOUNT_OPTIONS.map(value => {
              const isActive = minDiscount === value
              return (
                <button key={value} type="button" onClick={() => toggleDiscount(value)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors
                    ${isActive ? 'bg-brand-500 text-white' : 'bg-surface-700 text-ink-soft hover:bg-surface-600'}`}>
                  {value}%+
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Solo ofertas ── */}
      {setOnlyOffers && (
        <div className="mb-6 border-t border-surface-700 pt-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox"
              checked={onlyOffers}
              onChange={e => setOnlyOffers(e.target.checked)}
              className="h-4 w-4 rounded" />
            <span className="text-sm text-ink-soft">Solo viajes en oferta</span>
          </label>
        </div>
      )}

      {/* ── Limpiar ── */}
      <Button variant="ghost" size="sm" fullWidth onClick={onClearFilters}>
        Limpiar filtros
      </Button>
    </Card>
  )
}

export default FiltersCard