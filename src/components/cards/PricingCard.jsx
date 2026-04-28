import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Counter from "../ui/Counter";

function PricingCard({ trip }) {
  const navigate = useNavigate();
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    seniors: 0,
  });

  const handlePassengerChange = (type, value) => {
    setPassengers((prev) => ({ ...prev, [type]: value }));
  };

  const totalPassengers = passengers.adults + passengers.children + passengers.seniors;
  const totalPrice = trip.price * totalPassengers;

  const handleBook = () => {
    navigate("/checkout", {
      state: {
        trip,
        passengers,
        total: totalPrice,
      },
    });
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
          onChange={(val) => handlePassengerChange("adults", val)}
        />
        <Counter
          label="Niños"
          value={passengers.children}
          onChange={(val) => handlePassengerChange("children", val)}
        />
        <Counter
          label="Jubilados"
          value={passengers.seniors}
          onChange={(val) => handlePassengerChange("seniors", val)}
        />
      </div>

      <div className="pricing-card__summary">
        <p className="pricing-card__passengers">
          Total viajeros: <strong>{totalPassengers}</strong>
        </p>
        <div className="pricing-card__total">
          <span>Precio total:</span>
          <span className="pricing-card__amount">${totalPrice}</span>
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
