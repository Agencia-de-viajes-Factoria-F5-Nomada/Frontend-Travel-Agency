import { useParams, useNavigate } from "react-router-dom";
import { MOCK_TRIPS } from "../../constants/mockTrips";
import TripHero from "../../components/common/TripHero";
import TripDescription from "../../components/common/TripDescription";
import PricingCard from "../../components/cards/PricingCard";

function TripDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const trip = MOCK_TRIPS.find((t) => t.id === parseInt(id));

  if (!trip) {
    return (
      <div className="trip-detail__error">
        <h1>Viaje no encontrado</h1>
        <p>Lo sentimos, el viaje que buscas no existe.</p>
        <button onClick={() => navigate("/trips")}>Volver a viajes</button>
      </div>
    );
  }

  return (
    <div className="trip-detail">
      <TripHero
        destination={trip.destination}
        image={trip.image}
        rating={trip.rating}
      />
      <div className="trip-detail__container">
        <TripDescription
          description={trip.description}
          pensionType={trip.pensionType}
          maxPeople={8}
        />
        <PricingCard trip={trip} />
      </div>
    </div>
  );
}

export default TripDetailPage;
