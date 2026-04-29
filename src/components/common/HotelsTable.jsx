function HotelsTable({ hotels, onEdit, onDelete }) {
  if (hotels.length === 0) {
    return (
      <div className="crud-empty">
        <p>No hay hoteles registrados.</p>
      </div>
    );
  }

  return (
    <div className="crud-table-wrapper">
      <table className="crud-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Ciudad</th>
            <th>Ocupación</th>
            <th>Precio/noche</th>
            <th>Estado</th>
            <th className="crud-table__actions-col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((h) => (
            <tr key={h.id}>
              <td>
                <img className="hotels-table__thumb" src={h.image} alt={h.name} />
              </td>
              <td>{h.name}</td>
              <td>{h.city}</td>
              <td>{h.occupied} / {h.capacity}</td>
              <td>{h.pricePerNight} €</td>
              <td>
                <span className={`crud-badge crud-badge--status-${h.active ? "active" : "inactive"}`}>
                  {h.active ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td className="crud-table__actions-col">
                <button className="crud-table__btn crud-table__btn--edit"
                  onClick={() => onEdit(h)}>
                  Editar
                </button>
                <button className="crud-table__btn crud-table__btn--delete"
                  onClick={() => onDelete(h)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HotelsTable;
