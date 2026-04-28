import { Link } from "react-router-dom";

function DestinationCard({ id, name, image, price, rating }) {
  return (
    <article className="destination-card">
      <div className="destination-card__image">
        <img src={image} alt={name} />
      </div>
      <div className="destination-card__content">
        <h3 className="destination-card__name">{name}</h3>
        <div className="destination-card__footer">
          <span className="destination-card__price">${price}</span>
          <span className="destination-card__rating">⭐ {rating}</span>
        </div>
      </div>
      <Link to={`/trips/${id}`} className="destination-card__link">
        Ver más
      </Link>
    </article>
  );
}

export default DestinationCard;
