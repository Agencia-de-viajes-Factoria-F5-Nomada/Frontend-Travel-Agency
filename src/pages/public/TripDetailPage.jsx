import { useParams, useNavigate } from "react-router-dom";
import { MOCK_TRIPS } from "../../constants/mockTrips";
import TripHero from "../../components/common/TripHero";
import TripDescription from "../../components/common/TripDescription";
import PricingCard from "../../components/cards/PricingCard";

const PENSION_LABELS = { media: "Media pensión", completa: "Pensión completa" };
const INCLUDED = ["Vuelos", "Hotel", "Traslados", "Seguro de viaje"];
const DATES = "15 Jun - 22 Jun 2026";

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
        badge={PENSION_LABELS[trip.pensionType]}
      />
      <div className="trip-detail__container">
        <TripDescription
          description={trip.description}
          included={INCLUDED}
          maxPeople={8}
          dates={DATES}
        />
        <PricingCard trip={trip} />
      </div>
    </div>
  );
}

export default TripDetailPage;
