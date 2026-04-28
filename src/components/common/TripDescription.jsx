function TripDescription({ description, included, maxPeople, dates }) {
  return (
    <section className="trip-description">
      <div className="trip-description__container">
        <h2 className="trip-description__heading">Descripción</h2>
        <p className="trip-description__text">{description}</p>

        <h3 className="trip-description__subheading">Incluye</h3>
        <ul className="trip-description__list">
          {(included ?? []).map((item) => (
            <li key={item} className="trip-description__list-item">
              ✓ {item}
            </li>
          ))}
        </ul>

        <div className="trip-description__info">
          <div className="trip-description__item">
            <span className="trip-description__label">Plazas disponibles:</span>
            <span className="trip-description__value">{maxPeople}</span>
          </div>
          <div className="trip-description__item">
            <span className="trip-description__label">Fechas:</span>
            <span className="trip-description__value">{dates}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TripDescription;
