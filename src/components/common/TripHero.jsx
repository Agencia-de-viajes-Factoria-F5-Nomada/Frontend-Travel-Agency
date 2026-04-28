function TripHero({ destination, image, rating }) {
  return (
    <div className="trip-hero">
      <img src={image} alt={destination} className="trip-hero__image" />
      <div className="trip-hero__overlay">
        <h1 className="trip-hero__title">{destination}</h1>
        <span className="trip-hero__rating">⭐ {rating}/5</span>
      </div>
    </div>
  );
}

export default TripHero;
