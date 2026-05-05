function DestinationsPage() {
  return (
    <div className="crud-page">
      <div className="crud-page__container">
        <header className="crud-page__header">
          <h1 className="crud-page__title">Destinos</h1>
          <p className="crud-page__subtitle">
            Catalogo visual de destinos preparado para administracion
          </p>
        </header>
        <section className="admin-placeholder">
          <span className="admin-placeholder__label">Modulo administrativo</span>
          <h2>Destinos pendientes de conectar</h2>
          <p>
            Se conserva la ruta actual y se deja una superficie coherente con el
            resto del panel.
          </p>
        </section>
      </div>
    </div>
  );
}

export default DestinationsPage;
