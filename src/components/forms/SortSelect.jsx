function SortSelect({ value, onChange }) {
  return (
    <select value={value} onChange={onChange} className="sort-select">
      <option value="rating">Mejor valoración</option>
      <option value="price-asc">Precio menor a mayor</option>
      <option value="price-desc">Precio mayor a menor</option>
    </select>
  );
}

export default SortSelect;
