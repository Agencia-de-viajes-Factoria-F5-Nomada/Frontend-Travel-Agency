import { SlidersHorizontal } from 'lucide-react'
import Card from '../atoms/Card'
import Button from '../atoms/Button'

const FiltersCard = ({ priceRange, setPriceRange, onlyOffers, setOnlyOffers, onClearFilters }) => {
  return (
    <Card as="aside" aria-label="Filtros" className="h-fit p-6">
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal className="h-4 w-4 text-brand-400" />
        <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
          Filtros
        </h3>
      </div>

      {/* Precio */}
      <div className="mb-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">Precio</p>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="5000"
            step="50"
            value={priceRange.max}
            onChange={(e) => setPriceRange(p => ({ ...p, max: Number(e.target.value) }))}
            className="w-full accent-brand-500"
          />
          <div className="flex justify-between text-xs text-ink-muted">
            <span>0€</span>
            <span>{priceRange.max}€</span>
          </div>
        </div>
      </div>

      {/* Solo ofertas */}
      <div className="mb-6 border-t border-surface-700 pt-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={onlyOffers}
            onChange={e => setOnlyOffers(e.target.checked)}
            className="h-4 w-4 rounded"
          />
          <span className="text-sm text-ink-soft">Solo viajes en oferta</span>
        </label>
      </div>

      {/* Limpiar */}
      <Button
        variant="ghost"
        size="sm"
        fullWidth
        onClick={onClearFilters}
      >
        Limpiar filtros
      </Button>
    </Card>
  )
}

export default FiltersCard