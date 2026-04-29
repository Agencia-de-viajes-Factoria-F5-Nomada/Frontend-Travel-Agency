import { useUsersCrud } from "../../hooks/useUsersCrud";
import UserForm from "../../components/forms/UserForm";
import UsersTable from "../../components/common/UsersTable";

function UsersPage() {
  const {
    users,
    editingUser,
    createUser,
    updateUser,
    deleteUser,
    startEdit,
    cancelEdit,
  } = useUsersCrud();

  const handleDelete = (user) => {
    const ok = window.confirm(`¿Eliminar a ${user.name} ${user.lastname}?`);
    if (ok) deleteUser(user.id);
  };

  return (
    <div className="crud-page">
      <div className="crud-page__container">
        <header className="crud-page__header">
          <h1 className="crud-page__title">Gestión de usuarios</h1>
          <p className="crud-page__subtitle">
            Crear, editar y eliminar usuarios del sistema
          </p>
        </header>

        <UserForm
          key={editingUser?.id ?? "new"}
          editingUser={editingUser}
          onCreate={createUser}
          onUpdate={updateUser}
          onCancel={cancelEdit}
        />

        <UsersTable
          users={users}
          onEdit={startEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default UsersPage;
