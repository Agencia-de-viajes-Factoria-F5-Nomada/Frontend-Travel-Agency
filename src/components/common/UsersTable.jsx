function UsersTable({ users, onEdit, onDelete }) {
  const handleDelete = (user) => {
    const ok = window.confirm(`¿Eliminar a ${user.name} ${user.lastname}?`);
    if (ok) onDelete(user.id);
  };

  if (users.length === 0) {
    return (
      <div className="users-table__empty">
        <p>No hay usuarios registrados.</p>
      </div>
    );
  }

  return (
    <div className="users-table-wrapper">
      <table className="users-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Estado</th>
            <th className="users-table__actions-col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name} {u.lastname}</td>
              <td>{u.email}</td>
              <td>
                <span className={`users-table__role users-table__role--${u.role}`}>
                  {u.role}
                </span>
              </td>
              <td>
                <span className={`users-table__status users-table__status--${u.active ? "active" : "inactive"}`}>
                  {u.active ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td className="users-table__actions-col">
                <button className="users-table__btn users-table__btn--edit"
                  onClick={() => onEdit(u)}>
                  Editar
                </button>
                <button className="users-table__btn users-table__btn--delete"
                  onClick={() => handleDelete(u)}>
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
