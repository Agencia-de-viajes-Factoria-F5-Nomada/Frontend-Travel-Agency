import { FEATURED_OFFERS } from "../../constants/mockOffers";
import OfferCard from "../cards/OfferCard";

function OffersSection() {
  return (
    <section className="offers-section">
      <div className="offers-section__container">
        <h2 className="offers-section__title">Ofertas Destacadas</h2>
        <p className="offers-section__subtitle">
          Aprovecha nuestras mejores promociones
        </p>
        <div className="offers-section__grid">
          {FEATURED_OFFERS.map((offer) => (
            <OfferCard key={offer.id} {...offer} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default OffersSection;
