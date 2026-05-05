function SettingsPage() {
  return (
    <div className="crud-page">
      <div className="crud-page__container">
        <header className="crud-page__header">
          <h1 className="crud-page__title">Configuracion</h1>
          <p className="crud-page__subtitle">
            Ajustes generales del panel administrativo
          </p>
        </header>

        <section className="crud-form">
          <h2 className="crud-form__title">Preferencias de agencia</h2>
          <div className="crud-form__grid">
            <label className="field">
              <span className="field__label">Nombre comercial</span>
              <input type="text" defaultValue="Travel Agency" />
            </label>
            <label className="field">
              <span className="field__label">Moneda</span>
              <select defaultValue="EUR">
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
              </select>
            </label>
            <label className="field">
              <span className="field__label">Estado de reservas</span>
              <select defaultValue="open">
                <option value="open">Reservas abiertas</option>
                <option value="paused">Reservas pausadas</option>
              </select>
            </label>
          </div>
          <button type="button" className="crud-form__submit">
            Guardar cambios
          </button>
        </section>
      </div>
    </div>
  );
}

export default SettingsPage;
