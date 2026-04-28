import { useMemo } from "react";

function FiltersPanel({ filters, onFilterChange }) {
  const handlePriceChange = (e) => {
    onFilterChange({
      ...filters,
      maxPrice: parseFloat(e.target.value),
    });
  };

  const handlePensionChange = (e) => {
    onFilterChange({
      ...filters,
      pensionType: e.target.value,
    });
  };

  const handleRatingChange = (e) => {
    onFilterChange({
      ...filters,
      minRating: parseFloat(e.target.value),
    });
  };

  const handleSortChange = (e) => {
    onFilterChange({
      ...filters,
      sortBy: e.target.value,
    });
  };

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
            onChange={handlePriceChange}
            className="filters-panel__range"
          />
          <span className="filters-panel__value">${filters.maxPrice}</span>
        </div>
      </div>

      <div className="filters-panel__section">
        <label className="filters-panel__label">Tipo de pensión</label>
        <div className="filters-panel__options">
          <label className="filters-panel__checkbox">
            <input
              type="radio"
              name="pension"
              value="all"
              checked={filters.pensionType === "all"}
              onChange={handlePensionChange}
            />
            Todos
          </label>
          <label className="filters-panel__checkbox">
            <input
              type="radio"
              name="pension"
              value="media"
              checked={filters.pensionType === "media"}
              onChange={handlePensionChange}
            />
            Media pensión
          </label>
          <label className="filters-panel__checkbox">
            <input
              type="radio"
              name="pension"
              value="completa"
              checked={filters.pensionType === "completa"}
              onChange={handlePensionChange}
            />
            Pensión completa
          </label>
        </div>
      </div>

      <div className="filters-panel__section">
        <label className="filters-panel__label">Valoración mínima</label>
        <div className="filters-panel__rating-options">
          <label className="filters-panel__checkbox">
            <input
              type="radio"
              name="rating"
              value="0"
              checked={filters.minRating === 0}
              onChange={handleRatingChange}
            />
            Cualquiera
          </label>
          <label className="filters-panel__checkbox">
            <input
              type="radio"
              name="rating"
              value="3"
              checked={filters.minRating === 3}
              onChange={handleRatingChange}
            />
            ⭐⭐⭐+
          </label>
          <label className="filters-panel__checkbox">
            <input
              type="radio"
              name="rating"
              value="4"
              checked={filters.minRating === 4}
              onChange={handleRatingChange}
            />
            ⭐⭐⭐⭐+
          </label>
          <label className="filters-panel__checkbox">
            <input
              type="radio"
              name="rating"
              value="4.5"
              checked={filters.minRating === 4.5}
              onChange={handleRatingChange}
            />
            ⭐⭐⭐⭐⭐
          </label>
        </div>
      </div>

      <div className="filters-panel__section">
        <label className="filters-panel__label">Ordenar por</label>
        <select
          value={filters.sortBy}
          onChange={handleSortChange}
          className="filters-panel__select"
        >
          <option value="rating">Mejor valoración</option>
          <option value="price-asc">Precio menor a mayor</option>
          <option value="price-desc">Precio mayor a menor</option>
        </select>
      </div>
    </aside>
  );
}

export default FiltersPanel;
