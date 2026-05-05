function AboutPage() {
  return (
    <section className="featured-section">
      <div className="featured-section__container">
        <h1 className="featured-section__title">Nosotros</h1>
        <p className="featured-section__subtitle">
          Somos una agencia digital enfocada en viajes claros, bien acompanados y faciles de reservar
        </p>

        <div className="trips-page__content">
          <article className="admin-placeholder">
            <span className="admin-placeholder__label">Travel Agency</span>
            <h2>Disenamos viajes con criterio</h2>
            <p>
              Combinamos destinos seleccionados, ofertas activas y experiencias
              locales para que cada reserva tenga informacion util desde el primer
              paso hasta la confirmacion.
            </p>
          </article>
          <article className="admin-placeholder">
            <span className="admin-placeholder__label">Nuestro enfoque</span>
            <h2>Reserva simple, servicio cercano</h2>
            <p>
              El proyecto organiza busqueda, detalle de destino, favoritos, perfil
              y panel administrativo para cubrir el flujo completo de una agencia
              moderna.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
