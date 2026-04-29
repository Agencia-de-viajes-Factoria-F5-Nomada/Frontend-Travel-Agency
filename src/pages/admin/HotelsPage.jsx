import { useHotelsCrud } from "../../hooks/useHotelsCrud";
import HotelForm from "../../components/forms/HotelForm";
import HotelsTable from "../../components/common/HotelsTable";

function HotelsPage() {
  const {
    hotels,
    editingHotel,
    createHotel,
    updateHotel,
    deleteHotel,
    startEdit,
    cancelEdit,
  } = useHotelsCrud();

  const handleDelete = (hotel) => {
    const ok = window.confirm(`¿Eliminar el hotel ${hotel.name}?`);
    if (ok) deleteHotel(hotel.id);
  };

  return (
    <div className="crud-page">
      <div className="crud-page__container">
        <header className="crud-page__header">
          <h1 className="crud-page__title">Gestión de hoteles</h1>
          <p className="crud-page__subtitle">
            Crear, editar y eliminar hoteles del sistema
          </p>
        </header>

        <HotelForm
          key={editingHotel?.id ?? "new"}
          editingHotel={editingHotel}
          onCreate={createHotel}
          onUpdate={updateHotel}
          onCancel={cancelEdit}
        />

        <HotelsTable
          hotels={hotels}
          onEdit={startEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default HotelsPage;
