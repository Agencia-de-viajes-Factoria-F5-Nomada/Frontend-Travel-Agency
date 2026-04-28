import { FEATURED_DESTINATIONS } from "../../constants/mockDestinations";
import DestinationCard from "../cards/DestinationCard";

function FeaturedSection() {
  return (
    <section className="featured-section">
      <div className="featured-section__container">
        <h2 className="featured-section__title">Destinos Destacados</h2>
        <p className="featured-section__subtitle">
          Descubre los lugares más populares entre nuestros viajeros
        </p>
        <div className="featured-section__grid">
          {FEATURED_DESTINATIONS.map((destination) => (
            <DestinationCard key={destination.id} {...destination} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedSection;
