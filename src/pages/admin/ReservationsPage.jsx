function ReservationsPage() {
  return (
    <div className="crud-page">
      <div className="crud-page__container">
        <header className="crud-page__header">
          <h1 className="crud-page__title">Reservas</h1>
          <p className="crud-page__subtitle">
            Vista de seguimiento para reservas y operaciones pendientes
          </p>
        </header>
        <section className="admin-placeholder">
          <span className="admin-placeholder__label">Modulo administrativo</span>
          <h2>Reservas pendientes de conectar</h2>
          <p>
            La estructura visual esta preparada para integrarse con la logica de
            reservas cuando este disponible.
          </p>
        </section>
      </div>
    </div>
  );
}

export default ReservationsPage;
