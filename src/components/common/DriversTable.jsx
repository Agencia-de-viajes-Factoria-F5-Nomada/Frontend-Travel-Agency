function DriversTable({ drivers, onEdit, onDelete }) {
  if (drivers.length === 0) {
    return (
      <div className="crud-empty">
        <p>No hay conductores registrados.</p>
      </div>
    );
  }

  return (
    <div className="crud-table-wrapper">
      <table className="crud-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Licencia</th>
            <th>Teléfono</th>
            <th>Disponibilidad</th>
            <th>Estado</th>
            <th className="crud-table__actions-col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((d) => (
            <tr key={d.id}>
              <td>{d.name} {d.lastname}</td>
              <td>{d.licenseNumber}</td>
              <td>{d.phone}</td>
              <td>
                <span className={`crud-badge crud-badge--available-${d.available ? "yes" : "no"}`}>
                  {d.available ? "Disponible" : "Ocupado"}
                </span>
              </td>
              <td>
                <span className={`crud-badge crud-badge--status-${d.active ? "active" : "inactive"}`}>
                  {d.active ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td className="crud-table__actions-col">
                <button className="crud-table__btn crud-table__btn--edit"
                  onClick={() => onEdit(d)}>
                  Editar
                </button>
                <button className="crud-table__btn crud-table__btn--delete"
                  onClick={() => onDelete(d)}>
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

export default DriversTable;
