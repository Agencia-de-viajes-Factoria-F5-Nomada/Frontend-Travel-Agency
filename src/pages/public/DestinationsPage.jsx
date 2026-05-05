import DestinationCard from "../../components/cards/DestinationCard";
import { MOCK_TRIPS } from "../../constants/mockTrips";

function DestinationsPage() {
  const destinations = MOCK_TRIPS.map((trip) => ({
    id: trip.id,
    name: trip.destination,
    image: trip.image,
    price: trip.price,
    rating: trip.rating,
  }));

  return (
    <section className="featured-section">
      <div className="featured-section__container">
        <h1 className="featured-section__title">Destinos</h1>
        <p className="featured-section__subtitle">
          Explora nuestro catalogo de destinos disponibles para tu proximo viaje
        </p>
        <div className="featured-section__grid">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} {...destination} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default DestinationsPage;
