import { useDriversCrud } from "../../hooks/useDriversCrud";
import DriverForm from "../../components/forms/DriverForm";
import DriversTable from "../../components/common/DriversTable";

function DriversPage() {
  const {
    drivers,
    editingDriver,
    createDriver,
    updateDriver,
    deleteDriver,
    startEdit,
    cancelEdit,
  } = useDriversCrud();

  const handleDelete = (driver) => {
    const ok = window.confirm(`¿Eliminar a ${driver.name} ${driver.lastname}?`);
    if (ok) deleteDriver(driver.id);
  };

  return (
    <div className="crud-page">
      <div className="crud-page__container">
        <header className="crud-page__header">
          <h1 className="crud-page__title">Gestión de conductores</h1>
          <p className="crud-page__subtitle">
            Crear, editar y eliminar conductores del sistema
          </p>
        </header>

        <DriverForm
          key={editingDriver?.id ?? "new"}
          editingDriver={editingDriver}
          onCreate={createDriver}
          onUpdate={updateDriver}
          onCancel={cancelEdit}
        />

        <DriversTable
          drivers={drivers}
          onEdit={startEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default DriversPage;
