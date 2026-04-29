function BusesTable({ buses, onEdit, onDelete }) {
  if (buses.length === 0) {
    return (
      <div className="crud-empty">
        <p>No hay autobuses registrados.</p>
      </div>
    );
  }

  return (
    <div className="crud-table-wrapper">
      <table className="crud-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Matrícula</th>
            <th>Modelo</th>
            <th>Ocupación</th>
            <th>Estado</th>
            <th className="crud-table__actions-col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {buses.map((b) => (
            <tr key={b.id}>
              <td>
                <img className="buses-table__thumb" src={b.image} alt={b.model} />
              </td>
              <td>{b.plate}</td>
              <td>{b.model}</td>
              <td>{b.occupied} / {b.seats}</td>
              <td>
                <span className={`crud-badge crud-badge--status-${b.active ? "active" : "inactive"}`}>
                  {b.active ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td className="crud-table__actions-col">
                <button className="crud-table__btn crud-table__btn--edit"
                  onClick={() => onEdit(b)}>
                  Editar
                </button>
                <button className="crud-table__btn crud-table__btn--delete"
                  onClick={() => onDelete(b)}>
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

export default BusesTable;
