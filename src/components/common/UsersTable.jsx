function UsersTable({ users, onEdit, onDelete }) {
  if (users.length === 0) {
    return (
      <div className="crud-empty">
        <p>No hay usuarios registrados.</p>
      </div>
    );
  }

  return (
    <div className="crud-table-wrapper">
      <table className="crud-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Estado</th>
            <th className="crud-table__actions-col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name} {u.lastname}</td>
              <td>{u.email}</td>
              <td>
                <span className={`crud-badge crud-badge--role-${u.role}`}>
                  {u.role}
                </span>
              </td>
              <td>
                <span className={`crud-badge crud-badge--status-${u.active ? "active" : "inactive"}`}>
                  {u.active ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td className="crud-table__actions-col">
                <button className="crud-table__btn crud-table__btn--edit"
                  onClick={() => onEdit(u)}>
                  Editar
                </button>
                <button className="crud-table__btn crud-table__btn--delete"
                  onClick={() => onDelete(u)}>
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

export default UsersTable;
