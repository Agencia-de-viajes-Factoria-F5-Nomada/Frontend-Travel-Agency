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

  return (
    <div className="admin-users">
      <div className="admin-users__container">
        <header className="admin-users__header">
          <h1 className="admin-users__title">Gestión de usuarios</h1>
          <p className="admin-users__subtitle">
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
          onDelete={deleteUser}
        />
      </div>
    </div>
  );
}

export default UsersPage;
