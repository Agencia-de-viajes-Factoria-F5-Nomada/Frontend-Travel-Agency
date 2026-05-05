import { FEATURED_OFFERS } from "../../constants/mockOffers";
import OfferCard from "../../components/cards/OfferCard";

function OffersPage() {
  return (
    <section className="offers-section">
      <div className="offers-section__container">
        <h1 className="offers-section__title">Ofertas</h1>
        <p className="offers-section__subtitle">
          Paquetes y promociones activas para reservar con mejor precio
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

export default OffersPage;
