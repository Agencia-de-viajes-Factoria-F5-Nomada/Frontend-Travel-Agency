function TripHero({ destination, image, rating, badge }) {
  return (
    <div className="trip-hero">
      <img src={image} alt={destination} className="trip-hero__image" />
      <div className="trip-hero__overlay">
        {badge && <span className="trip-hero__badge">{badge}</span>}
        <h1 className="trip-hero__title">{destination}</h1>
        <span className="trip-hero__rating">⭐ {rating}/5</span>
      </div>
    </div>
  );
}

export default TripHero;
