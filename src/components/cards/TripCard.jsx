import { Link } from "react-router-dom";

function TripCard({ id, destination, description, image, price, rating, pensionType }) {
  const getPensionLabel = (type) => {
    return type === "media" ? "Media pensión" : "Pensión completa";
  };

  return (
    <article className="trip-card">
      <div className="trip-card__image">
        <img src={image} alt={destination} />
      </div>
      <div className="trip-card__content">
        <h3 className="trip-card__destination">{destination}</h3>
        <p className="trip-card__description">{description}</p>
        
        <div className="trip-card__info">
          <span className="trip-card__pension">{getPensionLabel(pensionType)}</span>
          <span className="trip-card__rating">⭐ {rating}</span>
        </div>

        <div className="trip-card__footer">
          <span className="trip-card__price">${price}</span>
          <Link to={`/trips/${id}`} className="trip-card__link">
            Ver detalle
          </Link>
        </div>
      </div>
    </article>
  );
}

export default TripCard;
