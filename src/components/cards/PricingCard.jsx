import { useNavigate } from "react-router-dom";
import Counter from "../ui/Counter";
import { useBookingCalculator } from "../../hooks/useBookingCalculator";
import { useBooking } from "../../context/useBooking";

function PricingCard({ trip }) {
  const navigate = useNavigate();
  const { setBooking } = useBooking();
  const { passengers, setPassenger, total, totalPassengers } = useBookingCalculator(
    trip.price,
    trip.maxPeople
  );

  const handleBook = () => {
    setBooking({ trip, passengers, total });
    navigate("/checkout");
  };

  return (
    <div className="pricing-card">
      <div className="pricing-card__header">
        <h3 className="pricing-card__title">Selecciona viajeros</h3>
      </div>

      <div className="pricing-card__counters">
        <Counter
          label="Adultos"
          value={passengers.adults}
          onChange={(val) => setPassenger("adults", val)}
        />
        <Counter
          label="Niños"
          value={passengers.children}
          onChange={(val) => setPassenger("children", val)}
        />
        <Counter
          label="Jubilados"
          value={passengers.seniors}
          onChange={(val) => setPassenger("seniors", val)}
        />
      </div>

      <div className="pricing-card__summary">
        <p className="pricing-card__passengers">
          Total viajeros: <strong>{totalPassengers}</strong> / {trip.maxPeople}
        </p>
        <div className="pricing-card__total">
          <span>Precio total:</span>
          <span className="pricing-card__amount">${total}</span>
        </div>
      </div>

      <button
        onClick={handleBook}
        className="pricing-card__button"
        disabled={totalPassengers === 0}
      >
        Reservar ahora
      </button>
    </div>
  );
}

export default PricingCard;
