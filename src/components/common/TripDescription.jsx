function TripDescription({ description, pensionType, maxPeople }) {
  const getPensionLabel = (type) => {
    return type === "media" ? "Media pensión" : "Pensión completa";
  };

  return (
    <section className="trip-description">
      <div className="trip-description__container">
        <h2 className="trip-description__heading">Descripción</h2>
        <p className="trip-description__text">{description}</p>

        <div className="trip-description__info">
          <div className="trip-description__item">
            <span className="trip-description__label">Tipo de pensión:</span>
            <span className="trip-description__value">{getPensionLabel(pensionType)}</span>
          </div>
          <div className="trip-description__item">
            <span className="trip-description__label">Plazas disponibles:</span>
            <span className="trip-description__value">{maxPeople}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TripDescription;
