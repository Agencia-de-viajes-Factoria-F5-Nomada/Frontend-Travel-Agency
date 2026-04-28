import { Link } from "react-router-dom";

function OfferCard({ title, description, discount, image }) {
  return (
    <article className="offer-card">
      <div className="offer-card__image">
        <img src={image} alt={title} />
        <span className="offer-card__badge">{discount}% OFF</span>
      </div>
      <div className="offer-card__content">
        <h3 className="offer-card__title">{title}</h3>
        <p className="offer-card__description">{description}</p>
      </div>
      <Link to="/trips" className="offer-card__link">
        Aprovechar oferta
      </Link>
    </article>
  );
}

export default OfferCard;
