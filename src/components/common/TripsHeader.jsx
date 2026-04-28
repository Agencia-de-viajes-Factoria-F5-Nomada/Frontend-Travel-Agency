function TripsHeader({ resultCount }) {
  return (
    <div className="trips-header">
      <h1 className="trips-header__title">Nuestros viajes</h1>
      <p className="trips-header__subtitle">
        Descubre los mejores destinos y ofertas especiales
      </p>
      <div className="trips-header__results">
        <span className="trips-header__count">{resultCount} resultados encontrados</span>
      </div>
    </div>
  );
}

export default TripsHeader;
