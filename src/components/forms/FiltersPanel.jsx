import SortSelect from "./SortSelect";

const PENSION_OPTIONS = [
  { value: "all", label: "Todos" },
  { value: "media", label: "Media pensión" },
  { value: "completa", label: "Pensión completa" },
];

const RATING_OPTIONS = [
  { value: 0, label: "Cualquiera" },
  { value: 3, label: "⭐⭐⭐+" },
  { value: 4, label: "⭐⭐⭐⭐+" },
  { value: 4.5, label: "⭐⭐⭐⭐⭐" },
];

function RadioGroup({ name, value, options, onChange }) {
  return (
    <div className="filters-panel__options">
      {options.map((opt) => (
        <label key={opt.value} className="filters-panel__checkbox">
          <input
            type="radio"
            name={name}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
}

function FiltersPanel({ filters, onFilterChange }) {
  const update = (key, value) => onFilterChange({ ...filters, [key]: value });

  return (
    <aside className="filters-panel">
      <div className="filters-panel__section">
        <h3 className="filters-panel__title">Filtros</h3>
      </div>

      <div className="filters-panel__section">
        <label className="filters-panel__label">Precio máximo</label>
        <div className="filters-panel__range-container">
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={filters.maxPrice}
            onChange={(e) => update("maxPrice", parseFloat(e.target.value))}
            className="filters-panel__range"
          />
          <span className="filters-panel__value">${filters.maxPrice}</span>
        </div>
      </div>

      <div className="filters-panel__section">
        <label className="filters-panel__label">Tipo de pensión</label>
        <RadioGroup
          name="pension"
          value={filters.pensionType}
          options={PENSION_OPTIONS}
          onChange={(v) => update("pensionType", v)}
        />
      </div>

      <div className="filters-panel__section">
        <label className="filters-panel__label">Valoración mínima</label>
        <RadioGroup
          name="rating"
          value={filters.minRating}
          options={RATING_OPTIONS}
          onChange={(v) => update("minRating", v)}
        />
      </div>

      <div className="filters-panel__section">
        <label className="filters-panel__label">Ordenar por</label>
        <SortSelect
          value={filters.sortBy}
          onChange={(e) => update("sortBy", e.target.value)}
        />
      </div>
    </aside>
  );
}

export default FiltersPanel;
