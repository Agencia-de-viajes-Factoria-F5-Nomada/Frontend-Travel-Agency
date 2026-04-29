import { useBusesCrud } from "../../hooks/useBusesCrud";
import BusForm from "../../components/forms/BusForm";
import BusesTable from "../../components/common/BusesTable";

function BusesPage() {
  const {
    buses,
    editingBus,
    createBus,
    updateBus,
    deleteBus,
    startEdit,
    cancelEdit,
  } = useBusesCrud();

  const handleDelete = (bus) => {
    const ok = window.confirm(`¿Eliminar el autobús ${bus.plate}?`);
    if (ok) deleteBus(bus.id);
  };

  return (
    <div className="crud-page">
      <div className="crud-page__container">
        <header className="crud-page__header">
          <h1 className="crud-page__title">Gestión de autobuses</h1>
          <p className="crud-page__subtitle">
            Crear, editar y eliminar autobuses del sistema
          </p>
        </header>

        <BusForm
          key={editingBus?.id ?? "new"}
          editingBus={editingBus}
          onCreate={createBus}
          onUpdate={updateBus}
          onCancel={cancelEdit}
        />

        <BusesTable
          buses={buses}
          onEdit={startEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default BusesPage;
